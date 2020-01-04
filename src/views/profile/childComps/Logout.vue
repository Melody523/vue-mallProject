<template>
  <div class="logout-btn" @click="logout">
    退出登录
  </div>
</template>

<script>
  export default {
    name: 'Logout',
    methods: {
      logout() {
        this.$emit('logout')
      }
    }
  }
</script>

<style lang="less" scoped>
  .logout-btn{
    background-color: #fff;
    height: 44px;
    line-height: 44px;
    width: 90%;
    text-align: center;
    margin: 20px auto 10px;
    font-size: 16px;
    color: #000;
    border: 1px solid #eee;
    border-radius: 10px;
  }
</style>
