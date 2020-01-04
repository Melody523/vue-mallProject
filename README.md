# 唯妮海购移动web页面

>如果对你有帮助，给我点鼓励星星好吗～～也欢迎指正和交流(邮箱: 877015767@qq.com)

>接口来源于唯妮海淘商城，如有需要可联系删除(由于目前下单api报错无法做订单列表，优惠券由于没有参考也没有做，后期解决后可补上)

## 一、项目运行步骤
1. 安装项目依赖 `npm install`
2. 运行项目 `npm run serve`
3. 项目打包 `npm run build`
4. 预览项目需打开控制台设置移动端或用手机预览

## 二、使用的技术栈
　vueCli3脚手架＋vuex＋vue-router＋vue-lazyload＋axios＋less

## 三、知识点总结
1. 在`vue.config.js`文件中设置反向代理解决接口跨域问题(**注意：修改后一定需要重启项目否则不生效!!**)
```js
devServer: {
    port: 8080,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://www.weinihaigou.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''   //重写接口
        }
      }
    }
  }
```
2. 在`vue.config.js`文件中给文件夹设置别名
```js
//设置格式
configureWebpack: {
  resolve: {
    alias: {
      'components': '@/components'//@指的是src目录
    }
  }
}
```
```js
//使用别名不需要写任何的相对路径
import Scroll from 'components/common/scroll/Scroll'
```
```html
//在图片标签src属性中使用
<img class="search-icon" src="~assets/img/common/search.svg" alt="">
```
```js
//在data属性中使用
data() {
  return {
    icon: require('assets/img/common/home.svg')
  }
}
```
3. 使用`mint-ui`组件库时，按需引入需要引入对应组件的样式

