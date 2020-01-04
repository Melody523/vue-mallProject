<template>
  <div class="sort-btn">
    <div class="sort-reset" @click="sortReset">重置</div>
    <div class="sort-confirm" @click="sortConfirm">确认</div>
  </div>
</template>

<script>
  export default {
    name: 'SortBtn',
    methods: {
      sortReset() {
        this.$emit('sortReset')
      },
      sortConfirm() {
        this.$emit('sortConfirm')
      }
    }
  }
</script>

<style lang="less" scoped>
  .sort-btn{
    position: fixed;
    right: 0;
    bottom: 0;
    width: inherit;
    display: flex;
    align-items: center;
    height: 44px;
    border-top: 1px solid #eee;
    .sort-reset{
      flex: 1;
      font-size: 16px;
      color: #333;
      background: #fff;
      border-right: 1px solid #eee;
      height: 44px;
      text-align: center;
      line-height: 44px;
    }
    .sort-confirm{
      flex: 1;
      font-size: 16px;
      color: #fff;
      background: #ff6a00;
      height: 44px;
      line-height: 44px;
      text-align: center;
    }
  }
</style>