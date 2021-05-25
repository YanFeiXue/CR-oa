<template>
  <section class="incoming appView" id="leftToDom">
    <van-header :title="title" :routeName="routeName" v-if="superData"></van-header>
    <van-tabs v-model="active" @click="scrollTabs()">
      <van-tab title="进件信息">
        <van-incoming ref="incomingInfo" @tab0="tab" />
      </van-tab>
      <van-tab title="工作信息">
        <van-work-info ref="workInfo" @tab1="tab" />
      </van-tab>
      <van-tab title="关联人信息">
        <van-contacts-info ref="contactsInfo" @tab2="tab" v-if="num" />
      </van-tab>
      <van-tab title="车辆信息">
        <van-car-info ref="carInfo" @tab3="tab" />
      </van-tab>
      <van-tab title="备注信息">
        <van-remark-info ref="remarkInfo"></van-remark-info>
      </van-tab>
    </van-tabs>
  </section>
</template>

<script>
  import Header from '../../base/Header'
  import incomingInfo from './incomingInfo/incoming-info'
  import workInfo from './workInfo/work-info'
  import contactsInfo from './contactsInfo/contacts-info'
  import carInfo from './carInfo/car-info'
  import remarkInfo from './remarkInfo/remark-info'
  import Vue from 'vue'
  import {
    Tab,
    Tabs,
    ActionSheet,
    Field
  } from 'vant'
  Vue.use(ActionSheet)
    .use(Field)
    .use(Tab)
    .use(Tabs)
  import {
    leaseFormMixin
  } from '../../util/mixins'
  export default {
    name: 'incoming',
    mixins: [leaseFormMixin],
    components: {
      'van-header': Header,
      'van-incoming': incomingInfo,
      'van-work-info': workInfo,
      'van-contacts-info': contactsInfo,
      'van-car-info': carInfo,
      'van-remark-info': remarkInfo
    },
    props: {
      superData: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        title: '进件申请',
        active: 0,
        oldVal: 0,
        num: false,
        routeName: 'back',
        tabRoute: {
          0: {
            ref: 'incomingInfo'
          },
          1: {
            ref: 'workInfo'
          },
          2: {
            ref: 'contactsInfo'
          },
          3: {
            ref: 'carInfo'
          },
          4: {
            ref: 'remarkInfo'
          }
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      this.setSessionData('')
      this.setLeaseId('')
      next()
    },
    created() {
      this.isIncoming()
    },
    methods: {
      scrollTabs() {
        if (this.active == 2) {
          this.num = true
        } else {
          this.num = false
        }
      },
      tab(data) {
        if (data == 2) {
          this.num = true
        }
        this.active = data
      },
      formatNullObj(data) {
        for (var Key in data) {
          if (typeof data[Key] != 'object') {
            data[Key] = ''
          } else {
            this.formatNullObj(data[Key])
          }
        }
      },
      isIncoming() {
        if (this.$route.query.incoming == 'false') {
          this.routeName = '/pageMain/process'
        }
        this.active = this.activeIndex
        this.showLeaseForm()
        this.setLeaseFormFlag(true)
        this.formatNullObj(this.yizhangtongForm)
        this.setLeaseForm(this.yizhangtongForm)
      }
    }
  }
</script>

<style lang="less" scoped="scoped">
  .incoming {
    .van-tab__pane {
      padding-bottom: 20px;
    }

    .cellCommon_field {
      border-bottom: 1px solid #ededed;

      .van-cell {
        margin: 0px auto;
        font-size: 32px;
        display: flex;
        align-items: flex-start;
        position: relative;
        overflow: initial;

        .van-field__label {
          width: 170px;

          span {
            display: block;
            width: 170px;
            text-align: left;
          }
        }

        .van-field__error-message {
          left: 210px !important;
        }
      }
    }

    .van-button {
      width: 586px;
      height: 108px;
      display: block;
      margin: 80px auto 20px;
      border-radius: 100px;
      font-size: 36px;
      color: #ffffff;
      border: none;
    }
  }

  /deep/.van-tabs {
    .van-tabs__wrap {
      height: 80px;
      color: #666666;

      .van-tab.van-tab--active {
        color: #24A494
      }

      .van-tabs__nav {
        .van-tab {
          line-height: 80px;
          font-size: 30px;
          width: 150px;
        }

        .van-tabs__line {
          width: 48px;
          height: 6px;
          background: #24A494;
          border-radius: 4px;
        }
      }
    }
  }
</style>
