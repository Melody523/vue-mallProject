<template>
  <scroll class="category-right-content" ref="scroll">
    <div class="category-right">
      <div class="category-right-list" v-for="item in categoryTwoList" :key="item.id">
        <div class="category-right-list-header">{{item.name}}</div>
        <ul class="category-right-list-content">
          <li class="category-right-list-desc" v-for="catagory in item.threeCategoryList" :key="catagory.id" @click="toBrandGoods(catagory.id, catagory.threeName)">
            <img class="logo" v-lazy="catagory.imgUrl" alt="">
            <p class="name">{{catagory.threeName}}</p>
          </li>
        </ul>
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: 'CategoryRight',
    props: {
      categoryTwoList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Scroll
    },
    methods: {
      toBrandGoods(id, name) {
        this.$router.push('/brandGoods?threeCategory=' + id + '&title=' + name)
      }
    }
  }
</script>

<style lang="less" scoped>
  .category-right-content{
    height: 100%;
    .category-right{
      width: 100%;
      padding: 18px 9px;
      .category-right-list{
        .category-right-list-header{
          color: #000;
          font-size: 16px;
          margin-bottom: 7px;
        }
        .category-right-list-content{
          display: flex;
          // justify-content: space-between;
          flex-wrap: wrap;
          .category-right-list-desc{
            width: 33%;
            margin-right: 0.33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .logo{
              width: 56px;
              height: 56px;
              display: block;
            }
            .name{
              font-size: 13px;
              color: #4d4d4d;
              height: 30px;
            }
          }
        }
      }
    }
  }
</style>
