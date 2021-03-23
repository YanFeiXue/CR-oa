<template>
  <section class="sales-task appView" id="leftToDom">
    <van-header :title="title" :routeName="'back'" :path="'-1'"></van-header>
    <van-calendar title="日历" :poppable="false" color="#24A494" @confirm="onConfirm" :max-date="maxDate"/>
    <img src="../../common/image/addPlan.png" class="addPlanIcon" @click="$router.push('new-schedule')"/>
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
      maxDate: new Date(2021, 2, 3)
    }
  },
  methods: {
    onConfirm(val) {
      console.log(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.sales-task {
  .addPlanIcon{
    position: fixed;
    bottom:74px;
    right:40px;
    width:100px;
    height: 100px;
  }
}
</style>
