<template>
  <div class="from-address">
    <address-nav-bar title="收货地址" control="添加新地址" />
    <scroll class="from-address-content" ref="scroll" :probeType="3" @scroll="scroll" >
      <address-list :addressList="addressList" />
    </scroll>
    <back-top v-show="showBackTop" @click.native="backTop" />
  </div>
</template>

<script>
  import { addressMo } from 'network/address.js'

  import Scroll from 'components/common/scroll/Scroll'

  import AddressNavBar from './childComps/AddressNavBar'
  import AddressList from './childComps/AddressList'

  import backtopMixin from 'mixins/backtopMixin'

  export default {
    name: 'FromAddress',
    components: {
      Scroll,
      AddressNavBar,
      AddressList
    },
    mixins: [backtopMixin],
    data() {
      return {
        addressList: []
      }
    },
    created() {
      this.getAddressMo()
    },
    methods: {
      getAddressMo() {
        addressMo().then(res => {
          console.log(res)
          this.addressList = res.result
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .from-address{
    position: relative;
    height: 100vh;
    z-index: 2;
    background-color: #f8f9fc;
    .from-address-content{
      overflow-y: hidden;
      position: absolute;
      top: 44px;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>
