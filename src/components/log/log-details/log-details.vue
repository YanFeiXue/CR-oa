<template>
  <section>
    <van-header :title="logtitle" :path="'-1'" :routeName="'back'"></van-header>
    <section class="form_body">
      <section class="form_item">
        <div class="form_title">
          <p class="must">*</p>
          <p>日报所属日期</p>
        </div>
        <div class="form_chosetime" @click="showDatetimeClick">
          <van-icon name="notes-o" color="#000000" size="20" />
          <p :class="currentDate == '选择时间' ? 'p_noactive' : 'p_active'">{{currentDate}}</p>
        </div>
      </section>
      <section class="form_item">
        <div class="form_title">
          <p>所属区域</p>
        </div>
        <div class="form_content">
          <input placeholder="请输入所属区域" :disabled="type == 'look' ? true : false" />
        </div>
      </section>
      <section class="form_item">
        <div class="form_title">
          <p class="must">*</p>
          <p>出差城市</p>
        </div>
        <div class="form_content">
          <input placeholder="请输入出差城市" :disabled="type == 'look' ? true : false" />
        </div>
      </section>
      <section class="form_item">
        <div class="form_title">
          <p>拜访代理商名称</p>
        </div>
        <div class="form_content">
          <input placeholder="请输入拜访代理商名称" :disabled="type == 'look' ? true : false" />
        </div>
      </section>
      <section class="form_item">
        <div class="form_title">
          <p class="must">*</p>
          <p>今日完成工作</p>
        </div>
        <div class="form_content">
          <input placeholder="请输入今日完成工作" :disabled="type == 'look' ? true : false" />
        </div>
      </section>
      <section class="form_item">
        <div class="form_title">
          <p>未完成工作</p>
        </div>
        <div class="form_content">
          <input placeholder="请输入未完成工作" :disabled="type == 'look' ? true : false" />
        </div>
      </section>
      <section class="form_item">
        <div class="form_title">
          <p>需协调工作</p>
        </div>
        <div class="form_content">
          <input placeholder="请输入需协调工作" :disabled="type == 'look' ? true : false" />
        </div>
      </section>
      <section class="form_item">
        <div class="form_title">
          <p>培训</p>
        </div>
        <div class="form_content">
          <input placeholder="请输入培训内容" :disabled="type == 'look' ? true : false" />
        </div>
      </section>
      <section class="form_item">
        <div class="form_title">
          <p>发现问题</p>
        </div>
        <div class="form_content">
          <input placeholder="请输入问题" :disabled="type == 'look' ? true : false" />
        </div>
      </section>
      <section class="form_item">
        <div class="form_title">
          <p>解决办法</p>
        </div>
        <div class="form_content">
          <input placeholder="请输入问题" :disabled="type == 'look' ? true : false" />
        </div>
      </section>
      <section class="form_item">
        <div class="form_title">
          <p class="must">*</p>
          <p>客户姓名</p>
        </div>
        <div class="form_content">
          <input placeholder="请输入问题" :disabled="type == 'look' ? true : false" />
        </div>
      </section>
      <section class="form_item">
        <div class="form_title">
          <p class="must">*</p>
          <p>联系人(职位姓名)</p>
        </div>
        <div class="form_content">
          <input placeholder="请输入问题" :disabled="type == 'look' ? true : false" />
        </div>
      </section>
      <section class="form_item">
        <div class="form_title">
          <p class="must">*</p>
          <p>联系电话</p>
        </div>
        <div class="form_content">
          <input placeholder="请输入问题" :disabled="type == 'look' ? true : false" />
        </div>
      </section>
      <section class="form_item">
        <div class="form_title">
          <p>附件</p>
          <van-icon class="form_circle" name="circle" color="#0D88FF" size="20" />
          <van-icon class="form_plus" name="plus" color="#0D88FF" size="16" />
        </div>
        <div class="form_imgs">
          <img src="../../../assets/img/enter_identity_back@2x.png" />
          <img src="../../../assets/img/enter_identity_back@2x.png" />
          <img src="../../../assets/img/enter_identity_back@2x.png" />
          <img src="../../../assets/img/enter_identity_back@2x.png" />
          <img src="../../../assets/img/enter_identity_back@2x.png" />
        </div>
      </section>
      <section class="form_item">
        <div class="form_title">
          <p>备注</p>
        </div>
        <div class="form_content">
          <input placeholder="请输入问题" :disabled="type == 'look' ? true : false" />
        </div>
      </section>
      <section class="form_item" v-if="type">
        <div class="form_title">
          <p>评论(0)</p>
        </div>
        <div class="form_commit">
          <input placeholder="请输入评论" />
          <van-button type="primary" size="large">发送</van-button>
        </div>
      </section>
    </section>

    <van-popup v-model="showDatetime" round position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker v-model="choseCurrentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="showDatetime = false" @cancel="showDatetime = false" />
    </van-popup>
  </section>
