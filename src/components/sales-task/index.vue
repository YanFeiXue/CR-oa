<template>
  <section class="sales-task appView" id="leftToDom">
    <van-header :title="title" :routeName="'back'" :path="'-1'"></van-header>
    <section class="sales-task-wrapper">
      <div class="item-name">总任务</div>
      <van-dropdown-menu>
        <van-dropdown-item :title="confirmPicker(currentDate)" ref="item">
          <van-datetime-picker v-model="currentDate" type="year-month" title="选择年月" :show-toolbar="false"
            :formatter="formatter" :max-date="maxDate" />
        </van-dropdown-item>
      </van-dropdown-menu>
    </section>
    <div class="task">
      <div>销售总任务:<span>单位/万元</span></div>
      <div>50000.00</div>
    </div>
    <div class="task unallocated">
      <div>未分配任务:<span>单位/万元</span></div>
      <div>50000.00</div>
    </div>
    <div class="wrapper">
      <header class="content content-header">
        <span>任务团队/人</span>
        <span>任务金额</span>
        <span>操作</span>
      </header>
      <section class="content">
        <span>卡尔团队</span>
        <span>10000万元</span>
        <span><span class="btn">设置</span></span>
      </section>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { DropdownMenu, DropdownItem, DatetimePicker } from 'vant'
Vue.use(DropdownMenu).use(DropdownItem).use(DatetimePicker)
export default {
  name: 'SalesTask',
  data() {
    return {
      title: '销售任务',
      dateFlag: false,
      dateVal: '2020-2',
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
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
      // var timer = date.getFullYear() + '-' + m + '-' + d
      var timer = date.getFullYear() + '-' + m
      return timer
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.sales-task-wrapper {
  padding: 10px 40px;
  background: #fff;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .item-name {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #333333;
  }
  /deep/.van-dropdown-menu {
    width: 180px;
    height: 64px;
    .van-dropdown-menu__bar {
      height: 100%;
      border-radius: 32px;
      border: solid 2px #dddddd;
      .van-dropdown-menu__title::after {
        content: '';
        width: 0;
        height: 0;
        top: 30%;
        right: -15px;
        border: 8px solid #000000;
        border-top: 8px solid transparent;
        border-right: 8px solid transparent;
      }
    }
  }
}
.task {
  width: 702px;
  height: 224px;
  background: #24a494;
  border-radius: 24px;
  margin: 20px auto;
  padding: 20px 0;
  box-sizing: border-box;
  div {
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    text-align: center;
    padding-top: 20px;
  }
  div:first-child {
    font-size: 32px;
    position: relative;
    span {
      position: absolute;
      right: 16px;
      bottom: 4px;
      font-size: 22px;
      font-weight: 400;
    }
  }
  div:last-child {
    font-size: 56px;
  }
}
.task.unallocated {
  background: #4d7298;
}
.wrapper {
  width: 702px;
  height: auto;
  min-height: 340px;
  background: #ffffff;
  box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
  border-radius: 24px;
  margin: 20px auto;
  padding: 20px 0;
  box-sizing: border-box;
  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      width: 33%;
      padding: 10px 0;
      text-align: center;
    }
    .btn {
      width: 80px;
      height: 52px;
      display: inline-block;
      background: #24a494;
      border-radius: 8px;
      text-align: center;
      line-height: 52px;
      color: #fff;
    }
  }
  .content.content-header {
    border-bottom: 1px solid #f0f0f0;
    padding: 15px 0 20px 0;
    span {
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #333333;
    }
  }
}
</style>
