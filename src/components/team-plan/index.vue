<template>
  <section class="team-plan appView" id="leftToDom">
    <van-header :title="title" :routeName="'back'" :path="'-1'"></van-header>

    <section class="team-plan-search">
      <div class="item-name">
        <van-field
          v-model="value"
          class="search-field"
          placeholder="请输入用户名"
        >
          <template #button>
            <div class="search-button"></div>
          </template>
        </van-field>
      </div>

      <van-dropdown-menu>
        <van-dropdown-item :title="confirmPicker(currentDate)" ref="item">
          <van-datetime-picker
            v-model="currentDate"
            type="year-month"
            title="选择年月"
            :show-toolbar="false"
            :formatter="formatter"
            :max-date="maxDate"
          />
        </van-dropdown-item>
      </van-dropdown-menu>
    </section>
    <section class="wrapper-public team-plan-wrapper">
      <div class="plan-heaer">
        <span class="name">叶永飞</span>
        <div>
          <span>当前进度:</span>
          <span>80%</span>
        </div>
      </div>
      <div class="plan">
        <div class="plan-item">
          <div class="plan-name">拜访经销商1</div>
          <div class="plan-status">签到</div>
        </div>
        <div class="plan-item">
          <div class="plan-name">拜访经销商1</div>
          <div class="plan-status">签到</div>
        </div>
        <div class="plan-item">
          <div class="plan-name">拜访经销商1</div>
          <div class="plan-status">签到</div>
        </div>
        <div class="plan-item">
          <div class="plan-name">拜访经销商1</div>
          <div class="plan-status">签到</div>
        </div>
        <div class="plan-item">
          <div class="plan-name">拜访经销商1</div>
          <div class="plan-status">签到</div>
        </div>
      </div>
    </section>
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
      title: '团队计划',
      dateFlag: false,
      value: '',
      dateVal: '2020-2',
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
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
.team-plan {
  .team-plan-search {
    padding: 10px 24px;
    background: #fff;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .team-plan-wrapper {
    padding: 30px;
    .plan-heaer {
      display: flex;
      justify-content: space-between;
      font-family: PingFangSC-Medium, PingFang SC;
      .name {
        font-size: 30px;
        font-weight: 600;
        color: #333333;
      }
      div {
        display: flex;
        font-size: 26px;
        font-weight: 400;
        span:first-child {
          color: #999999;
        }
        span:last-child {
          color: #FF223D;
          margin-left: 10px;
        }
      }
    }
    .plan {
      padding:20px;
      box-sizing: border-box;
      .plan-item {
        font-size: 26px;
        display: inline-block;
        margin:0 20px;
        .plan-name {
          font-weight: 600;
          color: #333333;
          padding:10px 0;
        }
        .plan-status {
          font-size: 22px;
          color: #BBBBBB;
        }
      }
    }
  }
}
</style>
