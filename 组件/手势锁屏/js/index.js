const WIDTH = 300;
const HEIGHT = 300;
var btns = [];
var pass = [];
var input = 0;
var oldTime,nowTime;
var dayPart;

var processPass = 0;//0为设置密码阶段，1为验证密码阶段

var  set = document.getElementById('set');
var confirm = document.getElementById('confirm');
var show = document.getElementById('show');
var reset = document.getElementById('reset');
var wrap = document.getElementById('wrap');
var img = document.getElementsByTagName('img')[0];
var time = document.getElementById('time');
var dayTime = document.getElementById('dayTime');

var offsetX,offsetY;

window.onresize= function(){ location=location }; 
window.onload = function(){

	//console.log(getPass());
	//storePass("1 2 3 4 5");
	//console.log(getPass());
	//clearPass();

	oldTime = getTime();
	//console.log(oldTime);
	time.innerHTML = oldTime;
	dayTime.innerHTML = dayPart;

	setInterval(function(){
		nowTime = getTime();
		if(nowTime != oldTime){
			time.innerHTML = nowTime;
			oldTime = nowTime;
		}
	}, 1000);

	reset.addEventListener('click',function(){//重置密码
		clearPass();
		show.innerHTML = "密码清零成功,输入新密码！";
		set.checked = 'true';
		processPass = 0;
	});

	set.addEventListener('click',function(){//输入密码，已有密码情况下，需先验证密码，再做修改
		processPass = 0;
		show.innerHTML='进入设置密码模式！';
	});
	confirm.addEventListener('click',function(){
		processPass = 1;
		show.innerHTML='进入验证密码模式！';
	});

	var canvas = document.getElementById('myCanvas');
	var radius = countRad(WIDTH);
	console.log("按钮半径:"+radius);
	offsetX = canvas.offsetLeft + wrap.offsetLeft;
	console.log(offsetX);
	offsetY = canvas.offsetTop;


	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	ctx = canvas.getContext('2d');
	
	getBtns(WIDTH,HEIGHT);

	drawBtns("#ccc",3);


	canvas.onmousedown = function(event){
		var e = event || window.event;
		var x = e.clientX - offsetX;
        var y =e.clientY - offsetY;

        canvas.style.cursor = "pointer";
        for(var i=0,len = btns.length ;i<len;i++){

			if(Math.pow(x-btns[i].x,2)+Math.pow(y-btns[i].y,2) <= Math.pow(radius,2)){
			   pass.push(btns[i].index);
			   btns[i].active = false;
			   input++;
			}
		}
		
	};
	canvas.onmousemove = function(event){
		img.setAttribute('src','img/2.png');
		var e = event || window.event;
		var x = e.clientX - offsetX;
		var y = e.clientY - offsetY;
		//console.log(x+" "+y);
		if(input > 0){
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
			drawBtns("#ccc",3);

			var lastBtn = getBtn(pass[input-1]);
			var lastX = lastBtn.x;
			var lastY = lastBtn.y;

			ctx.strokeStyle = 'rgba(2,44,233,1)';
			ctx.lineWidth = "5";
			ctx.lineCap="round";
			ctx.beginPath();
			ctx.moveTo(lastX, lastY);
			ctx.lineTo(x, y);
			//ctx.closePath();
			ctx.stroke();

			

			drawLine();
			
			
			for(var i=0,len = btns.length ;i<len;i++){
				if(btns[i].active && Math.pow(x-btns[i].x,2)+Math.pow(y-btns[i].y,2) <= Math.pow(radius,2)){
					//console.log(x+" "+y);
			   		pass.push(btns[i].index);
			   		btns[i].active = false;
			   		input++;
			   		canvas.style.cursor = "pointer";
			   		drawLine();
				}
			}

		}
		// else{
		// 	for(var j=0,len2 = btns.length ;j<len2;j++){
		// 		if(btns[j].active && Math.pow(x-btns[j].x,2)+Math.pow(y-btns[j].y,2) <= Math.pow(radius,2)){
		// 			//console.log(x+" "+y);
			   		
		// 	   		canvas.style.cursor = "pointer";
			   		
		// 		}else{
		// 			canvas.style.cursor = "auto";
		// 		}
		// 	}

		// }
	};
	canvas.onmouseup = function(){
		canvas.style.cursor = "auto";

		if(input>=4){

			console.log("Password is:");
			var password = pass[0];
			for(var i = 1,len = input; i < len ; i++){
				password = password +" "+ pass[i];
			}

			var oldPass = getPass();
			if(processPass === 0){
				
				//已有密码，输入正确密码解锁，并更改密码
				if( typeof oldPass == 'string' ){
					if(password == oldPass){
						show.innerHTML="验证成功，请输入新密码";
						clearPass();
					}else{
						show.innerHTML="密码输入错误，输入正确密码进行修改";
					}

				}else{//没有密码，第一次使用
					show.innerHTML="新密码存入成功！";
					storePass(password);

				}
			}else if(processPass === 1){//验证密码
				//已有密码，输入正确密码解锁，并更改密码
				if( typeof oldPass == 'string' ){
					if(password == oldPass){
						show.innerHTML="验证成功";
					}else{
						show.innerHTML="验证失败,请重新输入";
					}

				}
				else{
					set.checked = 'true';
					show.innerHTML="首次使用，请设置密码";
					processPass =0;
				}
			}
			//画背景
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
			initBtns();
			drawBtns("#ccc",3);
			
			//清空状态
			pass = [];
			input = 0;
			
			console.log(password);
		}else if(input > 0){
			//画背景
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
			initBtns();
			drawBtns("#ccc",3);
			
			//清空状态
			pass = [];
			input = 0;
			
			show.innerHTML="输入密码小于4位！";

		}


	};
	canvas.onmouseout = function(){
		img.setAttribute('src','img/1.png');
	};


	//手机点击事件
	canvas.addEventListener("touchstart",function(event){
		var e = event || window.event;
		var touch = event.targetTouches[0];
		e.preventDefault();
		var x = touch.clientX - offsetX;
        var y = touch.clientY - offsetY;

        //canvas.style.cursor = "pointer";
        for(var i=0,len = btns.length ;i<len;i++){

			if(Math.pow(x-btns[i].x,2)+Math.pow(y-btns[i].y,2) <= Math.pow(radius,2)){
			   pass.push(btns[i].index);
			   btns[i].active = false;
			   input++;
			}
		}
		

	});
	//手机移动事件
	canvas.addEventListener("touchmove",function(event){
		
		img.setAttribute('src','img/2.png');
		var e = event || window.event;

		e.preventDefault();
		var touch = e.targetTouches[0];
		var x = touch.clientX - offsetX;
		var y = touch.clientY - offsetY;
		//console.log(x+" "+y);
		if(input > 0){
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
			drawBtns("#ccc",3);

			var lastBtn = getBtn(pass[input-1]);
			var lastX = lastBtn.x;
			var lastY = lastBtn.y;

			ctx.strokeStyle = 'rgba(2,44,233,1)';
			ctx.lineWidth = "5";
			ctx.lineCap="round";
			ctx.beginPath();
			ctx.moveTo(lastX, lastY);
			ctx.lineTo(x, y);
			//ctx.closePath();
			ctx.stroke();

			drawLine();
		
			for(var i=0,len = btns.length ;i<len;i++){
				if(btns[i].active && Math.pow(x-btns[i].x,2)+Math.pow(y-btns[i].y,2) <= Math.pow(radius,2)){
					//console.log(x+" "+y);
			   		pass.push(btns[i].index);
			   		btns[i].active = false;
			   		input++;
			   		canvas.style.cursor = "pointer";
			   		drawLine();
				}
			}
		}
	});
	//手机离开事件
	canvas.addEventListener("touchend",function(event){
		
		img.setAttribute('src','img/1.png');
		if(input>=4){

			console.log("Password is:");
			var password = pass[0];
			for(var i = 1,len = input; i < len ; i++){
				password = password +" "+ pass[i];
			}

			var oldPass = getPass();
			if(processPass === 0){
				
				//已有密码，输入正确密码解锁，并更改密码
				if( typeof oldPass == 'string' ){
					if(password == oldPass){
						show.innerHTML="验证成功，请输入新密码";
						clearPass();
					}else{
						show.innerHTML="密码输入错误，输入正确密码进行修改";
					}

				}else{//没有密码，第一次使用
					show.innerHTML="新密码存入成功！";
					storePass(password);

				}
			}else if(processPass === 1){//验证密码
				//已有密码，输入正确密码解锁，并更改密码
				if( typeof oldPass == 'string' ){
					if(password == oldPass){
						show.innerHTML="验证成功";
					}else{
						show.innerHTML="验证失败,请重新输入";
					}

				}
				else{
					set.checked = 'true';
					show.innerHTML="首次使用，请设置密码";
					processPass =0;
				}
			}
			//画背景
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
			initBtns();
			drawBtns("#ccc",3);
			
			//清空状态
			pass = [];
			input = 0;
			
			console.log(password);
		}else if(input > 0){
			//画背景
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
			initBtns();
			drawBtns("#ccc",3);
			
			//清空状态
			pass = [];
			input = 0;
			
			show.innerHTML="输入密码小于4位！";

		}
	});



	//画出连接线
	function drawLine(){
		if(input >= 2){
			var fistBtn = getBtn(pass[0]);
			var firstX = fistBtn.x;
			var firstY = fistBtn.y;
			ctx.strokeStyle = 'rgba(2,44,233,1)';
			ctx.lineWidth = "5";
			ctx.lineJoin="round"; 
			ctx.moveTo(firstX,firstY);

			for(var i = 1 ,len = input ; i < len ; i++){
				var nowBtn = getBtn(pass[i]);
				var lastX = nowBtn.x;
				var lastY = nowBtn.y;

				ctx.lineTo(lastX, lastY);

			}
			//ctx.closePath();
			ctx.stroke();
		}

	}
	function getBtn(index){
		if(index <= btns.length && typeof index == 'number' ){
			for(var i = 0,len =btns.length ; i < len ;i++){
				if(btns[i].index == index){
					return {
								x:btns[i].x,
								y:btns[i].y
							};
				}
			}
		}else{
			return;
		}
	}

	//画出按钮
	function drawBtns(color,lineWidth){
		if(!! btns){
			for(var i=0,len = btns.length ;i<len;i++){

				ctx.strokeStyle = color;
				ctx.fillStyle = "#F8F2F2";
				ctx.lineWidth = lineWidth;

				ctx.beginPath();
				ctx.arc(btns[i].x, btns[i].y, radius, 0, 2*Math.PI);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();

				if(!btns[i].active){
					ctx.strokeStyle = "#555FCB";
					ctx.fillStyle = "rgba(2,44,233,0)";
					ctx.lineWidth = 3;

					ctx.beginPath();
					ctx.arc(btns[i].x, btns[i].y, radius/3, 0, 2*Math.PI);
					ctx.closePath();
					ctx.fill();
					ctx.stroke();

				}
			}
		}
		
	}
	//清楚按钮状态
	function initBtns(){
		if(!! btns){
			for(var i=0,len = btns.length ;i<len;i++){
				btns[i].active = true;
			}
		}

	}

	//获得按钮位置
	function getBtns(x,y){

		var baseDistance = Math.floor(x/6);
		var distance = 2*baseDistance; 
		for(var i = 0; i < 3;i++){
			for(var j = 0; j < 3;j++){
				var aBtn = {
					y: i*distance + baseDistance,
					x: j*distance + baseDistance,
					index: j+1+i*3,
					active:true
				};
				//console.log(aBtn);
				btns.push(aBtn);
			}
		}
		
	}
	//计算按钮半径
	function countRad(width){
		return Math.floor(width/12);
	}

	//创建连接
	function getLocalStorage(){
		try{
			if(!!window.localStorage){
				return window.localStorage;
			}
		}catch(e){
			return undefined;
		}
		

	}
	//localstorage存密码
	function storePass(ele){
		var db = getLocalStorage();
		db.setItem('password',ele);
	}
	//localstorage取密码
	function getPass(){
		var db = getLocalStorage();
		try{
			if (!!db.getItem('password')){
				return db.getItem('password');
			}
		}catch(e){
			return null;
		}
	}
	//localstorage清除密码
	function clearPass(){
		var db = getLocalStorage();
		db.removeItem('password');

	}
	//获取系统时间
	function getTime(){

		var oDate = new Date(); //实例一个时间对象；
		var hour = 	oDate.getHours();
		var minute = oDate.getMinutes();
		//单数字前面加“0”
		if(minute.toString().length==1){
			minute = "0"+minute.toString();
		}
		if(hour.toString().length==1){
			hour = "0"+hour.toString();
		}


		if(hour >= 12 && dayPart != "PM" ){
			dayPart = "PM";
			dayTime.innerHTML = dayPart;

		}else if(hour < 12 && dayPart != "AM" ){
			dayPart = "AM";
			dayTime.innerHTML = dayPart;
		}
		return hour+":"+minute;

	}
};