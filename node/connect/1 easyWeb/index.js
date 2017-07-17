
var http = require("http");
var fs = require("fs");

var server = http.createServer(function (req, res) {
	console.log(__dirname + req.url);

	if("GET" == req.method && '/' == req.url){
		serve(__dirname + '/index.html', 'text/html');
	}
	else if("GET" == req.method && 'html' == req.url.substr(-4)){
		fs.stat(__dirname + req.url, function (err, stats){//判断文件是否存在
			if( err || !stats.isFile() ) {
				res.writeHead(404);
				res.end('Web Not Found!');
				return;
			}
		serve(__dirname + req.url, 'text/html');
		});
	}
	else if("GET" == req.method && '/img' == req.url.substr(0, 4) && '.jpg' == req.url.substr(-4)){
		fs.stat(__dirname + req.url, function (err, stats){//判断文件是否存在
			if( err || !stats.isFile() ) {
				res.writeHead(404);
				res.end('File Not Found!');
				return;
			}
			serve(__dirname + req.url, 'aplication/jpg');
		});
	}else {
		res.writeHead(404);
		res.end('Not Found!');
	}

	function serve (path, type) {
		res.writeHead(200, {"Content-Type": type});
		fs.createReadStream(path).pipe(res);
	}
});



server.listen(3000);

