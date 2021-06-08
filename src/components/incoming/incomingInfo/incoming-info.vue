<template>
  <section class="incoming-info">
    <section class="incomeField_body">
      <header class="title">进件信息</header>
      <div class="incomeField">
        <van-field label="进件地区(省)" readonly placeholder="请选择省份" v-model="customerName.leaseProvinceIdName"
          name="leaseProvinceId"></van-field>
      </div>
      <div class="incomeField">
        <van-field label="进件地区(市)" readonly placeholder="请选择省份" v-model="customerName.leaseCityIdName"
          name="leaseCityId"></van-field>
      </div>
      <div class="incomeField" v-if="productDiff.directlyProductInput">
        <van-field label="商户信息" readonly placeholder="请选择商户" v-model="customerName.merchantIdName" name="merchantId">
        </van-field>
      </div>
      <div class="incomeField btNone pd2 borderRadiusBtlr">
        <van-field label="客户经理手机号" readonly placeholder="请输入" name="isMobile1" v-model="customerInfo.dealerMobile">
        </van-field>
      </div>
    </section>

    <section class="incomeField_body">
      <header class="title">承租人信息</header>
      <section class="incomeField">
        <van-field label="客户姓名" readonly placeholder="输入身份证号回显" v-model="customerInfo.customerName">
        </van-field>
      </section>
      <section class="incomeField pd2 snWrap">
        <van-field label="身份证号" readonly placeholder="请输入" v-model="customerInfo.customerCertno" name="idCard">
        </van-field>
      </section>
      <section class="incomeField" v-if="productDiff.snInput">
        <van-field label="苏宁核批金额" readonly placeholder="不需要填写" name="creditLimit" v-model="customerInfo.creditLimit">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field label="手机号" readonly placeholder="输入身份证号回显" v-model="customerInfo.customerMobile" name="isMobile">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field label="民族" readonly placeholder="请选择" v-model="customerName.nationIdName || '汉族'" name="nationId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field label="婚姻状态" readonly placeholder="请选择" v-model="customerName.customerMarryStatusIdName"
          name="customerMarryStatusId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field label="是否本地户籍" readonly placeholder="请选择" v-model="customerName.localDomicileIdName"
          name="localDomicileId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field label="流水银行卡号" readonly placeholder="请输入" v-model="customerInfo.flowBankCard" name="bankCard">
        </van-field>
      </section>
      <section class="incomeField" v-if="productDiff.directlyProductInput">
        <van-field label="常驻资料" readonly placeholder="请输入" v-model="customerName.residentInformationIdName"
          name="residentInformationId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field label="子女状况" readonly placeholder="请选择" v-model="customerName.spouseSunNumIdName"
          name="spouseSunNumId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field label="居住地址(省)" readonly placeholder="请选择" v-model="customerName.liveProvinceIdName"
          name="liveProvinceId"></van-field>
      </section>
      <section class="incomeField">
        <van-field label="居住地址(市)" readonly placeholder="请选择" v-model="customerName.liveCityIdName" name="liveCityId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field label="居住地址(区)" readonly placeholder="请选择" v-model="customerName.liveCountyIdName"
          name="liveCountyId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field label="居住详细地址" readonly placeholder="请输入" v-model="customerInfo.liveAddress" name="liveAddress">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field label="居住类型" readonly placeholder="请选择" v-model="customerName.liveTypeIdName" name="liveTypeId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field label="学历" readonly placeholder="请选择" v-model="customerName.customerEduIdName" name="customerEduId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field label="户籍地址(省)" readonly placeholder="请选择" v-model="customerName.homeProvinceIdName"
          name="homeProvinceId"></van-field>
      </section>
      <section class="incomeField">
        <van-field label="户籍地址(市)" readonly placeholder="请选择" v-model="customerName.homeCityIdName" name="homeCityId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field label="户籍地址(区)" readonly placeholder="请选择" v-model="customerName.homeCountyIdName"
          name="homeCountyId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field label="户籍详细地址" readonly placeholder="请输入" v-model="customerInfo.homeAddress" name="homeAddress">
        </van-field>
      </section>
      <section class="incomeField" v-if="productDiff.bqapInput">
        <van-field label="申请人家庭人数" readonly placeholder="请输入" v-model="customerInfo.familyTotal" name="familyTotal">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field label="有无担保人" readonly placeholder="请选择" v-model="customerName.weatherGuaranteeName"
          name="weatherGuarantee">
        </van-field>
      </section>
      <section class="incomeField btNone borderRadiusBtlr">
        <van-field label="有无共同承租人" readonly placeholder="请选择" v-model="customerName.weatherCotenantName"
          name="weatherCotenant"></van-field>
      </section>
    </section>
    <!-- 地址公用sheet -->
    <!-- <van-action-sheet v-model="province_show" cancel-text="取消" :actions="filterAreas" @select="onSelect_province" />
    <van-action-sheet v-model="city_show" cancel-text="取消" :actions="cityList" @select="onSelect_province" />
    <van-action-sheet v-model="county_show" cancel-text="取消" :actions="countyList" @select="onSelect_province" />
    <van-action-sheet v-model="public_show" cancel-text="取消" :actions="publicList" @select="onSelect_province" />
    <van-action-sheet v-model="leaseProv" cancel-text="取消" :actions="leaseProvList" @select="onSelect_leaseProv" />
    <van-popup v-model="startTimePop" label="身份证开始日期" round position="bottom" :overlay="true">
      <van-datetime-picker v-model="cardStartTime" confirm-button-text="确认" cancel-button-text="取消"
        @confirm="startTimePop = !startTimePop" @cancel="startTimePop = !startTimePop" @change="startChange()"
        type="date" :min-date="minDate" :max-date="maxDate" />
    </van-popup>
    <van-popup v-model="endTimePop" label="身份证结束日期" round position="bottom" :overlay="true">
      <van-datetime-picker v-model="cardEndTime" confirm-button-text="确认" cancel-button-text="取消"
        @confirm="endTimePop = !endTimePop" @cancel="endTimePop = !endTimePop" @change="endChange()" type="date"
        :min-date="minDate" :max-date="maxDate" />
    </van-popup> -->
    <!-- <van-button v-prevent-re-click round type="info" @click="leaseAddPage()">保存</van-button> -->
    <!-- 是否长期有效 -->
  </section>
