import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/common.css'//引入通用默认样式
import './router/permission'
import './utils/eventbus'//引入事件总线eventbus.
import i18n from './plugins/i18n'


Vue.config.productionTip = false

// token初始化
if(localStorage.getItem('ego')){  //读取本地存储中的ego-token    
  //就调用loginModule里面的updateToken方法，参数是localStorage.setItem('ego-token')
  store.commit('loginModule/updateToken',JSON.parse(localStorage.getItem('ego')).token);
  store.commit('loginModule/updateUsername',JSON.parse(localStorage.getItem('ego')).username);
}
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
