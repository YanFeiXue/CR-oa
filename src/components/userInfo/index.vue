<template>
  <section class="userInfo appView" id="leftToDom">
    <van-nav-bar left-text="我" class="mbNone"> </van-nav-bar>
    <section class="userInfo-wrapper">
      <div class="userInfo-wrapper-header">
        <img src="static/img//head.png" />
        <div class="userInfo-wrapper-item">
          <div>何龙</div>
          <div>大区销售总监</div>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="item tp6">
          <img src="static/img//WDSP@2x.png" />
          <span>我的审批</span>
        </div>
        <div class="item tp6">
          <img src="static/img//WDBX.png" />
          <span>我的报销</span>
        </div>
        <div class="item tp6" @click="$router.push('/pageMain/suspend-work')">
          <img src="static/img//WDQD@2x.png" />
          <span>我的签到</span>
        </div>
      </div>
    </section>
    <section class="userInfo-wrapper">
      <section class="cellWrapper">
        <img src="static/img//XXZX.png" class="icon-cell" />
        <van-cell
          title="消息中心"
          is-link
          @click="$router.push('/pageMain/changePwd')"
        ></van-cell>
      </section>
      <section class="cellWrapper">
        <img src="static/img//WDKF.png" class="icon-cell" />
        <van-cell
          title="我的客服"
          is-link
          @click="$router.push('/pageMain/changePwd')"
        ></van-cell>
      </section>
      <section class="cellWrapper">
        <img src="static/img//XTSZ.png" class="icon-cell" />
        <van-cell
          title="系统设置"
          is-link
          @click="$router.push('/pageMain/changePwd')"
        ></van-cell>
      </section>
      <section class="cellWrapper">
        <img src="static/img//i_click@2x.png" class="icon-cell" />
        <van-cell
          title="修改密码"
          is-link
          @click="$router.push('/pageMain/changePwd')"
        ></van-cell>
      </section>
      <section class="cellWrapper">
        <img src="static/img//i_click@2x.png" class="icon-cell" />
        <van-cell title="版本号" :value="`v${version}`"></van-cell>
      </section>
      <section class="cellWrapper">
        <img src="static/img//i_click@2x.png" class="icon-cell" />
        <van-cell
          title="关于我们"
          is-link
          @click="$router.push('/pageMain/aboutUs')"
        ></van-cell>
      </section>
    </section>
    <van-footer :activeNum="3" />
  </section>
</template>

<script>
import Vue from 'vue'
import { Cell } from 'vant'
Vue.use(Cell)
export default {
  name: 'UserInfo',
  data() {
    return {
      title: '个人中心',
      version: '',
      tokenId: sessionStorage.getItem('tokenid')
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.version = localStorage.getItem('version') || '3.1'
    })
  },
  methods: {
    // _getAppVersionInfo() {
    //   getAppVersionInfo({}).then(data => {
    //     this.version = data.data.verCode
    //   })
    // },
    _logout() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确定要退出吗?'
        })
        .then(() => {
          // if (this.isXrtxUser()) {
          //   xrtxLogout({ accessToken: this.tokenId }).then(data => {
          //     this.logoutCallback(data)
          //   })
          // } else {
          //   logout({ accessToken: this.tokenId }).then(data => {
          //     this.logoutCallback(data)
          //   })
          // }
          this.logoutCallback()
        })
        .catch(() => {
          // on cancel
        })
    },
    logoutCallback(data) {
      // if (!data) {
      //   this.$toast.fail('系统错误!')
      //   return
      // }
      // if (data.code != '0') {
      //   this.$toast.fail('系统错误!')
      //   return
      // }
      this.$toast('退出成功!')
      setTimeout(() => {
        this.$toast.clear()
        sessionStorage.clear()
        localStorage.clear()
        this.$router.push('/login')
      }, 500)
    },
    isXrtxUser() {
      if (localStorage.getItem('isXrtx') == 'true') {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="less">
.userInfo.appView {
  background-color: #fff !important;
  .userInfo-wrapper {
    width: 702px;
    height: auto;
    min-height: 214px;
    background: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
    border-radius: 24px;
    padding: 20px 24px;
    box-sizing: border-box;
    margin: 20px auto;
    .userInfo-wrapper-header {
      padding: 30px;
      display: flex;
      height: 95px;
      img {
        width: 95px;
      }
      .userInfo-wrapper-item {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-family: PingFangSC-Regular, PingFang SC;
        padding: 0 20px;
        div:first-child {
          font-size: 32px;
          font-weight: 600;
        }
        // span:last-child {
        //   font-size: 26px;
        //   color: rgba(156, 156, 156, 1);
        // }
      }
    }
    .item-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 20px;
      .item {
        width: 200px;
        padding: 0 0px;
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        position: relative;
        img {
          width: 64px;
          height: 64px;
          margin: 10px 0;
        }
        span {
          padding: 6px 0;
        }
        .h104 {
          height: 86px;
        }
      }
    }
  }
  .cellWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    .icon-cell {
      width: 32px;
    }
    .van-cell {
      width: 91%;
      padding: 20px 0;
      .van-cell__title {
        font-size: 32px;
        color: #1f1f1f;
      }
      .van-cell__value {
        font-size: 30px;
      }
      .van-cell__right-icon {
        color: #c6c6c6;
        font-size: 34px;
      }
    }
  }
  .van-button {
    width: 662px;
    height: 98px;
    display: block;
    color: rgba(34, 167, 142, 1);
    background: none;
    font-size: 36px;
    margin: 500px auto 0;
  }
}
</style>
