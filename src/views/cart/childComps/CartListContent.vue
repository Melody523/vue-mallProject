<template>
  <div class="cart-list-content">
    <ul class="cart-list" v-if="cartList.length" >
      <li class="cart-item" v-for="(cartItem, index) in cartList" :key="index">
        <div v-for="(item, i) in cartItem.shopCarList" :key="item.cartId">
          <div class="item-top">
            <img class="checkbox" @click="chooseClick(index, i)" v-lazy="item.checked?require('assets/img/cart/choose_active.svg'):require('assets/img/cart/choose.svg')" alt="">
            <div class="img-box">
              <img class="img" v-lazy="item.imgUrl" alt="" @click="toGoodsDetail(item.goodsNo)">
              <div v-if='item.isShow == 0 || item.status != 1' class="no-goods">已下架</div>
            </div>
            <div class="goods-desc"  @click="toGoodsDetail(item.goodsNo)">
              <p class="title text-overflow2">{{item.goodsName}}</p>
              <p class="sku-name">规格:{{item.skuName}}</p>
              <p class="delivery">{{item.deliveryCode | deliveryTypeFilter}}</p>
              <p class="price">￥{{item.skuPrice.toFixed(2)}}</p>
            </div>
            <div class="num-content">
              <div class="num" v-if="!isEdit && item.realStock > 0">
                <div class="sub" @click="item.num > 1 ? addGoodsNum(item.goodsId, item.skuId, -1) : ''" :class="{'no-sub': item.num <= 1 }">-</div>
                <div class="number">{{item.num}}</div>
                <div class="add" @click="addGoodsNum(item.goodsId, item.skuId, 1)">+</div>
              </div>
              <div class="delect" v-else @click="delectGoods(item.cartId)">
                <img class="delect-icon" src="~assets/img/cart/delect.svg" alt="">
                <p class="title">删除</p>
              </div>
              <div class="tax-money">预计税费:{{item.goodsTax}}</div>
              <span class="icon" @click="taxClick(index, i)" :class="{'show-icon': item.taxShow}"></span>
            </div>
          </div>
          <div class="item-bottom" v-show="item.taxShow">
            税率{{item.tax.toFixed(2)}}%，结算税费以提交订单时应付总额明细为准
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import filtersMixin from 'mixins/filtersMixin'

  export default {
    name: 'CartListContent',
    mixins: [filtersMixin],
    props: {
      cartList: {
        type: Array,
        default() {
          return []
        }
      },
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
      }
    },
    methods: {
      chooseClick(index, i) {
        this.$emit('chooseClick', {
          index1: index,
          index2: i
        })
      },
      taxClick(index, i) {
        this.$emit('taxClick', {
          index1: index,
          index2: i
        })
      },
      addGoodsNum(goodsId, skuId, num) {
        this.$emit('addGoodsNum', {
          goodsId,
          skuId,
          num
        })
      },
      delectGoods(id) {
        this.$emit('delectGoods', {
          id
        })
      },
      toGoodsDetail(goodsNo) {
        this.$router.push('/goodsDetail/' + goodsNo)
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart-list-content{
    .cart-list{
      .cart-item{
        border-bottom: 1px solid #eee;
        .img-box{
          position: relative;
          .no-goods{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 5px 0;
            width: 50px;
            text-align: center;
            background: #7f7f7f;
            opacity: 0.7;
            color: #fff;
            border-radius: 4px;
            font-size: 12px;
          }
        }
        
        .item-top{
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0 18px;
          height: 120px;
          .checkbox{
            width: 20px;
            height: 20px;
            border-radius: 20px;
          }
          .img{
            width: 60px;
            height: 60px;
          }
          .goods-desc{
            width: 120px;
            .title{
              font-size: 15px;
              color: #4c4c4c;
            }
            .sku-name{
              color: #999;
              font-size: 13px;
              padding-top: 4px;
            }
            .delivery{
              color: #999;
              font-size: 13px;
              padding-top: 4px;
            }
            .price{
              padding-top: 4px;
              font-size: 15px;
              color: #f34f34;
              font-weight: bold;
            }
          }
          .num-content{
            position: relative;
            width: 110px;
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
            .delect{
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              padding-right: 10px;
              .delect-icon{
                width: 20px;
                height: 20px;
                margin-right: 5px;
              }
              .title{
                font-size: 13px;
                color: #000;
                width: 30px;
                text-align: center;
              }
            }
          }
          .tax-money{
            color: #999;
            font-size: 13px;
            text-align: right;
            padding-top: 4px;
          }
          .icon{
            position: absolute;
            right: 10px;
            bottom: -16px;
            display: inline-block;
            width: 10px;
            height: 10px;
            border-bottom: 1px solid #ccc;
            border-right: 1px solid #ccc;
            transform: rotate(45deg);
          }
          .show-icon{
            transform: rotate(-135deg);
          }
        }
        .item-bottom{
          padding: 7px 14px;
          background: #f7f7f7;
          color: #4d4d4d;
          font-size: 13px;
          line-height: 1.5;
        }
      }
    }
  }
</style>
