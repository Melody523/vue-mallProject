<template>
  <div class="delect-container">
    <div class="mask"></div>
    <div class="delect-content">
      <slot name="content"></slot>
      <!-- <div class="delect-header">确定要删除吗？</div> -->
      <div class="delect-btn">
        <div class="cancel" @click="cancelDel">取消</div>
        <div class="confirm" @click="confirmDel">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Delect',
    methods: {
      cancelDel() {
        this.$emit('cancelDel')
      },
      confirmDel() {
        this.$emit('confirmDel')
      }
    }
  }
</script>

<style lang="less" scoped>
.delect-container{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  .delect-content{
    width: 80%;
    border-radius: 4px;
    background-color: #fff;
    font-size: 18px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .delect-header{
      padding: 25px;
      text-align: center;
      border-bottom: 1px solid #e5e5e5;
      word-break: break-all;
      color: #000;
    }
    .delect-btn{
      height: 50px;
      display: flex;
      align-items: center;
      .cancel{
        flex: 1;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #000;
        border-right: 1px solid #e5e5e5;
      }
      .confirm{
        flex: 1;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #ac575a;
      }
    }
  }
}
</style>