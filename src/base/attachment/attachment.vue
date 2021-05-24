<template>
  <section class="upload appView" id="leftToDom">
    <div class="header">
      <van-header :title="dataInfo.title" path="-1" routeName="back"></van-header>
      <div class="fileWrap" v-if="fileList.length!=0">
        <div v-for="(item,index) in fileList" :key="item.fileId" v-show="!filterFile(item.fileName)" class="fileDiv">
          <img class="img" v-lazy="item.ossurl ? item.resizeUrl : item.appInitUrl + '&tokenId='+tokenId"
            @click="showImg(index)" />
        </div>
        <div class="pdfDiv" v-for="(item, index) in fileList" :key="index*100"
          @click="showFile(item.fileName,item.downUrl+'&tokenId='+tokenId)" v-show="filterFile(item.fileName)">
          {{item.fileName}}</div>
      </div>
      <van-details v-else></van-details>
    </div>
  </section>
</template>

<script>
  import Header from '../../base/Header'
  import {
    getFileListByTypeId,
    getStsToken,
    getFileListById,
  } from '../../api/api'
  import { upload } from '../../common/js/mixin'
  export default {
    name: 'upload',
    mixins: [upload],
    data() {
      return {
        filesList: [],
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
      showFile(filename, file) {
        const _this = this
        const isAndroid = sessionStorage.getItem('isAndroid')
        window.location.href = file
      },
      filterFile(fileName) {
        const reg = new RegExp(/pdf/)
        return reg.test(fileName)
      },
      beforeRead(file) {
        this.formData = new FormData()
        console.log(file)
        return new Promise((resolve, reject) => {
          resolve(file)
        })
        return true
      },
      afterRead(file, num) {
        if (!num) {
          num = 1
        }
        const appNum = this.fileLen + num
        const storeAs = `${this.dataInfo.title}-${this.dataInfo.applyNo}-${appNum}.jpg`
        this._multipartUpload(file, storeAs)
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
          console.log(data);
          this.fileList = data.data
          this.fileLen = data.data.length
          if (data.data.length == 0) {
            this.$toast.clear()
          } else {
            this.lrzList = []
            this.images = []
            this.fileList.forEach((file) => {
              if (file.ossurl) {
                this.images.push(`${file.ossurl}`)
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

    },
    watch: {},
  }
</script>

<style lang="less">
  .upload {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;

    .headImage {
      position: absolute;
      top: 100px;
      width: 100%;
      height: 210px;
      z-index: 99;
    }

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
        color: #0000cc;
        line-height: 235px;
        text-align: center;
        font-size: 28px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-decoration: underline;
      }

      .img {
        width: 350px;
        height: 235px;
        margin-top: 20px;
      }
    }

    .box {
      top: 296px;
    }
  }
</style>
