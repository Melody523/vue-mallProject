<template>
  <div class="message-center">
    <main-nav-bar title="消息中心" />
    <message-content :newNoticeObj="newNoticeObj" />
  </div>
</template>

<script>
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'

  import MessageContent from './childComps/MessageContent'

  import { newNotice } from 'network/message'

  export default {
    name: 'MessageCenter',
    components: {
      MainNavBar,
      MessageContent
    },
    data() {
      return {
        newNoticeObj: {}
      }
    },
    created() {
      this.getNewNotice()
    },
    methods: {
      getNewNotice() {
        newNotice().then(res => {
          console.log(res)
          this.newNoticeObj = res.result
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .message-center{
    background-color: #f8f9fc;
    height: 100vh;
    position: relative;
    z-index: 2;
  }
</style>
