<template>
  <section class="schedule-details appView" id="leftToDom">
    <van-header :title="title" :routeName="'back'" :path="'-1'"></van-header>
    <div class="wrapper-public schedule-time">
      <div class="dealer">
        <span class="name">拜访经商好车速卖</span>
        <div>我的日程</div>
      </div>
      <div class="schedule">
        <div class="time-item">
          <div class="day">
            <span class="c999">开始时间:</span>
            <span class="time">9:00</span>
          </div>
          <div class="day">
            <span class="c666">7月11日</span>
            <span class="week">周六</span>
          </div>
        </div>
        <div class="time-item">
          <div class="day">
            <span class="c999">结束时间:</span>
            <span class="time">18:00</span>
          </div>
          <div class="day">
            <span class="c666">7月12日</span>
            <span class="week">周日</span>
          </div>
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
          <img src="../../common/image/person.png" />
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
          <img src="../../common/image/gps.png" />
        </template>
      </van-field>
    </div>
    <div class="wrapper-public">
      <div class="qd">
        <img src="../../common/image/qd.png" />
        <van-button class="qd-btn">签到</van-button>
      </div>
    </div>
    <div class="wrapper-public">
      <van-field
        v-model="sms"
        center
        type="textarea"
        clearable
        class="search-input textarea"
        placeholder="请输入经销商跟进记录"
      >
        <template #left-icon>
          <img src="../../common/image/jl.png" />
        </template>
      </van-field>
    </div>
    <div class="wrapper-public">
      <van-field
        v-model="sms"
        center
        clearable
        class="search-input"
        label="附件"
      >
        <template #left-icon>
          <img src="../../common/image/fj.png" />
        </template>
      </van-field>
    </div>
    <div class="wrapper-public">
      <van-tabs v-model="active" color="#0D88FF">
        <van-tab title="评论">
          <div class="comment-wrapper">
            <div class="comment-person">
              <span class="comment-name">赵旭阳</span>
              <span>07月11日 09:48</span>
              <img src="../../common/image/addPlan.png" />
            </div>
            <div class="comment-content">
              这个经销商最近安鹏进件量低，看看什么原因， 幸苦。
            </div>
          </div>
        </van-tab>
        <van-tab title="操作记录">
          <div class="record-wrapper">
            <div class="record-item">
              <div>
                <img src="../../common/image/addPlan.png" />
                <span class="record-name">赵旭阳</span>
              </div>
              <span class="record-date">07月11日 09:48</span>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <img
      src="../../common/image/addComment.png"
      class="add-comment-icon"
      @click="show = true"
    />
    <van-action-sheet v-model="show">
      <div class="add-comment">
        <div class="comment-wrapper">
          <div class="comment-person">
            <span class="comment-name">赵旭阳</span>
            <span>07月11日 09:48</span>
            <img src="../../common/image/addPlan.png" />
          </div>
          <div class="comment-content">
            这个经销商最近安鹏进件量低，看看什么原因， 幸苦。
          </div>
        </div>
        <div class="comment-field">
          <van-field
            v-model="text"
            class="field"
            center
            clearable
            placeholder="请输入评论内容"
          />
        </div>
      </div>
    </van-action-sheet>
  </section>
</template>

<script>
import Vue from 'vue'
import { Tab, Tabs, ActionSheet } from 'vant'
Vue.use(Tab).use(Tabs).use(ActionSheet)
export default {
  name: 'ScheduleDetails',
  data() {
    return {
      title: '日程详情',
      sms: '',
      active: 0,
      show: true,
      text: ''
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.schedule-details {
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
    .dealer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 28px 30px;
      .name {
        font-size: 34px;
        font-weight: 600;
        color: #333333;
        position: relative;
        padding-left: 20px;
      }
      .name::after {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #00b852;
        left: -8px;
        top: 10px;
        content: '';
      }
      div {
        color: #999999;
      }
    }

    .schedule {
      padding-bottom: 30px;
      .time-item {
        display: flex;
        justify-content: center;
        .day {
          display: flex;
          align-items: center;
          padding: 14px 40px 14px 0;
          .c666 {
            color: #666666;
            font-size: 28px;
            padding-right: 10px;
          }
          .c999 {
            font-size: 30px;
            color: #999999;
            padding-right: 20px;
          }
          .time {
            font-size: 36px;
            color: #333333;
            text-align: left;
            display: inline-block;
            width: 100px;
          }
          .week {
            width: 72px;
            height: 32px;
            background: #ffffff;
            border-radius: 16px;
            border: 1px solid #cccccc;
            font-size: 22px;
            color: #999999;
            text-align: center;
          }
        }
      }
    }
  }
  .qd {
    padding: 20px 30px;
    display: flex;
    align-items: center;
    img {
      width: 36px;
      height: 36px;
      margin-right: 20px;
    }
    .qd-btn {
      width: 180px;
      height: 60px;
      background: #24a494;
      border-radius: 12px;
      color: #fff;
      font-size: 30px;
    }
  }
  .comment-wrapper {
    position: relative;
    bottom: 40px;
    border-top: 1px solid #f0f0f0;
    padding: 30px 30px 0 128px;
    .comment-person {
      position: relative;
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
      span {
        font-size: 26px;
        color: #cccccc;
      }
      .comment-name {
        font-size: 30px;
        font-weight: 600;
        color: #333333;
      }
      img {
        position: absolute;
        left: -90px;
        top: 0;
        width: 76px;
        height: 76px;
      }
    }
    .comment-content {
      font-size: 26px;
      color: #666666;
    }
  }
  .record-wrapper {
    padding-bottom: 20px;
    .record-item {
      padding: 10px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        display: flex;
        align-items: center;
        img {
          width: 36px;
          height: 36px;
          margin-right: 20px;
        }
      }
      .record-date {
        color: #bbbbbb;
        font-size: 26px;
      }
    }
  }
  .add-comment-icon {
    position: fixed;
    bottom: 64px;
    right: 56px;
    width: 100px;
    height: 100px;
  }
  .add-comment {
    padding: 40px 30px;
    .comment-wrapper {
      padding-bottom: 40px;
      border-bottom: 1px solid #f0f0f0;
    }
    .comment-field {
      padding-top: 40px;
      .field {
        width: 650px;
        height: 80px;
        background: #f6f6f6;
        border-radius: 40px;
        margin: 0 auto;
        padding-left:40px;
        .van-cell__value {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
