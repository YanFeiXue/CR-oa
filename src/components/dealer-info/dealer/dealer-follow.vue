<template>
  <section id="leftToDom">
    <div class="dealer-follow-wrapper">
      <div class="record-person">
        <div class="dealer-name">
          <img src="../../../../static/img/head.png" />
          <span class="record-name">赵旭阳</span>
        </div>
        <span class="record-date">2020年07月11日 09:48</span>
      </div>
      <div class="record-content">
        这个经销商最近安鹏进件量低，看看什么原因， 幸苦。
      </div>
      <div class="record-img" style="display:none">
        <img src="../../../../static/img/addPlan.png" />
        <img src="../../../../static/img/addPlan.png" />
        <img src="../../../../static/img/addPlan.png" />
      </div>
    </div>
    <div class="dealer-follow-wrapper">
      <div class="record-person">
        <div class="dealer-name">
          <img src="../../../../static/img/head.png" />
          <span class="record-name">赵旭阳</span>
        </div>
        <span class="record-date">2020年07月11日 09:48</span>
      </div>
      <div class="record-content">
        这个经销商最近安鹏进件量低，看看什么原因， 幸苦。
      </div>
      <div class="record-img">
        <img src="../../../../static/img/addPlan.png" />
        <img src="../../../../static/img/addPlan.png" />
        <img src="../../../../static/img/addPlan.png" />
      </div>
      <img src="../../../../static/img/addPlan.png" class="addPlanIcon" @click="$router.push('follow-up-record')" />
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
  import {
    Icon
  } from 'vant'

  Vue.use(Icon)
  export default {
    name: 'DealerInfo',
    data() {
      return {
        active: 1
      }
    },
    created() {},
    mounted() {},
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .dealer-follow-wrapper {
    padding: 40px 32px;
    width: 702px;
    background: #FFFFFF;
    box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
    border-radius: 24px;
    box-sizing: border-box;
    margin: 0 auto 24px;

    .record-person {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .dealer-name {
        display: flex;
        align-items: center;
        color: #333333;
        font-size: 30px;
        font-family: PingFangSC-Medium;

        img {
          width: 76px;
          height: 76px;
          margin-right: 20px;
        }

        .record-name{
          font-weight: bold;
        }
      }

      .record-date {
        color: #bbbbbb;
        font-size: 26px;
        font-family: PingFangSC-Regular;
      }
    }

    .record-content {
      padding: 20px 0;
      font-size: 26px;
      color: #666666;
      font-family: PingFangSC-Regular;
    }

    .record-img {
      padding: 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-around;

      img {
        width: 140px;
        height: 140px;
      }
    }

    .addPlanIcon {
      position: fixed;
      bottom: 286px;
      right: 40px;
      width: 100px;
      height: 100px;
    }
  }
</style>
