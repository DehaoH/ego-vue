// 模拟的服务器
const express = require('express');
const app = express();
const router = require('./router');//router引入
const bodyParser = require('body-parser');//post参数获取方法引入
const cors = require('cors');

//后台解决跨域
app.use(cors());
//post参数获取方法使用
app.use(bodyParser.urlencoded({
    extended:true
}))
//router使用
app.use('/api',router);
//上传图片的静态资源管理
app.use(express.static("upload"))       //可以直接访问图片  http://localhost:3000/图片名称.jpg  

//服务器运行在3000端口
app.listen(3000,()=>{
    console.log('服务器运行在3000端口');
})