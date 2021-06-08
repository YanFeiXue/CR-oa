<template>
  <section>
    <van-tabs @click="vanTabsClick">
      <van-tab title="我司产品" name="1">
        <section class="products_body">
          <div class="chose_products_body">
            <van-field v-model="FinancingAmountF" label="融资金额(元)" placeholder="请输入融资金额" required @blur="FinancingAmountFBlur" />
            <van-field class="select_product" v-model="SelectProductF" label="选择产品" placeholder="请选择产品" required readonly
              @click="showProductPop">
              <template #button>
                <img class="select_product_img" src="../../../static/img/xiala.png" />
              </template>
            </van-field>
          </div>
          <div class="calculation_results">
            <p>计算结果如下</p>
          </div>
          <div class="result">
            <van-field v-for="(item, index) in resultsList" :key="index" v-model="item.number" :label="item.name" readonly>
              <template #button v-if="index == 3 || index == 5 || index == 6">
                <p>%</p>
              </template>
            </van-field>
          </div>
          <div class="under_tip">
            <img src="../../../static/img/waring.png" />
            <p>实际还款月供以还款计划表为准！</p>
          </div>
        </section>
      </van-tab>

      <van-tab title="专业版" name="2">
        <section class="products_body">
          <div class="chose_products_body">
            <van-field v-model="FinancingAmountS" label="融资金额(元)" placeholder="请输入融资金额" required />
            <van-field class="select_product" v-model="SelectProductS" label="选择期数" placeholder="选择期数" required readonly
              @click="showProductPop">
              <template #button>
                <img class="select_product_img" src="../../../static/img/xiala.png" />
              </template>
            </van-field>
          </div>
          <div class="calculation_results">
            <p>请输入以下任意一项数据用来计算</p>
          </div>
          <div class="result">
            <van-field v-for="(item, index) in resultsList" :key="index" v-model="item.number" :label="item.name" v-if="index != 0" @blur="ZYBBlur(item, index)" @focus="ZYBFocus">
              <template #button v-if="index == 3 || index == 5 || index == 6">
                <p>%</p>
              </template>
            </van-field>
          </div>
          <div class="under_tip">
            <img src="../../../static/img/waring.png" />
            <p>实际还款月供以还款计划表为准！</p>
          </div>
        </section>
      </van-tab>

      <div class="backWrapper">
        <img src="../../../static/img/barBack.png" class="barBack" @click="$router.back()">
      </div>
    </van-tabs>

    <van-popup v-model="productPop" position="bottom" v-if="this.activeName != 1">
      <van-picker title="选择期数" show-toolbar :columns="productList" @confirm="productPopConfirm" @cancel="productPop = false" ></van-picker>
    </van-popup>
    <van-popup v-model="productPop" position="bottom" v-if="this.activeName == 1">
      <van-picker title="产品列表" show-toolbar :columns="productList" @confirm="productPopConfirm" @cancel="productPop = false" >
        <template #option="item">
          <p style="text-align: center">
            {{ item.productName }}
          </p>
        </template>
      </van-picker>
    </van-popup>
  </section>
</template>

