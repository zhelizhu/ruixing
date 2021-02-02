<template>
  <div class="order">
    <van-nav-bar
      class="cart-nav-bar"
      title="订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <bluecard>
      <van-tabs
        v-model="tabActive"
        color="#0c34ba"
        title-active-color="0c34ba"
        @change="changeOrderStatus"
      >
        <van-tab v-for="(item, index) in tabs" :key="index" :title="item.title">
          <paybox
            v-for="(item, index) in orderData"
            :key="index"
            :proInfo="item.proInfo"
          >
            <template #pay-title>
              <div class="pay-title">
                <div class="pay-t">
                  {{ item.oid }}
                </div>
                <div
                  class="pay-s"
                  v-if="item.status === 2"
                  @click="removeOrder(item.oid, index)"
                >
                  <div class="pay-text">已完成</div>

                  <div class="pay-icon">
                    <van-icon name="delete-o" />
                  </div>
                </div>

                <div
                  class="pay-text"
                  @click="confirmOrder(item, index)"
                  v-if="item.status === 1"
                >
                  确认订单
                </div>
              </div>
            </template>

            <template #pay-main>
              <orderitem
                v-for="(v1, index) in item.data"
                :key="index"
                :order="v1"
              ></orderitem>
            </template>
          </paybox>

          <van-empty v-if="orderData.length === 0" description="啥都没有！" />
        </van-tab>
      </van-tabs>
    </bluecard>
  </div>
</template>

<script>
import bluecard from "../../components/BlueTopCard";

import paybox from "../product/payBox";

import orderitem from "../product/orderItem";

export default {
  data() {
    return {
      tabActive: 0,

      tabs: [
        {
          title: "全部",

          status: 0,
        },
        {
          title: "进行中",

          status: 1,
        },
        {
          title: "已完成",

          status: 2,
        },
      ],

      orderData: [],
    };
  },

  components: {
    bluecard,
    paybox,
    orderitem,
  },

  methods: {
    onClickLeft() {
      this.$router.push('/');
    },

    getOrderDate(status) {
      let uesrToken = this.$cookie.get("userToken");

      this.axios({
        method: "GET",

        url: "/findOrder",

        params: {
          appkey: this.appKey,

          tokenString: uesrToken,

          status: status,
        },
      }).then((res) => {
        if (res.data.code === 700) {
          this.$router.push("/login");

          return;
        }

        if (res.data.code === 70000) {
          let productList = [];

          let oids = [];

          res.data.result.forEach((element) => {
            element.small_img = element.smallImg;

            if (oids.indexOf(element.oid) === -1) {
              let o = {
                oid: element.oid,

                status: element.status,

                proInfo: {
                  date: element.updatedAt,

                  count: 0,

                  total: 0,
                },

                data: [],
              };

              oids.push(element.oid);

              productList.push(o);
            }
          });

          productList.forEach((element) => {
            res.data.result.forEach((item) => {
              if (element.oid === item.oid) {
                element.data.push(item);

                element.proInfo.count += item.count;

                element.proInfo.total += item.count * item.price;
              }
            });
          });

          this.orderData = productList;

        }
      });
    },

    changeOrderStatus(name) {
      this.getOrderDate(name);
    },

    confirmOrder(item, index) {
      let uesrToken = this.$cookie.get("userToken");

      this.axios({
        method: "POST",

        url: "/receive",

        data: {
          appkey: this.appKey,

          tokenString: uesrToken,

          oid: item.oid,
        },
      }).then((res) => {

        if (res.data.code === 700) {

          this.$router.push("/login");

          return;
        }

        if (res.data.code === 80000) {

          this.$toast({
              message : res.data.msg
          });
          item.status = 2;

          if (this.tabActive === 1) {
            this.orderData.splice(index, 1);
          }
        }
      });
    },

    removeOrder(oid, index) {
      let uesrToken = this.$cookie.get("userToken");

      this.axios({
        method: "POST",

        url: "/removeOrder",

        data: {
          appkey: this.appKey,

          tokenString: uesrToken,

          oid: oid,
        },
      }).then((res) => {


        if (res.data.code === 700) {
          this.$router.push("/login");

          return;
        }

        if (res.data.code === 90000) {

          this.$toast({
              message : res.data.msg
          });

          this.orderData.splice(index, 1);
        }
      });
    },
  },

  created() {
    this.getOrderDate(0);
  },
};
</script>

<style lang="less" scoped>
.order {
  .pay-title {
    display: flex;

    align-items: center;

    justify-content: space-between;

    .pay-s {
      display: flex;

      align-items: center;

      .pay-icon {
        padding: 0 10px;

        font-size: 20px;

        margin-top: 8px;
      }
    }
  }
}
</style>