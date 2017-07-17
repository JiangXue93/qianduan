require('http').createServer(function (req, res) {
	res.writeHead(200, { 'Content-type': 'text/html'});

	res.write('Hi!');
	res.write('Hi!2');
	res.write('Hi!3');
	console.log(req.headers)
	setTimeout(function () {
		res.end('Hello <b>JX</b>');
	},10000);
	


}).listen(3000);