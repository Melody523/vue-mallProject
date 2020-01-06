<template>
  <div class="total-count">
    <div class="all-check">
      <img class="checkbox" @click="clickAllCheck()" :src="checkAll?require('assets/img/cart/choose_active.svg'):require('assets/img/cart/choose.svg')" alt="">
      <span class="title">全选</span>
    </div>
    <div class="total-content">
      <p><span class="title_1">合计<span class="title_2">(含税)</span>:</span><span class="price">￥{{(selectedCal.taxMoney + selectedCal.goodsMoney).toFixed(2)}}</span></p>
      <p class="title_2"><span>运费:￥{{selectedFreightMoney.toFixed(2)}}</span><span>预计税费:￥{{selectedCal.taxMoney.toFixed(2)}}</span></p>
    </div>
    <div class="pay-btn" @click="toSurePay">去结算</div>
  </div>
</template>

<script>
  export default {
    name: 'TotalCount',
    props: {
      checkAll: {
        type: Boolean,
        default: false
      },
      selectedCal: {
        type: Object,
        default() {
          return {}
        }
      },
      selectedFreightMoney: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        
      }
    },
    methods: {
      clickAllCheck() {
        this.$emit('clickAllCheck')
      },
      toSurePay() {
        this.$emit('toSurePay')
      }
    }
  }
</script>

<style lang="less" scoped>
  .total-count{
    position: fixed;
    background-color: #fff;
    bottom: 49px;
    left: 0;
    height: 50px;
    z-index: 1;
    display: flex;
    align-items: center;
    padding-left: 15px;
    width: 100%;
    border-top: 1px solid #eee;
    .all-check{
      width: 60px;
      .checkbox{
        width: 20px;
        height: 20px;
        border-radius: 20px;
        vertical-align: middle;
      }
      .title{
        font-size: 15px;
        color: #000;
      }
    }
    .total-content{
      flex: 1;
      text-align: right;
      .title_1{
        font-size: 15px;
        color: #000;
      }
      .title_2{
        font-size: 12px;
        color: #c3c3c3;
        span{
          margin-left: 10px;
          &:last-of-type{
            margin-right: 8px;
          }
        }
      }
      .price{
        font-size: 14px;
        color: #9f2e33;
        margin-right: 8px;
      }
    }
    .pay-btn{
      width: 100px;
      background-color: #9f2e33;
      color: #fff;
      font-size: 18px;
      line-height: 50px;
      text-align: center;
    }
  }
</style>
