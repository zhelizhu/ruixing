<template>

    <div class="product-detail">

        <van-nav-bar

            class="product-detail-nav-bar"

            title="商品详情"

            left-text="返回"

            left-arrow

            @click-left="onClickLeft"

        />

        <van-image width="100%" height="300" :src="productDetail.large_img" />

        <van-cell-group>

            <van-cell 
                class="product-info"
               :title="productDetail.name" 
               :label="productDetail.enname" 
               :value="'￥'+productDetail.price"
            />

            <van-cell class="product-type">

               <van-row class="product-type-info" v-for="(item,index) in productDetail.rulesData" :key="index">

                   <van-col class="custom-title" span="6">{{item.title}}</van-col>

                   <van-col span="18">
                       <van-tag
                          :class="{active:item.currentIndex === index}" 
                          @click ="selectProductType(item,index)"
                          type="danger" 
                          v-for="(ruleitem,index) in item.rule" 
                          :key="index"
                       >{{ruleitem.title}}</van-tag>
                    </van-col>
                 
               </van-row>

            </van-cell>


            <van-cell title="选择数量" class="select-the-number">

                <van-field name="stepper">
                    <template #input >
                      <van-stepper v-model="selectNumber" />
                    </template>
                </van-field>

            </van-cell>


            <van-cell class="produpct-desc" title="商品描述">

                  <template #title>
                    <p class="custom-title" v-for="(item,index) in productDetail.desc" :key="index">

                        {{index+1+'、'}}{{item}}

                    </p>
                  </template>

            </van-cell>

        </van-cell-group>

        <van-goods-action>

           <van-goods-action-icon icon="cart-circle-o" @click="toCartList" text="购物车" :badge="cartCount==0? '': cartCount" />

           <van-goods-action-icon icon="like" v-if="isLike" @click="disLikeProduct()" text="收藏" />
           <van-goods-action-icon icon="like-o" v-else @click="likeProduct()" text="未收藏" />

           <van-goods-action-button color="#6a91ec" type="warning" @click="addCartProduct()" text="加入购物车" />
           <van-goods-action-button color="#0c34ba" type="danger" text="立即购买" />

        </van-goods-action>

    </div>
  
</template>

<script>

import {mapState,mapMutations} from 'vuex'

