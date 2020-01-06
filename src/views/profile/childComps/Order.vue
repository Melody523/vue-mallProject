<template>
  <div class="order">
    <div class="order-header">
      <span class="my-order">我的订单</span>
      <span class="cheak-order" @click="toOrderListPage(0)">查看全部订单></span>
    </div>
    <ul class="order-list" v-if="Object.keys(tradeCount) != 0">
      <li class="order-item" v-for="(item, index) in orderTypeList" :key="item.img" @click="toOrderListPage(item.type)">
        <img class="icon" v-lazy="item.img" alt="">
        <p class="title">{{item.title}}</p>
        <span class="num" v-if="showCount(index) > 0">{{showCount(index)>99?'99+':showCount(index)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Order',
    props: {
      tradeCount: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        orderTypeList: [
          {
            img: 'http://www.weinihaigou.com/m-images/order-1.png',
            title: '待付款',
            count: 0,
            type: 1
          },
          {
            img: 'http://www.weinihaigou.com/m-images/order-2.png',
            title: '待发货',
            count: 0,
            type: 2
          },
          {
            img: 'http://www.weinihaigou.com/m-images/order-3.png',
            title: '待收货',
            count: 0,
            type: 3
          },
          {
            img: 'http://www.weinihaigou.com/m-images/order-4.png',
            title: '已完成',
            count: 0,
            type: 4
          },
          {
            img: 'http://www.weinihaigou.com/m-images/order-5.png',
            title: '售后',
            count: 0,
            type: -1
          },
        ]
      }
    },
    methods: {
      showCount(index) {
        switch (index) {
          case 0:
            return this.tradeCount.notPayCount
            break;
          case 1:
            return this.tradeCount.notSendCount
            break;
          case 2:
            return this.tradeCount.takeCount
            break;
          case 3:
            return this.tradeCount.finishCount
            break;
          case 4:
            return this.tradeCount.rerurnCount
            break;
          default:
            break;
        }
      },
      toOrderListPage(type) {
        if (type != -1) {
          this.$router.push('/orderList?type=' + type)
        } else {

        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .order{
    background-color: #fff;
    margin-top: 10px;
    border-top: 1px solid #eee;
    .order-header{
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 38px;
      .my-order{
        color: #000;
        font-size: 16px;
      }
      .cheak-order{
        font-size: 14px;
        color: #b5b6b6;
      }
    }
    .order-list{
      height: 65px;
      padding: 0 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      .order-item{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .icon{
          width: 28px;
          height: auto;
        }
        .title{
          color: #4d4d4d;
          font-size: 14px;
          margin-top: 5px;
        }
        .num{
          position: absolute;
          right: 5px;
          top: 0;
          display: inline-block;
          width: 25px;
          height: 15px;
          line-height: 15px;
          border-radius: 15px;
          background-color: #9f2e33;
          text-align: center;
          color: #fff;
          font-size: 12px;
        }
      }
    }
  }
</style>
