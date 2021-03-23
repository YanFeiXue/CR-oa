<template>
  <section class="viewMainTabbar">
    <transition :name="direction">
      <router-view />
    </transition>
  </section>
</template>

<script>
import { leftTo } from '../common/js/mixin'
export default {
  name: 'ViewMainTabbar',
  mixins: [leftTo],
  data() {
    return {
    }
  },
  created() {
    this.isExpired()
  },
  methods: {
    /*
    是否在有效期内
    */
    isExpired() {
      if (localStorage.getItem('isExpired') == null) {
        return
      }
      const val = JSON.parse(localStorage.getItem('isExpired'))
      if (Date.now() - val.time > val.expire) {
        this.$toast.fail('登录过期,请重新登录!')
        this.clearAllToast()
        localStorage.clear()
        this.$router.push('/login')
      }
    },
    clearAllToast() {
      setTimeout(() => {
        this.$toast.clear()
      }, 900)
    },
    isOverlay(data) {
      this.overlayShow = data
    }
  }
}
</script>

<!-- upgrade_tips@2x.png Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
