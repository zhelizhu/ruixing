<template>

<div class="blue-top-card">

    <div class="blue-top-card-header">

    </div>

    <div class="blue-top-card-body">

        <div class="blue-top-card-body-in">

            <slot></slot>

        </div>

    </div>

</div>
  
</template>

<script>

export default {

}

</script>

<style lang="less" scoped>

.blue-top-card-header{

    height: 100px;

    background: #232773;

}

.blue-top-card-body{

    display: flex;

    justify-content: center;

    .blue-top-card-body-in{

        transform: translateY(-30px);

        width: 95%;

        height: 80vh;

        overflow: scroll;

        background: #fff;

        border-radius: 15px;

        box-shadow: 0px 13px 18px -4px #ccc;

    }


}




</style>