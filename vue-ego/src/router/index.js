import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout.vue'
import Login from '../views/login'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path: '/',
    name: 'Layout',
    redirect:"/produck",  //重定向
    component: Layout,
    meta:{requiresAuth:true} ,//需要登录才能访问
    children:[
      {
        path:'produck',  //根目录
        name:'Produck',
        meta:{requiresAuth:true} ,//需要登录才能访问
        component:()=>import('../views/produck')
      },
      {
        path:'/params',
        name:'Params',
        meta:{requiresAuth:true} ,//需要登录才能访问
        component:()=>import('../views/params')
      },
      {
        path:'/content',
        name:'Content',
        meta:{requiresAuth:true} ,//需要登录才能访问
        component:()=>import('../views/content')
      },

    ]
  },
  {
    path:'/user',
    name:'User',
    meta:{requiresAuth:true} ,//需要登录才能访问
    component:()=>import('../views/user')
  }

]

const router = new VueRouter({
  routes
})

export default router
