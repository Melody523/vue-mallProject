<template>
  <div class="notice" @click="toPublicPage">
    <img class="icon" src="~assets/img/common/music.svg" alt="">
    <marquee v-if="noticeList.length"  behavior="scroll" direction="up" scrollamount="1" scrolldelay="0" loop="-1">
      <p class="text-overflow1" v-for="item in noticeList" :key="item.id">{{item.title}}</p>
    </marquee>
  </div>
</template>

<script>
  export default {
    name: 'Notice',
    props: {
      noticeList: {
        type: Array,
        default() {
          return []
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
  .notice{
    height: 20px;
    overflow: hidden;
    display: flex;
    background-color: #fff;
    .icon{
      width: 20px;
      height: 20px;
      margin: 0 10px;
    }
    marquee{
      flex: 1;
      height: 20px;
    }
    p{
      font-size: 12px;
      color: #4d4d4d;
      padding: 4px 0;
    }
  }
</style>