4. 命名插槽是一一对应的，如需根据变量更改展示内容需要在内部进行处理
```html
<slot name="center"></slot>
```
```html
<div slot="center" class="center" @click="toSearchPage">
  <div v-if="showSearch"> 
    <img class="search-icon" src="~assets/img/common/search.svg" alt="">
    <input class="search-input" type="text" :placeholder="title" disabled>
  </div>
  <div class="title" v-else>
    {{title}}
  </div>
</div>
```
5. 使用better-scroll代替原生浏览器的滑动   
使用步骤：   
(1) 安装 `npm install better-scroll --save`   
(2) 封装公共组件
```
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
      // 1.创建BScroll对象，建议使用this.$refs.wrapper代替document.querySelector('.wrapper')
      //补充:ref绑定在组件中this.$refs.reframe获取的是组件对象，若绑定在普通元素中获取的则是元素对象
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

```
(3) 使用封装好的组件,提取主要部分来作为示例
```
<template>
  <div class="home-container">
    <scroll class="home-content" ref="scroll" :probeType="3" @scroll="scroll">
      <home-nav-bar />
      ...
    </scroll>
    <!-- 监听一个组件的原生事件时必须给对应事件加上.native修饰符才能进行监听 -->
    <back-top v-show="showBackTop" @click.native="backTop" />
  </div>
</template>

<script>
import HomeNavBar from "./childComps/HomeNavBar"

import Scroll from 'components/common/scroll/Scroll'

import backtopMixin from 'mixins/backtopMixin'

export default {
  name: "Home",
  mixins: [backtopMixin],
  components: {
    Scroll,
    HomeNavBar
  }
}
</script>

<style lang="less" scoped>
  .home-container{
    height: 100vh;
    position: relative;
    .home-content{
      //必须给最外层设置高度
      overflow-y: hidden;
      position: absolute;
      top: 0;
      bottom: 49px;
      left: 0;
      right: 0;
    }
  } 
</style>

```
由于多地方用到回到顶部组件，因此提取到mixins
```js
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

```
```js
//上拉加载更多
methods: {
  getMyMoCollect(params) {
    myMoCollect(params).then(res => {
      this.hasNextPage = res.result.hasNextPage
      this.collectList.push(...res.result.list)
      this.$refs.scroll.refresh()
      this.$refs.scroll.finishPullUp()
    }).catch(err => {
      console.log(err)
    })
  },
  pullingUp() {
    if (this.hasNextPage) {
      this.sortData.pageNum += 1
      this.getMyMoCollect(this.sortData)
    }
  }
}
```
补充：利用better-scroll实现横向滚动
```
<template>
  <div class="goods-list-container" ref="listWrapper">
    <div class="goods-list-content">
      <ul class="goods-list">
        <li class="goods-item" v-for="goods in newSubjectItem.goodsList" :key="goods.goodsNo" @click="toGoodsDeatil(goods.goodsNo)">
          ...
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'NewSubjectItem',
    data() {
      return {
        horizontalScroll: null
      }
    },
    mounted() {
      this.horizontalScroll = new BScroll(this.$refs.listWrapper, {
        scrollX: true,
        eventPassthrough: 'vertical',
      })
    }
  }
</script>

<style lang="less" scoped>
  .goods-list-container{
    overflow: hidden;
    .goods-list-content{
      display: inline-block;
    }
    .goods-list{
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      .goods-item{
        ...
      } 
    }
  }
</style>

```
6. 自定义`toast`插件
(1) `Toast.vue`组件封装
```
<template>
  <div class="toast">
    <div class="message" v-show="isShow">{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, duration = 300) {
        this.isShow = true
        this.message = message
        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style lang="less" scoped>
  .toast{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    .message{
      padding: 10px 20px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-size: 14px;
    }
  }
</style>

```
(2) 自定义`toast`插件
```js
import Toast from './Toast.vue'

const obj = {}

obj.install = function (Vue) {
  
  //1. 创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  //2. new创建一个组件对象
  const toast = new toastContrustor()

  //3. 将组件对象手动挂载到某个元素上
  toast.$mount(document.createElement('div'))

  //4. toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj

```
(3) 在`main.js`文件中全局安装
```js
import toast from 'components/common/toast/index'
Vue.use(toast)
```
(4)在组件中使用
```js
this.$toast.show('填写弹窗内容', 1500)
```
7. 格式化事件过滤函数封装
```js
//date传入的是毫秒格式，fmt为过滤后的时间格式
filterTime(date, fmt) {
  if(/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4-RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for(let k in o) {
    let _RegExp = new RegExp(`(${k})`)
    if( _RegExp.test(fmt) ) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
    }
  }
  return fmt
}
```
8. 网络请求封装
```js
import axios from 'axios'

import { MessageBox, Indicator } from 'mint-ui'

export function request(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {'X-Requested-With': 'XMLHttpRequest'}
  });

  //请求拦截
  instance.interceptors.request.use(config => {
    //加载中出现的请求图标
    Indicator.open({
      spinnerType: 'fading-circle'
    })
    return config
  }, err => {
    MessageBox.alert('数据加载超时,请检查您的网络或稍后重试!').then(action => {
      Indicator.close()
    });
    return Promise.reject(err)
  })

  //相应拦截
  instance.interceptors.response.use(res => {
    //请求获取数据后关闭加载图标
    Indicator.close()
    return res.data
  }, err => {
    MessageBox.alert('数据加载失败!').then(action => {
      Indicator.close()
    });
    return Promise.reject(err)
  })

  //发送真正网络请求
  return instance(config)
}
```
```js
//使用封装好的网络请求
import { request } from './request'

export function queryBrandList(brandName = '') {
  return request({
    url: '/brand/queryBrandList.shtml',
    params: { brandName },
    method: 'post'
  })
}

```
```js
//组件中调用
created() {
  this.getQueryBrandList()
},
methods: {
  getQueryBrandList() {
      queryBrandList().then(res => {
        this.brandMap = res.result.brandMap
        this.hotBrandList = res.result.hotBrandList
      })
    }
  }
```

