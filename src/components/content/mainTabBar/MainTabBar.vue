<template>
  <div class="main-tab-bar">
    <tab-bar>
      <tab-bar-item v-for="item in tabBarList" :key="item.title" :path="item.path">
        <img class="tab-bar-icon" slot="tab-bar-icon" :src="item.icon" alt="">
        <img class="tab-bar-icon" slot="tab-bar-icon-active" :src="item.active" alt="">
        <div class="tab-bar-title" slot="tab-bar-title">{{item.title}}</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'
  export default {
    name: 'MainTabBar',
    data() {
      return {
        tabBarList: [
          {
            icon: require('assets/img/common/home.svg'),
            active: require('assets/img/common/home_active.svg'),
            title: '首页',
            path: '/home'
          },
          {
            icon: require('assets/img/common/category.svg'),
            active: require('assets/img/common/category_active.svg'),
            title: '分类',
            path: '/category'
          },
          {
            icon: require('assets/img/common/cart.svg'),
            active: require('assets/img/common/cart_active.svg'),
            title: '购物车',
            path: '/cart'
          },
          {
            icon: require('assets/img/common/profile.svg'),
            active: require('assets/img/common/profile_active.svg'),
            title: '我的',
            path: '/profile'
          }
        ]
      }
    },
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style lang="less" scoped>
  .main-tab-bar{
    width: 100%;
    color: #a9a9a9;
    height: 49px;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    box-shadow: 0 0 2px #ddd;
    background-color: #fff;
    .tab-bar-list{
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      .tab-bar-item{
        flex: 1;
        text-align: center;
        .tab-bar-icon{
          width: 22px;
          height: 22px;
          margin-top: 3px;
        }
        .tab-bar-title{
          font-size: 13px;
          line-height: 13px;
        }
      }
    }
  }
</style>
