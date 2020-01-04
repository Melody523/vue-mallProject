<template>
  <div class="goods-detail-nav-bar">
    <nav-bar>
      <div slot="left" class="left" @click="goBack">
        <img class="back-icon" src="~assets/img/common/left.svg" alt="">
      </div>
      <div slot="center" class="title">
        商品详情
      </div>
      <div slot="right" class="right">
        <img class="right-icon" @click="toHomePage" src="http://www.weinihaigou.com/m-images/header-home.png" alt="">
        <div class="cart-icon" @click="toCartPage">
          <img class="right-icon" src="http://www.weinihaigou.com/m-images/header-shopping.png" alt="">
          <span class="cart-count">{{cartCount}}</span>
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'GoodsDetailNavBar',
    props: {
      cartCount: {
        type: Number,
        default: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      toHomePage() {
        this.$router.replace('/home')
      },
      toCartPage() {
        this.$router.push('/cart')
      }
    }
  }
</script>

<style lang="less" scoped>
  .goods-detail-nav-bar{
    box-shadow: 0 0 2px #ddd;
    .left{
      width: 50px;
    }
    .back-icon{
      display: block;
      margin: 0 auto;
      width: 40px;
      height: 40px;
    }
    .title{
      font-size: 18px;
      font-weight: bold;
      color: #000;
      text-align: center;
      flex: 1;
    }
    .right{
      width: 80px;
      .right-icon{
        width: 25px;
        height: 25px;
        margin-right: 10px;
      }
      .cart-icon{
        display: inline-block;
        position: relative;
        .cart-count{
          position: absolute;
          left: 40%;
          top: 44%;
          transform: translate(-50%, -50%);
          color: #9f2e33;
          font-size: 13px;
        }
      }
    }
  }
</style>
