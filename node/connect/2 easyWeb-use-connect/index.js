
var http = require("http");
var fs = require("fs");
var connect = require('connect');


var hello = "hi";
var app = connect();

app.use(function(req, res,next){
  	console.log(' %s %s \n', req.method, req.url);//使用node index.js 2>erro.log，可以将错误输出重定向到文件中
  	next();
});

app.use(function(req, res,next){
	if("GET" == req.method && '/' == req.url){
		res.writeHead(200, {"Content-Type": 'text/html'});
		fs.createReadStream(__dirname + '/index.html').pipe(res);
	}else{
		next();
	}
	
});

app.use('/img',function(req, res,next){
	if("GET" == req.method && '.jpg' == req.url.substr(-4)){
		fs.stat(__dirname + '/img' + req.url, function (err, stats){//判断文件是否存在(！！！注意这里req.url改变了！！！)
			// console.log(req.url);
			// console.log(err);
			// console.log(stats);
			if( err || !stats.isFile() ) {
 				next(new Error('boom!'));
 				console.error(' %s %s \n', req.method, req.url);//使用node index.js 2>erro.log，可以将错误输出重定向到文件中
				return;
			}
			res.writeHead(200, {"Content-Type": 'aplication/jpg'});
			fs.createReadStream(__dirname + '/img' + req.url).pipe(res);
		});
	}
	else{
		next();
	}	
});


app.use(function(req, res,next){
	if("GET" == req.method && 'html' == req.url.substr(-4)){
		fs.stat(__dirname + req.url, function (err, stats){//判断文件是否存在
			if( err || !stats.isFile() ) {
				// res.writeHead(404);
 			// 	res.end('Not found');
 				next(new Error('boom!'));
 				console.error(' %s %s \n', req.method, req.url);//使用node index.js 2>erro.log，可以将错误输出重定向到文件中
				return;
			}
		// console.log(req.query.index);
		res.writeHead(200, {"Content-Type": 'text/html'});
		fs.createReadStream(__dirname + req.url).pipe(res);
		});
	}
	else{
		next();
	}
});

app.use(function onerror(err, req, res, next) {
  	res.writeHead(404);
 	res.end('found error');
});

app.use(function (req, res) {
 	res.writeHead(404);
 	res.end('Not found');
});



http.createServer(app).listen(3000);


