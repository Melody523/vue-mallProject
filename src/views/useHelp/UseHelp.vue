<template>
  <div class="use-help" v-if="useHelpList.length">
    <main-nav-bar title="使用帮助" />
    <div class="use-help-content">
      <ul class="use-help-list">
        <li class="use-help-item" v-for="(item, index) in useHelpList" :key="index" @click="toPage(item.path)">
          <span class="title">{{item.title}}</span>
          <img class="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'

  export default {
    name: 'UseHelp',
    components: {
      MainNavBar
    },
    data() {
      return {
        useHelpList: [
          {
            title: '跨境介绍',
            path: '/intro'
          },
          {
            title: '常见问题',
            path: '/normalProblem'
          },
          {
            title: '优惠券说明',
            path: '/couponintro'
          },
          {
            title: '售后说明',
            path: '/server'
          },
        ]
      }
    },
    methods: {
      toPage(path) {
        this.$router.push('/intro' + path)
      }
    }
  }
</script>

<style lang="less" scoped>
  .use-help{
    background-color: #f8f9fc;
    height: 100vh;
    position: relative;
    z-index: 2;
    .use-help-content{
      overflow-y: hidden;
      position: absolute;
      top: 44px;
      bottom: 0;
      left: 0;
      right: 0;
      .use-help-list{
        margin: 13px 19px;
        padding: 0 13px;
        font-size: 16px;
        color: #333;
        background-color: #fff;
        .use-help-item{
          height: 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eee;
          &:last-of-type{
            border-bottom: 0 none;
          }
          .title{

          }
          .icon{
            width: 6px;
            height: 10px;
          }
        }
      }
    }
  }
</style>
