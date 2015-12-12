'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath == './') {
    filePath = './index.html';
  }

  const getType = (ext) => {
    switch (ext) {
      case '.js':
        return 'text/javascript';
        break;
      case '.css':
        return 'text/css';
        break;
      default:
        return 'text/html';
    }
  };

  const extname = path.extname(filePath);
  const contentType = getType(extname);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end();
    }
    else {
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content, 'utf-8');
    }
  });
}).listen(8000);

console.log("Listening at http://localhost:8000");
