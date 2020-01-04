<template>
  <div class="home-nav-bar">
    <nav-bar>
      <div slot="center" class="center" @click="toSearchPage">
        <img class="search-icon" src="~assets/img/common/search.svg" alt="">
        <input class="search-input" type="text" :placeholder="hotSearch" disabled>
      </div>
      <div slot="right" class="right">
        <img class="message-icon" @click="toMessageCenterPage" src="~assets/img/common/message.svg" alt="">
      </div>
    </nav-bar>
  </div>
</template>

<script>

  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'HomeNavBar',
    components: {
      NavBar
    },
    props: {
      hotSearch: {
        type: String,
        default: ''
      }
    },
    methods: {
      toSearchPage() {
        this.$router.push('/search')
      },
      toMessageCenterPage() {
        this.$router.push('/messageCenter')
      }
    }
  }
</script>

<style lang="less" scoped>
  .home-nav-bar{
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 1;
    .center{
      position: relative;
      .search-icon{
        width: 25px;
        height: 25px;
        position: absolute;
        left: 4%;
        top: 50%;
        transform: translate(0, -50%);
        z-index: 2;
      }
      .search-input{
        height: 30px;
        width: 100%;
        border-radius: 30px;
        border: 0 none;
        position: absolute;
        left: 52%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        padding-left: 35px;
      }
    }
    .right{
      .message-icon{
        width: 30px;
        height: 30px;
        text-align: center;
        margin-top: 2px;
      }
    }
  }
</style>
