<template>
  <div class="set-psw">
    <main-nav-bar title="找回密码" />
    <div class="set-psw-content">
      <div class="input-box">
        <input class="psw-input" v-model="newPsw_1" type="password" placeholder="请设置6-20位新的登录密码">
        <input class="psw-input" v-model="newPsw_2" type="password" placeholder="请再次输入密码">
      </div>
      <p class="tips">备注：请将密码设置为6-20位，可由字母、数字和符号组成</p>
      <div class="confirm-btn" @click="confirmBtn">下一步</div>
    </div>
  </div>
</template>

<script>
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'

  import { findPwdByUpdate } from 'network/login'

  export default {
    name: 'SetPsw',
    components: {
      MainNavBar
    },
    data() {
      return {
        newPsw_1: '',
        newPsw_2: '',
        sign: '',
        id: '',
        code: ''
      }
    },
    created() {
      this.sign = this.$route.query.sign
      this.id = this.$route.query.id
      this.code = this.$route.query.code
    },
    methods: {
      confirmBtn() {
        if (/^\w{6,20}$/.test(this.newPsw_1.trim())) {
          if (/^\w{6,20}$/.test(this.newPsw_2.trim())) {
            if (this.newPsw_1.trim() == this.newPsw_2.trim()) {
              this.$store.dispatch('getKey',{
                password: this.newPsw_1.trim()
              }).then(data => {
                return data
              }).then(re_newPsw_1 => {
                this.$store.dispatch('getKey',{
                  password: this.newPsw_2.trim()
                }).then(data => {
                  findPwdByUpdate({id: this.id, code: this.code, sign: this.sign, pwd: re_newPsw_1, newPwd: data}).then(res => {
                    console.log(res)
                    if (res.msg=='00000000') {
                      this.$router.push('/setPswSuccess')
                    } else {
                      this.$toast.show('修改密码失败', 1500)
                    }
                  }).catch(err => {
                    console.log(err)
                  })
                })
              })
            } else {
              this.$toast.show('两次密码不一致', 1500)
            }
          } else {
            this.$toast.show('密码为空或者格式不正确（长度在6-20位之间）', 1500)
          }
        } else {
          this.$toast.show('密码为空或者格式不正确（长度在6-20位之间）', 1500)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .set-psw{
    background-color: #f8f9fc;
    height: 100vh;
    position: relative;
    z-index: 2;
    .set-psw-content{
      overflow-y: hidden;
      position: absolute;
      top: 44px;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20px 15px;
      .input-box{
        .psw-input{
          height: 46px;
          border: 1px solid #ebebeb;
          background: #fff;
          padding: 9px 12px;
          width: 100%;
          margin-top: 10px;
        }
      }
      .tips{
        color: #000;
        font-size: 13px;
        margin-top: 10px;
      }
      .confirm-btn{
        width: 100%;
        margin-top: 30px;
        height: 50px;
        line-height: 50px;
        background-color: #9f2e33;
        text-align: center;
        border-radius: 3px;
        font-size: 17px;
        color: #fff;
      }
    }
  }
</style>