9. 路由的懒加载
```js
import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')

const routes = [
  {
    path: '/home',
    component: Home,
    meta: {
      title: '唯妮海购'
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
```
10. 全局守卫，前置守卫修改`document.title`在`main.js`文件中添加以下代码
```js
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
```
11. 利用vuex来获取 `publicKey`
```js
import Vue from 'vue'
import Vuex from 'vuex'

import { getpublickey } from 'network/login'

import md5 from 'utils/md5'
import 'utils/RSAUtils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userMessage: {},
    isLogin: false
  },
  mutations: {
    updateUserMessage(state, payload) {
      state.userMessage = payload.userMessage
      state.isLogin = payload.isLogin
    }
  },
  actions: {
    updateUserMessage_1(context, payload) {
      context.commit('updateUserMessage', payload);
    },
    getKey(context, payload) {
      return new Promise((resolve, reject) => {
        let key = ''
        getpublickey().then(res => {
          key = RSAUtils.getKeyPair(res.result.exponent, "", res.result.modulus)
          let re_password = RSAUtils.encryptedString(key, md5(payload.password), RSAUtils.NoPadding) 
          resolve(re_password)
        }).catch(err => {
          console.log(err)
        })
      })
    }
  },
  modules: {
  }
})

```
```js
//使用封装好的vuex
data() {
  return {
    newPsw_1: '',
    newPsw_2: ''
  }
}
methods: {
  confirmBtn() {
    if (/^\w{6,20}$/.test(this.newPsw_1.trim())) {
      if (/^\w{6,20}$/.test(this.newPsw_2.trim())) {
        if (this.newPsw_1.trim() == this.newPsw_2.trim()) {
          this.$store.dispatch('getKey',{
            password: this.newPsw_1.trim()
          }).then(data => {
            return data
          }).then(re_newPsw_1 => {
            this.$store.dispatch('getKey',{
              password: this.newPsw_2.trim()
            }).then(data => {
              //...表示其他传入参数省略了
              findPwdByUpdate({..., pwd: re_newPsw_1, newPwd: data}).then(res => {
                console.log(res)
                if (res.msg=='00000000') {
                  this.$router.push('/setPswSuccess')
                } else {
                  this.$toast.show('修改密码失败', 1500)
                }
              }).catch(err => {
                console.log(err)
              })
            })
          })
        } else {
          this.$toast.show('两次密码不一致', 1500)
        }
      } else {
        this.$toast.show('密码为空或者格式不正确（长度在6-20位之间）', 1500)
      }
    } else {
      this.$toast.show('密码为空或者格式不正确（长度在6-20位之间）', 1500)
    }
  }
}
```
12. 图片懒加载利用插件`vue-lazyload`
```js
//安装插件
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  loading: require('assets/img/error.jpg'),
  error: require('assets/img/error.jpg')
})
```
```html
//使用图片懒加载功能v-lazy，@load="imageLoad"表示图片加载完成后调用函数imageLoad
<img class="brand-icon" v-lazy="item.brandLogo"  onerror='this.src="http://www.weinihaigou.com/m-images/error.jpg"' alt="" @load="imageLoad" >
```
13. 登录页面需要获取上一次跳转过来的页面，等登录成功后直接跳转回上一个页面利用导航守卫函数
```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    //因为当钩子执行前，组件实例还没被创建
    // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
    vm.fromUrl = from.fullPath
  })
}
```
14. 上下跑马灯效果
```html
<div class="notice" @click="toPublicPage">
  <img class="icon" src="~assets/img/common/music.svg" alt="">
  <marquee v-if="noticeList.length"  behavior="scroll" direction="up" scrollamount="1" scrolldelay="0" loop="-1">
    <p class="text-overflow1" v-for="item in noticeList" :key="item.id">{{item.title}}</p>
  </marquee>
</div>
```
```less
.notice{
  height: 20px;
  overflow: hidden;
  display: flex;
  background-color: #fff;
  .icon{
    width: 20px;
    height: 20px;
    margin: 0 10px;
  }
  marquee{
    flex: 1;
    height: 20px;
  }
  p{
    font-size: 12px;
    color: #4d4d4d;
    padding: 4px 0;
  }
}
```
