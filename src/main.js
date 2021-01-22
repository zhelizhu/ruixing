import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

// vue-cookies

import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 全局less
import '@/assets/style/global.less'
// resetcss
import '@/assets/style/minireset.min.css'

Vue.config.productionTip = false

Vue.prototype.appKey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='

new Vue({

  router,
  store,
  render: h => h(App)
}).$mount('#app')
