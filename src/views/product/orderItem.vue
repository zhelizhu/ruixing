<template>

   <div class="pay-main">
              
    <van-row type="flex" class="cart-main-item">

       <van-col class="cart-main-img" span="8">

          <van-image width="100" height="100" :src="order.small_img" />

       </van-col>

       <van-col span="14">

           <van-cell class="cart-main-info" center :title="order.name" :value="order.enname" :label="order.rule" />


           <van-cell class="cart-main-add">

               <div class="price">{{order.price}}</div>

               <div class="price">{{'x'+order.count}}</div>


           </van-cell>


       </van-col>

     </van-row>
    </div>

</template>

<script>
export default {
    props:['order'],

    created() {


    }
}
</script>

<style lang="less" scoped>

    .pay-main{

        position: relative;

        padding: 10px;

        border-bottom: 1px dashed #ccc;

        &::before,&::after{
            
            position: absolute;

            bottom: -12.5px;

            content: "";

            width: 25px;
            
            height: 25px;

            border-radius: 50%;

            background: #f7f7f7;

            z-index: 2;

        }
        &::before{
            left: -12.5px;
        }
        &::after{
            right: -12.5px;
        }

        /deep/ .cart-main-info{

            .van-cell__value{

                text-align: left;

                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;

            }

        }

        .cart-main-add{
            
            /deep/ .van-cell__value {

                display: flex;

                justify-content: space-between;

                color: #999;

            }

        }

    }


</style>