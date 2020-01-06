<template>
  <div class="main-nav-bar">
    <nav-bar>
      <div slot="left" class="left" @click="goBack">
        <img class="back-icon" src="~assets/img/common/left.svg" alt="">
      </div>
      <div slot="center" class="title">
        {{title}}
      </div>
      <div slot="right" class="exchange" @click="changeBtn">
        兑换
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'CouponNavBar',
    components: {
      NavBar
    },
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      changeBtn() {
        this.$emit('changeBtn')
      }
    }
  }
</script>

<style lang="less" scoped>
  .main-nav-bar{
    box-shadow: 0 0 2px #ddd;
    background-color: #fff;
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
    .exchange{
      font-size: 14px;
      color: #ff7979;
    }
  }
</style>
