<template>
  <div id="app">
    <keep-alive include="Home,Category,Country,BrandSearch">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabBar/MainTabBar'
  import { indexHotList } from "network/home"

  export default {
    components: {
      MainTabBar
    },
    created() {
      this.getIndexHotList()
    },
    methods: {
      getIndexHotList() {
        indexHotList(this).then(res => {
          
        })
      }
    }
  }
</script>

<style>
  @import "assets/css/base.css";
  @import "assets/css/style.css";
</style>
