//eventbus封装
import Vue from 'vue'

const EventBus  = new Vue();

Object.defineProperties(Vue.prototype,{
    $bus:{
        get(){
            return EventBus
        }
    }
})

//事件总线eventbus，能让组件之间数据交互，要在main引入
