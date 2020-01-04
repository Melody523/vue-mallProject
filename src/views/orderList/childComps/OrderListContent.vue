<template>
  <div class="order-list-content">
    <ul class="order-list" v-if="orderList.length">
      <li class="ordere-item" v-for="item in orderList" :key="item.id">

      </li>
    </ul>
    <img v-else class="no-img" src="http://www.weinihaigou.com/m-images/no-order.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'OrderListContent',
    props: {
      orderList: {
        type: Array,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .order-list-content{
    position: relative;
    height: 100%;
    .no-img{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -100%);
      width: 85px;
      height: auto;
    }
  }
</style>
