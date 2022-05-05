//服务器路由管理
const express = require('express');
const router = express.Router();
const sqlFn = require('./mysqlConnection');
const url = require('url')

//上传图片需要
const fs = require("fs")
const multer = require("multer")
//上传图片需要

const jwt = require('jsonwebtoken');    //引入token
const jwtSecret = require('./jwtSecret');   //引入secret字段

//登录的接口
router.post('/login',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    //创建sql语句
    const sql = 'select * from user where username=? and password=?'
    //arr参数
    const arr = [username,password]
    //调用数据库查询方法
    sqlFn(sql,arr,(result)=>{
        if(result.length>0){    //查询到表示登录成功

            //生成登录状态token
            const token = jwt.sign({
                id:result[0].id,
                username:result[0].username
            },jwtSecret.secret)
            res.send({
                status:200,
                token,      //把生成的token返回
                msg:'登录成功'
            })
        }else{                  //没查询到，表示登录失败
            res.send({  
                status:400,
                msg:'用户名密码错误'
            })
        }
    })
    
})

//注册的接口
router.post('/register',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const arr = [username,password,email];
    const sql = 'insert into user values(null,?,?,?)'
    sqlFn(sql,arr,result=>{
        //返回的是影响行数
        if(result.affectedRows > 0){
            res.send({
                status:200,
                msg:'注册成功'
            })
        }else{
            res.send({
                status:400,
                msg:'注册失败'
            })
        }
    })
})

//商品管理接口
router.get('/backend/item/selectTbItemAllByPage',(req,res)=>{
    //参数 page 页数
    var page = url.parse(req.url,true).query.page || 1;     //get请求，参数page，默认值为1
    //sql语句
    /**
     *  order by id desc:根据id倒序    
     *  limit 10:拿10条数据
     * offset ：偏移量，如果page=2，从10开始拿10条数据
    */                                
    var sql = 'select * from project order by id desc limit 10 offset ' + (page-1)*10;
    sqlFn(sql,null,result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            });
        }else{
            res.send({
                status:400,
                msg:'读取数据失败'
            })
        }
    })

})

//商品总数的接口
router.get('/total',(req,res)=>{
    const sql='select count(*) from project where id';
    sqlFn(sql,null,result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:400,
                msg:'数据不存在'
            })
        }
    })
})

//商品模糊搜索接口
router.get('/search',(req,res)=>{
    var page = url.parse(req.url,true).query.page || 1;
    const search = url.parse(req.url,true).query.search;
    //concat(`title`,`sellPoint`,`descs`) like "%' + search + '%"  根据search来搜索
    // order by id desc ; 搜索到的数据倒叙
    const sql = 'select * from project where concat(`title`,`sellPoint`,`descs`) like "%' + search + '%"' + ' order by id desc limit 10 offset ' + (page-1)*10;
    sqlFn(sql,[search,page],result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:400,
                msg:'暂无数据'
            })
        }
    })
})

//选择类目接口
router.get('/backend/itemCategory/selectItmeCategoryByParentId',(req,res)=>{

    const id = url.parse(req.url,true).query.id || 1;
    const sql = 'select * from category where id=?';
    const arr = [id]
    sqlFn(sql,arr,result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:400,
                msg:"暂无数据"
            })
        }
    })
})

// 上传图片
 var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}
var uploadFolder = './upload/';
createFolder(uploadFolder);
var upload = multer({ storage: storage });
router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({ res_code: '0', name: file.originalname, url: file.path });
});

//添加商品接口
router.get('/backend/item/insertTbItem',(req,res)=>{
    var title = url.parse(req.url, true).query.title || "";
    var cid = url.parse(req.url, true).query.cid || "";
    var sellPoint = url.parse(req.url, true).query.sellPoint || "";
    var price = url.parse(req.url, true).query.price || "";
    var num = url.parse(req.url, true).query.num || "";
    var desc = url.parse(req.url, true).query.desc || "";
    var image = url.parse(req.url, true).query.image || "";
    const sql = "insert into project values (null,?,?,?,?,?,?,'',1,'','',?)";
    var arr = [title, image, sellPoint, price, cid, num, desc];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {  //影响行数
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})

//删除商品的接口
router.get('/backend/item/deleteItemById',(req,res)=>{
    var id = url.parse(req.url,true).query.id;
    var arr  = [id];
    var sql = 'delete from project where id=?';
    sqlFn(sql,arr,result=>{
        if(result.affectedRows >0){ //影响行数大于0
            res.send({
                status:200,
                result,
                msg:"删除成功！"
            })
        }else{
            res.send({
                status:400,
                msg:'删除失败！'
            })
        }
    })
})

//编辑商品的预跟新数据接口
router.get('/backend/item/preUpdateItem',(req,res)=>{
    var id = url.parse(req.url,true).query.id;
    var sql = 'select * from project where id=?';
    sqlFn(sql,[id],result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:400,
                msg:'预更新失败'
            })
        }
    })
})

