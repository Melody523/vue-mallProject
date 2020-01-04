<template>
  <div class="order-list">
    <ul class="order-acount-list">
      <li class="order-acount-item">
        <p class="title">优惠券:</p>
        <p class="desc">可用<span class="num">{{acountObj.cList.length}}</span>张</p>
      </li>
      <li class="order-acount-item">
        <p class="title">商品金额(不含税):</p>
        <p class="acount">￥{{acountObj.amountAll.toFixed(2)}}</p>
      </li>
      <li class="order-acount-item">
        <p class="title">活动:</p>
        <p class="acount">-￥{{acountObj.discount.toFixed(2)}}</p>
      </li>
      <li class="order-acount-item">
        <p class="title">优惠券优惠:</p>
        <p class="acount">-￥{{acountObj.couDiscount.toFixed(2)}}</p>
      </li>
      <li class="order-acount-item">
        <p class="title">运费:</p>
        <p class="acount">￥{{acountObj.postAge.toFixed(2)}}</p>
      </li>
      <li class="order-acount-item">
        <p class="title">预计税费:</p>
        <p class="acount">￥{{acountObj.taxAll.toFixed(2)}}</p>
      </li>
      <li class="order-acount-item">
        <p class="title">应付总额:</p>
        <p class="acount">￥{{acountObj.totalAcount.toFixed(2)}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'OrderList',
    props: {
      acountObj: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .order-list{
    .order-acount-list{
      background-color: #fff;
      border-top: 1px solid #eee;
      .order-acount-item{
        height: 38px;
        padding: 0 19px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #1a1a1a;
        font-size: 14px;
        border-bottom: 1px solid #eee;
        .num{
          color: #9f2e33;
        }
        .acount{
          color: #f34f34;
        }
      }
    }
  }
</style>
