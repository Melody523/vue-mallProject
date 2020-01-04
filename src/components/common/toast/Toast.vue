<template>
  <div class="toast">
    <div class="message" v-show="isShow">{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, duration = 300) {
        this.isShow = true
        this.message = message
        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style lang="less" scoped>
  .toast{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    .message{
      padding: 10px 20px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 14px;
    }
  }
</style>
