<template>
  <div class="coupon-tab-bar">
    <ul class="nav-list">
      <li class="nav-item" 
          v-for="item in conpouTypeList" 
          :key="item.status" 
          :class="{'active': item.status == currentType}"
          @click="changeCouponType(item.status)"
      >{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'OrderNavBar',
    props: {
      conpouTypeList: {
        type: Array,
        default() {
          return []
        }
      },
      currentType: {
        type: Number,
        default: 0
      }
    },
    methods: {
      changeCouponType(status) {
        this.$emit('changeCouponType', status)
      }
    }
  }
</script>

<style lang="less" scoped>
  .coupon-tab-bar{
    height: 44px;
    .nav-list{
      display: flex;
      align-items: center;
      .nav-item{
        flex: 1;
        text-align: center;
        color: #1a1a1a;
        border-bottom: 2px solid #fff;
        font-size: 15px;
        height: 44px;
        line-height: 44px;
        margin: 0 5px;
      }
      .active{
        border-bottom: 2px solid #bc4344;
      }
    }
  }
</style>
