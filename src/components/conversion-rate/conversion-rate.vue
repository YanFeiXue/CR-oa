<template>
  <section>
    <van-header title="转化率" path="-1" routerName="back" :showConversion="true" @conversionClick="conversionClick"></van-header>
    <van-tabs>
      <van-tab title="当日" name="1"></van-tab>
      <van-tab title="3日内" name="2"></van-tab>
      <van-tab title="7日内" name="3"></van-tab>
      <van-tab title="30日内" name="4"></van-tab>
    </van-tabs>
    <div class="conversion_list_body">
      <div class="item_body" v-for="(item, index) in 3" :key="index">
        <div class="name_line">
          <div class="name">
            <p>鑫融商显明</p>
          </div>
          <div>
            <span class="all_converion">总转化率：</span><span class="number">16.35%</span>
          </div>
        </div>
        <div class="under_list">
          <div class="under_item" v-for="(item, index) in 3" :key="index">
            <div class="title">
              <p>预审批</p>
            </div>
            <div class="number">
              <p>32.85%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
  import {
    tabs,
    tab
  } from 'vant'
  Vue.use(tabs).use(tab)
  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      conversionClick(type){

      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .conversion_list_body{
    padding: 0 0 30px 0;
    .item_body{
      width: 702px;
      height: 284px;
      background: #FFFFFF;
      box-shadow: 0px 0px 38px 0px rgba(227, 227, 227, 0.8);
      border-radius: 8px;
      box-sizing: border-box;
      padding: 32px 0;
      margin: 24px auto 0;
      .name_line{
        box-sizing: border-box;
        padding: 0 32px 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #E7E7E7;
        .name{
          font-size: 34px;
          font-weight: bold;
          color: #333333;
        }
        .all_converion{
          font-size: 28px;
          color: #333333;
        }
        .number{
          font-size: 36px;
          font-weight: bold;
          color: #007AFF;
        }
      }
      .under_list{
        margin: 40px 52px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .under_item{
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          .title{
            font-size: 28px;
            color: #999999;
          }
          .number{
            font-size: 32px;
            font-weight: bold;
            color: #333333;
            margin: 20px 0 0;
          }
        }
      }

    }
  }
  
  /deep/ {
    .van-tabs--line {
      .van-tabs__wrap {
        height: 88px;
        width: 750px;
        margin: auto;
  
        .van-tabs__nav {
          margin: 15px 0;
          height: 70px;
  
          .van-tab--active {
            color: #333333;
            font-weight: bold;
          }
  
          .van-tab {
            font-size: 34px;
            height: 70px;
  
            .van-tab__text {
              height: 70px;
              line-height: 70px;
              font-family: PingFangSC-Medium;
            }
          }
  
          .van-tabs__line {
            width: 40px;
            height: 6px;
            background: #22A78E;
            border-radius: 3px;
          }
        }
      }
    }
  }
</style>
