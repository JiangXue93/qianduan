const WIDTH = 300;
const HEIGHT = 300;
var btns = [];
var pass = [];
var input = 0;

var processPass = 0;//0为设置密码阶段，1为验证密码阶段

var  set = document.getElementById('set');
var confirm = document.getElementById('confirm');
var show = document.getElementById('show');
var reset = document.getElementById('reset');

window.onload = function(){

	//console.log(getPass());
	//storePass("1 2 3 4 5");
	//console.log(getPass());
	//clearPass();

	reset.addEventListener('click',function(){
		clearPass();
		show.innerHTML = "密码清零成功,输入新密码！";
		set.checked = 'true';
		processPass = 0;
	});

	set.addEventListener('click',function(){
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

	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	ctx = canvas.getContext('2d');
	
	getBtns(WIDTH,HEIGHT);

	drawBtns("#5CDE5C",15);


	canvas.onmousedown = function(event){
		var e = event || window.event;
		var x = e.clientX;
        var y =e.clientY;

        for(var i=0,len = btns.length ;i<len;i++){

			if(Math.pow(x-btns[i].x,2)+Math.pow(y-btns[i].y,2) <= Math.pow(radius,2)){
			   pass.push(btns[i].index);
			   btns[i].active = false;
			   input++;
			}
		}
        if(ctx.isPointInPath(x, y)){
        	console.log(x+" "+y);
        }
		

	};
	canvas.onmousemove = function(event){
		var e = event || window.event;
		var x = e.clientX;
		var y =e.clientY;
		if(input > 0){
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
			drawBtns("#5CDE5C",15);

			var lastBtn = getBtn(pass[input-1]);
			var lastX = lastBtn.x;
			var lastY = lastBtn.y;

			ctx.strokeStyle = 'black';
			ctx.lineWidth = "5";

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
			   		
			   		drawLine();
				}
			}

		}
	};
	canvas.onmouseup = function(){
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
			drawBtns("#5CDE5C",15);
			
			//清空状态
			pass = [];
			input = 0;
			initBtns();
			console.log(password);
		}else if(input > 0){
			//画背景
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
			drawBtns("#5CDE5C",15);
			
			//清空状态
			pass = [];
			input = 0;
			initBtns();
			show.innerHTML="输入密码小于4位！";

		}
		

	};
	function drawLine(){
		if(input >= 2){
			var fistBtn = getBtn(pass[0]);
			var firstX = fistBtn.x;
			var firstY = fistBtn.y;
			ctx.strokeStyle = 'black';
			ctx.lineWidth = "5";
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
				ctx.lineWidth = lineWidth;

				ctx.beginPath();
				ctx.arc(btns[i].x, btns[i].y, radius, 0, 2*Math.PI);
				ctx.closePath();
				ctx.stroke();
			}
		}
		
	}
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
};