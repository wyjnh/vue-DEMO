// 数据库操作 stutable
const Router = require('koa-router');
const router = new Router();
const path = require('path');
const fs = require('fs')
  
// 访问接口  指向 html 页面
router.get('/', async ctx => {
    // 设置头类型, 如果不设置，会直接下载该页面
    ctx.type = 'html';
    // 读取文件
    const pathUrl = path.join(__dirname, '../../static/upload.html');
    ctx.body = fs.createReadStream(pathUrl);
});

module.exports = router.routes();