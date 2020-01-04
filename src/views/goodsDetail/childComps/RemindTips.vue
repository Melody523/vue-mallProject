<template>
  <div class="remind-tips" v-if="userMessage.userName">
    <div class="mask"></div>
    <div class="remind-tips-content">
      <div class="remind-tips-top">
        <p class="title">设置到货通知</p>
        <p class="desc">商品到货，唯妮酱会第一时间通知您</p>
        <div class="input-box">
          <input class="mobile-input" ref="mobile" type="number" v-model="userMessage.mobile">
          <span class="icon" @click="clearInput" v-show="userMessage.mobile.length" >&times;</span>
        </div>
      </div>
      <div class="remind-tips-bottom">
        <div class="cancel-btn" @click="hideRemind">取消</div>
        <div class="confirm-btn" @click="remindConfirmBtn">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RemindTips',
    props: {
      userMessage: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        isShow: true
      }
    },
    methods: {
      hideRemind() {
        this.$emit('hideRemind')
      },
      clearInput() {
        this.userMessage.mobile = ''
        this.isShow = false
      },
      remindConfirmBtn() {
        this.$emit('remindConfirmBtn', this.$refs.mobile.value)
      }
    }
  }
</script>

<style lang="less" scoped>
  .remind-tips{
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    .remind-tips-content{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 300px;
      background: #fff;
      border-radius: 5px;
      text-align: center;
      .remind-tips-top{
        .title{
          padding: 14px 0;
          color: #9f2e33;
          font-size: 16px;
          text-align: center;
        }
        .desc{
          font-size: 14px;
          color: #000;
          text-align: center;
        }
        .input-box{
          position: relative;
          margin: 15px 0;
          .mobile-input{
            display: block;
            margin: 0 auto;
            width: 226px;
            height: 30px;
            padding: 0 14px;
            line-height: 30px;
            background: rgba(242,242,242,1);
            border-radius: 30px;
            border: none;
          }
          .icon{
            position: absolute;
            right: 45px;
            top: 50%;
            transform: translate(0, -50%);
            display: block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            background-color: #cdcdcd;
            color: #fff;
            text-align: center;
            border-radius: 50%;
          }
        }
      }
      .remind-tips-bottom{
        border-top: 1px solid #ddd;
        height: 37px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .cancel-btn{
          flex: 1;
          height: 37px;
          line-height: 37px;
          text-align: center;
          background-color: #fff;
          color: #333;
          font-size: 14px;
        }
        .confirm-btn{
          flex: 1;
          height: 37px;
          line-height: 37px;
          text-align: center;
          background-color: rgba(240,91,26,1);
          color: #fff;
          font-size: 14px;
        }
      }
    }
  }
</style>
