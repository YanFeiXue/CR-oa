<template>
  <div class="ta-textarea">
    <p>
      {{ textValue }}
    </p>
    <textarea :class="{ 'align-right': alignRight }" :placeholder="placeholder" :disabled="disabled" @blur="emitInput"
      v-model="textValue"></textarea>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        textValue: ''
      }
    },
    props: {
      textareaValue: {
        // 默认文案
        type: String,
        default: ''
      },
      placeholder: {
        // 文本提示文案
        type: String,
        default: '请输入'
      },
      alignRight: {
        // 文本是否需要右对齐
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    created() {
      if (this.textareaValue) this.textValue = this.textareaValue
    },
    watch: {
      // 监听数据变化，改变父组件值
      // textValue() {
      //   this.$emit('input', this.textValue)
      // },
      textareaValue() {
        this.textValue = this.textareaValue
      }
    },
    methods: {
      emitInput() {
        this.$emit('input', this.textValue)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ta-textarea.error {
    textarea::-webkit-input-placeholder {
      color: red;
    }
  }

  .ta-textarea {
    width: 100%;
    height: auto;
    background-color: #fff;
    position: relative;
    overflow: hidden;

    p {
      margin: 0;
      padding: 10px 20px;
      visibility: hidden;
      word-wrap: break-word;
      line-height: 25px;
      min-height: 30px;
    }

    textarea {
      position: absolute;
      top: 0;
      left: 0;
      margin: 0;
      padding: 10px 20px;
      width: 100%;
      height: 100%;
      line-height: 25px;
      text-align: left;
      border: none;
      box-sizing: border-box;
    }

    .align-right {
      text-align: right;
    }
  }
</style>
