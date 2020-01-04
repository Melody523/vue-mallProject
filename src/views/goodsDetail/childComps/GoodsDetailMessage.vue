<template>
  <div class="goods-detail-message">
    <div class="goods-detail-message-header">商品图文说明:</div>
    <div class="goods-detail-message-content">
      <img class="goods-detail-img" v-for="item in goodsDetailList" v-lazy="item.imgUrl" :key="item.recId" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsDetailMessage',
    props: {
      goodsDetailList: Array,
      default() {
        return []
      }
    }
  }
</script>

<style lang="less" scoped>
  .goods-detail-message{
    background-color: #fff;
    width: 100%;
    .goods-detail-message-header{
      height: 44px;
      line-height: 44px;
      padding-left: 20px;
      color: #000;
    }
    .goods-detail-message-content{
      width: 100%;
      .goods-detail-img{
        width: 100%;
        height: auto;
        display: block;
      }
    }
    
  }
</style>
