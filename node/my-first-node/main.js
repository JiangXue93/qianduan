//阻塞是按顺序执行的，而非阻塞是不需要按顺序的

//阻塞代码示例
// var fs = require("fs");

// var data = fs.readFileSync('input.txt');

// console.log(data.toString());
// console.log("over!");



//非阻塞代码示例
var fs = require("fs");

fs.readFile('input.txt', 
	function (err, data) {
    	if (err) return console.error(err);
   		console.log(data.toString());
});

console.log("程序执行结束!");