</template>

<script>
  import Vue from 'vue'
  import {
    ActionSheet,
    Field,
    DatetimePicker,
    Popup
  } from 'vant'
  Vue.use(ActionSheet).use(Field).use(DatetimePicker).use(Popup)
  import {
    getPreAuditStatus,
    selectUsedCarDealerInfoBySoldId
  } from '@/api/api'

  import {
    leaseFormMixin
  } from '@/util/mixins'
  export default {
    name: 'incoming-info',
    mixins: [leaseFormMixin],
    data() {
      return {
        startTimePop: false,
        cardStartTime: new Date(),
        endTimePop: false,
        cardEndTime: new Date(),
        minDate: new Date(1990, 10, 1),
        maxDate: new Date(),
        merchantList: [],
        leaseProv: false,
        leaseProvList: [],
      }
    },
    created() {},
    mounted() {
      this.$nextTick(() => {
        this.$toast.loading({
          mask: false,
          message: '加载中...',
        })
        setTimeout(() => {
          this.isIncoming()
        }, 800)
      })
    },
    methods: {
      //初始化回显
      isIncoming() {
        if (this.isCheckLeaseForm == true) {
          this.customerInfo = this.yizhangtongForm.customerInfo
          this.setSessionData(JSON.parse(JSON.stringify(this.customerInfo)))
          for (let i in this.customerInfo) {
            this.formatEchoMsgById(i)
          }
          if (this.customerInfo.leaseProvinceId) {}
          // this.customerInfo.customerCertno = this.$route.query.certNo
          this.idCardBlur(this.customerInfo.customerCertno)
        }
      },
      onSelect_leaseProv(item) {
        this.leaseProv = false
        if (this.leaseCityFlag) {
          this.customerInfo.leaseCityId = item.id
          this.customerInfo.leaseCity = item.name
          this.leaseCityFlag = false
        } else {
          this.customerInfo.leaseProvinceId = item.id
          this.customerInfo.leaseProvince = item.name
          this.customerInfo.leaseCityId = ''
          this.customerName.leaseCityIdName = ''
        }
      },
      //保存
      leaseAddPage() {
        this.$validator.validate().then((valid) => {
          if (valid) {
            this.next(this.customerInfo, 0)
          } else {
            this.$toast.fail('请检查表单项')
          }
        })
      },
      idCardBlur(idCard) {
        setTimeout(() => {
          if (this.$validator.flags.idCard.valid == true) {
            const data = {
              certNo: idCard,
              eId: this.$route.query.eId,
              tokenId: sessionStorage.getItem('tokenid'),
            }
            getPreAuditStatus(data).then((res) => {
              if (res === undefined || res.code !== '200') {
                this.$toast.fail('预审批查询结果有误')
                return
              }
              if (res.data === null) {
                this.$toast.fail('该客户未进行预审批审核')
                this.customerInfo.customerName = ''
                this.customerInfo.customerMobile = ''
              } else {
                if (res.data.auditResult == '1') {
                  //this.$toast.fail('审批通过')
                } else if (res.data.auditResult == '0') {
                  //this.$toast.fail('待审批')
                } else if (res.data.auditResult == '2') {
                  this.$toast.fail(res.data.date)
                }
                this.customerInfo.customerName = res.data.realName
                this.customerInfo.customerMobile = res.data.mobile
              }
              this.clearAllToast()
              return false
            })
          }
        }, 1000)
      },
      formatEchoMsgById(id) {
        let objMsg = {}
        let flag = false
        let echoFlag = true
        const idVal = this.customerInfo[id]
        switch (id) {
          case 'merchantId':
            this._selectUsedCarDealerInfoBySoldId()
            break
          case 'nationId':
            objMsg = this.dics.nationId
            break
          case 'localDomicileId':
          case 'cardLongEffectiveId':
            objMsg = this.dics.yesorno
            break
          case 'customerMarryStatusId':
            objMsg = this.dics.yzt_marrystatus
            break
          case 'residentInformationId':
            objMsg = this.dics.residentInformation
            break
          case 'spouseSunNumId':
            objMsg = this.dics.yzt_sonstatus
            break
          case 'liveTypeId':
            objMsg = this.dics.yzt_livestatus
            break
          case 'customerEduId':
            objMsg = this.dics.yzt_edustatus
            break
          case 'weatherGuarantee':
          case 'weatherCotenant':
            objMsg = this.dics.hadOrNot
            break
          case 'leaseProvinceId':
          case 'leaseCityId':
          case 'cardProvinceId':
          case 'cardCityId':
          case 'cardCountyId':
          case 'liveProvinceId':
          case 'liveCityId':
          case 'liveCountyId':
          case 'homeProvinceId':
          case 'homeCityId':
          case 'homeCountyId':
            objMsg = this.area.children
            flag = true
            break
          default:
            echoFlag = false
            break
        }
        if (echoFlag) {
          if (flag) {
            this.formatAreaId(id, idVal, objMsg)
          } else {
            if (idVal === '') {
              this.customerName[id + 'Name'] = ''
            } else {
              this.customerName[id + 'Name'] = objMsg[idVal].itemName || ''
            }
          }
        }
      },
      onSelect_province(item) {
        this.province_show = this.city_show = this.county_show = this.public_show = false
        if (this.flag == 0) {
          if (this.customerInfo[this.id] == item.id) {
            this.flag = 1
            this.customerInfo[this.id] = item.id
            this.customerName[this.id + 'Name'] = item.name
          } else {
            if (this.changeParams.cityId) {
              this.customerInfo[this.changeParams.cityId] = ''
              this.customerName[this.changeParams.cityId + 'Name'] = ''
            }
            this.customerInfo[this.changeParams.prevId] = ''
            this.customerName[this.changeParams.prevId + 'Name'] = ''
            this.flag = 1
          }
          if (item.name == '北京市') {
            this.customerInfo[this.changeParams.prevId] = '110100'
            this.customerName[this.changeParams.prevId + 'Name'] = '市辖区'
          } else if (item.name == '天津市') {
            this.customerInfo[this.changeParams.prevId] = '120100'
            this.customerName[this.changeParams.prevId + 'Name'] = '市辖区'
          }
        }
        this.customerInfo[this.id] = item.id || 1
        this.customerName[this.id + 'Name'] = item.name || ''
      },
      _selectUsedCarDealerInfoBySoldId() {
        if (!this.customerInfo.merchantId) return
      },
      startChange() {
        this.customerInfo.cardStartTime = this.confirmPicker(this.cardStartTime)
      },
      endChange() {
        if (this.cardEndTime <= this.cardStartTime) {
          this.$toast.fail('结束日期不能小于开始日期')
          return
        }
        this.customerInfo.cardEndTime = this.confirmPicker(this.cardEndTime)
      },
    },
  }
</script>

<style lang="scss" scoped="scoped">
  .incoming-info {
    margin-top: 16px;

    .incomeField_body {
      width: 702px;
      margin: 24px auto;
      background: #FFFFFF;
      box-shadow: 0px 0px 40px 0px rgba(231, 231, 231, 1);
      border-radius: 24px;

      .title {
        height: 82px;
        line-height: 82px;
        padding: 0 0 0 32px;
        font-size: 30px;
        font-weight: bold;
        color: #333333;
        border-bottom: 1px solid #F3F3F3;
      }

      .incomeField {
        height: 100px;
        border-bottom: 1px solid #F3F3F3;

        /deep/ {
          .van-cell {
            line-height: 100px;
            width: 100%;
            font-size: 28px;
            color: #666666;
            padding: 0 32px;

            .van-cell__title {
              width: 250px;
            }

            .van-cell__value {
              .van-field__body {
                input {
                  text-align: right;
                }
              }
            }
          }

        }
      }
    }
  }
</style>
