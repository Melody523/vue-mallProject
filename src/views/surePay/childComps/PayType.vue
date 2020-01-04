<template>
  <div class="pay-type">
    <p class="title">选择支付方式</p>
    <div class="pay-type-item">
      <img class="alipay" src="~assets/img/surePay/alipay.svg" alt="">
      <p class="pay-title">支付宝</p>
      <img class="selected" :src="require('assets/img/cart/choose_active.svg')" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PayType'
  }
</script>

<style lang="less" scoped>
  .pay-type{
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    margin-bottom: 10px;
    .title{
      height: 39px;
      line-height: 39px;
      color: #1a1a1a;
      font-size: 14px;
      padding: 0 19px;
    }
    .pay-type-item{
      height: 47px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 19px;
      border-top: 1px solid #eee;
      .alipay{
        width: 40px;
        height: 40px;
      }
      .pay-title{
        flex: 1;
        color: #1a1a1a;
        font-size: 14px;
        padding-left: 10px;
      }
      .selected{
        width: 20px;
        height: 20px;
      }
    }
  }
</style>