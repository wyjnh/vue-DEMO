<template>
    <div>
        <el-table :data="docList_isfo" style="width: 60%" stripe border :height="tableMaxHeight">
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column prop="create_time" label="创建日期" width="180"></el-table-column>
            <el-table-column prop="author" label="作者" width="60"></el-table-column>
            <el-table-column prop="title" label="标题" width="100"></el-table-column>
            <el-table-column prop="content" label="内容" width="180"></el-table-column>
            <el-table-column prop="update_time" label="更改日期" width="180"></el-table-column>
            <el-table-column fixed="right" label="操作" width="160">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
    </el-table>
    </div>
</template>
<script>
    import Axios from 'axios'
    export default {
      data() {
        return {
            tableMaxHeight:250,
            docList_isfo:[],
        }
      },
      created:function(){
          Axios({
            method: 'get',
            url: 'http://localhost:3000/doc/selectall',
            }).then(response=>{
                console.log(response)
                if(response && response.data && response.data.code && response.data.code == 200){
                    this.docList_isfo = response.data.data
                }
            });
      }
    }
  </script>
