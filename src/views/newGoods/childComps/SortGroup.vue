<template>
  <div class="sort-group">
    <div class="mask"  @click.self="hideSortGroup"></div>
    <div class="sort-group-list">
      <scroll class="sort-group-content" ref="scroll">
        <div class="sort-group-list-container">
          <sort-group-item :sortGroupList="typeList" sortGroupTitle="分类" :isCheckbox="true" ref="typeList" />
          <sort-group-item :sortGroupList="brandList" sortGroupTitle="品牌" :isCheckbox="true" ref="brandList" />
          <sort-group-item :sortGroupList="countryList" sortGroupTitle="国家" :isCheckbox="true" ref="countryList" />
          <sort-group-item :sortGroupList="priceList" sortGroupTitle="价格" :isCheckbox="false" @sortInput="sortPrice" ref="priceList" >
            <div slot="sort-range" class="sort-range">
              <input class="sort-range-input" v-model="minPrice" type="text" placeholder="最低价">
              <span class="sort-range-icon">——</span>
              <input class="sort-range-input" v-model="maxPrice" type="text" placeholder="最高价">
            </div>
          </sort-group-item>
          <sort-group-item :sortGroupList="stockList" sortGroupTitle="库存" :isCheckbox="false" @sortInput="sortNumber" ref="stockList">
            <div slot="sort-range" class="sort-range">
              <input class="sort-range-input" v-model="minNumber" type="text" placeholder="最低量">
              <span class="sort-range-icon">——</span>
              <input class="sort-range-input" v-model="maxNumber" type="text" placeholder="最高量">
            </div>
          </sort-group-item>
          <sort-group-item :sortGroupList="deliverList" sortGroupTitle="发货" :isCheckbox="false" ref="deliverList" />
        </div>
      </scroll>
      <sort-btn @sortReset="sortReset" @sortConfirm="sortConfirm" />
    </div>
  </div>
</template>

<script>
  import SortGroupItem from 'components/content/sortGroupItem/SortGroupItem'
  import SortBtn from 'components/content/sortBtn/SortBtn'
  import Scroll from 'components/common/scroll/Scroll'
  

  export default {
    name: 'SortGroup',
    props: {
      brandList: {
        type: Array,
        default() {
          return {}
        }
      },
      countryList: {
        type: Array,
        default() {
          return {}
        }
      },
      typeList: {
        type: Array,
        default() {
          return {}
        }
      }
    },
    components: {
      SortGroupItem,
      SortBtn,
      Scroll
    },
    data() {
      return {
        minPrice: null,
        maxPrice: null,
        minNumber: null,
        maxNumber: null,
        priceList: [
          {
            id: '0-99',
            name: '0-99',
          },
          {
            id: '100-199',
            name: '100-199'
          },
          {
            id: '200-299',
            name: '200-299'
          }
        ],
        stockList: [
          {
            id: '0-99',
            name: '0-99',
          },
          {
            id: '100-499',
            name: '100-499'
          },
          {
            id: '500-',
            name: '500以上'
          }
        ],
        deliverList: [
          {
            id: 1,
            name: '保税区邮'
          },
          {
            id: 2,
            name: '香港直邮'
          },
          {
            id: 4,
            name: '海外直邮'
          },
          {
            id: 5,
            name: '国内发货'
          }
        ]
      }
    },
    methods: {
      sortPrice(value) {
        this.minPrice = value.split('-')[0]
        this.maxPrice = value.split('-')[1]
      },
      sortNumber(value) {
        this.minNumber = value.split('-')[0]
        this.maxNumber = value.split('-')[1]
      },
      sortReset() {
        this.$refs.typeList.chooseItem = []
        this.$refs.brandList.chooseItem = []
        this.$refs.countryList.chooseItem = []
        this.$refs.priceList.chooseItem = []
        this.$refs.stockList.chooseItem = []
        this.$refs.deliverList.chooseItem = []
        this.minPrice = null
        this.maxPrice = null
        this.minNumber = null
        this.maxNumber = null
      },
      sortConfirm() {
        let data = {}
        data.strCount = Number(this.minNumber)>0 ? Number(this.minNumber) : null
        data.endCount = Number(this.maxNumber)>0 ? Number(this.maxNumber) : null
        data.strPrice = Number(this.minPrice)>0 ? Number(this.minPrice) : null
        data.endPrice = Number(this.maxPrice)>0 ? Number(this.maxPrice) : null
        data.brandId = this.$refs.brandList.chooseItem.join(' ')
        data.countryId = this.$refs.countryList.chooseItem.join(' ')
        data.deliveryType = this.$refs.deliverList.chooseItem.join(' ')
        data.threeCategory = this.$refs.typeList.chooseItem.join(' ')
        console.log(data)
        this.$emit('sortConfirm', data)
      },
      hideSortGroup() {
        this.$emit('hideSortGroup')
      }
    }
  }
</script>

<style lang="less" scoped>
  .sort-group{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    // background-color: rgba(0, 0, 0, 0.3);
    z-index: 2;
    height: 100vh;
    .mask{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.3);
      // z-index: 2;
      height: 100vh;
    }
    .sort-group-list{
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 300px;
      background-color: #fff;
      overflow: scroll;
      padding-top: 10px;
      .sort-group-content{
        overflow-y: hidden;
        position: absolute;
        top: 0;
        bottom: 44px;
        left: 0;
        right: 0;
        z-index: 1;
      }
    }
  }
</style>