<template>
  <div class="category-left">
    <ul class="category-left-list">
      <li class="category-left-item" 
          v-for="item in categoryList" 
          :class="{'active' : (currentId == item.classid)}" 
          :key="item.classid"
          @click="itemClick(item.classid)"
        >
        {{item.classdesc}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'CategoryLeft',
    props: {
      categoryList: {
        type: Array,
        default() {
          return []
        }
      },
      currentId: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {

      }
    },
    methods: {
      itemClick(classid) {
        this.$emit('itemClick', classid)
      }
    }
  }
</script>

<style lang="less" scoped>
  .category-left{
    width: 94px;
    height: 100vh;
    .category-left-list{
      display: flex;
      flex-direction: column;
      height: 100%;
      .category-left-item{
        width: 100%;
        height: 24px;
        line-height: 24px;
        margin-top: 18px;
        text-align: center;
        color: #4d4d4d;
        font-size: 14px;
        background-color: #fff;
        border-left: 4px solid #fff;
      }
      .active{
        border-left: 4px solid #aa4f53;
        color: #aa4f53;
      }
    }
  }
</style>
