<template>
  <div class="login-input">
    <div class="input-container">
      <input class="input" type="number" v-model.trim="userAcount" minlength="11" maxlength="11" placeholder="请输入账号">
        <input class="input" type="password" v-model="password" minlength="6" maxlength="20" placeholder="请输入密码">
    </div>
    <div class="login-btn" @click="loginAcount">登录</div>
    <div class="register-findpsw">
      <span class="register" @click="toRegister">注册帐号</span>
      <span class="find-psw" @click="toFindPsw">忘记密码？</span>
    </div>
    <div class="other-login">
      <img class="separator" src="http://www.weinihaigou.com/m-images/other-login.jpg" alt="">
      <img class="icon" src="~assets/img/common/weibo.svg" alt="">
    </div>
  </div>
</template>

<script>
  import { login } from 'network/login'

  export default {
    name: 'LoginInput',
    props: {
      fromUrl: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        userAcount: '',
        password: ''
      }
    },
    methods: {
      toRegister() {
        this.$router.push('/register')
      },
      toFindPsw() {
        this.$router.push('/findPsw')
      },
      loginAcount() {
        if (!/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.userAcount.trim())) {
          this.$toast.show('手机号为空或者格式不正确', 1500)
        } else if(this.password.toString().length < 6 || this.password.toString().length > 20) {
          this.$toast.show('输入的密码有误', 1500)
        } else {
          this.$store.dispatch('getKey',{
            password: this.password
          }).then(data => {
            login(this.userAcount, data).then(res => {
              if (!res.success) {
                this.$toast.show(res.message, 1500)
              } else {
                this.$store.dispatch('updateUserMessage_1', {
                  userMessage: res.result,
                  isLogin: true
                })
                if (this.fromUrl.indexOf('/register') == -1 && this.fromUrl.indexOf('/findPsw') == -1 && this.fromUrl.indexOf('/setPsw') == -1 && this.fromUrl.indexOf('/setPswSuccess') == -1) {
                  this.$router.push(this.fromUrl)
                } else {
                  this.$router.replace('/profile')
                }
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
  .login-input{
    width: 100%;
    padding: 18px;
    .input-container{
      border: 1px solid #b5b5b5;
      padding: 15px;
      background-color: #fff;
      input::-webkit-input-placeholder {
        color: #ccc;
        font-size: 14px;
      }
      input::-moz-input-placeholder {
        color: #ccc;
        font-size: 14px;
      }
      input::-ms-input-placeholder {
        color: #ccc;
        font-size: 14px;
      }
      input:focus{
        outline:none;
      }
      .input{
        border: 0 none;
        width: 100%;
        height: 40px;
        background: url(http://www.weinihaigou.com/m-images/icon.png) 0 9px no-repeat;
        background-size: 90%;
        padding: 10px 0 10px 26px;
        &:last-of-type{
          background-position: 0 -55px;
          border-top: 1px solid #eee;
        }
      }
    }
    .login-btn{
      margin-top: 20px;
      height: 52px;
      line-height: 52px;
      background-color: #9f2e33;
      text-align: center;
      border-radius: 3px;
      font-size: 18px;
      color: #fff;
    }
    .register-findpsw{
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: #000;
      .register{
        flex: 1;
        text-align: left;
        color: #9f2e33;
      }
      .find-psw{
        flex: 1;
        text-align: right;
      }
    }
    .other-login{
      margin-top: 58px;
      .separator{
        width: 100%;
        height: auto;
      }
      .icon{
        width: 30px;
        height: 30px;
        display: block;
        margin: 15px auto;
      }
    }
  }
</style>
