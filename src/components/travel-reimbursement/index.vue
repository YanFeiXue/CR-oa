<template>
  <section class="travel-reimbursement appView" id="leftToDom">
    <van-nav-bar left-text="差旅报销" class="mbNone"> </van-nav-bar>
    <section class="travel-reimbursement-wrapper">
      <div class="item-wrapper">
        <div class="item tp6">
          <img src="static/img//CCSQ.png" />
          <span>出差申请</span>
        </div>
        <div class="item tp6">
          <img src="static/img//BXSQ.png" />
          <span>报销申请</span>
        </div>
        <div class="item tp6" @click="$router.push('/pageMain/suspend-work')">
          <img src="static/img//CCSP.png" />
          <span>出差审批</span>
        </div>
        <div class="item tp6" @click="$router.push('/pageMain/suspend-loan')">
          <img src="static/img//BXSP.png" />
          <span>报销审批</span>
        </div>
      </div>
    </section>
    <van-footer :activeNum="2" />
  </section>
</template>

<script>
import Vue from 'vue'
import { DatetimePicker, Popup } from 'vant'

Vue.use(DatetimePicker).use(Popup)
export default {
  name: 'SalesTask',
  data() {
    return {
      title: '销售任务',
      dateFlag: false,
      dateVal: '2020-2',
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    }
  },
  created() {},
  mounted() {},
  methods: {
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      }
      return val
    },
    dateChange() {
      this.dateVal = this.confirmPicker(this.currentDate)
      this.dateFlag = false
    },
    confirmPicker(value) {
      // 确定按钮，时间格式化并显示在页面上
      var date = value
      var m = date.getMonth() + 1
      var d = date.getDate()
      if (m >= 1 && m <= 9) {
        m = '0' + m
      }
      if (d >= 0 && d <= 9) {
        d = '0' + d
      }
      var timer = date.getFullYear() + '-' + m + '-' + d
      return timer
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.travel-reimbursement-wrapper {
  width: 702px;
  height: auto;
  min-height: 214px;
  background: #ffffff;
  box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
  border-radius: 24px;
  padding: 20px 24px;
  box-sizing: border-box;
  margin: 20px auto;
  .item-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top:20px;
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
        width: 80px;
        height: 80px;
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
</style>
