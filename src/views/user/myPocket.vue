<template>
  <div class="my-pocket">
    <van-nav-bar
      class="cart-nav-bar"
      title="我的收藏"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <bluecard>
      <van-grid :column-num="3">
        <van-grid-item v-for="(item, index) in likeList" :key="index">
          <img :src="item.smallImg" alt="" />

          <van-cell :title="item.name">
            <div class="pro-desc">{{ item.enname }}</div>
            <div class="proPirce">
              {{ item.price
              }}<van-icon @click="disLike(item.pid, index)" name="delete-o" />
            </div>
          </van-cell>
        </van-grid-item>
      </van-grid>

      <van-empty
        v-if="likeList.length === 0"
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="暂无收藏"
      />
    </bluecard>
  </div>
</template>

<script>
import bluecard from "../../components/BlueTopCard";

export default {
  data() {
    return {
      likeList: [],
    };
  },

  components: {
    bluecard,
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    findLike() {
      let uesrToken = this.$cookie.get("userToken");

      this.axios({
        method: "GET",

        url: "/findAllLike",

        params: {
          appkey: this.appKey,

          tokenString: uesrToken,
        },
      }).then((res) => {

        if (res.data.code === 700) {
          this.$router.push("/login");

          return;
        }

        if (res.data.code === 2000) {
          this.likeList = res.data.result;
        }
      });
    },

    disLike(pid, index) {
      let uesrToken = this.$cookie.get("userToken");

      this.axios({
        method: "POST",

        url: "/notlike",

        data: {
          appkey: this.appKey,

          tokenString: uesrToken,

          pid: pid,
        },
      }).then((res) => {
        if (res.data.code === 700) {
          this.$router.push("/login");

          return;
        }

        if (res.data.code === 900) {
          this.likeList.splice(index, 1);
        }
      });
    },
  },

  created() {
    this.findLike();
  },
};
</script>

<style lang="less" scoped>
.my-pocket {
  /deep/ .van-cell {
    padding: 8px;

    display: flex;

    flex-direction: column;

    justify-content: flex-start;

    .van-cell__title {
      overflow: hidden;

      text-overflow: ellipsis;

      white-space: nowrap;
    }

    .van-cell__value {
      display: flex;

      flex-direction: column;

      text-align: left;

      .pro-desc {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .proPirce {
        display: flex;

        align-items: center;

        justify-content: space-between;
      }
    }
  }
}
</style>