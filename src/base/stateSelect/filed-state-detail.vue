<template>
  <section class="filed-state-details" id="leftToDom">
    <van-header :title="title" path="-1" routeName="back"></van-header>
    <div class="h20"></div>
    <header class="title">
      <span class="name" v-text="dataInfo.customerName"></span>
      <span v-text="dataInfo.status" :class="dataInfo.status=='归档超时'?'status1':'status2'"></span>
    </header>
    <van-steps direction="vertical" :active="0" id="filedStep" :active-color="formatColor">
      <van-step v-if="dataInfo.status=='归档超时'">
        <p class="item">归档超时:</p>
        <p class="item" v-text="dataInfo.timeoutDate||'无'"></p>
      </van-step>
      <van-step>
        <p class="item">归档时间:</p>
        <p class="item" v-text="dataInfo.endDate||'无'"></p>
      </van-step>
      <van-step>
        <p class="item">归档起始时间:</p>
        <p class="item" v-text="dataInfo.beginDate"></p>
      </van-step>
    </van-steps>
  </section>
</template>

<script>
import Vue from 'vue'
import { Step, Steps } from 'vant'
import Header from '@/base/Header/Header'
Vue.use(Step).use(Steps)
import { getFileReturnTimeTree } from '@/api/api'
export default {
  name: 'filedState',
  data() {
    return {
      title: '归档状态',
      active: 0,
      leaseId: this.$route.query.leaseId,
      dataInfo: []
    }
  },
  components: {
    'van-header': Header
  },
  computed: {
    formatColor() {
      return this.dataInfo.status == '归档超时' ? '#FF1A1A' : '#22A78E'
    }
  },
  mounted() {
    this._getFileReturnTimeTree()
  },
  methods: {
    _getFileReturnTimeTree() {
      this.$toast.loading({
        mask: false,
        message: '加载中...'
      })
      getFileReturnTimeTree({ leaseId: this.leaseId }).then(data => {
        if (data.code != 0) {
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
.filed-state-details {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 750px;
  height: 100vh;
  background: #fff;
  .h20 {
    height: 20px;
    position: relative;
    bottom: 20px;
    background: #f4f4f4;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 20px;
    font-size: 28px;
    color: rgba(48, 48, 48, 1);
    border-bottom: 1px solid #ededed;
    .status1 {
      color: #ff1a1a;
    }
    .status2 {
      color: #22a78e;
    }
  }
  #filedStep {
    width: 400px;
    padding: 40px 40px;
    margin: 0 auto;
    .item {
      padding: 12px 20px 20px;
    }
  }
}
</style>
