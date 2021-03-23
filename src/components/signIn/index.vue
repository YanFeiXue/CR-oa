<template>
  <section class="sales-task appView" id="leftToDom">
    <van-header :title="title" :routeName="'back'" :path="'-1'"></van-header>
    <section class="sales-task-wrapper">
      <div class="item-name">总任务</div>
      <div class="item-date" @click="dateFlag=true">{{dateVal}}</div>
      <div>销售总任务:500000万元</div>
      <div>未分配任务:500000万元</div>
    </section>
    <header class="content content-header">
      <span>任务团队/人</span>
      <span>任务金额</span>
      <span>操作</span>
    </header>
    <section class="content">
      <span>卡尔团队</span>
      <span>10000万元</span>
      <span>设置</span>
    </section>
    <van-popup v-model="dateFlag" label="日期选择" round position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        @confirm="dateChange"
        @cancel="dateFlag = !dateFlag"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
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
.sales-task-wrapper {
  padding: 10px 40px;
  background: #fff;
  position: relative;
}
.content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    width: 33%;
    padding: 30px 0;
    text-align: center;
  }
}
.content.content-header {
  background: #ccc;
  span {
    padding: 15px 0;
  }
}
</style>
