<template>
<!-- 登录页面 -->
  <div>
    <div class="bannner">易购商城后台系统</div>
    <!-- el-card卡片组件 -->
    <el-card class="box-card" >

        <!-- el-tabs组件
        stretch：标签的宽度是否自撑开
        v-model：绑定值，选中选项卡的 name
        @tab-click：tab 被选中时触发
        label：选项卡标题	
        name；与选项卡绑定值 value 对应的标识符，表示选项卡别名
         -->
        <el-tabs stretch v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="登录" name="login">
                
                <!-- el-form组件
                model	表单数据对象
                ref    获取表单对象的
                label-width；label的width
                label	标签文本
                 -->
                <el-form :model="loginForm" ref="loginForm" label-width="100px">
                    <el-form-item label="用户名">
                        <el-input type="text" v-model="loginForm.username"></el-input>
                    </el-form-item>

                    <el-form-item label="密  码">
                        <el-input type="password" v-model="loginForm.password"></el-input>
                    </el-form-item>

                      <el-form-item>
                        <el-button type="primary" @click="submitLoginForm('loginForm')">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>

            <el-tab-pane label="注册" name="register">

                <!-- 
                    rules用来验证，prop配合rules验证的名称
                 -->
                <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px">
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="registerForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="email" v-model="registerForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type='password' v-model.number="registerForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPassword">
                        <el-input type='password' v-model.number="registerForm.checkPassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitRegisterForm('registerForm')">提交</el-button>
                    </el-form-item>
                </el-form>

            </el-tab-pane>
        </el-tabs>

    </el-card>
  </div>
</template>

<script>
import api from '../../api'
import { mapMutations } from 'vuex'
import jwtDecode from 'jwt-decode'
export default {
    data () {

        // 用于注册验证的方法
        var validateUsername = (rule, value, callback) => {
            if(value === ''){
                callback(new Error('用户名不能为空！'))
            }else if(value.length < 4 || value.length > 10){
                callback(new Error('用户名不能少于4位或者大于10位字符'))
            }
            callback();
        }
        var validateEmail = (rule, value, callback) => {
            const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; //邮箱正则
            if(value === ''){
                callback(new Error('邮箱不能为空！'))
            }else if(!reg.test(value)){ //不符合邮箱正则
                callback(new Error('请输入正确的邮箱'))
            }
            callback();
        }
        var validatePassword = (rule, value, callback) => {
            if(value === ''){
                callback(new Error('密码不能为空！'))
            }
            callback();
        }
        var validateCheckPassword = (rule, value, callback) => {
            if(value === ''){
                callback(new Error('密码不能为空！'))
            }else if(value !== this.registerForm.password){  //
                callback(new Error('两次输入的密码不一致！'));
            }
            callback();
        }
        // 用于注册验证的方法

        return {
            activeName:"login",
            loginForm:{
                username:"",
                password:""
            },
            registerForm:{
                username:'',
                email:'',
                password:'',
                checkPassword:''
            },
            //使用验证方法
            rules:{
                //prop的名字        validator验证方法       是去焦点验证
                 username:[{ validator: validateUsername, trigger: 'blur' }],
                 email:[{ validator: validateEmail, trigger: 'blur' }],
                 password:[{ validator: validatePassword, trigger: 'blur' }],
                 checkPassword:[{ validator: validateCheckPassword, trigger: 'blur' }],
            }

        }
    },
    methods: {
        ...mapMutations('loginModule',['updateUsername','updateToken']),
        handleClick(tab, event){
            console.log(tab, event);
        },
        submitLoginForm(formName){
            this.$refs[formName].validate((valid) => {      //validate 对整个表单进行校验的方法
                if (valid) {
                    //表单验证通过
                    // console.log(this.loginForm.username);
                    // console.log(this.loginForm.password);
                    //登录网络请求

                    api.login({
                        username:this.loginForm.username,
                        password:this.loginForm.password
                    }).then(res=>{
                        // console.log(res.data);
                        // console.log(jwtDecode(res.data.token));

                        //将token解析
                        var userObj = {
                            username:jwtDecode(res.data.token).username,    //jwtDecode对token解析
                            token:res.data.token
                        }

                        //存到vuex的username和token
                        this.updateUsername(userObj.username);   //把接收的token通过mutations方法修改state，将token保存在vuex
                        this.updateToken(userObj.token);   //把接收的token通过mutations方法修改state，将token保存在vuex
                        
                        //存到本地localStorage的username和token
                        localStorage.setItem('ego',JSON.stringify(userObj));    //把userObj存在本地,将对象转化为字符串

                        //登录成功的消息弹窗
                        this.$message({
                            message: '登录成功',
                            type: 'success',
                            duration:1000
                        });

                        this.$router.push('/'); //返回首页
                    }).catch(err=>{
                        console.log(err);
                        this.$message.error('用户名密码错误！');
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        submitRegisterForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   //注册网络请求
                   api.register({
                       username:this.registerForm.username,
                       password:this.registerForm.password,
                       email:this.registerForm.email,
                   }).then(res=>{
                        //注册成功，用element的Message 消息提示
                        if(res.data.status === 200){
                            this.$message({
                                message: res.data.msg,
                                type: 'success'
                            });  
                        }else{
                             this.$message.error(res.data.msg);
                        }                
                    //    console.log(res);
                   }).catch(err=>{
                       console.log(err);
                   })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.bannner {
  font-size: 30px;
  margin-top: 100px;
}
.box-card {
  width: 600px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>