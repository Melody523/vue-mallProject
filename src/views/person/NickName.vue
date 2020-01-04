<template>
  <div class="nickname">
    <person-nav-bar title="昵称" control="保存" @saveNickname="saveNickname" />
    <div class="nickname-content">
      <div class="input-box">
        <input class="nickname-input" ref="nickname" :value="userMessage.nickName" type="text">
      </div>
    </div>
  </div>
</template>

<script>
  import PersonNavBar from './childComps/PersonNavBar'

  import userMixin from 'mixins/userMixin'

  import { saveUserDetail } from 'network/person'

  export default {
    name: 'Nickname',
    components: {
      PersonNavBar
    },
    mixins: [ userMixin ],
    created() {
      this.getUserMessage()
    },
    methods: {
      saveNickname() {
        if( !/^[\u4e00-\u9fa5a-zA-Z0-9\-\_]{4,16}$/.test(this.$refs.nickname.value.trim()) ) {
          this.$toast.show('昵称长度为4-16个字符，可由中英文，数字，"_"，"-"组成', 2000)
          return false
        }
        saveUserDetail(this.$refs.nickname.value).then(res => {
          console.log(res)
          if (res.success) {
            this.$router.replace('/profile')
          }
        }).catch(err => {
          console.log(err)
        })
        console.log(this.$refs.nickname.value)
      }
    }
  }
</script>

<style lang="less" scoped>
  .nickname{
    background-color: #f8f9fc;
    height: 100vh;
    position: relative;
    z-index: 2;
    .nickname-content{
      overflow-y: hidden;
      position: absolute;
      top: 44px;
      bottom: 0;
      left: 0;
      right: 0;
      .input-box{
        margin-top: 10px;
        height: 49px;
        padding: 10px 14px;
        background: #fff;
        .nickname-input{
          width: 80%;
          height: 28px;
          line-height: 28px;
          border: none;
          color: #6e6e6e;
          font-size: 16px;
        }
      }
    }
  }
</style>