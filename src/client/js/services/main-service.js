(function() {

    'use strict';

    angular.module('myApp')
        .service('mainService', mainService)
        .service('SocketService', SocketService);

    mainService.$inject = ['$window', '$http'];

    function mainService($window, $http) {
        var attention = [];
        var dislike = [];
        var smile = [];
        var surprise = [];
        return {
            localFileVideoPlayer: function() {
                'use strict'
                var URL = window.URL || window.webkitURL
                var displayMessage = function(message, isError) {
                    var element = document.querySelector('#message')
                    element.innerHTML = message
                    element.className = isError ? 'error' : 'info'
                }
                var playSelectedFile = function(event) {
                    var file = this.files[0]
                    var type = file.type
                    console.log(file.name)
                    var videoNode = document.querySelector('#main')
                    var canPlay = videoNode.canPlayType(type)
                    if (canPlay === '') canPlay = 'no'
                    var message = 'Can play type "' + type + '": ' + canPlay
                    var isError = canPlay === 'no'
                    displayMessage(message, isError)

                    if (isError) {
                        return
                    }

                    var fileURL = URL.createObjectURL(file)
                    videoNode.src = fileURL
                }
                var inputNode = document.querySelector('input')
                inputNode.addEventListener('change', playSelectedFile, false)
            },
            background: function() {
                var video = document.querySelector('.backgroundvid'),
                    container = document.querySelector('#contain');

                var setVideoDimensions = function() {
                    // Video's intrinsic dimensions
                    var w = video.videoWidth,
                        h = video.videoHeight;

                    // Intrinsic Ratio
                    // Will be more than 1 if W > H and less if W < H
                    var videoRatio = (w / h).toFixed(2);

                    // Get the container's computed styles
                    //
                    // Also calculate the min dimensions required (this will be
                    // the container dimentions)
                    var containerStyles = window.getComputedStyle(container),
                        minW = parseInt(containerStyles.getPropertyValue('width')),
                        minH = parseInt(containerStyles.getPropertyValue('height'));

                    // What's the min:intrinsic dimensions
                    //
                    // The idea is to get which of the container dimension
                    // has a higher value when compared with the equivalents
                    // of the video. Imagine a 1200x700 container and
                    // 1000x500 video. Then in order to find the right balance
                    // and do minimum scaling, we have to find the dimension
                    // with higher ratio.
                    //
                    // Ex: 1200/1000 = 1.2 and 700/500 = 1.4 - So it is best to
                    // scale 500 to 700 and then calculate what should be the
                    // right width. If we scale 1000 to 1200 then the height
                    // will become 600 proportionately.
                    var widthRatio = minW / w,
                        heightRatio = minH / h;

                    // Whichever ratio is more, the scaling
                    // has to be done over that dimension
                    if (widthRatio > heightRatio) {
                        var newWidth = minW;
                        var newHeight = Math.ceil(newWidth / videoRatio);
                    } else {
                        var newHeight = minH;
                        var newWidth = Math.ceil(newHeight * videoRatio);
                    }

                    video.style.width = newWidth + 'px';
                    video.style.height = newHeight + 'px';
                };

                video.addEventListener('loadedmetadata', setVideoDimensions, false);
                window.addEventListener('resize', setVideoDimensions, false);


            },

            getVideoData: function() {
                return $http.get('/everything')
            },

            graphArrays: function(data) {
                var dataArr = data.frames
                dataArr.forEach(function(val) {
                    console.log(val)
                    attention.push(val.person.emotions.attention)
                    dislike.push(val.person.emotions.negative)
                    smile.push(val.person.emotions.smile)
                    surprise.push(val.person.emotions.surprise)
                })

            },

            getGraphingLines: function(data) {
                return new Highcharts.Chart({
                    chart: {
                        renderTo: 'container',
                        type: 'area'
                    },
                    title: {
                        text: 'eNalysis'
                    },
                    subtitle: {
                        text: 'Emotion Data Graph',
                        x: 0
                    },
                    xAxis: {
                        allowDecimals: false,
                        labels: {
                            formatter: function() {
                                return this.value;
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Emotion %'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valueSuffix: '%'
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: [{
                        name: 'Attention',
                        data: attention
                    }, {
                        name: 'Dislike',
                        data: dislike
                    }, {
                        name: 'Smile',
                        data: smile
                    }, {
                        name: 'surprise',
                        data: surprise
                    }]
                });

            },

            setStyle: function() {

                Highcharts.theme = {
                    colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
                        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"
                    ],
                    chart: {
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 1,
                                y2: 1
                            },
                            stops: [
                                [0, '#2a2a2b'],
                                [1, '#3e3e40']
                            ]
                        },
                        style: {
                            fontFamily: "'Unica One', sans-serif"
                        },
                        plotBorderColor: '#606063'
                    },
                    title: {
                        style: {
                            color: '#E0E0E3',
                            textTransform: 'uppercase',
                            fontSize: '20px'
                        }
                    },
                    subtitle: {
                        style: {
                            color: '#E0E0E3',
                            textTransform: 'uppercase'
                        }
                    },
                    xAxis: {
                        gridLineColor: '#707073',
                        labels: {
                            style: {
                                color: '#E0E0E3'
                            }
                        },
                        lineColor: '#707073',
                        minorGridLineColor: '#505053',
                        tickColor: '#707073',
                        title: {
                            style: {
                                color: '#A0A0A3'

                            }
                        }
                    },
                    yAxis: {
                        gridLineColor: '#707073',
                        labels: {
                            style: {
                                color: '#E0E0E3'
                            }
                        },
                        lineColor: '#707073',
                        minorGridLineColor: '#505053',
                        tickColor: '#707073',
                        tickWidth: 1,
                        title: {
                            style: {
                                color: '#A0A0A3'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        style: {
                            color: '#F0F0F0'
                        }
                    },
                    plotOptions: {
                        series: {
                            dataLabels: {
                                color: '#B0B0B3'
                            },
                            marker: {
                                lineColor: '#333'
                            }
                        },
                        boxplot: {
                            fillColor: '#505053'
                        },
                        candlestick: {
                            lineColor: 'white'
                        },
                        errorbar: {
                            color: 'white'
                        }
                    },
                    legend: {
                        itemStyle: {
                            color: '#E0E0E3'
                        },
                        itemHoverStyle: {
                            color: '#FFF'
                        },
                        itemHiddenStyle: {
                            color: '#606063'
                        }
                    },
                    credits: {
                        style: {
                            color: '#666'
                        }
                    },
                    labels: {
                        style: {
                            color: '#707073'
                        }
                    },

                    drilldown: {
                        activeAxisLabelStyle: {
                            color: '#F0F0F3'
                        },
                        activeDataLabelStyle: {
                            color: '#F0F0F3'
                        }
                    },

                    navigation: {
                        buttonOptions: {
                            symbolStroke: '#DDDDDD',
                            theme: {
                                fill: '#505053'
                            }
                        }
                    },

                    // scroll charts
                    rangeSelector: {
                        buttonTheme: {
                            fill: '#505053',
                            stroke: '#000000',
                            style: {
                                color: '#CCC'
                            },
                            states: {
                                hover: {
                                    fill: '#707073',
                                    stroke: '#000000',
                                    style: {
                                        color: 'white'
                                    }
                                },
                                select: {
                                    fill: '#000003',
                                    stroke: '#000000',
                                    style: {
                                        color: 'white'
                                    }
                                }
                            }
                        },
                        inputBoxBorderColor: '#505053',
                        inputStyle: {
                            backgroundColor: '#333',
                            color: 'silver'
                        },
                        labelStyle: {
                            color: 'silver'
                        }
                    },

                    navigator: {
                        handles: {
                            backgroundColor: '#666',
                            borderColor: '#AAA'
                        },
                        outlineColor: '#CCC',
                        maskFill: 'rgba(255,255,255,0.1)',
                        series: {
                            color: '#7798BF',
                            lineColor: '#A6C7ED'
                        },
                        xAxis: {
                            gridLineColor: '#505053'
                        }
                    },

                    scrollbar: {
                        barBackgroundColor: '#808083',
                        barBorderColor: '#808083',
                        buttonArrowColor: '#CCC',
                        buttonBackgroundColor: '#606063',
                        buttonBorderColor: '#606063',
                        rifleColor: '#FFF',
                        trackBackgroundColor: '#404043',
                        trackBorderColor: '#404043'
                    },

                    // special colors for some of the
                    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                    background2: '#505053',
                    dataLabelsColor: '#B0B0B3',
                    textColor: '#C0C0C0',
                    contrastTextColor: '#F0F0F3',
                    maskColor: 'rgba(255,255,255,0.3)'
                };

                // Apply the theme
                Highcharts.setOptions(Highcharts.theme);

                return Highcharts;
            }

        };
    }
    SocketService.$inject = ['socketFactory'];

    function SocketService(socketFactory) {
        return socketFactory();
    }
})();