//i18n国际化处理
//引入
import Vue from 'vue'
import VueI18n from 'vue-i18n'

// elementUI的国际化处理
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)

//需要转化的字符
const messages = {
    en: {
        message: {
            produck: 'produck',
            params: 'params',
            content: 'content',
            search: 'search',
            add: 'Add',
        },
        ...enLocale
    },
    zh: {
        message: {
            produck: '商品管理',
            params: '规格参数',
            content: '广告分类',
            search: '搜索',
            add: '添加',
        },
        ...zhLocale
    }
}

//创建实例
const i18n = new VueI18n({
    locale: 'zh', // 设置地区
    messages, // 设置地区信息
})

//elementUI的国际化处理
ElementLocale.i18n((key, value) => i18n.t(key, value))

//导出在全局挂载到vue
export default i18n