<template>
  <div class="collection">
    <main-nav-bar title="我的收藏" />
    <scroll class="collection-content" ref="scroll" :probeType="3" @scroll="scroll" :pullUpLoad="true" @pullingUp="pullingUp">
      <collection-list :collectList="collectList" />
      <page-end v-show="!hasNextPage" />
    </scroll>
    <back-top v-show="showBackTop" @click.native="backTop" />
  </div>
</template>

<script>
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'
  import PageEnd from 'components/content/pageEnd/PageEnd'
  import Scroll from 'components/common/scroll/Scroll'

  import CollectionList from './childComps/CollectionList'

  import { myMoCollect } from 'network/collection'

  import backtopMixin from 'mixins/backtopMixin'

  export default {
    name: 'Collection',
    components: {
      MainNavBar,
      PageEnd,
      Scroll,
      CollectionList
    },
    mixins: [backtopMixin],
    data() {
      return {
        hasNextPage: true,
        sortData: {
          pageNum: 1,
          pageSize: 30
        },
        collectList: []
      }
    },
    created() {
      this.getMyMoCollect(this.sortData)
    },
    methods: {
      getMyMoCollect(params) {
        myMoCollect(params).then(res => {
          this.hasNextPage = res.result.hasNextPage
          this.collectList.push(...res.result.list)
          this.$refs.scroll.refresh()
          this.$refs.scroll.finishPullUp()
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      pullingUp() {
        if (this.hasNextPage) {
          this.sortData.pageNum += 1
          this.getMyMoCollect(this.sortData)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .collection{
    background-color: #f8f9fc;
    height: 100vh;
    position: relative;
    z-index: 2;
    .collection-content{
      overflow-y: hidden;
      position: absolute;
      top: 44px;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>
