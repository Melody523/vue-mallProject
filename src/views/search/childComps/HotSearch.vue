<template>
  <div class="hot-search">
    <div class="hot-search-header">热门搜索</div>
    <ul class="hot-search-list">
      <li class="hot-search-item" v-for="item in hotSearchList" :key="item.id" @click="toGoodsListPage(item.linkContent)">{{item.linkContent}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HotSearch',
    props: {
      hotSearchList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      toGoodsListPage(keyWord) {
        this.$emit('toGoodsListPage', keyWord)
      }
    }
  }
</script>

<style lang="less" scoped>
  .hot-search{
    background-color: #fff;
    margin-bottom: 10px;
    padding: 14px;
    font-size: 14px;
    color: #000;
    .hot-search-header{
      line-height: 18px;
    }
    .hot-search-list{
      display: flex;
      justify-content: left;
      flex-wrap: wrap;
      .hot-search-item{
        padding: 5px 10px;
        background-color: #f1f1f1;
        color: #3b3b3b;
        border-radius: 3px;
        margin: 10px 10px 0 0;
      }
    }
  }
</style>