export default {

    props:['pid'],


    data (){

        return{

            productDetail:{},

            isLike: false,

            selectNumber:1,

        }

    },


    computed:{

        ...mapState(['cartCount'])

    },


    methods: {

        ...mapMutations(['changeCartCount']),

        getProductDetail() {

            this.axios({

                method :'GET',

                url: '/productDetail',

                params :{

                    appkey: this.appKey,

                    pid: this.pid

                }

            })
            .then((res) => {

                let data = res.data.result[0]

                if(res.data.code === 600){

                    let rules = ['cream','tem','sugar','milk']

                    data.rulesData = []

                    rules.forEach( elememt => {


                        if(!data[elememt]){

                            return

                        }

                        let ruleText = data[elememt].split('/')

                        let currentRule = {

                            title: data[elememt + '_desc'],

                            currentIndex : 0,

                            rule: []

                        }

                        ruleText.forEach(element => {
                            
                            let obj = {

                                title: element

                            }

                            currentRule.rule.push(obj)

                        });

                        data.rulesData.push(currentRule)

                    } )

                    console.log(data);

                    data.desc = data.desc.split(/\n/)

                    this.productDetail = data

                    this.$toast({

                        message: res.data.msg,

                        duration:500

                    })

                }

            }).catch( (err) => {

                console.log(err);

            } )

        },

        // 选择规格

        selectProductType(item,index) {

            if(item.currentIndex === index) {

                return

            }

            item.currentIndex = index

        },

        // 收藏商品

        likeProduct() {

            let uesrToken = this.$cookie.get('userToken')

            if(!uesrToken) {

                this.$router.push('/login')

                return
                
            }

            this.axios({

                method:'POST',

                url: '/like',

                data: {
                    
                    appkey:this.appKey,

                    pid: this.pid,

                    tokenString : uesrToken

                }


            })
            .then((res)=>{

                if(res.data.code === 700) {

                    this.$router.push('/login')

                    return
                
                }

                if(res.data.code === 800){

                    this.$toast({

                        message:'收藏成功！'

                    })

                    this.isLike = true

                }

            })

        },

        // 取消商品收藏

        disLikeProduct() {

            this.axios({

                method: 'POST',

                url: '/notlike',

                data: {

                    appkey: this.appKey,

                    pid: this.pid,

                    tokenString: this.$cookie.get('userToken')

                }

            })
            .then((res)=>{

                if(res.data.code === 900){

                    this.isLike = false
                    
                    this.$toast({

                        message: '取消收藏成功！'

                    })

                }


            })

        },

        // 查询收藏

        getLikeProduct(){
            
            let uesrToken = this.$cookie.get('userToken')

            this.axios({

                method:'GET',

                url: '/findlike',

                params: {
                    
                    appkey:this.appKey,

                    pid: this.pid,

                    tokenString : uesrToken

                }


            })
            .then((res)=>{

                if(res.data.code === 700) {

                    this.$router.push('/login')

                    return
                
                }

                if(res.data.result.length !== 0){

                    this.isLike = true

                }

            })



        },

        
        // 加入购物车

        addCartProduct() {

            let rules = []


            this.productDetail.rulesData.forEach((element) => {


                rules.push(element.rule[element.currentIndex].title)

            })


            let uesrToken = this.$cookie.get('userToken')

            this.axios({

                method:'POST',

                url: '/addShopcart',

                data: {
                    
                    appkey:this.appKey,

                    pid: this.pid,

                    tokenString : uesrToken,

                    count: this.selectNumber,

                    rule: rules.join('/')

                }


            })
            .then((res)=>{

                console.log(res);

                if(res.data.code === 700) {

                    this.$router.push('/login')

                    return
                
                }

                if(res.data.code === 3000) {

                    if(res.data.status === 1){

                        this.changeCartCount(this.cartCount+1)

                    }

                    this.$toast({

                        message: '加入购物车成功！'

                    })

                }

            })


        },

        // 跳转购物车

        toCartList() {

            this.$router.push('/cart')

        },

        onClickLeft() {

            this.$router.push('/')

        }


    },


    created(){

        console.log(this.cartCount);

        this.getProductDetail()

        this.getLikeProduct()

    }

}
</script>

<style lang="less" scoped>

.product-detail {

    padding: 50px 0;

    display: flex;

    flex-direction: column;

    align-items: center;

    .product-detail-nav-bar{

        width: 100%;

        position: fixed;
    
        top: 0;
    
        background: #fff;
    
        z-index: 2;
    
    }

    /deep/ .van-cell-group{

        box-shadow: 0px 13px 18px -4px #ccc;

        border-radius: 10px;

        width: 95%;

        transform: translateY(-25px);

        .product-info{

            border-radius: 10px 10px 0 0;

            .van-cell__title>span{

                display: inline-block;

                padding: 15px 0;

                color: #838484;
                
                font-size: 18px;

                font-weight: 700;

            }

            .van-cell__value {

                color:  #232773;

                font-size: 20px;

                font-weight: 700;

            }

        }

        .product-type {

            padding: 15px;
            
            .product-type-info{

                padding: 15px 8px; 

            }

            .van-tag {

                width: 60px;

                height: 25px;

                border-radius: 25px;

                justify-content: center;

                background: #e8e8e8;

                color: #6b6c6e;

                margin-right: 8px;

                &.active{

                    background:#0c34ba;

                    color: #fff;

                }
                
            }

        }
        
        .select-the-number{

            padding: 25px;

            .van-cell__title{

                display: flex;

                align-items: center;

            }

            .van-stepper__minus{

                border-radius: 50%;

                margin-right: 10px;
            }

            .van-stepper__plus {

                border-radius: 50%;

                background: #0c34ba;
                
                color: #fff;

                margin-left: 10px;

            }

        }

        .product-desc {

            border-radius: 10px;

            .van-cell__label{

                margin: 0;

                height: 130px;

            }

        }
        
    }

}


</style>