var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 468;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 0;

var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

var endTime = new Date();//var endTime = new Date(2017,4,1,23,43,44);月份6 是7月
endTime.setTime(endTime.getTime() + 3600*1000);

var curShowTimeSecond = 0;

window.onload = function(){
	WINDOW_WIDTH = document.body.clientWidth;
	WINDOW_HEIGHT = document.body.clientHeight;

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	// context.moveTo(100, 100);
	// context.lineTo(200, 200);
	// context.strokeStyle = "black";
	// context.stroke();
	curShowTimeSecond = getCurrentShowSeconds();

	setInterval(
		function(){
			render(context);
			update();
		},
		30);
	
};

function getCurrentShowSeconds(){
	var curTime = new Date();
	//var ret = endTime.getTime() - curTime.getTime();//注释部分为倒计时
	//ret = Math.round( ret/1000 );
	var ret = curTime.getHours()*3600 + curTime.getMinutes()*60 + curTime.getSeconds();
	//return ret > 0 ? ret : 0;
	return ret;
}

function update(){
	var nextShowTimeSeconds = getCurrentShowSeconds();//刷新图像

	var nextHour = parseInt( nextShowTimeSeconds / 3600 );
	var nextMin = parseInt( (nextShowTimeSeconds-nextHour*3600) / 60);
	var nextSec = nextShowTimeSeconds % 60;

	var curHour = parseInt( curShowTimeSecond / 3600 );
	var curMin = parseInt( (curShowTimeSecond-curHour*3600) / 60);
	var curSec = curShowTimeSecond % 60;

	if( nextSec != curSec)
	{
		//添加小球
		if(parseInt(nextHour/10) != parseInt(curHour/10)){
			addBalls(MARGIN_LEFT , MARGIN_TOP , parseInt(curHour/10));
		}
		if(parseInt(nextHour%10) != parseInt(curHour%10)){
			addBalls(MARGIN_LEFT+ 15*(RADIUS+1) , MARGIN_TOP  , parseInt(curHour%10));
		}
		if(parseInt(nextMin/10) != parseInt(curMin/10)){
			addBalls(MARGIN_LEFT+ 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMin/10));
		}
		if(parseInt(nextMin%10) != parseInt(curMin%10)){
			addBalls(MARGIN_LEFT+ 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMin%10));
		}
		if(parseInt(nextSec/10) != parseInt(curSec/10)){
			addBalls(MARGIN_LEFT+ 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSec/10));
		}
		if(parseInt(nextSec%10) != parseInt(curSec%10)){
			addBalls(MARGIN_LEFT+ 93*(RADIUS+1) , MARGIN_TOP , parseInt(curSec%10));
		}
		curShowTimeSecond = nextShowTimeSeconds;
	}
	updateBalls();
	console.log(balls.length);

}
function updateBalls(){
	for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            if(balls[i].vy < 5){
            	balls[i].vy = 0;
            }
            else{
            	balls[i].vy = - balls[i].vy*0.7;//(Math.random()*0.9);
            }
            
            
        }

        if(! ( balls[i].x +RADIUS >0 && balls[i].x - RADIUS <WINDOW_WIDTH))
        {
        	balls.splice(i, 1);//删除超出画布的balls
        }
    }
}
function addBalls(x , y , num){

	for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-10,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                };

                balls.push( aBall );
            }


}
function render(ctx){
	ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

	var hour = parseInt( curShowTimeSecond / 3600 );
	var min = parseInt( (curShowTimeSecond-hour*3600) / 60);
	var sec = curShowTimeSecond % 60;


	renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hour/10) , ctx);
	renderDigit(  MARGIN_LEFT+ 15*(RADIUS+1) , MARGIN_TOP , parseInt(hour%10) , ctx);

	renderDigit(  MARGIN_LEFT+ 30*(RADIUS+1) , MARGIN_TOP , 10 , ctx);//冒号

	renderDigit(  MARGIN_LEFT+ 39*(RADIUS+1) , MARGIN_TOP , parseInt(min/10) , ctx);
	renderDigit(  MARGIN_LEFT+ 54*(RADIUS+1) , MARGIN_TOP , parseInt(min%10) , ctx);

	renderDigit(  MARGIN_LEFT+ 69*(RADIUS+1) , MARGIN_TOP , 10 , ctx);//冒号

	renderDigit(  MARGIN_LEFT+ 78*(RADIUS+1) , MARGIN_TOP , parseInt(sec/10) , ctx);
	renderDigit(  MARGIN_LEFT+ 93*(RADIUS+1) , MARGIN_TOP , parseInt(sec%10) , ctx);

	for(var i = 0; i < balls.length ;i++){

		ctx.fillStyle = balls[i].color;
		ctx.beginPath();
		ctx.arc(balls[i].x, balls[i].y, RADIUS, 0 , 2*Math.PI );
		ctx.closePath();
		//alert("123");
		ctx.fill();
	}
}

function renderDigit( x , y , num , ctx ){
	ctx.fillStyle = "rgb(0,102,153)";

	for( var i = 0 ; i < digit[num].length ; i ++ )
        for(var j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                ctx.beginPath();
                ctx.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI );
                ctx.closePath();

                ctx.fill();
            }

}