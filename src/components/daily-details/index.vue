<template>
  <section class="remind appView" id="leftToDom">
    <van-header :title="title" :leftArrow="false"></van-header>
    <div class="daily-container">
      <aside class="sidebar">
        <van-sidebar v-model="activeKey" class="vanSidebar">
          <van-sidebar-item
            :title="item"
            :key="index"
            v-for="(item, index) in userList"
          />
        </van-sidebar>
      </aside>
      <section class="sidebar-content">
        <section class="daily-field">
          <div class="field-label required">日报姓名</div>
          <taTextarea
            :textareaValue="dailyForm.name"
            :placeholder="'请输入日报姓名'"
            v-model="dailyForm.name"
          ></taTextarea>
        </section>
        <section class="daily-field">
          <div class="field-label required">周一计划</div>
          <taTextarea
            :textareaValue="dailyForm.monday"
            :placeholder="'请输入周一计划'"
            :disabled="true"
            v-model="dailyForm.monday"
          ></taTextarea>
        </section>
        <section class="daily-field">
          <div class="field-label required">周二计划</div>
          <taTextarea
            :textareaValue="dailyForm.tuesday"
            :placeholder="'请输入周二计划'"
            :disabled="true"
            v-model="dailyForm.tuesday"
          ></taTextarea>
        </section>
        <section class="daily-field">
          <div class="field-label required">周三计划</div>
          <taTextarea
            :textareaValue="dailyForm.wednesday"
            :placeholder="'请输入周三计划'"
            :disabled="true"
            v-model="dailyForm.wednesday"
          ></taTextarea>
        </section>
        <section class="daily-field">
          <div class="field-label required">周四计划</div>
          <taTextarea
            :textareaValue="dailyForm.thursday"
            :placeholder="'请输入周四计划'"
            :disabled="true"
            v-model="dailyForm.thursday"
          ></taTextarea>
        </section>
        <section class="daily-field">
          <div class="field-label required">周五计划</div>
          <taTextarea
            :textareaValue="dailyForm.friday"
            :placeholder="'请输入周五计划'"
            :disabled="true"
            v-model="dailyForm.friday"
          ></taTextarea>
        </section>

        <section class="daily-field">
          <div class="field-label required">今日完成</div>
          <taTextarea
            :textareaValue="dailyForm.todayComplete"
            :placeholder="'请输入今日完成'"
            :disabled="true"
            v-model="dailyForm.todayComplete"
          ></taTextarea>
        </section>
        <section class="daily-field">
          <div class="field-label">未完成原因</div>
          <taTextarea
            :textareaValue="dailyForm.uncompleteReason"
            :placeholder="'请输入未完成原因'"
            :disabled="true"
            v-model="dailyForm.uncompleteReason"
          ></taTextarea>
        </section>
        <section class="daily-field">
          <div class="field-label">追回计划</div>
          <taTextarea
            :textareaValue="dailyForm.onlineOther"
            :placeholder="'请输入追回计划'"
            :disabled="true"
            v-model="dailyForm.onlineOther"
          ></taTextarea>
        </section>
        <section class="daily-field">
          <div class="field-label">本周周二上线计划</div>
          <taTextarea
            :textareaValue="dailyForm.online2"
            :placeholder="'请输入周二上线计划'"
            :disabled="true"
            v-model="dailyForm.online2"
          ></taTextarea>
        </section>
        <section class="daily-field">
          <div class="field-label">本周周四上线计划</div>
          <taTextarea
            :textareaValue="dailyForm.online4"
            :placeholder="'请输入周四上线计划'"
            :disabled="true"
            v-model="dailyForm.online4"
          ></taTextarea>
        </section>
        <section class="daily-field">
          <div class="field-label">本周其他上线计划</div>
          <taTextarea
            :textareaValue="dailyForm.onlineOther"
            :placeholder="'请输入其他上线计划'"
            :disabled="true"
            v-model="dailyForm.onlineOther"
          ></taTextarea>
        </section>
      </section>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { Sidebar, SidebarItem } from 'vant'
Vue.use(Sidebar).use(SidebarItem)
import textareaText from '@/base/textarea/textarea'
import { selectOneDaily } from '@/api/api'
export default {
  name: 'Remind',
  components: {
    taTextarea: textareaText
  },
  data() {
    return {
      title: '日报',
      activeKey: '',
      userList: [
        '杨粤',
        '林伟',
        '常翰',
        '李志伟',
        '马向鑫',
        '刘钊',
        '刘凯',
        '王跃启',
        '陈金玉',
        '聂建等',
        '董里',
        '李宗浩',
        '孙文杰',
        '张舒帆',
        '刘均杰',
        '何雨馨',
        '刘云基',
        '杨洋',
        '霍立平',
        '江子健',
        '张雄',
        '郭佳鹏',
        '陆宏宇',
        '徐林海',
        '李占豪',
        '向棕蓉',
        '孙安康',
        '冀闫利',
        '王明东',
        '白明辉',
        '卢东'
      ],
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
  created() {
    this._selectOneDaily()
  },
  watch: {
    activeKey(newVal, oldVal) {
      this._selectOneDaily()
    }
  },
  methods: {
    _selectOneDaily() {
      const params = {
        'cache': true,
        'pageSize': 1,
        'pageNum': 1,
        'tableName': 'daily',
        'dataSource': 'dev',
        'version': '1.0.2',
        'param': {
          'name': this.userList[this.activeKey] || '杨粤'
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
        // this.dailyForm.name = '1'
        // console.log(data.data.records[0], this.dailyForm)
        this.dailyForm = data.data.records[0]
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.remind {
  overflow: hidden;
  height: 100vh;
  .daily-container {
    position: relative;
    bottom:20px;
    display: flex;
    .sidebar {
      width: 150px;
      height: calc(100vh - 98px);
      overflow-y: scroll;
      z-index: 9;
      .vanSidebar {
        width: 100%;
      }
    }
    .sidebar-content {
      width: calc(100% - 160px);
      height: calc(100vh - 98px);
      overflow-y: scroll;
    }
    .daily-field {
      width: 100%;
      margin-top: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ededed;
    }
    .field-label {
      font-size: 24px;
      padding: 6px 24px;
      position: relative;
    }
  }
}
</style>
