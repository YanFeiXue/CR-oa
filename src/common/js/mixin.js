export const leftTo = {
  data() {
    return {
      // transitionName: '', //路由transition
      direction: '',
      // touchLeft 划动起点界限，起点在靠近屏幕左侧时才有效
      touchLeft: (document.documentElement.clientWidth * 2) / 5,
      // touchStartPoint 记录起始点X坐标
      touchStartPoint: 0,
      // distance 记录划动的距离
      distance: 0,
      // 回退按钮的dom，根据页面上是否存在此dom来判断该路由是否可回退
      backBtn: null
    }
  },
  mounted() { },
  methods: {
    bodyTouchStart: function (event) {
      this.backBtn = document.getElementById('leftToDom')
      if (this.backBtn) {
        // 获得起点X坐标，初始化distance为0
        this.touchStartPoint = event.targetTouches[0].pageX
        this.distance = 0
      }
    },
    bodyTouchMove: function (event) {
      if (this.backBtn && this.touchStartPoint < this.touchLeft) {
        // 只监听单指划动，多指划动不作响应
        if (event.targetTouches.length > 1) {
          return
        }
        // 实时计算distance
        this.distance = event.targetTouches[0].pageX - this.touchStartPoint
        // 根据distance在页面上做出反馈。这里演示通过返回按钮的背景变化作出反馈
        if (this.distance > 0 && this.distance < 100) {
          this.backBtn.style.backgroundPosition =
            ((this.distance - 100) / 100) * 50 + 'px 0'
        } else if (this.distance >= 100) {
          this.backBtn.style.backgroundPosition = '0 0'
        } else {
          this.backBtn.style.backgroundPosition = '-50px 0'
        }
      }
    },
    bodyTouchEnd: function (event) {
      if (this.backBtn && this.touchStartPoint < this.touchLeft) {
        // 划动结束，重置数据
        this.touchStartPoint = 0
        this.backBtn.style.backgroundPosition = '-50px 0'
        // 当划动距离超过100px时，触发返回事件
        if (this.distance > 100) {
          // 返回前修改样式，让过渡动画看起来更快
          document.getElementById('app').classList.add('quickback')
          if (window.location.hash.search('approval-success') != -1) {
            window.location.hash = '/viewMainTabbar/viewMain'
          } else {
            this.$router.back()
          }
          setTimeout(function () {
            document.getElementById('app').classList.remove('quickback')
          }, 250)
        }
      }
    }
  },
  watch: {
    // 使用watch 监听$router的变化
    $route(to, from) {
      if (sessionStorage.getItem('tokenid') != null) {
        sessionStorage.setItem('accessToken', sessionStorage.getItem('tokenid'))
      }
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      if (from.name == null) {
        this.direction = ''
      } else {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.direction = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      setTimeout(() => {
        $('#app').scrollTop(0)
      }, 200)
    }
  }
}
