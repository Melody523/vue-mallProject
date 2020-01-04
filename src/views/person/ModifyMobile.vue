<template>
  <div class="modify-mobile">
    <main-nav-bar title="个人信息" />
    <div class="modify-mobile-content">
      <p class="hide-mobile">已绑定:<span>{{userMessage.hideMobile}}</span></p>
      <div class="change-btn" @click="showTip">更换手机号</div>
    </div>
    <div class="mask" v-show="isShow"></div>
    <div class="pop-main" v-show="isShow">
      <div class="tip-main">
        <p class="title">验证手机号</p>
        <p class="detail">请输入尾号{{userMessage.hideMobile && userMessage.hideMobile.substr(7)}}接受的短信验证码</p>
        <div class="input-box">
          <input class="code" type="number" v-model="verifyCode" placeholder="请输入短信验证码">
          <div class="get-btn" :class="{'disabled': isCount}" @click="resendCode">重新发送({{countDown}}s)</div>
        </div>
      </div>
      <div class="control-btn">
        <div class="cancel-btn" @click="cancelBtn">取消</div>
        <div class="confirm-btn" @click="confirmBtn">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'

  import userMixin from 'mixins/userMixin'

  import { sendMoRandmoCode, checkMobileCodePwd } from 'network/person'

  export default {
    name: 'ModifyMobile',
    components: {
      MainNavBar
    },
    mixins: [ userMixin ],
    data() {
      return {
        isShow: false,
        countDown: 60,
        isCount: true,
        timer: null,
        verifyCode: null
      }
    },
    created() {
      this.getUserMessage()
    },
    methods: {
      showTip() {
        this.isShow = true
        this.countDown = 60
        clearInterval(this.timer)
        sendMoRandmoCode(1).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
        this.timer = setInterval(() => {
          this.countDown--
          if (this.countDown == 0) {
            this.countDown = 60
            clearInterval(this.timer)
            this.isCount = false
          }
        }, 1000)
      },
      resendCode() {
        if (!this.isCount) {
          this.countDown = 60
          clearInterval(this.timer)
          this.isCount = true
          this.timer = setInterval(() => {
            this.countDown--
            if (this.countDown == 0) {
              this.countDown = 60
              clearInterval(this.timer)
              this.isCount = false
            }
          }, 1000)
        }
      },
      cancelBtn() {
        this.isShow = false
      },
      confirmBtn() {
        if (this.verifyCode == '' || this.verifyCode == null) {
          this.$toast.show('输入的验证码有误')
        } else {
          // this.$router.push('/modifyMobileSuccess?sign=' + 'gTFYy2wAd7cASZRHJ1VpRNQzRallHJhIvN17dThSvzhBjr/z6BAE1DS+EVt4TISCK6s40JtQSocUKz7WAQmJZrJs6d5EoVyxPnaPW+v3XBtQeLWxW7wdjt/6teR0veSyhp/wKQGE5CJdJc4cOnlRuEmdS1hi89z8Wt9vVSmL4Mk=')
          checkMobileCodePwd(this.verifyCode.trim()).then(res => {
            console.log(res)
            if (!res.success) {
              this.$toast.show(res.message, 1500)
            } else {
              this.$router.push('/modifyMobileSuccess?sign=' + res.result)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .modify-mobile{
    background-color: #f8f9fc;
    height: 100vh;
    position: relative;
    z-index: 2;
    .modify-mobile-content{
      overflow-y: hidden;
      position: absolute;
      top: 44px;
      bottom: 0;
      left: 0;
      right: 0;
      .hide-mobile{
        color: #000;
        padding: 30px 15px;
        font-size: 14px;
        text-align: center;
        span{
          font-size: 20px;
        }
      }
      .change-btn{
        width: 90%;
        height: 50px;
        line-height: 50px;
        margin: 0 auto;
        background-color: #9f2e33;
        text-align: center;
        border-radius: 3px;
        font-size: 16px;
        color: #fff;
      }
    }
    .pop-main{
      background-color: #fff;
      width: 80%;
      border-radius: 4px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .tip-main{
        padding: 20px 20px 15px;
        .title{
          height: 25px;
          line-height: 25px;
          font-size: 18px;
          color: #000;
          text-align: center;
        }
        .detail{
          margin: 13px 0;
          font-size: 15px;
          color: #000;
          text-align: center;
        }
        .input-box{
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          .code{
            width: 146px;
            height: 39px;
            border: 1px solid #e6e6e6;
            background: #eee;
            color: #000;
            border-radius: 3px;
            padding: 0 9px;
          }
          .get-btn{
            border-radius: 3px;
            background-color: #000;
            font-size: 14px;
            text-align: center;
            color: #fff;
            padding: 7px 8px;
          }
          .disabled{
            background-color: #bbb;
          }
        }
      }
      .control-btn{
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        color: #000;
        border-top: 1px solid #e5e5e5;
        .cancel-btn{
          height: 50px;
          line-height: 50px;
          flex: 1;
          text-align: center;
          border-right: 1px solid #e5e5e5;
        }
        .confirm-btn{
          height: 50px;
          line-height: 50px;
          flex: 1;
          text-align: center;
          color: #ac575a;
        }
      }
    }
  }
</style>
