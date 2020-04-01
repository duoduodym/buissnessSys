import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './config/plugin'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/fontIcon/iconfont.css'
import '@/assets/reset.css' /*引入公共样式*/
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
