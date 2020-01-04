<template>
  <div class="bottom-tab-bar">
    <div class="bottom-tab-bar-left">
      <div class="bottom-tab-bar-left-item">
        <img class="icon" src="http://www.weinihaigou.com/m-images/goods-custom.png" alt="">
        <p class="title">客服</p>
      </div>
      <div class="bottom-tab-bar-left-item" @click="collectGoods">
        <img class="icon" :src="!ifCollect ? 'http://www.weinihaigou.com/m-images/goods-no-collection.png' : 'http://www.weinihaigou.com/m-images/goods-collection.png'" alt="">
        <p class="title" :class="{'acitve': ifCollect}">收藏</p>
      </div>
    </div>
    <div class="bottom-tab-bar-right" v-if="totalStock > 0">
      <div class="btn add-cart" @click="showAddCart">加入购物车</div>
      <div class="btn buy" @click="toSurePay">立即购买</div>
    </div>
    <div class="bottom-tab-bar-right" v-else>
      <div class="remind-btn" @click="clickRemind">到货提醒</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BottomTabBar',
    props: {
      ifCollect: {
        type: Boolean,
        default: false
      },
      totalStock: {
        type: Number,
        default: 1
      }
    },
    methods: {
      showAddCart() {
        this.$emit('showAddCart')
      },
      collectGoods() {
        this.$emit('collectGoods')
      },
      toSurePay() {
        this.$router.push('/surePay')
      },
      clickRemind() {
        this.$emit('clickRemind')
      }
    }
  }
</script>

<style lang="less" scoped>
  .bottom-tab-bar{
    height: 45px;
    width: 100%;
    background-color: #fff;
    z-index: 2;
    position: absolute;
    bottom: 0;
    display: flex;
    .bottom-tab-bar-left{
      width: 110px;
      display: flex;
      align-items: center;
      .bottom-tab-bar-left-item{
        flex: 1;
        border-right: 1px solid #eee;
        .icon{
          width: 24px;
          height: 21px;
          display: block;
          margin: 0 auto;
        }
        .title{
          color: #131313;
          font-size: 12px;
          text-align: center;
          margin-top: 3px;
        }
        .acitve{
          color: #9f2e33;
        }
      }
    }
    .bottom-tab-bar-right{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .btn{
        flex: 1;
        font-size: 15px;
        text-align: center;
        height: 45px;
        line-height: 45px;
      }
      .add-cart{
        background-color: #fff;
        color: #131313;
      }
      .buy{
        background-color: #9f2e33;
        color: #fff;
      }
      .remind-btn{
        margin-right: 14px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        background: #ffce0c;
        text-align: center;
        font-size: 15px;
        color: #fff;
        border-radius: 15px;
      }
    }
  }
</style>
