<template>
  <section class="remind appView" id="leftToDom">
    <van-header :title="title" :routeName="'back'" :path="'-1'"></van-header>
    <section class="remind-wrapper">
      <section class="remind-item">
        <div class="item-name">
          <span>何龙</span>
          <span>出差申请</span>
          <span>2020/3/22 14:45</span>
        </div>
        <ul class="item">
          <li>出差事由:<span>维护经销商</span></li>
          <li>开始日期:<span>3月1日</span></li>
          <li>结束日期:<span>3月5日</span></li>
          <li>预计费用:<span>1200</span></li>
        </ul>
      </section>
      <section class="remind-item">
        <div class="item-name">
          <span>何龙</span>
          <span>出差申请</span>
          <span>2020/3/22 14:45</span>
        </div>
        <ul class="item">
          <li>出差事由:<span>维护经销商</span></li>
          <li>开始日期:<span>3月1日</span></li>
          <li>结束日期:<span>3月5日</span></li>
          <li>预计费用:<span>1200</span></li>
        </ul>
      </section>
      <section class="remind-item">
        <div class="item-name">
          <span>何龙</span>
          <span>出差申请</span>
          <span>2020/3/22 14:45</span>
        </div>
        <ul class="item">
          <li>出差事由:<span>维护经销商</span></li>
          <li>开始日期:<span>3月1日</span></li>
          <li>结束日期:<span>3月5日</span></li>
          <li>预计费用:<span>1200</span></li>
        </ul>
      </section>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.remind-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 20px;
  .remind-item {
    margin: 12px 0;
    background: #fff;
    position: relative;
    width: 702px;
    height: 386px;
    background: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
    border-radius: 24px;
    padding: 40px 50px 40px 30px;
    box-sizing: border-box;
    .item-name {
      position: relative;
      padding-bottom: 10px;
      span {
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        text-align: center;
        display: inline-block;
      }
      span:nth-child(1) {
        width: 60px;
        height: 60px;
        line-height: 60px;
        color: #fff;
        border-radius: 50%;
        background-color: #0076ff;
      }
      span:nth-child(2) {
        width: 116px;
        height: 40px;
        background: #24a494;
        border-radius: 8px;
        line-height: 40px;
        font-size: 22px;
        color: #ffffff;
      }
      span:nth-child(3) {
        font-size: 24px;
        height: 60px;
        line-height: 60px;
        color: #999999;
        position: absolute;
        right: 0;
      }
    }
    .item {
      padding-left: 70px;
      li {
        padding: 12px 0;
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        span {
          color: #333333;
          padding-left: 10px;
        }
      }
    }
  }
}
</style>
