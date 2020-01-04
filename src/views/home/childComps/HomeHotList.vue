<template>
  <div class="home-hot-list">
    <div class="home-hot-list-title"></div>
    <goods-list :goodsList="hotList" />
  </div>
</template>

<script>
  import GoodsList from 'components/content/goodsList/GoodsList'

  export default {
    name: 'HomeHotList',
    props: {
      hotList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsList
    }
  }
</script>

<style lang="less" scoped>
  .home-hot-list{
    .home-hot-list-title{
      height: 40px;
      background: #fff url(http://www.weinihaigou.com/m-images/icon4.png) no-repeat 103px -108px;
      background-size: 75%;
    }
    
  }
</style>
