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
    <van-action-sheet v-model="applySheet_flag" cancel-text="取消" :actions="option" @cancel="onCancel_sheet"
      @select="onSelect_sheet" />

    <div class="wrapper" ref="wrapper">
      <ul v-if="dataInfo.length">
        <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
          ref="loadmore">
          <div class="apply_state-wrap">
            <div class="apply_state-item" v-for="(item, index) in dataInfo" :key="index" @click="jump(item)">
              <van-cell class="item_title" :title="item.customerName" :value="item.status"></van-cell>
              <van-cell title="代理商:" :value="item.dealerName"></van-cell>
              <van-cell title="核批金额:" :value="item.replyAmount"></van-cell>
              <van-cell title="产品名称:" :value="item.productName"></van-cell>
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
    getProcessList,
    xrtxGetProcessList
  } from '@/api/api'
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import {
    loadMore
  } from '@/common/js/mixin'
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
        option: [{
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
          processStatus: [], //流程状态
          processId: '3', // 3
          productId: '', // []
          page: 1,
          productVersion: '',
          dealerName: '', //经销商new Date()
          startTime: '2019-07-12',
          endTime: '2019-09-12',
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
      _getDataInfo(flag, search) {
        this.$toast.loading({
          mask: false,
          message: '加载中...'
        })
        if (this.isXrtxUser()) {
          xrtxGetProcessList(this.params).then(data => {
            this.getProcessCallback(flag, data, search)
          })
        } else {
          getProcessList(this.params).then(data => {
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
        this.params.processStatus = []
        this.applySheet_flag = false
        this.params.page = 1
        this.params.processStatus.push(item.value)
        this._getDataInfo(false, true)
      },
      ...mapMutations({
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

    .apply_state-wrap {
      width: 100%;

      .apply_state-item {
        padding: 8px 30px;
        font-size: 28px;
        background: #fff;
        margin-top: 20px;

        .van-cell {
          font-size: 28px;
          padding: 10px 5px;

          .van-cell__title {
            color: rgba(156, 156, 156, 1);
            width: 100px;

            span {
              width: 100px;
            }
          }

          .van-cell__value {
            font-size: 26px;
            color: rgba(48, 48, 48, 1);
          }
        }

        .item_title.van-cell {
          height: 80px;
          position: relative;
          bottom: 10px;

          .van-cell__title {
            color: rgba(48, 48, 48, 1);
            line-height: 60px;
          }

          .van-cell__value {
            font-size: 28px;
            color: #22a78e;
            line-height: 60px;
          }
        }

        .item_title.van-cell:not(:last-child)::after {
          border-bottom: 2px solid #ebedf0;
        }

        .van-cell:not(:last-child)::after {
          border: none;
        }
      }
    }
  }
</style>
