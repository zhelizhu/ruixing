<template>
  <div class="mine">
    <div class="mine-bg">

      <div class="change-bg">
        <van-uploader :after-read="uploadBg" />
      </div>

      <img :src="userData.userBg" alt="">


    </div>

    <div class="mine-main">

      <div class="mine-header">

        <div class="mine-img">

          <van-uploader :after-read="uploadAcatar" />

          <img :src="userData.userImg" alt="">

        </div>

        <div class="mine-desc">

          <div class="mine-name">
            {{userData.nickName}}
          </div>

          <div class="mine-info">
            {{userData.desc?userData.desc:"快去添加你的描述吧！"}}
          </div>
          
        </div>

      </div>

      <div class="mine-list">

        <van-cell-group>
          <van-cell v-for="(item,index) in cellData" :key="index" :title="item.title" :to="item.to" is-link />
        </van-cell-group>

      </div>

    </div>

  </div>
</template>

<script>


export default {

  data(){

    return{

      cellData:[
        {
          title:'个人资料',
          to:'/preInfo'
        }, {
          title:'我的订单',
          to:'/order'
        },{
          title:'我的收藏',
          to:'/myPocket'
        }, {
          title:'地址管理',
          to:'/address'
        }, {
          title:'安全中心',
          to:'/safetyCenter'
        }
      ],

      userData:{}

    }

  },

  components: {


  },

  methods: {

    getUserInfo() {

       let uesrToken = this.$cookie.get('userToken')

       this.axios({

           method:'GET',

           url: '/findMy',

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

           if(res.data.code === 'A001'){

             this.userData = res.data.result[0]

           }

       })

    },

    // 上传头像

    uploadAcatar(file) {

      let type = ['png','gif','jpg','jpeg']

      let imgType = file.file.type.split('/')[1]

      if (type.indexOf(imgType) === -1) {
        
        this.$toast({

          message:'文件类型不支持！'

        })

        return

      }

      let base64 = file.content.replace(/data:image\/[A-Za-z]+;base64,/,"")

      let uesrToken = this.$cookie.get('userToken')

       this.axios({

           method:'POST',

           url: '/updateAvatar',

           data: {
               
               appkey:this.appKey,

               tokenString : uesrToken,

               imgType:type,

               serverBase64Img: base64

           }


       })
       .then((res)=>{

           if(res.data.code === 700) {

               this.$router.push('/login')

               return
           
           }

           if(res.data.code === 'H001'){

             if (res.data.result[0] === 1) {

               this.userData.userImg = res.data.userImg
               
             }


           }

       })

    },

    // 上传背景

    uploadBg(file) {

      let type = ['png','gif','jpg','jpeg']

      let imgType = file.file.type.split('/')[1]

      if (type.indexOf(imgType) === -1) {
        
        this.$toast({

          message:'文件类型不支持！'

        })

        return

      }

      let base64 = file.content.replace(/data:image\/[A-Za-z]+;base64,/,"")

      let uesrToken = this.$cookie.get('userToken')

       this.axios({

           method:'POST',

           url: '/updateUserBg',

           data: {
               
               appkey:this.appKey,

               tokenString : uesrToken,

               imgType:type,

               serverBase64Img: base64

           }


       })
       .then((res)=>{

           if(res.data.code === 700) {

               this.$router.push('/login')

               return
           
           }

           if(res.data.code === "I001"){

             if (res.data.result[0] === 1) {

               this.userData.userBg = res.data.userBg
               
             }


           }

       })

    }

  },

  created() {

    this.getUserInfo()

  }

}
</script>

<style lang="less" scoped>

.mine{

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  .mine-bg{

    width: 100%;

    height: 30vh;

    background-size: cover;

    .change-bg{

      position: absolute;

      width: 100%;

      height: 100%;

      text-align: right;

      color: rgba(255, 255, 255, 0.5);

      opacity: 0;

      /deep/ .van-uploader,/deep/ .van-uploader__wrapper,/deep/ .van-uploader__upload{

           width: 100%;
   
           height: 100%;


           margin: 0;


      }

    }

  }

  .mine-main{

    width: 90%;

    background-image: linear-gradient(to bottom,rgba(255,255,255,.65) 0px ,rgba(255,255,255,.65) 40px, #fff 40px);

    height: 65vh;

    border-radius: 25px;

    transform: translateY(-40px);
  
    .mine-header {

      display: flex;

      align-items: center;

      padding: 8px;

      .mine-img{

        img {

          width: 80px;

          height: 80px;

          border-radius: 50%;

        }

        /deep/ .van-uploader{

          position: absolute;

          opacity: 0;

        }

      }

      .mine-desc{

        padding-left: 15px;

        height: 80px;

        display: flex;

        flex-direction: column;
        
        justify-content: space-around;

        color: #999;

        .mine-name{

          font-size: 25px;

          color: #666;

        }

      }

    }

  }

}

</style>