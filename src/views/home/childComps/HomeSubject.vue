<template>
  <div class="home-subject">
    <ul class="home-subject-list">
      <li class="home-subject-item" v-for="item in subject" :key="item.id" @click="toThemePage(item.id)">
        <img class="home-subject-img" v-lazy="item.url2" alt="" >
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HomeSubject',
    props: {
      subject: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      toThemePage(id) {
        console.log(id)
        this.$router.push('/theme/' + id)
      }
    }
  }
</script>

<style lang="less" scoped>
  .home-subject{
    width: 100%;
    .home-subject-list{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .home-subject-item{
        width: 49%;
        border-bottom: 1px solid #eee;
        &:nth-child(2n) {
          border-left: 1px solid #eee;
        }
        &:nth-last-of-type(1) {
          border-bottom: 0 none;
        }
        &:nth-last-of-type(2) {
          border-bottom: 0 none;
        }
        .home-subject-img{
          width: 100%;
          height: auto;
        }
      }
    }
  }
</style>