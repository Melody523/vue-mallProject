<template>
  <div class="register">
    <main-nav-bar title="唯妮用户注册" />
    <div class="register-content">
      <div class="input-container">
        <input class="input" type="number" v-model.trim="userAcount" minlength="11" maxlength="11" placeholder="请输入11位手机号">
        <input class="input" :type="showPsw?'text':'password'" v-model="password" minlength="6" maxlength="20" placeholder="请输入6-20位登录密码">
        <span @click="togglePsw" class="show-psw">{{showPsw ? '隐藏' : '显示'}}</span>
      </div>
      <div class="verification-code">
        <input class="input" v-model="verification" type="text" placeholder="请输入短信验证码">
        <span class="get-verification-code" :class="{'disabled': disabled}" @click="getVerificationCode">获取短信验证码<span v-show="disabled">({{countDown}})</span></span>
      </div>
      <p class="agree">注册即视为同意<span class="agreement" @click="toProtocol">《唯妮海购用户注册协议》</span></p>
      <div class="register-btn" @click="register">立即注册</div>
      <p class="has-acount" @click="goBack">已有唯妮账户></p>
    </div>
  </div>
</template>

<script>
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'

  import { sendMoRandmoCode, getpublickey, userRegister } from 'network/login'

  import md5 from '@/utils/md5'

  export default {
    name: 'Register',
    components: {
      MainNavBar
    },
    data() {
      return {
        showPsw: false,
        userAcount: '',
        password: '',
        verification: '',
        disabled: false,
        countDown: 60
      }
    },
    methods: {
      toProtocol() {
        this.$router.push('/protocol')
      },
      goBack() {
        this.$router.go(-1)
      },
      togglePsw() {
        this.showPsw = !this.showPsw
      },
      getVerificationCode() {
        if (/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.userAcount.trim()) && !this.disabled) {
          sendMoRandmoCode(this.userAcount, 2).then(res => {
            if (res.success) {
              this.$toast.show('已发送，请注意查收', 1500)
              this.disabled = true
              let timer = setInterval(() => {
              this.countDown --
              if(this.countDown == 0) {
                this.disabled = false
                this.countDown = 60
                clearInterval(timer)
              }
            }, 1000)
            } else {
              this.$toast.show('用户名已存在', 1500)
            }
          }).catch(err => {
            console.log(err)
          })
        } else if(this.userAcount.toString().length != 11) {
           this.$toast.show('手机号为空或者格式不正确', 1500)
        }
      },
      register() {
        if (!/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.userAcount.trim())) {
          this.$toast.show('手机号为空或者格式不正确', 1500)
        } else if(this.password.toString().length < 6 || this.password.toString().length > 20) {
          this.$toast.show('请按照规则设置密码', 1500)
        } else if(this.verification.toString().length != 4) {
          this.$toast.show('输入的验证码有误', 1500)
        } else {
          this.$store.dispatch('getKey',{
            password: this.password
          }).then(data => {
            let referrer = document.referrer
            let shareCode = referrer.indexOf('?')>0?referrer.substring(referrer.indexOf('?')+1):""
            userRegister({mobile: this.userAcount, password: data, code: this.verification, shareCode: shareCode}).then((res) => {
              if(res.msg == '00000000') {
                this.$toast.show('恭喜你，注册成功啦 ^!^', 1500)
                this.$store.dispatch('updateUserMessage_1', {
                  userMessage: res.result,
                  isLogin: true
                })
                this.$router.replace('/home')
              } else if (res.msg == '00000001') {
                this.$toast.show('注册失败', 1500)
              } else if (res.msg == '00000005') {
                this.$toast.show('手机号已经被注册', 1500)
              } else if (res.msg == '00000006') {
                this.$toast.show('短信验证码错误', 1500)
              } else {
                this.$toast.show(res.msg, 1500)
              }
              console.log(res)
            }).catch(err => {
              console.log(err)
            })
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .register{
    position: relative;
    background-color: #f8f9fc;
    height: 100vh;
    z-index: 3;
    .register-content{
      padding: 18px;
    }
    .input-container{
      border: 1px solid #b5b5b5;
      padding: 15px;
      background-color: #fff;
      position: relative;
      .input{
        border: 0 none;
        width: 100%;
        height: 40px;
        background: url(http://www.weinihaigou.com/m-images/icon.png) 0 9px no-repeat;
        background-size: 90%;
        padding: 10px 60px 10px 26px;
        &:last-of-type{
          background-position: 0 -55px;
          border-top: 1px solid #eee;
        }
      }
      .show-psw{
        position: absolute;
        right: 24px;
        bottom: 20px;
        font-size: 13px;
        color: #535353;
        padding: 6px 9px;
        background: #dddcdc;
        border-radius: 3px;
      }
    }
    .verification-code{
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      .input{
        width: 60%;
        padding: 0 15px;
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
        padding: 0 10px;
        height: 47px;
        line-height: 47px;
        border-radius: 3px;
      }
      .disabled{
        background: #b1b1b1;
        color: #fff;
      }
    }
    .agree{
      margin-top: 10px;
      font-size: 13px;
      color: #000;
      .agreement{
        color: #f48679;
      }
    }
    .register-btn{
      margin-top: 28px;
      height: 52px;
      line-height: 52px;
      background-color: #9f2e33;
      text-align: center;
      border-radius: 3px;
      font-size: 18px;
      color: #fff;
    }
    .has-acount{
      padding-top: 10px;
      text-align: center;
      color: #9f2e33;
      font-size: 14px;
    }
  }
</style>
