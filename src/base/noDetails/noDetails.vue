<template>
  <div class="noDetails">
    <img src="../../../static/img/noDetails.png" />
    <span class>暂无数据</span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>
<style lang="less" scoped>
.noDetails {
  margin-top: 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  img {
    height: 317px;
    width: 452px;
  }
  span {
    font-size: 30px;
    color: #a6a6a6;
    padding: 35px 0;
  }
}
</style>

