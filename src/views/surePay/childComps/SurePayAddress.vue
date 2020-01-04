<template>
  <div class="sure-pay-address"  @click="toFromAddressPage">
    <div class="address-left">
      <p class="person-mesage" v-if="addrList.length">{{addrList[0].person_name}}  {{addrList[0].serv_num}}</p>
      <div class="address-content" v-if="addrList.length">
        <p class="address-detail"><img class="icon" src="~assets/img/surePay/location.svg" alt="">{{addrList[0].area_name}}{{addrList[0].address}}</p>
      </div>
    </div>
    <img class="address-right" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'SurePayAddress',
    props: {
      addrList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      toFromAddressPage() {
        this.$router.push('/fromAddress')
      }
    }
  }
</script>

<style lang="less" scoped>
  .sure-pay-address{
    height: 80px;
    background-color: #fff;
    font-size: 14px;
    color: #000;
    margin: 0 0 10px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    border-top: 2px solid transparent;
    border-image: 12 repeating-linear-gradient(-45deg, #e56a70 0, #e56a70 16px, transparent 0, transparent 32px, #8ab7e9 0, #8ab7e9 48px, transparent 0, transparent 64px);
    .address-left{
      .person-mesage{
        font-size: 17px;
      }
      .address-content{
        width: 305px;
        margin-top: 5px;
        .address-detail{
          .icon{
            width: 15px;
            height: 15px;
            vertical-align: middle;
          }
          color: #d0d0d0;
        }
      }
    }
    .address-right{
      width: 6px;
      height: 10px;
    }
  }
</style>
