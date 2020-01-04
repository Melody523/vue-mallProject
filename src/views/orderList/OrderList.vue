<template>
  <div class="order-list">
    <main-nav-bar title="我的订单" />
    <order-nav-bar :orderNavList="orderNavList" :currentOrderType="currentOrderType" @changeOrderType="changeOrderType" />
    <div class="order-content">
      <order-list-content :orderList="orderList" />
    </div>
  </div>
</template>

<script>
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'

  import OrderNavBar from './childComps/OrderNavBar'
  import OrderListContent from './childComps/OrderListContent'

  import { orderMo } from 'network/order'

  export default {
    name: 'OrderList',
    components: {
      MainNavBar,
      OrderNavBar,
      OrderListContent
    },
    data() {
      return {
        currentOrderType: 0,
        orderList: [],
        orderNavList: [
          {
            type: 0,
            title: '全部'
          },
          {
            type: 1,
            title: '待付款'
          },
          {
            type: 2,
            title: '待发货'
          },
          {
            type: 3,
            title: '待收货'
          },
          {
            type: 4,
            title: '已完成'
          }
        ]
      }
    },
    created() {
      this.getOrderList(this.currentOrderType)
    },
    methods: {
      getOrderList(type) {
        orderMo(type).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      changeOrderType(type) {
        this.currentOrderType = type
        this.getOrderList(this.currentOrderType)
      }
    }
  }
</script>

<style lang="less" scoped>
  .order-list{
    position: relative;
    height: 100vh;
    .order-content{
      background-color: #fff;
      border-top: 1px solid #eee;
      overflow-y: hidden;
      position: absolute;
      top: 89px;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
  }
  
</style>
