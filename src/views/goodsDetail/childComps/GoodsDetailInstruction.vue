<template>
  <div class="goods-detail-instruction">
    <div class="goods-detail-instruction-title">说明:</div>
    <ul class="goods-detail-instruction-list">
      <div class="goods-detail-instruction-item" v-for="item in instructionList" :key="item">{{item}}</div>
    </ul>
    <div class="left-icon"></div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsDetailiInstruction',
    data() {
      return {
        instructionList: ['商品税费', '该商品免运费', '100%正品保证', '假一赔十']
      }
    }
  }
</script>

<style lang="less" scoped>
  .goods-detail-instruction{
    margin-bottom: 10px;
    padding: 0 18px;
    color: #1a1a1a;
    font-size: 14px;
    height: 70px;
    background-color: #fff;
    position: relative;
    display: flex;
    align-items: center;
    .goods-detail-instruction-title{
      width: 50px;
      text-align: left;
    }
    .goods-detail-instruction-list{
      display: flex;
      flex-wrap: wrap;
      .goods-detail-instruction-item{
        position: relative;
        padding-left: 10px;
        width: 50%;
        &::before{
          content: '';
          display: block;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(0, -50%);
          width: 5px;
          height: 5px;
          background-color: #f34f34;
          border-radius: 50%;
        }

      }
    }
  }
</style>
