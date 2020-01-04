<template>
  <swipe>
    <swipe-item v-for="item in bannerList" :key="item.url">
      <img class="banner-img" :src="item.url2" :show-indicators="true" @click="toThemePage(item.id)" />
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
    },
    methods: {
      toThemePage(id) {
        this.$router.push('/theme/' + id)
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
    height: 225px;
  }
</style>