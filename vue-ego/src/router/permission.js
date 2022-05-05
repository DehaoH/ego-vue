import router from './index'
import store from '../store'

//通过路由元信息，判断是否要登录才能访问
router.beforeEach((to, from, next) => {  
    //to.matched,当前组件和子组件的信息
    //所以要循环判断，(.some)
    if(to.matched.some(recode =>recode.meta.requiresAuth)){
      //定义一个登录状态,来判断有没有登录了，没有登录才需要跳转到login页面
      const token = store.state.loginModule.token;
      return token ? next() :next({path:'/login'})  //登录了的直接跳转，没有登录的跳转到login页面
    }else{
      next();
    }
  })