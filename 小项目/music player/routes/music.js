const fs = require('fs');
const path = require('path');
const Music = require('../models/music');

exports.find = function(req, res) {
  Music.count({ })
    .then(total => {
      let count = 1,
          skipCnt = Math.floor(Math.random() * (total - count));

      if(!total) {
        // 当数据库没有数据时，直接读取 json 文件中的数据
        let pathname = path.resolve(__dirname, '../config/music.json');
        fs.readFile(pathname, { encoding: 'utf8' }, (err, data) => {
          if(err) {
            res.writeHead(500);
            res.end('3');
            return;
          }

          data = JSON.parse(data);

          Music.insertMany(data)
            .then(data => {
              total = data.length;
              data = JSON.stringify(data[Math.floor(Math.random() * total)]);

              res.writeHead(200);
              res.end(data);
            })
            .catch(err => {
              console.log(err);
              res.writeHead(500);
              res.end('3');
            });
        });

        return;
      }

      // 查询
      Music.find()
        .skip(skipCnt)
        .limit(count)
        .exec()
        .then(data => {
          res.writeHead(200);
          data = Buffer.from(JSON.stringify(data[0]), 'utf8');
          res.end(data);
        }, err => {
          res.writeHead(500);
          res.end('3');
        });

    }, (err) => {
      res.writeHead(500);
      res.end('3');
    });
};