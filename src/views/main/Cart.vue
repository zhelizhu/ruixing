<template>
  <div class="cart">

    <van-nav-bar

      class="product-detail-nav-bar"


      title="购物车"

      left-text="返回"

      left-arrow
      
      @click-left="onClickLeft"

      :right-text="isEdit? '编辑':'完成'"

      @click-right="onClickRight"

    />

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
        >

        <van-swipe-cell class="out-cart-main-item" v-for="(item,index) in cartProductList" :key="index">

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

                  <van-button square text="删除" type="danger" class="delete-button" />

             </template>

        </van-swipe-cell>

        </van-list>

      </div>

    </div>

    <van-submit-bar v-show="isEdit" class="cart-bottom" :price="0" button-text="提交订单">
       <van-checkbox v-model="checked" @click="allSelect">全选</van-checkbox>
    </van-submit-bar>

    <van-submit-bar v-show="!isEdit" class="cart-bottom cart-bottom-delete" button-text="删除">
       <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>

  </div>

</template>

<script>
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

      finished: false

    }

  },

  methods: {

    onClickLeft() {

      this.$router.push("/");

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

          console.log(res);

           if(res.data.code === 700) {

               this.$router.push('/login')

               return
           
           }

           if(res.data.code === 6000){

             this.$toast({

               message:'修改成功'

             })

           }

       })

    },

    allSelect() {

      this.cartProductList.forEach(element => {

        element.isCheck=this.checked

      })

    },

    simpleSelect() {

      for (let i = 0; i < this.cartProductList.length; i++) {

        const element = this.cartProductList[i];

        console.log(element);

        if (element.isCheck) {

          this.checked=false

          return
          
        }

        this.checked=true
        
      }

    }

  },

  created() {

    this.getCartData()

  }
  
};

</script>

<style lang="less" scoped>

.cart{

    height: 100vh;

    background: #f7f7f7;

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

}


</style>