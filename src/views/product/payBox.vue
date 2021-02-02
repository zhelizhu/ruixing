<template>
    
    <div class="pay-box">

        <div class="pay-box-in">
       
       <slot name="pay-title">

           <div class="pay-title">
               订单信息
           </div>

       </slot>

       <slot name="pay-main">


       </slot>

       </div>

       
       <div class="pay-foot">

           <van-cell :title="`合计￥${proInfo.total}`" :label="`共计${proInfo.count}件`" :value="proInfo.date|formatDate('yyyy-MM hh:mm:ss')"></van-cell>

       </div>

    </div>

</template>

<script>


export default {

    props:{

        proInfo: {

            type: Object,

            default() {

                return{

                    count:0,

                    total:0,

                    date:''

                }

            }

        }

    },

    created(){


    }


}
</script>

<style lang="less" scoped>

.pay-box{
    
    overflow: hidden;

    margin: 8px 0;

    background: #fff;

    .pay-title{

        padding: 8px;

        color: #999;

    }
    

    .pay-foot{

        padding: 15px 0;

        /deep/ .van-cell__value{

            span{

                display: inline-block;

                text-align: left;

            }

        }

    }
}

</style>