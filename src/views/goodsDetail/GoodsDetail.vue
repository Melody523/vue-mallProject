<template>
  <div class="goods-detail">
    <goods-detail-nav-bar :cartCount="cartCount" />
    <scroll class="goods-detail-content" ref="scroll" :probeType="3" @scroll="scroll">
      <goods-detail-swipe :bannerList="goodsBannerList" />
      <goods-detail-price :goodsDetailPrice="goodsDetailPrice" />
      <div class="dispatch-container">
        配送至: <span class="dispatch-area" @click="showCity">{{chooseProvince}}   {{chooseCity}}</span><span class="left-icon"></span>
      </div>
      <goods-detail-instruction @click.native="showInstruction" />
      <brand-desc :goodsBrand="goodsBrand" />
      <goods-detail-message :goodsDetailList="goodsDetailList" />
    </scroll>
    <back-top v-show="showBackTop" @click.native="backTop" />
    <transition appear name="slide-fade">
        <goods-detail-instruction-desc v-show="isShowInstruction" @hideInstruction="hideInstruction" />
    </transition>
    <bottom-tab-bar @showAddCart="showAddCart" :totalStock="totalStock" :ifCollect="ifCollect" @collectGoods="collectGoods" @clickRemind="clickRemind" />
    <transition appear name="slide-fade-2">
      <city-content v-show="isShowCity" @hideCity="hideCity" @changeCity="changeCity" :chooseProvince="chooseProvince" />
    </transition> 
    <transition appear name="slide-fade">
      <add-cart v-show="isShowAdd" 
                :goodsDetailPrice="goodsDetailPrice" 
                :skuList="skuList" 
                :totalStock="totalStock" 
                :goodsImg="goodsImg" 
                @changeSku="changeSku" 
                @hideAddCart="hideAddCart" 
                @confirmAdd="confirmAdd"
      />
    </transition>
    <remind-tips :userMessage="userMessage" v-show="showRemind" @hideRemind="hideRemind" @remindConfirmBtn="remindConfirmBtn" />
  </div>
</template>

