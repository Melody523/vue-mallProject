<template>
  <div class="theme-goods-list">
    <div class="img-box">
      <img class="theme-img" v-lazy="themeImg" alt="">
    </div>
    <goods-list :goodsList="goodsList" />
  </div>
</template>

<script>
  import GoodsList from 'components/content/goodsList/GoodsList'

  export default {
    name: 'ThemeGoodsList',
    props: {
      themeImg: {
        type: String,
        default: ''
      },
      goodsList: {
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
  .theme-goods-list{
    width: 100%;
    .img-box{
      width: 100%;
      max-height: 175px;
      overflow: hidden;
    }
    .theme-img{
      width: 100%;
      height: auto;
    }
  }
</style>