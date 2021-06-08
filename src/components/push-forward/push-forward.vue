<template>
  <section>
    <van-header title="推动进件" path="-1" routeName="back"></van-header>
    <van-tabs @click="changeTab">
      <van-tab title="当日" name="1"></van-tab>
      <van-tab title="1-3日" name="2"></van-tab>
      <van-tab title="4-7日" name="3"></van-tab>
      <van-tab title="8-30日" name="4"></van-tab>
    </van-tabs>
    <div class="conversion_list_body" v-if="list.length != 0">
      <div class="item_body" v-for="(item, index) in list" :key="index">
        <div class="name_line">
          <div class="name_body">
            <p class="name">{{item.realName}}</p>
            <p class="phone">{{item.mobile}}</p>
            <div :class="item.dealerStatus == null || item.dealerStatus == 0 ? 'follow_up' : item.dealerStatus == 1 ? 'follow_up_active' : 'attention'">
              <p>{{item.dealerStatus == null || item.dealerStatus == 0 ? '未跟进' : item.dealerStatus == 1 ? '已跟进' : '需关注'}}</p>
            </div>
          </div>
          <img src="../../../static/img/3dian.png" @click="pointClick(item)" />
        </div>
        <div class="dealer_name">
          <p>{{item.createUser}}</p>
        </div>
        <div class="datetime">
          <p>{{item.createTime}}</p>
        </div>
      </div>
    </div>
    <van-details v-else></van-details>
    <van-action-sheet v-model="pushForward_flag" :actions="option" cancel-text="取消" @cancel="onCancel_sheet"
      @select="onSelect_sheet" />
  </section>
</template>

<script>
  import { getDealerStatus, saveDataStatus } from '../../api/api'
  import moment from 'moment'
  import Vue from 'vue'
  import {
    tabs,
    tab,
    ActionSheet
  } from 'vant'
  Vue.use(tabs).use(tab).use(ActionSheet)
  export default {
    data() {
      return {
        startTime: '',
        endTime: '',
        list: [],
        pushForward_flag: false,
        itemDate:{},
        tabName: 0,
        option:[
          {
            value: 0,
            name: '未跟进'
          },
          {
            value: 1,
            name: '已跟进'
          },
          {
            value: 2,
            name: '需关注'
          }
        ]
      }
    },
    mounted() {
      this.changeTab(1)
    },
    methods: {
      changeTab(name){
        this.tabName = name
        this.startTime = ''
        this.endTime = ''
        if (name == 1) {
          this.startTime = moment().format().split('T')[0]
        }else if (name == 2) {
          this.startTime = moment().subtract(1, 'days').format().split('T')[0]
          this.endTime = moment().subtract(3, 'days').format().split('T')[0]
        }else if (name == 3) {
          this.startTime = moment().subtract(4, 'days').format().split('T')[0]
          this.endTime = moment().subtract(7, 'days').format().split('T')[0]
        }else if (name == 4) {
          this.startTime = moment().subtract(8, 'days').format().split('T')[0]
          this.endTime = moment().subtract(30, 'days').format().split('T')[0]
        }
        getDealerStatus({
          startTime: this.startTime,
          endTime: this.endTime
        }).then(res => {
          this.list = res.data
        })
      },
      pointClick(item){
        this.itemDate = item
        this.pushForward_flag = true
      },
      onSelect_sheet(item){
        let data = {
          id: this.itemDate.id,
          leaseId: this.itemDate.leaseId,
          applyNo: this.itemDate.applyNo,
          certNo: this.itemDate.cretNo,
          dealerStatus: item.value
        }
        saveDataStatus(data).then(res => {
          if (res.code != 0) return this.$toast.fail(res.msg)
          this.$toast.success(res.msg)
          this.changeTab(this.tabName)
          this.pushForward_flag = false
        })
      },
      onCancel_sheet(){},
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .conversion_list_body{
    padding: 0 0 30px 0;
    .item_body{
      box-sizing: border-box;
      padding: 32px;
      margin: 24px auto 0;
      width: 702px;
      height: 226px;
      background: #FFFFFF;
      box-shadow: 0px 0px 40px 0px #E7E7E7;
      border-radius: 24px;
      .name_line{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .name_body{
          display: flex;
          flex-direction: row;
          align-items: center;
          .name{
            font-size: 36px;
            font-weight: bold;
            color: #333333;
            font-family: PingFangSC-Medium, PingFang SC;
          }
          .phone{
            font-size: 30px;
            color: #333333;
            margin: 0 30px 0 16px;
            font-family: PingFangSC-Regular, PingFang SC;
          }
          .follow_up{
            width: 80px;
            height: 34px;
            background: #FFFFFF;
            border-radius: 4px;
            border: 2px solid #FF902D;
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #FF902D;
            line-height: 34px;
            text-align: center;
          }
          .follow_up_active{
            width: 80px;
            height: 34px;
            background: #FFFFFF;
            border-radius: 4px;
            border: 2px solid #22A78E;
            font-size: 20px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #22A78E;
            line-height: 34px;
            text-align: center;
          }
          .attention{
            width: 80px;
            height: 34px;
            text-align: center;
            background: #FFFFFF;
            border-radius: 4px;
            border: 2px solid #E2231A;
            font-size: 20px;
            color: #E2231A;
            line-height: 34px;
            font-family: PingFangSC-Regular;
            text-align: center;
          }
        }
        img{
          width: 32px;
          height: 32px;
        }
      }
      .dealer_name{
        margin: 20px 0 16px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #7B7B7B;
      }
      .datetime{
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #B2B2B2;
        line-height: 40px;
      }
    }
  }

  /deep/ {
    .van-tabs--line {
      .van-tabs__wrap {
        height: 88px;
        width: 750px;
        margin: auto;

        .van-tabs__nav {
          margin: 15px 0;
          height: 70px;

          .van-tab--active {
            color: #333333;
            font-weight: bold;
          }

          .van-tab {
            font-size: 34px;
            height: 70px;

            .van-tab__text {
              height: 70px;
              line-height: 70px;
              font-family: PingFangSC-Medium;
            }
          }

          .van-tabs__line {
            width: 40px;
            height: 6px;
            background: #22A78E;
            border-radius: 3px;
          }
        }
      }
    }
  }
  /deep/ {
    .van-popup--bottom.van-action-sheet {
      max-height: 600px;
      overflow-y: scroll;
      border-radius: 40px 40px 0 0;

      .van-action-sheet__item {
        height: 80px;
        font-size: 28px;
        background: none;
        border-bottom: 1px solid #ededed;
      }

      .van-action-sheet__item:first-child {
        border-radius: 40px 40px 0 0;
      }

      .van-action-sheet__cancel {
        font-size: 30px;
        line-height: 70px;
      }
    }
  }
</style>
