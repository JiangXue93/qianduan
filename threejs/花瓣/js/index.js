$(document).ready(function () {
	var $container = $('.container');
	var width = $container.width(),
		height = $container.height();

	var flowerPic = ['pic/flower1.png'
					,'pic/flower2.png'];
	// var flowers = [];
	// var $flowers = [];

	function createFlower () {
        var flower = {
            url: flowerPic[Math.floor(Math.random() * flowerPic.size)],
            startX: Math.random() * width,
            startY: Math.random() * 10,
            offsetX: -Math.random() * width - 500,
            size: Math.random() * 30 + 20,
            endY: Math.random() * (height / 4) + height * 3 / 4,
            duration: Math.random() * 10000 + 5000,
			finish: false,
			opacity: 0,
        };
        flower.opacity = 0.02 * flower.size;
        return flower;
    }

    function rendFlower () {
		//console.log(this);
		//动态生成
		setInterval(function () {
			var aFlower = createFlower();

			var $flower = $('<div class="floweMove"></div>').css({
				'width': aFlower.size,
				'height': aFlower.size,
				'position': 'absolute',
				'top':aFlower.startY,
				'left': aFlower.startX,
				'backgroundImage': 'url('+ flowerPic[Math.floor(Math.random()*2)] + ')',
				'backgroundSize': 'cover',
				'opacity': aFlower.opacity,
			});

			$container.append($flower);
            // $flowers.push($flower);
            // flowers.push(aFlower);
			//动画
			animate.call($flower,aFlower);
        },300);
		//动画
		function animate(aFlower){

			var $this = this;
            $this.jQueryTween({
                    from: {
                        translate: {
                            x:0,
                            y:0,
                            z:0},
                        rotate: {x:0, y:0, z:0},
                    },
                    to: {
                        translate: {
                            x: aFlower.offsetX,
                            y: aFlower.endY-aFlower.startY,
                            z: 0},
                        rotate: {x: 500, y:0, z:300},
                    },
                    repeat: 0,
                    duration: aFlower.duration,
                    delay: 0,
                    easing: TWEEN.Easing.Quintic.EaseInOut,//http://www.cnblogs.com/cloudgamer/archive/2009/01/06/Tween.html
                },
                function () {//end
                    // $flower.stop();
                    $this.stop;
					// console.log($this);
                    $this.remove();
                    // rendFlower();
                    // $(this).remove();
                    // console.log(this);
                    console.log($('.floweMove').length);
                }
                ,function () {//duration
                });
		}

	}
    // function initCanvas () {
    //     var template = '<canvas width="400" height="400">你的设备不支持canvas</canvas>';
    //
    //     var $canvas = $(template);
    //     $canvasBox.append($canvas);
    // }
    //  rendFlower();
	// initCanvas();
	$( window ).resize(function() {

		width = $container.width();
		height = $container.height();
  		console.log(width +" "+ height);
	});
});