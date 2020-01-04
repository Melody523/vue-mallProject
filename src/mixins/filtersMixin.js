var filtersMixin = {
  filters: {
    deliveryTypeFilter(value) {
      switch (value) {
        case '1' || 1:
          return '保税区邮'
          break;
        case '2' || 2:
          return '香港直邮'
          break;
        case '4' || 4:
          return '海外直邮'
          break;
        case '5' || 5:
          return '国内发货'
          break;
        default:
          break;
      }
    },
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
  }
}

export default filtersMixin
