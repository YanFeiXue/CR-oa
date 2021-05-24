<template>
  <section class="remark-info">
    <section class="incomeField borderRadius18 btNone textareaStyle pd2">
      <van-field clearable placeholder="请输入备注" autosize type="textarea" v-model="remarkInfo.remark" name="remark">
      </van-field>
    </section>
    <div v-if="!incoming">
      <header class="title">提交意见:</header>
      <section class="incomeField borderRadius18 btNone textareaStyle pd2">
        <van-field clearable placeholder="请输入提交意见" autosize type="textarea" v-model="dealerMsg" name="dealerMsg">
        </van-field>
      </section>
    </div>

    <!-- <section class="flex jc-sr">
      <van-button @click="leaseAddPage()">保存</van-button>
      <van-button @click="incoming ? _leaseCommit() : _dealerCommit()" :disabled="disabledFlag" :loading="loadFlag"
        loading-text="提交中">提交流程</van-button>
      <van-button @click="_toUpload()">上传影像件</van-button>
    </section> -->
  </section>
</template>

<script>
  import Vue from 'vue'
  import {
    ActionSheet,
    Field
  } from 'vant'
  Vue.use(ActionSheet).use(Field)
  import {
    leaseCommit,
    dealerCommit,
    getFileListByTypeId,
    commitCheckFiles,
    createChe300CarAccessPDF,
    downLoadOcrFileFromOss,
  } from '../../api/api'
  import {
    leaseFormMixin
  } from '@/util/mixins'
  export default {
    name: 'remark-info',
    mixins: [leaseFormMixin],
    data() {
      return {
        title: '备注信息',
        loadFlag: false,
        disabledFlag: false,
        overViewData: '',
        dealerMsg: '',
        incoming: '',
      }
    },
    props: {
      validFlag: {
        type: Boolean,
        default: false,
      },
    },
    created() {
      if (this.$route.query.incoming == 'false') {
        this.incoming = false
      } else {
        this.incoming = true
      }
      this.remarkInfo = this.yizhangtongForm.remarkInfo
    },
    methods: {
      verifyMobile() {
        this.verifyMobileFlag = true
      },
      leaseAddPage() {
        if (
          this.remarkInfo.remark == '' ||
          this.yizhangtongForm.remarkInfo.remark == ''
        ) {
          this.$toast.fail('备注信息不能为空!')
          return
        }
        this.next(this.remarkInfo, 4)
      },

      _leaseCommit() {
        this.flag = true
        if (this.remarkInfo.remark == '') {
          this.$toast.fail('请先保存备注信息')
          return
        }
        const _this = this
        this.loadFlag = true

        function isCommit() {
          return new Promise(function(resolve, reject) {
            _this.getPictureNumber().then((data) => {
              if (data) {
                resolve(data)
              } else {
                _this.loadFlag = false
                reject()
              }
            })
          }).catch((e) => {})
        }
        isCommit()
          .then((flag) => {
            return new Promise(function(resolve, reject) {
              if (flag) {
                _this._downLoadOcrFileFromOss().then((res) => {
                  resolve(res)
                })
              } else {
                _this.loadFlag = false
                reject()
              }
            })
          })
          .then((flag) => {
            return new Promise(function(resolve, reject) {
              if (flag) {
                _this._commitCheckFiles().then((res) => {
                  resolve(res)
                })
              } else {
                _this.loadFlag = false
                reject()
              }
            })
          })
          .then((flag) => {
            if (flag) {
              this.setYiZhangTongFormToTargeData(
                this.yizhangtongForm,
                this.targeData
              )
              this.targeData.leaseId = this.leaseId || this.$store.getters.leaseId
              this.targeData.productCode = this.product.productCode
              this.targeData.tokenId = this.tokenId
              this.createCh300Report(this.targeData, '0')
              var parm = {
                leaseId: this.leaseId || this.$store.getters.leaseId,
                productCode: this.product.productCode,
                tokenId: this.tokenId,
                productVersion: this.product.productVersion,
                msg: this.remarkInfo.remark,
                dataMap: this.targeData,
              }
              leaseCommit(parm).then((result) => {
                if (result.code != 0) {
                  this.$toast.fail(result.msg)
                  if (result.code == '9999') {
                    this.setProduct({
                      productVersion: result.data.version,
                      productCode: this.product.productCode,
                      productId: this.product.productId,
                    })
                  }
                  this.loadFlag = false
                  return
                }

                setTimeout(() => {
                  this.$router.push('/pageMain/approval-success')
                }, 1000)
                this.disabledFlag = true
                this.$toast.success(result.msg)
              })
            } else {
              _this.loadFlag = false
            }
          })
          .catch((e) => {})
      },
      _dealerCommit() {
        if (!this.dealerMsg) {
          this.$toast.fail('请输入提交意见')
          return
        }
        if (!this.yizhangtongForm.carInfo.carVin) {
          this.$toast.fail('请检查车辆信息')
          return
        }
        this._commitCheckFiles().then((data) => {
          if (data) {
            this.loadFlag = true
            this.setYiZhangTongFormToTargeData(
              this.yizhangtongForm,
              this.targeData
            )
            //先生成PDF
            this.createCh300Report(this.targeData, '1')
            const params = {
              leaseId: this.leaseId || this.$store.getters.leaseId,
              productCode: this.product.productCode,
              statusId: '2',
              dealerMsg: this.dealerMsg,
              vin: this.yizhangtongForm.carInfo.carVin,
              tokenId: this.tokenId,
            }
            dealerCommit(params).then((result) => {
              if (result.code != 0) {
                this.$toast.fail(result.msg)
                return
              }
              setTimeout(() => {
                this.$router.push('/pageMain/process')
              }, 1000)
              this.disabledFlag = true
              this.$toast.success(result.msg)
            })
          }
        })
      },
      createCh300Report(obj, isReload) {
        let carInfo = obj
        let useNatureName
        for (let i in this.dics.yzt_caruse) {
          if (this.dics.yzt_caruse[i].itemId == carInfo.carUseNatureId) {
            useNatureName = this.dics.yzt_caruse[i].itemName
          }
        }
        let data = {
          code: 'che300EvalPriceByVIN',
          brandName: carInfo.carBrand,
          seriesName: carInfo.carSeries,
          newCaiPrice: parseFloat(carInfo.modelPrice / 10000).toFixed(2),
          evalPrice: carInfo.carAccess / 10000,
          vin: carInfo.carVin,
          carNo: carInfo.carLicense,
          engineNumber: carInfo.carEngineNumber,
          regDate: carInfo.firstRegisterTime,
          carAge: `${carInfo.carYear}年${carInfo.carMonth}个月`,
          mileage: carInfo.kilometreNo,
          carColor: carInfo.carColor,
          useNature: useNatureName,
          tradeNumber: carInfo.transferTimes,
          leaseId: this.leaseId || this.$store.getters.leaseId,
          typeId: '26',
          systemId: this.product.productCode,
          tokenId: sessionStorage.getItem('tokenid'),
          isReload: isReload,
        }
        createChe300CarAccessPDF(data).then((res) => {
          // if (res.code == '0') {
          //   this.$toast.success('生成车300评估报告成功')
          // } else {
          //   this.$toast.fail('生成车300评估报告失败')
          // }
        })
      },
      async getPictureNumber() {
        let data = {
          leaseId: this.leaseId || this.$store.getters.leaseId,
          tokenId: this.tokenId,
          typeId: '26',
        }
        let i = 0
        let flag = false
        const test = await getFileListByTypeId(data).then((res) => {
          if (res) {
            res.data.forEach((item, index) => {
              let name = item.fileName.substring(
                item.fileName.lastIndexOf('.') + 1
              )
              if (name != 'pdf') {
                i++
              }
            })
            if (i < 15) {
              this.$toast.fail('车辆图片少于15张,无法提交')
            } else {
              flag = true
            }
            return flag
          }
        })
        return test
      },
      async _commitCheckFiles() {
        const isTrue = await commitCheckFiles({
          leaseId: this.leaseId || this.$store.getters.leaseId,
        }).then((data) => {
          if (data.code == 0) {
            return true
          } else {
            this.$toast.fail(data.msg)
            return false
          }
        })
        return isTrue
      },

      async _downLoadOcrFileFromOss() {
        const ocrForm = {
          leaseId: this.leaseId || this.$store.getters.leaseId,
          tokenId: this.tokenId,
          productCode: this.product.productCode,
          eId: this.$route.query.eId,
        }
        const isLoadOcrForm = await downLoadOcrFileFromOss(ocrForm).then(
          (data) => {
            if (data.code == 0) {
              console.log(data)
              return true
            } else {
              this.$toast.fail(data.msg)
              return false
            }
          }
        )
        return isLoadOcrForm
      },
      _toUpload() {
        if (!this.leaseId) {
          this.$toast.fail('请先保存一项内容!')
          return
        }
        const routeParams = {
          path: 'uploadFile',
          query: {
            productCode: this.product.productCode,
            leaseId: this.leaseId || this.$store.getters.leaseId,
            certNo: this.$route.query.certNo,
            productId: this.product.productId,
            incoming: this.$route.query.incoming,
            applyNo: this.yizhangtongForm.applyNo,
            productVersion: this.product.productVersion,
            eId: this.$route.query.eId,
          },
        }
        this.setActiveIndex(4)
        this.$router.push(routeParams)
      },
    },
    watch: {},
  }
</script>

<style lang="less">
  .remark-info {
    .cellCommon_field {
      .van-cell {
        margin: 0px auto;
        font-size: 32px;
        display: flex;
        align-items: flex-start;
        position: relative;
        overflow: initial;

        .van-field__label {
          width: 150px;

          span {
            display: block;
            width: 140px;
            text-align: left;
          }
        }
      }
    }

    .flex {
      padding: 20px 30px;

      .van-button {
        width: 200px;
        height: 78px;
        display: block;
        font-size: 24px;
        margin: 20px 0;
      }
    }

    .textareaStyle.incomeField {
      .van-cell--required::before {
        top: 90px;
        left: 8px;
      }

      .van-cell {
        margin: 0;
        width: 710px;

        .van-cell__title,
        .van-cell__value {
          height: 200px;
          padding-top: 0;
        }

        .van-field__label {
          span {
            padding-left: 20px;
            border: none
          }
        }

        .van-cell__value {
          .van-field__body {
            width: 100%;
            padding: 0;

            .van-icon-clear {
              font-size: 30px;
            }
          }

          .van-field__control {
            height: 200px !important;
            padding: 20px;
          }
        }
      }
    }
  }
</style>
