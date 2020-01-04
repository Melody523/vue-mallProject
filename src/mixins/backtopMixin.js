import BackTop from 'components/content/backTop/BackTop'

var backtopMixin = {
  data() {
    return {
      positionY: 0
    }
  },
  components: {
    BackTop
  },
  computed: {
    showBackTop() {
      return this.positionY < -800
    }
  },
  methods: {
    scroll(position) {
      this.positionY = position.y
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    }
  }
}

export default backtopMixin
