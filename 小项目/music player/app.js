const http = require('http');
const url = require('url');
const mongoose = require('mongoose');
const bullet = require('./routes/bullet');
const music = require('./routes/music');
const static = require('./routes/static');

const db = 'mongodb://localhost/musicplayer';

mongoose.Promise = Promise;

const server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname,
      method = req.method.toLowerCase();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET');

  if(pathname === '/') {
    // 主页面
    static.index(req, res);
  } else if(pathname === '/bullet') {
    // 获取和发送弹幕
    if(method === 'get') {
      bullet.find(req, res);
    } else if(method === 'post') {
      bullet.save(req, res);
    }
  } else if(pathname === '/music') {
    // 获取音乐链接和封面
    music.find(req, res);
  } else {
    // 获取静态文件
    static.static(req, res);
  }

});

// 数据库连接
mongoose.connect(db, function(err) {
  if(err) {
    console.error.bind(console, 'connection error');
  } else {
    console.log('connection success');
    server.listen(3000);
  }
});