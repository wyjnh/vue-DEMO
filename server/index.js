const Koa = require('koa')
const fs = require('fs')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

// 使用ctx.body解析中间件
app.use(bodyParser())
const Router = require('koa-router')

let home = new Router()

// 子路由1 获取get请求参数
home.get('/getdata', async ( ctx )=>{
    let url = ctx.url
    // 从上下文的request对象中获取
    let request = ctx.request
    let req_query = request.query
    let req_querystring = request.querystring
  
    // 从上下文中直接获取
    let ctx_query = ctx.query
    let ctx_querystring = ctx.querystring
  
    ctx.body = {
      url,
      req_query,
      req_querystring,
      ctx_query,
      ctx_querystring
    }
}).post('/postdata', async ( ctx )=>{
    let postData = ctx.request.body
    ctx.body = postData
})

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
// 路由分模块
router.use('/stu',require('./routers/student'))

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})