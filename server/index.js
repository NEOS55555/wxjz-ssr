const express = require('express');
// const cp = require('child_process');
const next = require('next');
const router = require('./router');
// const { PORT } = require('../next.config')
const dev =  process.env.NODE_ENV !== 'production';
const PORT = 4567
const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare()
  .then(() => {
    const server = express();

    // 路由中间件
    server.use('/api', router); // 添加router中间件

    server.get('/', (req, res) => {
      return app.render(req, res, '/index');
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, '0.0.0.0', (err) => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  });

