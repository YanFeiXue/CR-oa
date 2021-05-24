<template>
  <div>
    <van-header :title="logtitle" path="/viewMain/home"></van-header>


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
        logtitle: '写日志'
      }
    },
    mounted() {

    },
    methods: {
      name() {

      }
    },
  }
</script>

<style lang="scss" scoped="scoped">

</style>
