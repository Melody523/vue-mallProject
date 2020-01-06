<template>
  <div class="order-list-content">
    <ul class="order-list" v-if="orderList.length">
      <li class="order-item" v-for="item in orderList" :key="item.tradeId">
        <div class="order-item-header">
          <p class="trade-no">订单编号:{{item.tradeNo}}</p>
          <p class="trade-type">{{item.tradeStatus | tradeType}} <img class="icon" @click="showDelete(item.tradeId)" v-if="item.tradeStatus==1||item.tradeStatus==11||item.tradeStatus==0" src="~assets/img/cart/delect.svg" alt=""></p>
        </div>
        <div class="order-item-content" v-for="goodsItem in item.orderGoods" :key="goodsItem.goodsId" @click="toOrderDetailPage(item.tradeNo)">
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
        <div class="order-item-bottom">
          <p class="end-time">{{filterEndTime(item.endTime, 'YYYY-MM-dd')}}</p>
          <p class="total">
            <span class="num-total">共{{numTotal(item.orderGoods)}}件</span>
            <span class="rcv-total">应付总额:<span class="price-total">￥{{item.rcvTotal.toFixed(2)}}</span></span>
          </p>
        </div>
        <div class="control-btn" v-if="item.tradeStatus==1">
          <div class="btn cancel-btn" @click="cancelOrder(item.tradeNo)">取消订单</div>
          <div class="btn pay-btn">去付款</div>
        </div>
        <div class="control-btn" v-else-if="item.tradeStatus==7">
          <div class="btn check-btn">查看物流</div>
          <div class="btn confirm-btn" @click="confirmOrder(item.tradeId)">确认收货</div>
        </div>
        <div class="control-btn" v-else-if="item.tradeStatus==11">
          <div class="btn check-btn">查看物流</div>
        </div>
      </li>
    </ul>
    <img v-else class="no-img" src="http://www.weinihaigou.com/m-images/no-order.png" alt="">
  </div>
</template>

<script>
  import filterTime from 'utils/filterTime'

  export default {
    name: 'OrderListContent',
    props: {
      orderList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    filters: {
      tradeType(value) {
        switch (value) {
          case '0':
            return '交易关闭'
            break;
          case '1':
            return '等待付款'
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
    methods: {
      filterEndTime(date, fmt) {
        return filterTime(new Date(date), fmt)
      },
      numTotal(goodsList) {
        return goodsList.reduce((prev, item) => {
          return prev + item.sellCount
        }, 0)
      },
      showDelete(tradeId) {
        this.$emit('showDelete', tradeId)
      },
      cancelOrder(tradeNo) {
        this.$emit('cancelOrder', tradeNo)
      },
      confirmOrder(tradeId) {
        this.$emit('confirmOrder', tradeId)
      },
      toOrderDetailPage(tradeNo) {
        this.$router.push('/orderDetail?tradeNo=' + tradeNo)
      }
    }
  }
</script>

<style lang="less" scoped>
  .order-list-content{
    position: relative;
    min-height: 80vh;
    .no-img{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -100%);
      width: 85px;
      height: auto;
      z-index: 1;
    }
    .order-list{
      background-color:  #f8f9fc;
      .order-item{
        padding: 0 18px;
        background-color: #fff;
        margin-bottom: 10px;
        border-bottom: 1px solid #ebebeb;
        border-top: 1px solid #ebebeb;
        padding-bottom: 5px;
        .order-item-header{
          display: flex;
          height: 40px;
          justify-content: space-between;
          align-items: center;
          .trade-no{
            color: #000;
            font-size: 14px;
          }
          .trade-type{
            color: #ff4b4b;
            font-size: 14px;
          }
          .icon{
            width: 18px;
            height: 18px;
            margin-left: 5px;
            vertical-align: bottom;
          }
        }
        .order-item-content{
          height: 82px;
          display: flex;
          justify-content: space-between;
          padding: 9px 0;
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
        .order-item-bottom{
          color: #000;
          font-size: 13px;
          display: flex;
          height: 21px;
          align-items: center;
          justify-content: space-between;
          .price-total{
            color: #ff4b4b;
          }
          .num-total{
            margin-right: 5px;
          }
        }
        .control-btn{
          display: flex;
          justify-content: flex-end;
          margin: 5px 0;
          .btn{
            width: 83px;
            height: 28px;
            line-height: 26px;
            text-align: center;
            border-radius: 3px;
            font-size: 16px;
            margin-left: 10px;
          }
          .cancel-btn{
            border: 1px solid #9c9c9c;
            color: #9c9c9c;
          }
          .pay-btn{
            border: 1px solid #9f2e33;
            color: #9f2e33;
          }
        }
      }
    }
  }
</style>
