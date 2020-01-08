<template>
  <div class="login">
    <!-- <div class="title">登录</div> -->
    <van-nav-bar title="注册/登录" />
    <van-cell-group>
      <van-field class="iconfont icon-shouji"  placeholder="请输入手机号" />
      <van-field class="iconfont icon-iconfontmima1" placeholder="请输入验证码" />
    </van-cell-group>
    <div class="btn">
      <van-button type="info">登录</van-button>
    </div>
    <div class="van-divider">
      <span>账号：13911111111 密码：246810</span>
    </div>
    <div class="van-divider">
      <span>如果收不到验证码，请使用万能验证码：246810</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {}
}
</script>

<style lang='less' scoped>
// .iconfont{
//   // font-size: 20px
// }
.btn{
  padding:27px 16px;
  .van-button{
    width: 100%
  }
}
.van-divider{
  font-size: 14px;
  margin: 10px 0;
  text-align: center;
  color: #969799
}
</style>
