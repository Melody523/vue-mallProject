<template>
  <div class="loading" v-show="isShow">
    <img class="icon" src="http://www.weinihaigou.com/m-images/loading.gif" alt="">
  </div>
</template>

<script>
  export default {
    name: 'Loading',
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      show() {
        this.isShow = true
      },
      hide() {
        this.isShow = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .loading{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    .icon{
      width: 50px;
      height: auto;
      display: block;
    }
  }
</style>
