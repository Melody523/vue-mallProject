<template>
  <div class="collection-list-container">
    <ul class="collection-list">
      <li class="collection-item" v-for="item in collectList" :key="item.goodsId" @click="toGoodsDetailPage(item.goodsNo)">
        <img class="goods-img" v-lazy="item.imgUrl2" alt="">
        <div class="goods-desc">
          <p class="title text-overflow2">{{item.goodsName2}}</p>
          <p class="price">￥{{item.skuPrice.toFixed(2)}}</p>
        </div>
        <img class="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'CollectionList',
    props: {
      collectList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      toGoodsDetailPage(goodsNo) {
        this.$router.push('/goodsDetail/' + goodsNo)
      }
    }
  }
</script>
  
<style lang="less" scoped>
  .collection-list-container{
    .collection-list{
      .collection-item{
        margin-top: 10px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 14px;
        .goods-img{
          width: 58px;
          height: 58px;
        }
        .goods-desc{
          font-size: 14px;
          color: #000;
          padding: 4px 10px;
          width: 255px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 60px;
        }
        .icon{
          width: 6px;
          height: 10px;
        }
      }
    }
  }
</style>