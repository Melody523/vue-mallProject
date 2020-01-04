<template>
  <div class="theme-nav-bar">
    <nav-bar>
      <div slot="left" class="left" @click="goBack">
        <img class="back-icon" src="~assets/img/common/left.svg" alt="">
      </div>
      <div slot="center" class="title">
        {{themeMessage.title}}
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'ThemeNavBar',
    components: {
      NavBar
    },
    props: {
      themeMessage: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .theme-nav-bar{
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
  }
</style>
