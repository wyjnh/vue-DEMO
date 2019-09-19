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

const uploadUrl = "http://localhost:3000/stream/static/upload";
// 上传图片
router.post('/upload',async (ctx) => {
    //获取上传文件
  const file = ctx.request.files.file;
  console.log(file)
  // 读取文件流
  const fileReader = fs.createReadStream(file.path);
  //  组成存放 图片 文件夹的绝对路径
  const filePath = path.join(__dirname, '../../static/upload');
  // 组装成绝对路径
  const fileResource = filePath + `/${file.name}`;

  /*
   使用 createWriteStream 写入数据，然后使用管道流pipe拼接
  */
  const writeStream = fs.createWriteStream(fileResource);
  // 判断 /static/upload 文件夹是否存在，如果不在的话就创建一个
  if (!fs.existsSync(filePath)) {
    fs.mkdir(filePath, (err) => {
      if (err) {
        throw new Error(err);
      } else {
        fileReader.pipe(writeStream);
        ctx.body = {
          url: uploadUrl + `/${file.name}`,
          code: 0,
          message: '上传成功'
        };
      }
    });
  } else {
    fileReader.pipe(writeStream);
    ctx.body = {
      url: uploadUrl + `/${file.name}`,
      code: 0,
      message: '上传成功'
    };
  }
});

module.exports = router.routes();