<template>
  <section class="work-info">
    <section class="incomeField_body">
      <header class="title">承租人信息</header>
      <section class="incomeField borderRadiusToplr pd2">
        <van-field label="职业类型" class="slotRight" readonly placeholder="请选择"
          v-model="customerName.customerWorkTypeIdName" name="customerWorkTypeId"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="企业名称" placeholder="请输入" readonly v-model="workInfo.customerWorkCompany"
          name="customerWorkCompany"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="企业性质" class="slotRight" readonly placeholder="请选择"
          v-model="customerName.customerCompanyTypeIdName" name="customerCompanyTypeId"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="所属行业(一级)" class="slotRight" readonly placeholder="请选择"
          v-model="customerName.customerCompanyIndustry1IdName" name="customerCompanyIndustry1Id"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="所属行业(二级)" class="slotRight" readonly placeholder="请选择"
          v-model="customerName.customerCompanyIndustry2IdName" name="customerCompanyIndustry2Id"></van-field>
      </section>
      <section class="incomeField pd2" v-if="productDiff.insureInput">
        <van-field label="所属行业(三级)" class="slotRight" readonly placeholder="请选择" v-model="customerProfessionCodeName"
          name="customerProfessionCodeName"></van-field>
      </section>
      <!-- 贷款投向 -->
      <div v-if="productDiff.operatingLoanInput">
        <section class="incomeField pd2">
          <van-field label="贷款投向(一级)" class="slotRight" readonly placeholder="请选择"
            v-model="workInfo.loanOrientation1Name" name="loanOrientation1Name"></van-field>
        </section>
        <section class="incomeField pd2">
          <van-field label="贷款投向(二级)" class="slotRight" readonly placeholder="请选择"
            v-model="workInfo.loanOrientation2Name" name="loanOrientation2Name"></van-field>
        </section>
        <section class="incomeField pd2">
          <van-field label="贷款投向(三级)" class="slotRight" readonly placeholder="请选择"
            v-model="workInfo.loanOrientation3Name" name="loanOrientation3Name"></van-field>
        </section>
        <section class="incomeField pd2">
          <van-field label="贷款投向(四级)" class="slotRight" readonly placeholder="请选择"
            v-model="workInfo.loanOrientation4Name" name="loanOrientation4Name"></van-field>
        </section>
        <section class="incomeField pd2">
          <van-field label="经营执照编号" placeholder="请输入" readonly v-model="workInfo.businessLicenseCode"
            name="businessCode"></van-field>
        </section>
        <section class="incomeField">
          <van-field class="slotRight" label="是否为法人" readonly placeholder="请选择" v-model="customerName.isLegalPersonName"
            name="isLegalPerson"></van-field>
        </section>
      </div>
      <section class="incomeField pd2">
        <van-field label="部门" placeholder="请输入" readonly v-model="workInfo.customerDepartment"
          name="customerDepartment"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="岗位名称" placeholder="请输入" readonly v-model="workInfo.customerPosition" name="customerPosition">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field class="slotRight" label="职务类型" readonly placeholder="请选择"
          v-model="customerName.customerDutyTypeIdName" name="customerDutyTypeId"></van-field>
      </section>
      <section class="incomeField">
        <van-field class="slotRight" label="工作年限" readonly placeholder="请选择"
          v-model="customerName.customerWorkLifeIdName" name="customerWorkLifeId"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="公司电话" placeholder="请输入" readonly v-model="workInfo.customerCompanyPhone"
          name="customerCompanyPhone">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field class="slotRight" label="税后月收入(元)" readonly placeholder="请选择"
          v-model="customerName.customerMonthIncomeIdName" name="customerMonthIncomeId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field class="slotRight" label="工作地址(省)" readonly placeholder="请选择"
          v-model="customerName.customerWorkProcinveIdName" name="customerWorkProcinveId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field class="slotRight" label="工作地址(市)" readonly placeholder="请选择"
          v-model="customerName.customerWorkCityIdName" name="customerWorkCityId"></van-field>
      </section>
      <section class="incomeField">
        <van-field class="slotRight" label="工作地址(区)" readonly placeholder="请选择"
          v-model="customerName.customerWorkCountyIdName" name="customerWorkCountyId"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="工作详细地址" placeholder="请输入" readonly v-model="workInfo.customerWorkAddress"
          name="customerWorkAddress"></van-field>
      </section>

      <section class="incomeField">
        <van-field class="slotRight" label="有无社会保障" readonly placeholder="请选择"
          v-model="customerName.weatherSocialSecurityName" name="weatherSocialSecurity">
        </van-field>
      </section>
      <section class="incomeField" :class="!productDiff.bqapInput?'btNone borderRadiusBtlr':''">
        <van-field class="slotRight" label="有无公积金" readonly placeholder="请选择"
          v-model="customerName.weatherAccumulationName" name="weatherAccumulation">
        </van-field>
      </section>
      <section class="incomeField btNone borderRadiusBtlr" v-if="productDiff.bqapInput">
        <van-field class="slotRight" label="入职时间" readonly placeholder="请选择" v-model="workInfo.customerHiredate">
        </van-field>
      </section>
    </section>

    <!-- 地址公用sheet -->
    <!-- <van-action-sheet v-model="province_show" cancel-text="取消" :actions="filterAreas" @select="onSelect_province" />
    <van-action-sheet v-model="city_show" cancel-text="取消" :actions="cityList" @select="onSelect_province" />
    <van-action-sheet v-model="county_show" cancel-text="取消" :actions="countyList" @select="onSelect_province" />
    <van-action-sheet v-model="public_show" cancel-text="取消" :actions="publicList" @select="onSelect_province" />
    <van-popup v-model="startTimePop" label="身份证开始日期" round position="bottom" :overlay="true">
      <van-datetime-picker v-model="workStartTime" confirm-button-text="确认" cancel-button-text="取消"
        @confirm="startTimePop = !startTimePop" @cancel="startTimePop = !startTimePop" @change="startChange()"
        type="date" :min-date="minDate" :max-date="maxDate" />
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
    selectProfessionListByPositionCode,
  } from '@/api/api'
  import {
    leaseFormMixin
  } from '@/util/mixins'
  export default {
    name: 'work-info',
    mixins: [leaseFormMixin],
    data() {
      return {
        startTimePop: false,
        workStartTime: '',
        customerProfessionCodeName: '',
        loanOrient: {
          loanOrientation1Name: '', //贷款投向一级
          loanOrientation1Code: '',
          loanOrientation2Name: '', //贷款投向二级
          loanOrientation2Code: '',
          loanOrientationId1: '',
          loanOrientation3Name: '', //贷款投向三级
          loanOrientation3Code: '',
          loanOrientationId2: '',
          loanOrientation4Name: '', //贷款投向四级
          loanOrientation4Code: '',
          loanOrientationId3: '',
        },
      }
    },
    mounted() {
      this.isIncoming()
    },
    methods: {
      isIncoming() {
        if (this.isCheckLeaseForm == true) {
          this.workInfo = this.yizhangtongForm.workInfo
          this.setSessionData(JSON.parse(JSON.stringify(this.workInfo)))
          for (let i in this.workInfo) {
            this.formatEchoMsgById(i)
          }
          if (
            this.productDiff.insureInput &&
            this.workInfo.customerProfessionCode
          ) {
            this._selectProfessionListByPositionCode(
              this.yizhangtongForm.workInfo.customerProfessionCode
            )
          }
          this.$validator.validate().then((valid) => {})
        }
      },
      leaseAddPage() {
        this.$validator.validate().then((valid) => {
          console.log(this.workInfo)
          if (valid) {
            this.next(this.workInfo, 1)
          } else {
            this.$toast.fail('请检查表单项')
          }
        })
      },
      startChange() {
        this.workInfo.customerHiredate = this.confirmPicker(this.workStartTime)
      },
      _selectProfessionListByPositionCode(customerProfessionCode) {
        selectProfessionListByPositionCode({
          positionCode: customerProfessionCode,
        }).then((res) => {
          if (res.code != 0) {
            return
          }
          this.customerProfessionCodeName = res.data.positionName
        })
      },
      formatEchoMsgById(id) {
        let objMsg = {}
        let flag = false
        let echoFlag = true
        const idVal = this.workInfo[id]
        switch (id) {
          case 'weatherSocialSecurity':
          case 'weatherAccumulation':
            objMsg = this.dics.hadOrNot
            break
          case 'isLegalPerson':
            objMsg = this.dics.yesorno
            break
          case 'customerWorkTypeId':
            objMsg = this.dics.yzt_worktype
            break
          case 'customerCompanyTypeId':
            objMsg = this.dics.yzt_companytype
            break
          case 'customerCompanyIndustry1Id':
            objMsg = this.dics.yzt_hangye1
            break
          case 'customerCompanyIndustry2Id':
            objMsg = this.getNextDic()
            break
          case 'customerDutyTypeId':
            objMsg = this.dics.yzt_dutytype
            break
          case 'customerWorkLifeId':
            objMsg = this.dics.yzt_worklife
            break
          case 'customerMonthIncomeId':
            objMsg = this.dics.yzt_monthincome
            break
          case 'weatherGuarantee':
          case 'weatherCotenant':
            objMsg = this.dics.hadOrNot
            break
          case 'customerWorkProcinveId':
          case 'customerWorkCityId':
          case 'customerWorkCountyId':
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
              this.customerName[id + 'Name'] = objMsg[idVal].itemName
            }
          }
        }
      },
      getNextDic() {
        const parentId = this.workInfo.customerCompanyIndustry1Id
        if (parentId == '') {
          this.public_show = false
          //this.$toast.fail('请先选择所属行业(一级)')
          return
        }
        const obj = this.dics[this.dics.yzt_hangye1[parentId].itemIds]
        return obj
      },
      onSelect_province(item) {
        this.province_show = this.city_show = this.county_show = this.public_show = false
        //sheet 城市
        if (this.flag == 0) {
          if (this.workInfo[this.id] == item.id) {
            this.flag = 1
          } else {
            if (this.changeParams.cityId) {
              this.workInfo[this.changeParams.cityId] = ''
              this.customerName[this.changeParams.cityId + 'Name'] = ''
            }
            this.workInfo[this.changeParams.prevId] = ''
            this.customerName[this.changeParams.prevId + 'Name'] = ''
            this.flag = 1
          }
          if (item.name == '北京市') {
            this.workInfo[this.changeParams.prevId] = '110100'
            this.customerName[this.changeParams.prevId + 'Name'] = '市辖区'
          } else if (item.name == '天津市') {
            this.workInfo[this.changeParams.prevId] = '120100'
            this.customerName[this.changeParams.prevId + 'Name'] = '市辖区'
          }
          this.workInfo[this.id] = item.id
          this.customerName[this.id + 'Name'] = item.name
          // sheet 所属行业三级
        } else if (this.flag == 4) {
          const obj = {
            customerProfessionCode: item.id,
          }
          this.workInfo = Object.assign(this.workInfo, obj)
          this.customerProfessionCodeName = item.name
          //sheet 贷款投向
        } else if (this.flag == 5) {
          this.formatParms(this.id)
          this.id = 'loanOrientation' + (this.id + 1) + 'Id'
          this.workInfo[this.loanOrientCode] = item.codeValue
          this.workInfo[this.loanOrientName] = item.name
          this.workInfo[this.id] = item.id

          // this.workInfo = Object.assign(this.workInfo, this.loanOrient)
        } else {
          this.workInfo[this.id] = item.id
          this.customerName[this.id + 'Name'] = item.name
          if (this.id == 'customerCompanyIndustry1Id') {
            this.workInfo.customerCompanyIndustry2Id = ''
            this.customerName.customerCompanyIndustry2IdName = ''
            this.customerProfessionCodeName = ''
            this.workInfo.customerProfessionCode = ''
          }
          if (this.id == 'customerCompanyIndustry2Id') {
            this.customerProfessionCodeName = ''
            this.workInfo.customerProfessionCode = ''
          }
        }
      },
      formatParms(id) {
        for (let i = id; i <= 3; i++) {
          this.workInfo['loanOrientation' + (i + 1) + 'Id'] = ''
          this.workInfo['loanOrientation' + (i + 1) + 'Name'] = ''
          this.workInfo['loanOrientation' + (i + 1) + 'Code'] = ''
        }
      },
    },
  }
</script>

<style lang="scss" scoped="scoped">
  .work-info {
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
