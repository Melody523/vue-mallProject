<template>
  <div class="order-detail">
    <main-nav-bar title="订单详情" />
    <scroll class="order-detail-content" :class="{'change-bottom': orderDetail.tradeStatus == '1'}">
      <div class="order-detail-header" :class="{'continue-pay': orderDetail.tradeStatus == '1'}">
        <div class="trade-type">{{orderDetail.tradeStatus | tradeType}}</div>
        <img class="icon" src="http://www.weinihaigou.com/m-images/continue-pay.png" alt="">
      </div>
      <div class="remark">
        <p>买家留言{{orderDetail.remark}}</p>
      </div>
      <div class="address-box">
        <p class="address-user">
          <span>{{orderDetail.sndTo}}</span><span>{{orderDetail.tel}}</span>
        </p>
        <p>
          <img class="icon" src="~assets/img/surePay/location.svg" alt="">
          <span>{{orderDetail.province + orderDetail.city + '  ' + orderDetail.town + orderDetail.adr}}</span>
        </p>
      </div>
      <div class="trade-no">
        <p>订单编号:{{orderDetail.tradeNo}}</p>
        <p>支付时间:{{orderDetail.payerTime}}</p>
      </div>
      <div class="order-item-content" v-for="goodsItem in orderDetail.orderGoods" :key="goodsItem.goodsId">
        <img class="goods-img" :src="goodsItem.goodsImgUrl" alt="">
        <div class="goods-desc">
          <p class="title text-overflow2">{{goodsItem.tradeName}}</p>
          <p class="unit">规格:{{goodsItem.unit}}</p>
        </div>
        <div class="price">
          <p class="sell-price">￥{{goodsItem.sellPrice.toFixed(2)}}</p>
          <p class="sell-count">×{{goodsItem.sellCount}}</p>
        </div>
      </div>
      <div class="order-list" v-if="orderDetail.costTotal">
        <ul class="order-acount-list">
          <li class="order-acount-item">
            <p class="title">商品金额(不含税):</p>
            <p class="acount">￥{{orderDetail.costTotal.toFixed(2)}}</p>
          </li>
          <li class="order-acount-item">
            <p class="title">活动:</p>
            <p class="acount">-￥{{orderDetail.activeAmount.toFixed(2)}}</p>
          </li>
          <li class="order-acount-item">
            <p class="title">优惠券优惠:</p>
            <p class="acount">-￥{{orderDetail.couponAmount.toFixed(2)}}</p>
          </li>
          <li class="order-acount-item">
            <p class="title">运费:</p>
            <p class="acount">￥{{orderDetail.postageTotal.toFixed(2)}}</p>
          </li>
          <li class="order-acount-item">
            <p class="title">预计税费:</p>
            <p class="acount">￥{{orderDetail.postalTax.toFixed(2)}}</p>
          </li>
          <li class="order-acount-item">
            <p class="title">应付总额:</p>
            <p class="acount">￥{{orderDetail.rcvTotal.toFixed(2)}}</p>
          </li>
        </ul>
      </div>
      <div class="pay-type" v-if="orderDetail.tradeStatus == '1'">
        <p class="title">选择支付方式</p>
        <div class="pay-type-item">
          <img class="alipay" src="~assets/img/surePay/alipay.svg" alt="">
          <p class="pay-title">支付宝</p>
          <img class="selected" :src="require('assets/img/cart/choose_active.svg')" alt="">
        </div>
      </div>
    </scroll>
    <div class="control-btn" v-if="orderDetail.tradeStatus == '1'">
      <div class="custom-service">
        <img class="icon" src="http://www.weinihaigou.com/m-images/goods-custom.png" alt="">
      </div>
      <div class="cancel-btn" @click="cancelOrder(orderDetail.tradeNo)">取消订单</div>
      <div class="pay-btn" @click="goTOPay(orderDetail.tradeNo)">继续支付</div>
    </div>
    <delect v-show="isDelete" @cancelDel="cancelDel" @confirmDel="confirmDel" />
  </div>
</template>

