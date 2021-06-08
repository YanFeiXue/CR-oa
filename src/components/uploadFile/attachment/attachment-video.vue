<template>
  <section class="upload appView" id="leftToDom">
    <div class="header">
      <van-header :title="dataInfo.title" path="-1" routeName="back"></van-header>
      <div class="fileWrap" v-if="fileList.length != 0">
        <div v-for="(item, index) in fileList" :key="index" class="fileDiv">
          <img class="img" v-lazy="item.resizeUrl?item.resizeUrl:item.appInitUrl+'&tokenId=' + this.tokenId"
            @click="showImg(index)" />
        </div>
      </div>
      <van-details v-else></van-details>
    </div>
  </section>
</template>

<script>
  import Vue from 'vue'
  import {
    Uploader,
    Lazyload,
    ImagePreview
  } from 'vant'
  import { upload } from '../../../common/js/mixin'
  Vue.use(Uploader).use(ImagePreview).use(Lazyload)
  import {
    getFileListByTypeId,
    getFileListById,
  } from '../../../api/api'
  import Header from '../../../base/Header'
  export default {
    name: 'upload',
    mixins: [upload],
    data() {
      return {}
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
              if (file.ossurl) {
                this.images.push(`${file.resizeUrl}`)
              } else {
                this.images.push(`${file.appInitUrl}&tokenId=${this.tokenId}`)
              }
            })
            setTimeout(() => {
              this.$toast.clear()
            }, 1000)
          }
        })
      },
      filterFile(fileName) {
        const reg = new RegExp(/pdf|jpg|png|jpeg|gif/)
        return reg.test(fileName)
      },
      beforeRead(file) {
        this.formData = new FormData()
        return new Promise((resolve, reject) => {
          resolve(file)
        })
        return true
      },
      afterRead(file, isVideo) {
        const appNum = this.fileLen + 1
        const storeAs = `${this.dataInfo.title}-${this.dataInfo.applyNo}-${appNum}.mp4`
        // if (isVideo == 1) {
        //   this._multipartUpload(file, storeAs)
        // } else {
        this._multipartUpload(file.file, storeAs)
        //}
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

    .fileWrap {
      width: 710px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      position: relative;
      padding-top: 30px;

      .fileDiv {
        position: relative;

        .video {
          width: 340px;
        }

        .delete {
          font-size: 40px;
          position: absolute;
          right: 20px;
          bottom: 20px;
          z-index: 99;
        }
      }

      .pdfDiv {
        width: 48%;
        line-height: 235px;
        text-align: center;
        font-size: 28px;
      }

      .img {
        width: 350px;
        height: 235px;
        margin-top: 20px;
      }
    }

  .box {
    position: absolute;
    left: 50%;
    top: 280px;
    width: 100%;
    height: 50px;
    transform: translate(-50%, -30%);
  }

  .process-wrap {
    width: 80%;
    height: 20px;
    margin: 0 auto;
    box-shadow: 0 0 10px #eee inset;
    border-radius: 10px;
    border: 2px solid #eee;
    background: #fff;
    margin-top: 20px;
    position: relative;
    display: none;
  }

  .children {
    width: 0;
    height: 20px;
    box-shadow: 0 0 5px #eee outset;
    border-radius: 10px;
    background: #6c9fff;
  }

  #percent {
    position: absolute;
    top: -4px;
    left: 0;
    margin: 0;
  }
</style>
