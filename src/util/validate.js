import Vue from 'vue'
import VeeValidate, {
  Validator
} from 'vee-validate'
import cn from 'vee-validate/dist/locale/zh_CN'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh_CN'
})
Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    cn
  }
})
const dict = {
  zh_CN: {
    messages: {
      required: (username) => `${username}不能为空!`
    }
  } // name接受alias的值.
}
Validator.extend('pwd', {
  getMessage: () => `原始密码错误`,
  validate: value =>
    !/^[\u4e00-\u9fa5]+$/.test(value) && sessionStorage.getItem('password') == value
})
Validator.extend('newPwd', {
  getMessage: () => `请输入正确的密码`,
  validate: value =>
    !/^[\u4e00-\u9fa5]+$/.test(value)
})
Validator.extend('againPwd', {
  getMessage: () => `请再次确认密码`,
  validate: value =>
    !/^[\u4e00-\u9fa5]+$/.test(value) && sessionStorage.getItem('newPwd') == value
})
Validator.extend('userZh', {
  getMessage: () => `请输入正确的用户名`,
  validate: value =>
    /^[^\u4e00-\u9fa5]+$/.test(
      value
    )
})
Validator.extend('userName', {
  getMessage: () => `姓名输入错误`,
  validate: value =>
    /^[\u4E00-\u9FA5|·]{2,20}$/.test(
      value
    )
})
Validator.extend('idCard', {
  getMessage: () => `身份证号输入错误`,
  validate: value =>
    /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    )
})
Validator.extend('isMobile', {
  getMessage: () => `手机号输入错误`,
  validate: value =>
    /^[1][1-9][0-9]{9}$/.test(
      value
    )
})
Validator.extend('isCode', {
  getMessage: () => `验证码错误`,
  validate: value =>
    /^\d{6}$/.test(
      value
    )
})

Validator.extend('isNum', {
  getMessage: () => `请输入数字类型`,
  validate: value =>
    /^\+?[0-9][0-9]*$/.test(
      value
    )
})
Validator.extend('bankCard', {
  getMessage: () => `银行卡输入错误`,
  validate: value => {
    if (value == '') {
      return false
    }
    if (value.length < 16 || value.length > 19) {
      return false
    }
    var num = /^\d*$/ // 全数字
    if (!num.exec(value)) {
      return false
    } // 开头6位
    var strBin =
      '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99'
    if (strBin.indexOf(value.substring(0, 2)) == -1) {
      return false
    }
    return true
  }

})
Validator.extend('isNull', {
  getMessage: () => `请检查表单项`,
  validate: value => {
    if (/\S/.test(value) || value == null || value == '') {
      return true
    }
    return false
  }
})
Validator.extend('servicePack', {
  getMessage: () => `服务包输入有误`,
  validate: value => {
    const regex = new RegExp(/^\d{1,9}00$/)
    if (regex.test(value) && value <= 2000 && value > 0) {
      return true
    }
    return false
  }
})
Validator.extend('insuranceFinance', {
  getMessage: () => `保险融资额输入有误`,
  validate: value => {
    const regex = new RegExp(/^\d{1,9}00$/)
    if (regex.test(value) && value <= 5000 && value > 0) {
      return true
    }
    return false
  }
})
Validator.localize(dict)
