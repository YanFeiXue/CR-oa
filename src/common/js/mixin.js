import {
  showAnnounce,
  markedRead,
  getStsToken,
  downloadFile
} from '../../api/api'
import Vue from 'vue'
import OSS from 'ali-oss'
import {
  Uploader,
  Lazyload,
  ImagePreview,
  ActionSheet
} from 'vant'

Vue.use(Uploader)
  .use(ImagePreview)
  .use(Lazyload)
  .use(ActionSheet)
export const leftTo = {
  data() {
    return {
      //transitionName: '', //路由transition
      direction: 'slide-left',
      // touchLeft 划动起点界限，起点在靠近屏幕左侧时才有效
      touchLeft: (document.documentElement.clientWidth * 2) / 5,
      // touchStartPoint 记录起始点X坐标
      touchStartPoint: 0,
      // distance 记录划动的距离
      distance: 0,
      // 回退按钮的dom，根据页面上是否存在此dom来判断该路由是否可回退
      backBtn: null
    }
  },
  mounted() {},
  methods: {
    bodyTouchStart: function(event) {
      this.backBtn = document.getElementById('leftToDom')
      if (this.backBtn) {
        // 获得起点X坐标，初始化distance为0
        this.touchStartPoint = event.targetTouches[0].pageX
        this.distance = 0
      }
    },
    bodyTouchMove: function(event) {
      if (this.backBtn && this.touchStartPoint < this.touchLeft) {
        // 只监听单指划动，多指划动不作响应
        if (event.targetTouches.length > 1) {
          return
        }
        // 实时计算distance
        this.distance = event.targetTouches[0].pageX - this.touchStartPoint
        // 根据distance在页面上做出反馈。这里演示通过返回按钮的背景变化作出反馈
        if (this.distance > 0 && this.distance < 100) {

        } else if (this.distance >= 100) {} else {}
      }
    },
    bodyTouchEnd: function(event) {
      if (this.backBtn && this.touchStartPoint < this.touchLeft) {
        // 划动结束，重置数据
        this.touchStartPoint = 0
        // 当划动距离超过100px时，触发返回事件
        if (this.distance > 100) {
          // 返回前修改样式，让过渡动画看起来更快
          if (window.location.hash.search("approval-success") != -1) {
            window.location.hash = '/viewMainTabbar/viewMain'
          } else {
            this.direction = ''
            //window.history.go(-1)
          }
        }
      }
    }
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      if (from.name == null) {
        this.direction = ''
      } else {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        if (to.name == 'viewMain') {
          this.direction = ''
          return
        }
        if (to.name == 'login' && from.name == 'viewMain') {
          window.location.hash = '/viewMainTabbar/viewMain'
          return
        }
        this.direction = 'slide-left'
      }
    }
  }
}

