<template>
  <section class="login">
    <!-- <div class="fixTop" v-if="fixTop">
      截屏内容已被监测，请谨慎分享。
      <span class="fixTopBtn" @click="fixTop= !fixTop">x</span>
    </div> -->
    <nav class="login-title">欢迎登陆</nav>
    <div class="inputcss flex jc-sb fl-w" v-show="step">
      <div class="wrapField">
        <van-field placeholder="请输入账户" v-model="username" clearable ref="username" @click="focusThis('username')"
          v-validate="'required|userZh'" name="userZh" :error="errors.has('userZh')"
          :error-message="errors.first('userZh') | strFilter('userZh', '账号')"></van-field>
        <div class="animateLine"></div>
        <span class="iconStyle">账户</span>
      </div>

      <div class="wrapField">
        <van-field placeholder="请输入密码" v-model="password" clearable ref="password" @click="focusThis('password')"
          :type="lockAc ? 'password' : 'text'" v-validate="'required|newPwd'" name="newPwd"
          :error="errors.has('newPwd')" :class="errors.has('newPwd') ? 'error' : 'sucess'"
          :error-message="errors.first('newPwd') | strFilter('newPwd', '密码')"></van-field>
        <span class="iconStyle">密码</span>
      </div>
      <section class="wrapField">
        <div class="service">
          <div class="icon_style" @click="isActive = !isActive">
            <i class="icon-choose" :class="isActive ? 'icon-choose-active' : 'icon-choose'"></i>
          </div>

          <div class="text">
            <span>我已阅读并同意</span>
            <span>
              <em @click="jump('自然人用户保密协议', 1)">《自然人用户保密协议》</em>
              <em @click="jump('服务使用协议', 0)">《服务使用协议》</em>
              <em @click="jump('个人信息保护政策', 2)">《个人信息保护政策》</em>
            </span>
          </div>
        </div>
      </section>
      <van-button class="m0a sign" ref="sign" :disabled="queryIfAgentFlag" @click="_queryIfAgent()">立即登录</van-button>
    </div>
    <div class="sendCode-wrap inputcss" v-show="!step">
      <div class="wrapField">
        <van-field placeholder="请输入手机号" v-model="mobile" clearable ref="mobile" :readonly="!isAgent"
          @click="focusThis('mobile')" v-validate="'required|isMobile'" name="isMobile" :error="errors.has('isMobile')"
          :error-message="
            errors.first('isMobile') | strFilter('isMobile', '手机号')
          "></van-field>
        <div class="animateLine"></div>
        <span class="iconStyle">手机号</span>
      </div>
      <div class="wrapField code">
        <van-field placeholder="请输入验证码" v-model="msgContent" clearable ref="msgContent" @click="focusThis('msgContent')"
          v-validate="'required|isCode'" name="isCode" :error="errors.has('isCode')" :error-message="
            errors.first('isCode') | strFilter('isCode', '验证码')
          "></van-field>
        <span class="sendMsgBtn" ref="code" @click="sendMsgContent()">获取验证码</span>
        <span class="iconStyle">验证码</span>
      </div>
      <van-button type="primary" class="checkAuthCode" @click="_checkAuthCode()">立即登录</van-button>
      <!-- :disabled="checkAuthCodeFlag" -->
      <van-button type="primary" class="backPrev" @click="step = true">返回上一步</van-button>
    </div>
  </section>
</template>

