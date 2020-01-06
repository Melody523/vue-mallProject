<template>
  <div class="cart">
    <cart-nav-bar title="购物车" :isEdit="isEdit" @changeEdit="changeEdit" />
    <scroll class="cart-content" ref="scroll" :probeType="3" @scroll="scroll">
      <cart-list-content 
        :cartList="cartList" 
        :isEdit="isEdit" 
        @chooseClick="chooseClick" 
        @taxClick="taxClick" 
        @addGoodsNum="addGoodsNum"
        @delectGoods="delectGoods"
      />
    </scroll>
    <back-top v-show="showBackTop" @click.native="backTop" />
    <total-count :checkAll="checkAll" @clickAllCheck="clickAllCheck" :selectedCal="selectedCal" :selectedFreightMoney="selectedFreightMoney" @toSurePay="toSurePay" />
    <delect v-show="showDelect" @cancelDel="cancelDel" @confirmDel="confirmDel">
      <div slot="content" class="delect-header">确定要删除吗？</div>
    </delect>
  </div>
</template>

<script>
  import { shopCarIndexMobile, addShopCar, delShopCar } from 'network/cart'

  import Scroll from 'components/common/scroll/Scroll'
  import Delect from 'components/content/delect/Delect'

  import CartNavBar from './childComps/CartNavBar'
  import CartListContent from './childComps/CartListContent'
  import TotalCount from './childComps/TotalCount'

  import { setCookie } from 'utils/cookies'

  import backtopMixin from 'mixins/backtopMixin'

  export default {
    name: 'Cart',
    data() {
      return {
        cartList: [],
        postpolicy: {},
        isEdit: false,
        showDelect: false,
        delId: ''
      }
    },
    mixins: [backtopMixin],
    components: {
      Scroll,
      Delect,
      CartNavBar,
      CartListContent,
      TotalCount
    },
    created() {
      this.getCartList()
    },
    computed: {
      checkAll() {
        return this.cartList.filter(item => {
          return item.shopCarList.find(shopCarItem => {
            return !shopCarItem.checked
          })
        }).length > 0 ? false : true
      },
      selectedCal() {
        let taxMoney = 0
        let goodsMoney = 0
        this.cartList.forEach(item => {
          item.shopCarList.forEach((shopCarItem) => {
            if(shopCarItem.checked) {
              taxMoney += Number(shopCarItem.goodsTax)
              goodsMoney += shopCarItem.skuPrice * shopCarItem.num
            }
          })
        })
        return {
          taxMoney,
          goodsMoney
        }
      },
      selectedFreightMoney() {
        return ( this.selectedCal.goodsMoney == 0 || this.selectedCal.goodsMoney >= this.postpolicy.limitMoney ) ? 0 : this.postpolicy.postage;
      }
    },
    methods: {
      getCartList() {
        shopCarIndexMobile().then(res => {
          this.cartList = res.result.carList
          this.postpolicy = res.result.postpolicy
          this.calGoodsPrice()
          this.calTaxMoney()
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      calGoodsPrice() {
        this.cartList.forEach((item, index) => {
          item.shopCarList.forEach((shopCarItem, i) => {
            let priceList = shopCarItem.priceList
            shopCarItem.taxShow = false
            shopCarItem.checked = false
            if(priceList.length > 0) {
              priceList.forEach(priceItem => {
                if (shopCarItem.num >= priceItem.intervalFirst && shopCarItem.num <= priceItem.intervalLast) {
                  shopCarItem.skuPrice = priceItem.price
                }
              })
            }
          })
        })
      },
      calTaxMoney() {
        this.cartList.forEach((item, index) => {
          item.shopCarList.forEach((shopCarItem, i) => {
            // 正常状态并且只计算保税区且不是包邮包税的商品
            if ( shopCarItem.saleType == 0 && shopCarItem.deliveryCode == 1 ) {
              shopCarItem.goodsTax = (shopCarItem.skuPrice * shopCarItem.num * shopCarItem.tax).toFixed(2)
            } else {
              shopCarItem.goodsTax = 0.00.toFixed(2)
            }
          })
        })
      },
      clickAllCheck() {
        let cartList = JSON.parse(JSON.stringify(this.cartList))
        cartList.forEach((item) => {
          item.shopCarList.forEach((shopCarItem) => {
            shopCarItem.checked = !this.checkAll
          })
        })
        this.cartList = cartList
      },
      chooseClick(data) {
        let cartList = JSON.parse(JSON.stringify(this.cartList))
        cartList[data.index1].shopCarList[data.index2].checked = !cartList[data.index1].shopCarList[data.index2].checked
        this.cartList = cartList
      },
      taxClick(data) {
        let cartList = JSON.parse(JSON.stringify(this.cartList))
        cartList[data.index1].shopCarList[data.index2].taxShow = !cartList[data.index1].shopCarList[data.index2].taxShow
        this.cartList = cartList
      },
      changeEdit() {
        this.isEdit = !this.isEdit
      },
      addGoodsNum(params) {
        let cartList = JSON.parse(JSON.stringify(this.cartList))
        addShopCar(params).then(res => {
          if (res.success) {
            cartList.forEach(item => {
              item.shopCarList.forEach(shopCarItem => {
                if(params.goodsId == shopCarItem.goodsId && params.skuId == shopCarItem.skuId) {
                  shopCarItem.num = params.num + shopCarItem.num
                }
              })
            })
            this.cartList = cartList
          } else {
            this.$toast.show(res.message, 1500)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      delectGoods(params) {
        this.showDelect = true
        this.delId = params.id
      },
      cancelDel() {
        this.showDelect = false
        this.delId = ''
      },
      confirmDel() {
        delShopCar({id: this.delId}).then((res) => {
          console.log(res)
          if (res.success) {
            this.getCartList()
            this.showDelect = false
            this.delId = ''
          } else {
            this.$toast.show(res.message, 1500)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      toSurePay() {
        let skuNos = ''
        let num = ''
        this.cartList.forEach(item => {
          item.shopCarList.forEach(shopCarItem => {
            if (shopCarItem.checked) {
              skuNos += shopCarItem.skuId + ','
              num += shopCarItem.num + ','
            }
          })
        })
        if (num=='') {
          this.$toast.show('请选择商品', 1500)
          return;
        }
        if ( this.selectedCal.goodsMoney > 2000 ) {
          this.$toast.show('保税区仓库多件商品的总价不得超过2000元，请您分多次购买!', 1500)
          return;
        }
        setCookie('PALACE_ORDER_SKUNO', skuNos.substr(0, skuNos.length-1));
        setCookie('PALACE_ORDER_NUMS', num.substr(0, num.length-1));
        setCookie('PALACE_ORDER_COUPONID', "");
        setCookie('PALACE_ORDER_ADDRESS', "");
        this.$router.push('/surePay')
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart{
    position: relative;
    height: 100vh;
    .cart-content{
      background-color: #fff;
      border-top: 1px solid #eee;
      overflow-y: hidden;
      position: absolute;
      top: 44px;
      bottom: 100px;
      left: 0;
      right: 0;
    }
    .delect-container{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      .delect-content{
        width: 80%;
        border-radius: 4px;
        background-color: #fff;
        font-size: 18px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .delect-header{
          padding: 42px;
          text-align: center;
          border-bottom: 1px solid #e5e5e5;
          word-break: break-all;
          color: #000;
        }
        .delect-btn{
          height: 50px;
          display: flex;
          align-items: center;
          .cancel{
            flex: 1;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #000;
            border-right: 1px solid #e5e5e5;
          }
          .confirm{
            flex: 1;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #ac575a;
          }
        }
      }
    }
  }
</style>
