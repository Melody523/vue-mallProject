<template>
  <div class="tab-bar-item" @click="tabBarClick">
    <slot name="tab-bar-icon" v-if="!isActive"></slot>
    <slot name="tab-bar-icon-active"  v-else></slot>
    <div :style="activeStyle"><slot name="tab-bar-title"></slot></div>
  </div>
</template>

<script>
  import userMixin from 'mixins/userMixin'
  export default {
    name: 'TabBarItem',
    props: {
      path: String,
      activeColor: {
        type: String,
        default: '#f05b1a'
      }
    },
    mixins: [userMixin],
    data() {
      return {

      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return {'color': this.isActive ? this.activeColor : ''}
      }
    },
    methods: {
      tabBarClick() {
        if (this.path == '/cart' || this.path == '/profile') {
          this.getUserMessage(this.path)
        } else {
          this.$router.replace(this.path)
        }
      }
    }
  }
</script>

<style scoped>

</style>
