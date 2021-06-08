<template>
  <section>
    <van-header :title="logtitle" :path="'-1'" :routeName="'back'" @backtoSave="backtoSave"></van-header>
    <section class="form_body">
      <section class="form_item">
        <div class="form_title">
          <p class="must">*</p>
          <p>周报开始日期</p>
        </div>
        <div class="form_chosetime" @click="showDatetimeClick(1)">
          <van-icon name="notes-o" color="#000000" size="20" />
          <p :class="weeklyForm.reportDateStart == '选择开始日期' ? 'p_noactive' : 'p_active'">{{weeklyForm.reportDateStart}}
          </p>
        </div>
      </section>
      <section class="form_item">
        <div class="form_title">
          <p class="must">*</p>
          <p>周报结束日期</p>
        </div>
        <div class="form_chosetime" @click="showDatetimeClick(2)">
          <van-icon name="notes-o" color="#000000" size="20" />
          <p :class="weeklyForm.reportDateEnd == '选择结束日期' ? 'p_noactive' : 'p_active'">{{weeklyForm.reportDateEnd}}</p>
        </div>
      </section>
      <van-field v-model="weeklyForm.taskProgressCondition" label="本周任务指标进度情况" placeholder="请输入本周任务指标进度情况" required
        :readonly="useType == 'look' ? true : false" />
      <van-field v-model="weeklyForm.provinceSpCondition" required label="各省现有SP情况及提升方向" placeholder="请输入各省现有SP情况及提升方向"
        :readonly="useType == 'look' ? true : false" />
      <van-field v-model="weeklyForm.policeAndFeedback" label="相关政策及公司讯息下达及反馈" placeholder="请输入相关政策及公司讯息下达及反馈" required
        :readonly="useType == 'look' ? true : false" />
      <van-field v-model="weeklyForm.questionOrCompetingProduct" required label="收集各省份反馈的问题或竞品信息"
        placeholder="请输入收集各省份反馈的问题或竞品信息" :readonly="useType == 'look' ? true : false" />
      <van-field v-model="weeklyForm.needSolveProblem" required label="需要公司总部协调解决的问题" placeholder="请输入需要公司总部协调解决的问题"
        :readonly="useType == 'look' ? true : false" />
      <section class="form_item">
        <div class="form_title">
          <p>附件</p>
          <van-icon class="form_circle" name="circle" color="#0D88FF" size="20" />
          <van-icon class="form_plus" name="plus" color="#0D88FF" size="16" />
        </div>
        <div class="form_imgs">
          <img src="../../../../static/img/enter_identity_back@2x.png" />
          <img src="../../../../static/img/enter_identity_back@2x.png" />
          <img src="../../../../static/img/enter_identity_back@2x.png" />
          <img src="../../../../static/img/enter_identity_back@2x.png" />
          <img src="../../../../static/img/enter_identity_back@2x.png" />
        </div>
      </section>
      <van-field v-if="weeklyForm.remark || useType != 'look'" v-model="weeklyForm.remark" label="备注"
        placeholder="请输入备注" autosize type="textarea" :readonly="useType == 'look' ? true : false" />
      <section class="form_item" v-if="useType == 'look'">
        <div class="form_title">
          <p>评论({{weeklyForm.commentVOList.length}})</p>
        </div>
        <div class="commit_body" v-if="weeklyForm.commentVOList.length != 0">
          <div class="commit_item" v-for="(item, index) in weeklyForm.commentVOList" :key="index">
            <div class="commit_img">
              <img src="../../../../static/img/BXSP.png" />
            </div>
            <div class="commit_title">
              <div style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
                <p class="commit_name">{{item.createUser}}</p>
                <p class="commit_time">{{item.createTime}}</p>
              </div>
              <p class="commit_content">{{item.content}}</p>
            </div>
          </div>
        </div>
        <div v-else class="no_commit">
          <p>暂无评论～</p>
        </div>
        <div class="form_content" @click="showDatetimeClick">
          <!-- <span v-class="!showBtn ? 'please_commit' : 'write_commit'">{{}}</span> -->
          <input class="commit" v-model="commit" :placeholder="!showBtn ? '请输入评论' : '正在输入评论'" @focusin="showBtn = true" @focusout="showBtn = false"></input>
          <img v-if="showBtn" src="../../../../static/img/sendCommit.png" @click="sendCommit" />
        </div>
      </section>
      <button class="upload_log" @click="commitLog" v-if=" useType != 'look'">提交日志</button>
    </section>

    <van-popup v-model="showDatetime" round position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker v-model="choseCurrentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate"
        @confirm="showDatetime = false" @cancel="showDatetime = false" />
    </van-popup>
  </section>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import Vue from 'vue'
  import {
    Popup,
    DatetimePicker,
    Switch,
    Field,
    Dialog
  } from 'vant';
  Vue.use(DatetimePicker).use(Popup).use(Switch).use(Field).use(Dialog);
  import header from '../../../base/Header'
  import {
    weeklyReportSave,
    getReportByIdAndType,
    dailyReportCommentSave
  } from '../../../api/api'
  export default {
    components: {
      'van-header': header
    },
    computed: {
      ...mapGetters(['weeklyFormActive'])
    },
    data() {
      return {
        logtitle: '周报详情',
        maxDate: new Date(2050, 11, 31),
        minDate: new Date(2021, 0, 1),
        showDatetime: false,
        choseDateType: 1,
        choseCurrentDate: '',
        useType: this.$route.query.useType,
        type: this.$route.query.type,
        id: this.$route.query.id,
        checked: false,
        commit: '',
        showBtn: false,
        weeklyForm: {
          reportDateStart: '选择开始日期',
          reportDateEnd: '选择结束日期',
          taskProgressCondition: '',
          provinceSpCondition: '',
          policeAndFeedback: '',
          questionOrCompetingProduct: '',
          needSolveProblem: '',
          remark: '',
          commentVOList: []
        }
      }
    },
    watch: {
      choseCurrentDate(newValue) {
        if (newValue == '' || newValue == null || newValue == undefined) {
          this.weeklyForm.reportDateEnd = '选择结束日期'
          return this.weeklyForm.reportDateStart = '选择开始日期'
        }
        if (this.choseDateType == 1) {
          let y = newValue.getFullYear()
          let m = newValue.getMonth() + 1
          let d = newValue.getDate()
          this.weeklyForm.reportDateStart = y + '-' + m + '-' + d
        }
        if (this.choseDateType == 2) {
          let y = newValue.getFullYear()
          let m = newValue.getMonth() + 1
          let d = newValue.getDate()
          this.weeklyForm.reportDateEnd = y + '-' + m + '-' + d
        }
      }
    },
    mounted() {
      if (this.useType == 'look') {
        this.getLogInfo()
      } else {
        if (this.weeklyFormActive.reportDateStart != '选择开始日期') {
          Dialog.confirm({
            message: '读取到您之前填写的内容，继续填写?',
          }).then(() => {
            this.weeklyForm = this.weeklyFormActive
          }).catch(() => {

          });
        }
      }
    },
    methods: {
      getLogInfo() {
        let data = {
          id: this.id,
          type: this.type
        }
        getReportByIdAndType(data).then(res => {
          if (res.code != 0) {
            return this.$toast.fail(res.msg)
          }
          res.data.reportDateStart = res.data.reportDateStart.split(' ')[0]
          res.data.reportDateEnd = res.data.reportDateEnd.split(' ')[0]
          this.weeklyForm = res.data
        })
      },
      commitLog() {
        weeklyReportSave({
          ...this.weeklyForm
        }).then(res => {
          if (res.code != 0) {
            return this.$toast.fail(res.msg)
          }
          this.$toast.success(res.msg)
          window.history.go(-1)
        })
      },
      showDatetimeClick(type) {
        if (this.useType == 'write') {
          this.choseDateType = type
          this.showDatetime = true
        }
      },
      sendCommit() {
        if (this.commit == '') {
          this.$toast.fail('请输入评论')
        }
        let data = {
          reportId: this.id,
          type: this.type,
          content: this.commit
        }
        dailyReportCommentSave(data).then(res => {
          if (res.code != 0) {
            return this.$toast.fail(res.msg)
          }
          this.$toast.success(res.msg)
          this.commitLog()
        })
      },
      backtoSave() {
        if (this.useType == 'look') {
          window.history.go(-1)
        } else if (this.weeklyForm.reportDateStart == '选择开始日期') {
          this.setWeeklyForm({
            reportDateStart: '选择开始日期',
            reportDateEnd: '选择结束日期',
            taskProgressCondition: '',
            provinceSpCondition: '',
            policeAndFeedback: '',
            questionOrCompetingProduct: '',
            needSolveProblem: '',
            remark: '',
            commentVOList: []
          })
          return window.history.go(-1)
        } else {
          Dialog.confirm({
            message: '要临时保存填写内容吗?',
          }).then(() => {
            this.setWeeklyForm(this.weeklyForm)
            window.history.go(-1)
          }).catch(() => {
            this.setWeeklyForm({
              reportDateStart: '选择开始日期',
              reportDateEnd: '选择结束日期',
              taskProgressCondition: '',
              provinceSpCondition: '',
              policeAndFeedback: '',
              questionOrCompetingProduct: '',
              needSolveProblem: '',
              remark: '',
              commentVOList: []
            })
            window.history.go(-1)
          });
        }
      },
      ...mapMutations({
        setWeeklyForm: 'SET_WEEKLYFORM'
      }),
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

    /deep/ {
      .van-cell {
        width: 100%;
        margin-top: 40px;
        font-size: 30px;
        display: flex;
        flex-direction: column;
        padding: 0;

        .van-cell__title {
          color: #333333;
          height: 30px;
          line-height: 30px;
          font-weight: bold;
          display: flex;
          flex-direction: row;
          align-items: center;
          position: relative;
          padding: 0 0 0 30px;
          margin: 0 0 20px;
          width: 100%;
        }

        .van-cell__value {
          box-sizing: border-box;
          padding: 0 32px;
          width: 702px;
          margin: 0 auto;
          height: 92px;
          line-height: 92px;
          background: #FFFFFF;
          border-radius: 8px;
          border: 2px solid #DBDBDB;
          color: #666666;

          .van-field__body {
            position: relative;

            textarea {
              line-height: 50px;
            }

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

    .upload_log {
      width: 458px;
      height: 88px;
      background: #22A78E;
      border-radius: 50px;
      font-size: 32px;
      color: #FFFFFF;
      line-height: 88px;
      text-align: center;
      margin: 82px auto 0;
    }

    .form_item_switch {
      width: 100%;
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 30px;
      color: #333333;
      font-weight: bold;

      .form_title {
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        padding: 0 0 0 30px;
        margin: 0 0 20px;

        .must {
          color: #FF1C1C;
          font-size: 35px;
          position: absolute;
          top: 8px;
          left: 4px;
        }
      }

      .form_content {
        display: flex;
        width: 200px;
        justify-content: space-between;
        align-items: center;

        /deep/ {
          .van-switch {
            border: 3px solid #E5E5E5;
          }
        }
      }
    }

    .form_item {
      width: 100%;
      margin-top: 40px;
      font-size: 30px;
      .no_commit{
        font-size: 30px;
        color: #666666;
        margin: 40px 0 40px 30px;
      }

      .commit_body{
        margin: 20px auto 40px;
        width: 664px;
        display: flex;
        flex-direction: column;
        .commit_item{
          width: 100%;
          display: flex;
          flex-direction: row;
          margin-bottom: 20px;
          .commit_img{
            width: 52px;
            height: 52px;
            margin-right: 14px;
            img{
              width: 52px;
              height: 52px;
            }
          }
          .commit_title{
            width: 100%;
            display: flex;
            flex-direction: column;
            font-size: 26px;
            .commit_name{
              font-weight: bold;
              color: #333333;
              margin-bottom: 6px;
            }
            .commit_time{
              font-size: 22px;
              color: #363636;
            }
            .commit_content{
              color: #666666;
            }
          }
        }
      }

      .form_title {
        color: #333333;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        padding: 0 0 0 30px;
        margin: 0 0 20px;

        .must {
          color: #FF1C1C;
          font-size: 35px;
          position: absolute;
          top: 8px;
          left: 4px;
        }

        .form_circle {
          position: absolute;
          right: 0px;
          top: 0px;
        }

        .form_plus {
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
        color: #666666;

        .van-icon {
          margin-right: 24px;
        }

        .p_noactive {
          color: #C4C4C4;
        }

        .p_active {}
      }

      .form_content {
        box-sizing: border-box;
        padding: 0 32px;
        width: 702px;
        height: 92px;
        line-height: 92px;
        margin: 0 auto;
        background: #FFFFFF;
        border-radius: 8px;
        border: 2px solid #DBDBDB;
        color: #666666;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .please_commit{
          font-size: 30px;
          color: #C4C4C4;
          width: 200px;
        }
        .write_commit{
          font-size: 30px;
          color: #C4C4C4;
          width: 200px;
        }
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

      .commit_btn {
        width: 100px;
        border-radius: 10px;
        background: #366DFE;
        float: right;
        margin: 10px 0 0 0;

        /deep/ {
          .van-button::before {
            border: none;
          }
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
