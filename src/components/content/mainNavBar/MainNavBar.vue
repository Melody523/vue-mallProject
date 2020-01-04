<template>
  <div class="main-nav-bar">
    <nav-bar>
      <div slot="left" class="left" @click="goBack">
        <img class="back-icon" src="~assets/img/common/left.svg" alt="">
      </div>
      <div slot="center" class="title">
        {{title}}
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'MainNavBar',
    components: {
      NavBar
    },
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        fromUrl: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        //因为当钩子执行前，组件实例还没被创建
        // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
        vm.fromUrl = from.fullPath
      })
    },
    methods: {
      goBack() {
        this.$router.go(-1)
        // if (this.fromUrl = '/login') {
        //   this.$router.push('/profile')
        // } else {
        //   this.$router.go(-1)
        // }
      }
    }
  }
</script>

<style lang="less" scoped>
  .main-nav-bar{
    box-shadow: 0 0 2px #ddd;
    background-color: #fff;
    .left{
      width: 50px;
    }
    .back-icon{
      display: block;
      margin: 0 auto;
      width: 40px;
      height: 40px;
    }
    .title{
      font-size: 18px;
      font-weight: bold;
      color: #000;
      text-align: center;
      flex: 1;
    }
  }
</style>
