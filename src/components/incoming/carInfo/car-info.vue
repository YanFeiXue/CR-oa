<template>
  <section class="car-info">
    <section class="incomeField_body">
      <header class="title">车辆信息</header>
      <section class="incomeField borderRadiusToplr">
        <van-field readonly label="车架号" placeholder="请输入" v-model="carInfo.carVin" name="carVin"></van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="车辆评估价(元)" placeholder="不需填写" v-model="carInfo.carAccess" name="carAccess">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="公里数" placeholder="不需填写" v-model="carInfo.kilometreNo" v-validate="'required|isNum'"
          name="kilometreNo"></van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="首次登记时间" placeholder="不需填写" v-model="carInfo.firstRegisterTime"
          name="firstRegisterTime"></van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="车牌号" placeholder="不需填写" v-model="carInfo.carLicense" name="carLicense"></van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="发动机号" :readonly="false" placeholder="请输入" v-model="carInfo.carEngineNumber"
          name="carEngineNumber"></van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="车辆颜色" :readonly="false" placeholder="请输入" v-model="carInfo.carColor" name="carColor">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="燃料种类" class="slotRight" placeholder="请选择" v-model="customerName.fuelTypeName"
          name="fuelType"></van-field>
      </section>
      <section class="incomeField" v-if="productDiff.lhInput">
        <van-field readonly label="车型" class="slotRight" placeholder="请选择" v-model="customerName.vehTypeIdName"
          name="vehTypeId"></van-field>
      </section>
      <section class="incomeField" v-if="productDiff.lhInput">
        <van-field readonly label="车辆准载" placeholder="请选择" v-model="carInfo.carAllowedPassenger"
          name="carAllowedPassenger">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="车辆使用性质" class="slotRight" placeholder="请选择" v-model="customerName.carUseNatureIdName"
          name="carUseNatureId">
        </van-field>
      </section>
      <div v-if="!productDiff.aplhInput&&!productDiff.tsytInput">
        <section class="incomeField">
          <van-field readonly label="是否有驾驶证" class="slotRight" placeholder="请选择"
            v-model="customerName.haveLicenseIdName" name="haveLicenseId"></van-field>
        </section>
        <section class="incomeField">
          <van-field readonly label="驾驶证是否有效" class="slotRight" placeholder="请选择"
            v-model="customerName.licenseWetherEffecIdName" name="licenseWetherEffecId"></van-field>
        </section>
        <section class="incomeField">
          <van-field readonly label="车辆主驾人" class="slotRight" placeholder="请选择"
            v-model="customerName.carMainDriverIdName" name="carMainDriverId">
          </van-field>
        </section>
        <section class="incomeField">
          <van-field readonly label="驾照号码" placeholder="请输入" v-model="carInfo.drivingLicense" name="drivingLicense">
          </van-field>
        </section>
      </div>
      <section class="incomeField" v-if="!productDiff.aplhInput&&!productDiff.tsytInput">
        <van-field readonly label="流量费(%)" class="slotRight" placeholder="请选择" v-model="customerName.flowRateName"
          name="flowRate"></van-field>
      </section>
      <section class="incomeField" v-if="productDiff.bqapInput">
        <van-field readonly label="车损险保额" placeholder="请输入" v-model="carInfo.carDamageInsurance"
          name="carDamageInsurance"></van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="过户次数" placeholder="请输入" v-model="carInfo.transferTimes" name="transferTimes"
          :error="errors.has('transferTimes')"></van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="车辆抵押次数(承租人)" placeholder="请输入" v-model="carInfo.carMortgageTimes"
          name="carMortgageTimes"></van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="最近次抵押公司(承租人)" :readonly="!diyaFlag" placeholder="请输入"
          v-model="carInfo.recentSolutionMortgageCompany"></van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="最近次解押日期" placeholder="请输入" v-model="carInfo.recentSolutionMortgageDate"></van-field>
      </section>
      <section class="incomeField btNone borderRadiusBtlr">
        <van-field readonly label="解押天数" placeholder="不需填写" v-model="carInfo.recentSolutionMortgageDays"></van-field>
      </section>
    </section>


    <section class="incomeField_body">
      <header class="title">产品信息</header>
      <section class="incomeField">
        <van-field readonly label="产品名称" placeholder="不填写" v-model="customerName.productIdName" name="productIdName">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="用途" class="slotRight" placeholder="请选择" v-model="customerName.rentUseIdName"
          name="rentUseId"></van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="申请金额" placeholder="请输入" v-model="carInfo.applyAmount" name="applyAmount"></van-field>
      </section>
      <section class="incomeField" v-if="productDiff.directlyProductInput">
        <van-field readonly label="财力证明" class="slotRight" placeholder="请选择"
          v-model="customerName.financialStatementIdName" name="financialStatementId"></van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="申请期限" placeholder="不填写" v-model="customerName.applyExpiresIdName"
          name="applyExpiresIdName"></van-field>
      </section>
      <section class="incomeField" v-if="!productDiff.aplhInput&&!productDiff.tsytInput">
        <van-field readonly label="平台使用费(%)" placeholder="不填写" v-model="customerName.platformFeeIdName"
          name="platformFeeIdName"></van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="GPS费用" placeholder="不需填写" v-model="carInfo.gpsFee" name="gpsFee"></van-field>
      </section>
      <section class="incomeField" v-if="productDiff.tsytInput">
        <van-field readonly label="保险费" placeholder="不需填写" v-model="carInfo.insuranceAmount" name="insuranceAmount">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="履约保证金" placeholder="不需填写" v-model="carInfo.bondAmount" name="bondAmount">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="月供" placeholder="不需填写" v-model="carInfo.monthPayAmount" name="monthPayAmount">
        </van-field>
      </section>
      <section class="incomeField" v-if="productDiff.aplhInput || productDiff.tsytInput">
        <van-field readonly label="盗抢险" placeholder="不需填写" v-model="carInfo.theftAmount" name="theftAmount">
        </van-field>
      </section>
      <section class="incomeField" v-if="productDiff.directlyProductInput">
        <van-field readonly label="应收盗抢险金额" placeholder="不需填写" v-model="carInfo.applyReceivableTheft"
          name="applyReceivableTheft"></van-field>
      </section>
      <section class="incomeField" v-if="productDiff.directlyProductInput">
        <van-field readonly class="slotRight" label="实收盗抢险金额" placeholder="不需填写" v-model="carInfo.receiptsTheft"
          name="receiptsTheft"></van-field>
      </section>
      <section class="incomeField">
        <van-field readonly label="担保费" placeholder="不需填写" v-model="carInfo.guaranteeFee" name="guaranteeFee">
        </van-field>
      </section>
      <section class="incomeField" v-if="productDiff.bqapInput || productDiff.lhInput">
        <van-field readonly label="还款卡号" :readonly="false" placeholder="请填写还款卡号" v-model="carInfo.bankCard"
          name="bankCard"></van-field>
      </section>
      <section class="incomeField" v-if="productDiff.bqapInput || productDiff.lhInput">
        <van-field readonly label="还款卡开户银行" class="slotRight" placeholder="请选择" v-model="customerName.bankNameIdName"
          name="bankNameIdName"></van-field>
      </section>
      <section class="incomeField" v-if="productDiff.bqapInput || productDiff.lhInput">
        <van-field readonly label="还款卡开户支行" :readonly="false" placeholder="请填写还款卡开户支行" v-model="carInfo.bankDetailAddr"
          name="bankDetailAddr"></van-field>
      </section>
      <section class="incomeField btNone borderRadiusBtlr">
        <van-field readonly label="租赁项目总价" placeholder="不需填写" v-model="carInfo.totalAmount" name="totalAmount">
        </van-field>
      </section>
    </section>

    <!-- <van-action-sheet v-model="public_show" cancel-text="取消" :actions="publicList" @select="onSelect_province" />
    <van-popup v-model="recentDateFlag" :label="dateFlag ? '最近次解押日期' : '首次登记时间'" round position="bottom"
      :overlay="true">
      <van-datetime-picker v-model="recentDate" confirm-button-text="确认" cancel-button-text="取消"
        @confirm="recentDateFlag = !recentDateFlag" @cancel="recentDateFlag = !recentDateFlag"
        @change="recentDateChange()" type="date" :min-date="minDate" :max-date="maxDate" />
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
    leaseAdd,
    selectGpsFee,
    getServiceAmount,
    getMonthAmount,
    getProductListByTokenid,
    getOcrInfosByEid,
    getCreatedEvalPrice,
    getOcrInputInfo,
    // getTheftInfoByProductAndVersion,
    // judgmentRuleHit
  } from '@/api/api'
  import {
    leaseFormMixin
  } from '@/util/mixins'
  export default {
    name: 'car-info',
    mixins: [leaseFormMixin],
    data() {
      return {
        recentDateFlag: false,
        recentDate: '',
        dateFlag: 0,
        diyaFlag: true,
        productList: {},
        bankList: [],
      }
    },
    created() {},
    mounted() {
      this.isIncoming()
      this._getProductListByTokenid(this.product.productId)
    },
    watch: {
      'carInfo.carMortgageTimes'(newVal) {
        if (newVal == 0) {
          this.diyaFlag = false
        }
      },
    },
    methods: {
      isIncoming() {
        if (this.isCheckLeaseForm == true) {
          this.carInfo = this.yizhangtongForm.carInfo
          if (!this.carInfo.carAccess) {
            this._getOcrInfosByEid()
          }

          for (let i in this.carInfo) {
            this.formatEchoMsgById(i)
          }

          this.$validator.validate().then((valid) => {})
        }
        this.customerName.platformFeeIdName = '0%' //平台使用费率
        this.carInfo.platformFeeId = '1' //平台使用费率
        this.carInfo.loanWayId = 1
        this.customerName.loanWayIdName = '先抵押后放款'
      },
      //根据eid查询ocr信息
      _getOcrInfosByEid() {
        getOcrInputInfo({
          eId: this.$route.query.eId,
          tokenId: sessionStorage.getItem('tokenid'),
        }).then((data) => {
          if (data.code != '0') {
            this.$toast.fail(data.msg)
            return
          }
          const res = data.data
          this.carInfo.carVin = res.carVin //vin车架号
          this.carInfo.carEngineNumber = res.carEngineNumber //发动机号
          this.customerName.carUseNatureIdName = res.carUseNature //使用性质
          this.carInfo.carUseNatureId = res.carUseNatureId //使用性质id
          this.carInfo.drivingLicense = res.drivingLicense
          this._getCreatedEvalPrice()
        })
      },
      leaseAddPage() {
        this.$validator.validate().then((valid) => {
          if (valid) {
            let applyAmount = this.carInfo.applyAmount
            let regex = new RegExp(/^\d{1,9}000$/)
            if (!regex.test(applyAmount) && applyAmount != 0) {
              this.$toast.fail('申请金额不符合规范!')
              return
            }
            this.$toast.loading({
              message: '保存中...',
              forbidClick: true,
              duration: 0,
              loadingType: 'spinner',
            })
            this._getGpsFee(applyAmount)
            setTimeout(() => {
              this.carInfo.platformFeeId = 1 //平台使用费率
              this.carInfo.haveCreditReportId = 1 //征信报告
              this.$toast.clear()
              this.next(this.carInfo, 3)
            }, 2000)
          } else {
            this.$toast.fail('请检查表单项')
          }
        })
      },
      //抵押次数
      blurRecent(val) {
        if (val == 0) {
          this.diyaFlag = false
          this.carInfo.recentSolutionMortgageDate = ''
          this.carInfo.recentSolutionMortgageCompany = ''
        } else {
          this.diyaFlag = true
        }
      },
      //日期点击
      recentFlagClick(flag) {
        this.dateFlag = flag
        if (flag == 0) {
          this.recentDateFlag = true
        }
        if (this.diyaFlag && flag == 1) {
          this.recentDateFlag = true
        }
      },
      getPrepayRent(usedCarSellprice) {
        //申请金额
        var applyAmount = this.carInfo.applyAmount
        var carAccess = this.carInfo.carAccess
        if (!applyAmount) {
          return
        }
        if (!carAccess) {
          this.$toast.fail('车辆评估价未获取')
          return
        }
        if (Number.parseInt(carAccess) <= Number.parseInt(applyAmount)) {
          this.$toast.fail('申请金额不能大于车辆销售价')
          return
        }
        //计算预付租金
        this.carInfo.prepayRent = carAccess - applyAmount
        //计算预付租金比例
        this.carInfo.prepayRentRate = parseFloat(
          (this.carInfo.prepayRent / carAccess) * 100
        ).toFixed(2)
      },
      _getProductListByTokenid(productId) {
        const params = {
          productId: this.product.productId,
          tokenId: this.tokenId,
        }
        getProductListByTokenid(params).then((data) => {
          let res = data.data
          let resResult = res.find((item) => {
            return item.code == this.product.productCode
          })
          this.customerName.productIdName = resResult.name //产品名称
          this.customerName.applyExpiresIdName = resResult.expiresId + '月' //申请期限
          this.carInfo.applyExpiresId = resResult.expiresId //期限id
        })
      },
      checkSheet(id, flag) {
        switch (flag) {
          case 3:
            this.formatYesorno(id)
            break
          default:
            this.id = id
            break
        }
      },
      recentDateChange() {
        if (this.dateFlag == 0) {
          this.carInfo.firstRegisterTime = this.confirmPicker(this.recentDate)
        } else {
          let now = new Date()
          let recentSolutionMortgageDate = new Date(this.recentDate)
          let days = now.getTime() - recentSolutionMortgageDate.getTime()
          this.carInfo.recentSolutionMortgageDays = parseInt(
            days / (1000 * 60 * 60 * 24)
          )
          this.carInfo.recentSolutionMortgageDate = this.confirmPicker(
            this.recentDate
          )
        }
      },
      formatYesorno(id) {
        this.id = id
        this.public_show = true
        let objList = {}
        switch (id) {
          case 'carYear':
            objList = this.dics.carYear
            break
          case 'carMonth':
            objList = this.dics.carMonth
            break
          case 'carUseNatureId':
            objList = this.dics.yzt_caruse
            break
          case 'haveLicenseId':
            objList = this.dics.hadOrNot
            break
          case 'licenseWetherEffecId':
            objList = this.dics.yesorno
            break
          case 'carMainDriverId':
            objList = this.dics.mainDriver
            break
          case 'rentUseId':
            objList = this.dics.yzt_rentuse

            break
          case 'financialStatementId':
            objList = this.dics.financialStatement
            break
          case 'applyExpiresId':
            objList = this.dics.yzt_term
            break
          case 'haveCreditReportId':
            objList = this.dics.yesorno
            break
          case 'flowRate':
            objList = this.dics.flowRate
            break
          case 'bankNameId':
            objList = this.productDiff.bankList
            break
            //carownerType servicePack insuranceFinance
          case 'predecessorCarownerType':
            objList = this.dics.carownerType
            break
            // case 'servicePack':
            //   objList = this.dics.servicePackFee
            //   break
            // case 'insuranceFinance':
            //   objList = this.dics.insuranceFinanceFee
            //   break
          case 'loanWayId':
            objList = this.dics.loanWay
            break
          case 'fuelType':
            objList = this.dics.fuelType
            break
          case 'vehTypeId':
            objList = this.dics.vehTypeId
            break
          default:
            break
        }
        this.publicList = []
        for (var i in objList) {
          let obj = {}
          obj.name = objList[i].itemName
          obj.id = objList[i].itemId
          this.publicList.push(obj)
        }
      },
      formatEchoMsgById(id) {
        let objMsg = {}
        let echoFlag = true
        const idVal = this.carInfo[id]

        switch (id) {
          // case 'carYear':
          //   objMsg = this.dics.carYear
          //   break
          // case 'carMonth':
          //   objMsg = this.dics.carMonth
          //   break
          case 'carUseNatureId':
            objMsg = this.dics.yzt_caruse
            break
          case 'haveLicenseId':
            objMsg = this.dics.hadOrNot
            break
          case 'licenseWetherEffecId':
            objMsg = this.dics.yesorno
            break
          case 'carMainDriverId':
            objMsg = this.dics.mainDriver
            break
          case 'rentUseId':
            objMsg = this.dics.yzt_rentuse

            break
          case 'financialStatementId':
            objMsg = this.dics.financialStatement
            break
          case 'platformFeeId':
            echoFlag = false
            break
          case 'applyExpiresId':
            objMsg = this.dics.yzt_term
            break
          case 'haveCreditReportId':
            objMsg = this.dics.yesorno
            break
          case 'flowRate':
            objMsg = this.dics.flowRate
            break
          case 'bankNameId':
            objMsg = this.productDiff.bankList
            break
          case 'predecessorCarownerType':
            objMsg = this.dics.carownerType
            break
          case 'fuelType':
            objMsg = this.dics.fuelType
            break
          case 'vehTypeId':
            objMsg = this.dics.vehTypeId
            break
          default:
            echoFlag = false
            break
        }
        if (echoFlag) {
          if (idVal === '' || idVal === undefined) {
            this.customerName[id + 'Name'] = ''
          } else {
            if (id == 'bankNameId') {
              if (!this.productDiff.bqapInput && !this.productDiff.lhInput) {
                this.customerName[id + 'Name'] = ''
              } else {
                objMsg = this.productDiff.bankList.find((item) => {
                  return idVal == item.itemId
                })
                this.customerName[id + 'Name'] = objMsg ? objMsg.itemName : ''
              }
            } else {
              this.customerName[id + 'Name'] = objMsg[idVal].itemName
            }
          }
        }
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
      onSelect_province(item) {
        this.province_show = this.city_show = this.county_show = this.public_show = false
        this.carInfo[this.id] = item.id
        this.customerName[this.id + 'Name'] = item.name
      },
      _getCreatedEvalPrice() {
        const vin = this.carInfo.carVin
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{17}$/.test(vin)
        if (vin == '') {
          this.$toast.fail('请填写车架号(vin)')
          return
        }
        var parm = {
          vin: this.carInfo.carVin,
          tokenId: this.tokenId,
        }
        getCreatedEvalPrice(parm).then((data) => {
          if (data.code == 0) {
            // 车辆评估价
            this.carInfo.carAccess = data.data.evalPrice
            //this.carInfo.carBrand = data.data.carBrand  //车辆年限
            //this.carInfo.carSeries = data.data.carSeries //车系
            this.carInfo.carType = data.data.carType //车辆型号
            //this.carInfo.carUseNatureId = data.data.switchFromService
            this.carInfo.carLicense = data.data.carNo //发动机号
            this.carInfo.leaveFactoryTime = data.data.makeDate //出厂时间
            this.carInfo.firstRegisterTime = data.data.regDate
            this.carInfo.kilometreNo = data.data.mileAge
            this.carInfo.carBrand = data.data.brandName
            this.carInfo.carSeries = data.data.seriesName
            this.carInfo.carType = data.data.modelName
            this.carInfo.modelPrice = parseFloat(
              data.data.modelPrice * 10000
            ).toFixed(0)
            this.calculateCarYear(this.carInfo.firstRegisterTime)
            //获取预付租金  二手车产品
          } else {
            this.$toast.fail(data.msg)
          }
          // 关闭等待锁
        })
      },
      _getGpsFee(applyAmount) {
        if (applyAmount === '') {
          this.$toast.fail('申请金额不能为空')
          return
        }
        let regex = new RegExp(/^\d{1,9}000$/)
        if (!regex.test(applyAmount) && applyAmount != 0) {
          this.$toast.fail('申请金额不符合规范!')
          return
        }
        const params = {
          productCode: this.product.productCode,
          applyAmount: applyAmount,
          productId: this.product.productId,
          productVersion: this.product.productVersion,
        }
        selectGpsFee(params).then((data) => {
          if (data.code != 0) {
            this.$toast.fail('获取gps费有误, ' + data.msg)
            return
          }
          this.carInfo.gpsFee = data.data.gpsPrice
          // gps设备型号
          this.carInfo.gpsDeviceCode = data.data.gpsCode

          this._getServiceAmount(applyAmount, data.data.gpsPrice)
        })
        if (this.productDiff.directlyProductInput) {
          // judgmentRuleHit({
          //   applyAmount: Number(applyAmount),
          //   preauditId: this.$route.query.preauditId,
          // }).then((res) => {
          //     if(res.code != 0) {
          //     this.$toast.fail(res.msg)
          //     return
          //   }
          //   if(res.data) {
          //     this.carInfo.financialStatementId = 11
          //     this.customerName.financialStatementIdName = '无需提供财力资料'
          //   }
          // })
          // getTheftInfoByProductAndVersion({
          //   amount: applyAmount,
          //   productId: this.product.productId,
          //   version: this.product.productVersion,
          // }).then((res) => {
          //   if(res.code != 0) {
          //     this.$toast.fail(res.msg)
          //     return
          //   }
          //   this.carInfo.applyReceivableTheft = res.data.receivableTheftAmount
          // })
        }
      },
      _getServiceAmount(applyAmount, gpsFee) {
        let params = {
          productCode: this.product.productCode,
          productId: this.product.productId,
          productVersion: this.product.productVersion,
          applyAmount: applyAmount,
          finalAppAmount: applyAmount,
          gpsFee: gpsFee,
          platformFeeId: this.carInfo.platformFeeId || 1,
          applyExpiresId: this.carInfo.applyExpiresId,
        }
        getServiceAmount(params).then((data) => {
          // this.carInfo.totalAmount = applyAmount;
          if (data.code == 0) {
            this.carInfo.insuranceRate = data.data.insuranceRate
            this.carInfo.insuranceAmount = data.data.insuranceAmount
            this.carInfo.bondRate = data.data.bondRate
            this.carInfo.bondAmount = data.data.bondAmount
            this.carInfo.retainRate = data.data.retainRate
            this.carInfo.retainAmount = data.data.retainAmount
            this.carInfo.serviceAmount = data.data.serviceAmount
            this.carInfo.totalAmount = data.data.totalAmount
            this.carInfo.guaranteeFee = data.data.guaranteeFee
            this.carInfo.mediumPremium = data.data.mediumPremium
            if (this.productDiff.aplhInput || this.productDiff.tsytInput) {
              this.carInfo.theftAmount = data.data.theftAmount
            }
            this._getMonthAmount(this.carInfo.totalAmount)
          }
        })
      },
      _getMonthAmount(applyAmount) {
        var params = {
          productVersion: this.product.productVersion,
          applyExpiresId: this.carInfo.applyExpiresId,
          totalAmount: applyAmount,
          productId: this.product.productId,
        }
        getMonthAmount(params).then((data) => {
          if (data.code == 0) {
            this.carInfo.monthPayAmount = data.data
          }
        })
      },
      //计算车辆年限
      calculateCarYear(value) {
        //计算车辆年限calculateCarYear(data.data.firstRegisterTime)

        var registerTime = value
        var myDate = new Date()
        var month = myDate.getMonth() + 1
        var day = myDate.getDate()
        var caryear = myDate.getFullYear() - registerTime.substring(0, 4) - 1
        if (
          registerTime.substring(5, 7) < month ||
          (registerTime.substring(5, 7) == month &&
            registerTime.substring(8, 10) <= day)
        ) {
          caryear++
        }
        var carmonth = 0
        if (
          registerTime.substring(5, 7) < month ||
          (registerTime.substring(5, 7) == month &&
            registerTime.substring(8, 10) <= day)
        ) {
          carmonth = month - registerTime.substring(5, 7)
        } else {
          carmonth = 12 + month - registerTime.substring(5, 7)
        }
        if (registerTime.substring(8, 10) <= day) {
          carmonth++
        }
        if (carmonth == 12) {
          carmonth = 0
          caryear++
        }
        this.carInfo.carYear = caryear
        this.carInfo.carMonth = carmonth
      },
    },
  }
</script>

<style lang="scss" scoped="scoped">
  .car-info {
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
