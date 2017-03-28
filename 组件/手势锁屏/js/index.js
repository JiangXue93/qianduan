const WIDTH = 300;
const HEIGHT = 300;
var btns = [];
var dayPart;
var input = 0;
var oldTime, nowTime;
var offsetX, offsetY;
var pass = [];
var processPass = 0;//0为设置密码阶段，1为验证密码阶段
var canvas = document.getElementById('myCanvas');
var dayTime = document.getElementById('dayTime');
var confirm = document.getElementById('confirm');
var img = document.getElementsByTagName('img')[0];
var reset = document.getElementById('reset');
var show = document.getElementById('show');
var set = document.getElementById('set');
var time = document.getElementById('time');
var wrap = document.getElementById('wrap');

window.onresize= function(){ location=location ;}; 
window.onload = function(){
	var radius = countRad(WIDTH);
	//动态修改页面顶部时间
	oldTime = getTime();
	time.innerHTML = oldTime;
	dayTime.innerHTML = dayPart;
	setInterval(function(){
		nowTime = getTime();
		if(nowTime != oldTime){
			time.innerHTML = nowTime;
			oldTime = nowTime;
		}
	}, 1000);
	//重置密码按钮添加click时间
	reset.addEventListener('click',function(){
		clearPass();//清除localstorage密码
		show.innerHTML = "密码清零成功,输入新密码！";
		set.checked = 'true';
		processPass = 0;
	});
	//设置密码
	set.addEventListener('click',function(){//输入密码，已有密码情况下，需先验证密码，再做修改
		processPass = 0;
		show.innerHTML='进入设置密码模式！';
	});
	//验证密码
	confirm.addEventListener('click',function(){
		processPass = 1;
		show.innerHTML='进入验证密码模式！';
	});
	//canvas距离浏览器边距位置
	offsetX = canvas.offsetLeft + wrap.offsetLeft;
	offsetY = canvas.offsetTop;
	//初始化canvas
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	ctx = canvas.getContext('2d');
	//获取button按钮信息
	getBtns(WIDTH,HEIGHT);
	drawBtns("#ccc",3);
	//canvas添加监控
	canvas.onmousedown = function(event){
		var e = event || window.event;
		var x = e.clientX - offsetX;
        var y =e.clientY - offsetY + Math.floor(document.getElementsByTagName('body')[0].scrollTop);
        //清除动画相关类
        removeClass(wrap, "shack");
        removeClass(show.parentNode, "show"); 
        for(var i=0,len = btns.length ;i<len;i++){

			if(Math.pow(x-btns[i].x,2)+Math.pow(y-btns[i].y,2) <= Math.pow(radius,2)){
			   pass.push(btns[i].index);
			   btns[i].active = false;
			   input++;
			   pointInBtn = 1;
			   break;//跳出循环  
			}
		}
	};
	canvas.onmousemove = function(event){
		img.setAttribute('src','img/2.png');
		var e = event || window.event;
		var x = e.clientX - offsetX;
		var y = e.clientY - offsetY + Math.floor(document.getElementsByTagName('body')[0].scrollTop);//- e.scrollTop;
		//处理鼠标样式
		for(var j = 0, len2 = btns.length; j < len2; j++){
				if( Math.pow(x - btns[j].x, 2) + Math.pow(y - btns[j].y, 2) <= Math.pow(radius, 2)){
			   		canvas.style.cursor = "pointer";
			   		break;
				}else{
					canvas.style.cursor = "auto";
				}
		}
		//input不为0代表已经有按键被激活，画面处于密码输入阶段
		if(input > 0){
			canvas.style.cursor = "pointer";
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
			drawBtns("#ccc", 3);
			//取得最后被激活的button信息
			var lastBtn = getBtn(pass[input - 1]);
			var lastX = lastBtn.x;
			var lastY = lastBtn.y;
			//动态更新最后一个button到鼠标的连线
			ctx.strokeStyle = 'rgba(2,44,233,1)';
			ctx.lineWidth = "5";
			ctx.lineCap = "round";
			ctx.beginPath();
			ctx.moveTo(lastX, lastY);
			ctx.lineTo(x, y);
			ctx.stroke();
			//画出已输入密码的历史轨迹
			drawLine();
			//判断当前鼠标位置是否进入活动状态的button
			for(var i = 0, len = btns.length; i < len; i++){
				if(btns[i].active && Math.pow(x - btns[i].x, 2) + Math.pow(y - btns[i].y, 2) <= Math.pow(radius, 2)){
			   		pass.push(btns[i].index);//密码存入pass
			   		btns[i].active = false;//当前button状态变为不活动
			   		input++;
			   		drawLine();//更新历史密码轨迹
				}
			}

		}
	};
	canvas.onmouseup = function(){
		canvas.style.cursor = "auto";
		//密码输入位数大于等于4个
		if(input>=4){
			console.log("Password is:");
			//打印密码内容
			var password = pass[0];
			for(var i = 1, len = input; i < len; i++){
				password = password + " " + pass[i];
			}
			console.log(password);
			//从localstorage取得老密码
			var oldPass = getPass();
			if(processPass === 0){//processPass为0设置密码阶段，1为验证密码阶段
				//localstorage已有密码，输入正确密码解锁，并更改密码
				if( typeof oldPass == 'string' ){
					if(password == oldPass){
						show.innerHTML = "密码确认成功！";
						storePass(password);//localstorage存储密码
						confirm.checked = 'true';//流程切换为验证密码阶段
						processPass = 1;	
					}else{
						show.innerHTML = "与上一次密码不一致，请输入正确密码";
						addClass(wrap, "shack");
					}
				}else{//localstorage没有密码，判定用户为第一次使用
					show.innerHTML = "请再次输入密码！";
					storePass(password);
				}
				addClass(show.parentNode, "show");
			}else if(processPass === 1){//processPass为0设置密码阶段，1为验证密码阶段
				//已有密码，输入正确密码解锁，并更改密码
				if(typeof oldPass == 'string'){
					if(password == oldPass){
						show.innerHTML = "验证成功";
					}else{
						show.innerHTML = "验证失败,请重新输入";
						addClass(wrap, "shack");
					}
				}
				//localStorage没有密码，切换流程至设置密码阶段
				else{
					set.checked = 'true';
					show.innerHTML = "首次使用，请设置密码";
					processPass = 0;
				}
				addClass(show.parentNode, "show");
			}
			//画背景
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
			initBtns();//初始化button状态
			drawBtns("#ccc",3);			
			//清空密码状态
			pass = [];
			input = 0;
		}else if(input > 0){//密码输入小于4位
			//画背景
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
			initBtns();
			drawBtns("#ccc", 3);		
			//清空状态
			pass = [];
			input = 0;			
			show.innerHTML = "输入密码小于4位！";
			addClass(wrap, "shack");
			addClass(show.parentNode, "show");
		}
	};
	canvas.onmouseout = function(){
		img.setAttribute('src', 'img/1.png');
	};
	//手机点击事件
	canvas.addEventListener("touchstart", function(event){
		img.setAttribute('src','img/2.png');
		var e = event || window.event;
		var touch = event.targetTouches[0];
		e.preventDefault();
		var x = touch.clientX - offsetX;
        var y = touch.clientY - offsetY;
        //清除动画类
        removeClass(wrap, "shack");
        removeClass(show.parentNode, "show");
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
		if(input > 0){
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
			drawBtns("#ccc",3);
			var lastBtn = getBtn(pass[input-1]);
			var lastX = lastBtn.x;
			var lastY = lastBtn.y;
			//设置画笔样式
			ctx.strokeStyle = 'rgba(2,44,233,1)';
			ctx.lineWidth = "5";
			ctx.lineCap="round";
			ctx.beginPath();
			ctx.moveTo(lastX, lastY);
			ctx.lineTo(x, y);
			ctx.stroke();
			drawLine();
			for(var i=0,len = btns.length ;i<len;i++){
				if(btns[i].active && Math.pow(x - btns[i].x, 2) + Math.pow(y - btns[i].y, 2) <= Math.pow(radius, 2)){
			   		pass.push(btns[i].index);
			   		btns[i].active = false;
			   		input++;
			   		drawLine();
				}
			}
		}
	});
	//手机离开事件
	canvas.addEventListener("touchend", function(event){
		img.setAttribute('src','img/1.png');
		//密码输入位数大于等于4个
		if(input>=4){
			console.log("Password is:");
			//打印密码内容
			var password = pass[0];
			for(var i = 1, len = input; i < len; i++){
				password = password + " " + pass[i];
			}
			console.log(password);
			//从localstorage取得老密码
			var oldPass = getPass();
			if(processPass === 0){//processPass为0设置密码阶段，1为验证密码阶段
				//localstorage已有密码，输入正确密码解锁，并更改密码
				if( typeof oldPass == 'string' ){
					if(password == oldPass){
						show.innerHTML = "密码确认成功！";
						storePass(password);//localstorage存储密码
						confirm.checked = 'true';//流程切换为验证密码阶段
						processPass = 1;	
					}else{
						show.innerHTML = "与上一次密码不一致，请输入正确密码";
						addClass(wrap, "shack");
					}
				}else{//localstorage没有密码，判定用户为第一次使用
					show.innerHTML = "请再次输入密码！";
					storePass(password);
				}
			}else if(processPass === 1){//processPass为0设置密码阶段，1为验证密码阶段
				//已有密码，输入正确密码解锁，并更改密码
				if(typeof oldPass == 'string'){
					if(password == oldPass){
						show.innerHTML = "验证成功";
					}else{
						show.innerHTML = "验证失败,请重新输入";
						addClass(wrap, "shack");
					}
				}
				//localStorage没有密码，切换流程至设置密码阶段
				else{
					set.checked = 'true';
					show.innerHTML = "首次使用，请设置密码";
					processPass = 0;
				}
			}
			//画背景
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
			initBtns();//初始化button状态
			drawBtns("#ccc",3);			
			//清空密码状态
			pass = [];
			input = 0;
		}else if(input > 0){//密码输入小于4位
			//画背景
			ctx.clearRect(0, 0, WIDTH, HEIGHT);
			initBtns();
			drawBtns("#ccc", 3);		
			//清空状态
			pass = [];
			input = 0;			
			show.innerHTML = "输入密码小于4位！";
			addClass(wrap, "shack");
		}
		addClass(show.parentNode, "show");
	});
	//画出密码连接线
	function drawLine(){
		if(input >= 2){
			var fistBtn = getBtn(pass[0]);
			var firstX = fistBtn.x;
			var firstY = fistBtn.y;
			ctx.strokeStyle = 'rgba(2,44,233,1)';
			ctx.lineWidth = "5";
			ctx.lineJoin = "round"; 
			ctx.moveTo(firstX, firstY);
			for(var i = 1, len = input; i < len; i++){
				var nowBtn = getBtn(pass[i]);
				var lastX = nowBtn.x;
				var lastY = nowBtn.y;
				ctx.lineTo(lastX, lastY);
			}
			ctx.stroke();
		}

	}
	//根据button的编号取得button的位置信息
	function getBtn(index){
		if(index <= btns.length && typeof index == 'number' ){
			for(var i = 0, len = btns.length; i < len ; i++){
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

	//画出button按钮
	function drawBtns(color, lineWidth){
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
				if(!btns[i].active){//如果按钮不是活跃状态，说明被触发过，用另一种状态表示
					ctx.strokeStyle = "#555FCB";
					ctx.fillStyle = "rgba(222,0,23,0.2)";
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
			for(var i=0, len = btns.length; i < len; i++){
				btns[i].active = true;//按钮状态变为活跃
			}
		}

	}
	//取得button按钮对象
	function getBtns(x, y){
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
				btns.push(aBtn);
			}
		}
		
	}
	//计算按钮半径
	function countRad(width){
		return Math.floor(width/12);
	}
	//创建localStorage连接
	function getLocalStorage(){
		try{
			if(!!window.localStorage){
				return window.localStorage;
			}
		}catch(e){
			return undefined;
		}
	}
	//向localstorage存密码
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
		var hour = oDate.getHours();
		var minute = oDate.getMinutes();
		//单数字时间前面加“0”
		if(minute.toString().length == 1){
			minute = "0" + minute.toString();
		}
		if(hour.toString().length==1){
			hour = "0" + hour.toString();
		}
		//更改“AM”,"PM"
		if(hour >= 12 && dayPart != "PM" ){
			dayPart = "PM";
			dayTime.innerHTML = dayPart;

		}else if(hour < 12 && dayPart != "AM" ){
			dayPart = "AM";
			dayTime.innerHTML = dayPart;
		}
		return hour + ":" + minute;

	}
	//判断class是否存在
	function hasClass(ele, cls) {
    	return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
	}
	//为指定的dom元素添加class
	function addClass(ele, cls) {
   		if (!hasClass(ele, cls)) ele.className += " " + cls;
	}
	//删除指定dom元素的class
	function removeClass(ele, cls) {
    	if (hasClass(ele, cls)) {
        	var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        	var temp = ele.className.replace(reg, " ");
        	ele.className = temp.replace(/(^\s*)|(\s*$)/g, "");//去除头尾的空字符
        	
    	}
	}
	//dom元素如果存在(不存在)，就删除(添加)一个class
	function toggleClass(ele,cls){ 
    	if(hasClass(ele, cls)){ 
        	removeClass(ele, cls); 
    	}else{ 
        	addClass(ele, cls); 
    	} 
	}
};