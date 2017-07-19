var app = require('express')();
var server = app.listen(3000);
var io = require('socket.io').listen(server);
const uuidv4 = require('uuid/v4');
var num = 0;
var colors = ["#f564a8","#e1a0fd","#ae95fd","#95bbfd","#95f5fd","#95fdb9","#ecfda2","#f7f05f","#66a77e","#f5aa88"];

app.get('/',function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	var id = uuidv4();
	var color = colors[Math.floor(Math.random() * 10)];
	var nickname = "匿名用户"+uuidv4().substr(-6);
  	console.log('user '+nickname+' connected');
  	socket.emit('change name', nickname);//初始化名字
  	socket.emit('broadcast', num + ' people in room');
  	num++;
  	socket.broadcast.emit('broadcast',nickname+' connected');
  	socket.broadcast.emit('broadcast',num + ' people in room');
  	//更改名字
  	socket.on('change name', function (msg) {
  		console.log(nickname + ' change name to: '+msg);
  		socket.emit('change name', msg);
  		socket.broadcast.emit('broadcast', nickname + ' change name to: '+msg);//广播（除了自己）
  		nickname = msg;
  	})
  	//断开连接
  	socket.on('disconnect', function(){
    	console.log(nickname+' disconnected');
    	socket.broadcast.emit('broadcast', nickname + ' disconnect the room');
    	num--;
    	socket.broadcast.emit('broadcast',num + ' people in room');	
  	});
  	//聊天信息
  	socket.on('chat message', function(msg){
  		var message = {nickname, msg, color};
  		// console.log(JSON.stringify(message));
  		console.log(nickname + ' send:' + msg);
    	io.emit('chat message', JSON.stringify(message));//广播所有人
  	});

});

// http.listen(3000, function () {
// 	console.log('listening on *:3000');
// })