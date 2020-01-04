<template>
  <div class="new-goods">
    <goods-list-nav-bar :title="title" :showSearch="showSearch" />
    <sort-nav @sortGoodsList="sortGoodsList" />
    <scroll class="new-goods-content" ref="scroll" :probeType="3" @scroll="scroll" :pullUpLoad="true" @pullingUp="pullingUp">
      <img class="no-data-img" v-if="!hasData" src="http://www.weinihaigou.com/m-images/com-no-num.png" alt="">
      <goods-list v-else :goodsList="goodsList" />
      <page-end v-show="!hasNextPage && hasData" />
    </scroll>
    <back-top v-show="showBackTop" @click.native="backTop" />
    <transition appear name="slide-fade">
      <sort-group v-show="isShow" :brandList="brandList" :countryList="countryList" :typeList="typeList" @sortConfirm="sortConfirm" @hideSortGroup="hideSortGroup" />
    </transition>
  </div>
</template>

<script>
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'
  import SortNav from 'components/content/sortNav/SortNav'
  import GoodsList from 'components/content/goodsList/GoodsList'
  import PageEnd from 'components/content/pageEnd/PageEnd'
  import Scroll from 'components/common/scroll/Scroll'

  import SortGroup from './childComps/SortGroup'
  import GoodsListNavBar from './childComps/GoodsListNavBar'

  import { searchGoodsList, getSolrGroup } from 'network/theme'

  import backtopMixin from 'mixins/backtopMixin'

  export default {
    name: 'BrandGoods',
    components: {
      SortNav,
      GoodsList,
      PageEnd,
      Scroll,
      GoodsListNavBar,
      SortGroup
    },
    mixins: [backtopMixin],
    data() {
      return {
        title: null,
        goodsList: [],
        sortData: {
          brandId: '',
          pageNum: 1,
          pageSize: 20,
          sort: '',
          order: null
        },
        hasNextPage: true,
        brandList: [],
        countryList: [],
        typeList: [],
        isShow: false,
        hasData: true,
        showSearch: false
      }
    },
    computed: {
    },
    created() {
      console.log(this.$route.query.hasOwnProperty('name'))
      this.showSearch = this.$route.query.hasOwnProperty('name')
      this.sortData = Object.assign(this.sortData, this.$route.query)
      this.title = this.$route.query.title || this.$route.query.name
      this.getSearchGoodsList(this.sortData)
      this.getSolrGroupList(this.sortData)
    },
    methods: {
      getSearchGoodsList(data) {
        searchGoodsList(data).then(res =>　{
          this.hasNextPage = res.result.hasNextPage
          this.hasData = true
          this.goodsList.push(...res.result.list)
          this.$refs.scroll.refresh()
          this.$refs.scroll.finishPullUp()
          console.log(res)
        }).catch(err => {
          this.hasNextPage = false
          if (this.goodsList.length == 0) {
            this.hasData = false
          }
        })
      },
      getSolrGroupList(params) {
        getSolrGroup(params).then(res =>　{
          this.brandList = res.result.groupList1
          this.countryList = res.result.groupList2
          this.typeList = res.result.groupList3
        })
      },
      pullingUp() {
        if (this.hasNextPage) {
          this.sortData.pageNum += 1
          this.getSearchGoodsList(this.sortData)
        }
      },
      sortGoodsList(sortList) {
        if (sortList.sort != 'sx') {
          this.sortData.order = sortList.order
          this.sortData.sort = sortList.sort
          this.sortData.pageNum = 1
          this.goodsList = []
          this.getSearchGoodsList(this.sortData)
        } else {
          this.isShow = true
        }
      },
      sortConfirm(value) {
        this.goodsList = []
        this.sortData.pageNum = 1
        let newSortData = Object.assign(this.sortData, value)
        this.sortData = newSortData
        console.log(newSortData)
        this.getSearchGoodsList(this.sortData)
        this.isShow = false
      },
      hideSortGroup() {
        this.isShow = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .new-goods{
    position: relative;
    height: 100vh;
  }
  .new-goods-content{
    overflow-y: hidden;
    position: absolute;
    top: 90px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  /* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100%);
}
.no-data-img{
  margin: 100px auto;
  display: block;
  width: 169px;
  height: auto;
}
</style>
