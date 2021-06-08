<template>
  <section class="approval-record">
    <van-header title="预审批记录" routeName="back" path="-1"></van-header>
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
            <div>
              <div class="signStatus">
                <img :src="getSignStatus(item.signStatus)" />
              </div>
            </div>
            <div v-if="item.auditResult != 0 && item.signStatus != 1">
              <div class="auditResult" @click="showAuditResultDialog(item)">
                <img :src="getAuditResult(item.auditResult)" />
              </div>
            </div>
            <div class="copyLink" v-if="item.auditResult == 0 && item.signStatus == 1" @click="copyUrl(item)">复制链接</div>
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
    getSignUrl,
    getLimitsOfAuthority
  } from '../../api/api'
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
    data() {
      return {
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
        autorejectReasonVisibleFlag: false
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
      this.getLimitsOfAuthority()
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
          if (res.code != 200) {
            return this.$toast.fail(res.msg)
          }
          var save = function(e) {
            e.clipboardData.setData('text/plain', res.data)
            e.preventDefault()
          }
          document.addEventListener('copy', save)
          document.execCommand('copy')
          document.removeEventListener('copy', save)
          this.$toast.success('复制成功')
        })
      },
      focusThis(id) {
        this.$refs[id].focus()
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
      showAuditResultDialog(item){
        if (['2', '5'].includes(item.auditResult) && this.autorejectReasonVisible){
          this.$dialog.alert({
            message: item.rejectReason
          })
        }
      },
      getLimitsOfAuthority(){
        getLimitsOfAuthority({
          tokenId: sessionStorage.getItem('tokenid')
        }).then(res => {
          this.autorejectReasonVisibleFlag = data.contains('autorejectReasonVisible')
        })
      },
      getAuditResult(auditResult){
        switch (auditResult){
          case 0:
          case '0':
            return '../../../static/img/signWait.png'
            break;
          case 1:
          case '1':
            return '../../../static/img/signPass.png'
            break;
          case 2:
          case '2':
            return '../../../static/img/underScoring.png'
            break;
          case 3:
          case '3':
            return '../../../static/img/signThird.png'
            break;
          case 4:
          case '4':
            return '../../../static/img/signCredit.png'
            break;
          case 5:
          case '5':
            return '../../../static/img/noneResult.png'
            break;
          default:
            break;
        }
      },
      getSignStatus(signStatus){
        switch (signStatus){
          case 0:
          case '0':
            return '../../../static/img/signFail.png'
            break;
          case 1:
          case '1':
            return '../../../static/img/signning.png'
            break;
          case 2:
          case '2':
            return '../../../static/img/signSuccess.png'
            break;
          default:
            break;
        }
      },
      ...mapMutations({
        setInterface: 'SET_INTERFACE'
      })
    }
  }
</script>

<style lang="scss" scoped="scoped">
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
      /deep/{
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
              font-family: PingFangSC-Regular;
            }
          }
          .van-field__control {
            height: 80px;
            line-height: 80px;
            padding-left: 20px;
            font-size: 28px;
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
        font-family: PingFangSC-Medium;
      }
      .phone{
        color: #333333;
        font-size: 30px;
        font-weight: bold;
        font-family: DIN-Bold;
      }
      .dealerName{
        color: #7B7B7B;
        font-size: 28px;
        margin: 16px 0;
        display: -webkit-box; /*值必须为-webkit-box或者-webkit-inline-box*/
        -webkit-box-orient: vertical; /*值必须为vertical*/
        -webkit-line-clamp: 1; /*值为数字，表示一共显示几行*/
        overflow: hidden;
        font-family: PingFangSC-Regular;
      }
      .time{
        color: #B2B2B2;
        font-size: 28px;
        font-family: PingFangSC-Regular;
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
      font-family: PingFangSC-Medium;
    }
  }


</style>
