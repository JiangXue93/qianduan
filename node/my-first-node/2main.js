//引入events 模块
var events = require('events');
//创见eventEmitter对象
var eventEmitter = new events.EventEmitter();

//创建事件处理程序
var connectHandler = function connected() {
	console.log('connecte success');

	//触发data_received事件
	eventEmitter.emit('data_received');
};

//绑定connection事件处理程序
eventEmitter.on('connection',connectHandler);

//使用匿名函数绑定data_received事件
eventEmitter.on('data_received',function(){
	console.log('数据接收成功。');
});

//触发connection事件
eventEmitter.emit('connection');

eventEmitter.emit('error'); 

console.log("over!");


// var events = require('events'); 
// var emitter = new events.EventEmitter(); 
// emitter.on('someEvent', function(arg1, arg2) { 
// 	console.log('listener1', arg1, arg2); 
// }); 
// emitter.on('someEvent', function(arg1, arg2) { 
// 	console.log('listener2', arg1, arg2); 
// }); 
// emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 