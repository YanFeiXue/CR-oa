<template>
  <div class="noticeBg">
    <header class="announName" v-text="announName"></header>
    <section class="noticeHtml" v-html="noticetext"></section>
    <div class="noticeBtn-wrap">
      <van-button type="primary" class="noticeBtn" @click="readNoticeText()">知道了</van-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { showAnnounce, markedRead, xrtxShowAnnounce } from '../../api/api'
export default {
  prop: {
    overlayShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: false,
      overlayShow: false,
      announName: '标题',
      noticetext: '<span>公告</span>'
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
      if (this.isXrtxUser()) {
        xrtxShowAnnounce(params).then(data => {
          if (data.code != 0) {
            this.emitData(false)
            return
          }
          if (localStorage.getItem('readNotice') != 'true') {
            this.emitData(true)
            this.announName = data.data.announName
            this.noticetext = data.data.announContent
            this.announIds = data.data.announId
          }
        })
        return
      }
      showAnnounce(params).then(data => {
        if (data.code != 0) {
          this.emitData(false)
          return
        }
        if (localStorage.getItem('readNotice') != 'true') {
          this.emitData(true)
          this.announName = data.data.announName
          this.noticetext = data.data.announContent
          this.announIds = data.data.announId
        }
      })
    },
    readNoticeText(params) {
      const param = {
        customerId: sessionStorage.getItem('customId'),
        announId: this.announIds
      }
      markedRead(param).then(data => {
        if (data.code == 0) {
          localStorage.setItem('readNotice', true)
          this.emitData(false)
        }
      })
    },
    isXrtxUser() {
      if (localStorage.getItem('isXrtx') == 'true') {
        return true
      }
      return false
    },
    emitData(data) {
      this.$emit('isOverlay', data)
    }
  }
}
</script>
<style lang="less" scoped>
.noticeBg {
  width: 608px;
  min-height: 693px;
  display: block;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -340px;
  margin-left: -304px;
  .announName {
    width: 100%;
    text-align: center;
    padding-top: 230px;
    font-size: 32px;
    font-weight: 400;
  }
  .noticeHtml {
    overflow: hidden;
    margin-top: 10px;
    height: 270px;
    max-height: 270px;
    overflow-y: scroll;
    padding-bottom: 10px;
    width: 100%;
    font-weight: 400;
    font-size: 30px;
    color: rgba(104, 104, 104, 1);
    p {
      padding: 0 50px;
      font-size: 30px !important;
      span {
        font-size: 30px !important;
      }
    }
  }
  .noticeBtn-wrap {
    width: 100%;
    margin-top: 10px;
    .noticeBtn {
      width: 400px;
      height: 98px;
      display: block;
      margin: 0 auto;
      font-size: 36px;
      background: rgba(35, 163, 148, 1);
      border-radius: 60px;
    }
  }
}
</style>
