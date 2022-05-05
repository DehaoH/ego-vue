import Vue from 'vue'
import Vuex from 'vuex'
import loginModule from './modules/loginModule'
import pubModule from './modules/pubModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loginModule,
    pubModule
  }
})
