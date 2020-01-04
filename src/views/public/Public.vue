<template>
  <div class="public">
    <main-nav-bar title="公告" />
    <scroll class="public-content" ref="scroll" :probeType="3" @scroll="scroll">
      <notice-list :noticeList="noticeList" />
    </scroll>
    <back-top v-show="showBackTop" @click.native="backTop" />
  </div>
</template>

<script>
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import { getNotice } from 'network/message'

  import NoticeList from './childComps/NoticeList'

  import backtopMixin from 'mixins/backtopMixin'

  export default {
    name: 'Public',
    components: {
      MainNavBar,
      Scroll,
      NoticeList
    },
    mixins: [backtopMixin],
    data() {
      return {
        noticeList: []
      }
    },
    created() {
      this.getNoticeList()
    },
    methods: {
      getNoticeList() {
        getNotice().then(res => {
          this.noticeList = res.result
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .public{
    background-color: #f8f9fc;
    height: 100vh;
    position: relative;
    z-index: 2;
    .public-content{
      overflow-y: hidden;
      position: absolute;
      top: 44px;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>
