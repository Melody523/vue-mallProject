<template>
  <div class="order-list">
    <main-nav-bar title="我的订单" />
    <order-nav-bar :orderNavList="orderNavList" :currentOrderType="currentOrderType" @changeOrderType="changeOrderType" />
    <scroll class="order-content" ref="scroll" :probeType="3" @scroll="scroll">
      <order-list-content :orderList="orderList" @showDelete="showDelete" @cancelOrder="cancelOrder" @confirmOrder="confirmOrder" />
      <page-end />
    </scroll>
    <delect v-show="isDelete" @cancelDel="cancelDel" @confirmDel="confirmDel">
      <div slot="content" class="delect-header">确定要删除吗？</div>
    </delect>
    <back-top v-show="showBackTop" @click.native="backTop" />
  </div>
</template>

<script>
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'
  import Delect from 'components/content/delect/Delect'
  import PageEnd from 'components/content/pageEnd/PageEnd'
  import Scroll from 'components/common/scroll/Scroll'

  import OrderNavBar from './childComps/OrderNavBar'
  import OrderListContent from './childComps/OrderListContent'

  import { orderMo, updateTrade, updateStatus, delTrade } from 'network/order'

  import backtopMixin from 'mixins/backtopMixin'

  export default {
    name: 'OrderList',
    components: {
      MainNavBar,
      Scroll,
      Delect,
      PageEnd,
      OrderNavBar,
      OrderListContent
    },
    mixins: [ backtopMixin ],
    data() {
      return {
        currentOrderType: null,
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
        ],
        isDelete: false,
        delTradeId: null
      }
    },
    created() {
      console.log(this.$route.query.type)
      this.currentOrderType = parseInt(this.$route.query.type)
      this.getOrderList(this.currentOrderType)
    },
    methods: {
      getOrderList(type) {
        orderMo(type).then(res => {
          this.orderList = res.result
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      changeOrderType(type) {
        this.currentOrderType = type
        this.getOrderList(this.currentOrderType)
      },
      showDelete(tradeId) {
        this.isDelete = true
        this.delTradeId = tradeId
      },
      cancelDel() {
        this.isDelete = false
      },
      confirmDel() {
        delTrade({tradeIds: this.delTradeId}).then(res => {
          if ( res.success ) {
            this.getOrderList(this.currentOrderType)
            this.isDelete = false
          } else {
            this.$toast.show(res.message, 1500)
          }
        })
      },
      cancelOrder(tradeNo) {
        updateTrade({tradeNo: tradeNo}).then(res => {
          if ( res.success ) {
            this.getOrderList(this.currentOrderType)
            this.$toast.show('订单取消成功', 1500)
          } else {
            this.$toast.show('订单取消失败', 1500)
          }
        })
      },
      confirmOrder(tradeId) {
        updateStatus({tradeId: tradeId}).then(res => {
          if ( res.success ) {
            this.getOrderList(this.currentOrderType)
            this.$toast.show('确认收货成功', 1500)
          } else {
            this.$toast.show('确认收货失败', 1500)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .order-list{
    position: relative;
    height: 100vh;
    z-index: 2;
    .order-content{
      background-color:  #f8f9fc;
      overflow-y: hidden;
      position: absolute;
      top: 88px;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
  
</style>
