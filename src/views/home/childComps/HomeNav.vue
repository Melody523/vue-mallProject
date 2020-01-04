<template>
  <div class="home-nav">
    <ul class="home-nav-list">
      <li class="home-nav-item" v-for="item in navList" :key="item.img" @click="toPage(item.path)">
        <img class="home-nav-icon" v-lazy="item.img" alt="">
        <div class="home-nav-title">{{item.title}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HomeNav',
    data() {
      return {
        navList: [
          {
            img: 'http://www.weinihaigou.com/m-images/nav2.png',
            title: '国家馆',
            path: '/country'
          },
          {
            img: 'http://www.weinihaigou.com/m-images/nav3.png',
            title: '品牌街',
            path: '/brandSearch'
          },
          {
            img: 'http://www.weinihaigou.com/m-images/new.png',
            title: '新品',
            path: '/newGoods'
          },
          {
            img: 'http://www.weinihaigou.com/m-images/hot.png',
            title: '热卖',
            path: '/theme/317'
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
  .home-nav{
    height: 100px;
    box-shadow: 0 0 2px #ddd;
    .home-nav-list{
      display: flex;
      align-items: center;
      list-style: none;
      height: 100px;
      .home-nav-item{
        flex: 1;
        text-align: center;
        .home-nav-icon{
          width: 50px;
          height: 50px;
        }
        .home-nav-title{
          font-size: 13px;
          color: var(--color-text);
          margin-top: 5px;
        }
      }
    }
  }
</style>
