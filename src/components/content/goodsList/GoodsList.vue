<template>
  <div class="goods-list">
    <ul class="hot-goods-list">
      <li class="hot-goods-item" v-for="item in goodsList" :key="item.goodsNo" @click="toGoodsDetail(item.goodsNo)">
        <img class="hot-goods-img" v-lazy="item.imgUrl" @load="loadImage" alt="">
        <div class="hot-goods-delivery-type">{{item.deliveryType | deliveryTypeFilter}}</div>
        <div class="hot-goods-title text-overflow2">{{item.goodsName}}</div>
        <div class="hot-goods-price">
          <span class="hot-goods-mall-price">￥{{item.mallPrice}}</span>
          <span class="hot-goods-market-price">￥{{item.marketPrice}}</span>
        </div>
        <div class="no-goods" v-if="item.realStock <= 0">已抢光</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'GoodsList',
    props: {
      goodsList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        loadTimes: 0
      }
    },
    filters: {
      deliveryTypeFilter(value) {
        switch (value) {
          case 1:
            return '保税区邮'
            break;
          case 2:
            return '香港直邮'
            break;
          case 4:
            return '海外直邮'
            break;
          case 5:
            return '国内发货'
            break;
          default:
            break;
        }
      }
    },
    methods: {
      loadImage() {
        this.loadTimes += 1;
        if (this.goodsList.length === this.loadTimes) {
          this.$bus.$emit('loadImage')
        }
      },
      toGoodsDetail(goodsNo) {
        this.$router.push('/goodsDetail/' + goodsNo)
      }
    }
  }
</script>

<style lang="less" scoped>
  .goods-list{
    background-color: #fff;
    .hot-goods-list{
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      box-shadow: 0 0 2px #ddd;
      .hot-goods-item{
        position: relative;
        width: 50%;
        height: 260px;
        border-bottom: 1px solid #eee;
        &:nth-of-type(2n+1) {
          border-right: 1px solid #eee;
        }
        .no-goods{
          position: absolute;
          z-index: 1;
          left: 50%;
          top: 30%;
          transform: translate(-50%, 0);
          width: 56px;
          height: 56px;
          line-height: 56px;
          background-color: #999;
          color: #fff;
          font-size: 14px;
          text-align: center;
          border-radius: 50%;
          opacity: .8;
        }
        .hot-goods-img{
          width: 155px;
          height: 155px;
          margin: 8px auto;
          display: block;
        }
        .hot-goods-delivery-type{
          padding: 0 10px;
          margin-bottom: 7px;
          font-size: 12px;
          color: #808080;
        }
        .hot-goods-title{
          height: 32px;
          font-size: 14px;
          color: #4d4d4d;
          padding: 0 10px;
        }
        .hot-goods-price{
          padding: 6px 10px 0;
          .hot-goods-mall-price{
            font-size: 16px;
            color: #f34f34;
            font-weight: bold;
            margin-right: 6px;
          }
          .hot-goods-market-price{
            font-size: 14px;
            color: #b6bbc1;
            text-decoration: line-through;
          }
        }
      }
    }
  }
</style>
