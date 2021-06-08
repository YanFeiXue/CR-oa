<template>
  <section>
    <van-header title="跟进记录" path="-1" routeName="back" :showComplete="true"></van-header>
    <div class="dealer_name">
      <span class="test">经销商名称：</span>
      <span class="name">大连众信惠普</span>
    </div>
    <div class="follow_up_record_body">
      <img src="../../../static/img/jl.png" />
      <textarea placeholder="请输入经销商跟进记录"></textarea>
    </div>
    <div class="enclosure_body">
      <div style="display: flex;flex-direction: row;align-items: center;">
        <img class="enclosure_img" src="../../../static/img/fj.png" />
        <p>附件</p>
      </div>
      <img src="../../../static/img/fjjia.png" />
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
  .dealer_name {
    width: 702px;
    height: 122px;
    background: #FFFFFF;
    box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
    border-radius: 24px;
    margin: 24px auto;
    box-sizing: border-box;
    padding: 40px 32px;

    .test {
      font-size: 30px;
      color: #999999;
      font-family: PingFangSC-Regular;
    }

    .name {
      font-size: 30px;
      font-weight: bold;
      color: #333333;
      font-family: PingFangSC-Medium;
    }
  }

  .follow_up_record_body {
    width: 702px;
    margin: 0 auto;
    padding: 40px 32px;
    box-sizing: border-box;
    height: 316px;
    background: #FFFFFF;
    box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
    border-radius: 24px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    img {
      width: 36px;
      height: 36px;
      margin: 24px 20px 0 0;
    }

    textarea {
      width: 582px;
      height: 200px;
      background: #FFFFFF;
      border-radius: 12px;
      border: 2px solid #EEEEEE;
      padding: 20px;
      font-family: PingFangSC-Regular;
    }

  }
  .enclosure_body{
    width: 702px;
    height: 122px;
    background: #FFFFFF;
    box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
    border-radius: 24px;
    font-size: 30px;
    color: #333333;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 24px auto;
    padding: 40px 32px;
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
    img{
      width: 36px;
      height: 36px;
    }
    .enclosure_img{
      margin-right: 20px;
    }
  }
</style>
