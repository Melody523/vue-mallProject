import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import FastClick from 'fastclick'

import toast from 'components/common/toast/index'

Vue.config.productionTip = false

Vue.use(toast)
Vue.use(VueLazyLoad, {
  loading: require('assets/img/error.jpg'),
  error: require('assets/img/error.jpg')
})
// console.log(toast)

//添加事件总线对象
Vue.prototype.$bus = new Vue()

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
