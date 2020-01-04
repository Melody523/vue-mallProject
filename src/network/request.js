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