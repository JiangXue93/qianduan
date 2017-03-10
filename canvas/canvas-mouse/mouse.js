var canvas = document.getElementById("canvas");
var clickX;
var clickY;
var elementOffsetLeft = 100;
var elementOffsetTop = 100;

var clickElement = [];
window.onload = function(){
	canvas.width = 500;
	canvas.height = 300;

	if(canvas.getContext('2d'))
	{
		var ctx = canvas.getContext('2d');

		ctx.moveTo(100, 100);
		ctx.fillStyle = "red";
		ctx.rect(100, 100, 100, 100);
		ctx.rect(300, 100, 100, 100);
		ctx.fill();
		
		canvas.onmousedown = function(e){
			var event = e || window.event;
            var x = e.clientX;
            var y =e.clientY;

            clickX = x - elementOffsetLeft;
            clickY = y - elementOffsetTop;
            console.log(x+" "+y);
            

            if(ctx.isPointInPath(x, y)){
            	console.log("点击了方块的"+clickX+" "+clickY);
            	clickElement.push([clickX,clickY]);
            }
            
		};
		canvas.onmousemove = function(e){
			var event = e || window.event;

			if(clickElement.length > 0)
			{
				var mouseX = e.clientX - canvas.offsetLeft;
				var mouseY = e.clientY - canvas.offsetTop;
				ctx.clearRect(0, 0, 500, 300);
				ctx.beginPath();
				ctx.rect(mouseX-clickX, mouseY-clickY, 100, 100);
				ctx.fill();
				ctx.closePath();
			}
		
		canvas.onmouseup = function(e){
			var event = e || window.event;

			if(clickElement.length > 0){
				
				elementOffsetLeft = e.clientX - clickX;
				elementOffsetTop = e.clientY - clickY;
				clickElement.pop();
			}

		};
		
	};
	}
};
