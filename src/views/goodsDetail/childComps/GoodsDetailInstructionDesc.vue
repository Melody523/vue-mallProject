<template>
  <div class="goods-detail-instruction-desc">
    <div class="mask" @click="hideInstruction"></div>
    <div class="goods-detail-instruction-detail">
      <div class="goods-detail-instruction-header">商品说明<img class="close-icon"  @click="hideInstruction" src="~assets/img/common/close.svg" alt=""></div>
      <ul class="goods-detail-instruction-list">
        <li  class="goods-detail-instruction-item" v-for="item in instructionDetailList" :key="item.title">
          <div class="goods-detail-instruction-item-title">{{item.title}}</div>
          <div class="goods-detail-instruction-item-desc">{{item.desc}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsDetailInstructionDesc',
    data() {
      return {
        instructionDetailList: [
          {
            title: '商品税费',
            desc: '商家承担'
          },
          {
            title: '商品运费',
            desc: '该商品免运费'
          },
          {
            title: '正品保障',
            desc: '唯妮海购每一件商品都经过严苛的品质把关，100%正品保证'
          },
          {
            title: '假一赔十',
            desc: '杜绝一切假货，让您无忧购物。'
          }
        ]
      }
    },
    methods: {
      hideInstruction() {
        this.$emit('hideInstruction')
      }
    }
  }
</script>

<style lang="less" scoped>
  .goods-detail-instruction-desc{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    .goods-detail-instruction-detail{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      .goods-detail-instruction-header{
        height: 50px;
        line-height: 50px;
        font-size: 17px;
        color: #131313;
        text-align: center;
        border-bottom: 1px solid #ddd;
        position: relative;
        .close-icon{
          width: 20px;
          height: 20px;
          position: absolute;
          right: 18px;
          top: 50%;
          transform: translate(0, -50%);
        }
      }
      .goods-detail-instruction-list{
        padding: 6px 19px 20px;
        .goods-detail-instruction-item{
          padding-bottom: 8px;
          .goods-detail-instruction-item-title{
            position: relative;
            padding-left: 10px;
            font-size: 16px;
            color: #131313;
            height: 23px;
            line-height: 23px;
            &::before{
              content: '';
              display: block;
              position: absolute;
              left: 0;
              top: 50%;
              width: 6px;
              height: 6px;
              background-color: #9f2e33;
              transform: rotate(45deg);
            }
          }
          .goods-detail-instruction-item-desc{
            font-size: 14px;
            color: #636363;
            line-height: 21px;
            padding-left: 10px;
          }
        }
      }
    }
  }
</style>