<script>
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'
  import Delect from 'components/content/delect/Delect'
  import Scroll from 'components/common/scroll/Scroll'

  import { tradeMoDetail, updateTrade, updateStatus, delTrade, toPay } from 'network/order'

  export default {
    name: 'OrderDetail',
    components: {
      MainNavBar,
      Delect,
      Scroll
    },
    data() {
      return {
        tradeNo: null,
        orderDetail: {},
        isDelete: false,
        delTradeId: null
      }
    },
    filters: {
      tradeType(value) {
        switch (value) {
          case '0':
            return '交易关闭'
            break;
          case '1':
            return '订单已提交成功，等待买家付款将在24小时后自动关闭该订单'
            break;
          case '2' || '5':
            return '待发货'
            break;
          case '7':
            return '已发货'
            break;
          case '11':
            return '交易成功'
            break;
          default:
            break;
        }
      }
    },
    created() {
      this.tradeNo = this.$route.query.tradeNo
      this.getTradeMoDetail(this.tradeNo)
    },
    methods: {
      getTradeMoDetail(tradeNo) {
        tradeMoDetail({tradeNo:　tradeNo}).then(res => {
          console.log(res)
          this.orderDetail = res.result.orderTrade
        })
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
            this.getTradeMoDetail(this.tradeNo)
            this.isDelete = false
          } else {
            this.$toast.show(res.message, 1500)
          }
        })
      },
      cancelOrder(tradeNo) {
        updateTrade({tradeNo: tradeNo}).then(res => {
          if ( res.success ) {
            this.getTradeMoDetail(this.tradeNo)
            this.$toast.show('订单取消成功', 1500)
          } else {
            this.$toast.show('订单取消失败', 1500)
          }
        })
      },
      confirmOrder(tradeId) {
        updateStatus({tradeId: tradeId}).then(res => {
          if ( res.success ) {
            this.getTradeMoDetail(this.tradeNo)
            this.$toast.show('确认收货成功', 1500)
          } else {
            this.$toast.show('确认收货失败', 1500)
          }
        })
      },
      goTOPay(tradeNo) {
        let payStatus = 4 //选择支付宝付款
        toPay({tradeNo: tradeNo, payStatus: payStatus}).then(res => {
          console.log(res)
          if(res.success == true){
            window.location.href = res.result
          } else{
            this.$toast.show(res.msg, 1500)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .order-detail{
    position: relative;
    height: 100vh;
    z-index: 2;
    .order-detail-content{
      background-color:  #f8f9fc;
      overflow-y: hidden;
      position: absolute;
      top: 44px;
      bottom: 0;
      left: 0;
      right: 0;
      .order-detail-header{
        height: 80px;
        background-color: #9d9c9c;
        padding: 0 19px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .trade-type{
          height: 42px;
          color: #fff;
          font-size: 14px;
          width: 236px;
        }
        .icon{
          width: 54px;
          height: auto;
        }
      }
      .continue-pay{
        background-color: #9f2e33;
      }
      .remark{
        padding: 14px 18px;
        margin-bottom: 10px;
        background-color: #fff;
        font-size: 14px;
        color: #000;
        p{
          height: 20px;
          line-height: 20px;
        }
      }
      .address-box{
        padding: 14px 18px;
        margin-bottom: 10px;
        background-color: #fff;
        .address-user{
          margin-top: 0;
          span{
            color: #000;
            font-size: 14px;
          }
        }
        p{
          margin-top: 10px;
          .icon{
            width: 15px;
            height: 15px;
            vertical-align: middle;
          }
          span{
            color: #999;
            font-size: 12px;
            margin-right: 10px;
          }
        }
        
      }
      .trade-no{
        padding: 14px 18px;
        margin-bottom: 10px;
        background-color: #fff;
        font-size: 14px;
        color: #000;
        p{
          height: 20px;
          line-height: 20px;
        }
      }
    }
    .change-bottom{
      bottom: 44px;
    }
  }
  
  .order-item-content{
    display: flex;
    justify-content: space-between;
    padding: 9px 0;
    background-color: #fff;
    margin-bottom: 10px;
    padding: 14px 19px;
    .goods-img{
      width: 65px;
      height: 65px;
    }
    .goods-desc{
      flex: 1;
      padding: 0 6px;
      .title{
        color: #1a1a1a;
        font-size: 15px;
        line-height: 1.5;
      }
      .unit{
        font-size: 12px;
        color: #acacac;
        margin-top: 3px;
      }
    }
    .price{
      width: 58px;
      text-align: right;
      .sell-price{
        color: #1a1a1a;
        font-size: 14px;
      }
      .sell-count{
        font-size: 12px;
        color: #8b8b8b;
      }
    }
  }
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
  .pay-type{
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    margin-bottom: 10px;
    margin-top: 10px;
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
  .control-btn{
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    font-size: 14px;
    color: #000;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid #ebebeb;
    .custom-service{
      width: 90px;
      height: 44px;
      border-right: 1px solid #ebebeb;
      .icon{
        width: 24px;
        height: 21px;
        display: block;
        margin: 10px auto;
      }
    }
    .cancel-btn{
      flex: 1;
      text-align: center;
      height: 44px;
      line-height: 44px;
      border-right: 1px solid #ebebeb;
    }
    .pay-btn{
      flex: 1;
      height: 44px;
      line-height: 44px;
      color: #fff;
      background-color: #9f2e33;
      text-align: center;
    }
  }
</style>
