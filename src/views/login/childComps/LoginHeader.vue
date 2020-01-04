<template>
  <div class="login-header">
    <img class="login-bg" src="http://www.weinihaigou.com/m-images/login-bg.jpg" alt="">
    <img @click="goBack" class="back-icon" src="http://www.weinihaigou.com/m-images/header-back-white.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'LoginHeader',
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .login-header{
    position: relative;
    .login-bg{
      width: 100%;
      height: auto;
    }
    .back-icon{
      width: 20px;
      height: 20px;
      position: absolute;
      left: 10px;
      top: 10px;
    }
  }
</style>