const fs = require('fs');
const path = require('path');
const url = require('url');
const pug = require('pug');
const mime = require('../config/mime');

exports.static = (req, res) => {
  let pathname = url.parse(req.url).pathname,
      filepath = path.join(__dirname, '../public', pathname);

  new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      if(err) {
        reject(err);
      }

      resolve(data);
    });
  })
    .then(data => {
      let extname = path.extname(pathname);

      res.writeHead(200, { 'Content-Type': mime[extname] });
      res.write(data);
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.writeHead(404);
      res.end(JSON.stringify(err));
    });
};

exports.index = (req, res) => {
  let filepath = path.resolve('views', 'index.pug');
  pug.renderFile(filepath, (err, html) => {
    if(err) {
      res.wirteHead(500);
      res.end('3');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end(html);
  });
};