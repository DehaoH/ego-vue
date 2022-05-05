// 网络请求统一封装
import axios from '../utils/require'
import base from './base'

const api = {
    //登录
    login(params) {
        return axios.post(base.baseUrl + base.login, params)
    },
    //注册
    register(params) {
        return axios.post(base.baseUrl + base.register, params)
    },
    //商品列表
    selectTbItemAllByPage(params) {
        return axios.get(base.baseUrl + base.selectTbItemAllByPage, {
            params
        })
    },
    //商品总数
    total() {
        return axios.get(base.baseUrl + base.total)
    },
    //模糊搜索
    search(params) {
        return axios.get(base.baseUrl + base.search, {
            params
        })
    },
    //类目选择请求
    selectItmeCategoryByParentId(params) {
        return axios.get(base.baseUrl + base.selectItmeCategoryByParentId, {
            params
        })
    },
    //添加商品
    insertTbItem(params) {
        return axios.get(base.baseUrl + base.insertTbItem, {
            params
        })
    },
    //删除商品
    deleteItemById(params) {
        return axios.get(base.baseUrl + base.deleteItemById, {
            params
        })
    },
    //编辑商品预更新请求
    preUpdateItem(params) {
        return axios.get(base.baseUrl + base.preUpdateItem, {
            params
        })
    },
    //修改商品请求
    updateTbItem(params) {
        return axios.get(base.baseUrl + base.updateTbItem, {
            params
        })
    },
    //参数规格数据请求
    selectItemParamAll(params) {
        return axios.get(base.baseUrl + base.selectItemParamAll, {
            params
        })
    },

    //规格参数接口
    paramsSearch(params) {
        return axios.get(base.baseUrl + base.paramsSearch, {
            params
        })

    },
    //添加规格参数
    insertItemParam(params) {
        return axios.get(base.baseUrl + base.insertItemParam, {
            params
        })
    },
    //删除规格参数
    deleteParams(params) {
        return axios.get(base.baseUrl + base.deleteParams, {
            params
        })
    },
    //读取内容分类-标题
    contentTitle() {
        return axios.get(base.baseUrl + base.contentTitle)
    },
    //删除内容分类
    contentDelete(params) {
        return axios.get(base.baseUrl + base.contentDelete, {
            params
        })
    },
    //添加内容分类
    contentInsert(params) {
        return axios.get(base.baseUrl + base.contentInsert, {
            params
        })
    },
    //查询内容分类-info
    contentInfo(params) {
        return axios.get(base.baseUrl + base.contentInfo, {
            params
        })
    }


}

export default api