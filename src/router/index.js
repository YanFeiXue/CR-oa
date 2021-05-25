import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login')
    },
    {
      path: '/viewMain',
      name: 'viewMain',
      component: () => import('@/components/viewMain'),
      redirect: '/viewMain/home',
      children: [{
          path: 'home',
          name: 'home',
          component: () => import('@/components/home')
        }, // 代理商维护
        {
          path: 'dealer-aegis',
          name: 'dealer-aegis',
          component: () => import('@/components/dealer-aegis')
        }, // 差旅费报销
        {
          path: 'travel-reimbursement',
          name: 'travel-reimbursement',
          component: () => import('@/components/travel-reimbursement')
        },
        {
          path: 'userInfo',
          name: 'userInfo',
          component: () => import('@/components/userInfo')
        }
      ]
    },
    {
      path: '/pageMain',
      name: 'pageMain',
      component: () => import('@/components/pageMain'),
      children: [
        // 消息提醒
        {
          path: 'remind',
          name: 'remind',
          component: () => import('@/components/remind')
        },
        // 销售任务
        {
          path: 'sales-task',
          name: 'salesTask',
          component: () => import('@/components/sales-task')
        },
        // 工作计划
        {
          path: 'work-plan',
          name: 'workPlan',
          component: () => import('@/components/work-plan')
        },
        // 新建日程
        {
          path: 'new-schedule',
          name: 'newSchedule',
          component: () => import('@/components/new-schedule')
        },
        // 修改日程
        {
          path: 'edit-schedule',
          name: 'editSchedule',
          component: () => import('@/components/edit-schedule')
        },
        // 添加日程
        {
          path: 'add-schedule',
          name: 'addSchedule',
          component: () => import('@/components/add-schedule')
        },
        // 代理商维护
        {
          path: 'dealer-info',
          name: 'dealerInfo',
          component: () => import('@/components/dealer-info')
        },
        {
          path: 'schedule-details',
          name: 'scheduleDetails',
          component: () => import('@/components/schedule-details')
        },
        // 我的申请
        {
          path: 'my-apply',
          name: 'myApply',
          component: () => import('@/components/my-apply')
        },
        // 我的审批
        {
          path: 'my-approval',
          name: 'myApproval',
          component: () => import('@/components/my-approval')
        },
        // 日报
        {
          path: 'daily',
          name: 'daily',
          component: () => import('@/components/daily')
        },
        //
        {
          path: 'daily-details',
          name: 'dailyDetails',
          component: () => import('@/components/daily-details')
        },
        // 签到
        {
          path: 'signIn',
          name: 'signIn',
          component: () => import('@/components/signIn')
        },
        // 团队计划
        {
          path: 'team-plan',
          name: 'team-plan',
          component: () => import('@/components/team-plan')
        },

        // 暂停放款
        {
          path: 'suspend-loan',
          name: 'suspend-loan',
          component: () => import('@/components/suspend-loan')
        },
        // 暂停进件
        {
          path: 'suspend-work',
          name: 'suspend-work',
          component: () => import('@/components/suspend-work')
        },
        // 预审批记录
        {
          path: 'approval-record',
          name: 'approval-record',
          component: () => import('@/components/approval-record/approval-record')
        },
        // 状态查询
        {
          path: 'state-select',
          name: 'state-select',
          component: () => import('@/components/stateSelect/state-select')
        },
        {
          path: 'operational-list',
          name: 'operational-list',
          component: () => import("@/base/approval-opinion/operational-list")
        },
        {
          path: 'incoming',
          name: 'incoming',
          component: () => import("@/components/incoming/incoming")
        },
        {
          path: 'uploadFile',
          name: 'uploadFile',
          component: () => import("@/components/uploadFile/uploadFile")
        },
        {
          path: 'attachment',
          name: 'attachment',
          component: () => import("@/base/attachment/attachment"),
        },
        {
          path: 'attachment-video',
          name: 'attachment-video',
          component: () => import("@/base/attachment/attachment-video"),
        },
        {
          path: 'attachment-carImage',
          name: 'attachment-video',
          component: () => import("@/base/attachment/attachment-carImage"),
        },
        {
          path: 'look-log',
          name: 'look-log',
          component: () => import("@/components/log/look-log")
        },
        {
          path: 'write-log',
          name: 'write-log',
          component: () => import("@/components/log/write-log")
        }
      ]
    }

  ]
})
