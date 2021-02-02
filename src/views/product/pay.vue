<template>

  <div class="pay">

    <van-nav-bar

      class="cart-nav-bar"

      title="订单结算"

      left-text="返回"

      left-arrow
      
      @click-left="onClickLeft"

    />

    <div class="pay-in">

        <div class="select-address">
 
           <van-cell title="选择地址" is-link @click="showPopup"/>
      
            <van-cell class="select-address-item" v-if="currentAddress.aid">
      
              <div class="select-address-item-title">
      
                <div class="user-name">
                  {{currentAddress.name}}
                </div>
      
                <div class="user-phone">
                  {{currentAddress.tel}}
                </div>
      
                <van-badge class="user-default" v-if="currentAddress.isDefault" content="默认">
                </van-badge>
      
              </div>
      
              <div class="select-address-item-item">
                {{currentAddress.address}}
              </div>
      
            </van-cell>

        </div>

       <paybox :proInfo="proInfo">

         <template #pay-title></template>

         <template #pay-main>

           <orderitem v-for="(item,index) in orderList" :key="index" :order="item"></orderitem>

         </template>

       </paybox>

    </div>

    <div class="pay-btn">
      <van-button  color="#0c34ba" block round @click="pay">立即结算</van-button>
    </div>

    <van-popup  class="address-list" v-model="isShowPopup"  closeable position="bottom">

        <van-cell title="选择地址"></van-cell>

        <van-address-list
          v-model="chosenAddressId"
          :list="AddressList"
          default-tag-text="默认"
          @add="addAddress"
          @select="selectAddress"
        />

    </van-popup>

  </div>

</template>

<script>

import paybox from '../product/payBox'

import orderitem from '../product/orderItem'

import {mapState,mapMutations} from 'vuex'

export default {

  name: "Pay",

  data() {

    return {

      currentAddress:{},

      isShowPopup: false,

      chosenAddressId: '',

      AddressList: [],

      sids: [],

      orderList: [],

      proInfo:{

        count:0,

        total:0,

        date:''

      }

    }

  },

  components: {
    
    paybox,orderitem

  },

  computed: {
    
    ...mapState(['cartCount'])

  },

  methods: {

    ...mapMutations(['changeCartCount']),

    onClickLeft() {

      this.$router.go(-1)

    },

    showPopup() {

      this.isShowPopup = true

    },

    addAddress() {

      this.$router.push('/editaddress/:aid?')

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

              if(element.isDefault){

                 this.chosenAddressId = element.id

                 this.currentAddress = element

                 this.currentAddress.address=`${element.city}${element.county}${element.addressDetail}`

              }
              
            })



          }

      })

    },

    selectAddress(item) {

      this.chosenAddressId = item.id

      this.currentAddress = {...item}

      this.isShowPopup = false
    },

    getOrderList() {

      let uesrToken = this.$cookie.get('userToken')
      
      this.axios({

          method:'GET',

          url: '/commitShopcart',

          params: {

              appkey:this.appKey,

              tokenString: uesrToken,

              sids:JSON.stringify(this.sids)

          }

      })
      .then((res)=>{

          if(res.data.code === 700) {

              this.$router.push('/login')

              return
          
          }

          if(res.data.code === 50000) {

            this.orderList  = res.data.result

            this.orderList.forEach(element =>{

              this.proInfo.count+=element.count

              this.proInfo.total+=element.count*Number(element.price)

              this.proInfo.date =element.updated_at

            })

          }

      })

    },

    pay() {

      let uesrToken = this.$cookie.get('userToken')

      if(!this.currentAddress.aid){

        return this.$toast({

          message: '请选择收货地址！'

        })

      }

      let data =  {

           appkey:this.appKey,

           tokenString: uesrToken,

           sids:JSON.stringify(this.sids),

           phone:this.currentAddress.tel,

           address:this.currentAddress.address,

           receiver:this.currentAddress.name

      }

      this.axios({

          method:'POST',

          url: '/pay',

          data: data

      })
      .then((res)=>{

          if(res.data.code === 700) {

              this.$router.push('/login')

              return
          
          }

          if(res.data.code === 60000) {

            this.$toast({

               message: res.data.msg

            })

            this.$router.push('/order')

            this.changeCartCount(this.cartCount-this.sids.length)

          }

      })





    }

  },

  created () {

      this.sids = this.$route.query.sids.split('-')

      this.getUserAddress()

      this.getOrderList()

  }

};

</script>

<style lang="less" scoped>

.pay{

  .pay-in{
  
    padding: 8px 8px 70px 8px;
    
    background: #f7f7f7;

    .select-address{

      border-radius: 8px;

      overflow: hidden;
  
      /deep/ .van-cell{
        &::after{
          border: none;
        }
      }
  
      .select-address-item-title{

      display: flex;

      align-items: center;
      
      .user-name{

        font-size: 20px;

        color: #0c34ba;

      }

      .user-phone{

        padding:0 25px;

      }

      .user-default{

        width: 12%;

        height: 20px;

        line-height: 20px;

        text-align: center;

        background: #0c34ba;

      }

      }
  
      .select-address-item-item{
  
        margin-top: 8px;
  
        color: #999;
  
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
  
    }

  }

  .pay-btn{

    position: fixed;

    bottom: 0;

    width: 100%;
    
    background: #fff;

    z-index: 3;

    padding: 8px 0;

  }

  .address-list{

    /deep/ .van-radio-group{
      
      overflow: scroll;
    
    }


    /deep/ .van-tag--danger {

      background: #232773;

    }

    /deep/ .van-button--danger {

      background: #232773;

      border-color: #232773;

    }

    /deep/ .van-icon-edit{

      display: none;

    }

    /deep/ .van-address-item .van-radio__icon--checked .van-icon{

        background: #232773;

        border-color: #232773;

    }

  }

}

</style>