<template>
  <div class="back-top">
    <img class="back-top-icon" src="~assets/img/common/backTop.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'BackTop'
  }
</script>

<style lang="less" scoped>
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
    background-color: #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    z-index: 3;
    .back-top-icon{
      width: 30px;
      height: 30px;
    }
  }
</style>
