<template>
  <section>
    <van-header title="团队计划" routeName="back" path="-1" :showSearch="true"></van-header>
    <div class="date_list_body">
      <div class="data_list">
        <div class="data_item" v-for="(item, index) in dateList" :key="index">
          <p>{{item}}</p>
        </div>
      </div>
      <van-icon name="arrow-left" color="#BBBBBB" size="14px" @click="dateClick('left')" />
      <van-icon name="arrow" color="#BBBBBB" size="14px" @click="dateClick('right')" />
    </div>
    <div class="log_body">
      <div class="log_item" v-for="(item, index) in 3" :key="index">
        <div class="item_name_line">
          <div class="item_name">
            <p>尹晓茏</p>
          </div>
          <div>
            <span class="item_schedule">当前进度：</span><span class="item_schedule_umber">80%</span>
          </div>
        </div>
        <div class="item_dealer_body">
          <div class="item_dealer" v-for="(item1, index1) in 6" :key="index1">
            <div class="point" v-if="index1 != 1 && index1 != 2 && index1 != 3 "></div>
            <div class="dealer_name">
              <p>拜访经销商1</p>
            </div>
            <div>
              <span class="dealer_signin" v-if="index1 == 1">已签到</span><span class="dealer_abnormal" v-if="index1 == 1">（异常）</span>
              <span class="dealer_signin" v-if="index1 != 1 && index1 != 2 && index1 != 3 ">已签到</span>
              <span class="dealer_signin" v-if="index1 == 2">未签到</span>
              <span class="dealer_signin" v-if="index1 == 3">未到签到时间</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
  export default {
    data() {
      return {
        dateList:[
          '6-12','6-13','6-14'
        ],
      }
    },
    created() {},
    mounted() {},
    methods: {
      dateClick(active){
        let date = ''
        if (active == 'left') {

        }else{

        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.date_list_body{
  margin: 20px auto 24px;
  width: 702px;
  height: 116px;
  background: #FFFFFF;
  box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
  border-radius: 24px;
  padding: 40px 94px;
  box-sizing: border-box;
  position: relative;
  .data_list{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow-x: auto;
    .data_item{
      width: 234px;
      font-size: 28px;
      color: #333333;
      scrollbar-width: none;
      .data_item::-webkit-scrollbar {
        background-color: none;
        color: none;
      }
      P{
        width: 220px;
      }
    }
  }
  .van-icon-arrow-left{
    position: absolute;
    top: 42px;
    left: 32px;
  }
  .van-icon-arrow{
    position: absolute;
    top: 42px;
    right: 32px;
  }
}
.log_body{
  width: 702px;
  margin: 0 auto;
  .log_item{
    width: 100%;
    height: 358px;
    background: #FFFFFF;
    box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
    border-radius: 24px;
    box-sizing: border-box;
    padding: 40px 32px;
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    .item_name_line{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      .item_name{
        font-size: 30px;
        color: #333333;
        font-weight: bold;
      }
      .item_schedule{
        font-size: 26px;
        color: #999999;
      }
      .item_schedule_umber{
        font-size: 26px;
        font-weight: bold;
        color: #FF223D;
      }
    }
    .item_dealer_body{
      margin: 0 18px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item_dealer{
        display: flex;
        flex-direction: column;
        margin-bottom: 40px;
        width: 200px;
        box-sizing: border-box;
        padding: 5px 0 0 20px;
        position: relative;
        .point{
          width: 8px;
          height: 8px;
          background: #FF223D;
          border-radius: 4px;
          position: absolute;
          top: 18px;
          left: 4px;
        }
        .dealer_name{
          font-size: 26px;
          color: #333333;
          margin-bottom: 10px;
        }
        .dealer_signin{
          font-size: 22px;
          color: #BBBBBB;
        }
        .dealer_abnormal{
          font-size: 22px;
          color: #FF223D;
        }
      }
    }
  }
}
</style>
