<template>
  <section class="dealer-info">
    <van-header title="经销商维护" path="-1" routeName="back"></van-header>
    <div class="dealer-info-nav">
      <div class="nav-container">
        <span :class="active == 1 ? 'active' : ''" @click="active = 1">经销商维护</span>
        <span :class="active == 2 ? 'active' : ''" @click="active = 2">跟进记录</span>
      </div>
    </div>
    <section>
      <dealer-maintain v-if="active == 1" />
      <dealer-follow v-if="active == 2" />
    </section>
  </section>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'

Vue.use(Icon)
import dealerMaintain from './dealer/dealer-maintain'
import dealerFollow from './dealer/dealer-follow'
export default {
  name: 'DealerInfo',
  data() {
    return {
      active: 1,
    }
  },
  components: {
    'dealer-maintain': dealerMaintain,
    'dealer-follow': dealerFollow,
  },
  mounted() {
    this.active = this.$route.query.active || 1
  },
  methods: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dealer-info {
  .dealer-info-nav {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0 20px 0;
    .nav-container {
      background: #F0F0F0;
      border-radius: 38px;
      span {
        display: inline-block;
        width: 220px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        background: #f0f0f0;
        border-radius: 38px;
        color: #666666;
        font-size: 28px;
        position: relative;
        font-family: PingFangSC-Regular;
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
}
</style>
