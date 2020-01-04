<template>
  <div class="goods-list-nav-bar">
    <nav-bar>
      <div slot="left" class="left" @click="goBack">
        <img class="back-icon" src="~assets/img/common/left.svg" alt="">
      </div>
      <div slot="center" class="center" @click="toSearchPage">
        <div v-if="showSearch"> 
          <img class="search-icon" src="~assets/img/common/search.svg" alt="">
          <input class="search-input" type="text" :placeholder="title" disabled>
        </div>
        <div class="title" v-else>
          {{title}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'GoodsListNavBar',
    components: {
      NavBar
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      showSearch: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      toSearchPage() {
        this.$router.push('/search')
      }
    }
  }
</script>

<style lang="less" scoped>
  .goods-list-nav-bar{
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
        background-color: #f4f4f4;
        padding-left: 35px;
      }
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
