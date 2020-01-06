<template>
  <div class="coupon">
    <coupon-nav-bar title="优惠券" @changeBtn="changeBtn" />
    <coupon-tab-bar :conpouTypeList="conpouTypeList" :currentType="currentType" @changeCouponType="changeCouponType" />
    <scroll class="coupon-content" ref="scroll" :probeType="3" @scroll="scroll" :pullUpLoad="true" @pullingUp="pullingUp">
      <coupon-list :conpouList="conpouList" />
      <img v-if="conpouList.length <= 0" class="no-img" src="http://www.weinihaigou.com/m-images/com-no-num.png" alt="">
      <page-end v-if="!hasNextPage && conpouList.length > 0" />
    </scroll>
    <delect v-show="isChange" @cancelDel="cancelDel" @confirmDel="confirmDel">
      <div slot="content" class="delect-header">
        <p class="title">兑换优惠券</p>
        <input class="change-input" type="text" v-model="couponCode">
      </div>
    </delect>
  </div>
</template>

<script>
  import { getMyConpou, getConpouByCode } from 'network/profile'

  import CouponNavBar from './childComps/CouponNavBar'
  import CouponTabBar from './childComps/CouponTabBar'
  import CouponList from './childComps/CouponList'

  import Scroll from 'components/common/scroll/Scroll'
  import Delect from 'components/content/delect/Delect'
  import PageEnd from 'components/content/pageEnd/PageEnd'

  import backtopMixin from 'mixins/backtopMixin'

  export default {
    name: 'Coupon',
    components: {
      Scroll,
      Delect,
      PageEnd,
      CouponNavBar,
      CouponTabBar,
      CouponList
    },
    mixins: [ backtopMixin ],
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
        currentType: 0,
        hasNextPage: true,
        isChange: false,
        couponCode: ''
      }
    },
    created() {
      this.getConpouList({pageNum: this.pageNum, status: this.currentType})
    },
    methods: {
      getConpouList(params) {
        getMyConpou(params).then(res => {
          console.log(res)
          this.conpouList.push(...res.result.userConpouList.list)
          this.hasNextPage = res.result.userConpouList.hasNextPage
          this.$refs.scroll.refresh()
          this.$refs.scroll.finishPullUp()
        }).catch(err => {
          console.log(err)
        })
      },
      pullingUp() {
        if (this.hasNextPage) {
          this.pageNum += 1
          this.getConpouList({pageNum: this.pageNum, status: this.currentType})
        }
      },
      changeCouponType(status) {
        this.currentType = status
        this.pageNum = 1
        this.conpouList = []
        this.getConpouList({pageNum: this.pageNum, status: this.currentType})
      },
      changeBtn() {
        this.isChange = true
      },
      cancelDel() {
        this.isChange = false
      },
      confirmDel() {
        if( this.couponCode.trim() == '' ) {
          this.$toast.show('请输入兑换码', 1500)
        } else {
          getConpouByCode({tattedCode: this.couponCode}).then(res => {
            if(res.success) {
              this.$toast.show('兑换成功', 1500)
              this.isChange = false
              this.getConpouList({pageNum: this.pageNum, status: this.currentType})
            } else {
              this.$toast.show(res.message, 1500)
            }
          })
        }
        
      }
    }
  }
</script>

<style lang="less" scoped>
  .coupon{
    position: relative;
    height: 100vh;
    z-index: 2;
    .coupon-content{
      background-color:  #f8f9fc;
      overflow-y: hidden;
      position: absolute;
      top: 88px;
      bottom: 0;
      left: 0;
      right: 0;
      .no-img{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -100%);
        width: 120px;
        height: auto;
        z-index: 1;
      }
    }
    .change-input{
      display: block;
      margin: 11px auto;
      width: 235px;
      height: 40px;
      padding: 0 10px;
      background-color: #eee;
      border: 1px solid #e6e6e6;
      border-radius: 6px;
      font-size: 15px;
    }
    .delect-header{
      .title{
        font-size: 19px;
        height: 26px;
        line-height: 26px;
        text-align: center;
      }
    }
  }
</style>
