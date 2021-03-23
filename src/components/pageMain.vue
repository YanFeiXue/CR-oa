<template>
  <section class="pageMain">
    <transition :name="direction">
      <router-view />
    </transition>
  </section>
</template>

<script>
import { leftTo } from '../common/js/mixin'
export default {
  name: 'PageMain',
  mixins: [leftTo],
  data() {
    return {
      current: 0
    }
  },
  components: {},
  created() {
    this.isExpired()
  },
  mounted() {},
  methods: {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
