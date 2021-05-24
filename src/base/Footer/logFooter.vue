<template>
  <div class="footer">
    <van-tabbar v-model="active">
      <van-tabbar-item to="/pageMain/look-log">
        <span>看日志</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.activelook : icon.inactivelook" />
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/pageMain/write-log">
        <span>写日志</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.activewrite : icon.inactivewrite" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Tabbar,
    TabbarItem
  } from 'vant'
  Vue.use(Tabbar).use(TabbarItem)
  export default {
    name: 'Footer',
    props: {
      activeNum: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        active: 0,
        icon: {
          activelook: './static/img/kanrizhi_active.png',
          inactivelook: './static/img/kanrizhi.png',
          activewrite: './static/img/xierizhi_active.png',
          inactivewrite: './static/img/xierizhi.png',
        }
      }
    },
    mounted() {
      this.active = this.activeNum
    }
  }
</script>
<style lang="less" scoped="scoped">
  .footer {
    box-shadow: 0px -4px 40px 0px rgba(227, 227, 227, 0.5);
    .van-tabbar--fixed {
      height: 100px;

      .van-tabbar-item--active {
        color: #22a78e;

        .van-tabbar-item__icon {
          img {
            position: relative;
            right: 3px;
          }
        }
      }

      .van-tabbar-item {
        .van-tabbar-item__icon {
          font-size: 34px;

          img {
            height: 45px;
          }
        }

        .van-tabbar-item__text {
          font-size: 26px;
        }
      }
    }
  }
</style>
