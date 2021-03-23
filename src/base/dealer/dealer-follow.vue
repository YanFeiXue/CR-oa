<template>
  <section id="leftToDom">
    <div class="dealer-follow-wrapper wrapper-public">
      <div class="record-person">
        <div class="dealer-name">
          <img src="../../common/image/addPlan.png" />
          <span class="record-name">赵旭阳</span>
        </div>

        <span class="record-date">2020年07月11日 09:48</span>
      </div>
      <div class="record-content">
        这个经销商最近安鹏进件量低，看看什么原因， 幸苦。
      </div>
      <div class="record-img" style="display:none">
        <img src="../../common/image/addPlan.png" />
        <img src="../../common/image/addPlan.png" />
        <img src="../../common/image/addPlan.png" />
      </div>
    </div>
    <div class="dealer-follow-wrapper wrapper-public">
      <div class="record-person">
        <div class="dealer-name">
          <img src="../../common/image/addPlan.png" />
          <span class="record-name">赵旭阳</span>
        </div>

        <span class="record-date">2020年07月11日 09:48</span>
      </div>
      <div class="record-content">
        这个经销商最近安鹏进件量低，看看什么原因， 幸苦。
      </div>
      <div class="record-img" style="display:none">
        <img src="../../common/image/addPlan.png" />
        <img src="../../common/image/addPlan.png" />
        <img src="../../common/image/addPlan.png" />
      </div>
      <img src="../../common/image/addPlan.png" class="addPlanIcon" @click="$router.push('add-schedule')"/>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'

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
<style lang="less" scoped>
.dealer-follow-wrapper {
  padding: 40px 32px;
  .record-person {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .dealer-name {
      display: flex;
      align-items: center;
      color: #333333;
      font-size: 30px;
      img {
        width: 76px;
        height: 76px;
        margin-right: 20px;
      }
    }
    .record-date {
      color: #bbbbbb;
      font-size: 26px;
    }
  }
  .record-content {
    padding:20px 0;
    font-size: 26px;
    color: #666666;
  }
  .record-img{
    padding:10px 0;
    display: flex;
    align-items: center;
    justify-content:space-around;
    img{
      width:140px;
      height: 140px;
    }
  }
  .addPlanIcon{
    position: fixed;
    bottom:274px;
    right:40px;
    width:100px;
    height: 100px;
  }
}
</style>
