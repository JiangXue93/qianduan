var canvas = document.getElementById("canvas");
var car = document.getElementById("car");
var RADIUS = 5;
const WIDTH = 500;
const HEIGHT = 500;
var offsetX,
	offsetY;

var btns = [];
var nodes = [];


window.onload = function(){

	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	if(canvas.getContext('2d')){
		//初始化界面
		var ctx = canvas.getContext('2d');

		btns.push({x:400,y:400,active:0,color:"#12CAF6"});
		btns.push({x:100,y:100,active:0,color:"#12CAF6"});

		nodes.push({x:0,y:500,color:"#000"});
		nodes.push({x:500,y:0,color:"#000"});
		
		update();

		//处理点击事件
		canvas.onmousedown = function(event){
			var e = event || window.event;

			var clickX = e.clientX;
			var clickY = e.clientY;
			console.log(clickX+" "+clickY);

			for(var i = 0; i < btns.length; i++){
				if(Math.pow(clickX - btns[i].x , 2) + Math.pow(clickY - btns[i].y , 2) <= Math.pow(RADIUS , 2)){
					btns[i].active = 1;
					offsetX = clickX - btns[i].x;
					offsetY = clickY - btns[i].y;
				}
			}	
		};

		//处理移动事件
		canvas.onmousemove = function(event){
			var e = event || window.event;

			var clickX = e.clientX;
			var clickY = e.clientY;

			for(var i = 0; i < btns.length; i++){
				if(btns[i].active == 1){
					btns[i].x = clickX - offsetX;
					btns[i].y = clickY - offsetY;

					update();//更新画图
					car.style = " ";
					car.className="pause";


				}
			}

		};

		//处理点击撤销事件
		canvas.onmouseup = function(){
			for(var i = 0; i < btns.length; i++){
				if(btns[i].active == 1){
					btns[i].active = 0;

					//

					car.style.animation = "mymove 3s cubic-bezier("+btns[0].x/500+","+ (1-btns[0].y/500)+","+btns[1].x/500+","+(1-btns[1].y/500)+") infinite";
					car.className="run";
				}
			}
		};


		
	}
	function update(){
		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		draw(btns);
		draw(nodes);
		drawBtnLine();
		drawBezier();
	}
	//画点
	function draw(element){
		//ctx.clearRect(0, 0, WIDTH, HEIGHT);
		
		for(var i = 0; i < element.length; i++){
			ctx.fillStyle = element[i].color;
			ctx.beginPath();
			ctx.arc(element[i].x, element[i].y, RADIUS, 0, 2*Math.PI);
			ctx.closePath();

			ctx.fill();
		}
	}
	//画连接线
	function drawBtnLine(){
		for(var i = 0; i < btns.length; i++){
			ctx.strokeStyle = "red";
			ctx.beginPath();
			ctx.moveTo(btns[i].x, btns[i].y);
			ctx.lineWidth = 3;	
			ctx.lineTo(nodes[i].x, nodes[i].y);
			ctx.closePath();
			
			ctx.stroke();
		}
		
	}
	//画贝塞尔曲线
	function drawBezier(){

		ctx.beginPath();
		ctx.moveTo(nodes[0].x,nodes[0].y);
		ctx.lineWidth = 2;
		ctx.strokeStyle = "black";
		ctx.bezierCurveTo(btns[0].x, btns[0].y, btns[1].x, btns[1].y, nodes[1].x, nodes[1].y);
		ctx.stroke();
	}
};