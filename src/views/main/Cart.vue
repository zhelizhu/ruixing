<template>
  <div class="cart">

    <van-nav-bar

      class="cart-nav-bar"

      title="购物车"

      left-text="返回"

      left-arrow
      
      @click-left="onClickLeft"

      @click-right="onClickRight"

    >
    
    <template #right >

      <span v-if="cartProductList.length > 0">{{isEdit? '编辑':'完成'}}</span>
      
    </template>
    
    </van-nav-bar>

    <div class="cartimg">

       <van-image width="" height="" :src="require('../../assets/img/logo.png')" />

    </div>

    <div class="cart-main">

      <div class="in-cart-main">

        <van-list
           v-model="loading"
           :finished="finished"
           finished-text="没有更多了"
           @load="loadCartData"
           v-if="cartProductList.length != 0"
        >

        <van-swipe-cell  class="out-cart-main-item" 
             :disabled="isEdit" v-for="(item,index) in cartProductList" 
             :key="item.sid"
        >

         <van-row type="flex" class="cart-main-item">

          <van-col span="2" class="cart-main-check">

             <van-checkbox @change="simpleSelect" v-model="item.isCheck"></van-checkbox>

          </van-col>
          
          <van-col class="cart-main-img" span="8">

             <van-image width="100" height="100" :src="item.large_img" />

          </van-col>

          <van-col span="14">

              <van-cell class="cart-main-info" center :title="item.name" :value="item.enname" :label="item.rule" />

              <van-cell class="cart-main-add">

                  <div class="price">{{item.price}}</div>

                  <van-stepper v-model="item.count" @change="updateCartCount(item.sid,item.count)" theme="round" button-size="22" disable-input />

              </van-cell>


          </van-col>
          
        </van-row>

             <template #right>

                  <van-button square text="删除" type="danger" @click="deleteCartOne([item.sid],index)" class="delete-button" />

             </template>

        </van-swipe-cell>

        </van-list>

      <van-empty v-else  description="您的购物车空空如也" image="https://img.yzcdn.cn/vant/custom-empty-image.png">
         <van-button round type="danger" class="bottom-button" @click="toHome">逛一逛</van-button>
      </van-empty>


      </div>

    </div>  



    <van-submit-bar v-show="isEdit" class="cart-bottom" :price="total" @submit="submitOrder" button-text="提交订单">
       <van-checkbox v-model="checked" @click="allSelect">全选</van-checkbox>
    </van-submit-bar>

    <van-submit-bar v-show="!isEdit" class="cart-bottom cart-bottom-delete" @submit=" deleteCartMore" button-text="删除">
       <van-checkbox v-model="checked" @click="allSelect">全选</van-checkbox>
    </van-submit-bar>

  </div>

</template>

<script>

import {mapState,mapMutations} from 'vuex'

