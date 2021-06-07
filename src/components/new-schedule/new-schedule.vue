<template>
  <section class="new-schedule">
    <van-header :title="title" routeName="back" path="-1" :showComplete="true"></van-header>
    <div class="add_agenda_theme">
      <van-field v-model="agendaTheme" center clearable placeholder="添加日程主题">
        <template #left-icon>
          <img src="../../../static/img/schedule.png" />
        </template>
      </van-field>
    </div>
    <div class="schedule-time">
      <div class="schedule-allday">
        <div class="name">
          <img src="../../../static/img/time.png" />
          <div class="allday">
            <p>全天</p>
          </div>
        </div>
        <van-switch v-model="checked" size="24px" @change="changeAllDay" />
      </div>
      <div class="schedule">
        <div class="time-first" @click="choseDateTimeClick('start')">
          <div class="day">
            <p>{{startTime.split('-')[0] || '选择开始时间'}}</p>
            <p>{{startTime.split('-')[1]}}</p>
          </div>
          <div class="week" v-if="startWeek">{{startWeek}}</div>
        </div>
        <img src="../../../static/img/for.png" class="for" />
        <div class="time-last" @click="choseDateTimeClick('end')">
          <div class="day">
            <p>{{endTime.split('-')[0] || '选择结束时间'}}</p>
            <p>{{endTime.split('-')[1]}}</p>
          </div>
          <div class="week" v-if="endWeek">{{endWeek}}</div>
        </div>
      </div>
    </div>
    <div class="visit_online_dealers">
      <div class="img_body">
        <img src="../../../static/img/online_dealers.png" />
        <div class="title">
          <p>拜访已上线经销商</p>
        </div>
      </div>
      <img class="chose_img" :src=" onlineDealer ? '../../../static/img/ok.png' : '../../../static/img/nook.png'"
        @click="onlineDealer = !onlineDealer" />
    </div>
    <div class="add_agenda_theme">
      <van-field v-model="sms" center clearable placeholder="请输入拜访对象">
        <template #left-icon>
          <img src="../../../static/img/person.png" />
        </template>
      </van-field>
    </div>
    <div class="chose_area_body">
      <div class="chose_area" @click="choseAreaPop = true">
        <div class="chose_area_icon">
          <img src="../../../static/img/gps.png" />
          <p :class="choseArea == '请选择地区' ? 'p_noactive' : 'p_active'">{{choseArea}}</p>
        </div>
        <van-icon name="arrow" color="#999999" size="14px" />
      </div>
      <van-field v-model="address" center clearable placeholder="请输入详细地址"></van-field>
    </div>
    <div class="visit_online_dealers">
      <div class="img_body">
        <img src="../../../static/img/cc.png" />
        <div class="title">
          <p>出差</p>
        </div>
      </div>
      <img class="chose_img" :src=" businessTravel ? '../../../static/img/ok.png' : '../../../static/img/nook.png'"
        @click="businessTravel = !businessTravel" />
    </div>
    <button class="submitBtn" @click="$router.push('schedule-details')">提交日程</button>

    <van-popup v-model="choseDateTime" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker v-model="currentDate" type="datetime" :min-date="minDate"
        :max-date="maxDate" @confirm="choseDateTime = false" @cancel="choseDateTime = false" />
    </van-popup>
    <van-popup v-model="choseAreaPop" position="bottom" :style="{ height: '40%' }">
      <van-picker show-toolbar :columns="columns" value-key="name" @confirm="choseAreaPop = false" @cancel="choseAreaPop = false" />
    </van-popup>
  </section>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import {
    Switch,
    Popup,
    DatetimePicker
  } from 'vant'
  Vue.use(Switch).use(Popup).use(DatetimePicker)
  export default {
    name: 'NewSchedule',
    data() {
      return {
        title: '新建日程',
        sms: '',
        checked: false,
        agendaTheme: '',
        onlineDealer: false,
        businessTravel: false,
        choseArea: '请选择地区',
        address: '',
        choseDateTime: false,
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(2025, 10, 1),
        currentDate: '',
        startTime:'',
        endTime:'',
        type: '',
        weekList:['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        startWeek: '',
        endWeek: '',
        choseAreaPop: false,
        columns: this.area
      }
    },
    computed:{
      ...mapGetters(['area'])
    },
    mounted() {
      console.log(this.area);
    },
    watch: {
      currentDate(newValue) {
        if (this.type == 'start') {
          if (newValue == '' || newValue == null || newValue == undefined) {
            return this.startTime = ''
          }
          let m = newValue.getMonth() + 1
          let d = newValue.getDate()
          let h = newValue.getHours() < 10 ? '0' + newValue.getHours() : newValue.getHours()
          let min = newValue.getMinutes() < 10 ?  '0' + newValue.getMinutes() : newValue.getMinutes()
          let w = newValue.getDay()
          this.startTime = m + '月' + d + '日-' + h + ':' + min
          this.startWeek = this.weekList[w]
        }else{
          if (newValue == '' || newValue == null || newValue == undefined) {
            return this.endTime = ''
          }
          let m = newValue.getMonth() + 1
          let d = newValue.getDate()
          let h = newValue.getHours() < 10 ? '0' + newValue.getHours() : newValue.getHours()
          let min = newValue.getMinutes() < 10 ?  '0' + newValue.getMinutes() : newValue.getMinutes()
          let w = newValue.getDay()
          this.endTime = m + '月' + d + '日-' + h + ':' + min
          this.endWeek = this.weekList[w]
        }

      }
    },
    methods: {
      choseDateTimeClick(type){
        if (this.checked != true) {
          this.type = type
          this.choseDateTime = true
        }
      },
      changeAllDay(e){
        if (e) {
          let nowDate = new Date()
          let m = nowDate.getMonth() + 1
          let d = nowDate.getDate()
          let w = nowDate.getDay()
          this.startTime = m + '月' + d + '日-' + '09:00'
          this.endTime =  m + '月' + d + '日-' + '18:00'
          this.startWeek = this.endWeek = this.weekList[w]
        }else{
          this.startTime = ''
          this.endTime = ''
          this.startWeek = ''
          this.endWeek = ''
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .add_agenda_theme {
    width: 702px;
    margin: 20px auto 24px;
    height: 122px;
    line-height: 122px;
    background: #FFFFFF;
    box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
    border-radius: 24px;
    box-sizing: border-box;
    padding: 40px 0 40px 32px;

    img {
      width: 36px;
      height: 36px;
    }

    /deep/ {
      .van-cell {
        padding: 0;

        .van-field__body {
          margin-left: 20px;

          .van-field__control {
            font-size: 30px;
          }
        }
      }
    }
  }

  .schedule-time {
    width: 702px;
    margin: 0 auto;
    height: 266px;
    background: #FFFFFF;
    box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
    border-radius: 24px;
    box-sizing: border-box;
    padding: 32px 24px 40px 32px;

    .schedule-allday {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .name {
        display: flex;
        flex-direction: row;
        align-items: center;

        img {
          width: 36px;
          height: 36px;
          margin-right: 20px;
        }

        .allday {
          font-size: 30px;
          color: #333333;
          height: 36px;
          line-height: 36px;
          font-family: PingFangSC-Regular;
        }
      }
    }

    .schedule {
      margin-top: 36px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      margin-left: 36px;
      margin-right: 44px;

      .time-first,
      .time-last {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        width: 192px;
        font-family: PingFangSC-Medium;

        .day {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 32px;
          font-weight: bold;
          color: #333333;
          font-family: PingFangSC-Regular;
          :first-child {
            margin-bottom: 20px;
          }
        }

        .week {
          width: 72px;
          height: 32px;
          line-height: 32px;
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #CCCCCC;
          font-size: 22px;
          color: #999999;
          margin-top: 4px;
          margin-left: 10px;
          text-align: center;
        }
      }

      .for {
        width: 44px;
        height: 14px;
        margin-top: 16px;
      }
    }
  }

  .visit_online_dealers {
    width: 702px;
    height: 116px;
    background: #FFFFFF;
    box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
    border-radius: 24px;
    margin: 24px auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 40px 32px;
    box-sizing: border-box;

    .img_body {
      display: flex;
      flex-direction: row;
      align-items: center;

      .title {
        font-size: 30px;
        color: #333333;
        margin-left: 20px;
        height: 36px;
        line-height: 36px;
        font-family: PingFangSC-Regular;
      }

      img {
        width: 36px;
        height: 36px;
      }
    }

    .chose_img {
      width: 36px;
      height: 36px;
    }
  }

  .submitBtn {
    width: 458px;
    height: 88px;
    background: #24A494;
    border-radius: 50px;
    font-size: 32px;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 88px;
    margin: 60px 146px;
    font-size: PingFangSC-Medium;
  }

  .chose_area_body {
    width: 702px;
    height: 224px;
    background: #FFFFFF;
    box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
    border-radius: 24px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 40px 0;
    box-sizing: border-box;

    .chose_area {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #E7E7E7;
      padding: 0 32px 36px 42px;

      .chose_area_icon {
        font-size: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;

        img {
          width: 36px;
          height: 36px;
          margin-right: 20px;
        }

        .p_active {
          color: #333333;
        }

        .p_noactive {
          color: #CCCCCC;
        }
      }
    }

    /deep/ {
      .van-cell {
        width: 100%;
        padding: 32px 42px 0 88px;

        .van-field__control {
          font-size: 30px;
          font-family: PingFangSC-Regular, PingFang SC;
        }
      }
    }
  }

  /deep/ {
    .van-popup {
      .van-picker {
        .van-picker__toolbar {
          height: 80px;
          line-height: 80px;

          .van-picker__cancel {
            height: 80px;
            line-height: 80px;
            font-size: 30px;
          }

          .van-picker__title {
            height: 80px;
            line-height: 80px;
            font-size: 32px;
          }

          .van-picker__confirm {
            height: 80px;
            line-height: 80px;
            font-size: 30px;
          }
        }

        .van-picker__columns {
          li {
            font-size: 30px;
          }
        }
      }
    }
  }
</style>
