var pictureList = document.getElementById("wrap").getElementsByTagName("li");
var btns = document.getElementById("btn").getElementsByTagName("span");

var left = document.getElementById("left-control");
var right = document.getElementById("right-control");
var wrap = document.getElementById("wrap");
var btnWrap = document.getElementById("btn");
var container = document.getElementById("container");
var timer;
window.onload = function(){

	var isActive = 0;
	var nextActive = 1;
	
	//init();
	console.log(btns);
	console.log(pictureList);
	
	run();
	container.addEventListener('mouseover',function(){
		showControl();
		stop();
	});
	container.addEventListener('mouseout',function(){
		hideControl();
		run();
	});
	// btnWrap.addEventListener('mouseover',function(){
	// 	// showControl();
	// 	stop();
	// });

	btnWrap.addEventListener('click', function(event){
		var event =  event || window.event;
		var index = event.target.getAttribute('data-index');
		if( index && index!=isActive){
			nextActive = index;
			moveToNext();
		}
		
	});

	function run(){
		timer = setInterval(function(){
		moveToNext();
		},3000);
	}
	function stop(){
		clearInterval(timer);
	}


	//展示左右按钮
	function showControl(){

		left.style.display = "block";
		right.style.display = "block";
	}
	//隐藏左右按钮
	function hideControl(){
		left.style.display = "none";
		right.style.display = "none";

	}
	//计算到下一个active图片的移动距离
	function getDes(nextActive,width){
		if(width <= 0 && typeof width != "number")
			return null;
		return width*(-nextActive);

	}

	//移动图片和提示标
	function moveToNext(){
		var move = getDes(nextActive,790);

		for(var j = 0 ; j < btns.length; j++){
			if(nextActive == j){
				btns[j].setAttribute("class", "on");
			} else{
				btns[j].setAttribute("class", "off"); 
			}
		}

		for(var i = 0 ; i < pictureList.length ; i++){
			// if(nextActive == 0){
			// 	pictureList[i].style.setProperty('transition','none');
			// }else{
				pictureList[i].style.setProperty('transition','all 1s ease-in-out');
			// }
			pictureList[i].style.setProperty('transform','translate('+move+'px,0px)');
		}

		
		
		isActive = nextActive;
		nextActive++;
		if(nextActive >= pictureList.length){
			nextActive = 0;
		}
		//console.log(isActive,nextActive);
	}
}