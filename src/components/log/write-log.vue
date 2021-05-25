<template>
  <div>
    <van-header :title="logtitle" path="/viewMain/home" :showSearch="true"></van-header>
    <div class="log_body">
      <div class="log_item" v-for="(item, index) in logList" @click="logListClick(item)">
        <p class="log_name">{{item.name}}</p>
        <div v-for="(item1, index1) in item.contentList" :key="index1">
          <div class="log_title">
            <p>{{item1.title}}</p>
          </div>
          <div class="log_content">
            <p>请输入</p>
          </div>
        </div>
      </div>
    </div>

    <van-footer :activeNum="1" />
  </div>
</template>

<script>
  import header from '../../base/Header'
  import footer from '../../base/Footer/logFooter'
  export default{
    components: {
      'van-header': header,
      'van-footer': footer
    },
    data() {
      return {
        logtitle: '写日志',
        logList:[
          {
            name:'日报',
            contentList:[
              {
                title:'今日完成工作'
              },
              {
                title:'未完成工作'
              },
              {
                title:'需协调工作'
              }
            ]
          },
          {
            name:'周报',
            contentList:[
              {
                title:'任务指标进度'
              },
              {
                title:'反馈的问题'
              },
              {
                title:'需协调工作'
              }
            ]
          }
        ]
      }
    },
    mounted() {

    },
    methods: {
      logListClick(item) {
        this.$router.push({path:'/pageMain/log-details', query:{
          type: 'write'
        }})
      }
    },
  }
</script>

<style lang="scss" scoped="scoped">
  .log_body{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    .log_item{
      width: 220px;
      height: 320px;
      background: #FFFFFF;
      box-shadow: 0px 0px 38px 0px rgba(227,227,227,0.8);
      border-radius: 8px;
      box-sizing: border-box;
      padding: 20px;
      margin: 20px;
      .log_name{
        font-size: 40px;
        color: #191F25;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .log_title{
        font-size: 18px;
        color: #4D4D4D;
      }
      .log_content{
        font-size: 18px;
        color: #B5B5B5;
        margin-bottom: 10px;
      }
    }
  }
</style>
