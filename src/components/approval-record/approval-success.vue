<template>
  <section class="approval-success appView" id="leftToDom">
    <van-header :title="title"></van-header>
    <div class="filter-input">
      <van-field v-model="filterVal" ref="filterVal" @click="focusThis('filterVal')" placeholder="请输入申请人姓名" />
      <van-button slot="button" type="default" @click="filterData()">查询</van-button>
    </div>
    <div class="wrapper" ref="wrapper">
      <ul v-if="dataInfo.length">
        <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
          ref="loadmore">
          <section v-if="dataInfo.length" class>
            <div class="approvalSuccess-wrap" v-for="(item, index) in dataInfo" :key="index">
              <div class="itemDetail">
                <van-cell :title="item.realName" :value="item.mobile || '-'"></van-cell>
                <div class="choseProduct">
                  <span>选择产品:</span>
                  <span :class="`selectedValue${index}`"
                    @click="selectProduct(index, item.leaseId)">{{ item.productName || "请选择" }}</span>
                </div>
              </div>
              <van-button type="primary" @click="jump_selected(index, item.isRecord)">
                {{ item.isRecord == 1 ? "继续进件" : "进件" }}</van-button>
            </div>
          </section>
        </mt-loadmore>
      </ul>
      <van-details v-else></van-details>
    </div>
    <van-action-sheet v-model="productList_flag" cancel-text="取消" :actions="productList" @cancel="onCancel_product"
      @select="onSelect_product" />
  </section>
</template>

<script>
  import Vue from 'vue'
  import {
    Cell,
    Field,
    ActionSheet,
    Popup
  } from 'vant'

  Vue.use(Cell)
    .use(Field)
    .use(ActionSheet)
    .use(Popup)
  import {
    getProductListByTokenid,
    getPreAuditCustomers,
    resetLeaseEntity
  } from '../../api/api'
  import Header from '@/base/Header/Header'
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import {
    loadMore
  } from '@/common/js/mixin'
  export default {
    name: 'approvalSuccess',
    mixins: [loadMore],
    components: {
      'van-header': Header
    },
    data() {
      return {
        title: '进件申请',
        filterVal: '',
        isLoading: true,
        isDISABLED: true,
        productList: [],
        productList_flag: false,
        checkedList: {},
        params: {
          tokenId: sessionStorage.getItem('tokenid'),
          page: '1',
          size: '10',
          customerName: '',
          mobile: ''
        },
        dataInfo: [],
        customerName: ''
      }
    },
    computed: {
      ...mapGetters(['incomeList'])
    },
    watch: {
      filterVal(newVal, oldVal) {
        if (newVal == '') {
          this.params.page = 1
          this.params.customerName = newVal
          this._getDataInfo(false, true)
        }
      }
    },
    created() {
      this.isVuex()
    },
    mounted() {},
    methods: {
      filterData() {
        this.params.page = 1
        this.params.customerName = this.filterVal
        this._getDataInfo(false, true)
      },
      selectProduct(index, leaseId) {
        if (!this.productList.length) {
          this.$toast.fail('您没有开通的产品!')
          return
        }
        this.productList_flag = true
        this._index = index
        this.leaseId = leaseId
      },
      _getProductListByTokenid() {
        getProductListByTokenid({
          productId: '0',
          tokenId: sessionStorage.getItem('tokenid')
        }).then(res => {
          if (res.code != 0) {
            this.$toast.fail('查询产品失败')
            return
          }
          this.productList = res.data
        })
      },
      _getDataInfo(flag, search) {
        this.$toast.loading({
          mask: false,
          message: '加载中...'
        })
        getPreAuditCustomers(this.params).then(data => {
          if (data.code != 0) {
            return
          }
          if (data.data) this.data = data.data
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
      isVuex() {
        this._getProductListByTokenid()
      },
      jump_selected(_index, isRecord) {
        if (this.loadFlag) {
          return
        }
        let _dom = document.querySelector(`.selectedValue${_index}`)
        if (_dom.innerText == '请选择') {
          this.$toast.fail('请先选择产品')
          return
        }

        let selectedParams = this.dataInfo[_index]
        let item = this.checkedList[_index]
        let queryParams = {}
        if (isRecord == 1) {
          queryParams = {
            path: 'uploadFile_ocr',
            query: {
              certNo: selectedParams.certNo,
              leaseId: selectedParams.leaseId,
              productCode: selectedParams.productCode,
              productId: selectedParams.productId,
              incoming: 'true',
              eId: selectedParams.eId,
              realName: selectedParams.realName,
              productVersion: selectedParams.productVersion
            }
          }
        } else {
          queryParams = {
            path: 'uploadFile_ocr',
            query: {
              isIncoming: true,
              eId: selectedParams.eId,
              productCode: item.code,
              productVersion: item.version,
              productId: item.id,
              certNo: selectedParams.certNo,
              realName: selectedParams.realName
            }
          }
        }
        //this.initData()
        this.$toast.loading({
          mask: false,
          message: '加载中...'
        })
        setTimeout(() => {
          this.$toast.clear()
          this.$router.push(queryParams)
        }, 500)
      },
      _resetLeaseEntity(item) {
        let oldParams = this.dataInfo[this._index]
        const resetParams = {
          leaseId: this.leaseId,
          productId: item.id,
          productVersion: item.version,
          productIdOld: oldParams.productId,
          productVersionOld: oldParams.productVersion,
          expiresId: item.expiresId
        }
        resetLeaseEntity(resetParams).then(res => {
          this.productList_flag = false
          if (res.code != 0) {
            this.$toast.fail(res.msg)
            return
          }
          this._getDataInfo(false, true)
          this.$toast.success(res.msg)
        })
      },
      resetProduct(item) {
        this.$dialog
          .confirm({
            title: '提示',
            message: '确定重置产品吗?'
          })
          .then(() => {
            this._resetLeaseEntity(item)
          })
          .catch(() => {
            this.productList_flag = false
          })
      },

      onCancel_product() {},
      onSelect_product(item) {
        if (this.leaseId == '') {
          this.setDom(item)
        } else {
          this.resetProduct(item)
        }
      },
      setDom(item) {
        const _index = this._index
        const queryDom = `.selectedValue${_index}`
        let _dom = document.querySelector(queryDom)
        _dom.innerHTML = item.name
        this.productList_flag = false
        this.checkedList[_index] = item
      },
      ...mapMutations({
        setIncomeList: 'SET_INCOMELIST',
        setProduct: 'SET_PRODUCT'
      })
    }
  }
</script>

<style lang="less">
  .approval-success {
    .approvalSuccess-wrap {
      padding: 5px 25px;
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
        padding: 10px 0;

        .van-cell {
          padding-left: 0;

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

        .van-cell:not(:last-child)::after {
          border: none;
        }
      }

      .choseProduct {
        padding: 5px 0;

        span {
          width: 120px;
          display: inline-block;
        }

        span:last-child {
          width: auto;
          color: rgba(34, 167, 142, 1);
        }
      }

      .van-button {
        width: 180px;
        height: 64px;
        background: rgba(34, 167, 142, 1);
        border-radius: 14px;
        border: 2px solid rgba(34, 167, 142, 1);
        font-size: 24px;
      }
    }
  }
</style>
