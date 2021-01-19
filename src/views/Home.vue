<template>
  <div class="home">
    <van-row>
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

    <div class="banner">
      <van-swipe @change="onBannerChange" :autoplay="3000">
        <van-swipe-item v-for="(item, index) in imgList" :key="index">
          <img :src="item" alt="" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator-list">
            <div
              class="custom-indicator"
              v-for="(item, index) in imgList"
              :key="index"
              :class="{ active: index === currentIndex }"
            ></div>
          </div>
        </template>
      </van-swipe>
    </div>
  
    <tabber></tabber>
  </div>
</template>

<script>
import tabber from "../components/TabBar";
export default {
  name: "Home",
  data() {
    return {
      homeTime: "下午好",
      userName: "啫喱猪丶",
      searchProduct: "",
      imgList: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg",
      ],
      currentIndex: 0,
    };
  },
  components: {

    tabber,
    
  },
  computed: {},
  created() {
    if (this.$store.state.isLogin == "") {
      this.$router.push("/login");
    }
  },
  methods: {
    onBannerChange(val) {
       this.currentIndex=val
    },
  },
};
</script>

<style lang="less">
.hello-user {
  height: 54px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .user-name {
    color: #232773;
    font-weight: 700;
  }
}
.banner {
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
      &.active{
        background: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
</style>
