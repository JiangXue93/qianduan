function Bullet(opts) {
  this.wrap = opts.wrap;
  this.input = opts.input;
  this.sendBtn = opts.sendBtn;
  this.bulletBar = opts.bulletBar;
  this.firstBul;
  this.lastBul;
}

// 发送弹幕
Bullet.prototype.send = function(url, sendData, fn) {
  var input = this.input;

  //输入弹幕为空
  var str = this.inputCheck(input.val());

  if(!str){
      alert('请输入内容');
      return;
  } else {
    //发送请求
    //@referrer：歌曲名字
    //@timestamp：时间戳
    var request = $.ajax({
        url: url,
        method: 'post',
        data: {
            referrer : sendData.referrer,
            timestamp : sendData.timestamp,
            content : str
        },
            dataType: 'html'
    }).done(function(text) {
        if (text !== '1'){
            console.log('发送弹幕失败，请检查您的网络状况');
        } else {
          fn && fn();
        }
    });

    //输入的弹幕页面渲染
    this.rend(str);
    input.val('');
    //当前弹幕前一个弹幕添加淡出
    if(this.lastBul.prev()){
        this.lastBul.prev().addClass('fadeInOut');
        this.lastBul.addClass('fadeInOut');
    }
  }
};

// 获取弹幕
Bullet.prototype.get = function(url, getData) {
   var firstBul = this.firstBul,
       wrap = this.wrap,
       self = this;
  
  //定时取数据，并判断弹幕数量，清除已经展示的弹幕
  //弹幕添加淡出
  if (this.lastBul) {
      this.lastBul.addClass('fadeInOut');
  }
  // //删除弹幕
  if(this.wrap.children('li').length >= 4){
      while( this.wrap.children('li').length - 4 ){
          this.firstBul.remove();
          this.firstBul = this.wrap.find('li:first-child');
      }
  }
  // 获取弹幕
  var request = $.ajax({
      url: url,
      method: 'get',
      data: getData,
      dataType: 'html'
  }).done(function(data) {
      data = JSON.parse(data);
      if(data.length > 0) {
          self.rend(data[0].content);
      }
  });
};

// 渲染弹幕，从服务器或者输入框获取新弹幕，加入到屏幕中
Bullet.prototype.rend = function(str) {
  //dom添加弹幕节点
  var $li = $('<li class="bullet"><span>'+ str +'</span></li>'),
       wrap = this.wrap;
  wrap.append($li);
  // 添加推入动画
  wrap.find('li:last-child').animate({ 'margin-bottom': '10px' });
  //获取当前弹幕
  this.firstBul = wrap.find('li:first-child');
  this.lastBul = wrap.find('li:last-child');
};

// 输入验证
Bullet.prototype.inputCheck = function(str) {
  var val = str.trim();

  //为空
  if(val !== ''){
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
};