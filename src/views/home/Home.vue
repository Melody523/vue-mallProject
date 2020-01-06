<template>
  <div class="home-container">
    <scroll class="home-content" ref="scroll" :probeType="3" @scroll="scroll">
      <home-nav-bar :hotSearch="hotSearch" />
      <home-swipe :bannerList="bannerList" />
      <home-nav />
      <home-subject :subject="subject" />
      <new-subject :newSubject="newSubject" />
      <home-hot-list :hotList="hotList" />
      <page-end />
    </scroll>
    <!-- 监听一个组件的原生事件时必须给对应事件加上.native修饰符才能进行监听 -->
    <back-top v-show="showBackTop" @click.native="backTop" />
  </div>
</template>

<script>
import HomeNavBar from "./childComps/HomeNavBar"
import HomeSwipe from "./childComps/HomeSwipe"
import HomeNav from "./childComps/HomeNav"
import HomeSubject from './childComps/HomeSubject'
import HomeHotList from './childComps/HomeHotList'

import PageEnd from 'components/content/pageEnd/PageEnd'
import NewSubject from 'components/content/newSubject/NewSubject'

import Scroll from 'components/common/scroll/Scroll'

import { indexMobileTop, indexHotList } from "network/home"

import backtopMixin from 'mixins/backtopMixin'

export default {
  name: "Home",
  data() {
    return {
      bannerList: [],
      hotSearch: '',
      subject: [],
      newSubject: [],
      hotList: []
    };
  },
  mixins: [backtopMixin],
  components: {
    PageEnd,
    NewSubject,
    Scroll,
    HomeNavBar,
    HomeSwipe,
    HomeNav,
    HomeSubject,
    // HomeNewSubject,
    HomeHotList
  },
  created() {
    this.getIndexMobileTop()
    this.getIndexHotList()
  },
  activated() {

  },
  methods: {
    getIndexMobileTop() {
      indexMobileTop(this).then(res => {
        this.bannerList = res.result.banner
        this.hotSearch = res.result.hotSearch
        this.subject = res.result.subject
        this.newSubject = res.result.newSubject
      });
    },
    getIndexHotList() {
      indexHotList().then(res => {
        console.log(res)
        this.hotList = res.result
      })
    }
  }
};
</script>

<style lang="less" scoped>
  .home-container{
    height: 100vh;
    position: relative;
  }
  //必须给最外层设置高度
  .home-content{
    // height: calc(100% - 49px);
    // overflow: hidden;
    overflow-y: hidden;
    position: absolute;
    top: 0;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
