# 基于Vue的日常工作

## server 功能介绍
* koa路由模块化
* 数据库增删改查
* 访问接口 指向 html 页面 （服务端渲染）
* koa-body 文件上传到指定文件夹 下载服务端文件
* koa-session
* 登录登出session验证 redirect重定向

## view 功能介绍
* vuecli
* markdown 插件导入
* vuex


## 接口
|  url   | methods  | 参数 | 备注 |
|  ----  | ----  | ----  | ----  |
| / login  | get | 无 |  登录 |
| / logout  | get | 无 |  登出 |

## doc相关操作接口
|  url   | methods  | 参数 | 备注 |
|  ----  | ----  | ----  | ----  |
| /doc/selectall | get | 无 | 获取所有doc信息 |
| /doc/deleteone | post | doc_id：1 | 删除 根据doc_id |
| /doc/createone | post | title:"",author:"",content:"" | 添加新的doc |
| /doc/selectone | post | key:"",val:"" | 条件查询doc信息(一个条件) |
| /doc/updateone | post | title = '', content = '' , author = '' doc_id = '' | 修改doc信息 |