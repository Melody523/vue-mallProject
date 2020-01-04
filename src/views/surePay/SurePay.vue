<template>
  <div class="sure-pay">
    <main-nav-bar title="确认支付" />
    <scroll class="sure-pay-content" ref="scroll" >
      <sure-pay-address :addrList="addrList" />
      <goods-list :shopList="shopList" />
      <order-list :acountObj="acountObj" />
      <div class="safe-tip">安全提醒：付款成功后，唯妮海购不会以付款异常，系统升级为理由联系您，请勿泄漏银行卡号，手机验证码，否则会造成钱款的损失。如有疑问请咨询客服，谨防电话诈骗。</div>
      <remark />
      <pay-type />
    </scroll>
    <sure-pay-bottom :amountAll="acountObj.amountAll" />
  </div>
</template>

<script>
  import { toMoPalaceOrder } from 'network/surePay'

  import MainNavBar from 'components/content/mainNavBar/MainNavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import SurePayAddress from './childComps/SurePayAddress'
  import GoodsList from './childComps/GoodsList'
  import OrderList from './childComps/OrderList'
  import Remark from './childComps/Remark'
  import PayType from './childComps/PayType'
  import SurePayBottom from './childComps/SurePayBottom'

  export default {
    name: 'SurePay',
    components: {
      MainNavBar,
      Scroll,
      SurePayAddress,
      GoodsList,
      OrderList,
      Remark,
      PayType,
      SurePayBottom
    },
    data() {
      return {
        addrList: [],
        shopList: [],
        acountObj: {
          amountAll: 0,
          couDiscount: 0,
          discount: 0,
          postAge: 0,
          realNameAndCard: '',
          shopCount: 0,
          taxAll: 0,
          cList: [],
          totalAcount: 0
        }
      }
    },
    created() {
      this.getMoPalaceOrder()
    },
    methods: {
      getMoPalaceOrder() {
        toMoPalaceOrder().then(res => {
          console.log(res)
          this.addrList = res.result.addrList
          this.shopList = res.result.shopList
          this.acountObj.amountAll = res.result.amountAll
          this.acountObj.couDiscount = res.result.couDiscount 
          this.acountObj.discount = res.result.discount 
          this.acountObj.postAge = res.result.postAge 
          this.acountObj.realNameAndCard = res.result.realNameAndCard 
          this.acountObj.shopCount = res.result.shopCount
          this.acountObj.taxAll = res.result.taxAll
          this.acountObj.cList = res.result.cList
          this.acountObj.totalAcount = res.result.amountAll + res.result.postAge + res.result.taxAll - res.result.couDiscount - res.result.discount 
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .sure-pay{
    background-color: #f8f9fc;
    height: 100vh;
    position: relative;
    z-index: 2;
    .sure-pay-content{
      overflow-y: hidden;
      position: absolute;
      top: 44px;
      bottom: 44px;
      left: 0;
      right: 0;
    }
    .safe-tip{
      color: #000;
      font-size: 12px;
      padding: 12px 14px;
      background-color: #fff;
      margin-bottom: 10px;
    }
  }
</style>
