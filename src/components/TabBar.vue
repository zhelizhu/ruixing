<template>
  <div class="tab-bar">
    <router-view />

    <!-- route:路由模式 -->
    <!-- active-color:点击后颜色 -->
    <!-- badge:提示 -->
    <!-- dot:红点 -->
    <van-tabbar route active-color="#232773" v-model="TabBarActive">

      <van-tabbar-item

        v-for="(item, index) in TabBarData"

        replace

        :key="index"

        :to="item.to"

        :badge="item.badge"

        :dot="item.dot"

      >
        <span>{{ item.text }}</span>

        <template #icon="props">

          <van-icon

            :name="props.active ? item.icon.active : item.icon.inactive"

          />

        </template>

      </van-tabbar-item>

    </van-tabbar>

  </div>

</template>

<script>

import {mapState,mapMutations} from "vuex";

export default {
  data() {
    return {
      TabBarActive: null,
    };
  },

  computed: {

      ...mapState(['cartCount','isLoadCartCount']),

       TabBarData(){

         return [
        // home

        {
          to: "/",

          icon: {
            active: "wap-home",

            inactive: "wap-home-o",
          },

          text: "首页",
        },

        // menu

        {
          to: "/meun",

          icon: {
            active: "send-gift",

            inactive: "send-gift-o",
          },

          text: "菜单",
        },

        // cart

        {
          to: "/cart",

          icon: {
            active: "shopping-cart",
            inactive: "shopping-cart-o",
          },

          badge: this.$store.state.cartCount,

          text: "购物车",
        },

        // mine

        {
          to: "/mine",

          icon: {
            active: "friends",
            inactive: "friends-o",
          },

          dot: true,

          text: "我的",
        },
      ]
    }

  },

  created() {

    this.getCartProduct();

  },

  methods: {

    ...mapMutations(['changeCartCount','changeisLoadCartCount']),

    // 查询购物车

    getCartProduct() {

      if (this.isLoadCartCount) {

          return

      }

      this.axios({

        method: "GET",

        url: "/shopcartRows",

        params: {

          appkey: this.appKey,

          tokenString: this.$cookie.get("userToken"),

        },

      })
      .then((res) => {

        if (res.data.code === 8000) {

          // this.$store.commit('changeCartCount',res.data.result)


          this.changeCartCount(res.data.result)

          this.changeisLoadCartCount()

        }

      });

    },

  },

};
</script>

<style>
</style>