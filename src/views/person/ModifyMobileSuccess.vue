<template>
  <div class="modify-mobile-success">
    <main-nav-bar title="修改绑定手机号" />
    <div class="modify-mobile-success-content">
      <div class="input-box">
        <input class="mobile-input" type="number" v-model="mobile" placeholder="请输入新手机号">
        <div class="code-box">
          <input class="code-input" type="number" v-model="code" placeholder="请输入短信验证码">
          <div class="get-btn" :class="{'disabled': isCount}" @click="getCode">{{getTimes >= 1 ? '重新获取('+countDown+'s)' : '获取短信验证码' }}</div>
        </div>
      </div>
      <div class="change-btn" @click="confirmChange">确认更换</div>
      <div class="tip-main">
        <h2>温馨提示：</h2>
        <p>1.手机号绑定成功即被视为已注册；</p>
        <p>2.一个手机号仅限绑定一个唯妮海购账号；</p>
        <p>3.为保证账号安全，手机号注册后无法解除绑定，可以更换手机号。</p>
      </div>
    </div>
  </div>
</template>

<script>
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'

  import userMixin from 'mixins/userMixin'

  import { randomCodeUpdateCell, updateCellByCell } from 'network/person'

  export default {
    name: 'ModifyMobileSuccess',
    components: {
      MainNavBar
    },
    mixins: [ userMixin ],
    data() {
      return {
        mobile: '',
        code: '',
        sign: '',
        countDown: 60,
        isCount: false,
        timer: null,
        getTimes: 0
      }
    },
    created() {
      this.getUserMessage()
      this.sign = this.$route.query.sign
    },
    methods: {
      confirmChange() {
        if (this.code == '') {
          this.$toast.show('输入的验证码有误')
        } else {
          updateCellByCell({code: this.code, mobile: this.mobile, sign: this.sign}).then(res => {
            console.log(res)
            if (!res.success) {
              this.$toast.show(res.message, 1500)
            } else {
              this.$router.replace('/profile')
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      getCode() {
        if (!this.isCount) {
          if (/^0?1[3|4|5|7|8][0-9]\d{8}$/.test(this.mobile.trim())) {
            randomCodeUpdateCell({mobile: this.mobile, sign: this.sign}).then(res => {
              console.log(res)
              if (res.success) {
                this.countDown = 60
                clearInterval(this.timer)
                this.isCount = true
                this.getTimes++
                this.timer = setInterval(() => {
                  this.countDown--
                  if (this.countDown == 0) {
                    this.countDown = 60
                    clearInterval(this.timer)
                    this.isCount = false
                  }
                }, 1000)
              } else {
                this.$toast.show(res.message, 1500)
              }
            }).catch(err => {
              console.log(err)
            })
					} else {
            this.$toast.show('手机号为空或者格式不正确', 1500)
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .modify-mobile-success{
    background-color: #f8f9fc;
    height: 100vh;
    position: relative;
    z-index: 2;
    .modify-mobile-success-content{
      overflow-y: hidden;
      position: absolute;
      top: 44px;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 19px;
      .input-box{
        .mobile-input{
          height: 46px;
          border: 1px solid #ebebeb;
          background: #fff;
          padding: 9px 12px;
          width: 100%;
        }
        .code-box{
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
          .code-input{
            height: 46px;
            border: 1px solid #ebebeb;
            background: #fff;
            padding: 9px 12px;
            width: 200px;
          }
          .get-btn{
            width: 118px;
            background-color: #363539;
            color: #fff;
            font-size: 13px;
            text-align: center;
            height: 46px;
            line-height: 46px;
            border-radius: 3px;
          }
          .disabled{
            background-color: #bbb;
          }
        }
      }
      .change-btn{
        margin-top: 30px;
        height: 50px;
        line-height: 50px;
        background-color: #9f2e33;
        text-align: center;
        border-radius: 3px;
        font-size: 17px;
        color: #fff;
      }
      .tip-main{
        margin-top: 80px;
        color: #605f62;
        h2{
          font-size: 15px;
          line-height: 24px;
          font-weight: normal;
        }
        p{
          font-size: 13px;
          line-height: 20px;
        }
      }
      
    }
  }
</style>