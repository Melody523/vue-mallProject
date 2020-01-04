import { checkUser } from 'network/login'

var userMixin = {
  data() {
    return {
      userMessage: {}
    }
  },
  methods: {
    getUserMessage(path) {
      checkUser().then(res => {
        console.log(res)
        if (res.success) {
          this.userMessage = res.result
          if (path) {
            this.$router.replace(path)
          }
        } else {
          this.$router.push('/login')
        }
      }).catch(err => {
        console.log(err)
      })
    },
  }
}

export default userMixin
