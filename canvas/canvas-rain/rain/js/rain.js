var $canvas = $("canvas");
var width
   ,height
   ,ctx
   ;
var rain = {
	r:4,
	tail: 40,
	x:100,
	y:100,
	vy: 4,
	color: "#AEEBFB"
};
var wave = {
	width: 10,
	height: 50,
	x: 100,
	y:  500,
	v: 4,
	color: "#AEEBFB"
}
var rains = []
   ,waves = [];

//rains.push(rain);
//waves.push(wave);

function init () {
	width = $(window).get(0).innerWidth;
	height = $(window).get(0).innerHeight;
	// console.log(width + " " + height);
	$canvas.attr("width", width);  
    $canvas.attr("height",  height); 
	ctx = $canvas[0].getContext('2d');
	ctx.fillRect(0, 0, width, height);  
	render();
}

function render () {
	ctx.fillStyle = "#1A1414";
	ctx.fillRect(0, 0, width, height);
	for(var i=0; i < rains.length; i++){
		ctx.fillStyle = rains[i].color;
		ctx.beginPath();
		ctx.moveTo(rains[i].x, rains[i].y - rains[i].tail);
		ctx.lineTo(rains[i].x + rains[i].r, rains[i].y);
		ctx.arc(rains[i].x, rains[i].y, rains[i].r, 0, Math.PI, false);
		ctx.closePath();
		ctx.fill();
	}
	for(var j=0; j < waves.length; j++){
		ctx.strokeStyle = waves[j].color;
		//console.log(1);
		ctx.strokeWeight = 21;
		ctx.beginPath();
		ctx.arc(waves[j].x, waves[j].y, waves[j].width, 0, Math.PI*2, false);
		ctx.closePath();
		ctx.stroke();

		// EvenCompEllipse(ctx, waves[j].x, waves[j].y, waves[j].width, waves[j].height);

	}
	
}

function EvenCompEllipse(context, x, y, a, b)
{
   context.save();
   //选择a、b中的较大者作为arc方法的半径参数
   var r = (a > b) ? a : b; 
   var ratioX = a / r; //横轴缩放比率
   var ratioY = b / r; //纵轴缩放比率
   context.scale(ratioX, ratioY); //进行缩放（均匀压缩）
   context.strokeStyle = "blue"
   context.beginPath();
   //从椭圆的左端点开始逆时针绘制
   context.moveTo((x + a) / ratioX, y / ratioY);
   context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI);
   context.closePath();
   context.stroke();
   context.restore();
};

function action () {
	for(var i=0; i < rains.length; i++){
		rains[i].y += rains[i].vy;
		if(rains[i].y > height-100){
			if(rains[i].r >=2){
				addWave(rains[i].x, rains[i].r);
			}
			rains.splice(i,1);
		}
	}
	for(var j = 0; j < waves.length; j++){
		waves[j].width += waves[j].v;
		if(waves[j].width > 15){
			waves.splice(j,1);
		}
	}
	// console.log(rains.length);
}
function addWave (x,r) {
	var wave = {
		width: 10,
		height: 50,
		x: 100,
		y:  500,
		v: 1,
		color: "#AEEBFB"
	};
	wave.x = x;
	wave.y = height-100;
	waves.push(wave);
}
function addRain () {
	var newRain = {
		r:Math.random()*4,
		tail: 10,
		x: Math.floor(Math.random()*width),
		y:Math.floor(Math.random()*100),
		vy: 4,
		color: "#AEEBFB"
	}
	newRain.vy = newRain.r;
	newRain.tail = newRain.r*10;
	rains.push(newRain);
}
$(document).ready(function () {
	init();
	setInterval(
		function(){
			render();
			action();
			addRain();

		},
		20);
});
$(window).resize(init); 
