<template>
  <div class="header">
    <van-nav-bar :title="title" :left-arrow="leftArrow" @click-left="routePush()"></van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: ''
    },
    routeName: {
      type: String,
      default: '/viewMain/home'
    },
    path: {
      type: String,
      default: '-1'
    },
    leftArrow: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {}
  },
  methods: {
    routePush() {
      if (this.path == '-1') {
        if (this.routeName == 'back' || this.routeName == '') {
          window.history.go(-1)
          return
        }
        this.$router.push(this.routeName)
      } else {
        this.$router.push({
          path: this.routeName,
          query: {
            path: this.path
          }
        })
      }
      document.getElementById('app').classList.add('quickback')
      setTimeout(function() {
        document.getElementById('app').classList.remove('quickback')
      }, 250)
    }
  }
}
</script>
