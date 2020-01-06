<template>
  <div class="coupon-list">
    <ul v-if="conpouList.length > 0" class="coupon-list-content">
      <li class="coupon-item" v-for="item in conpouList" :key="item.couponId">
        <img class="coupon-item-bg" :src="item.status == 0 ? 'http://www.weinihaigou.com/m-images/coupon1.png' : 'http://www.weinihaigou.com/m-images/coupon2.png'" alt="">
        <div class="coupon-item-content">
          <div class="coupon-desc">
            <p class="coupon-name">{{item.couponName}}</p>
            <div class="use-limit">
              <p class="amount">满{{item.amount}}可用</p>
              <p class="coupon-tag">{{item.couponTag}}</p>
            </div>
          </div>
          <div class="time">
            <p>{{item.startTime + '-' + item.endTime}}</p>
            <p>{{item.status | conpouType}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'CouponList',
    props: {
      conpouList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    filters: {
      conpouType(value) {
        switch (value) {
          case 0:
            return '未使用'
            break;
          case 1:
            return '已使用'
            break;
          case 2:
            return '已过期'
            break;
          default:
            break;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .coupon-list{
    .coupon-list-content{
      .coupon-item{
        padding-top: 19px;
        position: relative;
        .coupon-item-bg{
          width: 338px;
          height: auto;
          display: block;
          margin: 0 auto;
        }
        .coupon-item-content{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          padding-top: 19px;
          .coupon-desc{
            height: 63px;
            padding: 0 28px;
            color: #fff;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .coupon-name{

            }
            .use-limit{
              width: 100px;
              text-align: center;
              .amount{

              }
              .coupon-tag{
                font-size: 12px;
              }
            }
          }
          .time{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 28px 0 30px;
            height: 25px;
            p{
              color: #000;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>
