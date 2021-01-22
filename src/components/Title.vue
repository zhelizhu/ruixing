<template>
  
  <div class="title">

      <div class="in-title">

        {{title}}

      </div>

  </div>

</template>

<script>
export default {

    props:{

        title:{

            type:String

        }

    }

}

</script>

<style lang="less" scoped>

.title{

    padding: 10px 8px  10px 0px;

    margin-top: 8px;

    height: 60px;

    background: #fff;

    .in-title{

        display: flex;

        justify-content: center;

        align-items: center;

        width: 30%;

        height: 100%;

        background: #232773;

        color: #fff;

        border-radius: 0 15px 0 0;

    }

}



</style>