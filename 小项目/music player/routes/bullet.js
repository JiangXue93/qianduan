const querystring = require('querystring');
const url = require('url');
const ObjectId = require('mongoose').Schema.ObjectId;
const Bullet = require('../models/bullet');

exports.find = function(req, res) {
  let query = url.parse(req.url, true).query;

  let musicQuery = {
    timestamp: query.timestamp,
    referrer: query.referrer
  };

  Bullet.count(musicQuery)
    .then(total => {
      if(total >= 1) {
        let count = 1;
            ranSkip = Math.floor(Math.random() * (total - count));

      Bullet.find(musicQuery)
        .skip(ranSkip)
          .limit(count)
            .exec()
              .then(data => {
                data = Buffer.from(JSON.stringify(data), 'utf8');
                res.writeHead(200);
                res.end(data);
              })
                .catch(err => {
                  console.log(err);
                  res.writeHead(500);
                  res.end('3');
                });
      } else {
        res.writeHead(200);
        res.end('0');
      }
    }, err => {
      console.log(err);
      res.writeHead(500);
      res.end('3');
    });
};

exports.save = function(req, res) {
  let data = '';

  req.on('data', chunk => {
    data += chunk;
  });

  req.on('end', () => {
    let bullet = new Bullet(querystring.parse(data));

    bullet.save((err, bullet) => {
      if(err) {
        console.log(err);
        res.writeHead(500);
        res.end('3');
        return;
      }

      res.writeHead(200);
      // 返回 1 表示保存成功
      res.end('1');
    });
  });
};