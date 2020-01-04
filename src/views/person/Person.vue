<template>
  <div class="person">
    <main-nav-bar title="个人信息" />
    <div class="person-content">
      <ul class="person-list">
        <li class="person-item" @click="toNickNamePage">
          <p class="person-left">昵称</p>
          <p class="person-right">
            <span>{{userMessage.nickName}}</span>
            <img class="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="">
          </p>
        </li>
        <li class="person-item">
          <p class="person-left">头像</p>
          <p class="person-right">
            <img class="head-img" v-lazy="userMessage.headUrl" alt="">
            <img class="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="">
          </p>
        </li>
        <li class="person-item" @click="toModifyMobilePage">
          <p class="person-left">手机更换</p>
          <p class="person-right">
            <span>{{userMessage.mobile}}</span>
            <img class="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="">
          </p>
        </li>
        <li class="person-item" @click="toFromAddress">
          <p class="person-left">地址管理</p>
          <p class="person-right">
            <img class="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="">
          </p>
        </li>
        <li class="person-item" @click="toModifyPsw">
          <p class="person-left">修改密码</p>
          <p class="person-right">
            <img class="icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="">
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'

  import userMixin from 'mixins/userMixin'

  export default {
    name: 'Person',
    components: {
      MainNavBar
    },
    mixins: [ userMixin ],
    created() {
      this.getUserMessage()
    },
    methods: {
      toNickNamePage() {
        this.$router.push('/nickname')
      },
      toModifyMobilePage() {
        this.$router.push('/modifyMobile')
      },
      toFromAddress() {
        this.$router.push('/fromAddress')
      },
      toModifyPsw() {
        this.$router.push('/modifyPsw')
      }
    }
  }
</script>

<style lang="less" scoped>
  .person{
    background-color: #f8f9fc;
    height: 100vh;
    position: relative;
    z-index: 2;
    .person-content{
      overflow-y: hidden;
      position: absolute;
      top: 44px;
      bottom: 0;
      left: 0;
      right: 0;
      .person-list{
        
      }
      .person-item{
        background-color: #fff;
        padding: 0 19px;
        height: 47px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:nth-of-type(1) {
          border-bottom:  1px solid #eee;
        }
        &:nth-of-type(2) {
          border-bottom:  1px solid #eee;
        }
        &:nth-last-of-type(1) {
          margin-top: 10px;
        }
        &:nth-last-of-type(2) {
           margin-top: 10px;
        }
        .person-left{
          font-size: 16px;
          color: #1a1a1a;
        }
        .person-right{
          font-size: 16px;
          color: #b5b6b6;
          display: flex;
          align-items: center;
          .head-img{
            width: 36px;
            height: 36px;
            border-radius: 50%;
          }
          .icon{
            width: 6px;
            height: 10px;
            margin-left: 8px;
            vertical-align: middle;
          }
        }
      }
    }
  }
</style>
