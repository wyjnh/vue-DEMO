// 数据库操作 stutable
const Router = require('koa-router');
const router = new Router();
const { query } = require('../../async-db')

async function selectAllData( ) {
    let sql = 'SELECT * FROM stutable'
    let dataList = await query( sql )
    return dataList
}
  
// 这里就是 localhost:3000/admin
router.get('/', async ctx => {
    let dataList = await selectAllData()
    ctx.body={
        code : 200,
        data : dataList
    }
});

module.exports = router.routes();