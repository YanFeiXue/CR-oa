<template>
  <section class="remind appView" id="leftToDom">
    <van-header :title="title" :routeName="'back'" :path="'-1'"></van-header>
    <section class="remind-wrapper">
      <div class="item-name">何龙</div>
      <ul class="item">
        <li>出差申请</li>
        <li>出差事由:维护经销商</li>
        <li>开始日期:3月1日</li>
        <li>结束日期:3月5日</li>
        <li>预计费用:1200</li>
      </ul>
      <div class="item-date">3月20日 14:25</div>
    </section>
    <section class="remind-wrapper">
      <div class="item-name">何龙</div>
      <ul class="item">
        <li>出差申请</li>
        <li>出差事由:维护经销商</li>
        <li>开始日期:3月1日</li>
        <li>结束日期:3月5日</li>
        <li>预计费用:1200</li>
      </ul>
      <div class="item-date">3月20日 14:25</div>
    </section>
    <section class="remind-wrapper">
      <div class="item-name">何龙</div>
      <ul class="item">
        <li>出差申请</li>
        <li>出差事由:维护经销商</li>
        <li>开始日期:3月1日</li>
        <li>结束日期:3月5日</li>
        <li>预计费用:1200</li>
      </ul>
      <div class="item-date">3月20日 14:25</div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'Remind',
  data() {
    return {
      title: '审批提醒'
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.remind-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 6px 0;
  padding: 10px 40px;
  background: #fff;
  position: relative;
  .item-name {
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    background-color: #0076ff;
  }
  .item {
    padding-left: 30px;
    li {
      padding: 6px 0;
    }
  }
  .item-date {
    position: absolute;
    right: 30px;
    top: 20px;
  }
}
</style>
