<template>
  <section class="schedule_detail_body">
    <div class="header_pop" v-if="showPointPop">
      <p>删除</p>
      <p>修改</p>
    </div>
    <van-header title="日志详情" path="-1" routerName="back" :showPoint="true" @showDetailpop="showDetailpop"></van-header>
    <div class="dealer_time_body">
      <div class="dealer_name">
        <p class="name_point"></p>
        <p>拜访经商好车速卖</p>
      </div>
      <div class="dealer_time">
        <div class="starttime">
          <p class="text">开始时间：</p>
          <p class="hourmin">09:00</p>
          <p class="monthday">7月11日</p>
          <p class="week">周六</p>
        </div>
        <div class="endtime">
          <p class="text">结束时间：</p>
          <p class="hourmin">09:00</p>
          <p class="monthday">7月12日</p>
          <p class="week">周日</p>
        </div>
      </div>
    </div>
    <div class="dealer_detail">
      <div class="dealer_name">
        <img src="../../../static/img/person.png" />
        <p>好车速卖汽车服务有限责任公司</p>
      </div>
      <div class="dealer_btn">
        <van-button class="one" @click="routerPush(1)">查看经销商</van-button>
        <van-button class="two" @click="routerPush(2)">添加跟进记录</van-button>
      </div>
    </div>
    <div class="localhost">
      <img src="../../../static/img/gps.png" />
      <p>云南省昆明市官渡区洱家湾299号合金公寓B栋1812</p>
    </div>
    <div class="sign_btn">
      <img src="../../../static/img/qd.png" />
      <van-button>签到</van-button>
    </div>
    <div class="follow_up_record_body">
      <img src="../../../static/img/jl.png" />
      <textarea placeholder="请输入经销商跟进记录"></textarea>
    </div>
    <div class="enclosure_body">
      <div style="display: flex;flex-direction: row;align-items: center;">
        <img class="enclosure_img" src="../../../static/img/fj.png" />
        <p>附件</p>
      </div>
      <img src="../../../static/img/fjjia.png" />
    </div>
    <div class="commit_body">
      <div class="commit_header">
        <div class="commit_icon" @click="commitRecordClick(true)">
          <img :src="commitRecordActive ? '../../../static/img/commit_active.png' : '../../../static/img/commit.png'" />
          <p :class="commitRecordActive ? 'p_active' : 'p'">评论</p>
          <div class="border_line" v-if="commitRecordActive"></div>
        </div>
        <div class="line"></div>
        <div class="record_icon" @click="commitRecordClick(false)">
          <img :src="!commitRecordActive ? '../../../static/img/record_active.png' : '../../../static/img/record.png'" />
          <p :class="!commitRecordActive ? 'p_active' : 'p'">操作记录</p>
          <div class="border_line" v-if="!commitRecordActive"></div>
        </div>
      </div>
      <div class="commit_list_body" v-if="commitRecordActive">
        <div class="item_body" v-for="(item, index) in 3" :key="index">
          <div class="item_header">
            <img src="../../../static/img/head.png" />
          </div>
          <div class="item_content_body">
            <div class="item_name_time">
              <p class="item_name">赵旭阳</p>
              <p class="item_time">07月11日  09:48</p>
            </div>
            <div class="item_content">
              这个经销商最近安鹏进件量低，看看什么原因，幸苦。
            </div>
          </div>
        </div>
      </div>
      <div class="record_list_body" v-if="!commitRecordActive">
        <div class="item_body" v-for="(item, index) in 5" :key="index">
          <div class="edit">
            <van-icon name="bell" size="18" color="#BBBBBB" />
            <p>马向鑫修改了日程</p>
          </div>
          <p>07月13日  15:48:20</p>
        </div>
      </div>
    </div>

    <img class="write_commit" @click="commitDialog = true" src="../../../static/img/write_commit.png" />

    <van-popup round position="bottom" v-model="commitDialog" :style="{ height: '292px' }">
      <div class="popup_commit_body">
        <div class="commit_list_body" v-if="commitRecordActive">
          <div class="item_body" v-for="(item, index) in 3" :key="index">
            <div class="item_header">
              <img src="../../../static/img/head.png" />
            </div>
            <div class="item_content_body">
              <div class="item_name_time">
                <p class="item_name">赵旭阳</p>
                <p class="item_time">07月11日  09:48</p>
              </div>
              <div class="item_content">
                这个经销商最近安鹏进件量低，看看什么原因，幸苦。
              </div>
            </div>
          </div>
        </div>
        <div class="form_content">
          <input class="commit" v-model="commit" placeholder="请输入评论" @focusin="showBtn = true" @focusout="showBtn = false"></input>
          <img v-if="showBtn" src="../../../static/img/sendCommit.png" @click="sendCommit" />
        </div>
      </div>
    </van-popup>
  </section>
