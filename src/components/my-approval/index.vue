<template>
  <section class="dealer-aegis appView" id="leftToDom">
    <div class="dealer-info-nav">
      <van-icon name="arrow-left" class="arrow-left" @click="$router.back()"/>
      <div class="nav-container">
        <span
:class="active == 1 ? 'active' : ''"
@click="active = 1"
          >经销商维护</span
        >
        <span
:class="active == 2 ? 'active' : ''"
@click="active = 2"
          >跟进记录</span
        >
      </div>
    </div>
    <div class="dealer-aegis-wrapper">
      <section class="item-wrapper" @click="$router.push('/pageMain/dealer-info')">
        <div class="item-name">大连众信惠普</div>
        <div>任鹏</div>
        <div>18590941111</div>
      </section>
      <section class="item-wrapper">
        <div class="item-name">大连众信惠普</div>
        <div>任鹏</div>
        <div>18590941111</div>
      </section>
      <section class="item-wrapper">
        <div class="item-name">大连众信惠普</div>
        <div>任鹏</div>
        <div>18590941111</div>
      </section>
    </div>
    <van-footer :activeNum="1" />
  </section>
</template>

<script>
export default {
  name: 'SalesTask',
  data() {
    return {
      title: '销售任务',
      dateFlag: false,
      dateVal: '2020-2',
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    }
  },
  created() {},
  mounted() {},
  methods: {
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      }
      return val
    },
    dateChange() {
      this.dateVal = this.confirmPicker(this.currentDate)
      this.dateFlag = false
    },
    confirmPicker(value) {
      // 确定按钮，时间格式化并显示在页面上
      var date = value
      var m = date.getMonth() + 1
      var d = date.getDate()
      if (m >= 1 && m <= 9) {
        m = '0' + m
      }
      if (d >= 0 && d <= 9) {
        d = '0' + d
      }
      var timer = date.getFullYear() + '-' + m + '-' + d
      return timer
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.dealer-aegis-wrapper {

}
</style>
