<template>
  <div class="modify-psw-success">
    <main-nav-bar title="修改密码" />
    <div class="modify-psw-success-content">
      <p class="title">修改密码成功</p>
      <img class="icon" src="http://www.weinihaigou.com/m-images/success.png" alt="">
      <div class="return-btn" @click="toProfilePage">完成并返回</div>
    </div>
  </div>
</template>

<script>
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'

  export default {
    name: 'ModifyPswSuccess',
    components: {
      MainNavBar
    },
    methods: {
      toProfilePage() {
        this.$router.replace('/profile')
      }
    }
  }
</script>

<style lang="less" scoped>
  .modify-psw-success{
    background-color: #f8f9fc;
    height: 100vh;
    position: relative;
    z-index: 2;
    .modify-psw-success-content{
      overflow-y: hidden;
      position: absolute;
      top: 44px;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 14px;
      .title{
        color: #000;
        font-size: 17px;
        text-align: center;
        font-weight: bold;
        margin: 56px 0 36px;
      }
      .icon{
        display: block;
        width: 80px;
        height: 80px;
        margin: 0 auto;
      }
      .return-btn{
        width: 100%;
        margin-top: 30px;
        height: 50px;
        line-height: 50px;
        background-color: #9f2e33;
        text-align: center;
        border-radius: 3px;
        font-size: 17px;
        color: #fff;
      }
    }
  }
</style>