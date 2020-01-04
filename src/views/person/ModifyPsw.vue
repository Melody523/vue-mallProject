<template>
  <div class="modify-psw">
    <main-nav-bar title="修改密码" />
    <div class="modify-psw-content">
      <div class="input-box">
        <input class="psw-input" v-model="oldPsw" type="password" placeholder="原密码">
        <input class="psw-input" v-model="newPsw" type="password" placeholder="新密码">
      </div>
      <p class="tips">备注：请将密码设置为6-20位，可由字母、数字和符号组成</p>
      <div class="confirm-btn" @click="confirmBtn">完成</div>
    </div>
  </div>
</template>

<script>
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'

  import userMixin from 'mixins/userMixin'

  import { updateMoPwdByPwd } from 'network/person'

  export default {
    name: 'ModifyPsw',
    components: {
      MainNavBar
    },
    mixins: [ userMixin ],
    data() {
      return {
        oldPsw: '',
        newPsw: ''
      }
    },
    created() {
      this.getUserMessage()
    },
    methods: {
      confirmBtn() {
        if (/^\w{6,20}$/.test(this.oldPsw.trim())) {
          if (/^\w{6,20}$/.test(this.newPsw.trim())) {
            if (this.oldPsw.trim() != this.newPsw.trim()) {
              this.$store.dispatch('getKey',{
                password: this.oldPsw.trim()
              }).then(data => {
                return data
              }).then(re_oldPsw => {
                this.$store.dispatch('getKey',{
                  password: this.newPsw.trim()
                }).then(data => {
                  updateMoPwdByPwd({oldPwd: re_oldPsw, newPwd: data}).then(res => {
                    console.log(res)
                    if (res.success) {
                      this.$router.push('/modifyPswSuccess')
                    } else {
                      this.$toast.show(res.message, 1500)
                    }
                  }).catch(err => {
                    console.log(err)
                  })
                })
              })
            } else {
              this.$toast.show('新密码不能与旧密码相同', 1500)
            }
          } else {
            this.$toast.show('新密码为空或者格式不正确（长度在6-20位之间）', 1500)
          }
        } else {
          this.$toast.show('原密码为空或者格式不正确（长度在6-20位之间）', 1500)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .modify-psw{
    background-color: #f8f9fc;
    height: 100vh;
    position: relative;
    z-index: 2;
    .modify-psw-content{
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