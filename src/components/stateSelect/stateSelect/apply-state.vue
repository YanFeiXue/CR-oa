<template>
  <section class="apply-state">
    <div class="filter-input_body">
      <div class="filter-input">
        <van-field v-model="filterVal" ref="filterVal" @click="focusThis('filterVal')" placeholder="请输入客户姓名" />
        <van-button type="default" @click="filterData()">查询</van-button>
      </div>
      <div class="screen" @click="applySheet_flag = true">
        <span>筛选</span>
        <img src="../../../../static/img/shanxuan.png" />
      </div>
    </div>
    <van-action-sheet v-model="applySheet_flag" :actions="option" cancel-text="取消" @cancel="onCancel_sheet"
      @select="onSelect_sheet" />

    <div class="wrapper" ref="wrapper">
      <ul v-if="dataInfo.length">
        <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
          ref="loadmore">
          <div class="list_item" v-for="(item, index) in dataInfo" :key="index" @click="routerPath(item)">
            <div class="item_line">
              <p class="name">{{item.customerName}}</p>
              <p class="cancal">{{item.processStatus}}</p>
            </div>
            <div class="item_line_two">
              <p class="approved_amount">核批金额：</p>
              <p class="amount">{{item.replyAmount}}</p>
            </div>
            <div class="item_line_three">
              <p class="product_name">产品名称：</p>
              <p class="product">{{item.productName}}</p>
            </div>
            <div class="item_line_three">
              <p class="product_name">经销商名称：</p>
              <p class="product">{{item.dealerName}}</p>
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
    Cell,
    Field,
    ActionSheet
  } from 'vant'
  Vue.use(Cell)
    .use(Field)
    .use(ActionSheet)
  import {
    getOrderList
  } from '../../../api/api'
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import {
    loadMore
  } from '../../../common/js/mixin'
  export default {
    name: 'applyState',
    mixins: [loadMore],
    data() {
      return {
        title: '',
        filterVal: '',
        isLoading: false,
        isDISABLED: true,
        active: 2,
        activeNames: [],
        dataInfo: [],
        customerName: '',
        applySheet_flag: false,
        detailsFlag: false,
        applySheet_flag: false,
        option: [{
            value: 0,
            name: '全部'
          },
          {
            value: 1,
            name: '新申请'
          },
          {
            value: 2,
            name: '退回待提交'
          },
          {
            value: 3,
            name: '初审'
          },
          {
            value: 4,
            name: '信审'
          },
          {
            value: 5,
            name: '终审'
          },
          {
            value: 6,
            name: '签约准备'
          },
          {
            value: 7,
            name: '等待GPS安装'
          },
          {
            value: 8,
            name: '放款资料待提交'
          },
          {
            value: 9,
            name: '放款资料审核'
          },
          {
            value: 10,
            name: '放款'
          },
          {
            value: 11,
            name: '资料回寄'
          },
          {
            value: 12,
            name: '资料归档'
          },
          {
            value: 13,
            name: '归档'
          },
          {
            value: 14,
            name: '拒绝'
          },
          {
            value: 15,
            name: '取消'
          },
          {
            value: 16,
            name: '保险审核'
          },
          {
            value: 19,
            name: '经销商放款确认'
          },
          {
            value: 17,
            name: '总审'
          }
        ],
        params: {
          applyNo: '', //申请编号
          customerName: '', //申请人
          operator: '', //操作人
          capitalId: [],
          statusId: '', //流程状态
          processId: '2', // 3
          productId: '', // []
          page: 1,
          size: 10,
          productVersion: '',
          dealerName: '', //经销商new Date()
          startTime: new Date((new Date().getFullYear()) + '-' + (new Date().getMonth() - 1) + '-' + 1),
          endTime: new Date((new Date().getFullYear()) + '-' + (new Date().getMonth() + 2) + '-' + 0),
          tokenId: sessionStorage.getItem('tokenid')
        },
        data: {
          total: 0
        }
      }
    },
    computed: {
      ...mapGetters(['stateList'])
    },
    created() {
      this.isVuex()
    },
    mounted() {},
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
      routerPath(item) {
        this.setProduct({
          productVersion: item.productVersion,
          productCode: item.productCode,
          productId: item.productId
        })
        this.$router.push({
          path: '/pageMain/operational-list',
          query: {
            isHeader: '申请状态',
            leaseId: item.leaseId,
            capitalId: item.capitalId,
            productCode: item.productCode
          }
        })
      },
      _getDataInfo(flag, search) {
        this.$toast.loading({
          mask: false,
          message: '加载中...'
        })
        if (this.isXrtxUser()) {
          // xrtxGetProcessList(this.params).then(data => {
          //   this.getProcessCallback(flag, data, search)
          // })
        } else {
          getOrderList(this.params).then(data => {
            this.getProcessCallback(flag, data, search)
          })
        }
      },
      isXrtxUser() {
        if (localStorage.getItem('isXrtx') == 'true') {
          return true
        }
        return false
      },
      isVuex() {
        this.params.endTime = this.confirmPicker(new Date())
        this.params.startTime = this.confirmPicker(
          new Date(new Date() - 61 * 24 * 3600 * 1000)
        )
        this.data.total = 0
      },
      getProcessCallback(flag, data, search) {
        if (data.code != 0) {
          this.$toast.fail(data.msg || '请求失败')
          return
        }
        this.data = data.data.records
        let arr = []
        if (flag) {
          arr = [...this.dataInfo, ...data.data.records]
        } else {
          if (search) {
            arr = data.data.records
          } else {
            arr = this.dataInfo
          }
        }
        this.dataInfo = arr
        this.$toast.clear()
        this.isLoading = false
        this.loadFlag = false
      },
      jump(item) {
        if (this.loadFlag) {
          return
        }
        this.$router.push({
          path: '/pageMain/operational-list',
          query: {
            leaseId: item.id,
            isHeader: true
          }
        })
      },
      confirmPicker(value) {
        // 确定按钮，时间格式化并显示在页面上
        var date = value
        var m = date.getMonth() + 1
        var d = date.getDate()
        if (m >= 1 && m <= 9) {
          m = '0' + m
        }
        if (d >= 0 && d <= 9) {
          d = '0' + d
        }
        var timer = date.getFullYear() + '-' + m + '-' + d
        return timer
      },
      filterData() {
        this.params.page = 1
        this.params.customerName = this.filterVal
        this._getDataInfo(false, true)
      },
      onCancel_sheet() {},
      onSelect_sheet(item) {
        this.applySheet_flag = false
        this.params.page = 1
        this.params.statusId = item.value
        this._getDataInfo(false, true)
      },
      ...mapMutations({
        setIncomeList: 'SET_INCOMELIST',
        setProduct: 'SET_PRODUCT',
        setStateList: 'SET_STATELIST'
      })
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
      /deep/{
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
              font-size: 30px;
              font-family: PingFangSC-Regular;
            }
          }

          .van-field__control {
            height: 80px;
            line-height: 80px;
            padding-left: 20px;
            font-size: 30px;
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
  }

  .apply-state {
    background: #f4f4f4;

    .van-pull-refresh {
      height: calc(100vh - 318px);
    }

    .list_item {
      width: 702px;
      height: 300px;
      box-sizing: border-box;
      padding: 32px;
      background: #FFFFFF;
      box-shadow: 0px 0px 40px 0px #E7E7E7;
      border-radius: 24px;
      margin: 20px auto 0;

      .item_line {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 50px;

        .name {
          font-size: 36px;
          color: #333333;
          font-weight: bold;
          font-family: PingFangSC-Medium;
        }

        .cancal {
          font-size: 26px;
          color: #0D88FF;
          font-family: PingFangSC-Regular;
        }
      }

      .item_line_two {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 20px 0;
        height: 40px;

        .approved_amount {
          font-size: 28px;
          color: #666666;
          font-family: PingFangSC-Regular;
        }

        .amount {
          font-size: 30px;
          font-weight: bold;
          color: #333333;
          font-family: DIN-Bold;
        }
      }

      .item_line_three {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 20px 0;
        height: 40px;

        .product_name {
          font-size: 28px;
          color: #666666;
          font-family: PingFangSC-Regular;
        }

        .product {
          width: 430px;
          font-size: 30px;
          color: #333333;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-align: right;
          font-family: PingFangSC-Medium;
        }
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
      font-size: PingFangSC-Regular;
    }
  }

  /deep/ {
    .van-popup--bottom.van-action-sheet {
      max-height: 600px;
      overflow-y: scroll;
      border-radius: 40px 40px 0 0;

      .van-action-sheet__item {
        height: 80px;
        font-size: 28px;
        background: none;
        border-bottom: 1px solid #ededed;
      }

      .van-action-sheet__item:first-child {
        border-radius: 40px 40px 0 0;
      }

      .van-action-sheet__cancel {
        font-size: 30px;
        line-height: 70px;
      }
    }
  }
</style>
