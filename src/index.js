var tester = require('./tester.js');
var express = require('express');

var app = express();

app.get('/emails/find-url', function(req, res){
	var to = req.query.to;
	var url = req.query.url;
	
	var urlRegex = new RegExp(url, 'ig');
	
	tester.findUrl(to, urlRegex)
		.then(hits => {
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(hits));
		});	
});

app.delete('/emails/:msgId', function(req, res){
	
	var id = req.params.msgId;
	
	tester.deleteMessage(id)
		.then(function(){
			res.sendStatus(200);
		});
	
});

var server = app.listen(8081, function (){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Listening on ' + host + ':' + port);
});