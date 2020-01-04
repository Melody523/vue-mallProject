<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>  
  </div>
</template>

<script>
  export default {
    name: 'NavBar'
  }
</script>

<style lang="less" scoped>
  .nav-bar{
    height: 44px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    .left{
      width: 80px;
    }
    .center{
      flex: 1;
    }
    .right{
      width: 80px;
      text-align: center;
    }
  }
</style>
