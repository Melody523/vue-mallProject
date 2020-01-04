<template>
  <div class="brand-search">
    <main-nav-bar title="品牌街" />
    <scroll class="brand-content" ref="scroll" :probeType="3" @scroll="scroll">
      <brand-list :queryBrand="hotBrandList" queryBrandTitle="热门品牌" />
      <brand-list v-for="(list, title) in brandMap" :queryBrand="list" :queryBrandTitle="title" :key="title" :ref="title" @imageLoad="imageLoad" />
    </scroll>
    <back-top v-show="showBackTop" @click.native="backTop" />
  </div>
</template>

<script>
  import { queryBrandList } from "network/brand"

  import backtopMixin from 'mixins/backtopMixin'

  import MainNavBar from 'components/content/mainNavBar/MainNavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import BrandList from './childComps/BrandList'

  export default {
    name: 'BrandSearch',
    data() {
      return {
        brandMap: [],
        hotBrandList: []
      }
    },
    mixins: [backtopMixin],
    components: {
      MainNavBar,
      Scroll,
      BrandList
    },
    created() {
      this.getQueryBrandList()
      // this.$nextTick(() => {
      //   console.log(this.$refs['A']);
      // });
    },
    methods: {
      getQueryBrandList() {
        queryBrandList().then(res => {
          this.brandMap = res.result.brandMap
          this.hotBrandList = res.result.hotBrandList
        })
      },
      imageLoad() {
        // console.log(this.$refs)
      }
    }
  }
</script>

<style lang="less" scoped>
  .brand-search{
    height: 100vh;
    position: relative;
    z-index: 2;
  }
  .brand-content{
    overflow-y: hidden;
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
