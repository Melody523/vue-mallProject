<template>
  <div class="login">
    <login-header />
    <login-input :fromUrl="fromUrl" />
  </div>
</template>

<script>
  import LoginHeader from './childComps/LoginHeader'
  import LoginInput from './childComps/LoginInput'

  export default {
    name: 'Login',
    components: {
      LoginHeader,
      LoginInput
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
    }
  }
</script>

<style lang="less" scoped>
  .login{
    position: relative;
    background-color: #f8f9fc;
    height: 100vh;
    z-index: 3;
  }
</style>
