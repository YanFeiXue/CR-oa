<template>
  <section class="remind appView" id="leftToDom">
    <van-header :title="title" :leftArrow="false"></van-header>
    <section class="daily-field">
      <div class="field-label required">日报姓名</div>
      <taTextarea
        :textareaValue="dailyForm.name"
        :placeholder="'请输入日报姓名'"
        v-validate="'required|isNull'"
        name="name"
        @input="onInput"
        :class="errors.has('name')?'error':''"
        v-model="dailyForm.name"
      ></taTextarea>
    </section>
    <section class="daily-field">
      <div class="field-label required">周一计划</div>
      <taTextarea
        :textareaValue="dailyForm.monday"
        :placeholder="'请输入周一计划'"
        v-validate="'required|isNull'"
        name="monday"
        :class="errors.has('monday')?'error':''"
        v-model="dailyForm.monday"
      ></taTextarea>
    </section>
    <section class="daily-field">
      <div class="field-label required">周二计划</div>
      <taTextarea
        :textareaValue="dailyForm.tuesday"
        :placeholder="'请输入周二计划'"
        v-validate="'required|isNull'"
        name="tuesday"
        :class="errors.has('tuesday')?'error':''"
        v-model="dailyForm.tuesday"
      ></taTextarea>
    </section>
    <section class="daily-field">
      <div class="field-label required">周三计划</div>
      <taTextarea
        :textareaValue="dailyForm.wednesday"
        :placeholder="'请输入周三计划'"
        v-validate="'required|isNull'"
        name="wednesday"
        :class="errors.has('wednesday')?'error':''"
        v-model="dailyForm.wednesday"
      ></taTextarea>
    </section>
    <section class="daily-field">
      <div class="field-label required">周四计划</div>
      <taTextarea
        :textareaValue="dailyForm.thursday"
        :placeholder="'请输入周四计划'"
        v-validate="'required|isNull'"
        name="thursday"
        :class="errors.has('thursday')?'error':''"
        v-model="dailyForm.thursday"
      ></taTextarea>
    </section>
    <section class="daily-field">
      <div class="field-label required">周五计划</div>
      <taTextarea
        :textareaValue="dailyForm.friday"
        :placeholder="'请输入周五计划'"
        v-validate="'required|isNull'"
        name="friday"
        :class="errors.has('friday')?'error':''"
        v-model="dailyForm.friday"
      ></taTextarea>
    </section>

    <section class="daily-field">
      <div class="field-label required">今日完成</div>
      <taTextarea
        :textareaValue="dailyForm.todayComplete"
        :placeholder="'请输入今日完成'"
        v-validate="'required|isNull'"
        name="todayComplete"
        :class="errors.has('todayComplete')?'error':''"
        v-model="dailyForm.todayComplete"
      ></taTextarea>
    </section>
    <section class="daily-field">
      <div class="field-label">未完成原因</div>
      <taTextarea
        :textareaValue="dailyForm.uncompleteReason"
        :placeholder="'请输入未完成原因'"
        v-model="dailyForm.uncompleteReason"
      ></taTextarea>
    </section>
    <section class="daily-field">
      <div class="field-label">追回计划</div>
      <taTextarea
        :textareaValue="dailyForm.onlineOther"
        :placeholder="'请输入追回计划'"
        v-model="dailyForm.onlineOther"
      ></taTextarea>
    </section>
    <section class="daily-field">
      <div class="field-label">本周周二上线计划</div>
      <taTextarea
        :textareaValue="dailyForm.online2"
        :placeholder="'请输入周二上线计划'"
        v-model="dailyForm.online2"
      ></taTextarea>
    </section>
    <section class="daily-field">
      <div class="field-label">本周周四上线计划</div>
      <taTextarea
        :textareaValue="dailyForm.online4"
        :placeholder="'请输入周四上线计划'"
        v-model="dailyForm.online4"
      ></taTextarea>
    </section>
    <section class="daily-field">
      <div class="field-label">本周其他上线计划</div>
      <taTextarea
        :textareaValue="dailyForm.onlineOther"
        :placeholder="'请输入其他上线计划'"
        v-model="dailyForm.onlineOther"
      ></taTextarea>
    </section>
    <van-button type="info" class="submitBtn" @click="_insertDaily()">提交</van-button>
  </section>
</template>

<script>
import textareaText from '@/base/textarea/textarea'
import { insertDaily, selectOneDaily } from '../../api/api'
export default {
  name: 'Remind',
  components: {
    taTextarea: textareaText
  },
  data() {
    return {
      title: '日报',
      dailyForm: {
        name: '',
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        online2: '',
        online4: '',
        todayComplete: '',
        uncompleteReason: '',
        onlineOther: ''
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    onInput(value) {
      const params = {
        'cache': true,
        'pageSize': 1,
        'pageNum': 1,
        'tableName': 'daily',
        'dataSource': 'dev',
        'version': '1.0.2',
        'param': {
          'name': value
        },
        'likeFields': [
          'name'
        ],
        'orderBy': [
          'createTime DESC'
        ],
        'pageNumber': 1
      }
      selectOneDaily(params).then((data) => {
        if (data.code != 0) {
          this.$toast.fail(data.msg)
          return
        }
        this.dailyForm = data.data.records[0]
      })
    },
    _insertDaily() {
      const params = {
        'cache': true,
        'pageSize': null,
        'pageNum': null,
        'tableName': 'daily',
        'dataSource': 'dev',
        'param': this.dailyForm,
        'likeFields': null,
        'extConditions': null,
        'orderBy': null,
        'pageNumber': null
      }
      this.$validator.validate().then((valid) => {
        if (valid) {
          insertDaily(params).then((data) => {
            if (data.code == 0) {
              this.$toast.success('提交成功!')
            }
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.remind {
  overflow: hidden;
  padding-bottom: 30px;
  .daily-field {
    margin-top: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ededed;
  }
  .field-label {
    font-size: 24px;
    padding: 6px 24px;
    position: relative;
  }
  .field-label.required::before {
    position: absolute;
    left: 10px;
    color: #ee0a24;
    font-size: 16px;
    content: "*";
  }
  .submitBtn {
    display: block;
    margin: 40px auto 0;
    width: 400px;
    height: 80px;
    border-radius: 20px;
  }
}
</style>
