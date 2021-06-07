<template>
  <section class="sales-task">
    <van-header :title="title" :routeName="'back'" :path="'-1'"></van-header>
    <!-- <van-calendar ref="vanCalendar" title="日历" :poppable="false" color="#24A494" @confirm="onConfirm" :max-date="maxDate" :title="''"/> -->
    <div class="title_week_body">
      <p class="title">{{nowYearMonth}}</p>
      <div class="week_list">
        <div class="item_week" v-for="(item, index) in weekList" :key="index">
          <p :class="index == nowWeek ? 'p_active' : 'p'">{{item}}</p>
        </div>
      </div>
    </div>
    <div class="day_list_body">
      <div class="day_item" v-for="(item, index) in dayList" :key="index">
        <div class="day">
          <p>{{item}}</p>
        </div>
        <div class="event">
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
    <img src="../../../static/img/addPlan.png" class="addPlanIcon" @click="$router.push('new-schedule')"/>
  </section>
</template>

<script>
import Vue from 'vue'
import { Calendar } from 'vant'
Vue.use(Calendar)
export default {
  name: 'SalesTask',
  data() {
    return {
      title: '工作计划',
      nowYear: new Date().getFullYear(),
      nowMonth: new Date().getMonth(),
      nowYearMonth: (new Date().getFullYear()) + '年' + ((new Date().getMonth() + 1) || 12) + '月',
      nowWeek: 0,
      getFirstWeek: 0,
      weekList: ['一', '二', '三', '四', '五', '六', '日'],
      dayList:[]
    }
  },
  mounted(){
    this.nowWeek = (new Date()).getDay() - 1
    this.getFirstWeek = new Date(this.nowYear, this.nowMonth, 1).getDay() - 1
    this.nowMonthDay = new Date(this.nowYear, (this.nowMonth + 1), 0).getDate()
    for (var i = 1; i <= this.nowMonthDay; i++) {
      this.dayList.push(i)
    }
    for (var i = 0; i < this.getFirstWeek; i++) {
      this.dayList.unshift(' ')
    }
  },
  methods: {
    onConfirm(val) {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.sales-task {
  /deep/{
    .van-calendar{
      .van-calendar__header{
        box-shadow: none;
        padding-top: 40px;
        .van-calendar__header-title{
          display: none;
        }
        .van-calendar__header-subtitle{
          font-size: 30px;
          color: #333333;
          font-weight: bold;
          margin-bottom: 44px;
        }
        .van-calendar__weekdays{
          .van-calendar__weekday{
            font-size: 22px;
            color: #BBBBBB;
          }
        }
      }
      .van-calendar__body{
        .van-calendar__month{
          .van-calendar__days{
            .van-calendar__month-mark{
              display: none;
            }
          }
        }
      }
      .van-calendar__footer{
        display: none;
      }
    }
  }

  .title_week_body{
    width: 750px;
    height: 202px;
    background: #FFFFFF;
    box-shadow: 0px 16px 40px 0px #F3F3F3;
    border-radius: 0px 0px 24px 24px;
    padding: 40px 48px 44px;
    box-sizing: border-box;
    margin-bottom: 30px;
    text-align: center;
    .title{
      font-size: 30px;
      font-weight: bold;
      color: #333333;
      text-align: center;
      margin-bottom: 40px;
    }
    .week_list{
      width: 100%;
      display: flex;
      flex-direction: row;
      .item_week{
        display: flex;
        justify-content: center;
        width: 93px;
        align-items: center;
        font-size: 22px;
        font-weight: bold;
        color: #BBBBBB;
        .p_active{
          width: 40px;
          height: 40px;
          background: #24A494;
          border-radius: 20px;
          line-height: 40px;
          text-align: center;
        }
        .p{
          width: 40px;
          height: 40px;
          background: none;
          border-radius: 20px;
          line-height: 40px;
          text-align: center;
        }
      }
    }
  }
  .day_list_body{
    width: 750px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
    padding: 0 48px 0;
    box-sizing: border-box;
    .day_item{
      display: flex;
      justify-content: center;
      width: 93px;
      align-items: center;
      font-size: 22px;
      font-weight: bold;
      color: #BBBBBB;
      .day{
        width: 98px;
        height: 76px;
        font-size: 28px;
        color: #333333;
      }
      .day_active{
        width: 98px;
        height: 76px;
        background: #24A494;
        border-radius: 4px;
      }
      .event{
        margin-bottom: 14px;
        height: 96px;
      }
    }
  }


  .addPlanIcon{
    position: fixed;
    bottom:68px;
    right:32px;
    width:100px;
    height: 100px;
  }
}
</style>
