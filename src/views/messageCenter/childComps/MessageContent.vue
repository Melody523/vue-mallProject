<template>
  <div class="message-content">
    <div class="new-notice" @click="toPublicPage">
      <div class="new-notice-left">
        <div class="icon">
          <span class="dotted"></span>
        </div>
      </div>
      <div class="new-notice-center">
        <p class="title">公告</p>
        <p class="detail text-overflow1">{{newNoticeObj.title}}</p>
      </div>
      <div class="new-notice-right">
        <img class="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="">
      </div>
    </div>
    <div class="new-notice server">
      <div class="new-notice-left">
        <div class="icon server-icon">
        </div>
      </div>
      <div class="new-notice-center">
        <p class="title">客服助手</p>
        <p class="detail text-overflow1">在线客服咨询时间9:00-18:00</p>
      </div>
      <div class="new-notice-right">
        <img class="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MessageCenter',
    props: {
      newNoticeObj: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      toPublicPage() {
        this.$router.push('/public')
      }
    }
  }
</script>

<style lang="less" scoped>
  .message-content{
    margin: 12px 19px;
    padding: 12px;
    background: #fff;
    .server{
      border-top: 1px solid #ededed;
    }
    .new-notice{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      .new-notice-left{
        .icon{
          width: 48px;
          height: 48px;
          position: relative;
          background: url(http://www.weinihaigou.com/m-images/icon3.png) no-repeat 0 -200px;
          background-size: 125%;
        }
        .server-icon{
          background-position: 0 -251px;
        }
      }
      .new-notice-center{
        color: #808080;
        width: 210px;
        .title{
          font-size: 16px;
        }
        .detail{
          font-size: 15px;
        }
      }
      .new-notice-right{
        .icon{
          width: 6px;
          height: 10px;
        }
      }
    }
  }
</style>
