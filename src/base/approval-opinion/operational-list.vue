<template>
  <section class="operationalList appView" id="leftToDom">
    <van-header :title="title" :routeName="'back'" v-if="isHeader"></van-header>

    <div class="look_other">
      <div class="first" @click="routerPath('/pageMain/incoming')">
        <img src="../../assets/img/CKJJXX.png" />
        <span>查看进件信息</span>
      </div>
      <div class="second" @click="routerPath('/pageMain/uploadFile')">
        <img src="../../assets/img/CKYXJ.png" />
        <span>查看影像件</span>
      </div>
    </div>

    <van-steps direction="vertical" :active="0" active-color="#22A78E">
      <van-step v-for="(item, index) in allTask" :key="index">
        <h3>
          <span>{{ item.taskStatus || "无" }}</span>
        </h3>
        <p class="item">备注内容:{{ item.msg || "无" }}</p>
        <p class="item">录入时间:{{ item.submitTime || "无" }}</p>
      </van-step>
    </van-steps>
  </section>
</template>

<script>
import Vue from 'vue'
import { Step, Steps } from 'vant'

Vue.use(Step).use(Steps)
import Header from '../../base/Header'
import { getAllTaskMsgList } from '../../api/api'
export default {
  name: 'operationalList',
  data() {
    return {
      title: '申请状态',
      trialForm: {},
      isHeader: this.$route.query.isHeader || false,
      leaseId: this.$route.query.leaseId,
      allTask: []
    }
  },
  components: {
    'van-header': Header
  },
  mounted() {
    this._getAllTaskMsgList()
  },
  computed: {},
  methods: {
    _getAllTaskMsgList() {
      getAllTaskMsgList({
        relationId: this.leaseId,
        tokenId: sessionStorage.getItem('tokenid')
      }).then(data => {
        this.allTask = data.data.list.reverse()
      })
    },
    routerPath(router){
      this.$router.push({path: router, query:{
        leaseId: this.leaseId,
        incoming: true
      }})
    },
  }
}
</script>

<style lang="less" scoped="scoped">

.look_other{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 670px;
  margin: 24px auto 72px;
  .first{
    width: 304px;
    height: 104px;
    background: #FFFFFF;
    box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
    border-radius: 24px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    flex-direction: row;
    padding: 26px 32px;
    img{
      width: 52px;
      height: 52px;
      margin-right: 20px;
    }
    span{
      font-size: 28px;
      color: #000000;
    }
  }
  .second{
    width: 304px;
    height: 104px;
    background: #FFFFFF;
    box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
    border-radius: 24px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    flex-direction: row;
    padding: 26px 32px;
    img{
      width: 52px;
      height: 52px;
      margin-right: 20px;
    }
    span{
      font-size: 28px;
      color: #000000;
    }
  }
}




body {
  .operationalList {
    background: #fff !important;
    .van-steps {
      padding: 40px;
      border: none;
      width: 450px;
      margin: 0 auto;
      .van-steps__items {
        border: none;
        .van-hairline {
          padding-top: 0;
          border: none;
          h3 {
            margin: 0;
            font-size: 32px;
            padding: 0;
            span {
              display: block;
              padding: 10px 20px 20px;
            }
          }
          .item {
            padding: 10px 20px;
            line-height: 40px;
          }
        }
      }
      .van-step--vertical .van-step__line {
        width: 2px;
      }
      [class*='van-hairline']::after {
        border: none;
      }
      .van-icon-checked {
        font-size: 36px;
      }
      .van-step__circle {
        width: 20px;
        height: 20px;
      }
    }
  }
  .van-step--vertical:not(:last-child)::after {
    border: none;
  }
}
</style>
