<template>
  <div class="history-search">
    <div class="history-search-header">
      <div class="title">搜索记录</div>
      <div class="clear-btn" @click="clearHistoryList">清空记录</div>
    </div>
    <ul class="history-search-list">
      <li class="history-search-item" v-for="(item, index) in historySearchList" :key="index" @click="toGoodsListPage(item)">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HistorySearch',
    props: {
      historySearchList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      clearHistoryList() {
        this.$emit('clearHistoryList')
      },
      toGoodsListPage(keyword) {
        this.$emit('toGoodsListPage', keyword)
      }
    }
  }
</script>

<style lang="less" scoped>
  .history-search{
    background-color: #fff;
    .history-search-header{
      height: 44px;
      font-size: 14px;
      color: #000;
      display: flex;
      justify-content: space-between;
      padding: 0 14px;
      align-items: center;
      border-bottom: 1px solid #ededed;
      .title{
        flex: 1;
      }
      .clear-btn{
        font-size: 13px;
        width: 70px;
        height: 24px;
        line-height: 22px;
        text-align: center;
        color: #b3b3b3;
        border: 1px solid #b3b3b3;
        border-radius: 2px;
      }
    }
    .history-search-list{
      .history-search-item{
        height: 34px;
        line-height: 34px;
        color: #3b3b3b;
        font-size: 14px;
        border-bottom: 1px solid #ededed;
        padding: 0 14px;
      }
    }
  }
</style>
