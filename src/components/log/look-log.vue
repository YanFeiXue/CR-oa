<template>
  <section>
    <van-header :title="logtitle" path="/viewMain/home"></van-header>
    <van-tabs v-model="active" class="threeItems" @click="scrollTabs">
      <van-tab title="全部日志" name="1"></van-tab>
      <van-tab title="我的日志" name="2"></van-tab>
      <van-tab title="团队日志" name="3"></van-tab>
    </van-tabs>
    <div class="wrapper" ref="wrapper">
      <!-- <ul v-if="logList.length"> -->
        <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <div class="log_item" v-for="(item, index) in 5" :key="index" @click="logListClick(item)">
            <div class="log_item_date">
              <p class="date">2021年04月16日</p>
              <p>星期五</p>
            </div>
            <div class="log_item_content">
              <div class="log_item_img_test">
                <img src="../../assets/img/BXSP.png" />
                <div class="log_item_test">
                  <p class="center_log">莫贤广的销售中心日志</p>
                  <p class="center_date">2021-05-18  14:25</p>
                </div>
              </div>
              <p class="business_trip">是否出差：否</p>
              <p class="trip_city">出差城市：长沙</p>
              <p class="visit_dealer">拜访代理商名称：搬运工车服</p>
              <p class="read">已读</p>
            </div>
          </div>
        </mt-loadmore>
      <!-- </ul> -->
      <!-- <van-details v-else></van-details> -->
    </div>
    <van-footer :activeNum="0" />
  </section>
</template>

<script>
  import Vue from 'vue'
  import {
    Tab,
    Tabs
  } from 'vant'
  Vue.use(Tab).use(Tabs)
  import header from '../../base/Header'
  import footer from '../../base/Footer/logFooter'
  import { loadMore } from '../../common/js/mixin.js'
  export default{
    mixins:[loadMore],
    components: {
      'van-header': header,
      'van-footer': footer
    },
    data() {
      return {
        logtitle: '看日志',
        active: 1,
        logList:[]
      }
    },
    mounted() {

    },
    methods: {
      _getDataInfo(){

      },
      scrollTabs(name) {

      },
      logListClick(){

      },
      logListClick(item){
        this.$router.push({path:'/pageMain/log-details', query:{
          type: 'look'
        }})
      }
    },
  }
</script>

<style lang="scss" scoped="scoped">
  /deep/ {
    .van-tabs__wrap {
      height: 70px;
      width: 750px;
      margin: auto;
    }
    .van-tabs__nav{
      margin: 0;
      height: 70px;
    }

    .van-tab--active {
      color: #22A78E;
      font-weight: bold;
    }

    .van-tab {
      font-size: 30px;
      height: 70px;
    }

    .van-tab__text {
      height: 70px;
      line-height: 70px;
    }

    .van-tabs__line {
      width: 40px;
      height: 6px;
      background: #22A78E;
      border-radius: 3px;
    }
  }

  .wrapper{
    padding-bottom: 100px;
    .log_item{
      width: 702px;
      height: 416px;
      background: #FFFFFF;
      box-shadow: 0px 0px 40px 0px rgba(227,227,227,0.8);
      border-radius: 24px;
      box-sizing: border-box;
      padding: 25px 0 22px;
      margin: 32px auto 0;
      .log_item_date{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 26px;
        color: #333333;
        padding: 0 0 24px 40px;
        border-bottom: 1px solid #E7E7E7;
        .date{
          margin-right: 32px;
        }
      }
      .log_item_content{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 22px 0 0 40px;
        .log_item_img_test{
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 84px;
          margin-bottom: 18px;
          img{
            width: 84px;
            height: 84px;
            margin-right: 14px;
          }
          .log_item_test{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            height: 84px;
            .center_log{
              font-size: 30px;
              font-weight: bold;
              color: #000000;
            }
            .center_date{
              font-size: 24px;
              color: #999999;
            }
          }
        }
        .business_trip{
          font-size: 24px;
          color: #575757;
        }
        .trip_city{
          font-size: 24px;
          color: #575757;
          margin: 16px 0;
        }
        .visit_dealer{
          font-size: 24px;
          color: #575757;
        }
        .read{
          font-size: 24px;
          color: #B8B8B8;
          margin-top: 16px;
        }
      }
    }
  }

</style>
