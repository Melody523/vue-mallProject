<template>
  <div class="search">
    <search-nav-bar :textSearch="textSearch" @searchInput="searchInput" @toGoodsListPage="toGoodsListPage" :hasInput="hasInput" @clearInput="clearInput" />
    <div class="search-content">
      <hot-search :hotSearchList="hotSearchList" @toGoodsListPage="toGoodsListPage" />
      <history-search :historySearchList="historySearchList" @clearHistoryList="clearHistoryList" @toGoodsListPage="toGoodsListPage" />
    </div>
  </div>
</template>

<script>
  import SearchNavBar from './childComps/SearchNavBar'
  import HotSearch from './childComps/HotSearch'
  import HistorySearch from './childComps/HistorySearch'

  import { getTextSearch, getHotSearch, insertSearch } from 'network/search'

  import { setCookie, getCookie } from  'utils/cookies'

  export default {
    name: 'Search',
    components: {
      SearchNavBar,
      HotSearch,
      HistorySearch
    },
    data() {
      return {
        textSearch: {},
        hotSearchList: [],
        historySearchList: [],
        hasInput: true
      }
    },
    created() {
      this.getTextSearchList()
      this.getHotSearchList()
      this.getHistorySearchList()
    },
    methods: {
      getTextSearchList() {
        getTextSearch().then(res => {
          console.log(res)
          this.textSearch = res.list[0]
        }).catch(err => {
          console.log(err)
        })
      },
      getHotSearchList() {
        getHotSearch().then(res => {
          console.log(res)
          this.hotSearchList = res.result
        }).catch(err => {
          console.log(err)
        })
      },
      toGoodsListPage(keyword) {
        if (this.historySearchList.indexOf(keyword) != -1) {
          this.historySearchList.splice(this.historySearchList.indexOf(keyword), 1)
        }
        this.historySearchList.unshift(keyword)
        sessionStorage.setItem('HISTORY_SEARCH', this.historySearchList.join(','))
        this.$router.push('/brandGoods?name=' + keyword)
      },
      getHistorySearchList() {
        let historySearch = sessionStorage.getItem('HISTORY_SEARCH') || ''
        let list = []
        if (historySearch != '') {
          list = historySearch.split(',')
        }
        this.historySearchList = list
      },
      clearHistoryList() {
        sessionStorage.removeItem('HISTORY_SEARCH')
        this.historySearchList = []
      },
      searchInput(value) {
        this.textSearch.linkContent = value.trim()
        if(value == '') {
          this.hasInput = false
        } else {
          this.hasInput = true
        }
      },
      clearInput() {
        this.textSearch.linkContent = ''
        this.hasInput = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .search{
    background-color: #f8f9fc;
    height: 100vh;
    position: relative;
    .search-content{
      position: absolute;
      top: 44px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      background-color: #f8f9fc;
    }
  }
</style>
