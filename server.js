// ============================================
// Hello World 网站 —— Node.js 服务器入口文件
// 零依赖：只使用 Node.js 内置模块，无需 npm install
// ============================================

const http = require('http'); // 创建 HTTP 服务器
const fs = require('fs');     // 读取文件
const path = require('path'); // 拼接文件路径

// 服务器监听端口（如果 3000 被占用，可改成 8080 等）
const PORT = 3000;

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  // ---------- 1. 接口：返回服务器当前时间（JSON 格式） ----------
  if (req.url === '/api/time') {
    const now = new Date();
    const timeStr = now.toLocaleString('zh-CN'); // 服务器本地时间

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ time: timeStr }));
    return;
  }

  // ---------- 2. 首页：返回 public/index.html 页面 ----------
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(__dirname, 'public', 'index.html');

    fs.readFile(filePath, (err, data) => {
      if (err) {
        // 读取失败：返回 500 错误
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('<h1>500 服务器内部错误：无法读取 index.html</h1>');
        return;
      }

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(data);
    });
    return;
  }

  // ---------- 3. 其他所有路径：返回 404 ----------
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end('<h1>404 页面不存在</h1>');
});

// 启动服务器并监听端口
server.listen(PORT, () => {
  console.log(`✅ 服务器已启动：http://localhost:${PORT}`);
  console.log(`  在浏览器中访问 http://localhost:${PORT} 即可看到网页`);
});
