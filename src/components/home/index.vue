<template>
  <section class="viewMain">
    <homeWorkbench></homeWorkbench>
    <section class="viewMain-item h270" v-for="(item, index) in dailyWorkList" :key="index">
      <header class="headers bt">{{item.title}}</header>
      <div class="swipeWrap">
        <div class="item-wrapper" v-for="(item1, index1) in item.list" :key="index1">
          <div class="item tp6" @click="routerPush(item1.router)">
            <img :src="item1.icon" />
            <span>{{item1.content}}</span>
          </div>
        </div>
      </div>
    </section>
    <van-footer :activeNum="0" />
  </section>
</template>

<script>
  import homeWorkbench from './homeWorkbench.vue'
  import Vue from 'vue'
  import {
    Swipe,
    SwipeItem
  } from 'vant'
  import {
    mapMutations
  } from 'vuex'
  Vue.use(Swipe).use(SwipeItem)
  import {
    getAllAreas,
    getAllDictionarie
  } from '../../api/api'
  export default {
    name: 'ViewMain',
    components: {
      homeWorkbench
    },
    data() {
      return {
        current: 0,
        dailyWorkList: [{
            title: '日常工作',
            list: [{
                icon: './static/img/GZJH.png',
                content: '工作计划',
                router: '/pageMain/work-plan'
              },
              {
                icon: './static/img/PRRB.png',
                content: 'PR日报',
                router: '/pageMain/look-log'
              },
              {
                icon: './static/img/MRQD.png',
                content: '每日签到',
                router: ''
              },
              {
                icon: './static/img/TDJH.png',
                content: '团队计划',
                router: ''
              }
            ]
          },
          {
            title: '经销商信息',
            list: [{
                icon: './static/img/YSPJL.png',
                content: '预审批记录',
                router: '/pageMain/approval-record'
              },
              {
                icon: './static/img/ZTCX.png',
                content: '状态查询',
                router: '/pageMain/state-select'
              },
              {
                icon: './static/img/ZTJJ.png',
                content: '暂停进件',
                router: ''
              },
              {
                icon: './static/img/ZTFK.png',
                content: '暂停放款',
                router: ''
              }
            ]
          },
          {
            title: '数据中心',
            list: [{
                icon: './static/img/XSBB.png',
                content: '销售报表',
                router: ''
              },
              {
                icon: './static/img/ZHL.png',
                content: '转化率',
                router: ''
              },
              {
                icon: './static/img/XSRW.png',
                content: '销售任务',
                router: ''
              },
              {
                icon: './static/img/BB.png',
                content: '报表',
                router: ''
              }
            ]
          }
        ]
      }
    },
    created() {},
    mounted() {
      this.getAllDictionarie()
      this.getAllAreas()
    },
    methods: {
      routerPush(router) {
        if (router == '') {
          return
        }
        this.$router.push(router)
      },
      getAllAreas() {
        getAllAreas().then(res => {
          if (res.code == 0) {
            this.setArea(res.data)
          }
        })
      },
      getAllDictionarie(){
        getAllDictionarie().then(res => {
          if (res.code == 0) {
            this.setDics(res.data)
          }
        })
      },
      ...mapMutations({
        setArea: 'SET_AREA',
        setDics: 'SET_DICS'
      }),
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .viewMain {
    padding-bottom: 100px;

    .viewMain-item {
      box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
      border-radius: 24px;
      margin: 20px auto;
      position: relative;
      width: 702px;

      .headers {
        padding: 32px 32px;
        font-size: 30px;
        font-weight: 600;
        color: #333333;
      }
    }

    .viewMain-item.selfRes {
      height: 470px;
    }

    .viewMain-item.monthOfProgress {
      box-shadow: 0 0 black;
      background-color: none;
      padding: 10px 0;

      .headers {
        position: initial;
        padding-left: 35px;
      }

      .progress {
        width: 98%;
        margin: 10px auto;
      }
    }

    .viewMain-item.h270 {
      height: 270px;
    }

    .swipeWrap {
      padding: 0 36px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .item-wrapper {
        display: flex;
        justify-content: space-between;
      }

      .item-wrapper.item-wrapper-start {
        justify-content: start;
      }

      .item {
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        font-size: 22px;
        color: #333333;
        position: relative;
        width: 110px;

        img {
          width: 64px;
          height: 64px;
          margin: 10px 0;
        }

        span {
          padding: 10px 0 0;
        }

        .h104 {
          height: 86px;
        }
      }
    }
  }
</style>
