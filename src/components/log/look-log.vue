<template>
  <section>
    <van-header :title="logtitle" path="/viewMain/home"></van-header>
    <van-tabs v-model="active" class="threeItems" @click="scrollTabs">
      <van-tab title="全部日志" name="1"></van-tab>
      <van-tab title="我的日志" name="2"></van-tab>
      <van-tab title="团队日志" name="3"></van-tab>
    </van-tabs>
    <div class="wrapper" ref="wrapper">
      <ul v-if="logList.length">
        <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
          <div class="log_item" v-for="(item, index) in logList" :key="index" @click="logListClick(item)">
            <div class="log_item_date">
              <p class="date">{{item.createTime}}</p>
              <p>{{item.day}}</p>
            </div>
            <div class="log_item_content">
              <div class="log_item_img_test">
                <img src="../../../static/img/head.png" />
                <div class="log_item_test">
                  <p class="center_log">{{item.createUser}}的销售中心{{item.type == 'DAILY_REPORT' ? '日报' : '周报'}}</p>
                  <p class="center_date">{{item.updateTime}}</p>
                </div>
              </div>
              <p class="business_trip">是否出差：{{item.onBusinessFlag ? '是' : '否'}}</p>
              <p class="trip_city">出差城市：{{item.onBusinessCity || '未出差'}}</p>
              <p class="visit_dealer">拜访代理商名称：{{item.visitDealerName || '未拜访代理商'}}</p>
              <p class="read">已读</p>
            </div>
          </div>
        </mt-loadmore>
      </ul>
      <van-details v-else></van-details>
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
  import { getRecordList } from '../../api/api'
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
        logList:[],
        logForm:{
          page: 1,
          size: 10,
          userId: ''
        }
      }
    },
    mounted() {
    },
    methods: {
      _getDataInfo(){
        getRecordList({...this.logForm}).then(res => {
          if (res.code != 0) {
            return this.$toast.fail(res.msg)
          }
          res.data.forEach(item => {
            let getDay = new Date(item.updateTime).getDay()
            let weeks = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            item.day = weeks[getDay - 1]
          })
          this.logList = res.data
        })
      },
      scrollTabs(name) {
        if (name == 1) {
          this.logForm.userId = ''
        }else if (name == 2) {
          this.logForm.userId = sessionStorage.getItem('customId')
        }
        this._getDataInfo(false, true)
      },
      logListClick(item){
        console.log(item);
        if (item.type == 'DAILY_REPORT') {
          this.$router.push({path:'/pageMain/log-details', query:{
            useType: 'look',
            type: item.type,
            id: item.id
          }})
        }else if (item.type == 'WEEKLY_REPORT') {
          this.$router.push({path:'/pageMain/weekly', query:{
            useType: 'look',
            type: item.type,
            id: item.id
          }})
        }
      }
    },
  }
</script>

<style lang="scss" scoped="scoped">
  /deep/ {
    .van-tabs__wrap {
      height: 100px;
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
        padding: 0 0 22px 40px;
        border-bottom: 1px solid #E7E7E7;
        height: 36px;
        line-height: 36px;
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
