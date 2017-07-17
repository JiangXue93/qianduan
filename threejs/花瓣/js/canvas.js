;$(document).ready(function () {

    var $canvasBox = $('#canvasBox');
    var width = $canvasBox[0].offsetWidth,
        height = $canvasBox[0].offsetHeight;

    // var $canvas = $("#my-canvas")
    var flowerPics = ['pic/flower1.png'
        ,'pic/flower2.png'];
    var flowers = [];
    var ctx;
    var renderer;
    function initCanvasBox() {
        console.log("initCanvasBox");
        width = $canvasBox[0].offsetWidth;
        height = $canvasBox[0].offsetHeight;
        // $canvas.attr("width", width);
        // $canvas.attr("height", height);

        // ctx = $canvas[0].getContext('2d');

        //var $canvas = $(template);
        //$canvasBox.append($canvas);
    }
    function initFlower () {
        var flower = {
            url: flowerPics[Math.floor(Math.random() * flowerPics.length)],
            x: Math.random() * 500 + 1000,
            y: Math.random() * 1000 + 1000,
            z: Math.random() * 6000 - 5000,
            size: 50,
            vx:-1 * Math.random() -1 ,
            vy:-2 * Math.random() - 1,
            vz:2 * Math.random() + 2,
            rotate: 0.3 * Math.random(),
        };

        return flower;
    }
    function initThree() {
        renderer = new THREE.WebGLRenderer({
            antialias : true,//是否开启反锯齿
            alpha:true, //是否可以设置背景色透明
        });
        renderer.setSize(width, height);
        document.getElementById('canvasBox').appendChild(renderer.domElement);
        renderer.setClearColor(0xeeeeee, 0.1);//设置canvas背景色(clearColor)和背景色透明度（clearAlpha）
        // renderer.shadowMap.Enabled = true;//渲染阴影

    }
    var camera;
    function initCamera() {
        camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 1000;
        camera.up.x = 0;//相机以哪个方向为上方(朝上的轴)
        camera.up.y = 1;
        camera.up.z = 0;
        camera.lookAt({
            x : 0,
            y : 0,
            z : 0
        });
    }
    var scene;
    function initScene() {
        scene = new THREE.Scene();
    }
    var light;
    function initLight() {
        // A start
        // 第二个参数是光源强度，你可以改变它试一下
        light = new THREE.AmbientLight(0xFF0000,0.1);
        // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
        light.position.set(100,100,100);
        scene.add(light);
        // A end
    }
    var mesh;
    var objs = [];//[{mesh:{mesh},data:{flower}},{mesh:{mesh},data:{flower}}]
    function initObject() {
        var flower = initFlower();
        var geometry = new THREE.PlaneGeometry( 50, 50);
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load(flower.url, function(texture) {});
        texture.needsUpdate = true;
        texture.anisotropy  = renderer.getMaxAnisotropy();
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        var material = new THREE.MeshBasicMaterial( {
            color:0xFFFFFF,
            side: THREE.DoubleSide,
            map: texture,
            transparent: true
        });
        mesh = new THREE.Mesh( geometry,material);


        mesh.position.set(flower.x,flower.y,flower.z);
        var obj = {
            mesh: mesh,
            data: flower
        }
        objs.push(obj);
        //scene.add(mesh);
    }
    function RendObjs () {
        objs.forEach( function (obj) {
            scene.add(obj.mesh);
        });
    }
    function threeStart() {
        initThree();
        initCamera();
        initScene();
        initLight();
        setInterval(function () {
            initObject();
            RendObjs();
        },500);

//            renderer.clear();
        renderer.render(scene, camera);
        animation();//动画
    }
    function animation()
    {
        objs.forEach(function (obj) {
            obj.mesh.rotation.x  += obj.data.rotate;
            obj.mesh.position.x += obj.data.vx;
            obj.mesh.position.y += obj.data.vy;
            obj.mesh.position.z += obj.data.vz;
        });

        // mesh.rotation.y  += 0.005;
        // mesh.rotation.z  += 0.01;
        // mesh.position.x += 0.5;
        // mesh.position.y -= 1.1;
        renderer.render(scene, camera);
        requestAnimationFrame(animation);
//            stats.update();
//            TWEEN.update();//不断更新
    }



    function action () {
        flowers.forEach(function (flower) {
            flower.rotate =  flower.rotate + 10;
            ctx.clearRect(0,0,width,height);
            ctx.save();
            // ctx.rotate(flower.rotate * Math.PI /180);
            var flowerPic = new Image();
            flowerPic.src = flower.url;
            ctx.drawImage(flowerPic, flower.x, flower.y, flower.size, flower.size);
            ctx.restore();

            flower.x = flower.x + flower.vx;
            flower.y = flower.y + flower.vy;

            console.log();
        });
    }
    function render() {
        ctx.clearRect(0,0,width,height);

        flowers.forEach(function (flower) {
            //draw flower

            var flowerPic = new Image();
            flowerPic.src = flower.url;
            // ctx.rotate(flower.rotate * Math.PI /180);
            ctx.drawImage(flowerPic, flower.x, flower.y, flower.size, flower.size);

        })
        ctx.restore();
    }
    function start () {
        initCanvasBox();
        addFlower();
        setInterval(function(){
            render();
            action();
        },20);
    }

    // start();
    initCanvasBox();
    threeStart();

    $(window).resize(function () {
        initCanvasBox();
        location.reload();
    });
});