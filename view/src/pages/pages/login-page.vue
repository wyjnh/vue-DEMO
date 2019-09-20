<template>
    <div class="main-box">
        <p>登录</p>
        <el-row>
            <el-input v-model="name" placeholder="请输入用户名"></el-input>
            <el-input v-model="password" placeholder="请输入密码"></el-input>
            <el-button @click="loginAction">登录</el-button>
        </el-row>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data:function(){
        return{
            name:"",
            password:""
        }
    },
    methods:{
        loginAction(){
            let self = this;
            let name = this.name,password =  this.password;
            axios({
                method: 'post',
                url: 'http://localhost:3000/login',
                data: {
                    name: name,
                    password: password
                }
            }).then(res=>{
                console.log(res)
                if(res.data.code == 200){
                    self.$router.push('/doclist')
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'warning'
                    });
                }
            });
        }
    }
}
</script>
<style scoped>
.main-box{
    width: 200px;
}
</style>