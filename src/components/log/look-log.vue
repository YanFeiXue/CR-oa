<template>
  <section>
    <van-header :title="logtitle" path="/viewMain/home"></van-header>
    <van-tabs v-model="active" class="threeItems" @click="scrollTabs">
      <van-tab title="全部日志" name="1"></van-tab>
      <van-tab title="我的日志" name="2"></van-tab>
      <van-tab title="团队日志" name="3"></van-tab>
    </van-tabs>

    <van-footer :activeNum="0" />
  </section>
</template>

<script>
  import Vue from 'vue'
  import {
    Tab,
    Tabs
  } from 'vant'
  Vue.use(Tab).use(Tabs)
  import header from '../../base/Header'
  import footer from '../../base/Footer/logFooter'
  export default{
    components: {
      'van-header': header,
      'van-footer': footer
    },
    data() {
      return {
        logtitle: '看日志',
        active: 1
      }
    },
    mounted() {

    },
    methods: {
      scrollTabs() {

      }
    },
  }
</script>

<style lang="scss" scoped="scoped">
  /deep/ {
    .van-tabs__wrap {
      height: 100px;
      width: 750px;
      margin: auto;
    }
    .van-tabs__nav{
      margin: 0;
      height: 70px;
    }

    .van-tab--active {
      color: #22A78E;
      font-weight: bold;
    }

    .van-tab {
      font-size: 30px;
      height: 70px;
    }

    .van-tab__text {
      height: 70px;
      line-height: 70px;
    }

    .van-tabs__line {
      width: 40px;
      height: 6px;
      background: #22A78E;
      border-radius: 3px;
    }
  }
</style>
