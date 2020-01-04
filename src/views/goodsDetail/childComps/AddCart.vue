<template>
  <div class="add-cart">
    <div class="mask" @click="hideAddCart"></div>
    <div class="add-cart-content">
      <img class="goods-img" v-lazy="goodsImg" alt="">
      <div class="add-cart-content-top">
        <p class="price" v-show="skuPriceList.length == 0">￥{{goodsDetailPrice.minPrice}} ～ {{goodsDetailPrice.maxPrice}}</p>
        <ul class="sku-price-list" v-show="skuPriceList.length > 0">
          <li class="sku-price-item" v-for="item in skuPriceList" :key="item.price">
            <p class="type" v-if="item.intervalFirst == 1">1件单价</p>
            <p class="type" v-else-if="item.intervalFirst >= 10">10件以上单价</p>
            <p class="type" v-else>{{item.intervalFirst + '-' + item.intervalLast}}件单价</p>
            <p class="price">￥{{item.price}}</p>
          </li>
        </ul>
        <p class="stock">库存: {{totalStock}}件</p>
        <p class="choose-goods">请选择商品规格</p>
      </div>
      <div class="add-cart-content-middle">
        <p class="title">规格分类:</p>
        <ul class="sku-list">
          <li class="sku-item" 
              v-for="item in skuList" 
              :key="item.skuId" 
              :class="{'active': currentIndex == item.skuId}" 
              @click="skuClick(item.skuId, item.skuImg, item.realStock, item.goodsId)"
          >{{item.skuName}}</li>
        </ul>
      </div>
      <div class="add-cart-content-bottom">
        <p class="title">购买数量:</p>
        <div class="num">
          <div class="sub" @click="goodsNum > 1 ? subGoodsNum() : ''" :class="{'no-sub': goodsNum <= 1 }">-</div>
          <div class="number">{{goodsNum}}</div>
          <div class="add" @click="goodsNum < totalStock ? addGoodsNum() : ''" :class="{'no-sub': goodsNum >= totalStock }">+</div>
        </div>
      </div>
      <div class="confirm-btn" @click="confirmAdd">确认</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddCart',
    props: {
      goodsDetailPrice: {
        type: Object,
        default() {
          return {}
        }
      },
      skuList: {
        type: Array,
        default() {
          return []
        }
      },
      totalStock: {
        type: Number,
        default: 0
      },
      goodsImg: {
        type: String,
        default: -1
      }
    },
    data() {
      return {
        goodsNum: 1,
        currentIndex: null,
        goodsId: null
      }
    },
    computed: {
      skuPriceList() {
        if (!this.currentIndex) {
          return []
        }
        return this.skuList.filter(item => item.skuId == this.currentIndex)[0].skuPriceList
      }
    },
    methods: {
      subGoodsNum() {
        this.goodsNum --
      },
      addGoodsNum() {
        this.goodsNum ++
      },
      skuClick(skuId, skuImg, realStock, goodsId) {
        this.currentIndex = skuId
        this.goodsId = goodsId
        this.$emit('changeSku', {
          totalStock: realStock,
          goodsImg: skuImg
        })
      },
      hideAddCart() {
        this.$emit('hideAddCart')
      },
      confirmAdd() {
        if (this.currentIndex) {
          this.$emit('confirmAdd', {
            goodsId: this.goodsId,
            skuId: this.currentIndex,
            num: this.goodsNum
          })
        } else {
          this.$toast.show('请选择商品规格', 1500)
        }
        
      }
    }
  }
</script>

<style lang="less" scoped>
  .add-cart{
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    .add-cart-content{
      height: 55%;
      width: 100%;
      background-color: #fff;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 2;
      color: #000;
      .goods-img{
        width: 86px;
        height: 86px;
        border-radius: 4px;
        border: 1px solid #e6e6e6;
        position: absolute;
        top: -20px;
        left: 20px;
      }
      .add-cart-content-top{
        padding: 0 14px 14px 115px;
        border-bottom: 1px solid #eee;
        height: 90px;
        margin: 7px 0 0 14px;
        .price{
          color: #eb2634;
          font-size: 17px;
        }
        .sku-price-list{
          display: flex;
          height: 40px;
          align-items: center;
          justify-content: space-between;
          .sku-price-item{
            width: 70px;
            text-align: center;
            .type{
              font-size: 10px;
              line-height: 1.5;
              padding: 2px 4px;
              background-color: #eee;
              border-radius: 3px;
            }
            .price{
              color: #eb2634;
              font-size: 17px;
              margin-top: 5px;
            }
          }
        }
        .stock{
          color: #414141;
          font-size: 14px;
          margin-top: 5px;
        }
        .choose-goods{
          color: #414141;
          font-size: 14px;
          margin-top: 5px;
        }
      }
      .add-cart-content-middle{
        padding: 0 18px;
        .title{
          color: #000;
          font-size: 14px;
          margin: 12px 0 5px;
        }
        .sku-list{
          height: 90px;
          display: flex;
          flex-wrap: wrap;
          justify-content: left;
          .sku-item{
            height: 30px;
            line-height: 30px;
            display: inline-block;
            margin: 0 10px 10px 0;
            padding: 0 5px;
            border: 1px solid #414141;
            color: #414141;
            font-size: 13px;
          }
          .active{
            border: 1px solid #eb2634;
            color: #eb2634;
          }
        }
      }
      .add-cart-content-bottom{
        padding: 14px 18px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        border-top: 1px solid #eee;
        .title{
          color: #000;
          font-size: 14px;
          margin: 12px 0 5px;
        }
        .num{
          border: 1px solid #757575;
          border-radius: 5px;
          width: 110px;
          display: flex;
          height: 36px;
          line-height: 36px;
          .sub{
            flex: 1;
            border-right: 1px solid #757575;
            font-size: 21px;
            color: #000;
            text-align: center;
          }
          .no-sub{
            color: #d2d2d2;
          }
          .number{
            flex: 1;
            font-size: 18px;
            color: #000;
            text-align: center;
          }
          .add{
            flex: 1;
            border-left: 1px solid #757575;
            font-size: 21px;
            color: #000;
            text-align: center;
          }
        }
      }
      .confirm-btn{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 58px;
        line-height: 58px;
        background-color: #a54144;
        color: #fff;
        font-size: 17px;
        text-align: center;
      }
    }
  }
</style>
