<template>
<div>
  <router-view></router-view>
</div>
  <!-- <div id="app">
    根路由
    <div>
      <van-icon name="gem" />
    </div>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
  </div> -->
</template>
<script>
export default {
  name: 'App',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {
  },
  created () {},
  methods: {}
}
</script>
<style lang="less">
//在style中使用@ 别名，需要在前面加 ~ 号
//@之后必须有 /
//如果加载的资源时相对于当前目录，建议还是用../../
// @import url("~@/styles/variables.less");
.box {
  width: 375px;
  height: 100px;
  background-color: #f40;
}
</style>
