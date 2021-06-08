<template>
  <div>
    <div class="home_workbench_body">
      <van-tabs v-model="activeName" @change="vanTabChange">
        <van-tab v-for="(item, index) in homeTabList" :key="index" :title="item.titleName" :name="item.homeActiveName">
        </van-tab>
      </van-tabs>
      <div class="img_body">
        <span class="tip_content">4</span>
        <img src="../../../static/img/homeMessage.png" class="tip_img" />
      </div>
    </div>
    <div class="workbench_body">
      <div class="workbench_item" v-for="(item, index) in workbenchList" :key="index">
        <div style="display: flex;flex-direction: row;align-items: center;">
          <span class="item_number">{{item.number}}</span><span class="item_number"
            v-if="[6, 7, 8].indexOf(index) != -1">%</span><span class="item_wan" v-if="item.showwan">万</span>
        </div>
        <p class="item_content">{{item.content}}</p>
      </div>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue';
  import {
    Tab,
    Tabs
  } from 'vant';
  Vue.use(Tab).use(Tabs);
  import {
    Workbench
  } from '../../api/api'
  export default {
    data() {
      return {
        activeName: 1,
        homeTabList: [{
            titleName: '今日',
            homeActiveName: 1
          },
          {
            titleName: '昨日',
            homeActiveName: 2
          },
          {
            titleName: '本周',
            homeActiveName: 3
          },
          {
            titleName: '本月',
            homeActiveName: 5
          }
        ],
        workbenchList: [{
            number: 0,
            content: '进件个数'
          },
          {
            number: 0,
            content: '进件金额',
            showwan: false
          },
          {
            number: 0,
            content: '进件件均'
          },
          {
            number: 0,
            content: '放款个数'
          },
          {
            number: 0,
            content: '放款金额',
            showwan: false
          },
          {
            number: 0,
            content: '放款件均'
          },
          {
            number: 0,
            content: '预审批通过率'
          },
          {
            number: 0,
            content: '审批通过率'
          },
          {
            number: 0,
            content: '降成批复率'
          }
        ]
      }
    },
    mounted() {
      this.vanTabChange(1)
    },
    methods: {
      vanTabChange(homeActiveName) {
        this.activeName = homeActiveName
        Workbench({
          dataType: homeActiveName
        }).then(res => {
          this.workbenchList[0].number = res.data.calculIncomingDto.totalNum || 0
          if (res.data.calculIncomingDto.totalAmount > 999999) {
            let jinNumber = res.data.calculIncomingDto.totalAmount.toFixed().split('')
            jinNumber.splice(-4, 0, '.')
            jinNumber = Number(jinNumber.join(''))
            this.workbenchList[1].number = jinNumber
            this.workbenchList[1].showwan = true
          }else{
            this.workbenchList[1].number = res.data.calculIncomingDto.totalAmount || 0
            this.workbenchList[1].showwan = false
          }
          this.workbenchList[2].number = res.data.calculIncomingDto.avgAmount || 0
          this.workbenchList[3].number = res.data.calculFinancingDto.totalNum || 0
          if (res.data.calculIncomingDto.totalAmount > 999999) {
            let fangNumber = res.data.calculFinancingDto.totalAmount.toFixed().split('')
            fangNumber.splice(-4, 0, '.')
            fangNumber = Number(fangNumber.join(''))
            this.workbenchList[4].number = fangNumber
            this.workbenchList[4].showwan = true
          }else{
            this.workbenchList[4].number = res.data.calculFinancingDto.totalAmount || 0
            this.workbenchList[4].showwan = false
          }
          this.workbenchList[5].number = res.data.calculFinancingDto.avgAmount || 0
          this.workbenchList[7].number = res.data.calculPassDto.rate || 0
          this.workbenchList[8].number = res.data.calPassWithConditionDto.rate || 0
          this.workbenchList[6].number = res.data.calculPreApprovalDto.rate || 0
        })
      }
    },
  }
</script>

<style scoped="scoped" lang="scss">
  .workbench_body {
    margin: 0 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .workbench_item {
    margin: 22px 0 0;
    box-sizing: border-box;
    padding: 26px 0 26px 40px;
    width: 220px;
    height: 144px;
    background: #FFFFFF;
    box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
    border-radius: 24px;
    display: inline-box;
  }

  .item_number {
    font-weight: bold;
    font-size: 40px;
    color: #000000;
    height: 48px;
    line-height: 48px;
    font-family: DINPro-Black;
  }

  .item_wan{
    font-weight: bold;
    font-size: 34px;
    color: #000000;
    height: 48px;
    line-height: 48px;
  }

  .item_content {
    color: #7B7B7B;
    margin-top: 10px;
    font-size: 24px;
    font-family: PingFangSC-Regular;
  }

  .home_workbench_body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 32px 46px 20px 32px;
    align-items: center;

    /deep/ {
      .van-tabs__wrap {
        height: 70px;
        width: 590px;
      }

      .van-tabs__line {
        background-color: #262626;
        height: 6px;
        width: 28px;
        border-radius: 3px;
      }

      .van-tab {
        color: #4F4F4F;
        font-size: 28px;
      }

      .van-tab--active {
        color: #000000;
        font-size: 36px;
        font-weight: bold;
      }

      .van-tab__text {
        height: 100px;
        line-height: 100px;
      }
    }

  }

  .tip_content {
    color: #FFFFFF;
    width: 28px;
    height: 28px;
    border-radius: 100%;
    background: #FB622F;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 34px;
    top: -6px;
    font-size: 20px;
  }

  .tip_img {
    height: 48px;
    width: 48px;
  }

  .img_body {
    height: 48px;
    width: 48px;
    position: relative;
  }
</style>
