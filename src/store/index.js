import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    isLogin:true,

    cartCount:0,

    isLoadCartCount:false

  },
  mutations: {

    changeCartCount(state,data) {

      state.cartCount = data

    },

    changeisLoadCartCount(state) {

        state.isLoadCartCount = true

    }

  },
  actions: {
  },
  modules: {
  }
})
