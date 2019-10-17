// 数据库操作 stutable
const Router = require('koa-router');
const router = new Router();
const { query } = require('../../util/db')
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
// 多组插入
async function addDocList(docArr) {
    let arrStr = "";
    docArr.forEach((item,index)=>{
        arrStr += index == 0 ? "":","
        arrStr+= `('${item.title}','${item.author}','${item.content}')`
    })
    let sql = `INSERT INTO doc_table (title,author,content) VALUES ${arrStr}`;
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


// 增 添加新的doc         title重复报300  有必填为空 301
router.post('/createone', async ctx => {
    let title = ctx.request.body.title || "",
        author = ctx.request.body.author || "",
        content = ctx.request.body.content || "";
    if(title==""||author==""||content==""){
        ctx.body={
            code : 301,
            msg : "有必填选项为空"
        }
    }else{
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
                msg : "添加成功",
                data:ctx.request.body
            }
        }
    }
    }
});
// 增 添加多个新的doc  301 数据为空
router.post('/addDocArr', async ctx => {
    let docArr = ctx.request.body;
    if(docArr.length){
        let res = await addDocList(docArr)
        if(res.affectedRows){
            ctx.body={
                code : 200,
                msg : "插入成功",
                affectedRows:res.affectedRows
            }
        }
    }else{
        ctx.body={
            code : 301,
            msg : "有必填选项为空",
            data:ctx.request.body
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
// 查 获取所有doc信息
router.get('/selectall',async (ctx)=>{
    let resdata = await selectDoc("","");
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

// 分页查询 page 第几页  pageSize 每页大小 300失败 200成功
router.post('/selectbypage',async (ctx)=>{
    let page = ctx.request.body.page || "";
    let pageSize = ctx.request.body.pageSize || 10;
    let start = (page-1) * pageSize
    let resdata = await selectDocByPage(start,pageSize);
    if(resdata.length){
        ctx.body={
            code : 200,
            msg: "获取成功",
            data : resdata
        }
    }else{
        ctx.body={
            code : 300,
            msg: "查询失败",
        }
    }
   
})
// 获取指定
async function selectDocByPage(start,pageSize) {
    let sql = `SELECT * FROM doc_table limit ${pageSize} offset ${start}`
    let res = await query( sql )
    return res
}
module.exports = router.routes();