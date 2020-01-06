import axios from 'axios'

import { MessageBox } from 'mint-ui'

let _vm
export function request(config, vm) {
  if (vm != undefined) {
    _vm = vm
  }
  //创建axios实例
  const instance = axios.create({
    // baseURL: '/api',
    baseURL: '',
    timeout: 5000,
    headers: {'X-Requested-With': 'XMLHttpRequest'}
  });
  
  //请求拦截
  instance.interceptors.request.use(config => {
    // Indicator.open({
    //   spinnerType: 'fading-circle'
    // })
    _vm.$loading.show()
    return config
  }, err => {
    MessageBox.alert('数据加载超时,请检查您的网络或稍后重试!').then(action => {
      // Indicator.close()
      _vm.$loading.hide()
    });
    return Promise.reject(err)
  })

  //相应拦截
  instance.interceptors.response.use(res => {
    // Indicator.close()
    _vm.$loading.hide()
    return res.data
  }, err => {
    MessageBox.alert('数据加载失败!').then(action => {
      // Indicator.close()
      _vm.$loading.hide()
    });
    return Promise.reject(err)
  })

  //发送真正网络请求
  return instance(config)
}