export const upload = {
  data() {
    return {
      public_show: false,
      publicList: [{
          value: 1,
          name: '拍照'
        },
        {
          value: 2,
          name: '相册'
        }
      ],
      fileList: [],
      images: [],
      dataInfo: {
        leaseId: this.$route.query.leaseId,
        title: this.$route.query.title,
        id: this.$route.query.id,
        fileNodeDirId: this.$route.query.fileNodeDirId || '',
        productCode: this.$route.query.productCode,
        tokenId: this.$route.query.tokenId,
        applyNo: this.$route.query.applyNo
      },
      lrzList: [],
      tokenId: sessionStorage.getItem('tokenid'),
    }
  },
  created() {

  },
  watch: {
    lrzList(newVal) {
      console.log(newVal);
      for (let i = 0; i < newVal.length; i++) {
        setTimeout(() => {
          this.afterRead(newVal[i].file, i + 1)
        }, 1000)
      }
    }
  },
  mounted() {
    this.initOss()
  },
  methods: {
    initOss() {
      getStsToken({}).then(res => {
        this.client = new OSS({
          accessKeyId: res.data.AccessKeyId,
          accessKeySecret: res.data.AccessKeySecret,
          stsToken: res.data.SecurityToken,
          endpoint: res.data.EndPoint,
          bucket: res.data.BucketName
        })
      })
    },
    _multipartUpload(file, storeAs) {
      const _this = this
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner'
      })
      this.client
        .multipartUpload(storeAs, file)
        .then(function(result) {
          _this._fileUpload(storeAs)
          _this.list()
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    async list() {
      try {
        // 不带任何参数，默认最多返回1000个文件
        let result = await this.client.list()
        //console.log(JSON.stringify(result))
      } catch (e) {
        console.log(e)
      }
    },
    _fileUpload(storeAs) {
      let params = {
        leaseId: this.dataInfo.leaseId,
        fileName: storeAs,
        typeId: this.dataInfo.id.join(''),
        systemId: this.dataInfo.productCode,
        fileNodeDirId: this.dataInfo.fileNodeDirId,
        tokenId: sessionStorage.getItem('tokenid')
      }
      downloadFile(params).then(data => {
        if (data.code != 0) {
          this.fileUploadCallBack(0)
          return
        }
        this.fileUploadCallBack(1)
      })
    },
    fileUploadCallBack(status) {
      if (!status) {
        this.$toast.fail('上传失败!')
      } else {
        this.$toast.success('上传成功!')
        setTimeout(() => {
          this._getFileListByFileDirId()
        }, 1000)
      }
    },
    showImg(index) {
      ImagePreview({
        images: this.images,
        lazyLoad: true,
        loop: true,
        closeOnPopstate: true,
        startPosition: index
      })
    },

    onSelect(item) {
      item.value == 1 ? this.getImage() : this.galleryImg()
      this.public_show = false
    },
    getImage() {
      const _this = this
      var cmr = plus.camera.getCamera()
      cmr.captureImage(
        function(p) {
          plus.io.resolveLocalFileSystemURL(
            p,
            function(entry) {
              _this.compressImage(entry.toLocalURL(), entry.name)
            },
            function(e) {
              //outLine('读取拍照文件错误：' + e.message);
            }
          )
        },
        function(e) {}, {
          filename: '_doc/camera/',
          index: 1
        }
      )
    },
    compressImage(url, filename, num) {
      const _this = this
      var name = '_doc/camera/' + filename
      plus.zip.compressImage({
          src: url, //src: (String 类型 )压缩转换原始图片的路径
          dst: name, //压缩转换目标图片的路径
          quality: 90, //quality: (Number 类型 )压缩图片的质量.取值范围为1-100
          overwrite: true, //overwrite: (Boolean 类型 )覆盖生成新文件
        },
        function(zip) {
          //页面显示图片
          _this.showPics(zip.target, name, num)
        },
        function(error) {
          //plus.nativeUI.toast("压缩图片失败，请稍候再试");
        }
      )
    },
    showPics(url, name, num) {
      const _this = this
      //根据路径读取到文件
      plus.io.resolveLocalFileSystemURL(url, function(entry) {
        entry.file(function(file) {
          var fileReader = new plus.io.FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onloadend = function(e) {
            //_this.picUrl = e.target.result.toString()
            let aa = {
              file: file
            }
            _this.afterRead(_this.dataURLtoFile(e.target.result.toString()), num)
          }
        })
      })
    },
    galleryImg() {
      const _this = this
      if (this.fileName || this.dataInfo.title == '征信报告') {
        plus.gallery.pick(function(a) {
          plus.io.resolveLocalFileSystemURL(a, function(entry) {
            _this.compressImage(entry.toLocalURL(), entry.name)
          }, function(e) {
            _this.$toast.fail("读取拍照文件错误：" + e.message);
          });
        }, function(a) {}, {
          filter: "image"
        })
      } else {
        _this.lrzList = []
        plus.gallery.pick(function(e) {
          console.log(JSON.stringify(e))
          _this.$toast.loading({
            message: '上传中...',
            forbidClick: true,
            duration: 0,
            loadingType: 'spinner'
          })
          _this.lrzList = e.files
        }, function(e) {}, {
          filter: "image",
          multiple: true,
          maximum: 9,
          system: false
        })
      }

    },
    getVideo() {
      const _this = this
      var cmr = plus.camera.getCamera();
      cmr.startVideoCapture(function(p) {
        plus.io.resolveLocalFileSystemURL(p, function(entry) {
          entry.file(function(file) {
            var fileReader = new plus.io.FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onloadend = function(e) {
              //_this.picUrl = e.target.result.toString()
              _this.afterRead(_this.dataURLtoFile(e.target.result.toString()), 1)
            }
          })
        }, function(e) {
          console.log('读取录像文件错误：' + e.message);
        });
      }, function(e) {
        console.log('失败：' + e.message);
      }, {
        filename: '_doc/camera/',
        index: 1
      });
    },
    dataURLtoFile(dataurl) {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {
        type: mime
      }); // if env support File, also can use this: return new File([u8arr], filename, { type: mime });
    }
  }
}

