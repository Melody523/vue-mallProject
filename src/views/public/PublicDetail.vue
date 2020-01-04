<template>
  <div class="public-detail">
    <main-nav-bar title="公告详情" />
    <div class="public-detail-content">
      <p class="time">{{publicDetail.createDate | getFmtTime}}</p>
      <div class="detail" v-html="publicDetail.content"></div>
    </div>
  </div>
</template>

<script>
  import MainNavBar from 'components/content/mainNavBar/MainNavBar'

  import { getDetailById } from 'network/message'

  export default {
    name: 'PublicDetail',
    components: {
      MainNavBar
    },
    data() {
      return {
        publicDetail: {}
      }
    },
    created() {
      this.getPublicDetail(this.$route.params.id)
    },
    filters: {
      getFmtTime(date) {
        if (date != undefined) {
          return date.replace(/\//g, '.')
        }
      }
    },
    methods: {
      getPublicDetail(id) {
        getDetailById(id).then(res => {
          console.log(res)
          this.publicDetail = res.result
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  .public-detail{
    background-color: #f8f9fc;
    height: 100vh;
    position: relative;
    z-index: 2;
  }
  .public-detail-content{
    font-size: 14px;
    color: #000;
    width: 100%;
  }
  .time{
    height: 34px;
    line-height: 34px;
    text-align: center;
  }
  .detail{
    width: 90%;
    background-color: #fff;
    margin: 0 18px 14px;
    padding: 12px 6px;
    border: 1px solid #ededed;
  }
  >>> img {
    display: block;
    max-width: 100% !important;
    height: auto !important;
  }
</style>
