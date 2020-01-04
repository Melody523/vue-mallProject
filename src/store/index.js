import Vue from 'vue'
import Vuex from 'vuex'

import { login, getpublickey } from 'network/login'

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
      console.log(payload)
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
