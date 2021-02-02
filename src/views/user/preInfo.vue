<template>
  <div class="preInfo">
      <van-nav-bar
      class="user-address-nav-bar"
      title="个人资料"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <bluecard>
      <van-cell-group>
        <van-cell title="头像">
            <img :src="userData.userImg" alt="">
        </van-cell>
        <van-cell title="用户ID">
            {{userData.userId}}
        </van-cell>
        <van-cell title="昵称">

            {{userData.nickName}}

        </van-cell>
        <van-cell title="简介">

            {{userData.desc?userData.desc:'快去编写简介'}}

        </van-cell>
      </van-cell-group>
    </bluecard>
  </div>
</template>

<script>
import bluecard from "../../components/BlueTopCard";

export default {

  data(){

      return{

          userData:{}

      }

  },

  components: {

    bluecard,

  },

  methods: {
      
    onClickLeft() {

      this.$router.go(-1);

    },

    getUserInfo() {

       let uesrToken = this.$cookie.get('userToken')

       this.axios({

           method:'GET',

           url: '/findAccountInfo',

           params: {
               
               appkey:this.appKey,

               tokenString : uesrToken

           }


       })
       .then((res)=>{

           if(res.data.code === 700) {

               this.$router.push('/login')

               return
           
           }

           if(res.data.code === "B001"){

             this.userData = res.data.result[0]

           }

       })

      }

  },

  created() {

      this.getUserInfo()
      
  }
  
};

</script>

<style lang="less" scoped>

.preInfo{

    /deep/ .van-cell{

        padding: 15px;

        .van-cell__title{

             display: flex;
     
             align-items: center;

        }


        .van-cell__value{

             img{
                 width: 50px;
                 height: 50px;
                 border-radius: 50%;
             }

        }

    }
    
}

</style>