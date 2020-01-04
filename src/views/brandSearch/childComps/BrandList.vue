<template>
  <div class="brand-list">
    <div class="brand-list-title">{{queryBrandTitle}}</div>
    <div class="brand-item" v-for="item in queryBrand" :key="item.brandId">
      <img class="brand-icon" v-lazy="item.brandLogo"  onerror='this.src="http://www.weinihaigou.com/m-images/error.jpg"' alt="" @load="imageLoad" >
      <div class="brand-title">{{item.brandName}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BrandList',
    props: {
      queryBrand: {
        type: Array,
        default() {
          return {}
        }
      },
      queryBrandTitle: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isLoad: 0
      }
    },
    methods: {
      imageLoad() {
        this.isLoad += 1;
        if (this.queryBrand.length == this.isLoad) {
          this.$emit('imageLoad')
        }
      }
    }
  }
</script>

<style lang='less' scoped>
  .brand-list{
    background-color: #f2f2f2;
    .brand-list-title{
      color: #333;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
    }
    .brand-item{
      background-color: #fff;
      height: 60px;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      padding: 0 20px;
      border-bottom: 1px solid #eee;
      .brand-icon{
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 1px solid #eee;
        margin-right: 20px;
      }
      .brand-title{
        font-size: 14px;
        color: #7a7a7a;
      }
    }
  }
</style>
