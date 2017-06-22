$(document).ready(function () {
	var $container = $('.container');
	var $test = $('test');

	var width = $container.width(),
		height = $container.height();

	var flowerPic = ['pic/flower1.png'
					,'pic/flower2.png'];
	var flowers = []; 

	function initFlower () {
		var flower = {
			startX: Math.random() * width,
			startY: Math.random() * 10,
			offsetX: Math.random() * width,
			endY: Math.random() * (height/4) + height * 3/4 ,
			duration: Math.random() * 10
		};

		var $flower = $(`<div class="floweMove"></div>`).css({
			'width': 40,
			'height': 40,
			'position': 'absolute',
			'top':flower.startY,
			'left': flower.startX,
			'backgroundImage': 'url('+ flowerPic[Math.floor(Math.random()*2)]+')',
			'backgroundSize': 'cover'

		});


		$container.append($flower);
		flowers.push($flower);
		//动画
		$flower.jQueryTween({
			from: {
				translate: {x:0, y:0, z:0},
				rotate: {x:0, y:0, z:0},
			},
			to: {
				translate: {x: flower.offsetX, y: flower.endY-flower.startY, z: 0}, 
				rotate: {x: 255, y:0, z:0},
			},
			repeat: 0,
			duration: 1500,
			delay: 0,
			easing: TWEEN.Easing.Quintic.EaseInOut,//http://www.cnblogs.com/cloudgamer/archive/2009/01/06/Tween.html
		},function () {
			//console.log("over");
			$flower.remove();
		},function () {
			//console.log("on"+$flower.offset().left+" "+width);
			check();
		}); 
	}
	//检查边界x
	function check() {
		var len = flowers.length
		for(var i = 0; i < len; i++) {
			if(flowers[i].offset().left >= width-50){
				flowers[i].stop();
				//console.log("chuqule");
				flowers[i].remove();
				flowers.splice(i,1);
			}

		}
	}
	// setInterval(function () {
	// 	initFlower();
	// 	console.log(flowers);
	// },500);
	// initFlower();

	$( window ).resize(function() {
		width = $container.width();
		height = $container.height();
  		console.log(width +" "+ height);
	});
});