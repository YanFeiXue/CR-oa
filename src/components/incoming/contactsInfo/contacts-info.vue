<template>
  <section class="contacts-info">
    <div class="incomeField_body" v-if="cotenant_form_flag">
      <header class="title">共同承租人信息</header>
      <section class="incomeField borderRadiusToplr pd2">
        <van-field label="共同承租人姓名" clearable placeholder="请输入" v-model="contactsInfo.cotenantName"
          name="cotenantName"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="身份证号" clearable placeholder="请输入" v-model="contactsInfo.cotenantCertno"
         name="cotenantCertno"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="与申请人关系" class="slotRight" clearable :readonly="true" placeholder="请选择"
          v-model="customerName.cotenantRelationIdName" name="cotenantRelationId"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="手机号码" clearable placeholder="请输入" v-model="contactsInfo.cotenantMobile" name="cotenantMobile"></van-field>
      </section>
      <section class="incomeField">
        <van-field class="slotRight" label="居住地址(省)" clearable :readonly="true" placeholder="请选择"
          v-model="customerName.cotenantLiveProvinceIdName"
          name="cotenantLiveProvinceId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field class="slotRight" label="居住地址(市)" clearable :readonly="true" placeholder="请选择"
          v-model="customerName.cotenantLiveCityIdName"
          name="cotenantLiveCityId"></van-field>
      </section>
      <section class="incomeField">
        <van-field class="slotRight" label="居住地址(区)" clearable :readonly="true" placeholder="请选择"
          v-model="customerName.cotenantLiveCountyIdName"
          name="cotenantLiveCountyId"></van-field>
      </section>
      <section class="incomeField btNone borderRadiusBtlr pd2">
        <van-field label="居住详细地址" clearable placeholder="请输入" v-model="contactsInfo.cotenantLiveAddress"
          name="cotenantLiveAddress">
        </van-field>
      </section>
    </div>
    <div class="incomeField_body" v-if="guarantee_form_flag">
      <header class="title">担保人信息</header>
      <section class="incomeField borderRadiusToplr pd2">
        <van-field label="担保人姓名" clearable placeholder="请输入" v-model="contactsInfo.guaranteeName"
          name="guaranteeName"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="身份证号" clearable placeholder="请输入" v-model="contactsInfo.guaranteeCertno" name="guaranteeCertno"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="与申请人关系" class="slotRight" clearable :readonly="true" placeholder="请选择"
          v-model="customerName.guaranteeRelationIdName" name="guaranteeRelationId"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="手机号码" clearable placeholder="请输入" v-model="contactsInfo.guaranteeMobile" name="guaranteeMobile">
        </van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="税后年收入" clearable placeholder="请输入" v-model="contactsInfo.guaranteeYearIncome"
          name="guaranteeYearIncome">
        </van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="居住类型" class="slotRight" clearable :readonly="true" placeholder="请选择"
          v-model="customerName.guaranteeLiveTypeIdName" name="guaranteeLiveTypeId"></van-field>
      </section>
      <section class="incomeField">
        <van-field class="slotRight" label="居住地址(省)" clearable :readonly="true" placeholder="请选择"
          v-model="customerName.guaranteeLiveProvinceIdName"
          name="guaranteeLiveProvinceId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field class="slotRight" label="居住地址(市)" clearable :readonly="true" placeholder="请选择"
          v-model="customerName.guaranteeLiveCityIdName"name="guaranteeLiveCityId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field class="slotRight" label="居住地址(区)" clearable :readonly="true" placeholder="请选择"
          v-model="customerName.guaranteeLiveCountyIdName"
          name="guaranteeLiveCountyId"></van-field>
      </section>
      <section class="incomeField btNone borderRadiusBtlr pd2">
        <van-field label="居住详细地址" clearable placeholder="请输入" v-model="contactsInfo.guaranteeLiveAddress"
          name="guaranteeLiveAddress">
        </van-field>
      </section>
    </div>
    <div class="incomeField_body" v-if="spouse_form_flag">
      <header class="title">配偶基本信息</header>
      <section class="incomeField borderRadiusToplr pd2">
        <van-field label="姓名" clearable placeholder="请输入"
          v-model="contactsInfo.spouseName" name="userName1"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="身份证号" clearable placeholder="请输入" v-model="contactsInfo.spouseCertNo" name="spouseCertNo"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="手机号码" clearable placeholder="请输入"
          v-model="contactsInfo.spouseMobile" name="spouseMobile"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="工作单位名称" clearable placeholder="请输入" v-model="contactsInfo.spouseCompany"
          name="spouseCompany"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="工作单位电话" clearable placeholder="请输入" v-model="contactsInfo.spouseCompanyPhone" name="spouseCompanyPhone"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="入职时间" :readonly="true" placeholder="请输入"
          v-model="contactsInfo.spouseEntryTime" name="spouseEntryTime"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="公司类型" class="slotRight" clearable :readonly="true" placeholder="请选择"
          v-model="customerName.spouseCompanyTypeIdName" name="spouseCompanyTypeId"></van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="所属行业" class="slotRight" clearable :readonly="true" placeholder="请选择"
          v-model="customerName.spouseIndustryIdName" name="spouseIndustryId">
        </van-field>
      </section>
      <section class="incomeField pd2">
        <van-field label="职位" clearable placeholder="请输入" v-model="contactsInfo.spousePosition"
          name="spousePosition"></van-field>
      </section>
      <section class="incomeField pd2" v-if="productDiff.bqapInput">
        <van-field label="户籍是否本地" class="slotRight" clearable :readonly="true" placeholder="请选择"
          v-model="customerName.spouseLocalDomicileIdName" name="spouseLocalDomicileId"></van-field>
      </section>
      <section class="incomeField" v-if="productDiff.bqapInput">
        <van-field class="slotRight" label="税后月收入(元)" clearable :readonly="true" placeholder="请选择"
          v-model="customerName.spouseMonthIncomeIdName"
          name="spouseMonthIncomeId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field class="slotRight" label="居住地址(省)" clearable :readonly="true" placeholder="请选择"
          v-model="customerName.spouseWorkProvinceIdName"
          name="spouseWorkProvinceId">
        </van-field>
      </section>
      <section class="incomeField">
        <van-field class="slotRight" label="居住地址(市)" clearable :readonly="true" placeholder="请选择"
          v-model="customerName.spouseWorkCityIdName"
          name="spouseWorkCityId"></van-field>
      </section>
      <section class="incomeField">
        <van-field class="slotRight" label="居住地址(区)" clearable :readonly="true" placeholder="请选择"
          v-model="customerName.spouseWorkCountyIdName"
          name="spouseWorkCountyId">
        </van-field>
      </section>
      <section class="incomeField btNone borderRadiusBtlr pd2">
        <van-field label="工作详细地址" clearable placeholder="请输入" v-model="contactsInfo.spouseWorkAddress"
          name="spouseWorkAddress"></van-field>
      </section>
    </div>
    <div class="incomeField_body">
      <header class="title">联系人信息</header>
      <div title="联系人1">
        <section class="incomeField borderRadiusToplr pd2">
          <van-field label="联系人1姓名" clearable placeholder="请输入" v-model="contactsInfo.linkman1Name"
            name="linkman1Name"></van-field>
        </section>
        <section class="incomeField pd2">
          <van-field label="联系人1关系" class="slotRight" clearable :readonly="true" placeholder="请选择"
            v-model="customerName.linkman1RelationIdName" name="linkman1RelationId"></van-field>
        </section>
        <section class="incomeField pd2">
          <van-field label="联系人1电话" clearable placeholder="请输入" v-model="contactsInfo.linkman1Mobile" name="linkman1Mobile">
          </van-field>
        </section>
        <section class="incomeField pd2">
          <van-field label="联系人1住址" clearable placeholder="请输入" v-model="contactsInfo.linkman1Address"
            name="linkman1Address"></van-field>
        </section>
      </div>
      <div title="联系人2">
        <section class="incomeField pd2">
          <van-field label="联系人2姓名" clearable placeholder="请输入" v-model="contactsInfo.linkman2Name"
            name="linkman2Name"></van-field>
        </section>
        <section class="incomeField pd2">
          <van-field label="联系人2关系" class="slotRight" clearable :readonly="true" placeholder="请选择"
            v-model="customerName.linkman2RelationIdName" name="linkman2RelationId"></van-field>
        </section>
        <section class="incomeField pd2">
          <van-field label="联系人2电话" clearable placeholder="请输入" v-model="contactsInfo.linkman2Mobile" name="linkman2Mobile">
          </van-field>
        </section>
        <section class="incomeField pd2">
          <van-field label="联系人2住址" clearable placeholder="请输入" v-model="contactsInfo.linkman2Address"
            name="linkman2Address"></van-field>
        </section>
      </div>
      <div title="联系人3" v-if="!spouse_form_flag">
        <section class="incomeField pd2">
          <van-field label="联系人3姓名" clearable placeholder="请输入" v-model="contactsInfo.linkman3Name"
            name="linkman3Name"></van-field>
        </section>
        <section class="incomeField pd2">
          <van-field label="联系人3关系" class="slotRight" clearable :readonly="true" placeholder="请选择"
            v-model="customerName.linkman3RelationIdName" name="linkman3RelationId"></van-field>
        </section>
        <section class="incomeField pd2">
          <van-field label="联系人3电话" clearable placeholder="请输入" v-model="contactsInfo.linkman3Mobile" name="linkman3Mobile">
          </van-field>
        </section>
        <section class="incomeField btNone borderRadiusBtlr pd2">
          <van-field label="联系人3住址" clearable placeholder="请输入" v-model="contactsInfo.linkman3Address" name="linkman3Address"></van-field>
        </section>
      </div>
    </div>

    <!-- 地址公用sheet -->
    <!-- <van-action-sheet v-model="province_show" cancel-text="取消" :actions="filterAreas" @select="onSelect_province" />
    <van-action-sheet v-model="city_show" cancel-text="取消" :actions="cityList" @select="onSelect_province" />
    <van-action-sheet v-model="county_show" cancel-text="取消" :actions="countyList" @select="onSelect_province" />
    <van-action-sheet v-model="public_show" cancel-text="取消" :actions="publicList" @select="onSelect_province" />
    <van-popup v-model="spouseEntryTimeFlag" label="入职时间" round position="bottom" :overlay="true">
      <van-datetime-picker v-model="spouseEntryTime" confirm-button-text="确认" cancel-button-text="取消"
        @confirm="spouseEntryTimeFlag = !spouseEntryTimeFlag" @cancel="spouseEntryTimeFlag = !spouseEntryTimeFlag"
        @change="spouseEntryTimeChange()" type="date" :min-date="minDate" :max-date="maxDate" />
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
  Vue.use(ActionSheet)
    .use(Field)
    .use(DatetimePicker)
    .use(Popup)
  import {
    leaseAdd,
    getPreAuditStatus
  } from '@/api/api'
  import {
    leaseFormMixin
  } from '@/util/mixins'
  export default {
    name: 'contacts-info',
    mixins: [leaseFormMixin],
    data() {
      return {
        spouseEntryTimeFlag: false,
        spouseEntryTime: '',
        spouse_form_flag: false,
        cotenant_form_flag: false, //共同承租人
        guarantee_form_flag: false //担保人
      }
    },
    props: {
      updateData: {
        type: Number,
        default: 0
      }
    },
    mounted() {
      this.formatCustomerFlag()
    },
    methods: {
      formatCustomerFlag() {
        if (this.isCheckLeaseForm == true) {
          this.contactsInfo = this.yizhangtongForm.contactsInfo
          for (let i in this.contactsInfo) {
            this.formatEchoMsgById(i)
          }
          this.$validator.validate().then(valid => {})
        }
        const customerInfo = this.yizhangtongForm.customerInfo
        customerInfo.weatherCotenant == 1 ?
          (this.cotenant_form_flag = true) :
          (this.cotenant_form_flag = false)
        customerInfo.weatherGuarantee == 1 ?
          (this.guarantee_form_flag = true) :
          (this.guarantee_form_flag = false)
        if (
          customerInfo.customerMarryStatusId == 1 ||
          customerInfo.customerMarryStatusId == 3 ||
          customerInfo.customerMarryStatusId == 4
        ) {
          this.spouse_form_flag = false
        }
        if (
          customerInfo.customerMarryStatusId == 2 ||
          customerInfo.customerMarryStatusId == 5
        ) {
          this.spouse_form_flag = true
        }
      },
      leaseAddPage() {
        this.$validator.validate().then(valid => {
          if (valid) {
            if (this.spouse_form_flag) {
              const dateFormatTime = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/
              const dateFormatDate = /^(\d{4})-(\d{2})-(\d{2})$/
              if (!dateFormatTime.test(this.contactsInfo.spouseEntryTime) && !dateFormatDate.test(this.contactsInfo
                  .spouseEntryTime)) {
                this.$toast.fail('配偶入职时间有误')
                return
              }
            }
            this.next(this.contactsInfo, 2)
          } else {
            this.$toast.fail('请检查表单项')
          }
        })
      },
      checkSheet(id, flag, prevId, cityId) {
        switch (flag) {
          case 0:
            this.provinceId = id
            this.province_show = true
            this.id = id
            this.flag = flag
            this.changeParams = {
              prevId: prevId,
              cityId: cityId
            }
            break
          case 1:
            this.getCityList(this.contactsInfo[this.provinceId], id, prevId)
            break
          case 2:
            this.getCountyList(this.contactsInfo[this.cityId], id, prevId)
            break
          case 3:
            this.formatYesorno(id)
            break
          default:
            this.id = id
            break
        }
      },
      getCityList(provinceId, id, prevId) {
        let prevIds = this.contactsInfo[prevId]
        if (prevIds == '') {
          this.$toast.fail('请先选择省份')
          return
        }
        this.cityId = id
        this.city_show = true
        this.id = id
        let province = this.filterAreas.find(item => {
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
        let prevIds = this.contactsInfo[prevId]
        if (prevIds == '') {
          this.$toast.fail('请先选择城市')
          return
        }
        this.county_show = true
        this.id = id
        this.countyList = []
        let county = this.cityList.find(item => {
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
      formatYesorno(id) {
        this.id = id
        this.public_show = true
        let objList = {}
        switch (id) {
          case 'cotenantRelationId':
            objList = this.dics.yzt_relation
            break
          case 'cotenantLiveTypeId':
            objList = this.dics.yzt_livestatus
            break
          case 'guaranteeRelationId':
            objList = this.dics.yzt_relation
            break
          case 'guaranteeLiveTypeId':
            objList = this.dics.yzt_livestatus
            break
          case 'spouseCompanyTypeId':
            objList = this.dics.yzt_companytype
            break
          case 'spouseLocalDomicileId':
            objList = this.dics.yesorno
            break

          case 'spouseIndustryId':
            objList = this.dics.yzt_hangye1
            break
          case 'spouseMonthIncomeId':
            objList = this.dics.yzt_monthincome
            break
          case 'linkman1RelationId':
            objList = this.dics.yzt_relation
            break
          case 'linkman2RelationId':
            objList = this.dics.yzt_relation
            break
          case 'linkman3RelationId':
            objList = this.dics.yzt_relation
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
        const idVal = this.contactsInfo[id]
        switch (id) {
          case 'cotenantRelationId':
            objMsg = this.dics.yzt_relation
            break
          case 'cotenantLiveTypeId':
            objMsg = this.dics.yzt_livestatus
            break
          case 'guaranteeRelationId':
            objMsg = this.dics.yzt_relation
            break
          case 'guaranteeLiveTypeId':
            objMsg = this.dics.yzt_livestatus
            break
          case 'spouseCompanyTypeId':
            objMsg = this.dics.yzt_companytype
            break
          case 'spouseLocalDomicileId':
            objMsg = this.dics.yesorno
            break
          case 'spouseIndustryId':
            objMsg = this.dics.yzt_hangye1
            break
          case 'spouseMonthIncomeId':
            objMsg = this.dics.yzt_monthincome
            break
          case 'linkman1RelationId':
            objMsg = this.dics.yzt_relation
            break
          case 'linkman2RelationId':
            objMsg = this.dics.yzt_relation
            break
          case 'linkman3RelationId':
            objMsg = this.dics.yzt_relation
            break
          case 'cotenantLiveProvinceId':
          case 'cotenantLiveCityId':
          case 'cotenantLiveCountyId':
          case 'guaranteeLiveProvinceId':
          case 'guaranteeLiveCityId':
          case 'guaranteeLiveCountyId':
          case 'spouseWorkCityId':
          case 'spouseWorkCountyId':
          case 'spouseWorkProvinceId':
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
        const parentId = this.contactsInfo.customerCompanyIndustry1Id
        if (parentId == '') {
          this.public_show = false
          this.$toast.fail('请先选择所属行业(一级)')
          return
        }
        const obj = this.dics[this.dics.yzt_hangye1[parentId].itemIds]
        return obj
      },
      onSelect_province(item) {
        this.province_show = this.city_show = this.county_show = this.public_show = false
        if (this.flag == 0) {
          if (this.contactsInfo[this.id] == item.id) {
            this.flag = 1
          } else {
            if (this.changeParams.cityId) {
              this.contactsInfo[this.changeParams.cityId] = ''
              this.customerName[this.changeParams.cityId + 'Name'] = ''
            }
            this.contactsInfo[this.changeParams.prevId] = ''
            this.customerName[this.changeParams.prevId + 'Name'] = ''
            this.flag = 1
          }
          if (item.name == '北京市') {
            this.contactsInfo[this.changeParams.prevId] = '110100'
            this.customerName[this.changeParams.prevId + 'Name'] = '市辖区'
          } else if (item.name == '天津市') {
            this.contactsInfo[this.changeParams.prevId] = '120100'
            this.customerName[this.changeParams.prevId + 'Name'] = '市辖区'
          }
        }
        this.contactsInfo[this.id] = item.id
        this.customerName[this.id + 'Name'] = item.name
      },
      spouseEntryTimeChange() {
        this.contactsInfo.spouseEntryTime = this.confirmPicker(
          this.spouseEntryTime
        )
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .contacts-info{
    margin-top: 16px;
    .incomeField_body{
      width: 702px;
      margin: 24px auto;
      background: #FFFFFF;
      box-shadow: 0px 0px 40px 0px rgba(231,231,231,1);
      border-radius: 24px;
      .title{
        height: 82px;
        line-height: 82px;
        padding: 0 0 0 32px;
        font-size: 30px;
        font-weight: bold;
        color: #333333;
        border-bottom: 1px solid #F3F3F3;
      }
      .incomeField{
        height: 100px;
        border-bottom: 1px solid #F3F3F3;
        /deep/{
          .van-cell{
            line-height: 100px;
            width: 100%;
            font-size: 28px;
            color: #666666;
            padding: 0 32px;
            .van-cell__title{
              width: 250px;
            }
            .van-cell__value{
              .van-field__body{
                input{
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
