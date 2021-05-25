<template>
  <section class="repayment-state-details" id="leftToDom">
    <van-header :title="title" path="-1" routeName="back"></van-header>
    <div class="h20"></div>
    <div class="details-wrapper" v-if="dataInfo.length">
      <div class="details" v-for="(item, index) in dataInfo" :key="index">
        <van-cell title="期数:" :value="item.payTimes" />
        <van-cell title="月供:" :value="item.payAmount" />
        <van-cell title="还款日:" :value="item.payDate" />
        <van-cell
          title="还款状态:"
          class="repayStatus"
          :class="item.payStatus==1?'status1':'status2'"
          :value="item.payStatus==1?'正常':'逾期'"
        />
      </div>
    </div>
    <van-details v-else></van-details>
  </section>
</template>
<script>
import Vue from 'vue'
import Header from '@/base/Header/Header'
import { Cell, ActionSheet } from 'vant'
Vue.use(Cell).use(ActionSheet)
import { getRepayMentDetail } from '@/api/api'
export default {
  name: 'filedState',
  data() {
    return {
      title: '还款状态',
      customerId: this.$route.query.customerId,
      dataInfo: []
    }
  },
  components: {
    'van-header': Header
  },
  mounted() {
    this._getRepayMentDetail()
  },
  methods: {
    _getRepayMentDetail() {
      this.$toast.loading({
        mask: false,
        message: '加载中...'
      })
      getRepayMentDetail({ customerId: this.customerId }).then(data => {
        if (data.code != 0) {
          this.$toast.fail(data.msg)
          this.dataInfo = []
          return
        }
        this.$toast.clear()
        this.dataInfo = data.data
      })
    }
  },
  watch: {}
}
</script>

<style lang="less">
.repayment-state-details {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 750px;
  height: 100vh;
  background: #fff;
  overflow: scroll;
  .h20 {
    height: 20px;
    position: relative;
    bottom: 20px;
    background: #f4f4f4;
  }
  .details-wrapper {
    width: 710px;
    margin: 0px auto;

    border-radius: 12px;
    background-color: #fff;
    .details {
      margin-bottom: 1px;
      border-bottom: 1px solid #ededed;
      .van-cell {
        padding: 15px 0;
      }
      .repayStatus.status1 {
        .van-cell__value {
          color: #22a78e;
        }
      }
      .repayStatus.status2 {
        .van-cell__value {
          color: #ff1a1a;
        }
      }
      .van-cell__title {
        color: #9c9c9c;
        font-size: 26px;
      }
      .van-cell__value {
        color: #303030;
        font-size: 26px;
      }
    }
  }
}
</style>
