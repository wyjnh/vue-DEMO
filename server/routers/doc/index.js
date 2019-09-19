// 数据库操作 stutable
const Router = require('koa-router');
const router = new Router();
const { query } = require('../../async-db')
// 判断是否存在
async function hasNewDoc(key,val) {
    let sql = `SELECT COUNT(*) as count FROM doc_table WHERE ${key} = '${val}'`
    // let sql = `INSERT IGNORE INTO doc_table (title,author,content) VALUES ('${title}','${author}','${content}')`;
    let countNum = await query( sql )
    return countNum[0].count
}
// 创建新的
async function createNewDoc(title,author,content) {
    let sql = `INSERT INTO doc_table (title,author,content) VALUES ('${title}','${author}','${content}')`;
    let result = await query( sql )
    return result
}
// 删除
async function deleteNewDoc(key,val) {
    let sql = `DELETE FROM doc_table WHERE ${key} = '${val}'`;
    let result = await query( sql )
    return result
}
// 获取指定
async function selectDoc(key,val) {
    let sql = `SELECT * FROM doc_table WHERE ${key} = '${val}'`
    if(key==""&&val==""){
        sql = `SELECT * FROM doc_table`
    }
    let res = await query( sql )
    return res
}
// 更新
async function updateDoc(obj) {
    let sql = `UPDATE doc_table SET title = '${obj.title}', content = '${obj.content}' , author = '${obj.author}' WHERE  doc_id = '${obj.doc_id}'`
    let res = await query( sql )
    return res
}


// 增 添加新的doc         title重复报300
router.post('/createone', async ctx => {
    let title = ctx.request.body.title || "",
        author = ctx.request.body.author || "",
        content = ctx.request.body.content || "";
    let countNum = await hasNewDoc('title',title)
    if(countNum > 0 ){
        ctx.body={
            code : 300,
            msg : "此记录已存在"
        }
    }else{
        // 插入
        let res = await createNewDoc(title,author,content)
        if(res.affectedRows == 1){
            ctx.body={
                code : 200,
                msg : "添加成功"
            }
        }
    }
});

// 删 根据id删除doc 存在删除 不存在报错
router.post('/deleteone',async (ctx)=>{
    let doc_id = ctx.request.body.doc_id;
    let countNum = await hasNewDoc('doc_id',doc_id)
    if(countNum == 0){
        ctx.body={
            code : 300,
            msg : "此记录不存在"
        }
    }else{
        // 插入
        let res = await deleteNewDoc('doc_id',doc_id)
        if(res.affectedRows == 1){
            ctx.body={
                code : 200,
                msg : "删除成功"
            }
        }
    }
})
// 改
router.post('/updateone',async (ctx)=>{
    let res = await updateDoc(ctx.request.body)
    if(res.affectedRows == 0){
        ctx.body={
            code : 300,
            msg : '没有此项数据'
        }
    }else{
        ctx.body={
            code : 200,
            msg : '更新数据成功'
        }
    }
    
})

// 查 根据查询字段和值查询
router.post('/selectone',async (ctx)=>{
    let key = ctx.request.body.key || "";
    let val = ctx.request.body.val || "";
    let resdata = await selectDoc(key,val);
    if(resdata.length > 0){
        ctx.body={
            code : 200,
            msg: "获取成功",
            data : resdata
        }
    }else{
        ctx.body={
            code : 300,
            msg: "无查询记录",
        }
    }
        
})
module.exports = router.routes();