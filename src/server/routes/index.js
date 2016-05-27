var express = require('express');
var router = express.Router();
var api = require('../../../key.js')
var request = require('request');

var videoID;
var data;

router.post('/',function(req, res, next){
	console.log('body', req.body);
	var videoUrl = JSON.parse(req.body.payload).data.url;
	request({
	  method: 'POST',
	  url: 'https://api.kairos.com/media?source='+videoUrl,
	  headers: {
	    'app_id': '9b6e34e6',
	    'app_key': '496c2c2f2f8fd1c6b90fdc8dd4b82fa3'
	  }}, function (error, response, body) {
	  // console.log('Status:', response.statusCode);
	  // console.log('Headers:', JSON.stringify(response.headers));
	  console.log('Response:', JSON.parse (body));
	});
	// data = body;
	// videoID = JSON.parse(body).id;
	// res.json({ data: body })
})



router.get('/ping', function(req, res, next){
	global.io.emit('status', 'pong!');
    res.status(200).json({ message: 'pong!' });
})
// router.get('/is-complete', function(req, res, next){
// 	if(data) {
// 		res.json(data)
// 		data;
// 	} else {
// 		res.json(false)
// 	}
// })


// // //may not be this route, needs videoID
// router.get('/', function(req, res, next){
// 	request({
// 	  method: 'GET',
// 	  url: 'https://api.kairos.com/media/'+videoID,
// 	  headers: {
// 	    'app_id': '9b6e34e6',
// 	    'app_key': '496c2c2f2f8fd1c6b90fdc8dd4b82fa3'
// 	  }}, function (error, response, body) {
// 	  // console.log('Status:', response.statusCode);
// 	  // console.log('Headers:', JSON.stringify(response.headers));
// 	  res.render('index', {title: body})
// 	});
// })

// router.get('/videodata', function(req, res, next){
// 	request({
// 	  method: 'GET',
// 	  url: 'https://api.kairos.com/media/'+videoID,
// 	  headers: {
// 	    'app_id': '9b6e34e6',
// 	    'app_key': '496c2c2f2f8fd1c6b90fdc8dd4b82fa3'
// 	  }}, function (error, response, body) {
// 	  // console.log('Status:', response.statusCode);
// 	  // console.log('Headers:', JSON.stringify(response.headers));
// 	  res.json({data: body})
// 	});
// })


	// var options = {
	// 	method: 'GET',
	// 	uri: 'https://api.kairos.com/media/2b4b0eafab3b000cfcf902e8',
	// 	headers: {
	//     'app_id': '9b6e34e6',
	//     'app_key': '496c2c2f2f8fd1c6b90fdc8dd4b82fa3'
	//     }
	// }

	// request(options)
	// .then(function(body){
	// 	console.log(body)
	// })

// request({
//   method: 'GET',
//   url: 'https://api.kairos.com/media/2b4b0eafab3b000cfcf902e8',
//   headers: {
//     'app_id': '9b6e34e6',
//     'app_key': '496c2c2f2f8fd1c6b90fdc8dd4b82fa3'
//   }}, function (error, response, body) {
//   console.log('Status:', response.statusCode);
//   console.log('Headers:', JSON.stringify(response.headers));
//   console.log('Response:', body);
// });







module.exports = router;
