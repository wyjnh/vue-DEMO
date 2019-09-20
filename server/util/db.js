// 数据库配置文件

const mysql = require('mysql')
// 创建数据连接池
const pool  = mysql.createPool({
    host     : 'localhost',   // 数据库地址
    user     : 'root',    // 数据库用户
    password : 'admin',   // 数据库密码
    database : 'localdb'  // 选中数据库
})

// 封装sql操作
let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
    // 在数据池进行会话
      pool.getConnection(function(err, connection) {
        if (err) {
          reject( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
  
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            // 结束会话
            connection.release()
          })
        }
      })
    })
  }
  
  module.exports = { query }