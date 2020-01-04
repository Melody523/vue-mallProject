<template>
  <div class="profile-header">
    <img class="profile-header-bg" src="http://www.weinihaigou.com/m-images/my-header-bg.jpg" alt="">
    <div class="profile-header-content" @click="toPersonPage">
      <img class="profile-img" v-lazy="userMessage.headUrl" alt="">
      <p class="profile-name">{{userMessage.nickName}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProfileHeader',
    props: {
      userMessage: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      toPersonPage() {
        this.$router.push('/person')
      }
    }
  }
</script>

<style lang="less" scoped>
  .profile-header{
    position: relative;
    .profile-header-bg{
      width: 100%;
      height: auto;
    }
    .profile-header-content{
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translate(0, -50%);
      display: flex;
      align-items: center;
      .profile-img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      .profile-name{
        font-size: 17px;
        color: #fff;
        display: inline-block;
        margin-left: 10px;
      }
    }
  }
</style>
