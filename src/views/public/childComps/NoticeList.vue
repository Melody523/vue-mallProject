<template>
  <div class="notice-list">
    <ul class="notice-list-detail">
      <li class="notice-item" v-for="item in noticeList" :key="item.id">
        <p class="time">{{getFmtTime(item.createTime)}}</p>
        <div class="notice-item-content">
          <p class="title">{{item.title}}</p>
          <p class="get-more" @click="toPublicDetailPage(item.id)">
            <span class="get-more-title">点击查看</span>
            <img class="get-more-icon" src="http://www.weinihaigou.com/m-images/my-tip.png" alt="">
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import filterTime from 'utils/filterTime'

  export default {
    name: 'NoticeList',
    props: {
      noticeList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    created() {
      
    },
    methods: {
      getFmtTime(date) {
        return filterTime(new Date(date), 'YYYY.MM.dd')
      },
      toPublicDetailPage(id) {
        this.$router.push('/publicDetail/' + id)
      }
    }
  }
</script>

<style lang="less" scoped>
  .notice-list{
    .notice-list-detail{
      .notice-item{
        padding: 14px 9px;
        font-size: 14px;
        color: #7a7a7a;
        .time{
          text-align: center;
          margin-bottom: 8px;
        }
        .notice-item-content{
          padding: 19px 6px 0;
          background-color: #fff;
          .title{
            height: 40px;
          }
          .get-more{
            margin-top: 12px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #ededed;
            .get-more-icon{
              width: 6px;
              height: 10px;
            }
          }
        }
        
      }
    }
  }
</style>
