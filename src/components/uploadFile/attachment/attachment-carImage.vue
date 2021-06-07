<template>
  <section class="upload-carImage appView" id="leftToDom">
    <div class="header">
      <van-header :title="dataInfo.title" path="-1" routeName="back"></van-header>
      <section class="ocr-wrap">
        <div class="idCardA item" v-for="(item, index) in localList" :key="index" @click="fileName = item.fileName">
          <img v-if="item.appInitUrl" v-lazy="item.appInitUrl" />
          <div v-else class="imgWrap">
            <img :src="`./static/carImage/${index + 1}.jpg`" />
          </div>
          <div class="tip">{{ item.fileName }}</div>
        </div>
      </section>
    </div>
    <van-action-sheet v-model="public_show" cancel-text="取消" :actions="publicList" @select="onSelect" />
  </section>
</template>

<script>
  import Vue from 'vue'
  import Header from '../../../base/Header'
  import {
    Uploader,
    Lazyload,
    ImagePreview,
    Overlay,
    ActionSheet
  } from 'vant'
  Vue.use(Uploader).use(ImagePreview).use(Lazyload).use(Overlay).use(ActionSheet)
  import { upload } from '../../../common/js/mixin'
  import {
    getFileListById,
  } from '../../../api/api'
  export default {
    name: 'upload',
    mixins: [upload],
    data() {
      return {
        localList: [{
            fileName: '登记证书1-2页',
            appInitUrl: '',
          },
          {
            fileName: '登记证书3-4页',
            appInitUrl: '',
          },
          {
            fileName: '登记证书5-6页',
            appInitUrl: '',
          },
          {
            fileName: '登记证书7-8页',
            appInitUrl: '',
          },
          {
            fileName: '行驶证',
            appInitUrl: '',
          },
          {
            fileName: '车辆年检（有效期内）',
            appInitUrl: '',
          },
          {
            fileName: '验车人与买卖车辆合影',
            appInitUrl: '',
          },
          {
            fileName: '车架号',
            appInitUrl: '',
          },
          {
            fileName: '发动机舱',
            appInitUrl: '',
          },
          {
            fileName: '左前45°',
            appInitUrl: '',
          },
          {
            fileName: '车辆铭牌',
            appInitUrl: '',
          },
          {
            fileName: '后备箱',
            appInitUrl: '',
          },
          {
            fileName: '右后45°',
            appInitUrl: '',
          },
          {
            fileName: '仪表盘',
            appInitUrl: '',
          },
          {
            fileName: '中控台全景',
            appInitUrl: '',
          },
        ],
        fileName: '登记证书1-2页',
      }
    },
    components: {
      'van-header': Header,
    },
    mounted() {
      this._getFileListById()
      var YDB = new YDBOBJ()
      YDB.SetDragRefresh(0)
    },
    methods: {
      clickItem(fileName) {
        this.public_show = true
        this.fileName = fileName
      },
      filterFile(fileName) {
        const reg = new RegExp(/pdf/)
        return reg.test(fileName)
      },
      beforeRead(file) {
        this.formData = new FormData()
        return new Promise((resolve, reject) => {
          resolve(file)
        })
        return true
      },
      afterRead(file) {
        const storeAs = `${this.fileName}-${this.dataInfo.applyNo}.jpg`
        this._multipartUpload(file.file, storeAs)
      },
      _getFileListById() {
        this.$toast.loading({
          mask: false,
          message: '资料加载中...',
        })
        getFileListById({
          leaseId: this.dataInfo.leaseId,
          fileDirIds: this.dataInfo.id,
          fileNodeDirId: this.dataInfo.fileNodeDirId,
        }).then((data) => {
          this.fileList = data.data
          this.fileLen = data.data.length
          if (data.data.length == 0) {
            this.$toast.clear()
          } else {
            this.images = []
            this.fileList.forEach((file) => {
              for (var i in this.localList) {
                if (file.fileName.search(this.localList[i].fileName) != -1) {
                  if (file.ossurl) {
                    this.localList[i].appInitUrl = file.resizeUrl
                  } else {
                    this.localList[i].appInitUrl =
                      file.appInitUrl + '&tokenId=' + this.tokenId
                  }
                }
              }
              this.images.push(`${file.fileName}`)
            })
            setTimeout(() => {
              this.$toast.clear()
            }, 1000)
          }
        })
      },
      del(fileId) {
        this.$dialog
          .confirm({
            title: '提示', // 加上标题
            message: '是否删除该文件?', // 改变弹出框的内容
          })
          .then(() => {
            deleteFile({
              fileId: fileId,
              tokenId: sessionStorage.getItem('tokenid'),
            }).then((data) => {
              if (data.code != '0') {
                this.$toast.fail('删除文件失败')
              } else {
                this.$toast.success('删除成功')

                setTimeout(() => {
                  this._getFileListByFileDirId()
                  this.$toast.clear()
                }, 1000)
              }
            })
          })
          .catch(() => {
            // on cancel
          })
      },
    },
    watch: {},
  }
</script>

<style lang="less">
  
</style>
