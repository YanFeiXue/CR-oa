<template>
  <section class="viewMain">
    <van-nav-bar
      left-text="销售管理"
      @click-right="$router.push('/pageMain/remind')"
      class="mbNone"
    >
      <template #right>
        <van-icon name="chat-o" />
      </template>
    </van-nav-bar>
    <section class="viewMain-item selfRes">
      <header class="headers">个人业绩</header>
      <van-chart />
    </section>
    <section class="viewMain-item monthOfProgress">
      <header class="headers">本月进度</header>
      <van-progress
        class="progress"
        :percentage="50"
        stroke-width="8"
        color="#ee0a24"
      />
    </section>
    <section class="viewMain-item h270">
      <header class="headers bt">数据中心</header>
      <div class="swipeWrap">
        <div class="item-wrapper">
          <div class="item tp6">
            <img src="static/img/XSBB.png" />
            <span>销售报表</span>
          </div>
          <div class="item tp6">
            <img src="static/img/ZHL.png" />
            <span>转换率</span>
          </div>
          <div class="item tp6" @click="$router.push('/pageMain/sales-task')">
            <img src="static/img/XSRW.png" />
            <span>销售任务</span>
          </div>

          <div class="item tp6">
            <img src="static/img/BB.png" />
            <span>报表</span>
          </div>
        </div>
      </div>
    </section>
    <section class="viewMain-item h270">
      <header class="headers bt">日常工作</header>
      <div class="swipeWrap">
        <div class="item-wrapper">
          <div class="item tp6" @click="$router.push('/pageMain/work-plan')">
            <img src="static/img/GZJH.png" />
            <span>工作计划</span>
          </div>
          <div class="item tp6" @click="$router.push('/pageMain/daily')">
            <img src="static/img/PRRB.png" />
            <span>PR日报</span>
          </div>
          <div class="item tp6" @click="$router.push('/pageMain/signIn')">
            <img src="static/img/MRQD.png" />
            <span>每日签到</span>
          </div>

          <div class="item tp6" @click="$router.push('/pageMain/team-plan')">
            <img src="static/img/TDJH.png" />
            <span>团队计划</span>
          </div>
        </div>
      </div>
    </section>
    <section class="viewMain-item h270">
      <header class="headers bt">经销商信息</header>
      <div class="swipeWrap">
        <div class="item-wrapper">
          <div class="item tp6" @click="$router.push('/pageMain/my-apply?active=1')">
            <img src="static/img/WDSQ.png" />
            <span>我的申请</span>
          </div>
          <div class="item tp6" @click="$router.push('/pageMain/my-apply?active=2')">
            <img src="static/img/WDSP.png" />
            <span>我的审批</span>
          </div>
          <div class="item tp6" @click="$router.push('/pageMain/suspend-work')">
            <img src="static/img/ZTJJ.png" />
            <span>暂停进件</span>
          </div>
          <div class="item tp6" @click="$router.push('/pageMain/suspend-loan')">
            <img src="static/img/ZTFK.png" />
            <span>暂停放款</span>
          </div>
        </div>
      </div>
    </section>
    <van-footer :activeNum="0" />
  </section>
</template>

<script>
import Vue from 'vue'
import chart from '@/base/echarts'
import { Swipe, SwipeItem, Progress } from 'vant'
Vue.use(Swipe).use(SwipeItem).use(Progress)
export default {
  name: 'ViewMain',
  components: {
    'van-chart': chart
  },
  data() {
    return {
      current: 0
    }
  },
  created() {},
  mounted() {},
  methods: {
    onChange(index) {
      this.current = index
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.viewMain {
  padding-bottom: 100px;
  .viewMain-item {
    box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
    border-radius: 24px;
    margin: 20px auto;
    position: relative;
    width: 702px;
    .headers {
      padding: 15px 10px;
      position: absolute;
      border: none;
      left: 25px;
      top: 30px;
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #333333;
    }
  }
  .viewMain-item.selfRes {
    height: 470px;
  }
  .viewMain-item.monthOfProgress {
    box-shadow: 0 0 black;
    background-color: none;
    padding:10px 0;
    .headers {
      position: initial;
      padding-left: 35px;
    }
    .progress {
      width: 98%;
      margin: 10px auto;
    }
  }
  .viewMain-item.h270 {
    height: 270px;
  }
  .swipeWrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-top: 30px;
    .item-wrapper {
      display: flex;
      justify-content: space-between;
    }
    .item-wrapper.item-wrapper-start {
      justify-content: start;
    }
    .tp6 {
      top: 10px;
    }
    .bt6 {
      bottom: 10px;
    }
    .item {
      width: 200px;
      padding: 0 0px;
      text-align: center;
      display: flex;
      align-items: center;
      flex-direction: column;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      position: relative;
      img {
        width: 64px;
        height: 64px;
        margin: 10px 0;
      }
      span {
        padding: 6px 0;
      }
      .h104 {
        height: 86px;
      }
    }
  }
}
</style>
