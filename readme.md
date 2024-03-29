# ego商城后台系统

#### 介绍
本项目是一个ego商城的后台管理系统
具有功能:
用户登录与注册、商品管理、规格参数管理、广告分类管理等。
集成国际化语言环境，支持中英两种语言
项目采用Vue技术栈

#### 项目技术
1. 项目环境：Vue-Cli构建项目，集成项目环境（前后端同步实现，集成了Node服务器，集成XAMPP）
2. 项目技术：
    - 项目网络请求集成Axios，同时对Axios进行封装，主要处理请拦截，响应拦截及错误处理
    - 项目UI采用ElementUI，并且对ElementUI进行二次封装，
        - 主要引入组件包括：table表格，tree树形控件，form表单，dailog弹出框等
    - 项目页面之间的管理采用Vue-Router路由管理，包括路由嵌套功能、路由导航、路由传参、路由权限管理等
    - 项目的全局状态，包括登录token，订单信息等采用Vuex进行管理，并跟踪数据变化
    - 引入了富文本编辑器（wangEditor）
    - 因为项目开发是前后端同步，所以前期数据采用node+mock做数据模拟，并且在开发环境下用proxy解决跨域问题/cors解决跨域问题

#### 项目页面构建
1. 商品管理:product
2. 规格参数:params
3. 内容分类管理:Content
4. 用户登录注册页面:login
5. 用户中心:ucenter

#### 模拟的mysql数据库
1. database
