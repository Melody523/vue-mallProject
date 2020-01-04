<template>
  <div class="sort-nav">
    <ul class="sort-list">
      <li class="sort-item"  
          v-for="(item, index) in sortList" 
          :key="item.sort" 
          :class="{'sort-icon': item.icon, 'sort-active': (index == currentSort), 'sort-active-top': item.top, 'sort-active-bottom': item.bottom}"
          @click="sortClick(index)"
        >
        {{item.title}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'SortNav',
    data() {
      return {
        sortList: [
          {
            sort: 'xl',
            order: 2,
            title: '销量',
            icon: false,
            top: false,
            bottom: false
          },
          {
            sort: 'sj',
            order: 1,
            title: '价格',
            icon: true,
            top: false,
            bottom: false
          },
          {
            sort: 'kcl',
            order: 1,
            title: '库存量',
            icon: true,
            top: false,
            bottom: false
          },
          {
            sort: 'sjsj',
            order: 1,
            title: '上架时间',
            icon: true,
            top: false,
            bottom: false
          },
          {
            sort: 'sx',
            order: 2,
            title: '筛选',
            icon: false,
            top: false,
            bottom: false
          }
        ],
        currentSort: -1
      }
    },
    computed: {
    },
    methods: {
      sortClick(index) {
        if (this.currentSort >= 0 && this.currentSort != index) {
          this.sortList[this.currentSort].bottom = false
          this.sortList[this.currentSort].top = false
          this.sortList[this.currentSort].order = 1
        }
        this.currentSort = index
        if ((index == 1 || index == 2 || index == 3) && this.sortList[index].order == 1) {
          this.sortList[index].order ++
          this.sortList[this.currentSort].bottom = true
          this.sortList[this.currentSort].top = false
        } else if ((index == 1 || index == 2 || index == 3) && this.sortList[index].order == 2) {
          this.sortList[index].order --
          this.sortList[this.currentSort].bottom = false
          this.sortList[this.currentSort].top = true
        }
        this.$emit('sortGoodsList', this.sortList[this.currentSort])
      }
    }
  }
</script>

<style lang="less" scoped>
  .sort-nav{
    height: 44px;
    .sort-list{
      height: 44px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-shadow: 0 0 2px #ddd;
      .sort-item{
        flex: 1;
        font-size: 14px;
        color: #666;
        text-align: center;
        
      }
      .sort-icon{
        flex: 1.2;
        &::after{
          content: '';
          display: inline-block;
          width: 12px;
          height: 12px;
          background: url(http://www.weinihaigou.com/m-images/icon-week.png) no-repeat -23px 0;
          background-size: 100px 100px;
          vertical-align: middle;
        }
      }
      .sort-active{
        color: #a54144;
      }
      .sort-active-top{
        &::after{
          background-position: 0px 0;
        }
      }
      .sort-active-bottom{
        &::after{
          background-position: -11px 0;
        }
      }
    }
  }
</style>