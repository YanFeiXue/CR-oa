<template>
  <section class="repayment-state">
    <div class="filter-input_body">
      <div class="filter-input">
        <van-field v-model="filterVal" ref="filterVal" @click="focusThis('filterVal')" placeholder="请输入客户姓名" />
        <van-button type="default" @click="filterData()">查询</van-button>
      </div>
      <div class="screen">
        <span>筛选</span>
        <img src="../../../static/img/shanxuan.png" />
      </div>
    </div>
    <div class="wrapper" ref="wrapper">
      <ul v-if="dataInfo.length">
        <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
          ref="loadmore">
          <div class="state_select-wrap" v-for="(item, index) in dataInfo" :key="index" @click="jump(item.customerId)">
            <div class="itemDetail">
              <van-cell :value="item.customerName || '-'"></van-cell>
              <van-cell title="产品名称:" :value="item.productName || '-'"></van-cell>
            </div>
            <div class="status2" :class="item.repaymentStatus == '逾期' ? 'err' : ''">
              <span v-text="item.repaymentStatus">逾期</span>
            </div>
          </div>
        </mt-loadmore>
      </ul>
      <van-details v-else></van-details>
    </div>
  </section>
</template>
<script>
  import Vue from 'vue'
  import {
    PullRefresh,
    ActionSheet
  } from 'vant'
  Vue.use(PullRefresh).use(ActionSheet)
  import {
    getDealerLoanDataDetail
  } from '../../api/api'
  import {
    loadMore
  } from '../../common/js/mixin'
  export default {
    name: 'repaymentState',
    mixins: [loadMore],
    data() {
      return {
        title: '',
        isLoading: false,
        isDISABLED: true,
        params: {
          tokenId: sessionStorage.getItem('tokenid'),
          page: 1,
          size: 10,
          repaymentStatus: 2,
          customerName: '',
          mobile: ''
        },
        dataInfo: [],
        filterVal: '',
        repaySheet_flag: false,
        detailsFlags: false,
        customerId: '',
        option: [{
            value: 2,
            name: '逾期'
          },
          {
            value: 1,
            name: '正常'
          }
        ]
      }
    },
    created() {
      this.$toast.loading({
        mask: false,
        message: '加载中...'
      })
    },
    watch: {
      filterVal(newVal, oldVal) {
        if (newVal == '') {
          this.params.page = 1
          this.params.customerName = ''
          this._getDataInfo(false, true)
        }
      }
    },
    methods: {
      _getDataInfo(flag, search) {
        getDealerLoanDataDetail(this.params).then(data => {
          if (data.code != 0) {
            this.$toast.fail(data.msg || '请求失败')
            return
          }
          this.data = data
          let arr = []
          if (flag) {
            arr = [...this.dataInfo, ...data.data]
          } else {
            if (search) {
              arr = data.data
            } else {
              arr = this.dataInfo
            }
          }
          this.dataInfo = arr
          this.$toast.clear()
          this.isLoading = false
          this.loadFlag = false
        })
      },
      jump(customerId) {
        if (this.loadFlag) {
          return
        }
        this.$router.push({
          path: '/pageMain/operational-list',
          query: {
            customerId: customerId,
            isHeader: true
          }
        })
      },
      filterData() {
        this.params.page = 1
        this.params.customerName = this.filterVal
        this._getDataInfo(false, true)
      },
      onCancel_sheet() {},
      onSelect_sheet(item) {
        this.params.repaymentStatus = item.value
        this.params.page = 1
        this._getDataInfo(false, true)
        this.repaySheet_flag = false
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .state_select-wrap {
    padding: 15px 20px 6px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;

    &:first-child {
      margin-top: 20px;
    }

    .itemDetail {
      width: 60%;

      .van-cell {

        .van-cell__title,
        .van-cell__value {
          flex: none;
          font-size: 28px;
          color: #303030;
          width: 200px;
          height: 30px;
          line-height: 30px;
          text-align: left;
        }

        .van-cell__title {
          width: 120px;
          font-size: 28px;
          color: #303030;
        }
      }

      .c9c.van-cell {
        .van-cell__title {
          color: #9c9c9c;
        }
      }
    }

    .signStatus,
    .auditResult {
      height: 96px;
      width: 96px;
      border-radius: 50%;
      transform: rotate(-40deg);
      border: 6px solid #24b870;

      span {
        display: block;
        font-size: 28px;
        color: #24b870;
        text-align: center;
        padding: 10px 20px;
      }
    }

    .status2,
    .status {
      height: 96px;
      width: 96px;
      border-radius: 50%;
      transform: rotate(-40deg);
      border: 6px solid #24b870;

      span {
        display: block;
        font-size: 28px;
        color: #24b870;
        text-align: center;
        height: 96px;
        line-height: 96px;
      }
    }

    .err.status2 {
      border: 6px solid #ff1a1a;

      span {
        color: #ff1a1a;
      }
    }

    .signStatus.signStatus0 {
      border: 6px solid #ff1a1a;

      span {
        color: #ff1a1a;
      }
    }

    .auditResult.auditResult2 {
      border: 6px solid #ff1a1a;

      span {
        color: #ff1a1a;
      }
    }

    .status2.err {
      border: 6px solid #ff1a1a;

      span {
        color: #ff1a1a;
      }
    }
  }

  .filter-input_body {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 700px;
    height: 80px;
    margin: 0 auto 8px;
    padding: 32px 0 0;
    justify-content: row;

    img {
      width: 48px;
      height: 48px;
    }

    .filter-input {
      box-shadow: 0px 0px 40px 0px #E7E7E7;
      position: relative;
      width: 550px;
      margin: 0 auto;
      border-radius: 40px;
      height: 80px;
      margin: 0;

      .van-cell.van-field {
        width: 100%;
        height: 80px;
        z-index: 9;
        border-radius: 44px;
        background: url(../../../static/img/pre_search.png) 480px center / 38px 36px no-repeat;
        background-color: rgba(255, 255, 255, 1);
        padding: 0 0 0 20px;
        line-height: 80px;

        .van-field__body {
          width: 100%;
          padding: 0 20px;

          .van-field__control::-webkit-input-placeholder {
            color: rgba(156, 156, 156, 1);
            font-size: 28px;
          }

          .van-icon-clear {
            font-size: 30px;
          }
        }

        .van-field__control {
          height: 80px;
          line-height: 80px;
          padding-left: 20px;
          font-size: 24px;
        }

        .van-icon-clear {
          font-size: 38px;
          color: #ccc;
          right: 120px;
        }
      }

      .van-button {
        position: absolute;
        top: 2px;
        right: 0px;
        width: 100px;
        height: 80px;
        z-index: 9;
        opacity: 0;
      }
    }
  }

  .screen {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #333333;
    font-size: 28px;
    margin-left: 20px;

    span {
      margin-right: 14px;
    }
  }
</style>
