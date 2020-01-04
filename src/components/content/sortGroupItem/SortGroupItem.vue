<template>
  <div class="sort-group-item" :class="{'autoHeight': isShow}">
    <div class="sort-group-title">{{sortGroupTitle}}<div v-if="sortGroupList.length > 6" class="icon" :class="{'show-icon': isShow}" @click="showList"></div></div>
    <ul class="sort-list" >
      <li class="sort-item text-overflow1" v-for="item in sortGroupList" :key="item.id" @click="sortItemClick(item.id)" :class="{'sort-item-active': (chooseItem.indexOf(item.id) != -1)}">{{item.name}}</li>
    </ul>
    <slot name="sort-range"></slot>
  </div>
</template>

<script>
  export default {
    name: 'SortGroupItem',
    props: {
      sortGroupList: {
        type: Array,
        default() {
          return {}
        }
      },
      sortGroupTitle: {
        type: String,
        default: ''
      },
      isCheckbox: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        chooseItem: []
      }
    },
    methods: {
      showList() {
        this.isShow = !this.isShow
      },
      sortItemClick(id) {
        if (typeof(id) != 'number' && id.indexOf('-') != -1) {
          this.chooseItem = [id]
          this.$emit('sortInput', id)
        } else if (!this.isCheckbox) {
          this.chooseItem = [id]
        } else {
          if (this.chooseItem.indexOf(id) != -1) {
            this.chooseItem.splice(this.chooseItem.indexOf(id), 1)
          } else {
            this.chooseItem.push(id)
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .sort-group-item{
    height: 105px;
    overflow: hidden;
    padding: 8px 14px;
    border-bottom: 1px solid #eee;
    .sort-group-title{
      color: #000;
      font-size: 14px;
      position: relative;
      .icon{
        content: '';
        display: block;
        position: absolute;
        right: 10px;
        top: 5px;
        width: 10px;
        height: 10px;
        border-top: 1px solid #4d4d4d;
        border-right: 1px solid #4d4d4d;
        transform: rotate(-45deg);
      }
      .show-icon{
        transform: rotate(135deg);
      }
    }
    .sort-list{
      margin-top: 7px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .sort-item{
        width: 86px;
        height: 26px;
        line-height: 26px;
        border-radius: 3px;
        text-align: center;
        border: 1px solid #e9ebf1;
        background-color: #e9ebf1;
        color: #4d4d4d;
        font-size: 12px;
        margin-top: 8px;
      }
      .sort-item-active{
        border: 1px solid #ff6a00;
        background-color: #fff;
        // background-size: 75%;
      }
    }
    .sort-range{
      margin-top: 8px;
      .sort-range-input{
        width: 117px;
        height: 26px;line-height: 26px;
        border-radius: 3px;
        text-align: center;
        border: 1px solid #e9ebf1;
        background-color: #e9ebf1;
        color: #4d4d4d;
        font-size: 12px;
      }
      .sort-range-icon{
        color: #4d4d4d;
        display: inline-block;
        margin: 0 3px;
      }
    }
  }
  .autoHeight{
    height: auto;
  }
</style>
