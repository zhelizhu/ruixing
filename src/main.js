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

Vue.filter('formatDate', (val, format) => {

  let date = new Date(val)

  let year = date.getFullYear().toString()

  if (/(y+)/.test(format)) {

    let yearContent = RegExp.$1

    format = format.replace(yearContent, year.slice(year.length - yearContent.length, ))

  }

  let dateObject = {

    M: date.getMonth() + 1,

    d: date.getDay(),

    h: date.getHours(),

    m: date.getMinutes(),

    s: date.getSeconds()

  }

  for (const key in dateObject) {
    
      let reg = new RegExp(`(${key}+)`)

      if(reg.test(format)){

        let content = RegExp.$1

        format = format.replace(content,dateObject[key] >= 10?dateObject[key]:content.length === 2? '0' + dateObject[key]:dateObject[key])

      }

  }

  return format

})

import './assets/font/iconfont.css'

new Vue({

  router,
  store,
  render: h => h(App)
}).$mount('#app')