<template>
  <div class="meun-list">
    <van-card
      v-for="(item, index) in meunlist"
      :key="index"
      :price="item.price"
      :desc="item.enname"
      :title="item.name"
      :thumb="item.smallImg"
      @click='toProduct(item.pid)'
    />
  </div>
</template>

<script>
export default {
  props: {
    meunlist: {
      type: Array,
    },
  },
  methods: {

    toProduct(pid){

      this.$router.push(`/product/${pid}`)

    }

  }
};
</script>

<style>
</style>