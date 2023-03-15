// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//import Element-UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// import ECharts
import * as echarts from "echarts"
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

// import vuex
import store from "./store/index"

//import axios
import axios from 'axios'
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
