<template>
  <section class="filed-state">
    <div class="filter-input_body">
      <div class="filter-input">
        <van-field v-model="filterVal" ref="filterVal" @click="focusThis('filterVal')" placeholder="请输入客户姓名" />
        <van-button type="default" @click="filterData()">查询</van-button>
      </div>
      <div class="screen">
        <span>筛选</span>
        <img src="../../../../static/img/shanxuan.png" />
      </div>
    </div>
    <div class="wrapper" ref="wrapper">
      <ul v-if="dataInfo.length">
        <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
          ref="loadmore">
          <div class="state_select-wrap" v-for="(item, index) in dataInfo" :key="index" @click="jump(item.leaseId)">
            <p class="item_name">{{item.customerName}}</p>
            <p class="item_dealer">{{item.dealerName}}</p>
            <p class="item_status">{{item.processStatus}}</p>
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
    Cell,
    Field,
    ActionSheet
  } from 'vant'
  Vue.use(Cell).use(Field).use(ActionSheet)
  import {
    getFileReturnCustomers
  } from '../../../api/api'
  import {
    loadMore
  } from '../../../common/js/mixin'
  export default {
    name: 'filedState',
    mixins: [loadMore],
    data() {
      return {
        title: '',
        active: 2,
        activeNames: [],
        dataInfo: [],
        isLoading: false,
        isDISABLED: true,
        filterVal: '',
        filedSheet_flag: false,
        leaseId: '',
        option: [{
            value: 0,
            name: '全部'
          },
          {
            value: 1,
            name: '已归档'
          },
          {
            value: 2,
            name: '归档中'
          },
          {
            value: 3,
            name: '已超时'
          }
        ],
        params: {
          tokenId: sessionStorage.getItem('tokenid'),
          page: '1',
          size: '10',
          processId: 3, //0-全部、1-已归档、2-归档中、3-已超时
          customerName: '',
          mobile: ''
        },
        data: {
          total: 0
        }
      }
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
    computed: {},
    methods: {
      _getDataInfo(flag, search) {
        this.$toast.loading({
          mask: false,
          message: '加载中...'
        })
        getFileReturnCustomers(this.params).then(data => {
          if (data.code != 0) {
            return
          }
          this.data = data.data
          let arr = []
          if (flag) {
            arr = [...this.dataInfo, ...data.data.list]
          } else {
            if (search) {
              arr = data.data.list
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
      formatStatusText(text) {
        if (text == '资料归档中') {
          return '归档中'
        }
        return text
      },
      jump(leaseId) {
        if (this.loadFlag) {
          return
        }
        this.$router.push({
          path: '/pageMain/operational-list',
          query: {
            leaseId: leaseId,
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
        this.filedSheet_flag = false
        this.params.page = 1
        this.params.processId = item.value
        this._getDataInfo(false, true)
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
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
        background: url(../../../../static/img/pre_search.png) 480px center / 38px 36px no-repeat;
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

  .filed-state {
    .van-pull-refresh {
      height: 76vh;
    }

    .state_select-wrap {
      width: 686px;
      height: 104px;
      background: #FFFFFF;
      box-shadow: 0px 0px 40px 0px rgba(231,231,231,1);
      border-radius: 16px;
      margin: 24px auto 0;
      box-sizing: border-box;
      padding: 30px 26px 30px 32px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      color: #333333;
      .item_name{
        font-size: 32px;
        font-weight: bold;
        width: 100px;
      }
      .item_dealer{
        font-size: 28px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        width: 336px;
      }
      .item_status{
        font-size: 28px;
        color: #0D88FF;
      }
    }
  }
</style>
