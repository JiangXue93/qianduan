var express = require('express');
	// search = require('./search');

var app = express.createServer();

app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false});

app.get('/', function (req, res){
	res.render('index');
});

// app.get('/search', function (req, res){
// 	search(req.query.q, function (err, tweets) {
// 		if(err) return next(err);
// 		res.render('search', {results: twweets, search: req.query.q});
// 	});
// });
app.listen(3000);