<script>
  import GoodsDetailNavBar from './childComps/GoodsDetailNavBar'
  import GoodsDetailSwipe from './childComps/GoodsDetailSwipe'
  import GoodsDetailPrice from './childComps/GoodsDetailPrice'
  import GoodsDetailInstruction from './childComps/GoodsDetailInstruction'
  import GoodsDetailInstructionDesc from './childComps/GoodsDetailInstructionDesc'
  import GoodsDetailMessage from './childComps/GoodsDetailMessage'
  import CityContent from './childComps/CityContent'
  import AddCart from './childComps/AddCart'
  import RemindTips from './childComps/RemindTips'

  import Scroll from 'components/common/scroll/Scroll'

  import BrandDesc from 'components/content/brandDesc/BrandDesc'
  import BottomTabBar from 'components/content/bottomTabBar/BottomTabBar'

  import { getDetailMo, getPostRule, addShopCar, carCount, insertCollect, delCollectByGoodsId, addNotify } from 'network/goods'

  import userMixin from 'mixins/userMixin'
  import backtopMixin from 'mixins/backtopMixin'

  export default {
    name: 'GoodsDetail',
    components: {
      Scroll,
      BrandDesc,
      BottomTabBar,
      GoodsDetailNavBar,
      GoodsDetailSwipe,
      GoodsDetailPrice,
      GoodsDetailInstruction,
      GoodsDetailInstructionDesc,
      GoodsDetailMessage,
      CityContent,
      AddCart,
      RemindTips
    },
    data() {
      return {
        goodsNo: null,
        goodsBannerList: [],
        goodsDetailPrice: {},
        skuList: [],
        totalStock: 1,
        goodsImg: '',
        isShowInstruction: false,
        goodsBrand: {},
        goodsDetailList: [],
        isShowCity: false,
        chooseProvince: '广东省',
        chooseCity: '广州市',
        isShowAdd: false,
        cartCount: 0,
        ifCollect: false,
        goodsId: null,
        showRemind: false
      }
    },
    mixins: [ userMixin, backtopMixin ],
    created() {
      this.goodsNo = this.$route.params.goodsNo
      this.getGoodsDetail(this.goodsNo)
      this.getcartCount()
      this.getUserMessage()
    },
    methods: {
      getGoodsDetail(goodsNo) {
        getDetailMo(goodsNo).then(res => {
          this.goodsBannerList = res.result.imgList.filter(item => item.type == 1)
          this.goodsDetailPrice = this.getGoodsDetailPrice(res.result.goods)
          this.goodsDetailList = res.result.imgList.filter(item => item.type == 2)
          this.goodsBrand = res.result.goods.goodsBrand
          this.skuList = res.result.goods.skuList
          this.totalStock = res.result.goods.realStock
          this.goodsImg = res.result.goods.imgUrl
          this.ifCollect = res.result.ifCollect
          this.goodsId = res.result.goods.goodsId
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      getcartCount() {
        carCount().then(res => {
          console.log(res)
          this.cartCount = res.result
        }).catch(err => {
          console.log(err)
        })
      },
      getGoodsDetailPrice(goods) {
        return {
          goodsName: goods.goodsName,
          minPrice: goods.minPrice,
          maxPrice: goods.maxPrice,
          marketPrice: goods.marketPrice,
          goodsCountry: goods.goodsCountry
        }
      },
      showInstruction() {
        this.isShowInstruction = true
      },
      hideInstruction() {
        this.isShowInstruction = false
      },
      showCity() {
        this.isShowCity = true
      },
      hideCity() {
        this.isShowCity = false
      },
      changeCity(data) {
        this.chooseProvince = data.chooseProvince
        this.chooseCity = data.chooseCity
        this.isShowCity = false
        getPostRule({ ruleId: 149, province: this.chooseProvince, city: this.chooseCity}).then(res => {
          console.log(res)
          if (!res.success) {
            this.$toast.show(res.message, 1500)
          } else {

          }
        }).catch(err => {
          console.log(err)
        })
      },
      changeSku(data) {
        this.totalStock = data.totalStock
        this.goodsImg = data.goodsImg
      },
      showAddCart() {
        this.isShowAdd = true
      },
      hideAddCart() {
        this.isShowAdd = false
      },
      confirmAdd(data) {
        addShopCar(data).then(res => {
          console.log(res)
          if(!res.success) {
            this.$toast.show(res.message, 1500)
          } else {
            this.isShowAdd = false
            this.getcartCount()
          }
        }).catch(err => {
          console.log(err)
        })
      },
      collectGoods() {
        if(this.ifCollect) {
          delCollectByGoodsId(this.goodsId).then(res => {
            if (!res.success) {
              this.$toast.show(res.message, 1500)
            } else {
              this.$toast.show('取消收藏成功', 1500)
              this.ifCollect = false
            }
          })
        } else {
          insertCollect(this.goodsId).then(res => {
            if (!res.success) {
              this.$toast.show(res.message, 1500)
            } else {
              this.$toast.show('收藏成功', 1500)
              this.ifCollect = true
            }
          })
        }
      },
      clickRemind() {
        this.showRemind = true
      },
      hideRemind() {
        this.showRemind = false
      },
      remindConfirmBtn(mobile) {
        if (/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(mobile.trim())) {
          addNotify({goodsId: this.goodsId, mobile: mobile}).then(res => {
            this.$toast.show(res.message, 1500)
            if (res.success) {
              this.showRemind = false
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$toast.show('手机号为空或者格式不正确', 1500)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .goods-detail{
    background-color: #f8f9fc;
    position: relative;
    height: 100vh;
    .goods-detail-content{
      overflow-y: hidden;
      position: absolute;
      top: 44px;
      bottom: 45px;
      left: 0;
      right: 0;
      z-index: 1;
      background-color: #f8f9fc;
    }
    .dispatch-container{
      margin: 10px 0;
      padding: 0 18px;
      color: #1a1a1a;
      font-size: 14px;
      height: 47px;
      line-height: 47px;
      background-color: #fff;
      position: relative;
      .dispatch-area{
        display: inline-block;
        font-size: 14px;
        color: #999;
        width: 70%;
      }
      .icon{
        position: absolute;
        right: 10px;
        top: 50%;
        width: 10px;
        height: 10px;
        border-top: 1px solid #333;
        border-right: 1px solid #333;
        transform: translate(0, -50%) rotate(45deg);
      }
    }
    // .city-container{
    //   position: fixed;
    //   left: 0;
    //   top: 0;
    //   right: 0;
    //   bottom: 0;
    //   z-index: 3;
    //   height: 100vh;
    // }
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateY(100%);
  }
  .slide-fade-2-enter-active, .slide-fade-2-leave-active {
    transition: all .3s ease;
  }
  .slide-fade-2-enter, .slide-fade-2-leave-to{
    transform: translateX(100%);
  }
  
</style>
