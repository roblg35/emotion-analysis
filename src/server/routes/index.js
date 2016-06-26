var express = require('express');
var router = express.Router();
var request = require('request');



router.post('/', function(req, res, next) {
  var videoUrl = JSON.parse(req.body.payload).data.url;
  request({
      method: 'POST',
      url: 'https://api.kairos.com/media?source=' + videoUrl,
      headers: {
          'app_id': process.env.APP_ID || '25354dff',
          'app_key': process.env.KEY || '973cc8acf788745dba77aa83255990c6'
      } 
  }, function(error, response, body) {
      var id = JSON.parse(body).id
      if (JSON.parse(body).status_message !== 'Complete') {
          setTimeout(myFunction, 10000)

          function myFunction() {
              request({
                  method: 'GET',
                  url: 'https://api.kairos.com/media/' + id,
                  headers: {
                      'app_id': process.env.APP_ID || '25354dff',
                      'app_key': process.env.KEY || '973cc8acf788745dba77aa83255990c6'
                  }
              }, function(error, response, body) {
                  global.io.emit('status', JSON.parse(body));
              })
          }
      } else {
          global.io.emit('status', JSON.parse(body));
      }
  });
})

module.exports = router;