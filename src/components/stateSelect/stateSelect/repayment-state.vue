<template>
  <section class="repayment-state">
    <div class="filter-input_body">
      <div class="filter-input">
        <van-field v-model="filterVal" ref="filterVal" @click="focusThis('filterVal')" placeholder="请输入客户姓名" />
        <van-button type="default" @click="filterData()">查询</van-button>
      </div>
      <div class="screen" @click="repaySheet_flag = true">
        <span>筛选</span>
        <img src="../../../../static/img/shanxuan.png" />
      </div>
    </div>
    <van-action-sheet v-model="repaySheet_flag" :actions="option" cancel-text="取消" @cancel="onCancel_sheet"
      @select="onSelect_sheet" />

    <div class="wrapper" ref="wrapper">
      <ul v-if="dataInfo.length">
        <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
          ref="loadmore">
          <div class="list_item" v-for="(item, index) in dataInfo" :key="index" @click="routerPath(item)">
            <div class="item_line">
              <p class="name">{{item.name}}</p>
              <p :class="item.static == 1 ? 'cancal' : 'cancal_static'">{{item.static == 1 ? '逾期' : '正常'}}</p>
            </div>
            <div class="item_line_two">
              <p class="approved_amount">产品编号：</p>
              <p class="amount">{{item.number}}</p>
            </div>
            <div class="item_line_three">
              <p class="product_name">公司名称：</p>
              <p class="product">{{item.cname}}</p>
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
  } from '../../../api/api'
  import {
    loadMore
  } from '../../../common/js/mixin'
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
            value: 0,
            name: '全部'
          },
          {
            value: 1,
            name: '正常'
          },
          {
            value: 2,
            name: '逾期'
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
  .list_item{
    width: 702px;
    height: 234px;
    box-sizing: border-box;
    padding: 32px;
    background: #FFFFFF;
    box-shadow: 0px 0px 40px 0px #E7E7E7;
    border-radius: 24px;
    margin: 20px auto 0;

    .item_line{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      .name{
        color: #333333;
        font-weight: bold;
        font-size: 32px;
        font-family: PingFangSC-Medium;
      }
      .cancal{
        font-size: 28px;
        color: #E2231A;
        font-family: PingFangSC-Regular;
      }
      .cancal_static{
        font-size: 28px;
        color: #0D88FF;
        font-family: PingFangSC-Regular;
      }
    }

    .item_line_two{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0;
      height: 40px;
      .approved_amount{
        font-size: 28px;
        color: #666666;
        font-family: PingFangSC-Regular;
      }
      .amount{
        font-weight: bold;
        font-size: 28px;
        color: #333333;
        font-family: PingFangSC-Medium;
      }
    }
    .item_line_three{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0;
      height: 40px;
      .product_name{
        font-size: 28px;
        color: #666666;
        font-family: PingFangSC-Regular;
      }
      .product{
        font-size: 28px;
        color: #333333;
        font-weight: bold;
        font-family: PingFangSC-Medium;
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
