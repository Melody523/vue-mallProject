<template>
  <div class="theme">
    <main-nav-bar :title="themeMessage.title" />
    <scroll class="theme-content" ref="scroll" :probeType="3" @scroll="scroll" :pullUpLoad="true" @pullingUp="pullingUp">
      <theme-goods-list :goodsList="goodsList" :themeImg="themeMessage.adImgUrl" />
      <page-end v-show="!hasNextPage" />
    </scroll>
    <back-top v-show="showBackTop" @click.native="backTop" />
  </div>
</template>

<script>
  import { themeBanner, searchGoods } from 'network/theme'

  import backtopMixin from 'mixins/backtopMixin'

  import ThemeGoodsList from './childComps/ThemeGoodsList'

  import Scroll from 'components/common/scroll/Scroll'
  import PageEnd from 'components/content/pageEnd/PageEnd'
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'

  export default {
    name: 'Theme',
    data() {
      return {
        id: null,
        themeMessage: {},
        goodsList: [],
        pageNum: 1,
        pageSize: 20,
        hasNextPage: null
      }
    },
    mixins: [backtopMixin],
    components: {
      Scroll,
      PageEnd,
      MainNavBar,
      ThemeGoodsList
    },
    created() {
      this.id = this.$route.params.id
      this.getThemeBanner(this.id)
      this.getSearchGoods(this.id, 1, 20)
    },
    methods: {
      getThemeBanner(id) {
        themeBanner(id).then(res => {
          console.log(res)
          this.themeMessage = res.result[0]
        })
      },
      getSearchGoods(id, pageNum, pageSize) {
        searchGoods(id, pageNum, pageSize).then(res => {
          this.hasNextPage = res.result.hasNextPage
          this.goodsList.push(...res.result.list)
          this.$refs.scroll.refresh()
          // let that = this
          // this.$bus.$on('loadImage', () => {
          //   that.$refs.scroll.refresh()
          // })
          this.$refs.scroll.finishPullUp()
          // this.goodsList = [...this.goodsList, ...res.result.list]
          console.log(res)
        })
      },
      pullingUp() {
        if (this.hasNextPage) {
          this.pageNum = this.pageNum + 1
          this.getSearchGoods(this.id, this.pageNum, this.pageSize)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .theme{
    background-color: #f8f9fc;
    height: 100vh;
    position: relative;
    z-index: 2;
  }
  .theme-content{
    // height: calc(100% - 49px);
    // overflow: hidden;
    overflow-y: hidden;
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
</style>