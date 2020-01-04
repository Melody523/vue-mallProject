<template>
  <div class="category-nav-bar">
    <nav-bar>
      <div slot="center" class="title">
        <img class="logo" src="http://www.weinihaigou.com/m-images/logo.png" alt="">
      </div>
      <div slot="right" class="right">
        <img class="right-icon" @click="toSearchPage" src="http://www.weinihaigou.com/m-images/header-search.png" alt="">
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
    name: 'CategoryNavBar',
    components: {
      NavBar
    },
    props: {
      cartCount: {
        type: Number,
        default: 0
      }
    },
    methods: {
      toSearchPage() {
        this.$router.replace('/search')
      },
      toCartPage() {
        this.$router.push('/cart')
      }
    }
  }
</script>

<style lang="less" scoped>
  .category-nav-bar{
    box-shadow: 0 0 2px #ddd;
    .back-icon{
      display: block;
      margin: 0 auto;
      width: 40px;
      height: 40px;
    }
    .title{
      text-align: center;
      flex: 1;
      .logo{
        width: 85px;
        height: 19px;
      }
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