<script>
import {
  checkLogin,
  sendSms,
  checkAppAuthCode,
  xrtxCheckLogin,
  xrtxSendSms,
  xrtxCheckAppAuthCode,
  addLoginLog,
} from '@/api/api'
import Vue from 'vue'
import { Field, Icon } from 'vant'
Vue.use(Field).use(Icon)
const u = navigator.userAgent
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
export default {
  name: 'Login',
  data() {
    return {
      password: '',
      username: '',
      mobile: '',
      msgContent: '',
      lockAc: true,
      step: true,
      sendFlag: true,
      isAgent: true,
      queryIfAgentFlag: false,
      checkAuthCodeFlag: false,
      isActive: false,
      fixTop: true,
      isXrtx: localStorage.getItem('isXrtx'),
    }
  },
  props: {
    isNext: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    this.initParams()
  },
  mounted() {
    this.isExpired()
  },
  watch: {
    isActive(newVal) {
      localStorage.setItem('isActive', newVal)
    },
  },
  methods: {
    focusThis(id) {
      this.$refs[id].focus()
    },
    jump(title, flag) {
      this.$router.push({
        path: 'service',
        query: {
          title: title,
          flag: flag,
        },
      })
    },
    sendMsgContent() {
      this.$validator.validate('isMobile').then((valid) => {
        if (valid && this.sendFlag) {
          this._sendSms()
        }
      })
    },
    // 发送验证码
    _sendSms() {
      const _params = {
        username: this.username,
        password: this.password,
        userPhone: this.mobile,
        loginType: 1,
      }
      if (this.isXrtxUser()) {
        xrtxSendSms(_params).then((data) => {
          if (data.code != '0') {
            this.$toast.fail(data.msg)
            return
          }
          this.initCreatedLogin()
          this.checkCodeCountDown(60)
        })
      } else {
        sendSms(_params).then((data) => {
          if (data.code != '0') {
            this.$toast.fail(data.msg)
            return
          }
          this.initCreatedLogin()
          this.checkCodeCountDown(60)
        })
      }
    },
    // 递归--
    checkCodeCountDown(time) {
      if (this.$refs.code == undefined) {
        return
      }
      this.$refs.code.innerText = time + '秒后重新发送'
      this.sendFlag = false
      if (time-- > 0) {
        setTimeout(() => {
          this.checkCodeCountDown(time)
        }, 1000)
      } else {
        this.sendFlag = true
        this.$refs.code.innerText = '获取验证码'
      }
    },
    validAgent() {
      this.$validator.validate('userZh').then((valid) => {
        if (valid) {
          this.$validator.validate('newPwd').then((valid) => {
            if (valid) {
              this._queryIfAgent()
            }
          })
        }
      })
    },
    _queryIfAgent() {
      if (!this.isActive) {
        this.$toast.fail('请勾选使用服务协议')
        return
      }
      const _params = {
        username: this.username,
        password: this.password,
        loginType: 1,
      }
      if (this.isXrtxUser()) {
        localStorage.setItem('isXrtx', true)
        xrtxCheckLogin(_params).then((data) => {
          this._loginEnd(data)
        })
      } else {
        localStorage.setItem('isXrtx', false)
        checkLogin(_params).then((data) => {
          // 查询角色
          this._loginEnd(data)
        })
      }
    },
    _loginEnd(data) {
      if (data.code != 0) {
        this.$toast.fail(data.msg)
        return
      }
      if (data.data.role == 'admin') {
        this.queryIfAgentFlag = true
        this.setSessionItem(data.data.data)
        return
      }
      if (data.data.role == 'user') {
        if (
          data.data.roleName == '大区经理' ||
          data.data.roleName == 'xrtx大区经理'
        ) {
          sessionStorage.setItem('isAllProcess', true)
        } else {
          sessionStorage.removeItem('isAllProcess')
        }
        this.userLogin(data.data.userPhone)
      }
      if (data.data.role == 'dealer') {
        this.isAgent = true
      }

      setTimeout(() => {
        this.step = false
      }, 200)
    },
    userLogin(userPhone) {
      this.mobile = userPhone
      this.initCreatedLogin()
      this.checkCodeCountDown(60)
    },
    // 登录
    _checkAuthCode() {
      this.$validator.validate().then((valid) => {
        if (valid) {
          const _params = {
            username: this.username,
            password: this.password,
            authCode: this.msgContent,
            userPhone: this.mobile,
          }
          this.checkAuthCodeFlag = true
          if (this.isXrtxUser()) {
            xrtxCheckAppAuthCode(_params).then((res) => {
              if (res.code != 0) {
                // res.code == 10010   ?验证码超时:验证码错误
                if (res.code == '10010') {
                  this.$toast.fail('登录过期,请重新登录')
                } else {
                  this.$toast.fail(res.msg)
                }
                return
              }
              this.setSessionItem(res.data)
            })
          } else {
            checkAppAuthCode(_params).then((res) => {
              if (res.code != 0) {
                if (res.code == '10010') {
                  this.$toast.fail('登录过期,请重新登录')
                } else {
                  this.$toast.fail(res.msg)
                }

                return
              }
              this.setSessionItem(res.data)
            })
          }
        }
      })
    },
    isXrtxUser() {
      if (
        this.username.substr(0, 2) == 'xr' ||
        this.username.substr(0, 2) == 'XR'
      ) {
        return true
      }
      return false
    },
    initCreatedLogin() {
      const obj = {
        time: Date.now(),
        expire: 11 * 60 * 60 * 1000,
      }
      localStorage.setItem('username', this.username)
      localStorage.setItem('password', this.password)
      localStorage.setItem('mobile', this.mobile)
      localStorage.setItem('isExpired', JSON.stringify(obj))
    },
    isExpired() {
      if (localStorage.getItem('isExpired') == null) {
        return
      }
      const val = JSON.parse(localStorage.getItem('isExpired'))
      if (Date.now() - val.time > val.expire) {
        this.$toast.fail('登录过期,请重新登录!')
        this.clearAllToast()
        localStorage.clear()
        sessionStorage.clear()
      } else {
        this._checkAuthCode()
      }
    },
    clearAllToast() {
      setTimeout(() => {
        this.$toast.clear()
      }, 500)
    },
    initParams() {
      sessionStorage.setItem('tokenid', '')
      this.username = localStorage.getItem('username') || ''
      this.password = localStorage.getItem('password') || ''
      this.mobile = localStorage.getItem('mobile') || ''
      this.msgContent = localStorage.getItem('msgContent') || ''
      localStorage.getItem('isActive') == 'true'
        ? (this.isActive = true)
        : (this.isActive = false)
    },
    setSessionItem(res) {
      sessionStorage.setItem('password', this.password)
      sessionStorage.setItem('loginName', this.username)
      sessionStorage.setItem('customId', res.customerId)
      sessionStorage.setItem('tokenid', res.accessToken)
      localStorage.setItem('msgContent', this.msgContent)
      isAndroid
        ? sessionStorage.setItem('isAndroid', true)
        : sessionStorage.setItem('isAndroid', false)
      this.getLocation() // 获取定位  调用登录地址
      sessionStorage.setItem('accessToken', res.accessToken)
      setTimeout(() => {
        if (this.isNext) {
          this.$router.push('/viewMain/home')
        } else {
          this.$toast.fail('请先更新版本')
        }
      }, 500)
    },
    getLocation() {
      const _this = this
      // 判断是否支持 获取本地位置
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (success) {
            var lat = success.coords.latitude // 纬度
            var lng = success.coords.longitude // 经度
            _this._addLoginLog(lat, lng)
          },
          function (fail) {
            _this.$toast.fail('获取定位失败')
          }
        )
      } else {
        this.$toast.fail('你的手机不支持定位')
      }
    },
    _addLoginLog(lat, lng) {
      const params = {
        username: this.username, // 登陆账户名
        mobile: this.mobile || this.username, // /发送验证码的手机号
        loginType: isAndroid ? 'Android' : 'ISO', // 登陆类型 ISO Android
        latitude: lat || '36.674810799999996', // 纬度
        longitude: lng || '116.98087319999999', // 精度
      }
      addLoginLog(params).then((data) => {
        if (data.code != 0) {
          this.$toast.fail(data.msg)
          return
        }
        this.queryIfAgentFlag = false
        this.checkAuthCodeFlag = false
        // this.$toast.success('获取定位成功')
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.login {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: url('../../../static/img/bg@2x.png') no-repeat;
  background-size: 100% 100%;
  .fixTop {
    width: 100%;
    height: 88px;
    padding-left: 40px;
    line-height: 88px;
    font-size: 28px;
    top: 0;
    position: absolute;
    color: #fff;
    background: #56b8ad;
    z-index: 99;
    .fixTopBtn {
      float: right;
      display: block;
      width: 80px;
      text-align: center;
      font-size: 38px;
      margin-right: 40px;
    }
  }
  .login-title {
    width: 100%;
    text-align: left;
    position: absolute;
    top: 320px;
    left: 60px;
    font-size: 44px;
    font-weight: 600;
    color: #333333;
  }
  .inputcss {
    padding-top: 400px;
    position: relative;
  }
  .wrapField {
    position: relative;
    width: 700px;
    margin: 0 auto;
    .service {
      width: 700px;
      position: relative;
      .icon_style {
        width: 60px;
        height: 60px;
        top: -10px;
        left: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
      }
      .icon-choose,
      .icon-choose-active {
        display: block;
        width: 30px;
        height: 30px;
      }
      .text {
        width: 600px;
        margin-left: 80px;
        font-size: 22px;
        // color: rgba(255, 255, 255, 0.45);
        span:first-child {
          line-height: 30px;
        }
        span:last-child {
          line-height: 30px;
        }
        span {
          em {
            font-style: normal;
          }
        }
      }
    }
    .iconStyle {
      position: absolute;
      width: 78px;
      height: 40px;
      display: block;
      line-height: 36px;
      text-align: left;
      left: 38px;
      bottom: 64px;
      font-size: 30px;
      color: #333333;
      border-right: 2px solid #fff;
    }
  }
  .sendCode-wrap {
    .wrapField {
      .sendMsgBtn {
        position: absolute;
        line-height: 128px;
        display: block;
        right: 50px;
        bottom: 0;
        color: #fff;
      }
      .iconStyle {
        width: 108px;
        line-height: 36px;
        text-align: left;
        left: 48px;
        bottom: 40px;
        font-size: 30px;
        color: #fff;
        border-right: 2px solid #fff;
      }
    }
    .van-cell {
      .van-field__control {
        height: 100%;
        line-height: 130%;
        padding-left: 50px;
        font-size: 34px;
        // color: #fff;
        margin-left: 38px;
      }
      .van-cell__value {
        .van-field__error-message {
          position: absolute;
          left: 170px;
          bottom: -24px;
          font-size: 20px;
        }
      }
    }

    .code.wrapField {
      .van-cell {
        .van-cell__value {
          .van-field__body {
            .van-icon-clear {
              right: 160px;
            }
          }
        }
      }
    }
  }
  .van-cell {
    margin: 20px auto;
    font-size: 32px;
    display: flex;
    align-items: flex-start;
    position: relative;
    overflow: initial;
    background: none;
    .van-cell__title,
    .van-cell__value {
      height: 108px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      overflow: initial;
    }

    .van-cell__value {
      position: initial;

      .van-field__body {
        width: 542px;
        height: 108px;
        padding: 0 30px;
        border-bottom: 1px solid #e9e9e9;
        .van-icon-clear {
          font-size: 38px;
          // color: #fff;
        }
      }
      .van-field__control {
        height: 100%;
        line-height: 130%;
        padding-left: 50px;
        font-size: 34px;
        // color: #fff;
      }
      .van-field__control::-webkit-input-placeholder {
        // color: #fff;
        font-size: 34px;
      }
      .van-field__error-message {
        position: absolute;
        left: 130px;
        bottom: -24px;
        font-size: 20px;
      }
    }
  }

  .van-cell:not(:last-child)::after {
    border: none;
  }
  .van-button.checkAuthCode {
    width: 670px;
    height: 88px;
    display: block;
    background: rgba(255, 255, 255, 1);
    border-radius: 7px;
    font-size: 32px;
    color: rgba(35, 163, 148, 1);
    margin: 70px auto 30px;
    border: none;
  }
  .backPrev.van-button {
    width: 670px;
    height: 88px;
    display: block;
    margin: 0 auto;
    background: #93cfc9;
    border-radius: 7px;
    color: #fff;
    font-size: 32px;
  }
  .sign {
    width: 550px;
    height: 90px;
    background: #24a494;
    border-radius: 22px;
    display: block;
    left: 50%;
    transform: translateX(-50%);
    bottom: -160px;
    position: absolute;
    border: none;
    color: #fff;
    font-size: 30px;
  }
}

.logo {
  display: block;
  width: 390px;
  height: 85px;
  margin: 60px auto;
}
</style>
