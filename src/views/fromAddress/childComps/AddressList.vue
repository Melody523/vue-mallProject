<template>
  <div class="address-list-container">
    <ul class="address-list">
      <li class="address-item" v-for="item in addressList" :key="item.addr_id">
        <p class="person-message">
          <span class="person-name">{{item.person_name}}</span>
          <span class="serv-num">{{item.serv_num}}</span>
        </p>
        <p class="address-detail">
          <img class="icon" src="~assets/img/surePay/location.svg" alt="">
          <span class="address">{{item.area_name}}{{item.address}}</span>
        </p>
        <div class="control">
          <div class="control-left">
            <img class="selected" :src="item.flag == '1' ? require('assets/img/cart/choose_active.svg') : require('assets/img/cart/choose.svg')"  alt="">
            <span class="title">默认地址</span>
          </div>
          <div class="control-right">
            <p class="modify">编辑</p>
            <p class="delete">删除</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="add-address-btn" @click="toAddAddresspage">
      添加新地址
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddressList',
    props: {
      addressList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      toAddAddresspage() {
        this.$router.push('/addAddress')
      }
    }
  }
</script>

<style lang="less" scoped>
  .address-list-container{
    .address-list{
      .address-item{
        margin: 10px;
        background-color: #fff;
        font-size: 14px;
        color: #000;
        .person-message{
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 32px;
          padding: 0 9px;
        }
        .address-detail{
          font-size: 12px;
          color: #999;
          padding: 0 9px;
          height: 36px;
          .icon{
            width: 15px;
            height: 15px;
            vertical-align: middle;
            margin-right: 5px;
          }
          .address{
            line-height: 16px;
          }
        }
        .control{
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #eee;
          .control-left{
            display: flex;
            align-items: center;
            .selected{
              width: 20px;
              height: 20px;
              margin-right: 5px;
            }
          }
          .control-right{
            color: #999;
            font-size: 12px;
            display: flex;
            align-items: center;
            .modify{
              padding-left: 20px;
              background: url(http://www.weinihaigou.com/m-images/address.png) no-repeat 0 0;
              background-size: 56px 56px;
              margin-right: 10px;
            }
            .delete{
              padding-left: 20px;
              background: url(http://www.weinihaigou.com/m-images/address.png) no-repeat 0 -29px;
              background-size: 56px 56px;
            }
          }
        }
      }
    }
    .add-address-btn{
      width: 95%;
      height: 32px;
      line-height: 32px;
      margin: 14px auto;
      color: #9f2e33;
      border: 1px solid #9f2e33;
      text-align: center;
      border-radius: 4px;
      background-color: #fff;
    }
  }
</style>
