<template>
  <div class="header">
    <van-nav-bar :title="title" :left-arrow="leftArrow" @click-left="routePush()"></van-nav-bar>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      title: {
        type: String,
        default: ''
      },
      routeName: {
        type: String,
        default: '/viewMain'
      },
      path: {
        type: String,
        default: '-1'
      },
      leftArrow: {
        type: Boolean,
        default: true
      }
    },

    data() {
      return {}
    },
    methods: {
      routePush() {
        if (this.path == '-1') {
          if (this.routeName == 'back' || this.routeName == '') {
            window.history.go(-1)
            return
          }
          this.$router.push(this.routeName)
        } else {
          this.$router.push({
            path: this.routeName,
            query: {
              path: this.path
            }
          })
        }
        document.getElementById('app').classList.add('quickback')
        setTimeout(function() {
          document.getElementById('app').classList.remove('quickback')
        }, 250)
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .header{
    box-shadow: 0px 4px 40px 0px rgba(227, 227, 227, 0.5);
  }
  /deep/ {
    .van-nav-bar__title {
      font-weight: bold;
    }

    .van-nav-bar {
      height: 98px;
      background-color: rgba(255, 255, 255, 1);
      margin-bottom: 20px;

      .van-nav-bar__content {
        height: auto;
      }

      .van-nav-bar__left {
        left: 10px;

        .van-nav-bar__text {

          font-size: 30px;
          font-weight: 600;
          color: #333333;
          display: inline-block;
        }

        .van-icon-arrow-left:before {
          content: '';
        }

        .van-icon-arrow-left {
          font-size: 30px;
          background: url(../../assets/barBack.png) no-repeat;
          background-size: 100% 100%;
          width: 28px;
          height: 28px;
        }
      }

      .van-nav-bar__right {
        .van-icon {
          font-size: 40px;
          color: #000;
        }

        .myIcon {
          width: 36px;
        }

        .van-icon-wap-nav:before {
          content: '';
        }
      }

      .van-nav-bar__title {
        height: 98px;
        line-height: 98px;
        font-size: 36px;
        color: rgba(54, 54, 54, 1);
      }
    }
  }


</style>
