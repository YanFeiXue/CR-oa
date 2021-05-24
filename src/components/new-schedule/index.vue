<template>
  <section class="new-schedule appView" id="leftToDom">
    <van-header :title="title" :routeName="'back'" :path="'-1'"></van-header>
    <div class="wrapper-public">
      <van-field
        v-model="sms"
        center
        clearable
        class="search-input"
        placeholder="添加日程主题"
      >
        <template #left-icon>
          <img src="../../assets/img/schedule.png" />
        </template>
      </van-field>
    </div>
    <div class="wrapper-public schedule-time">
      <div class="schedule-header">
        <span class="name"><img src="../../assets/img/time.png" />全天</span>
        <div>
          <van-switch v-model="checked" size="24px" />
        </div>
      </div>
      <div class="schedule">
        <div class="time time-first">
          <div class="day">
            <span>7月11日</span>
            <span>9:00</span>
          </div>
          <div class="week">周六</div>
        </div>
        <img src="../../assets/img/for.png" class="for"/>
        <div class="time time-last">
          <div class="day">
            <span>7月11日</span>
            <span>18:00</span>
          </div>
          <div class="week">周六</div>
        </div>
      </div>
    </div>
    <div class="wrapper-public">
      <van-field
        v-model="sms"
        center
        clearable
        class="search-input"
        placeholder="请输入拜访对象"
      >
        <template #left-icon>
          <img src="../../assets/img/person.png" />
        </template>
      </van-field>
    </div>
    <div class="wrapper-public">
      <van-field
        v-model="sms"
        center
        clearable
        class="search-input"
        placeholder="请输入日程地点"
      >
        <template #left-icon>
          <img src="../../assets/img/gps.png" />
        </template>
      </van-field>
    </div>
    <div class="wrapper-public">
      <van-field
        v-model="sms"
        center
        clearable
        class="search-input"
        placeholder="出差"
      >
        <template #left-icon>
          <img src="../../assets/img/cc.png" />
        </template>
      </van-field>
    </div>
    <van-button type="info" class="submitBtn publicBtn" @click="$router.push('schedule-details')">提交日程</van-button>
  </section>
</template>

<script>
import Vue from 'vue'
import { Calendar, Switch } from 'vant'
Vue.use(Calendar).use(Switch)
export default {
  name: 'NewSchedule',
  data() {
    return {
      title: '新建日程',
      sms: '',
      checked: true
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.new-schedule {
  font-family: PingFangSC-Regular, PingFang SC;
  .search-input {
    border-radius: 38px;
    height: 110px;
    font-size: 30px;
    padding: 0 30px;
    .van-field__left-icon {
      img {
        width: 36px;
        height: 36px;
        margin-right: 10px;
        margin-top: 6px;
      }
    }
  }
  .schedule-time {
    .schedule-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 30px;
      .name {
        display: flex;
        align-items: center;
        font-size: 30px;
        font-weight: 400;
        color: #333333;
        img {
          width: 36px;
          height: 36px;
          margin-right: 20px;
        }
      }
    }
    .schedule {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding-bottom: 30px;
      .for{
        width:44px;
        height: 14px;
      }
      .time {
        display: flex;
        align-items: flex-start;
        .day {
          display: flex;
          flex-direction: column;
          span {
            font-size: 32px;
            font-weight: 500;
            color: #333333;
            text-align: center;
            padding:6px 0;
          }
        }
        .week {
          width: 72px;
          height: 32px;
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #CCCCCC;
          font-size: 22px;
          color: #999999;
          text-align:center;
          margin:10px 0 0 10px;
        }
      }
    }
  }
}
</style>
