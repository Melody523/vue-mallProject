<template>
  <div class="goods-list">
    <ul class="shop-list">
      <li class="shop-item" v-for="item in shopList" :key="item.skuId">
        <img class="goods-img" v-lazy="item.imgUrl" alt="">
        <div class="goods-message">
          <p class="title">{{item.goodsName2}}</p>
          <p class="sku-name">规格:{{item.skuName}}</p>
          <p class="sku-price">￥{{item.skuPrice.toFixed(2)}}</p>
        </div>
        <div class="sku-num">×{{item.num}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'GoodsList',
    props: {
      shopList: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .goods-list{
    margin-bottom: 10px;
    .shop-list{
      border-top: 1px solid #eee;
      .shop-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        padding: 0 19px;
        height: 82px;
        border-bottom: 1px solid #eee;
        .goods-img{
          width: 59px;
          height: 59px;
        }
        .goods-message{
          width: 230px;
          .title{
            font-size: 14px;
            color: #000;
            height: 38px;
          }
          .sku-name{
            font-size: 12px;
            color: #999;
            margin-bottom: 6px;
          }
          .sku-price{
            font-size: 14px;
            color: #f34f34;
          }
        }
        .sku-num{
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
</style>
