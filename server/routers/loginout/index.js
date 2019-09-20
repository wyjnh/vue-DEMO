// 数据库操作 stutable
const Router = require('koa-router');
const router = new Router();

// 登录
router.get('/login', async ctx => {
    ctx.session.islogin = true ;
    ctx.body = {
        code: 200 , 
        msg: '登录成功！'
    }
});

// 注销
router.get('/logout', async ctx => {
    ctx.session.islogin = false ;
    console.log('注销成功')
    ctx.redirect("www.sogou.com");
});

module.exports = router.routes();