<script>
  import {
    financialCalculatePro,
    getProductList,
    financialCalculateCarCredit
  } from '../../api/api'
  import Vue from 'vue'
  import {
    Field,
    Tab,
    Tabs,
    DropdownMenu,
    DropdownItem,
    Popup,
    Picker,
    col,
    row
  } from 'vant';
  Vue.use(Field).use(Tab).use(Tabs).use(DropdownItem).use(DropdownMenu).use(Popup).use(Picker).use(col).use(row)
  export default {
    data() {
      return {
        FinancingAmountF: '',
        SelectProductF: '',
        FinancingAmountS: '',
        SelectProductS: '',
        productPop: false,
        activeName: 1,
        productId: '',
        productVersion: '',
        productList: [],
        resultsList: [{
            name: '融资期限(月)',
            number: ''
          },
          {
            name: '月供',
            number: ''
          },
          {
            name: '月息(厘)',
            number: ''
          },
          {
            name: '费率',
            number: ''
          },
          {
            name: '万元系数',
            number: ''
          },
          {
            name: '月利率',
            number: ''
          },
          {
            name: '年化利率',
            number: ''
          },
          {
            name: '总还款额',
            number: ''
          },
          {
            name: '利息总额',
            number: ''
          }
        ]
      }
    },
    watch: {
      SelectProductF(newValue){
        if (this.FinancingAmountF == '') return
        this.getFinancialCalculateCarCredit()
      },
    },
    mounted() {

    },
    methods: {
      showProductPop() {
        if (this.activeName == 1) {
          getProductList({
              parentId: 0,
              enable: 1
          }).then(res => {
            this.productList = res.data
          })
        } else {
          this.productList = [
            6, 12, 18, 24, 36, 48, 60
          ]
        }
        this.productPop = true
      },
      productPopConfirm(item, index) {
        if (this.activeName == 1) {
          this.productId = item.productId,
          this.productVersion = item.productVersion
          this.SelectProductF = item.productName
        } else {
          this.SelectProductS = item
        }
        this.productPop = false
      },
      ZYBBlur(item, index) {
        if (this.FinancingAmountS == '') {
          return this.$toast.fail('融资金额不能为空')
        }
        if (this.SelectProductS == '') {
          return this.$toast.fail('期数不能为空')
        }
        if (index == 3 || index == 5 || index == 6) {
          item.number = item.number / 100
        }
        let data = {
          amount: this.FinancingAmountS,
          periods: this.SelectProductS,
          type: index,
          value: item.number
        }
        financialCalculatePro(data).then(res => {
          if (res.code != 0) {
            this.resultsList.forEach(item => {
              item.number = ''
            })
            return this.$toast.fail(res.msg)
          }
          ['monthlyMortgagePayment', 'monthlyInterest', 'rate', 'tenThousandcoefficient', 'monthlyInterestRate', 'annualInterestRate', 'totalPayment', 'totalInterestRate'].forEach((item, index) => {
            if (item == 'rate' || item == 'monthlyInterestRate' || item == 'annualInterestRate' ) {
              this.resultsList[index + 1].number = (res.data[item] * 100).toFixed(2)
            }else{
              this.resultsList[index + 1].number = res.data[item]
            }
          })
        })
      },
      getFinancialCalculateCarCredit(){
        financialCalculateCarCredit({
          amount: this.FinancingAmountF,
          productId: this.productId,
          productVersion: this.productVersion
        }).then(res => {
          if (res.code != 0) {
            this.resultsList.forEach(item => {
              item.number = ''
            })
            return this.$toast.fail(res.msg)
          }
          ['periods', 'monthlyMortgagePayment', 'monthlyInterest', 'rate', 'tenThousandcoefficient', 'monthlyInterestRate', 'annualInterestRate', 'totalPayment', 'totalInterestRate'].forEach((item, index) => {
            if (item == 'rate' || item == 'monthlyInterestRate' || item == 'annualInterestRate' ) {
              this.resultsList[index].number = (res.data[item] * 100).toFixed(2)
            }else{
              this.resultsList[index].number = res.data[item]
            }
          })
        })
      },
      ZYBFocus(){
        this.resultsList.forEach(item => {
          item.number = ''
        })
      },
      FinancingAmountFBlur(){
        if (this.SelectProductF == '') return
        this.getFinancialCalculateCarCredit()
      },
      vanTabsClick(name) {
        this.activeName = name
        this.resultsList.forEach(item => {
          item.number = ''
        })
      }
    },
  }
</script>

