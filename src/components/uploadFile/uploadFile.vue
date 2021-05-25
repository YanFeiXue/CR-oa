<template>
  <section class="uploadFile appView" id="leftToDom">
    <van-header :title="title" path="-1" routeName="back"></van-header>
    <van-tabs v-model="active" @click="tabClick">
      <van-tab :title="item.groupName" v-for="(item,index) in dataInfo" :key="index">
        <section class="item" v-for="(child,_index) in item.firstFileDirModelList" :key="_index"
          @click.stop="itemClick(child.secondFileNodeDirModelList,child)">
          <img :src="child.imgIcon" class="w80 h80" />
          <span v-text="child.fileDirName"></span>
        </section>
      </van-tab>
    </van-tabs>
    <van-action-sheet v-model="sheet_flag" cancel-text="取消" :actions="secondDirlList" @cancel="onCancel_sheet"
      @select="onSelect_sheet" />
  </section>
</template>

<script>
  import Vue from 'vue'
  import {
    Tab,
    Tabs,
    ActionSheet
  } from 'vant'

  Vue.use(Tab)
    .use(Tabs)
    .use(ActionSheet)
  import Header from '../../base/Header'
  import {
    getFileListById,
    selectAllFileNodeDir
  } from '../../api/api'
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    name: 'uploadFile',
    components: {
      'van-header': Header
    },
    data() {
      return {
        title: '工作计划',
        active: 0,
        dataInfo: [],
        isShow: false,
        queryData: {},
        leaseId: this.$route.query.leaseId,
        productCode: this.$route.query.productCode,
        productId: this.$route.query.productId,
        productVersion: this.$route.query.productVersion,
        sheet_flag: false,
        secondDirlList: []
      }
    },
    computed: {
      ...mapGetters(['attachmentIndex'])
    },
    beforeRouteLeave(to, from, next) {
      if (to.name == 'processFile') {
        this.setIndex(0)
      }
      next()
    },
    mounted() {
      this.active = this.attachmentIndex
      this.$nextTick(() => {
        this._selectAllFileNodeDir()
      })
      this.initData()
    },
    methods: {
      changeState(data) {
        this.isShow = data
      },
      tabClick(name, title) {
        this.setIndex(name)
      },
      _selectAllFileNodeDir() {
        this.$toast.loading({
          mask: false,
          message: '目录加载中...'
        })
        selectAllFileNodeDir({
          leaseId: this.leaseId
        }).then(data => {
          if (data.code != 0) {
            this.$toast.fail(data.msg)
            return
          }
          setTimeout(() => {
            this.$toast.clear()
          }, 400)
          this.dataInfo = data.data
        })
      },
      itemClick(secondDirlList, item) {
        console.log(secondDirlList, item);
        if (secondDirlList.length) {
          this.sheet_flag = true
          this.obj = {}
          this.itemAllList = []

          this.secondDirlList = []
          secondDirlList.forEach(items => {
            let fileDirId = []
            fileDirId[0] = items.fileDirId
            this.obj = {
              name: items.fileName,
              value: fileDirId,
              fileNodeDirId: items.id
            }
            this.itemAllList.push(items.fileDirId)
            this.secondDirlList.push(this.obj)
          })
          this.itemAllList = Array.from(new Set(this.itemAllList))
          this.itemAll = {
            name: '全部',
            value: this.itemAllList,
            fileNodeDirId: ''
          }
          this.secondDirlList.push(this.itemAll)
        } else {
          let arr = []
          arr[0] = item.fileDirId
          this.jump(item.fileDirName, arr)
        }
      },
      jump(title, id, fileNodeDirId) {
        console.log(title, id, fileNodeDirId);
        this.queryData = {
          title: title,
          id: id,
          leaseId: this.leaseId,
          productCode: this.productCode,
          applyNo: this.$route.query.applyNo
        }
        if (fileNodeDirId) {
          this.queryData.fileNodeDirId = fileNodeDirId
        }
        if (id[0] == '26') {
          this.path = '/pageMain/attachment-carImage'
        } else if (id[0] == '27') {
          this.path = '/pageMain/attachment-video'
        } else if (id[0] == '3' && fileNodeDirId == '7') {
          this.path = '/pageMain/attachment-video'
        } else {
          this.path = '/pageMain/attachment'
        }
        this.$router.push({
          path: this.path,
          query: this.queryData
        })
      },
      initData() {
        const _this = this

        function PreadFile(filePath) {
          return new Promise(function(resolve, reject) {
            _this.$dictionary.initDic().then(res => {
              _this.setDics(res)
              resolve(res)
            })
          })
        }
        PreadFile().then(() => {
          _this.$dictionary.initArea().then(res => {
            _this.setArea(res)
          })
        })
        if (this.$route.query.leaseId) {
          this.setLeaseId(this.$route.query.leaseId)
        }
      },
      _getFileListById() {
        getFileListById({
          leaseId: this.leaseId,
          productCode: this.productCode
        }).then(data => {
          if (data.code != 0) {
            return
          }
          this.dataInfo = data.data.data
        })
      },
      onSelect_sheet(item) {
        console.log(item);
        this.jump(item.name, item.value, item.fileNodeDirId)
      },
      onCancel_sheet() {},
      ...mapMutations({
        setIndex: 'SET_ATTACHMENTINDEX',
        setDics: 'SET_DICS',
        setArea: 'SET_AREA',
        setLeaseId: 'SET_LEASEID'
      })
    },
    watch: {}
  }