export const ocrUpload = {
  data() {
    return {
      public_show: false,
      publicList: [{
          value: 1,
          name: '拍照'
        },
        {
          value: 2,
          name: '相册'
        }
      ],
      certNoForm: {
        tokenId: sessionStorage.getItem('tokenid'),
        typeId: '',
        imgBase: ''
      },
      bankCardForm: {
        tokenId: sessionStorage.getItem('tokenid'),
        imgBase: ''
      },
      driverForm: {
        tokenId: sessionStorage.getItem('tokenid'),
        imgBase: ''
      },
      VehicleForm: {
        tokenId: sessionStorage.getItem('tokenid'),
        imgBase: ''
      },
      ocrForm: {
        tokenId: sessionStorage.getItem('tokenid'),
        eId: this.$route.query.eId,
        idcardfrontId: '',
        idcardfrontAddress: '',
        idcardversoId: '',
        idcardversoAddress: '',
        bankcardId: '',
        bankcardAddress: '',
        drivinglicenceId: '',
        drivinglicenceAddress: '',
        vehiclelicenseId: '',
        vehiclelicenseAddress: ''
      },
      form: {
        userName: '',
        resource: 'app',
        idCard: '',
        bankId: '',
        phone: ''
      },
    }
  },
  created() {

  },
  mounted() {
    this.initOss()
  },
  methods: {
    initOss() {
      getStsToken({}).then(res => {
        this.client = new OSS({
          accessKeyId: res.data.AccessKeyId,
          accessKeySecret: res.data.AccessKeySecret,
          stsToken: res.data.SecurityToken,
          endpoint: res.data.EndPoint,
          bucket: res.data.BucketName
        })
      })
    },
    _multipartUpload(file, storeAs, flag) {
      const _this = this
      this.$toast.loading({
        message: '图片上传中...',
        forbidClick: true,
        duration: 0,
        loadingType: 'spinner'
      })
      this.client
        .multipartUpload(storeAs, file)
        .then(function(result) {
          console.log('上传后', storeAs)
          _this._fileUpload(flag)
          _this.list()
        })
        .catch(function(err) {
          console.log(err)
          _this.$toast.fail('上传失败')
        })
    },
    async list() {
      try {
        // 不带任何参数，默认最多返回1000个文件
        let result = await this.client.list()
        console.log(result)

      } catch (e) {
        console.log(e)
      }
    },

    onSelect(item) {
      item.value == 1 ? this.getImage() : this.galleryImg()
      this.public_show = false
    },
    getImage() {
      const _this = this
      var cmr = plus.camera.getCamera()
      cmr.captureImage(
        function(p) {
          plus.io.resolveLocalFileSystemURL(
            p,
            function(entry) {
              _this.compressImage(entry.toLocalURL(), entry.name)
            },
            function(e) {
              //outLine('读取拍照文件错误：' + e.message);
            }
          )
        },
        function(e) {}, {
          filename: '_doc/camera/',
          index: 1
        }
      )
    },
    compressImage(url, filename) {
      const _this = this
      var name = '_doc/camera/' + filename
      plus.zip.compressImage({
          src: url, //src: (String 类型 )压缩转换原始图片的路径
          dst: name, //压缩转换目标图片的路径
          quality: 90, //quality: (Number 类型 )压缩图片的质量.取值范围为1-100
          overwrite: true, //overwrite: (Boolean 类型 )覆盖生成新文件
        },
        function(zip) {
          //页面显示图片
          _this.showPics(zip.target, name)
        },
        function(error) {
          //plus.nativeUI.toast("压缩图片失败，请稍候再试");
        }
      )
    },
    showPics(url, name) {
      const _this = this
      //根据路径读取到文件
      plus.io.resolveLocalFileSystemURL(url, function(entry) {
        entry.file(function(file) {
          var fileReader = new plus.io.FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onloadend = function(e) {
            //_this.picUrl = e.target.result.toString()
            let aa = {
              file: file
            }
            _this.afterRead(_this.dataURLtoFile(e.target.result.toString()))
          }
        })
      })
    },
    galleryImg() {
      const _this = this
      plus.gallery.pick(function(a) {
        console.log(JSON.stringify(a))
        plus.io.resolveLocalFileSystemURL(a, function(entry) {
          _this.compressImage(entry.toLocalURL(), entry.name)
        }, function(e) {
          _this.$toast.fail("读取拍照文件错误：" + e.message);
        });
      }, function(a) {}, {
        filter: "image"
      })
    },
    dataURLtoFile(dataurl) {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {
        type: mime
      }); // if env support File, also can use this: return new File([u8arr], filename, { type: mime });
    }
  }
}
export const notice = {
  data() {
    return {
      isShow: false,
      overlayShow: false,
      announName: '标题',
      noticetext: '<span>公告</span>',
    }
  },
  created() {
    this.showNoticeText()

  },
  methods: {
    showNoticeText() {
      const params = {
        customerId: sessionStorage.getItem('customId')
      }
      // if (this.isXrtxUser()) {
      //   xrtxShowAnnounce(params).then(data => {
      //     if (data.code != 0) {
      //       this.overlayShow = false;
      //       return;
      //     }
      //     if (localStorage.getItem('readNotice') != 'true') {
      //       this.overlayShow = true;
      //       this.announName = data.data.announName
      //       this.noticetext = data.data.announContent
      //       this.announIds = data.data.announId
      //     }
      //     setTimeout(() => {
      //       this.$refs['noticeHtml'].style.overflow = 'scroll'
      //     }, 1000)
      //   });
      //   return
      // }
      showAnnounce(params).then(data => {
        if (data.code != 0) {
          this.overlayShow = false;
          return;
        }
        if (localStorage.getItem('readNotice') != 'true') {
          this.overlayShow = true;
          this.announName = data.data.announName
          this.noticetext = data.data.announContent
          this.announIds = data.data.announId
        }
        setTimeout(() => {
          this.$refs['noticeHtml'].style.overflow = 'scroll'
        }, 1000)
      });
    },
    readNoticeText(params) {
      const param = {
        customerId: sessionStorage.getItem('customId'),
        announId: this.announIds
      }
      // if (this.isXrtxUser()) {
      //   xrtxMarkedRead(param).then(data => {
      //     if (data.code == 0) {
      //       localStorage.setItem('readNotice', true);
      //       this.overlayShow = false;
      //     }
      //   });
      //   return
      // }
      markedRead(param).then(data => {
        if (data.code == 0) {
          localStorage.setItem('readNotice', true);
          this.overlayShow = false;
        }
      });
    },
    // isXrtxUser() {
    //   if (localStorage.getItem('isXrtx') == 'true') {
    //     return true
    //   }
    //   return false
    // }
  }
}
export const loadMore = {
  data() {
    return {
      allLoaded: false,
      loadFlag: true
    }
  },
  created() {
    this._getDataInfo(false, true)
  },
  methods: {
    loadTop() {
      // load more data
      this.loadFlag = true
      this.params.page = 1
      this._getDataInfo(false, true)
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom() {
      // load more data
      this.loadFlag = true
      this.params.page++
      if (
        this.params.page * 10 >=
        this.formatInt(this.data.total, 1, true) + 1
      ) {
        this.allLoaded = true // if all data are loaded
        this.loadFlag = false
      } else {
        this._getDataInfo(true)
      }
      this.isLoading = false
      this.$refs.loadmore.onBottomLoaded()
    },
    formatInt(num, prec = 2, ceil = true) {
      const len = String(num).length
      if (len <= prec) {
        return num
      }

      const mult = Math.pow(10, prec)
      return ceil ? Math.ceil(num / mult) * mult : Math.floor(num / mult) * mult
    },
    focusThis(id) {
      this.$refs[id].focus()
    }
  }
}