//编辑商品修改商品的接口
router.get('/backend/item/updateTbItem',(req,res)=>{
    var id = url.parse(req.url, true).query.id;
    var title = url.parse(req.url, true).query.title || "";
    var sellPoint = url.parse(req.url, true).query.sellPoint || "";
    var price = url.parse(req.url, true).query.price || "";
    var num = url.parse(req.url, true).query.num || "";
    var desc = url.parse(req.url, true).query.desc || "";
    var image = url.parse(req.url, true).query.image || "";
    var cid = url.parse(req.url, true).query.cid;
    var sql = "update project set title=?,sellPoint=?,cid=?,price=?,num=?,descs=?,image=? where id=?";
    sqlFn(sql,[title,sellPoint,cid,price,num,desc,image,id],result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:'修改成功'
            })
        }else{
            res.send({
                status:200,
                msg:'修改失败'
            })
        }
    })
})

//规格参数的请求
router.get('/backend/itemParam/selectItemParamAll',(req,res)=>{
    var page = url.parse(req.url,true).query.page || 1;
    var sql = 'select * from params  order by id desc limit 10 offset ' + (page-1)*10;
    sqlFn(sql,null,result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:400,
                msg:'暂无数据'
            })
        }
    })
})

//规格参数模糊搜索接口
router.get('/params/search',(req,res)=>{
    var page = url.parse(req.url,true).query.page || 1;
    const search = url.parse(req.url,true).query.search;
    //concat(`title`,`sellPoint`,`descs`) like "%' + search + '%"  根据search来搜索
    // order by id desc ; 搜索到的数据倒叙
    //limit 10 offset ' + (page-1)*10;  根据给的偏移量page只显示10条数据，page=1，就是1-10；page=2，就是11-20
    const sql = 'select * from params where concat(`id`,`itemCatId`,`paramData`) like "%' + search + '%"' + ' order by id desc limit 10 offset ' + (page-1)*10;
    sqlFn(sql,[search,page],result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:400,
                msg:'暂无数据'
            })
        }
    })
})

//添加规格参数接口
router.get("/backend/itemParam/insertItemParam",(req,res)=>{
    var itemCatId = url.parse(req.url,true).query.itemCatId;
    var paramData = url.parse(req.url,true).query.paramData;
    sql='insert into params values(null,?,?)'
    sqlFn(sql,[itemCatId,paramData],result=>{
        if(result.affectedRows>0){  //影响行数大于0
            res.send({
                status:200,
                msg:'添加成功！'
            })
        }else{
            res.send({
                status:400,
                msg:'添加失败！'
            })
        }
    })
})

//删除规格参数
router.get('/params/delete',(req,res)=>{
    var id = url.parse(req.url,true).query.id;
    var sql = 'delete from params where id=?';
    sqlFn(sql,[id],result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:'删除成功！'
            })
        }else{
            res.send({
                status:400,
                msg:'删除失败！'
            })
        }
    })
})

//获取内容分类-
router.get('/content/title',(req,res)=>{
    var sql = 'select * from content';
    sqlFn(sql,null,result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:400,
                msg:'读取失败'
            })
        }

    })
})

//删除内容分类
router.get('/content/delete',(req,res)=>{
    var pid = url.parse(req.url,true).query.pid;
    var sql = 'delete from content where pid=?';
    sqlFn(sql,[pid],result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:"删除成功"
            })
        }else{
            res.send({
                status:400,
                msg:"删除失败"
            })
        }
    })
})

//添加内容分类
router.get('/content/insert',(req,res)=>{
    var name = url.parse(req.url,true).query.name;
    var pid = Math.floor(Math.random()*100000);     //随机生成的5位数
    var id = Math.floor(Math.random()*100000);
    var sql = 'insert into content values(?,?,?)';
    sqlFn(sql,[id,name,pid],result=>{
        if(result.affectedRows>0){
            res.send({
                status:200,
                msg:'添加成功'
            })
        }else{
            res.send({
                status:400,
                msg:'添加失败'
            })
        }
    })
})

//根据内容分类pid查询contentinfo
router.get('/content/contentInfo',(req,res)=>{
    var pid = url.parse(req.url,true).query.pid;
    var sql = "select * from contentinfo where pid=?";
    console.log(pid);
    sqlFn(sql,[pid],result=>{
        if(result.length>0){
            res.send({
                status:200,
                result
            })
        }else{
            res.send({
                status:400,
                msg:"暂无数据"
            })
        }
    })
})
module.exports = router;