<style lang="scss" scoped="scoped">
  .barBack {
    position: absolute;
    left: 28px;
    top: 38px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .products_body {
    .chose_products_body {
      width: 702px;
      height: 336px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      background: #FFFFFF;
      box-shadow: 0px 0px 40px 0px #E7E7E7;
      border-radius: 24px;
      padding: 24px;
      box-sizing: border-box;
      margin: 32px auto;

      .select_product {
        .select_product_img {
          width: 28px;
          height: 28px;
        }
      }

      /deep/ {
        .van-cell {
          width: 100%;
          font-size: 30px;
          display: flex;
          flex-direction: column;
          padding: 0;

          .van-cell__title {
            color: #333333;
            font-weight: bold;
            display: flex;
            flex-direction: row;
            align-items: center;
            position: relative;
            padding: 0 0 0 30px;
            margin: 0 0 16px;
            width: 100%;
          }

          .van-cell__value {
            width: 654px;
            height: 72px;
            border-radius: 8px;
            box-sizing: border-box;
            padding: 0 28px;
            margin: 0 auto;
            line-height: 72px;
            background: #FFFFFF;
            border-radius: 8px;
            border: 2px solid #DBDBDB;
            color: #666666;

            .van-field__body {
              position: relative;

              input::-webkit-input-placeholder {
                color: #C4C4C4;
              }

              input:disabled {
                background-color: #FFFFFF;
                color: #666666;
              }

              .van-button {
                position: absolute;
                right: 0;
                top: 0;
                width: 150px;
                height: 70px;
                border-radius: 20px;
              }
            }
          }
        }

        .van-cell::after {
          border-bottom: none;
        }

        .van-cell--required::before {
          color: #FF1C1C;
          font-size: 40px;
          position: absolute;
          top: 8px;
          left: 4px;
        }
      }
    }

    .calculation_results {
      margin: 32px 0;
      text-align: center;
      font-size: 24px;
      color: #666666;
    }

    .result {
      width: 702px;
      height: 896px;
      background: #FFFFFF;
      box-shadow: 0px 0px 40px 0px #E7E7E7;
      border-radius: 24px;
      box-sizing: border-box;
      padding: 32px;
      margin: 0 auto 32px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      /deep/ {
        .van-cell::after {
          border: none;
        }

        .van-cell,
        .van-field {
          width: 100%;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          .van-cell__title {
            width: 160px;
            font-size: 28px;
            color: #333333;
          }

          .van-cell__value {
            width: 430px;
            height: 72px;

            .van-field__body {
              justify-content: flex-end;
              position: relative;
              .van-field__button{
                position: absolute;
                right: 0;
                height: 72px;
                top: 0;
                line-height: 72px;
                width: 60px;
                text-align: center;
                border-left: 1px solid #DBDBDB;
                padding: 0;
              }
              .van-field__control {
                width: 430px;
                height: 72px;
                background: #FFFFFF;
                border-radius: 8px;
                border: 2px solid #DBDBDB;
                padding: 0 32px;
                box-sizing: border-box;
              }
            }
          }
        }
      }
    }

    .under_tip {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      img {
        width: 28px;
        height: 28px;
        margin-right: 16px;
      }

      p {
        font-size: 24px;
        color: #FA6400;
      }
    }
  }

  /deep/ {
    .van-popup {
      .van-picker {
        .van-picker__toolbar {
          height: 80px;
          line-height: 80px;

          .van-picker__cancel {
            height: 80px;
            line-height: 80px;
            font-size: 30px;
          }

          .van-picker__title {
            height: 80px;
            line-height: 80px;
            font-size: 32px;
          }

          .van-picker__confirm {
            height: 80px;
            line-height: 80px;
            font-size: 30px;
          }
        }

        .van-picker__columns {
          li {
            font-size: 30px;
          }
        }
      }
    }
    .van-tabs--line {
      .van-tabs__wrap {
        height: 88px;
        width: 450px;
        margin: auto;

        .van-tabs__nav {
          margin: 15px 0;
          height: 70px;

          .van-tab--active {
            color: #333333;
            font-weight: bold;
          }

          .van-tab {
            font-size: 34px;
            height: 70px;

            .van-tab__text {
              height: 70px;
              line-height: 70px;
              font-family: PingFangSC-Medium;
            }
          }

          .van-tabs__line {
            width: 40px;
            height: 6px;
            background: #22A78E;
            border-radius: 3px;
          }
        }
      }
    }
  }
</style>
