/**
 * Created by Lexus on 2017/4/10.
 */
$(document).ready(function(){
    var bullet = new Bullet({
        wrap: $('.bullet-content'),
        input: $('.bullet-input'),
        sendBtn: $('.bullet-send'),
        bulletBar: $('.bullet-bar')
    });
    
    function Player() {
        this.init();
        this.bar();
        this.pushMusic();
        this.touchBind();
        this.playBind();
    }

    Player.prototype.init = function () {  //初始化
        this.body = $('body');
        this.disc = $('.container-disc');
        this.cover = $('.container-cover');
        this.canvas = $('.round-bar');
        this.triangle = $('.triangle');
        this.music = $('.music')[0];
        this.context = this.canvas[0].getContext('2d');
        this.canvasSize = 300;
        this.canvas.attr('width', this.canvasSize);
        this.canvas.attr('height', this.canvasSize);
        this.context.lineWidth = 6;
        this.musicId = '';
        this.firstSone = true;
        this.title = $('.title span');
    }

    Player.prototype.bar = function () {  //歌曲进度条
        var self = this;
        
        self.startAngle = Math.PI * (-0.5);
        self.endAngle = self.startAngle + Math.PI * 2 * self.music.currentTime / self.music.duration;
        self.context.clearRect(0, 0, self.canvasSize, self.canvasSize);
        self.context.beginPath();
        self.context.strokeStyle = '#ccc';
        self.context.arc(150, 150, 103, 0, Math.PI * 2, false);
        self.context.stroke();
        self.context.closePath();
        self.context.beginPath();
        self.context.strokeStyle = '#2bbc64';
        self.context.arc(150, 150, 103, self.startAngle, self.endAngle, false);
        self.context.stroke();
        self.context.closePath();
    }

    Player.prototype.pushMusic = function() { // 加入音乐链接
        let self = this;

        var request = $.ajax({
            url: "http://10.19.128.82:3000/music",
            method: "get",
            dataType: "html"
        }).done(function(data) {
            data = JSON.parse(data);
            self.music.src = data.mp3;
            self.cover[0].style.backgroundImage = 'url('+data.pic+')';
            self.musicId = data._id;
            self.title.html(data.name);
            self.bar();
            if(self.firstSone) {
                self.pause();
                self.firstSone = false;
            } else {
                self.startPlay();
            }
        });
    };

    // 绑定手势
    Player.prototype.touchBind = function () {
        var self = this;
        var nStartX,nEndX;

        $('.pause-btn').on('touchstart', function(e) {
            e.preventDefault();

            if (!self.music.paused) {
                // 暂停
                self.pause();
            } else {
                // 开始播放
                self.startPlay();
            }
        });

        $('.btn-wrap').on('touchstart', function(e) {
            e.preventDefault();

            self.pushMusic();
        });

        $('.container-canvas').on('touchstart', function(e) {
            e.preventDefault();
            nStartX = Math.floor(e.targetTouches[0].pageX);
        });
        $('.container-canvas').on('touchend',function(e){
            e.preventDefault();
            nEndX = Math.floor(e.changedTouches[0].pageX);
            var length = Math.abs(nStartX - nEndX);
            if (length > 20) {
                self.pushMusic();    
            }
        });

        $('body').on('touchmove', function(e) {
            e.preventDefault();
        });
    }

    // 暂停播放
    Player.prototype.pause = function() {
        this.cover.css({ 'animationPlayState': 'paused', 'opacity': '0.3' });
        this.triangle.css('display', 'block');
        this.music.pause();
    };

    // 开始播放
    Player.prototype.startPlay = function() {
        this.cover.css({ 'animationPlayState': 'running', 'opacity': '1' });
        this.triangle.css('display', 'none');
        this.music.play();
    };

    Player.prototype.playBind = function() {
        var self = this;

        function throttle(fn, delay, atleast, context) {
            var timeId = null;
            var startTime = new Date();
            fn = context? fn.bind(context): fn;

            return function() {
                clearTimeout(timeId);
                var curTime = new Date();

                if(curTime - startTime > atleast) {
                    fn();
                    startTime = new Date();
                } else {
                    timeId = setTimeout(fn, delay);
                }
            };
        }

        this.music.addEventListener('timeupdate', throttle(onupdate, 1000, 1000, self));
        this.music.addEventListener('timeupdate', self.bar.bind(self));

        function onupdate() {
            if(bullet.sendOne) {
                bullet.sendOne = false;
            } else {
                bullet.get('http://10.19.128.82:3000/bullet', {
                    referrer: self.musicId,
                    timestamp: Math.round(self.music.currentTime)
                });
            }
        };

        function sendBul() {
            bullet.send('http://10.19.128.82:3000/bullet', {
                referrer: self.musicId,
                timestamp: Math.round(self.music.currentTime)
            }, function() {
                bullet.sendOne = true;
            });
        }
        //回车按钮监控
        bullet.input.on('keyup', function(e) {
            if(e.keyCode == 13){
                sendBul();
            }
        } );
        //发送按钮的监听
        bullet.sendBtn.on('touchstart' ,function(){
            sendBul();
        });
        //点击弹幕区域显示/隐藏输入控件
        $('#back').on('touchstart' ,throttle(function() {
                bullet.bulletBar.toggle(500);
                $(".tip").toggle(500);
            }, 500, 500)
        );

        self.music.onended = function() {
            self.pushMusic();
        };
    };

    var play = new Player();
})