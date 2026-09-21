// Red Auto Glass — 静态预览服务器（无外部依赖）
// 用法: node server.js [--host 127.0.0.1] [--port 7100]
// 同时支持环境变量 HOST / PORT
const http = require('http');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
function argValue(name, fallback) {
  const i = args.indexOf('--' + name);
  if (i !== -1 && args[i + 1]) return args[i + 1];
  return process.env[name.toUpperCase()] || fallback;
}
const HOST = argValue('host', '127.0.0.1');
const PORT = parseInt(argValue('port', '7100'), 10);

const ROOT = __dirname;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(ROOT, path.normalize(urlPath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>页面不存在</title></head><body style="font-family:sans-serif;text-align:center;padding:80px 20px;"><h1 style="color:#C8102E;">404 · 页面不存在</h1><p><a href="/index.html">返回首页</a></p></body></html>');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Red Auto Glass 中文网站预览: http://${HOST}:${PORT}/`);
});
