<template>
  <div class="search-nav-bar">
    <nav-bar>
      <div slot="left" class="left" @click="goBack">
        <img class="back-icon" src="~assets/img/common/left.svg" alt="">
      </div>
      <div slot="center" class="center">
        <input class="search-input" type="text" :value="textSearch.linkContent" @input="searchInput" >
        <span class="icon" v-show="hasInput" @click="clearInput">&times;</span>
      </div>
      <div slot="right" class="right">
        <img class="right-icon" src="~assets/img/common/search.svg" alt="" @click="toGoodsListPage" >
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'SearchNavBar',
    components: {
      NavBar
    },
    props: {
      textSearch: {
        type: Object,
        default() {
          return {}
        }
      },
      hasInput: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      searchInput(e) {
        this.$emit('searchInput', e.target.value)
      },
      toGoodsListPage() {
        this.$emit('toGoodsListPage', this.textSearch.linkContent)
      },
      clearInput() {
        this.$emit('clearInput')
      }
    }
  }
</script>

<style lang="less" scoped>
  .search-nav-bar{
    box-shadow: 0 0 2px #ddd;
    .left{
      width: 50px;
    }
    .back-icon{
      display: block;
      margin: 0 auto;
      width: 30px;
      height: 30px;
    }
    .center{
      position: relative;
    }
    .search-input{
      height: 30px;
      width: 100%;
      border-radius: 5px;
      background-color: #f4f4f4;
      border: 1px solid #eee;
      position: absolute;
      left: 52%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding:0 25px 0 14px;
      font-size: 14px;
    }
    .icon{
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translate(0, -50%);
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-color: #ddd;
      color: #fff;
      text-align: center;
      line-height: 18px;
      font-size: 16px;
    }
    .right{
      width: 50px;
      .right-icon{
        display: block;
        margin: 0 auto;
        width: 20px;
        height: 20px;
      }
    }
  }
</style>
