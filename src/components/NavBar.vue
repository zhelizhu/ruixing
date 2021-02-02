<template>
  <van-nav-bar @click-left="onClickLeft" @click-right="onClickRight">
    <!-- # : v-solt -->
    <template #left>
      <!-- logo -->
      <div class="logo">
        <img class="auto-img" src="../assets/img/logo.png" alt="" />
      </div>
    </template>

    <!-- 右插槽 -->
    <template #right>
      <!-- go -->
      <div class="go">逛一逛</div>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
    },
    onClickRight() {
      this.$router.push('/')
    },
  },
};
</script>

<style lang="less" scoped>
.logo {
  width: 150px;
}
.go {
  color: #232773;
  font-weight: 700;
  font-size: 16px;
}
</style>