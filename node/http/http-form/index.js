var q = require('querystring');

require('http').createServer( function (req,res) {
	console.log(req.url);
	if(req.url == '/'){
		res.writeHead(200, {"Content-type": "text/html"});
		res.end([
			'<form method="post" action="/url">'
		   ,'<h1> My form</h1>'
		   ,	'<fieldset>'
		   ,	'<label> Personal information</label>'
		   ,	'</p>what is your name?</p>'
		   ,	'<input type="text" name="name">'
		   ,	'<p><button>submit</button></p>'
		   ,'</form>'
			].join(''));
	}else if(req.url == '/url' && req.method == 'POST'){
		var body = '';
		req.on('data', function (chunk) {
			body += chunk;
		});
		req.on('end',function () {
			res.writeHead(200, {"Content-type": "text/html"});
			res.end('<p>your name is: ' + q.parse(body).name + '.' );
		});
		
	}else {
		res.writeHead(404);
		res.end('not found');
	}
	
}).listen(3000);