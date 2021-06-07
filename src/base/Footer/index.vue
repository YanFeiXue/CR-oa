<template>
  <div class="footer">
    <van-tabbar v-model="active">
      <van-tabbar-item to="/viewMain/home">
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.activeHome : icon.inactiveHome" />
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/viewMain/dealer-aegis">
        <span>维护</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.activeOrder : icon.inactiveOrder" />
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/viewMain/travel-reimbursement">
        <span>报销</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.activeNews : icon.inactiveNews" />
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/viewMain/userInfo">
        <span>我的</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.activeMy : icon.inactiveMy" />
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
          activeHome: './static/img/home_active.png', 
          inactiveHome: './static/img/home.png',
          activeOrder: './static/img/maintain_active.png',
          inactiveOrder: './static/img/maintain.png',
          activeNews: './static/img/Reimbursement_active.png',
          inactiveNews: './static/img/Reimbursement.png',
          activeMy: './static/img/mine_active.png',
          inactiveMy: './static/img/mine.png'
        }
      }
    },
    mounted() {
      this.active = this.activeNum
    }
  }
</script>
<style lang="less">
  .footer {
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
