var $canvas = $('#canvas')
   ,$header = $('header');
var width
   ,height
   ,ctx = $canvas[0].getContext('2d');

var table = {
	left: 0,
	width: 200,
	height: 50,
	color: '#f00',
	step: 20
};
var ball = {
	x: 20,
	y: 10,
	vx: 10,
	vy: 10,
	r: 20,
	color: '#0f0'
}
function resizeCanvas() {  

	width = $(window).get(0).innerWidth;
	height = $(window).get(0).innerHeight - $header.height()
    $canvas.attr("width", width);  
    $canvas.attr("height",  height);  	
    ctx.fillRect(0, 0, $canvas.width(), $canvas.height());  
    render();
}

function render (){
	ctx.clearRect(0,0,width,height); 
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, $canvas.width(), $canvas.height());
	drawBall(); 
	drawTable();
	
}
function drawTable () {

	ctx.fillStyle = table.color;
	ctx.fillRect(table.left, height - 1.5 * table.height, table.width, table.height);
	// ctx.fillRect(width/2 - table.width/2, 0, table.width, table.height);

}
function drawBall () {
	ctx.fillStyle = ball.color;
	ctx.moveTo(ball.x , ball.y);
	ctx.arc(ball.x , ball.y , ball.r , 0 , Math.PI*2 , false);
	ctx.fill();
}

$(document).ready(function() {
 	resizeCanvas();
 	setInterval(function () {
 		if(ball.x < 0 || ball.x > width){
 			ball.vx = - ball.vx;
 		}
 		if(ball.y < 0 || ball.y > height){
 			ball.vy = - ball.vy;
 			console.log(ball.vy);
 		}
 		ball.x += ball.vx;
 		ball.y += ball.vy;
 		
 		
 		// render();
 	}, 10);
});

$(window).resize(function() {
 	resizeCanvas();
 });

$(window).on( "mousemove", function (e) {
	var left = event.pageX - table.width/2;
	if(left >= 0 && left <= width - table.width){
		table.left = left;
	}
	// if(e.which === 37 && table.left - table.step >= 0){
	// 	table.left -= table.step; 
	// }else if(e.which === 39 && table.left + table.width <= width){
	// 	table.left += table.step;
	// }
	render();
});

