<template>
  <div class="brand-desc">
    <div class="brand-desc-header"><span class="brand-desc-title">品牌详情</span></div>
    <p class="brand-desc-content">全球商品一站式采购代发，主营美妆/个护/食品/保健品/日用品等品类,国内领先主流跨境电商平台的日系产品供应者。设有东京、电商平台的日系产品供应者。设有东京、香港、浙江三个中心。东京：采购与仓储 ; 香港：仓储与BD ; 浙江：运营与购与仓储 ; 香港：仓储与BD ;</p>
    <img class="brand-logo" :src="goodsBrand.brandLogo" alt="">
    <p class="get-more" @click="toBrandGoods" >查看该品牌所有单品></p>
  </div>
</template>

<script>
  export default {
    name: 'BrandDesc',
    props: {
      goodsBrand: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      toBrandGoods() {
        this.$router.push('/brandGoods?brandId=' + this.goodsBrand.brandId + '&title=' +this.goodsBrand.brandName)
      }
    }
  }
</script>

<style lang="less" scoped>
 .brand-desc{
   background-color: #fff;
   margin-bottom: 10px;
   .brand-desc-header{
    padding: 17px 0; 
    position: relative;
    .brand-desc-title{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: block;
      text-align: center;
      font-size: 15px;
      color: #3d3d3d;
      z-index: 3;
      width: 100px;
      margin: 0 auto;
      background-color: #fff;
    }
    &::after{
      content: '';
      display: block;
      width: 210px;
      border-top: 1px solid #ddd;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    } 
   }
   .brand-desc-content{
     padding: 0 18px;
     color: #4d4d4d;
     font-size: 14px;
     line-height: 20px;
   }
   .brand-logo{
     width: 100px;
     height: auto;
     display: block;
     margin: 0 auto;
   }
   .get-more{
     font-size: 14px;
     color: #aa4549;
     text-align: center;
     display: block;
     padding: 5px 0 25px;
   }
 }
</style>
