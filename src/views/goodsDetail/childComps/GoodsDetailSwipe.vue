<template>
  <swipe :auto="0">
    <swipe-item v-for="item in bannerList" :key="item.recId">
      <img class="banner-img" v-lazy="item.imgUrl" />
    </swipe-item>
  </swipe>
</template>

<script>
  import { Swipe, SwipeItem } from 'mint-ui'

  export default {
    name: "HomeSwipe",
    components: {
      Swipe,
      SwipeItem
    },
    props: {
      bannerList: {
        type: Array,
        default: () => {
          return [];
        }
      }
    }
  };
</script>

<style scoped>
  @import "~assets/css/swiper.css";

  .banner-img{
    width: 100%;
    height: auto;
  }
  .mint-swipe {
    height: 375px;
  }
</style>