</template>

<script>
  import Vue from 'vue';
  import { Popup } from 'vant';

  Vue.use(Popup);
  export default {
    data() {
      return {
        commitRecordActive: true,
        commitDialog: false,
        showBtn: false,
        showPointPop: false,
        commit: ''
      }
    },
    computed:{},
    mounted() {},
    watch: {},
    methods: {
      commitRecordClick(active){
        this.commitRecordActive = active
      },
      routerPush(active) {
        this.$router.push({path: '/pageMain/dealer-info', query:{active: active}})
      },
      sendCommit(){

      },
      showDetailpop(){
        this.showPointPop = !this.showPointPop
      }
    }
  }
</script>

<style lang="scss" scoped="scoped">
  .schedule_detail_body{
    padding: 0 0 100px 0;
    .header_pop{
      width: 140px;
      height: 150px;
      background: #FFFFFF;
      box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
      padding: 28px 46px;
      box-sizing: border-box;
      position: absolute;
      top: 64px;
      right: 24px;
      z-index: 100;
      p{
        font-size: 24px;
        font-family: PingFangSC-Regular;
        color: #333333;
        margin-bottom: 24px;
      }
    }
    .dealer_time_body{
      width: 702px;
      height: 298px;
      background: #FFFFFF;
      box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
      border-radius: 24px;
      box-sizing: border-box;
      padding: 40px 0 44px 32px;
      margin: 0 auto;
      .dealer_name{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 44px;
        font-size: 34px;
        font-weight: bold;
        color: #333333;
        font-family: PingFangSC-Medium;
        .name_point{
          width: 20px;
          height: 20px;
          background: #00B852;
          border-radius: 11px;
          margin-right: 20px;
        }
      }
      .dealer_time{
        margin-left: 40px;
        .starttime, .endtime{
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 30px;
          font-family: PingFangSC-Regular;
          .text{
            font-size: 30px;
            color: #999999;
            margin-right: 20px;
          }
          .hourmin{
            font-size: 36px;
            font-weight: bold;
            color: #333333;
            margin-right: 48px;
            font-family: PingFangSC-Medium;
          }
          .monthday{
            font-size: 28px;
            color: #666666;
            margin-right: 10px;
          }
          .week{
            width: 72px;
            height: 32px;
            background: #FFFFFF;
            border-radius: 16px;
            border: 1px solid #CCCCCC;
            font-size: 22px;
            color: #999999;
            line-height: 32px;
            text-align: center;
          }
        }
      }
    }
    .dealer_detail{
      width: 702px;
      height: 240px;
      background: #FFFFFF;
      box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
      border-radius: 24px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 40px 0 28px 32px;
      margin: 24px auto;
      font-family: PingFangSC-Regular;
      .dealer_name{
        border-bottom: 1px solid #E7E7E7;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-bottom: 38px;
        img{
          width: 36px;
          height: 36px;
          margin-right: 20px;
        }
        p{
          font-size: 30px;
          color: #333333;
        }
      }
      .dealer_btn{
        padding-top: 26px;
        margin-left: 56px;
        width: 476px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .one{
          width: 168px;
          height: 68px;
          background: #FFFFFF;
          border-radius: 8px;
          border: 2px solid #DEDEDE;
          font-size: 26px;
          color: #333333;
          line-height: 68px;
        }
        .two{
          width: 196px;
          height: 68px;
          background: #FFFFFF;
          border-radius: 8px;
          border: 2px solid #DEDEDE;
          font-size: 26px;
          color: #333333;
          line-height: 68px;
        }
      }
    }
    .localhost{
      width: 702px;
      height: 164px;
      background: #FFFFFF;
      box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
      border-radius: 24px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 40px 0 40px 32px;
      box-sizing: border-box;
      margin: 0 auto;
      font-family: PingFangSC-Regular;
      img{
        width: 36px;
        height: 36px;
        margin-right: 20px;
      }
      p{
        font-size: 30px;
        color: #333333;
        width: 480px;
      }
    }
    .sign_btn{
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 40px 0 40px 56px;
      img{
        width: 36px;
        height: 36px;
        margin-right: 20px;
      }
      /deep/{
        .van-button{
          width: 180px;
          height: 60px;
          background: #24A494;
          border-radius: 12px;
          font-size: 30px;
          color: #FFFFFF;
          line-height: 60px;
          font-family: PingFangSC-Regular;
        }
      }
    }
    .follow_up_record_body{
      width: 702px;
      margin: 0 auto;
      padding: 40px 32px;
      box-sizing: border-box;
      height: 316px;
      background: #FFFFFF;
      box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
      border-radius: 24px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      img{
        width: 36px;
        height: 36px;
        margin: 24px 20px 0 0;
      }
      textarea{
        width: 582px;
        height: 200px;
        background: #FFFFFF;
        border-radius: 12px;
        border: 2px solid #EEEEEE;
        padding: 20px;
        font-family: PingFangSC-Regular;
      }

    }
    .enclosure_body{
      width: 702px;
      height: 122px;
      background: #FFFFFF;
      box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
      border-radius: 24px;
      font-size: 30px;
      color: #333333;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 24px auto;
      padding: 40px 32px;
      box-sizing: border-box;
      font-family: PingFangSC-Regular;
      img{
        width: 36px;
        height: 36px;
      }
      .enclosure_img{
        margin-right: 20px;
      }
    }
    .commit_body{
      width: 702px;
      background: #FFFFFF;
      box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
      border-radius: 24px;
      margin: 0 auto;
      .commit_header{
        height: 128px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border: 1px solid #F0F0F0;
        .commit_icon{
          width: 350px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          position: relative;
          img{
            width: 36px;
            height: 36px;
            margin-right: 10px;
          }
          .p{
            font-size: 30px;
            color: #999999;
          }
          .p_active{
            font-size: 30px;
            color: #0D88FF;
          }
          .border_line{
            width: 32px;
            height: 8px;
            background: #0D88FF;
            border-radius: 4px;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
          }
        }
        .line{
          width: 2px;
          height: 32px;
          background: #F0F0F0;
          margin-top: 46px;
        }
        .record_icon{
          width: 350px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          position: relative;
          img{
            width: 36px;
            height: 36px;
            margin-right: 10px;
          }
          .p{
            font-size: 30px;
            color: #999999;
          }
          .p_active{
            font-size: 30px;
            color: #0D88FF;
          }
          .border_line{
            width: 32px;
            height: 8px;
            background: #0D88FF;
            border-radius: 4px;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
      .commit_list_body{
        display: flex;
        flex-direction: column;
        .item_body{
          display: flex;
          flex-direction: row;
          box-sizing: border-box;
          padding: 40px 32px;
          border-bottom: 1px solid #F0F0F0;
          .item_header{
            img{
              width: 76px;
              height: 76px;
              margin-right: 20px;
            }
          }
          .item_content_body{
            display: flex;
            flex-direction: column;
            .item_name_time{
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-direction: row;
              margin-bottom: 40px;
              .item_name{
                font-size: 30px;
                font-weight: bold;
                color: #333333;
                font-family: PingFangSC-Medium;
              }
              .item_time{
                font-size: 26px;
                color: #CCCCCC;
              }
            }
            .item_content{
              font-size: 26px;
              color: #666666;
            }
          }
        }
      }
    }
    .write_commit{
      width: 140px;
      height: 140px;
      box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
      border-radius: 24px;
      position: fixed;
      bottom: 76px;
      right: 36px;
      z-index: 10;
    }
    .record_list_body{
      padding: 40px 32px;
      box-sizing: border-box;
      .item_body{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
        .edit{
          display: flex;
          flex-direction: row;
          align-items: center;
          p{
            font-size: 26px;
            color: #333333;
            margin-left: 20px;
          }
        }
        P{
          font-size: 26px;
          color: #BBBBBB;
        }
      }
    }
    .popup_commit_body{
      box-sizing: border-box;
      padding: 40px 32px;
      .commit_list_body{
        display: flex;
        flex-direction: column;
        height: 392px;
        overflow-y: auto;
        .item_body{
          display: flex;
          flex-direction: row;
          box-sizing: border-box;
          padding: 40px 32px;
          border-bottom: 1px solid #F0F0F0;
          .item_header{
            img{
              width: 76px;
              height: 76px;
              margin-right: 20px;
            }
          }
          .item_content_body{
            display: flex;
            flex-direction: column;
            .item_name_time{
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-direction: row;
              margin-bottom: 40px;
              .item_name{
                font-size: 30px;
                font-weight: bold;
                color: #333333;
                font-family: PingFangSC-Medium;
              }
              .item_time{
                font-size: 26px;
                color: #CCCCCC;
              }
            }
            .item_content{
              font-size: 26px;
              color: #666666;
            }
          }
        }
      }
      .form_content {
        width: 650px;
        height: 80px;
        background: #F6F6F6;
        border-radius: 40px;
        box-sizing: border-box;
        padding: 0 22px;
        margin: 20px auto 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        img{
          width: 44px;
          height: 44px;
        }
        .commit {
          width: 380px;
          margin: 0 10px 0 0;
          height: 100%;
          background: none;
        }
      }
    }
  }
</style>
