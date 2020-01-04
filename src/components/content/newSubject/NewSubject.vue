<template>
  <div class="new-subject">
    <div class="new-subject-list">
      <div class="new-subject-item" v-for="item in newSubject" :key="item.id">
        <img class="new-subject-poster" :src="item.url" alt="" @click="toThemePage(item.id)" >
        <new-subject-item :newSubjectItem="item" :id="item.id" />
      </div>
    </div>
  </div>
</template>

<script>
  import NewSubjectItem from './NewSubjectItem'

  export default {
    name: 'NewSubject',
    props: {
      newSubject: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        goodsScroll: null
      }
    },
    components: {
      NewSubjectItem
    },
    methods: {
      toThemePage(id) {
        this.$router.push('/theme/' + id)
      }
    }
  }
</script>

<style lang="less" scoped>
  .new-subject{
    width: 100%;
    .new-subject-list{
      display: flex;
      flex-wrap: wrap;
      .new-subject-item{
        width: 100%;
        .new-subject-poster{
          width: 100%;
          height: auto;
        }
      }
    }
  }
</style>
