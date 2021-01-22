<template>
  <div class="product">

    <van-card
      tag="hot"
      :price="productData.price"
      :desc="productData.enname"
      :title="productData.name"
      :thumb="productData.largeImg"
    />

  </div>

</template>

<script>

export default {

    props:{

        productData:{

            type:Object,

            default(){

              return{}

            }

        }

    }

};

</script>

<style lang="less" scoped>

.product{

    color: #ccc;

    padding-top: 8px;
  
    display: flex;

    justify-content: space-around;

    .van-card{

      width: 95%;

      padding: 0px;

      border-radius: 8px;

      background: #fff;

    }

    .van-card__header{

      height: 270px;

      display: flex;

      flex-direction: column;

      align-items: center;

      border-radius: 8px;

      .van-card__thumb{

        width: 100%;

        margin: 0;

        height: 170px;

        .van-image__img{

          border-radius: 8px;

        }

        .van-tag {

          background: #232773;

        }
      }

      .van-card__content{

          width: 100%;
          
          padding: 8px 15px;

         .van-card__title{

            text-align: left;

            font-size: 18px;

            line-height: 30px;

         }

         .van-card__desc{

            font-size: 10px;

         }

         .van-card__price{

            font-size: 16px;

            color: #232773;

            font-weight: 700;

            .van-card__price-integer{

              font-size: 30px;

            }

         }

      }



    }

}



</style>