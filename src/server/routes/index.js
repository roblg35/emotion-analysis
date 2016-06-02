var express = require('express');
var router = express.Router();
var api = require('../../../key.js')
var request = require('request');

// var videoID;
// var data;

router.post('/',function(req, res, next){
	console.log('body', req.body);
	var videoUrl = JSON.parse(req.body.payload).data.url;
	request({
	  method: 'POST',
	  url: 'https://api.kairos.com/media?source='+videoUrl,
	  headers: {
	    'app_id': '25354dff',
	    'app_key': '973cc8acf788745dba77aa83255990c6'
	  }}, function (error, response, body) {
	  // console.log('Status:', response.statusCode);
	  // console.log('Headers:', JSON.stringify(response.headers));
	  	  	var id = JSON.parse(body).id
	  if (JSON.parse(body).status_message !== 'Complete'){
	  	console.log('TRUE')
	  	request({
		  method: 'GET',
		  url: 'https://api.kairos.com/media/'+id,
		  headers: {
		    'app_id': '25354dff',
		    'app_key': '973cc8acf788745dba77aa83255990c6'
		  }}, function (error, response, body) {
		  // console.log('Status:', response.statusCode);
		  // console.log('Headers:', JSON.stringify(response.headers));
		   global.io.emit('status', JSON.parse(body));
		  console.log('Response:', JSON.parse(body));
		})
	  } else{
	  global.io.emit('status', JSON.parse(body));
	  		}
	  // global.io.emit('status', JSON.parse(body));
	  console.log('Response:', JSON.parse(body));
	});
})





// router.get('/everything', function(req, res, next){
// 		request({
// 		  method: 'GET',
// 		  url: 'https://api.kairos.com/media/487df7917e7cbd70b7e85cc7',
// 		  headers: {
// 		    'app_id': '25354dff',
// 		    'app_key': '973cc8acf788745dba77aa83255990c6'
// 		  }}, function (error, response, body) {
// 		  console.log('Status:', response.statusCode);
// 		  console.log('Headers:', JSON.stringify(response.headers));
// 		  console.log('Response:', body);
// 		});
// })
	


module.exports = router;
