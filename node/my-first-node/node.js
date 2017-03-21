var http = require("http");

http.createServer(function (require, response) {
	//send head of http
	//http status:200:ok
	response.writeHead(200,{'Content-Type': 'text/plain'});

	//send response "hello world"
	response.end('Hello World\n');
}).listen(8888);
console.log('Server running at http://127.0.0.1:8888/');