</script>

<style lang="less" scoped="scoped">
  body {
    .uploadFile {

      /deep/.van-tabs{
        .van-tabs__wrap {
          height: 100px;
          margin: auto;

          .van-tabs__nav{
            margin: 15px 0;
            height: 70px;
            .van-tab--active {
              color: #24A494;
              font-weight: bold;
              .van-tab__text {
                height: 70px;
                line-height: 70px;
              }
            }
            .van-tab {
              font-size: 34px;
              height: 70px;
              .van-tab__text {
                height: 70px;
                line-height: 70px;
              }
            }
            .van-tabs__line {
              width: 48px;
              height: 6px;
              background: #24A494;
              border-radius: 3px;
            }
          }
        }
      }

      /deep/.van-popup--bottom.van-popup--round {
          border-radius: 40px 40px 0 0;

          .van-picker__toolbar {
            padding: 20px 20px
          }
        }

        // 上拉菜单
        .van-popup--bottom.van-action-sheet {
          max-height: 600px;
          overflow-y: scroll;
          border-radius: 40px 40px 0 0;

          .van-action-sheet__item {
            height: 80px;
            line-height: 80px;
            font-size: 28px;
            background: none;
            border-bottom: 1px solid #ededed;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .van-action-sheet__item:first-child {
            border-radius: 40px 40px 0 0;
          }

          .van-action-sheet__cancel {
            font-size: 30px;
            line-height: 70px
          }
        }

      .van-tab__pane {
        display: flex;
        align-items: center;
        justify-content: start;
        flex-wrap: wrap;
      }

      .item {
        width: 220px;
        height: 160px;
        margin: 32px 0 0 20px;
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        font-size: 26px;
        color: #1f1f1f;
        background: #FFFFFF;
        box-shadow: 0px 0px 40px 0px rgba(227, 227, 227, 0.8);
        border-radius: 24px;

        span {
          padding: 10px 0;
          display: block;
          text-align: center;
          font-size: 24px;
          color: #333333;
        }

        .spsc {
          margin-top: 20px;
        }

        .w150 {
          width: 150px;
        }

        img {
          margin-top: 15px;
        }

        .w80 {
          width: 80px;
        }

        .h80 {
          height: 80px;
        }

        .take-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 216px;
          height: 180px;
          z-index: 9;
          opacity: 0;
        }
      }

      .item span::after {
        content: '';
        position: absolute;
        width: 216px;
        height: 180px;
        top: 0;
        left: 0;
      }
    }
  }
</style>
