<template>
  <div class="header">
    <van-nav-bar :title="title" :left-arrow="leftArrow" @click-left="routePush()" v-if="showComplete">
      <template #right>
        <van-button>完成</van-button>
      </template>
    </van-nav-bar>
    <van-nav-bar :title="title" :left-arrow="leftArrow" @click-left="routePush()" v-if="showPoint">
      <template #right>
        <img class="dian_img" src="../../../static/img/3dian.png" @click="showDetailpop" />
      </template>
    </van-nav-bar>
    <van-nav-bar :title="title" :left-arrow="leftArrow" @click-left="routePush()" v-if="showSearch">
      <template #right>
        <img class="search_img" src="../../../static/img/search.png" />
      </template>
    </van-nav-bar>
    <van-nav-bar :title="title" :left-arrow="leftArrow" @click-left="routePush()" v-if="showConversion">
      <template #right>
        <img class="converion_img" :src="conversionType ? '../../../static/img/conversionup.png' : '../../../static/img/conversiondown.png'" @click="conversionClick" />
      </template>
    </van-nav-bar>
    <van-nav-bar :title="title" :left-arrow="leftArrow" @click-left="routePush()" v-if="!showSearch && !showPoint && !showComplete && !showConversion"></van-nav-bar>
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
      },
      showComplete:{
        type: Boolean,
        default: false
      },
      showPoint:{
        type: Boolean,
        default: false
      },
      showSearch: {
        type: Boolean,
        default: false
      },
      showConversion:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        conversionType: true
      }
    },
    methods: {
      routePush() {
        if (this.$route.name == 'log-details' || this.$route.name == 'weekly') {
          this.$emit('backtoSave')
          return;
        }
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
      },
      showDetailpop(){
        this.$emit('showDetailpop')
      },
      conversionClick(){
        this.type = !this.type
        this.$emit('conversionClick', type)
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .dian_img{
    width: 36px;
    height: 36px;
    margin-right: 30px;
  }
  .search_img{
    width: 40px;
    height: 40px;
    margin-right: 30px;
  }
  .converion_img{
    width: 48px;
    height: 48px;
    margin-right: 48px;
  }

  .header {
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
          background: url(../../../static/img/barBack.png) no-repeat;
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

    .van-button{
      width: 92px;
      height: 52px;
      background: #0D88FF;
      border-radius: 26px;
      font-size: 24px;
      color: #FFFFFF;
      line-height: 52px;
      .van-button::before{
        border: none;
      }
    }
    .van-button--default{
      border: none;
    }

  }
</style>
