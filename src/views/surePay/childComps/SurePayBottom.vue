<template>
  <div class="sure-pay-bottom">
    <div class="title">共计:<span class="total-acount">￥{{amountAll.toFixed(2)}}</span></div>
    <div class="pay-btn">确认并付款</div>
  </div>
</template>

<script>
  export default {
    name: 'SurePayBottom',
    props: {
      amountAll: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang="less" scoped>
  .sure-pay-bottom{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 44px;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title{
      flex: 1;
      font-size: 15px;
      color: #000;
      text-align: right;
      padding-right: 18px;
      .total-acount{
        color: #9f2e33;
      }
    }
    .pay-btn{
      width: 115px;
      height: 44px;
      line-height: 44px;
      background: #9f2e33;
      color: #fff;
      font-size: 16px;
      text-align: center;

    }
  }
</style>
