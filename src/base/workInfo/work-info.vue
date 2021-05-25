<template>
  <section class="work-info">
    <header class="title">承租人信息</header>

    <section class="incomeField borderRadiusToplr pd2">
      <van-field label="职业类型" class="slotRight" required clearable :readonly="true" placeholder="请选择"
        v-model="customerName.customerWorkTypeIdName" name="customerWorkTypeId"></van-field>
    </section>
    <section class="incomeField pd2">
      <van-field label="企业名称" required clearable placeholder="请输入" v-model="workInfo.customerWorkCompany"
        name="customerWorkCompany"></van-field>
    </section>
    <section class="incomeField pd2">
      <van-field label="企业性质" class="slotRight" required clearable :readonly="true" placeholder="请选择"
        v-model="customerName.customerCompanyTypeIdName" name="customerCompanyTypeId"></van-field>
    </section>
    <section class="incomeField pd2">
      <van-field label="所属行业(一级)" class="slotRight" required clearable :readonly="true" placeholder="请选择"
        v-model="customerName.customerCompanyIndustry1IdName" name="customerCompanyIndustry1Id"></van-field>
    </section>
    <section class="incomeField pd2">
      <van-field label="所属行业(二级)" class="slotRight" required clearable :readonly="true" placeholder="请选择"
        v-model="customerName.customerCompanyIndustry2IdName" name="customerCompanyIndustry2Id"></van-field>
    </section>
    <section class="incomeField pd2" v-if="productDiff.insureInput">
      <van-field label="所属行业(三级)" class="slotRight" required clearable :readonly="true" placeholder="请选择"
        v-model="customerProfessionCodeName" name="customerProfessionCodeName"></van-field>
    </section>
    <!-- 贷款投向 -->
    <div v-if="productDiff.operatingLoanInput">
      <section class="incomeField pd2">
        <van-field label="贷款投向(一级)" class="slotRight" required clearable :readonly="true" placeholder="请选择"
          v-model="workInfo.loanOrientation1Name" name="loanOrientation1Name"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="贷款投向(二级)" class="slotRight" required clearable :readonly="true" placeholder="请选择"
          v-model="workInfo.loanOrientation2Name" name="loanOrientation2Name"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="贷款投向(三级)" class="slotRight" required clearable :readonly="true" placeholder="请选择"
          v-model="workInfo.loanOrientation3Name" name="loanOrientation3Name"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="贷款投向(四级)" class="slotRight" required clearable :readonly="true" placeholder="请选择"
          v-model="workInfo.loanOrientation4Name" name="loanOrientation4Name"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="经营执照编号" required clearable placeholder="请输入" v-model="workInfo.businessLicenseCode"
          name="businessCode"></van-field>
      </section>
      <section class="incomeField">
        <van-field class="slotRight" label="是否为法人" required clearable :readonly="true" placeholder="请选择"
          v-model="customerName.isLegalPersonName" name="isLegalPerson"></van-field>
      </section>
    </div>
    <section class="incomeField pd2">
      <van-field label="部门" required clearable placeholder="请输入" v-model="workInfo.customerDepartment"
        name="customerDepartment"></van-field>
    </section>
    <section class="incomeField pd2">
      <van-field label="岗位名称" required clearable placeholder="请输入" v-model="workInfo.customerPosition"
        name="customerPosition"></van-field>
    </section>
    <section class="incomeField">
      <van-field class="slotRight" label="职务类型" required clearable :readonly="true" placeholder="请选择"
        v-model="customerName.customerDutyTypeIdName" name="customerDutyTypeId"></van-field>
    </section>
    <section class="incomeField">
      <van-field class="slotRight" label="工作年限" required clearable :readonly="true" placeholder="请选择"
        v-model="customerName.customerWorkLifeIdName" name="customerWorkLifeId"></van-field>
    </section>
    <section class="incomeField pd2">
      <van-field label="公司电话" required clearable placeholder="请输入" v-model="workInfo.customerCompanyPhone"
        name="customerCompanyPhone">
      </van-field>
    </section>
    <section class="incomeField">
      <van-field class="slotRight" label="税后月收入(元)" required clearable :readonly="true" placeholder="请选择"
        v-model="customerName.customerMonthIncomeIdName" name="customerMonthIncomeId">
      </van-field>
    </section>
    <section class="incomeField">
      <van-field class="slotRight" label="工作地址(省)" required clearable :readonly="true" placeholder="请选择"
        v-model="customerName.customerWorkProcinveIdName" name="customerWorkProcinveId">
      </van-field>
    </section>
    <section class="incomeField">
      <van-field class="slotRight" label="工作地址(市)" required clearable :readonly="true" placeholder="请选择"
        v-model="customerName.customerWorkCityIdName" name="customerWorkCityId"></van-field>
    </section>
    <section class="incomeField">
      <van-field class="slotRight" label="工作地址(区)" required clearable :readonly="true" placeholder="请选择"
        v-model="customerName.customerWorkCountyIdName" name="customerWorkCountyId"></van-field>
    </section>
    <section class="incomeField pd2">
      <van-field label="工作详细地址" required clearable placeholder="请输入" v-model="workInfo.customerWorkAddress"
        name="customerWorkAddress"></van-field>
    </section>

    <section class="incomeField">
      <van-field class="slotRight" label="有无社会保障" required clearable :readonly="true" placeholder="请选择"
        v-model="customerName.weatherSocialSecurityName" name="weatherSocialSecurity">
      </van-field>
    </section>
    <section class="incomeField" :class="!productDiff.bqapInput?'btNone borderRadiusBtlr':''">
      <van-field class="slotRight" label="有无公积金" required clearable :readonly="true" placeholder="请选择"
        v-model="customerName.weatherAccumulationName" name="weatherAccumulation">
      </van-field>
    </section>
    <section class="incomeField btNone borderRadiusBtlr" v-if="productDiff.bqapInput">
      <van-field class="slotRight" label="入职时间" required clearable :readonly="true" placeholder="请选择"
        v-model="workInfo.customerHiredate"></van-field>
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
    getPreAuditStatus,
    selectProfessionListByTableId,
    selectProfessionListByPositionCode,
    getLoanOrientation,
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
      checkSheet(id, flag, prevId, cityId) {
        this.flag = flag
        this.id = id
        switch (flag) {
          case 0:
            this.provinceId = id
            this.province_show = true
            this.changeParams = {
              prevId: prevId,
              cityId: cityId,
            }
            break
          case 1:
            this.getCityList(this.workInfo[this.provinceId], id, prevId)
            break
          case 2:
            this.getCountyList(this.workInfo[this.cityId], id, prevId)
            break
          case 3:
            this.formatYesorno(id)
            break
          case 4:
            this.formatTS(id)
            break
          case 5:
            this.loanOrientName = cityId
            this.loanOrientCode = prevId
            console.log(this.workInfo['loanOrientation' + this.id + 'Id'])
            this._getLoanOrientation(
              this.workInfo['loanOrientation' + this.id + 'Id'],
              prevId,
              cityId
            )
            break
          default:
            this.id = id
            break
        }
      },
      getCityList(provinceId, id, prevId) {
        let prevIds = this.workInfo[prevId]
        if (prevIds == '') {
          this.$toast.fail('请先选择省份')
          return
        }
        this.cityId = id
        this.city_show = true
        this.id = id
        let province = this.filterAreas.find((item) => {
          return item.id == prevIds
        })
        this.cityList = []
        if (Object.keys(province.children).length == 1) {
          let arr = []
          for (var i in province.children) {
            this.cityList.push(province.children[i])
          }
        } else {
          for (var i in province.children) {
            this.cityList.push(province.children[i])
          }
        }
      },
      getCountyList(cityId, id, prevId) {
        let prevIds = this.workInfo[prevId]
        if (prevIds == '') {
          this.$toast.fail('请先选择城市')
          return
        }
        this.county_show = true
        this.id = id
        this.countyList = []
        let county = this.cityList.find((item) => {
          return item.id == cityId
        })
        if (county == undefined) {
          this._getYZTProvinceList(prevIds, 'countyList')
        } else {
          for (var i in county.children) {
            this.countyList.push(county.children[i])
          }
        }
      },
      _getLoanOrientation(parentId, prevId, name) {
        console.log(parentId, prevId, name)
        if (this.id == 1 && prevId == 'loanOrientation1Code') {
          parentId = 0
        }
        if (parentId === '' && prevId.indexOf('1') != 0) {
          this.$toast.fail('请先选择贷款投向一级')
          return
        }
        if (parentId === '' && prevId.indexOf('2') != 0) {
          this.$toast.fail('请先选择贷款投向二级')
          return
        }
        if (parentId === '' && prevId.indexOf('3') != 0) {
          this.$toast.fail('请先选择贷款投向三级')
          return
        }

        getLoanOrientation({
          parentId: parentId
        }).then((res) => {
          if (res.code != 0) {
            return
          }
          this.publicList = []
          for (var i in res.data) {
            let obj = {}
            obj.name = res.data[i].purpose
            obj.codeValue = res.data[i].codeValue
            obj.id = res.data[i].id
            this.publicList.push(obj)
          }
          this.public_show = true
        })
      },
      formatTS(id) {
        if (!this.workInfo.customerCompanyIndustry1Id) {
          this.$toast.fail('请先选择行业一级')
          return
        }
        if (!this.workInfo.customerCompanyIndustry2Id) {
          this.$toast.fail('请先选择行业二级')
          return
        }
        const params = {
          tableId: this.workInfo.customerCompanyIndustry1Id,
          code: this.workInfo.customerCompanyIndustry2Id,
        }
        selectProfessionListByTableId(params).then((res) => {
          if (res.code != 0) {
            return
          }
          this.publicList = []
          for (var i in res.data) {
            let obj = {}
            obj.name = res.data[i].positionName
            obj.id = res.data[i].positionCode
            this.publicList.push(obj)
          }
          this.public_show = true
          console.log(res)
        })
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
      formatYesorno(id) {
        this.id = id
        this.public_show = true
        let objList = {}
        switch (id) {
          case 'weatherSocialSecurity':
          case 'weatherAccumulation':
            objList = this.dics.hadOrNot
            break
          case 'isLegalPerson':
            objList = this.dics.yesorno
            break
          case 'customerWorkTypeId':
            objList = this.dics.yzt_worktype
            break
          case 'customerCompanyTypeId':
            objList = this.dics.yzt_companytype
            break
          case 'customerCompanyIndustry1Id':
            objList = this.dics.yzt_hangye1
            break
          case 'customerCompanyIndustry2Id':
            objList = this.getNextDic()
            break
          case 'customerDutyTypeId':
            objList = this.dics.yzt_dutytype
            break
          case 'customerWorkLifeId':
            objList = this.dics.yzt_worklife
            break
          case 'customerMonthIncomeId':
            objList = this.dics.yzt_monthincome
            break
          case 'weatherGuarantee':
          case 'weatherCotenant':
            objList = this.dics.hadOrNot
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

<style lang="less">
  .work-info {
    .snWrap {
      position: relative;

      .snInput {
        right: 0;
        top: 0;
        height: 98px;
        width: 120px;
        text-align: center;
        line-height: 108px;
        position: absolute;
        color: #23a394;
        display: inline-block;
      }
    }

    .title {
      padding: 20px 25px;
    }

    .btNone.incomeField {
      .van-cell {
        border: none
      }
    }

    .borderRadiusToplr {
      border-radius: 18px 18px 0 0;
    }

    .borderRadiusBtlr {
      border-radius: 0 0 18px 18px;
    }

    .incomeField {
      width: 710px;
      margin: 0px auto;
      background-color: #fff;

      .van-cell--required::before {
        top: 45px;
        left: -14px;
      }

      .van-cell {
        margin: 0px auto;
        padding: 10px 25px;
        font-size: 28px;
        display: flex;
        align-items: flex-start;
        position: relative;
        overflow: initial;
        width: 666px;
        padding: 0;
        border-bottom: 2px solid rgba(220, 220, 220, 1);

        .van-field__label {
          width: 210px;

          span {
            display: block;
            width: 210px;
            height: 50px;
            line-height: 55px;
            border-right: 2px solid rgba(220, 220, 220, 1);
            text-align: left;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

        .van-cell__title,
        .van-cell__value {
          height: 78px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          padding-top: 20px;
          overflow: initial;
        }

        .van-cell__value {
          position: initial;

          .van-field__body {
            width: 100%;
            height: 78px;
            padding: 0 20px;
            margin: -15px 0 0 0;

            .van-icon-clear {
              font-size: 30px;
            }
          }

          .van-field__control {
            height: 100%;
            line-height: 130%;
            font-size: 28px;
          }

          .van-field__error-message {
            background: #fff;
            position: absolute;
            left: 228px;
            bottom: -30px;
            font-size: 10px;
          }
        }
      }
    }

    .pd2 {
      padding-bottom: 2px;
    }
  }
</style>
