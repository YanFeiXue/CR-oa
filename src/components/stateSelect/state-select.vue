<template>
  <section>
    <van-tabs v-model="active" @click="scrollTabs">

      <van-tab title="申请" name="1">
        <van-apply-state />
      </van-tab>

      <van-tab title="归档" name="3">
        <van-filed-state />
      </van-tab>

      <van-tab title="还款" name="2">
        <van-repayment-state />
      </van-tab>

      <div class="backWrapper">
        <img src="../../../static/img/barBack.png" class="barBack" @click="$router.back()">
      </div>
    </van-tabs>
  </section>
</template>
<script>
  import Vue from 'vue'
  import {
    Tab,
    Tabs
  } from 'vant'
  Vue.use(Tab).use(Tabs)
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import ApplyState from './stateSelect/apply-state'
  import FiledState from './stateSelect/filed-state'
  import RepaymentState from './stateSelect/repayment-state'
  export default {
    name: 'process',
    data() {
      return {
        active: 0,
        title: '状态查询',
      }
    },
    components: {
      'van-apply-state': ApplyState,
      // 'van-apply-all': ApplyStateAll,
      // 'van-apply-order': ApplyStateOrder,
      'van-repayment-state': RepaymentState,
      'van-filed-state': FiledState
    },
    computed: {
      ...mapGetters(['stateIndex']),
      isAllProcess() {
        const isAllProcess = localStorage.getItem('isAllProcess')
        return isAllProcess == 'true'
      },
      isOrderProcess() {
        const isOrderProcess = localStorage.getItem('isOrderProcess')
        return isOrderProcess == 'true'
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.name == 'viewMain') {
        this.setStateIndex(0)
      }
      next()
    },
    mounted() {
      this.active = this.stateIndex
    },
    methods: {
      scrollTabs(name, title) {
        this.setStateIndex(name)
      },
      ...mapMutations({
        setStateIndex: 'SET_STATEINDEX'
      }),
    }
  }
</script>
<style lang="scss" scoped="scoped">

  /deep/ {
    .van-tabs--line{
      .van-tabs__wrap {
        height: 98px;
        width: 350px;
        margin: auto;
        .van-tabs__nav{
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

  .barBack {
    position: absolute;
    left: 28px;
    top: 38px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
