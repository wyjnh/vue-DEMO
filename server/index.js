const Koa = require('koa')
const session = require('koa-session')
const path = require('path');
const cors = require('koa2-cors')
const koaBody = require('koa-body');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser')
const app = new Koa()

// 设置session
app.keys = ["some mother fucker"] // 这个是配合signed属性的签名key
const session_config = {
  key: 'koa:sess', /**  cookie的key。 (默认是 koa:sess) */
  maxAge: 1000*60*60*24,   /**  session 过期时间，以毫秒ms为单位计算 。*/
  autoCommit: true, /** 自动提交到响应头。(默认是 true) */
  overwrite: true, /** 是否允许重写 。(默认是 true) */
  httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
  signed: true, /** 是否签名。(默认是 true) */
  rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
  renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
};
app.use(session(session_config, app));
app.use(cors())
// 文件上传
app.use(koaBody({
  multipart: true, // 支持文件上传
  formidable: {
    maxFieldsSize: 2 * 1024 * 1024, // 最大文件为2兆
    multipart: true, // 是否支持 multipart-formdate 的表单
    keepExtensions: true,    // 保持文件的后缀
    onFileBegin:(name,file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    },
  }
}));
// 静态资源
app.use(static(path.join(__dirname)));
// 使用ctx.body解析中间件
app.use(bodyParser())

const { query } = require('./util/db')

// 拦截器
// 定义允许直接访问的url
const allowpage = ['/log/login','/log/logout','/login']
function localFilter(ctx){
  let url =  ctx.url
  if((ctx.session.islogin && ctx.session.islogin == true ) || allowpage.indexOf(url) > -1){
    // 已经登录或者是允许直接访问的url
    console.log('当前地址可直接访问')
  }else {
    // 没有登录
    console.log('当前地址不可直接访问 重定向')
    ctx.redirect("/login");
  }
}
// 拦截器
// app.use(async (ctx,next) => {
//   localFilter(ctx);
//   if (ctx.url === '/login' && ctx.method == "POST") {
//     loginAction(ctx);
//   }
//   if (ctx.url === '/logout') {
//     ctx.session.islogin = false
//     ctx.body = {
//         msg: '注销成功'
//     }
//   }
//   await next();
// })

const Router = require('koa-router')
// 装载所有子路由
let router = new Router()
// 数据库操作
router.use('/doc',require('./routers/doc'));
// 文件流操作
router.use('/stream',require('./routers/stream'));
// 登录验证
// router.use('/log',require('./routers/loginout'))

router.use('/fanyi',require('./routers/fanyi'))

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})

async function loginAction(ctx){
  let name = ctx.request.body.name , password = ctx.request.body.password ; 
    let sql = `SELECT * FROM user_table WHERE password='${password}' AND name='${name}'`;
    let result = await query( sql )
    if(result.length > 0){
      ctx.session.islogin = true
      ctx.body = {
          code: 200,
          msg : '登录成功'
      }
    }else{
      ctx.body = {
        code: 300,
        msg : '用户不存在'
      }
    }
}