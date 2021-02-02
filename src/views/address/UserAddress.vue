<template>
  <div class="user-address">
    <van-nav-bar
      class="user-address-nav-bar"
      title="用户地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <bluetopcard>

    <div class="user-address-list">

      <van-address-list
        :list="AddressList"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />

    </div>

    </bluetopcard>


  </div>
</template>

<script>

import bluetopcard from '../../components/BlueTopCard'

export default {

  name:'Address',

  data() {
    return {
      chosenAddressId: "1",
      AddressList:[]
    };
  },

  components: {

    bluetopcard

  },

  methods: {
    
    onClickLeft() {

      this.$router.go(-1);

    },

    onEdit({aid}){

       this.$router.push({

           name:'EditAddress',

           params:{aid}

       })

    },

    onAdd() {

      this.$router.push("/editaddress");

    },

    getUserAddress() {

      let uesrToken = this.$cookie.get('userToken')
      
      this.axios({

          method:'GET',

          url: '/findAddress',

          params: {

              appkey:this.appKey,

              tokenString: uesrToken

          }

      })
      .then((res)=>{


          if(res.data.code === 700) {

              this.$router.push('/login')

              return
          
          }

          if(res.data.code === 20000) {

            res.data.result.forEach(element => {

              this.AddressList.push({

                 aid:element.aid,

                 id: element.id,
   
                 name: element.name,
   
                 tel: element.tel,

                 address:`${element.city}${element.county}${element.addressDetail}`,

                 isDefault:Boolean(element.isDefault)

              })
              
            })

          }

      })

    }
  },

  created(){

    this.getUserAddress()

  }

};
</script>

<style lang="less" scoped>

.user-address{

  padding-top: 45px;

  .user-address-nav-bar{

        width: 100%;

        position: fixed;
    
        top: 0;
    
        background: #fff;
    
        z-index: 2;
    
  }


  .user-address-list{

    /deep/ .van-radio-group{
      
      overflow: scroll;
    
      height: 65vh;

    }


    /deep/ .van-tag--danger {

      background: #232773;

    }

    /deep/ .van-button--danger {

      background: #232773;

      border-color: #232773;

    }

    /deep/ .van-icon-success{

      display: none;

    }


  }

  /deep/ .van-address-list__bottom{

    padding-bottom: 15px;

  }



}


</style>