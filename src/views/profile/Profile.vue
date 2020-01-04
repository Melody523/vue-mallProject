<template>
  <div class="profile-container">
    <profile-header :userMessage="userMessage" />
    <notice :noticeList="noticeList" />
    <order :tradeCount="tradeCount" />
    <my-item :userMessage="userMessage" />
    <logout @logout="logout" />
  </div>
</template>

<script>
  import userMixin from 'mixins/userMixin'

  import { getNotice, myTradeCount, loginOut } from 'network/profile'

  import ProfileHeader from './childComps/ProfileHeader'
  import Notice from './childComps/Notice'
  import Order from './childComps/Order'
  import MyItem from './childComps/MyItem'
  import Logout from './childComps/Logout'

  export default {
    name: 'Profile',
    mixins: [userMixin],
    data() {
      return {
        noticeList: [],
        tradeCount: {}
      }
    },
    created() {
      this.getUserMessage()
      this.getNoticeList()
      this.getMyTradeCount()
    },
    components: {
      ProfileHeader,
      Notice,
      Order,
      MyItem,
      Logout
    },
    methods: {
      getNoticeList() {
        getNotice().then(res => {
          this.noticeList = res.result
        }).catch(err => {
          console.log(err)
        })
      },
      getMyTradeCount() {
        myTradeCount().then(res => {
          this.tradeCount = res.result
        }).catch(err => {
          console.log(err)
        })
      },
      logout() {
        loginOut().then(res => {
          console.log(res)
          if (res.success) {
            this.$router.replace('/home')
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .profile-container{
    background-color: #f8f9fc;
    height: 100vh;
  }
</style>
