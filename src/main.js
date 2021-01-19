import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 全局less
import '@/assets/style/global.less'
// resetcss
import '@/assets/style/minireset.min.css'

Vue.config.productionTip = false


new Vue({

  router,
  store,
  render: h => h(App)
}).$mount('#app')
