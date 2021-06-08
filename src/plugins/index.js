// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Loadmore } from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/util/validate' // 验证规则
import 'vant/lib/index.css'
// import '@/assets/style/style.less'
import 'lib-flexible/flexible.js'
import FastClick from 'fastclick'
import bus from 'vue-bus'
import NoDetails from '@/base/noDetails/noDetails'
import Header from '@/base/Header'
import Footer from '@/base/Footer'
import touch from 'vue-directive-touch'
import Mui from 'vue-awesome-mui'
import dictionary from '@/common/js/dictionary'
Vue.prototype.$dictionary = dictionary
Vue.use(Mui)
Vue.use(touch)
Vue.use(bus)
FastClick.attach(document.body)
import {
  Button,
  Toast,
  NavBar,
  Icon,
  Field,
  Dialog
} from 'vant'
Vue.use(Button).use(Toast).use(NavBar).use(Icon).use(Field).use(Dialog)
Vue.component('van-details', NoDetails)
Vue.component('van-header', Header)
Vue.component('van-footer', Footer)
Vue.component(Loadmore.name, Loadmore)
Vue.filter('strFilter', function (value, regStr, relStr) {
  let str = ''
  if (value === undefined) {
    return str
  } else {
    str = value.replace(new RegExp(regStr, 'g'), relStr)
    return str
  }
})
window.onresize = setHtmlFontSize
function setHtmlFontSize() {
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  const htmlDom = document.getElementsByTagName('html')[0]
  htmlDom.style.fontSize = htmlWidth / 10 + 'px'
};
setHtmlFontSize()
Vue.config.productionTip = false
Array.prototype.contains = function (obj) {
  var i = this.length;
  while (i--) {
    if (this[i].authority === obj) {
      return true;
    }
  }
  return false;
};