</template>

<script>
  import Vue from 'vue'
  import {
    Popup,
    DatetimePicker
  } from 'vant';
  Vue.use(DatetimePicker).use(Popup);
  import header from '../../../base/Header'
  export default {
    components: {
      'van-header': header
    },
    data() {
      return {
        currentDate: '选择时间',
        logtitle: '日志详情',
        maxDate: new Date(2026, 0, 1),
        minDate: new Date(2020, 0, 1),
        showDatetime: false,
        choseCurrentDate: '',
        type: this.$route.query.type
      }
    },
    watch: {
      choseCurrentDate(newValue) {
        if (newValue == '' || newValue == null || newValue == undefined) {
          this.currentDate = '选择时间'
          return
        }
        let y = newValue.getFullYear()
        let m = newValue.getMonth() + 1
        let d = newValue.getDate()
        this.currentDate = y + '年' + m + '月' + d + '日'
      }
    },
    mounted() {
      console.log(this.type);
    },
    methods: {
      showDatetimeClick(){
        if (this.type == 'write') {
          this.showDatetime = true
        }
      }
    },
  }
</script>

<style lang="scss" scoped="scoped">
  .form_body {
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 24px;

    .form_item {
      width: 100%;
      margin-top: 40px;

      .form_title {
        font-size: 30px;
        color: #333333;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        padding: 0 0 0 30px;
        margin: 0 0 20px;
        .must{
          color: #FF1C1C;
          font-size: 35px;
          position: absolute;
          top: 8px;
          left: 4px;
        }
        .form_circle{
          position: absolute;
          right: 0px;
          top: 0px;
        }
        .form_plus{
          position: absolute;
          right: 4px;
          top: 4px;
        }
      }

      .form_chosetime {
        display: flex;
        flex-direction: row;
        align-items: center;
        box-sizing: border-box;
        padding: 0 32px;
        width: 702px;
        margin: 4px auto 0;
        height: 92px;
        line-height: 92px;
        background: #FFFFFF;
        border-radius: 8px;
        border: 2px solid #DBDBDB;
        font-size: 30px;
        color: #666666;

        .van-icon {
          margin-right: 24px;
        }

        .p_noactive {
          font-size: 30px;
          color: #C4C4C4;
        }

        .p_active {}
      }

      .form_content {
        box-sizing: border-box;
        padding: 0 32px;
        width: 702px;
        margin: 0 auto;
        height: 92px;
        line-height: 92px;
        background: #FFFFFF;
        border-radius: 8px;
        border: 2px solid #DBDBDB;
        font-size: 30px;
        color: #666666;
        input {
          width: 100%;
          height: 90%;
          border-radius: 8px;
          text-indent: 5px;
          font-size: 30px;
        }
        input:disabled{
          background-color: #FFFFFF;
        }
      }

      .form_imgs {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;

        img {
          width: 144px;
          height: 144px;
          margin: 24px;
        }
      }

      .form_commit {
        width: 702px;
        height: 92px;
        background: #FFFFFF;
        border-radius: 8px;
        border: 2px solid #DBDBDB;
        position: relative;

        input {
          width: 550px;
          height: 90%;
          border-radius: 8px;
          text-indent: 30px;
          font-size: 30px;
        }

        /deep/ {
          .van-button {
            position: absolute;
            right: 0;
            width: 150px;
            height: 100%;
          }
        }
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
  }

</style>
