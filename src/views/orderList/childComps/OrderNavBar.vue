<template>
  <div class="order-nav-bar">
    <ul class="nav-list">
      <li class="nav-item" 
          v-for="item in orderNavList" 
          :key="item.type" 
          :class="{'active': item.type == currentOrderType}"
          @click="changeOrderType(item.type)"
      >{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'OrderNavBar',
    props: {
      orderNavList: {
        type: Array,
        default() {
          return []
        }
      },
      currentOrderType: {
        type: Number,
        default: 0
      }
    },
    methods: {
      changeOrderType(type) {
        this.$emit('changeOrderType', type)
      }
    }
  }
</script>

<style lang="less" scoped>
  .order-nav-bar{
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
