<template>
  <div class="meun">
    <van-search v-model="searchVal" @input="searchPro(searchVal)" placeholder="请输入搜索关键词" />

    <van-grid>
      <van-grid-item @click="getProductList(item.value,item.key)" v-for="(item, index) in meunIconList" :key="index">
        <van-icon :class-prefix="item.class" name="extra" />
        {{ item.title }}
      </van-grid-item>
    </van-grid>

    <meunlist :meunlist="recommendList"></meunlist>
   
    <van-empty
      v-if="recommendList.length === 0"
       class="custom-image"
       image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
       description="描述文字"
    />

  </div>
</template>

<script>

import meunlist from '../../components/MeunList'

export default {
  data() {
    return {

      searchVal: "",

      meunIconList: [
        {
          class: "iconfont icon-cup",
          title: "推荐",
          value: 1,
          key:'isHot'
        },
        {
          class: "iconfont icon-natie",
          title: "拿铁",
          value: "latte",
          key:'type'
        },
        {
          class: "iconfont icon-coffee",
          title: "咖啡",
          value: "coffee",
          key:'type'
        },
        {
          class: "iconfont icon-bingbang",
          title: "瑞纳冰",
          value: "Ruina ice",
          key:'type'
        },
      ],

      recommendList : [],

    };
  },

  components: {

    meunlist

  },

  methods: {

    getProductList(value,key){


       this.axios({

           method:'GET',

           url: '/typeProducts',

           params: {
               
               appkey:this.appKey,

               key,

               value

           }


       })
       .then((res)=>{

           if(res.data.code === 700) {

               this.$router.push('/login')

               return
           
           }

           if(res.data.code === 500){

             this.recommendList = res.data.result

           }

       })

    },

    searchPro(name){

       this.axios({

           method:'GET',

           url: '/search',

           params: {
               
               appkey:this.appKey,

                name
           }


       })
       .then((res)=>{


           if(res.data.code === 700) {

               this.$router.push('/login')

               return
           
           }

           if(res.data.code === "Q001"){

             this.recommendList = res.data.result


           }

       })

    }

  },

  created() {

    this.getProductList(1,'isHot')

  }
};
</script>

<style lang="less" scoped>
.meun {
  padding-bottom: 80px;
  /deep/ .van-grid-item__content {
    .iconfont {
      color: #232773;

      font-weight: 700;

      padding: 8px;
    }
  }
  /deep/ .van-card__content{

    display: flex;

    flex-direction: row;

    align-items: center;

  }

  /deep/ .van-card__desc{

    width: 150px;

  }

  /deep/ .van-card__price{

    color: #232773;

    font-weight: 700;

  }
}
</style>