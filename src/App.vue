<template>
  <div id="app" v-on:touchstart="bodyTouchStart" v-on:touchmove="bodyTouchMove" v-on:touchend="bodyTouchEnd">
    <transition :name="direction" v-if="isRouterAlive">
      <router-view :isNext="isNext" />
    </transition>
  </div>
</template>

<script>
  import {
    leftTo
  } from './common/js/mixin'
  export default {
    name: 'App',
    mixins: [leftTo],
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true,
        isNext: true
      }
    },
    created() {
      const _this = this
      const postJSON = function(url) {
        const promise = new Promise(function(resolve, reject) {
          const handler = function() {
            if (this.readyState !== 4) {
              return
            }
            if (this.status === 200) {
              resolve(this.response)
            } else {
              reject(new Error(this.statusText))
            }
          }
          const client = new XMLHttpRequest()
          client.open('post', url, false)
          client.onreadystatechange = handler
          // client.responseType = 'json'
          client.setRequestHeader(
            'Content-Type',
            'application/x-www-form-urlencoded'
          )
          client.send()
        })
        return promise
      }
      mui.plusReady(function() {
        if (mui.os.android) {
          mui.getJSON('./manifest.json', null, function(data) {
            var version = data.version
            var vername_local = version.name
            // 当前版本
            // alert('版本名称：' + vername_local)
            postJSON(
              'https://ccbs.carcredit.com.cn/appdealer/app/defaultOpenPath/getAppVersionInfo'
            ).then(
              function(data) {
                var _data = JSON.parse(data)
                var verCode = _data.data.verCode
                localStorage.setItem('version', verCode)
                // 服务器版本
                // alert('服务器版本code:' + verCode)
                if (vername_local == verCode) {
                  // mui.toast('当前已经是最新版本！')
                } else {
                  _this.isNext = false
                  mui.toast('检测到最新版本！')
                  installApk(
                    'https://carcredit-public-download.oss-cn-beijing.aliyuncs.com/kaer.apk'
                  )
                }
              },
              function(error) {
                console.error('err', error)
              }
            )
          })
        } else {
          plus.runtime.getProperty(plus.runtime.appid, function(inf) {
            var ver = inf.version
            postJSON(
              'https://ccbs.carcredit.com.cn/appdealer/app/defaultOpenPath/getAppVersionInfo'
            ).then(
              function(data) {
                var _data = JSON.parse(data)
                var verCode = _data.data.verCode
                localStorage.setItem('version', verCode)
                // 服务器版本
                // alert('服务器版本code:' + verCode)
                if (ver == verCode) {
                  // mui.toast('当前已经是最新版本！')
                } else {
                  _this.isNext = true
                  mui.toast('检测到最新版本！')
                }
              },
              function(error) {
                console.error('err', error)
              }
            )
          })
        }
      })

      function installApk(url) {
        var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
          if (status == 200) {
            plus.nativeUI.toast('正在准备环境，请稍后！')
            var path = d.filename
            plus.runtime.install(path)
          } else {
            alert('Download failed:' + status)
          }
        })
        dtask.start()
      }
    },
    mounted() {},
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(() => {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>

<style lang="less">
  html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;

    body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      font-family: NotoSansSC-Regular;
      background: rgba(246, 246, 246, 1);
      transition: transform 0.24s ease-out;
    }

    .viewMainTabbar,
    .pageMain {
      // position: absolute;
      width: 750px;
      background: #fff;
      min-height: 100vh;
      transition: transform 0.24s ease-out;
      transition: all 0.3s;

      .appView {
        width: 750px;
        min-height: 100vh;
      }
    }

    #app {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      width: 100%;
      overflow-x: hidden;
      position: relative;
      background: rgba(255, 255, 255, 1);

      .slide-right-enter-active,
      .slide-right-leave-active,
      .slide-left-enter-active,
      .slide-left-leave-active {
        will-change: transform;
        transition: all 300ms;
        position: absolute;
      }

      .slide-right-enter {
        opacity: 0;
        transform: translate3d(0, 0, 0);
      }

      .slide-right-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
      }

      .slide-left-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
      }

      .slide-left-leave-active {
        opacity: 0;
        transform: translate3d(0, 0, 0);
      }
    }

    #app.quickback {
      .slide-left-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 50px);
      }

      .slide-left-leave-active {
        opacity: 0;
        transform: translate3d(0, 0, 0);
      }
    }
  }
</style>
