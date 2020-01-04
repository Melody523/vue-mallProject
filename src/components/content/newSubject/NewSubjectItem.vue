<template>
  <div class="goods-list-container" ref="listWrapper">
    <div class="goods-list-content">
      <ul class="goods-list">
        <li class="goods-item" v-for="goods in newSubjectItem.goodsList" :key="goods.goodsNo" @click="toGoodsDeatil(goods.goodsNo)">
          <img class="goods-img" :src="goods.imgUrl" alt="">
          <div class="goods-title text-overflow2">{{goods.goodsName}}</div>
          <div class="goods-price">￥{{goods.showPrice}}</div>
        </li> 
        <li class="get-more-container" @click="toThemePage">
          <img class="get-more-icon" src="~assets/img/common/more.svg" alt="">
          <div class="get-more">查看更多</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'NewSubjectItem',
    props: {
      newSubjectItem: {
        type: Object,
        default() {
          return {}
        }
      },
      id: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        horizontalScroll: null
      }
    },
    mounted() {
      this.horizontalScroll = new BScroll(this.$refs.listWrapper, {
        scrollX: true,
        eventPassthrough: 'vertical',
      })
    },
    methods: {
      toGoodsDeatil(goodsNo) {
        this.$router.push('/goodsDetail/' + goodsNo)
      },
      toThemePage() {
        this.$router.push('/theme/' + this.id)
      }
    }
  }
</script>

<style lang="less" scoped>
  .goods-list-container{
    // overflow-x: scroll;
    overflow: hidden;
    .goods-list-content{
      display: inline-block;
    }
    .goods-list{
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      .goods-item{
        width: 90px;
        height: 150px;
        margin: 0 8px;
        .goods-img{
          width: 90px;
          height: 90px;
        }
        .goods-title{
          font-size: 12px;
          color: #333;
          height: 27px;
        }
        .goods-price{
          font-size: 14px;
          color: #ef4430;
        }
      } 
    }
    .get-more-container{
      width: 50px;
      display: flex;
      align-items: center;
      .get-more-icon{
        width: 15px;
        height: 15px;
        margin-right: 10px;
      }
      .get-more{
        color: var(--color-text);
        font-size: 11px;
        width: 14px;
        word-wrap:break-word;
      }
    }
  }
</style>
