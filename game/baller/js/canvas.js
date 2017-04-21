
var $canvas = $('#canvas')
		,$header = $('header');
var ctx = $canvas[0].getContext('2d');
function resizeCanvas() {  

    $canvas.attr("width", $(window).get(0).innerWidth);  
		
    $canvas.attr("height", $(window).get(0).innerHeight - $header.height());  
		
    ctx.fillRect(0, 0, $canvas.width(), $canvas.height());  
};  

$(document).ready(function() {
 	resizeCanvas();  
});

$(window).resize(function() {
 	resizeCanvas();
 });
