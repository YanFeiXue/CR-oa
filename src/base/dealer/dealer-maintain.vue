<template>
  <section id="leftToDom">
    <div class="dealer-info-wrapper wrapper-public">
      <section class="item-wrapper">
        <div class="item-label">经销商名称:</div>
        <div class="item-value">大连众信惠普</div>
      </section>
      <section class="item-wrapper">
        <div class="item-label">保证金模式:</div>
        <div class="item-value">1+4</div>
      </section>
      <section class="item-wrapper">
        <div class="item-label">已缴保证金:</div>
        <div class="item-value">10000.00</div>
      </section>
      <section class="item-wrapper">
        <div class="item-label">已开通产品:</div>
        <div class="item-value">车信融B、车信融-SNYH-A-36</div>
      </section>
      <section class="item-wrapper">
        <div class="item-label">已开通区域:</div>
        <div class="item-value">皖A、皖B、皖C</div>
      </section>
    </div>
    <div class="wrapper-public dealer-btn-wrapper">
      <div class="item tp6">
        <img src="static/img/JNBZJ.png" />
        <span>缴纳保证金</span>
      </div>
      <div class="item tp6">
        <img src="static/img/LSJY.png" />
        <span>临时经营</span>
      </div>
      <div class="item tp6">
        <img src="static/img/YJJY.png" />
        <span>永久经营</span>
      </div>
      <div class="item tp6">
        <img src="static/img/ZHKT.png" />
        <span>账号开通</span>
      </div>
      <div class="item tp6">
        <img src="static/img/ZXZF.png" />
        <span>中息中费</span>
      </div>
      <div class="item tp6">
        <img src="static/img/CPKT.png" />
        <span>产品开通</span>
      </div>
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
.dealer-info {
  .dealer-info-nav {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0 20px 0;
    .nav-container {
      span {
        display: inline-block;
        width: 206px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        background: #f0f0f0;
        border-radius: 38px;
        color: #666666;
        font-size: 28px;
        position: relative;
      }
      span:first-child {
        left: 15px;
      }
      span:last-child {
        right: 15px;
      }
      .active {
        color: #fff;
        background: #24a494;
        z-index: 2;
      }
    }
    .arrow-left {
      position: absolute;
      left: 24px;
      top: 48px;
      font-size: 38px;
    }
  }
  .dealer-info-wrapper {
    padding: 40px 32px;
    .item-wrapper {
      display: flex;
      align-items: center;
      padding-bottom: 30px;
      font-size: 30px;
      color: #999999;
      .item-value {
        color: #333333;
        margin-left: 20px;
      }
    }
  }
  .dealer-btn-wrapper{
    display:flex;
    align-items: center;
    justify-content:space-between;
    flex-wrap: wrap;
    padding:20px 0;
    .item {
      width: 220px;
      padding:20px 0;
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
