<template>
  <div class="home">

    <van-row class="home-nav-bar">
      <van-col class="hello-user" span="8">
        <div class="home-time">
          {{ homeTime }}
        </div>
        <div class="user-name">
          {{ userName }}
        </div>
      </van-col>
      <van-col span="16">
        <van-search
          v-model="searchProduct"
          shape="round"
          background="#fff"
          placeholder="请输入搜索关键词"
        />
      </van-col>
    </van-row>

    <div class="in-home">

      <div class="banner">

        <van-swipe @change="onBannerChange" :autoplay="3000">

          <van-swipe-item v-for="(item, index) in bannerList" :key="index" @click="bannerProduct(item.pid)">

            <img :src="item.bannerImg" alt="" />

          </van-swipe-item>

          <!-- 轮播图点 -->

          <template #indicator>
            <div class="custom-indicator-list">
              <div
                class="custom-indicator"
                v-for="(item, index) in bannerList"
                :key="index"
                :class="{ active: index === currentIndex }"
              ></div>
            </div>
          </template>

        </van-swipe>

      </div>

      <div class="hot-product">

        <Title :title="title"></Title>

        <van-row type="flex" justify="space-between">
          
          <van-col span="12" 
            v-for="(item,index) in hotProductList" 
            :key="index"
          >

          <router-link tag="div" class="out-product" :to="`/product/${item.pid}`">
            <product 
            :productData="item" >
            </product>
          </router-link>
            
          </van-col>
          
        </van-row>
        
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../../components/Title";

import product from "../../components/Product";

export default {
  name: "Home",
  data() {
    return {

      homeTime: "下午好",

      userName: "啫喱猪丶",

      searchProduct: "",

      bannerList: [],

      currentIndex: 0,

      title: "热卖推荐",

      hotProductList:[]
    };
  },
  components: {
    Title,
    product,
  },

  computed: {},

  created() {

    if (this.$store.state.isLogin == "") {

      this.$router.push("/login");

    }

    this.getBannerData();

    this.getHotProduct();

  },
  methods: {
    // 轮播图小点

    onBannerChange(val) {
      this.currentIndex = val;
    },

    // 获取轮播图数据

    getBannerData() {
      this.axios({
        method: "GET",

        url: "/banner",

        params: {
          appkey: this.appKey,
        },
      })
        .then((res) => {

          console.log(res);

          if (res.data.code === 300) {
            this.bannerList = res.data.result;
          } else {
            this.$toast({
              message: "轮播图加载失败",
            });
          }
        })
        .catch(() => {
          this.$toast({
            message: "轮播图加载失败",
          });
        });
    },

    // 推荐热卖

    getHotProduct() {

      this.axios({

        method: "GET",

        url: "/typeProducts",

        params: {

          appkey: this.appKey,

          key: 'isHot',

          value: 1
        },
        })
        .then((res) => {

          if (res.data.code === 500) {

            this.hotProductList = res.data.result;

          } else {

            this.$toast({

              message: "热卖推荐加载失败",

            });
          }
        })
        .catch(() => {

          this.$toast({

            message: "热卖推荐加载失败",

          });
        });


    },
    
    // banner点击
    
    bannerProduct(pid){

      this.$router.push(`/product/${pid}`)

    }
  },
};
</script>

<style lang="less">
.home {

  padding-top: 60px;

  background: #f7f7f7;

  .home-nav-bar{

    width: 100%;

    position: fixed;

    top: 0;

    background: #fff;

    z-index: 2;

  }

  .in-home {

    padding: 8px;

    padding-bottom: 60px;

  }

}

.hello-user {

  height: 54px;

  display: flex;

  justify-content: space-around;

  align-items: center;

  background: #fff;

  .user-name {

    color: #232773;

    font-weight: 700;

  }

}

.banner {

  img {
    border-radius: 8px;
  }

  position: relative;

  .custom-indicator-list {

    position: absolute;

    right: 15px;

    bottom: 25px;

    display: flex;

    .custom-indicator {

      width: 20px;

      height: 10px;

      border-radius: 20px;

      background: rgba(0, 0, 0, 0.5);

      margin-right: 10px;

      &.active {

        background: rgba(255, 255, 255, 0.5);

      }

    }

  }

}

</style>
