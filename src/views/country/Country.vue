<template>
  <div class="country">
    <main-nav-bar title="国家馆" />
    <scroll class="country-content" ref="scroll" :probeType="3" @scroll="scroll" >
      <new-subject :newSubject="countryList" />
    </scroll>
    <back-top v-show="showBackTop" @click.native="backTop" />
  </div>
</template>

<script>
  import { queryCountryList } from "network/country"

  import Scroll from 'components/common/scroll/Scroll'

  import MainNavBar from 'components/content/mainNavBar/MainNavBar'
  import NewSubject from 'components/content/newSubject/NewSubject'

  import backtopMixin from 'mixins/backtopMixin'

  export default {
    name: 'Country',
    components: {
      Scroll,
      MainNavBar,
      NewSubject
    },
    mixins: [backtopMixin],
    data() {
      return {
        countryList: []
      }
    },
    created() {
      this.getQueryCountryList()
    },
    methods: {
      getQueryCountryList() {
        queryCountryList().then(res => {
          this.countryList = res.result
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .country{
    position: relative;
    height: 100vh;
  }
  .country-content{
    overflow-y: hidden;
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: #fff;
  }
</style>
