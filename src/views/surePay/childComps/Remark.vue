<template>
  <div class="remark">
    <p class="title">留言备注:</p>
    <textarea class="remark-input" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
  export default {
    name: 'Remark'
  }
</script>

<style lang="less" scoped>
  .remark{
    padding: 19px;
    background-color: #fff;
    .title{
      color: #000;
      font-size: 14px;
      margin-bottom: 6px;
    }
    .remark-input{
      width: 100%;
      padding: 5px 10px;
      color: #000;
      font-size: 14px;
      background-color: #f0f0f0;
      border: 0 none;
      overflow-y: auto;
      height: 68px;
    }
  }
</style>