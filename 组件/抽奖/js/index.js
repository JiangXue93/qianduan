var data = ['Ipad','Iphone','Thanks','HuaWei','Xiaomi','Thanks'],
	timer = null,
	flag = 0;

window.onload = function(){
	var play = document.getElementById('play'),
		stop = document.getElementById('stop');

		//开始抽奖
		play.onclick =  playFun;
		stop.onclick =  stopFun;

		//键盘事件
		document.onkeyup = function(event){
			event = event || window.event;
			//console.log(event.keyCode);
			if(event.keyCode == 13){
				if(flag == 0){
					playFun();
					flag=1;
				}else{
					stopFun();
					flag=0;
				}
			}
		}
	//阻止事件冒泡
	function stopBubble( e ){
		e = e || window.event;
		e.stopPropagation ? e.stopPropagation():e.cancelBubble = true;
	}

	//阻止默认浏览器默认动作
	function stopDefault( e ){
		e = e || window.event;
		e.preventDefault ? e.preventDefault():e.returnValue = true; 	
	}
}


function playFun(){
	var play = document.getElementById('play');
	var title = document.getElementById('title');
	clearInterval(timer);
	timer = setInterval(function(){
		var random = Math.floor(Math.random() * data.length);
		title.innerHTML=data[random];
	},50);
	play.style.background='#999';
}

function stopFun(){
	clearInterval(timer);
	var play = document.getElementById('play');
	play.style.background='#cc1';

}

