<template>
  <div class="user-address">
    <van-nav-bar
      class="product-detail-nav-bar"
      title="用户地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="user-address-list">

      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
      ]
    };
  },

  methods: {
    onClickLeft() {
      this.$router.push("/");
    },

    onEdit(){


    },

    onAdd() {



    }
  },
};
</script>

<style>
</style>