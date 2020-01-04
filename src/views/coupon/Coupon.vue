<template>
  <div class="coupon">
    <coupon-nav-bar title="优惠券" />
    <coupon-tab-bar :conpouTypeList="conpouTypeList" :currentType="currentType" @changeCouponType="changeCouponType" />
  </div>
</template>

<script>
  import { getMyConpou } from 'network/profile'

  import CouponNavBar from './childComps/CouponNavBar'
  import CouponTabBar from './childComps/CouponTabBar'

  export default {
    name: 'Coupon',
    components: {
      CouponNavBar,
      CouponTabBar
    },
    data() {
      return {
        pageNum: 1,
        status: 0,
        conpouList: [],
        conpouTypeList: [
          {
            status: 0,
            title: '未使用'
          },
          {
            status: 1,
            title: '已使用'
          },
          {
            status: 2,
            title: '已过期'
          }
        ],
        currentType: 0
      }
    },
    created() {
      this.getConpouList({pageNum: this.pageNum, status: this.status})
    },
    methods: {
      getConpouList(params) {
        getMyConpou(params).then(res => {
          console.log(res)
          this.conpouList = res.result.list
        }).catch(err => {
          console.log(err)
        })
      },
      changeCouponType(status) {
        this.currentType = status
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
