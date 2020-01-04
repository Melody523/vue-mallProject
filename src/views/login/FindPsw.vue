<template>
  <div class="find-psw">
    <main-nav-bar title="找回密码" />
    <div class="find-psw-content">
      <div class="input-container">
        <input class="input" type="number" v-model.trim="userAcount" minlength="11" maxlength="11" placeholder="请输入11位手机号">
      </div>
      <div class="verification-code">
        <input class="input" v-model="verification" type="text" placeholder="请输入短信验证码">
        <span class="get-verification-code" :class="{'disabled': disabled}" @click="getVerificationCode">{{disabled?countDown+'s 后重新发送':'获取短信验证码'}}</span>
      </div>
      <div class="next-btn" @click="nextState">下一步</div>
    </div>
  </div>
</template>

<script>
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'

  import { checkMoMobile, checkMobileCodePwd } from 'network/login'

  export default {
    name: 'FindPsw',
    components: {
      MainNavBar
    },
    data() {
      return {
        userAcount: '',
        verification: '',
        disabled: false,
        countDown: 60,
        id: ''
      }
    },
    methods: {
      getVerificationCode() {
        if (/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.userAcount.trim()) && !this.disabled) {
          this.disabled = true
          let timer = setInterval(() => {
            this.countDown --
            if(this.countDown == 0) {
              this.disabled = false
              this.countDown = 60
              clearInterval(timer)
            }
          }, 1000)
          checkMoMobile(this.userAcount).then(res => {
            if (res.msg == '00000000') {
              this.id = res.id
              this.$toast.show('已发送，请注意查收', 1500)
            } else if (res.msg =='00000003') {
              this.$toast.show('该手机号未注册', 1500)
            } else if (res.msg =='000000019') {
              this.$toast.show('短信验证码发送次数已达上限', 1500)
            } else if (res.msg =='00000007') {
              this.$toast.show('手机号格式错误', 1500)
            } else if (res.msg =='00000001') {
              this.$toast.show('验证码发送失败', 1500)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.$toast.show('手机号为空或者格式不正确', 1500)
        }
      },
      nextState() {
        if (/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.userAcount.trim())) {
          checkMobileCodePwd({ id: this.id, mobile: this.userAcount, code: this.verification }).then(res => {
            if(!res.success) {
              this.$toast.show(res.message, 1000)
            } else {
              this.$router.push('/setPsw?sign=' + res.result + '&id=' + this.id + '&code=' + this.verification)
            }
          })
        } else {
          this.$toast.show('手机号为空或者格式不正确', 1500)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .find-psw{
    position: relative;
    background-color: #f8f9fc;
    height: 100vh;
    z-index: 3;
    .find-psw-content{
      padding: 18px;
      .input-container{
        border: 1px solid #b5b5b5;
        padding-left: 15px;
        background-color: #fff;
        .input{
          border: 0 none;
          width: 100%;
          height: 47px;
          background: url(http://www.weinihaigou.com/m-images/icon.png) 0 13px no-repeat;
          background-size: 90%;
          padding: 10px 0 10px 26px;
        }
      }
      .verification-code{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        .input{
          width: 60%;
          padding: 0 10px;
          border: 1px solid #b5b5b5;
          border-radius: 0;
          font-size: 13px;
        }
        .get-verification-code{
          display: block;
          background-color: #363539;
          color: #fff;
          font-size: 13px;
          text-align: center;
          padding: 0 15px;
          height: 47px;
          line-height: 47px;
          border-radius: 3px;
        }
        .disabled{
          background: #b1b1b1;
          color: #fff;
        }
      }
      .next-btn{
        margin-top: 28px;
        height: 52px;
        line-height: 52px;
        background-color: #9f2e33;
        text-align: center;
        border-radius: 3px;
        font-size: 18px;
        color: #fff;
      }
    }
  }
</style>
