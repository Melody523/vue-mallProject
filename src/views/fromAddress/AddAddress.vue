<template>
  <div class="add-address">
    <address-nav-bar title="添加地址" control="完成" @addAddress="addAddress" />
    <scroll class="add-address-content" ref="scroll" >
      <div class="add-content">
        <div class="add-item">
          <input class="add-input" v-model="realName.value" type="text" placeholder="真实姓名">
        </div>
        <div class="add-item">
          <input class="add-input" v-model="mobile.value" type="text" placeholder="手机号码">
        </div>
        <div class="add-item">
          <select name="province" class="select" v-model="province.value" @change="provinceChange">
            <option class="option" value="" disabled>请选择省份</option>
            <option class="option" v-for="(value, name) in provinceList" :value="value.code" :key="name" >{{value.name}}</option>
          </select>
          <select name="city" class="select" v-model="city.value" @change="cityChange">
            <option class="option" value="">请选择城市</option>
            <option class="option" v-for="(value, name) in cityList" :value="value.code" :key="name">{{value.name}}</option>
          </select>
          <select name="county" class="select" v-model="county.value">
            <option class="option" value="">请选择区</option>
            <option class="option" v-for="(value, name) in countyList" :value="name" :key="name">{{value}}</option>
          </select>
        </div>
        <div class="add-item">
          <textarea class="detail-address" v-model="detailsAddress.value" placeholder="详细信息"></textarea>
        </div>
        <div class="add-item">
          <div @click="changeFlag">
            <img class="selected" :src="flag == 1 ? require('assets/img/cart/choose_active.svg') : require('assets/img/cart/choose.svg')"  alt="">
            <p class="title">设置为默认地址</p>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import { insertAddr } from 'network/address.js'

  import provcityArea from 'utils/provcityArea.json'

  import Scroll from 'components/common/scroll/Scroll'

  import AddressNavBar from './childComps/AddressNavBar'
  
  export default {
    name: 'AddAddress',
    components: {
      Scroll,
      AddressNavBar
    },
    data() {
      return {
        realName : {value:'', success:false, errorInfo: '请输入真实姓名'},
        mobile : {value:'', success:false, errorInfo: '手机号为空或者格式不正确'},
        cardId : {value:'', success:false, errorInfo: '身份证号为空或者格式不正确'},
        province : {value:'', success:false, errorInfo: '请选择地址'},
        city : {value:'', success:false, errorInfo: '请选择地址'},
        county : {value:'', success:false, errorInfo: '请选择地址'},
        detailsAddress : {value:'', success:false, errorInfo: '请输入详细地址'},
        flag : 0,
        provinceList: {},
        cityList: {},
        countyList: {}
      }
    },
    created() {
      this.provinceList = provcityArea
      console.log(provcityArea)
    },
    methods: {
      checkRealName() {
        if (this.realName.value.trim()) { 
          this.realName.success = true
        } else {
          this.realName.success = false
          this.$toast.show(this.realName.errorInfo, 1500)
        }
      },
      checkMobile() {
        let  result = this.mobile.value.replace(/[^\d]/g, "").replace(/(^\s+)|(\s+$)/g,"")
        result = result.replace(/\s/g,"")
        if( /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(result.trim()) ) { 
          this.mobile.success = true
          this.mobile.value = result
        } else {
          this.mobile.success = false
          this.$toast.show(this.mobile.errorInfo, 1500)
        }
      },
      checkCardId() {
        if( /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(this.cardId.value.trim()) ) { 
          this.cardId.success = true
        } else {
          this.cardId.success = false
          this.$toast.show(this.cardId.errorInfo, 1500)
        }
      },
      checkAreaName() {
        if (this.province.value.trim()) { 
          this.province.success = true
        } else {
          this.province.success = false
          this.$toast.show(this.province.errorInfo, 1500)
        }
      },
      checkdetailsAddress() {
        if (this.detailsAddress.value.trim()) { 
          this.detailsAddress.success = true
        } else {
          this.detailsAddress.success = false
          this.$toast.show(this.detailsAddress.errorInfo, 1500)
        }
      },
      addAddress() {
        this.checkRealName()
        if( this.realName.success ) {
          this.checkMobile()
          if( this.mobile.success ) {
            this.checkAreaName()
            if( this.province.success ) {
              this.checkdetailsAddress();
              if( this.detailsAddress.success ) {
                let params = {
                  area_name : this.provinceList[this.province.value].name + this.cityList[this.city.value].name + this.countyList[this.county.value],//省县市
                  address: this.detailsAddress.value,//详细地址
                  person_name: this.realName.value,//真实姓名
                  serv_num: this.mobile.value,//手机号
                  card_no: this.cardId.value,//身份证
                  flag: this.flag//是否设为默认地址
                }
                insertAddr(params).then(res => {
                  if (!res.success) {
                    this.$toast.show(res.message, 1500)
                  } else {
                    this.$router.push('/fromAddress')
                  }
                  console.log(res)
                }).catch(err => {
                  console.log(err)
                })
                console.log(params)
              }
            }
          }
        } 
      },
      provinceChange() {
        this.cityList = this.provinceList[this.province.value].cities
        this.city.value = ''
        this.countyList = {}
        this.county.value = ''
        console.log(this.cityList)
      },
      cityChange() {
        this.countyList = this.cityList[this.city.value].districts
        this.county.value = ''
        console.log(this.countyList)
      },
      changeFlag() {
        this.flag == 0 ? this.flag = 1 : this.flag = 0
      }
    }
  }
</script>

<style lang="less" scoped>
  .add-address{
    position: relative;
    height: 100vh;
    z-index: 2;
    background-color: #f8f9fc;
    .add-address-content{
      overflow-y: hidden;
      position: absolute;
      top: 44px;
      bottom: 0;
      left: 0;
      right: 0;
      .add-content{
        .add-item{
          display: flex;
          justify-content: space-between;
          color: #000;
          font-size: 14px;
          padding: 11px 19px;
          margin-top: 10px;
          background-color: #fff;
          .add-input{
            border: 0 none;
          }
          .select{
            border: 0 none;
            appearance: none;
            .option{
              height: 20px;
              line-height: 20px;
              font-size: 14px;
            }
          }
          .detail-address{
            height: 14px;
            border: 0 none;
            height: 46px;
            width: 100%;
          }
          .selected{
            width: 20px;
            height: 20px;
            vertical-align: middle;
            margin-right: 5px;
          }
          .title{
            display: inline-block;
          }
        }
      }
    }
  }
</style>
