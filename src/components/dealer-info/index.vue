<template>
  <section class="dealer-info appView" id="leftToDom">
    <div class="dealer-info-nav">
      <van-icon name="arrow-left" class="arrow-left" @click="$router.back()" />
      <div class="nav-container">
        <span :class="active == 1 ? 'active' : ''" @click="active = 1">经销商维护</span>
        <span :class="active == 2 ? 'active' : ''" @click="active = 2">跟进记录</span>
      </div>
    </div>
    <section>
      <dealer-maintain v-if="active==1" />
      <dealer-follow v-if="active==2" />
    </section>
  </section>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'

Vue.use(Icon)
import dealerMaintain from '@/base/dealer/dealer-maintain'
import dealerFollow from '@/base/dealer/dealer-follow'
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
  created() {},
  mounted() {},
  methods: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.dealer-info {
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
  .dealer-btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px 0;
    .item {
      width: 220px;
      padding: 20px 0;
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
