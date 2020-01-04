<template>
  <div class="my-item">
    <ul class="my-list">
      <li class="my-item-content" v-for="(item, index) in myList" :key="item.img" @click="toPage(item.path)">
        <div class="left">
          <img class="icon" :src="item.img" alt="">
          <p class="title">{{item.title}}</p>
        </div>
        <div class="right">
          <span v-if="index == 0">查看全部优惠券</span>
          <span v-else-if="index == 1">{{(userMessage.realName=='' || userMessage.realName==null)?'未认证':'已认证'}}</span>
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'MyItem',
    props: {
      userMessage: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        myList: [
          {
            img: require('assets/img/profile/youhuiquan.svg'),
            title: '我的优惠券',
            path: '/coupon'
          },
          {
            img: require('assets/img/profile/shimingrenzheng.svg'),
            title: '实名认证',
            path: ''
          },
          {
            img: require('assets/img/profile/shoucang.svg'),
            title: '我的收藏',
            path: '/collection'
          },
          {
            img: require('assets/img/profile/bangzhu.svg'),
            title: '使用帮助',
            path: '/useHelp'
          },
          {
            img: require('assets/img/profile/kefu.svg'),
            title: '联系客服',
            path: ''
          }
        ]
      }
    },
    methods: {
      toPage(path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="less" scoped>
  .my-item{
    background-color: #fff;
    padding: 0 15px;
    margin-top: 10px;
    .my-list{
      color: #000;
      font-size: 14px;
      .my-item-content{
        height: 44px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
        .left{
          flex: 1;
          display: flex;
          align-items: center;
          .icon{
            width: 22px;
            height: 22px;
          }
          .title{
            display: inline-block;
            margin-left: 5px;
          }
        }
        .right{
          color: #999;
        }
      }
    }
  }
</style>
