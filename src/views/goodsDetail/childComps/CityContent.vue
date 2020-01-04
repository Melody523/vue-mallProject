<template>
  <div class="city-content">
    <div class="mask" @click="hideCity"></div>
    <div class="city-desc">
      <div class="city-header">配送至</div>
      <scroll class="city-detail" ref="scroll">
        <ul class="city-list">
          <li class="city-item" 
              v-for="item in showList" 
              :key="item.code" 
              @click="provinceClick(item.code, item.name)"
              :class="{'active': item.name == chooseProvince}"
          >{{item.name}}</li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import city from 'utils/city.json'

  export default {
    name: 'CityContent',
    props: {
      chooseProvince: {
        type: String,
        default: ''
      }
    },
    components: {
      Scroll
    },
    data() {
      return {
        provinceList: [],
        cityList: [],
        showProvince: true,
        chooseProvince_1: '',
        chooseCity: ''
      }
    },
    computed: {
      showList() {
        return this.showProvince ? this.provinceList : this.cityList
      }
    },
    created() {
      this.provinceList = city.provinces
      console.log(city)
    },
    methods: {
      provinceClick(code, name) {
        if (this.showProvince) {
          let cityList = this.provinceList.filter(item => item.code == code)
          this.cityList = cityList[0].cities
          this.showProvince = false
          this.chooseProvince_1 = name
        } else {
          let city = this.cityList.filter(item => item.code == code)
          this.chooseCity = name
          this.showProvince = true
          this.$emit('changeCity', {
            chooseProvince: this.chooseProvince_1,
            chooseCity: this.chooseCity
          })
          console.log(city)
        }
      },
      hideCity() {
        this.$emit('hideCity')
      }
    }
  }
</script>

<style lang="less" scoped>
  .city-content{
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    .city-desc{
      width: 50%;
      background-color: #fff;
      position: absolute;
      right: 0;
      top: 0;
      height: 100vh;
      z-index: 2;
      color: #000;
      .city-header{
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 18px;
      }
      .city-detail{
        overflow-y: hidden;
        position: absolute;
        top: 50px;
        bottom: 0;
        left: 0;
        right: 0;
        .city-list{
          .city-item{
            padding-left: 28px;
            font-size: 14px;
            line-height: 35px;
            border-top: 1px solid #ededed;
          }
          .active{
            color: #ff6a00;
          }
        }
      }
    }
  }
</style>
