//网络请求，接口的管理
const base = {
    baseUrl :'http://localhost:3000',
    // baseUrl :'/api',
    login:'/api/login',  //登录
    register:'/api/register',   //注册
    selectTbItemAllByPage:'/api/backend/item/selectTbItemAllByPage',    //商品列表
    total:'/api/total',     //商品总数接口
    search:'/api/search',   //模糊搜索接口
    selectItmeCategoryByParentId:'/api/backend/itemCategory/selectItmeCategoryByParentId',   //类目选择接口
    insertTbItem:'/api/backend/item/insertTbItem',  //添加商品接口
    deleteItemById:'/api/backend/item/deleteItemById',  //删除商品接口
    preUpdateItem:'/api/backend/item/preUpdateItem',    //编辑商品预更新接口
    updateTbItem:'/api/backend/item/updateTbItem',  //编辑商品，修改商品接口
    selectItemParamAll:'/api/backend/itemParam/selectItemParamAll',   //参数数据查询接口
    paramsSearch:'/api/params/search'  , //规格参数模糊查询
    insertItemParam:'/api/backend/itemParam/insertItemParam',  //添加规格参数
    deleteParams:'/api/params/delete',  //删除规格参数
    contentTitle:'/api/content/title',   //读取内容分类-标题
    contentDelete:'/api/content/delete',    //删除内容分类
    contentInsert:'/api/content/insert',    //添加内容分类
    contentInfo:'/api/content/contentInfo',//查询内容分类-info

}

export default base 