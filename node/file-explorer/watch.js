var fs = require('fs');
var files = fs.readdirSync(process.cwd());
files.forEach(function(file) {
	if(/\.css/.test(file)) {//以css结尾的文件
		fs.watchFile(process.cwd() + '/' + file,function () {
			console.log(' - '+ file + ' changed!');
			var stream = fs.createReadStream('test.css');
			stream.on('data',function (chunck) {
				console.log(' + '+ chunck);
			});
			stream.on('end',function (chunck) {
				console.log(' - ' + 'file end!');
				console.log('');
			});
		});
	}
});