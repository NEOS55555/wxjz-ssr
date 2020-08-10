const express = require('express');
// const cp = require('child_process');
const session = require('express-session')
const cookieParser = require('cookie-parser')
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
    /*server.use(session({
      name: 'machineCookie',
      secret:"MIIEpAIBAAKCAQEAs4nNSQfaORLb4yL49jcPI+LN+UshKX+gWcqBATwKepN2BvG+",    //设置签名秘钥  内容可以任意填写
      // cookie:{maxAge:30 * 1000 * 60},    //设置cookie的过期时间，例：30minutes后session和相应的cookie失效过期
      // cookie:{maxAge: 20 * 1000},    // 测试用
      resave:false,      //强制保存，如果session没有被修改也要重新保存
      saveUninitialized: false    //如果原先没有session那么久设置，否则不设置
    }))*/
    server.use(cookieParser());
    // server.use(bodyParser.json({limit: '2mb'}));
    // server.use(bodyParser.urlencoded({limit: '2mb', extended:false}));
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

