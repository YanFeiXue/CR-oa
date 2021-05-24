<template>
  <section class="sales-task appView" id="leftToDom">
    <van-header :title="title" :routeName="'back'" :path="'-1'"></van-header>
    <van-calendar ref="vanCalendar" title="日历" :poppable="false" color="#24A494" @confirm="onConfirm" :max-date="maxDate" :title="''"/>
    <img src="../../assets/img/addPlan.png" class="addPlanIcon" @click="$router.push('new-schedule')"/>
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
      maxDate: new Date(2021, 2, 3),
      nowWeek: 0
    }
  },
  mounted(){
    this.nowWeek = (new Date()).getDay()
    console.log(this.nowWeek);
  },
  methods: {
    onConfirm(val) {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.sales-task, .appView {
  /deep/.van-calendar{
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




  .addPlanIcon{
    position: fixed;
    bottom:74px;
    right:40px;
    width:100px;
    height: 100px;
  }
}
</style>