export default {

  name: "Cart",

  data() {

    return{

      isEdit: true,

      checked:false,

      cartProductList:[],

      cartProductAllList: [],

      start:0,

      count:5,

      loading: true,

      finished: false,

      total: 0

    }

  },

  methods: {
    
    ...mapMutations(['changeCartCount']),

    onClickLeft() {

      this.$router.go(-1);

    },

    onClickRight() {

      this.isEdit = !this.isEdit

    },

    // 获取购物车数据

    getCartData(){
            
       let uesrToken = this.$cookie.get('userToken')

       this.axios({

           method:'GET',

           url: '/findAllShopcart',

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

           if(res.data.code === 5000){

              res.data.result.forEach(element => {

                    element.isCheck = false

              });

               this.cartProductAllList = res.data.result

               this.cartProductList = this.cartProductAllList.slice(this.start,this.start+this.count)

               this.start += this.count

               this.loading = false

           }

       })

    },

    // 加载数据

    loadCartData() {

      setTimeout(()=>{

         let data = this.cartProductAllList.slice(this.start,this.start+this.count)

         this.cartProductList.push(...data)

         this.start+=this.count

         if(data.length < this.count) {

         this.finished = true

         return

         }

         this.loading = false

      },1000)

    },

    // 添加商品数量

    updateCartCount(sid,count) {

       let uesrToken = this.$cookie.get('userToken')

       this.axios({

           method:'POST',

           url: '/modifyShopcartCount',

           data: {
               
               appkey:this.appKey,

               tokenString : uesrToken,

               sid: sid,

               count: count

           }


       })
       .then((res)=>{


           if(res.data.code === 700) {

               this.$router.push('/login')

               return
           
           }

           if(res.data.code === 6000){

             this.sum()

             this.$toast({

               message:'修改成功'

             })

           }

       })

    },

    // 全选

    allSelect() {

      this.cartProductList.forEach(element => {

        element.isCheck=this.checked

      })

      this.sum()

    },

    // 单选

    simpleSelect() {

      this.sum()

      for (let i = 0; i < this.cartProductList.length; i++) {

        const element = this.cartProductList[i];

        if (!element.isCheck) {

          this.checked=false

          return
          
        }

        this.checked=true
        
      }

    },

    // 单个删除

    deleteCartOne(sids,index) {

      this.sum()

      let uesrToken = this.$cookie.get('userToken')

       this.axios({

           method:'POST',

           url: '/deleteShopcart',

           data: {
               
               appkey:this.appKey,

               tokenString : uesrToken,

               sids: JSON.stringify(sids)

           }

       })
       .then((res)=>{


           if(res.data.code === 700) {

               this.$router.push('/login')

               return
           
           }

           if(res.data.code === 7000){

              if(index !== undefined){

               this.cartProductList.splice(index,1)

                this.changeCartCount(this.cartProductList.length)

             }
             else{

               for (let i = 0; i < this.cartProductList.length; i++) {

                 const element = this.cartProductList[i];

                 if(element.isCheck) {

                   this.cartProductList.splice(i,1)

                   i--

                 }
                 
               }

                this.changeCartCount(this.cartProductList.length)
             }

             this.$toast({

               message:'删除成功'

             })

           }

       })



    },

    // 逛一逛
    
    toHome(){

      this.$router.push('/')

    },

    // 勾选删除

    deleteCartMore() {

      let sids = []

      this.cartProductList.forEach(element => {

        if(element.isCheck){

          sids.push(element.sid)

        }
        if (sids.length == 0) {

            this.$toast({

              message: '无商品删除'

            })

            return

        }

      })

      this.deleteCartOne(sids)

      this.sum()
    },

    // 计算总金额

    sum() {

      this.total = 0

      this.cartProductList.forEach( element => {

        if(element.isCheck){

          this.total += element.price * element.count

        }

      })

      this.total = this.total*100


    },
    
    submitOrder() {

      let sids = []

      this.cartProductList.forEach( element => {

        if(element.isCheck){

          sids.push(element.sid)

        }

      })

      if(sids.length === 0){
        
        this.$toast({

          message: '请选择商品'

        })

        return

      }
      else{

        this.$router.push({name:'Pay',query:{sids: sids.join('-')}})

      }

    }

  },

  created() {

    this.getCartData()

  },

  computed:{

    ...mapState(['cartCount'])

  }
  
};

</script>

<style lang="less" scoped>

.cart{
    padding-top: 50px;

    height: 100vh;

    background: #f7f7f7;

    .cart-nav-bar{

        width: 100%;

        position: fixed;
    
        top: 0;
    
        background: #fff;
    
        z-index: 2;
    
   }

    .cartimg{

      width: 100%;

      background: #fff;

      box-shadow: 0px 13px 18px -4px #ccc;
      
    }

    .cart-main{

      background: #f7f7f7;

      padding: 8px;

      .in-cart-main{
        
        padding-bottom: 120px;
  
        background: #fff;

        /deep/ .delete-button {

          height: 100%;

        }

        .cart-main-img{

          display: flex;

          justify-content: center;

          align-items: center;

        }

        .cart-main-item{

          padding: 8px;

        }

        .cart-main-info{

          display: flex;

          flex-direction: column;

          align-items: flex-start;

          padding: 0 ;

          /deep/ .van-cell__title{

           padding: 0;

            width: 70%;

            display: flex;

            justify-content: space-between;

          }

          &::after{

            border: none;

          }

          /deep/ .van-cell__value{

            margin-top: 8px;

            margin-bottom: 17px;

          }

        }

        .cart-main-add{

          padding: 0;

          /deep/ .van-cell__value{

            display: flex;

            justify-content: space-between;

            align-items: flex-end;

          }

        }

        .cart-main-check{

          display: flex;

          justify-content: center;

          align-items: center;

        }

        /deep/ .van-checkbox__icon--checked .van-icon{
            background: #232773;
        }

        /deep/ .van-stepper{

          display: flex;
          
          justify-content: flex-end;

          align-items: center;

          .van-stepper--round,.van-stepper__minus{

            border: 1px solid #232773;

            color: #232773;

          }

          .van-stepper__plus{

            background: #232773;

          }

        }

      }


    }

    .out-cart-main-item{

      margin-bottom: 20px;

      box-shadow: 0px 13px 18px -4px #ccc;

    }


    /deep/ .van-submit-bar{

        bottom: 50px;

        .van-submit-bar__button--danger{

          background: #232773;

        }

        /deep/ .van-checkbox__icon--checked .van-icon{

            background: #232773;

        }

    }

    .cart-bottom-delete{

        /deep/ .van-checkbox{

            flex: 1;

        }

    }

    /deep/ .van-empty__bottom{
      
      display: flex;

      justify-content: center;

      .bottom-button{

        width: 130px;

        height: 30px;

        background: #232773;

        border: none;

      }

    }

}



</style>