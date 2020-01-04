<template>
  <div class="goods-detail-price">
    <div class="goods-detail-title">{{goodsDetailPrice.goodsName}}</div>
    <div class="goods-detail-sell-price">￥{{goodsDetailPrice.minPrice}}-{{goodsDetailPrice.maxPrice}}</div>
    <p class="goods-detail-market-price">价格: <span class="price">{{goodsDetailPrice.marketPrice}}</span></p>
    <div class="goods-detail-country" v-if="goodsDetailPrice.goodsCountry != undefined">
      <img class="goods-detail-country-icon" v-lazy="goodsDetailPrice.goodsCountry.countryImgUrl2" alt="">
      <div class="goods-detail-country-desc">
        <span>{{goodsDetailPrice.goodsCountry.countryName||''}}品牌</span>
        <span>, 预计7个工作日左右到达</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsDetailPrice',
    props: {
      goodsDetailPrice: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .goods-detail-price{
    padding: 18px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    .goods-detail-title{
      color: #4d4d4d;
      font-size: 17px;
      font-weight: bold;
    }
    .goods-detail-sell-price{
      color: #f45e48;
      font-size: 19px;
      font-weight: bold;
      margin-top: 14px;
    }
    .goods-detail-market-price{
      color: #adadad;
      font-size: 12px;
      .price{
        text-decoration: line-through;
      }
    }
    .goods-detail-country{
      margin-top: 12px;
      .goods-detail-country-icon{
        width: 18px;
        height: auto;
        vertical-align: middle;
        margin-right: 5px;
      }
      .goods-detail-country-desc{
        display: inline-block;
        color: #aeaeae;
        font-size: 12px;
      }
    }
  }
</style>