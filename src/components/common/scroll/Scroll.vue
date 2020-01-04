<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    props: {
      // 根据传入的probeType来决定是否需要监听滚动事件，0、1都不侦测，2手指滚动过程中侦测，离开后不侦测，3只要是滚动都侦测
      probeType: {
        type: Number,
        default: 0
      },
      //根据传入的pullUpLoad来决定是否需要监听底部上拉事件
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null //用来保存创建的BScroll对象
      }
    },
    computed: {
      
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,//用来监听div标签的点击事件
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //监听滚动的位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      })

      //监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      //滚动到某个位置，通过设置time来决定滚动的速度
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time)
      },
      //发送网络请求，等数据请求完成并且将数据展示出来后需要调用，否则无法见到下一次的上拉事件
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      //等数据挂载后调用重新获取content的高度，防止内容加载不全
      refresh() {
        this.scroll.refresh()
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
