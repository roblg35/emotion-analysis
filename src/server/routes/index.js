var express = require('express');
var router = express.Router();
var api = require('../../../key.js')
var request = require('request');



router.get('/', function(req, res, next){
	request({
	  method: 'GET',
	  url: 'https://api.kairos.com/media/2b4b0eafab3b000cfcf902e8',
	  headers: {
	    'app_id': '9b6e34e6',
	    'app_key': '496c2c2f2f8fd1c6b90fdc8dd4b82fa3'
	  }}, function (error, response, body) {
	  console.log('Status:', response.statusCode);
	  console.log('Headers:', JSON.stringify(response.headers));
	  res.render('index', {title: body})
	});

})

	


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






// router.get({'/https://api.kairos.com/media/2b4b0eafab3b000cfcf902e8' 
//  headers: {
//     'app_id': '9b6e34e6',
//     'app_key': '496c2c2f2f8fd1c6b90fdc8dd4b82fa3'
//   }}, function(req, res, next) {

//   res.render('index', { title: req.body });
// });


module.exports = router;
