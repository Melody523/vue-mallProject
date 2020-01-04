<template>
  <div class="category-container">
    <category-nav-bar :cartCount="cartCount" />
    <div class="category-content">
      <category-left class="category-left" :categoryList="categoryList" :currentId="currentId" @itemClick="itemClick" />
      <category-right class="category-right" :categoryTwoList="categoryTwoList" />
    </div>
  </div>
</template>

<script>
  import { getCategory, getCategoryTwo } from 'network/category'
  import { carCount } from 'network/goods'

  import CategoryLeft from './childComps/CategoryLeft'
  import CategoryNavBar from './childComps/CategoryNavBar'
  import CategoryRight from './childComps/CategoryRight'

  export default {
    name: 'Category',
    components: {
      // Scroll,
      CategoryNavBar,
      CategoryLeft,
      CategoryRight
    },
    data() {
      return {
        cartCount: 0,
        categoryList: [],
        categoryTwoList: [],
        currentId: 1
      }
    },
    created() {
      this.getCategoryList()
      this.getCategoryTwoList(1)
      this.getcartCount()
    },
    methods: {
      getCategoryList() {
        getCategory().then(res => {
          this.categoryList = res.result
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      getCategoryTwoList(classId) {
        getCategoryTwo(classId).then(res => {
          this.categoryTwoList = res.result.classTwoList
          console.log(res) 
        }).catch(err => {
          console.log(err)
        })
      },
      getcartCount() {
        carCount().then(res => {
          console.log(res)
          this.cartCount = res.result
        }).catch(err => {
          console.log(err)
        })
      },
      itemClick(classid) {
        this.currentId = classid
        this.getCategoryTwoList(classid)
      }
    }
  }
</script>

<style lang="less" scoped>
  .category-container{
    height: 100vh;
    position: relative;
    .category-content{
      overflow-y: hidden;
      position: absolute;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
      display: flex;
      .category-left{
        width: 94px;
      }
      .category-right{
        flex: 1;
        border-left: 1px solid #ddd;
      }
    }
  }
</style>
