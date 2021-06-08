<template>
  <section class="dealer-aegis appView" id="leftToDom">
    <div class="dealer-info-nav">
      <van-icon name="arrow-left" class="arrow-left" @click="$router.back()" />
      <div class="nav-container">
        <span :class="active == 1 ? 'active' : ''" @click="active = 1">申请中</span>
        <span :class="active == 2 ? 'active' : ''" @click="active = 2">审批中</span>
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
        active: 2
      }
    },
    mounted() {
      this.active = this.$route.query.active
    },
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
    width: 702px;
    height: auto;
    min-height: 400px;
    background: #ffffff;
    box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
    border-radius: 24px;
    padding: 20px 24px;
    box-sizing: border-box;
    margin: 20px auto;

    .item-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      font-size: 30px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;

      div:last-child {
        color: #999999;
      }
    }
  }

  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      width: 33%;
      padding: 30px 0;
      text-align: center;
    }
  }

  .content.content-header {
    background: #ccc;

    span {
      padding: 15px 0;
    }
  }
</style>
