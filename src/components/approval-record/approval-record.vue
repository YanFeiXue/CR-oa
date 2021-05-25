<template>
  <section class="approval-record appView" id="leftToDom">
    <van-header :title="title" :routeName="'/viewMain'"></van-header>
    <div class="filter-input_body">
      <div class="filter-input">
        <van-field v-model="filterVal" ref="filterVal" @click="focusThis('filterVal')" placeholder="请输入客户姓名" />
        <van-button type="default" @click="filterData()">查询</van-button>
      </div>
      <img src="../../../static/img/shanxuan.png" />
    </div>
    <div class="wrapper" ref="wrapper">
      <ul v-if="allTask.length">
        <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
          ref="loadmore">
          <div class="state_select-wrap" v-for="(item, index) in allTask" :key="index">
            <div class="itemDetail">
              <div>
                <span class="name">{{item.realName}}</span><span class="phone">{{item.mobile}}</span>
              </div>
              <div class="dealerName">{{item.dealerName}}</div>
              <div class="time">{{item.auditTime}}</div>
            </div>
            <div class="signStatus" v-if="item.signStatus == 1">
              <img src="../../../static/img/signning.png" />
            </div>
            <div class="signStatus" v-if="item.signStatus == 2">
              <img src="../../../static/img/signSuccess.png" />
            </div>
            <div class="auditResult" v-if="item.auditResult == 1">
              <img src="../../../static/img/signPass.png" />
            </div>
            <div class="copyLink" v-if="item.auditResult == 0 || item.signStatus == 1" @click="copyUrl(item)">复制链接</div>
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
    Button,
    Field
  } from 'vant'
  Vue.use(Cell).use(Button).use(Field)
  import {
    getPreAudits,
    getSignUrl
  } from '../../api/api'
  import Header from '../../base/Header'
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import {
    loadMore
  } from '../../common/js/mixin'
  export default {
    name: 'approvalRecord',
    mixins: [loadMore],
    components: {
      'van-header': Header
    },
    data() {
      return {
        title: '预审批结果',
        filterVal: '',
        isLoading: false,
        isDISABLED: true,
        allTask: [],
        customerName: '',
        params: {
          realName: '',
          certNo: '',
          mobile: '',
          tokenId: sessionStorage.getItem('tokenid'),
          auditResult: '',
          startDate: '',
          endDate: '',
          dealerId: '',
          signStatus: '',
          page: 1,
          size: 10
        },
        allLoaded: false,
        contentH: 0,
        list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    },
    computed: {
      ...mapGetters(['interfaceList'])
    },
    watch: {
      filterVal(newVal, oldVal) {
        if (newVal == '') {
          this.filterData()
        }
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.contentH = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
      })
    },
    methods: {
      _getDataInfo(flag, search) {
        getPreAudits(this.params).then(data => {
          if (data.code != 200) {
            this.$toast.fail(data.msg)
            return
          }
          this.data = data.data
          let arr = []
          if (flag) {
            arr = [...this.allTask, ...data.data.list]
          } else {
            if (search) {
              arr = data.data.list
            } else {
              arr = this.allTask
            }
          }
          this.allTask = arr
          this.loadFlag = false
        })
      },
      copyUrl(item){
        getSignUrl({tranNo: item.tranNo}).then(res => {
          console.log(res);
        })
      },
      focusThis(id) {
        this.$refs[id].focus()
      },
      isNull() {
        if (this.filterVal == '') {
          this.params.realName = this.filterVal
          this.params.page = 1
          this._getDataInfo(true, true)
        }
      },
      filterData() {
        this.params.realName = this.filterVal
        this.params.page = 1
        this._getDataInfo(false, true)
      },
      onRefresh() {
        this.params.page++
        if (
          this.params.page * 10 >=
          this.formatInt(this.data.total, 1, true) + 1
        ) {
          this._getDataInfo(true, false)
        } else {
          this._getDataInfo(false, false)
        }
        setTimeout(() => {
          setTimeout(() => {
            this.$toast.clear()
          }, 500)
          this.isLoading = false
        }, 800)
      },
      formatInt(num, prec = 2, ceil = true) {
        const len = String(num).length
        if (len <= prec) {
          return num
        }

        const mult = Math.pow(10, prec)
        return ceil ? Math.ceil(num / mult) * mult : Math.floor(num / mult) * mult
      },
      scrollToEnd(data) {
        this.isDISABLED = !data
      },
      ...mapMutations({
        setInterface: 'SET_INTERFACE'
      })
    }
  }
</script>

<style lang="less" scoped="scoped">
  .approval-record {
    .van-cell::after {
      border: none;
    }
  }

  .filter-input_body {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 680px;
    height: 80px;
    margin: 32px auto 8px;
    justify-content: space-between;

    img {
      width: 48px;
      height: 48px;
    }

    .filter-input {
      box-shadow: 0px 0px 40px 0px #E7E7E7;
      position: relative;
      width: 600px;
      margin: 0 auto;
      border-radius: 40px;
      height: 80px;
      margin: 0;

      .van-cell.van-field {
        width: 100%;
        height: 80px;
        z-index: 9;
        border-radius: 44px;
        background: url(../../../static/img/pre_search.png) 530px center / 38px 36px no-repeat;
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


  .wrapper {
    height: 100%;
  }

  .state_select-wrap {
    padding: 32px 24px 32px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 40px 0px #E7E7E7;
    width: 702px;
    height: 226px;
    box-sizing: border-box;
    border-radius: 24px;
    margin: 20px auto 0;

    .itemDetail {
      width: 60%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .name{
        color: #333333;
        font-size: 36px;
        font-weight: bold;
        width: 150px;
        margin: 0 15px 0 0;
      }
      .phone{
        color: #333333;
        font-size: 30px;
        font-weight: bold;
      }
      .dealerName{
        color: #7B7B7B;
        font-size: 28px;
        margin: 16px 0;
      }
      .time{
        color: #B2B2B2;
        font-size: 28px;
      }
    }
    .signStatus, .auditResult{
      img{
        width: 106px;
        height: 96px;
      }
    }
    .copyLink{
      width: 112px;
      height: 52px;
      line-height: 52px;
      background: #22A78E;
      border-radius: 30px;
      font-size: 20px;
      color: #FFFFFF;
      text-align: center;
    }
  }


</style>
