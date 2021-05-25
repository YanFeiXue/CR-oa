import { mapGetters, mapMutations } from 'vuex'
import { showLeaseForm, showLeaseForm_lease, leaseAdd, getYZTProvinceList, getProductInput, selectDictionary, pasteFieldRecord } from '@/api/api'
export const leaseFormMixin = {
  data() {
    return {
      leaseId: this.$route.query.leaseId,
      tokenId: sessionStorage.getItem('tokenid'),
      province_show: false,//省份flag
      city_show: false,    //城市flag
      county_show: false,  //乡镇flag
      public_show: false,  //公共数组
      cityList: [],        //城市列表
      countyList: [],      //乡镇列表
      publicList: [],      //公共列表
      minDate: new Date(1990, 10, 1),
      maxDate: new Date(),
      customerName: {
        leaseProvinceIdName: '', //进件地区
        leaseCityIdName: '',
        cardProvinceIdName: '',
        cardCityIdName: '',
        cardCountyIdName: '', //身份证地址(区)
        cardLongEffectiveIdName: '', //是否长期有效
        nationIdName: '', // 民族
        customerMarryStatusIdName: '', //婚姻状态
        localDomicileIdName: '', //是否本地户籍
        residentInformationIdName: '', //常驻资料
        spouseSunNumIdName: '', //子女状况
        liveProvinceIdName: '', //居住地区
        liveCityIdName: '', //
        liveCountyIdName: '',
        liveTypeIdName: '', //居住类型
        customerEduIdName: '', //学历
        homeProvinceIdName: '', //户籍地址
        homeCityIdName: '', //
        homeCountyIdName: '',
        isLegalPersonName: '',//是否为法人
        weatherGuaranteeName: '', //有误担保人
        weatherCotenantName: '', //承租人
        //workName
        customerWorkTypeIdName: '',
        customerCompanyTypeIdName: '',
        customerCompanyIndustry1IdName: '',
        customerCompanyIndustry2IdName: '',
        customerDutyTypeIdName: '',
        customerWorkLifeIdName: '',
        customerMonthIncomeIdName: '',
        customerWorkProcinveIdName: '',
        customerWorkCityIdName: '',
        customerWorkCountyIdName: '',
        weatherSocialSecurityName: '',
        weatherAccumulationName: '',
        //contactsName
        cotenantRelationIdName: '',
        cotenantLiveTypeIdName: '',
        cotenantLiveTypeIdName: '',
        cotenantLiveProvinceIdName: '',
        cotenantLiveCityIdName: '',
        cotenantLiveCountyIdName: '',
        guaranteeRelationIdName: '',
        guaranteeLiveTypeIdName: '',
        guaranteeLiveProvinceIdName: '',
        guaranteeLiveCityIdName: '',
        guaranteeLiveCountyIdName: '',
        spouseCompanyTypeIdName: '',
        spouseIndustryIdName: '',
        spouseWorkProvinceIdName: '',
        spouseWorkCityIdName: '',
        spouseWorkCountyIdName: '',
        spouseMonthIncomeIdName: '',
        linkman1RelationIdName: '',
        linkman2RelationIdName: '',
        linkman3RelationIdName: '',
        //carInfoName
        carUseNatureIdName: '',
        haveLicenseIdName: '',
        licenseWetherEffecIdName: '',
        carMainDriverIdName: '',
        productIdName: '',
        rentUseIdName: '',
        financialStatementIdName: '',
        applyExpiresIdName: '',
        platformFeeIdName: '0%',
        haveCreditReportIdName: '',
        bankNameIdName: '',
        servicePackName: "",
        insuranceFinanceName: '',
        carownerTypeName: '',
        loanWayIdName: '',
        predecessorCarownerTypeName: '',
        merchantIdName: '',
        spouseLocalDomicileIdName: '',
        flowRateName: '',
        fuelTypeName: '',
        vehTypeIdName: '',
        carAllowedPassenger: '',
      },
      customerInfo: {
        dealerMobile: '',
        leaseProvinceId: '',
        leaseCityId: '',
        leaseProvince: '',
        leaseCity: '',
        merchantIdName: '',
        customerName: '',
        customerCertno: '',
        customerMobile: '',
        cardProvinceId: '',
        cardCityId: '',
        cardCountyId: '',
        cardAddress: '',
        cardSignOrg: '',
        nationId: '',
        customerMarryStatusId: '',
        cardStartTime: '',
        cardEndTime: '',
        cardLongEffectiveId: '',
        localDomicileId: '',
        flowBankCard: '',
        residentInformationId: '',
        spouseSunNumId: '',
        liveProvinceId: '',
        liveCityId: '',
        liveCountyId: '',
        liveAddress: '',
        liveTypeId: '',
        customerEduId: '',
        homeProvinceId: '',
        homeCityId: '',
        homeCountyId: '',
        homeAddress: '',
        weatherGuarantee: '',
        weatherCotenant: '',
        familyTotal: '',//北汽安鹏  家庭人数
        creditLimit: '', //苏宁核批金额
        merchantId: '',
        //商户名称
        merchantName: '',
        //商户所在城市
        merchantCity: '',
        //商户经营地址
        merchantAddress: '',
      },
      workInfo: {
        customerWorkTypeId: "",
        customerWorkCompany: "",
        customerCompanyTypeId: "",
        customerCompanyIndustry1Id: "",
        customerCompanyIndustry2Id: "",
        customerDepartment: '',
        customerPosition: '',
        customerDutyTypeId: '',
        customerWorkLifeId: '',
        customerCompanyPhone: '',
        customerMonthIncome: '',
        customerMonthIncomeId: '',
        customerWorkProcinveId: '',
        customerWorkCityId: '',
        customerWorkCountyId: '',
        customerWorkAddress: '',
        isLegalPerson: '', //是否为法人
        businessLicenseCode: '',//经营执照编号
        weatherSocialSecurity: '',
        weatherAccumulation: '',
        customerHiredate: '', //安鹏 入职时间
        customerProfessionCode: '',
        loanOrientation1Name: '', //贷款投向一级
        loanOrientation1Code: '',
        loanOrientation1Id: 0,
        loanOrientation2Name: '', //贷款投向二级
        loanOrientation2Code: '',
        loanOrientation2Id: '',
        loanOrientation3Name: '', //贷款投向三级
        loanOrientation3Code: '',
        loanOrientation3Id: '',
        loanOrientation4Name: '', //贷款投向四级
        loanOrientation4Code: '',
        loanOrientation4Id: '',
      },
      contactsInfo: {
        //共同承租人
        weatherCotenant: '',

        cotenantName: '',
        cotenantCertno: '',
        cotenantRelationId: '',

        cotenantMobile: '',
        cotenantYearIncome: '',
        cotenantLiveTypeId: '',

        cotenantLiveProvinceId: '',
        cotenantLiveCityId: '',
        cotenantLiveCountyId: '',
        cotenantLiveAddress: '',

        weatherGuarantee: '',

        spouseName: '',
        spouseCertNo: '',
        spouseSunNumId: '',

        spouseMobile: '',
        spouseCompany: '',
        spouseCompanyPhone: '',

        spouseCompanyTypeId: '',
        spouseIndustryId: '',
        spousePosition: '',

        spouseWorkProvinceId: '',
        spouseWorkCityId: '',
        spouseWorkAddress: '',
        spouseEntryTime: '',
        spouseMonthIncomeId: '',
        guaranteeName: '',
        guaranteeCertno: '',
        guaranteeRelationId: '',

        guaranteeMobile: '',
        guaranteeYearIncome: '',
        guaranteeLiveTypeId: '',

        guaranteeLiveProvinceId: '',
        guaranteeLiveCityId: '',
        guaranteeLiveCountyId: '',
        guaranteeLiveAddress: '',

        linkman1Name: '',
        linkman1RelationId: '',
        linkman1Mobile: '',
        linkman1Address: '',

        linkman2Name: '',
        linkman2RelationId: '',
        linkman2Mobile: '',
        linkman2Address: '',

        linkman3Name: '',
        linkman3RelationId: '',
        linkman3Mobile: '',
        linkman3Address: '',
        spouseLocalDomicileId: ''

      },
      carInfo: {
        carVin: '',
        carAccess: '',
        kilometreNo: '',

        carLicense: '',
        carEngineNumber: '',
        carColor: '',
        carAllowedPassenger: '',

        leaveFactoryTime: '',
        firstRegisterTime: '',
        carYear: '',
        carMonth: '',

        carUseNatureId: '',
        carBrand: '',
        carSeries: '',

        carType: '',
        haveLicenseId: '',
        licenseWetherEffecId: '',

        carMainDriverId: '',
        drivingLicense: '',

        productId: '',
        rentUseId: '',
        applyAmount: '',
        financialStatementId: '',

        applyExpiresId: '',
        platformFeeId: 1,
        gpsFee: '',

        // 前台不展示的字段,但是依旧需要
        insuranceRate: '',
        insuranceAmount: '',
        bondRate: '',
        bondAmount: '',
        retainRate: '',
        retainAmount: '',

        serviceAmount: '',
        totalAmount: '',
        monthPayAmount: '',
        applyReceivableTheft: '', // 应收盗抢险金额
        recentSolutionMortgageDate: '',
        recentSolutionMortgageCompany: '',
        recentSolutionMortgageDays: '',
        carMortgageTimes: '',
        transferTimes: '',
        // 对应Gps台数需求,新增字段 一账通产品gps计费模式(2019.04.01 Baiguoqiang)
        gpsFeeBillMode: '',
        // gps设备型号,新增字段 所有产品都需要记录gps型号,gps下单时直接传递此字段即可
        gpsDeviceCode: '',
        haveCreditReportId: '',
        bankNameId: '',
        bankDetailAddr: '',
        bankCard: '',
        flowRate: '',
        carDamageInsurance: '',
        /**
         * 上任车主类型
         */
        predecessorCarownerType: '',
        /**
         * 上任车主姓名/公司名称
         */
        predecessorCarownerName: '',
        /**
         * 上任车主身份证号/组织机构代码证
         */
        predecessorCarownerCertno: '',
        /**
         * 车辆销售价
         */
        usedCarSellprice: '',
        //服务包
        servicePack: '',
        //保险融资
        insuranceFinance: '',
        prepayRent: '',
        modelPrice: '',
        prepayRentRate: '',
        loanWayId: '',
        theftAmount: '',//盗抢险
        guaranteeFee: '',  //担保费
        mediumPremium: '',//中保国信费
        fuelType: '',//燃料种类
        vehType: ''//车型
      },
      remarkInfo: {
        remark: ''
      },
      targeData: {},
    }
  },
  inject: ['reload'],
  computed: {
    filterAreas() {
      let arr = []
      for (var i in this.area.children) {
        arr.push(this.area.children[i])
      }
      return arr
    },
    ...mapGetters(['yizhangtongForm', 'isCheckLeaseForm', 'product', 'sessionData', 'productDiff', 'activeIndex', 'dics', 'area'])
  },
  mounted() {
    var YDB = new YDBOBJ()
    YDB.SetDragRefresh(0)
  },
  methods: {
    next(sourceData, stepIndex) {
      const isEquals = this.comparedEqualData(
        this.sessionData,
        sourceData
      )
      if (isEquals) {
        return
      }
      this.$validator.validate().then(valid => {
        if (valid) {
          this.setYiZhangTongFormToTargeData(
            this.yizhangtongForm,
            this.targeData
          )
          for (let Key in sourceData) {
            this.targeData[Key] = sourceData[Key]
          }
          if (!this.leaseId && !this.$store.getters.leaseId) {
            this.leaseId = this.uuid()
          } else {
            if (!this.leaseId) {
              this.leaseId = this.$store.getters.leaseId
            }
          }
          let parm = Object.assign(this.targeData, { customerCertno: this.customerInfo.customerCertno, leaseId: this.leaseId, productCode: this.product.productCode, tokenId: this.tokenId, productVersion: this.product.productVersion, productId: this.product.productId })
          const map = {
            dataMap: parm, // 大的Map
            checkMap: sourceData, // 小的Map
            stepIndex: stepIndex // 下标
          }
          leaseAdd(map).then(result => {
            if (result.code != 0) {
              this.$toast.fail(result.msg)
              return
            }
            this.$toast.success(result.msg)
            this.setSessionData(JSON.parse(JSON.stringify(sourceData)))
            this.showLeaseForm()
            this.$emit('tab' + stepIndex, stepIndex + 1)
          })
        } else {
          this.$toast.fail('请检查表单项')
        }
      })
    },

    _getYZTProvinceList(parentId, id) {
      getYZTProvinceList({ parentId: parentId }).then(res => {
        if (res.code != 0) {
          return
        }
        this[id] = res.data.list
      })
    },
    comparedEqualData(sourceData, targeData) {
      // 对两组数据进行比对如果两组数据由不相等的情况，则定义为输入为输入内容有变化
      for (let key in targeData) {
        if (targeData[key] != sourceData[key]) {
          // 说明两个对象间的数据存在变化
          return false
        }
      }
      // 当前页数据较原数据无误
      return true
    },
    showLeaseForm() {
      if (!this.leaseId && !this.$store.getters.leaseId) {
        return
      }
      if (this.$route.query.incoming == 'false') {
        showLeaseForm_lease({
          leaseId: this.leaseId || this.$store.getters.leaseId
        }).then(data => {
          if (data.code != 0) {
            return
          }
          this.clearAllToast()
          this.showLeaseCallBack(data.data)
        })
      } else {
        showLeaseForm({
          leaseId: this.leaseId || this.$store.getters.leaseId
        }).then(data => {
          if (data.code != 0) {
            return
          }
          this.clearAllToast()
          this.showLeaseCallBack(data.data)
        })
      }
    },
    showLeaseCallBack(sourseData) {
      let obj = this.yizhangtongForm
      this.getValueFromLeaseForm(obj, sourseData)
      obj.carInfo.productId = sourseData.productId
      obj.carInfo.applyExpiresId = sourseData.applyExpiresId
      obj.applyNo = sourseData.applyNo
      this.setLeaseForm(obj)
      this.setLeaseId(this.leaseId)
    },
    clearAllToast() {
      setTimeout(() => {
        this.$toast.clear()
      }, 500)
    },
    //不同产品___字段
    _getProductInput() {
      getProductInput({
        productId: this.product.productId,
        productVersion: this.product.productVersion
      }).then(data => {
        if (data.code != 0) {
          return
        }
        const inputParams = {
          snInput: data.data.snInput,
          productCInput: data.data.productCInput,
          bqapInput: data.data.bqapInput,
          insureInput: data.data.insureInput,
          tssnInput: data.data.tssnInput,
          operatingLoanInput: data.data.operatingLoanInput,
          aplhInput: data.data.aplhInput,
          tsytInput: data.data.tsytInput,
          directlyProductInput: data.data.directlyProductInput,
          lhInput: data.data.lhInput
        }
        this.setProductDiff(inputParams)
        if (data.data.bqapInput) {
          this.getBankList(inputParams)
        }
        if(data.data.lhInput) {
          this.getBankList(inputParams, 80) // 蓝海还款卡开户银行
        }
        //苏宁产品 先生成uid
        if (data.data.snInput) {
          this.setLeaseId(this.uuid())
        }
      })
    },
    pasteRecord(field) {
      if (!this.leaseId && !this.$store.getters.leaseId) {
        return
      }
      const params = {
        "leaseId": this.leaseId || this.$store.getters.leaseId,
        "field": field
      }
      pasteFieldRecord(params).then((res) => {
        if (res != 0) {
          return
        }
      })
    },
    getBankList(inputParams, type) {
      if(type == 80) {
        var typeParams = {
          // 蓝海专用扣款银行类型(d_dictionary_table表 => id = 80)
          id: '80'
        }
      } else {
        var typeParams = {
          // 北汽安鹏专用扣款银行类型(d_dictionary_table表 => id = 68)
          id: '69'
        }
      }
      selectDictionary(typeParams).then(data => {
        inputParams.bankList = data.list
        this.setProductDiff(inputParams)
      })
    },
    getValueFromLeaseForm(data, targeData) {
      // 可能为该对象的子对象，继续遍历
      for (var Key in data) {
        if (typeof data[Key] != 'object') {
          data[Key] = targeData[Key]
        } else {
          this.getValueFromLeaseForm(data[Key], targeData)
        }
      }
    },
    setYiZhangTongFormToTargeData(data, targeData) {
      // 可能为该对象的子对象，继续遍历
      for (var Key in data) {
        if (typeof data[Key] != 'object') {
          targeData[Key] = data[Key]
        } else {
          this.setYiZhangTongFormToTargeData(data[Key], targeData)
        }
      }
    },
    formatAreaId(id, idVal, objMsg) {
      for (var i in objMsg) {
        if (objMsg.hasOwnProperty(idVal)) {
          this.customerName[id + 'Name'] = objMsg[idVal].name || ''
        } else {
          this.formatAreaId(id, idVal, objMsg[i].children)
        }
      }
    },
    uuid() {
      var s = []
      var hexDigits = '0123456789abcdef'
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = ''

      var uuid = s.join('')
      return uuid
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
    ...mapMutations({
      setLeaseForm: 'SET_LEASEFORM',
      setLeaseFormFlag: 'SET_ISCHECKLEASEFORM',
      setLeaseId: 'SET_LEASEID',
      setSessionData: 'SET_SESSIONDATA',
      setProductDiff: 'SET_PRODUCTDIFF',
      setProduct: 'SET_PRODUCT',
      setActiveIndex: 'SET_ACTIVEINDEX',
    })
  }
}
