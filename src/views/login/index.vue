<template>
  <div class="login">
    <!-- <div class="title">登录</div> -->
    <van-nav-bar title="注册/登录" />
    <van-cell-group>
      <!-- <i slot="left-icon"></i> -->
      <van-field v-model="user.mobile" placeholder="请输入手机号">
        <template slot="left-icon">
          <i class="iconfont icon-shouji" style="font-size:22px"></i>
        </template>
      </van-field>
      <van-field v-model="user.code" placeholder="请输入验证码">
        <template slot="left-icon">
          <i class="iconfont icon-iconfontmima1" style="font-size:22px"></i>
        </template>
        <van-count-down
          v-if="isCountDownShow"
          slot="button"
          :time="1000*60"
          format=" ss s"
          @finish="isCountDownShow=false"
        />
        <van-button v-else slot="button" size="small" type="primary" @click="onSendSmsCode">获取验证码</van-button>
      </van-field>
      <!-- {{user.mobile}}
      {{user.code}}-->
    </van-cell-group>
    <div class="btn">
      <van-button type="info" @click="onLogin">登录</van-button>
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
import { login, getSmsCode } from '@/api/user'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isCountDownShow: false // 是否显示倒计时
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    // 登录
    async onLogin () {
      // 1、 获取表单数据
      const user = this.user
      // 2、表单验证
      // 3、登录中提示  在组件中写法如下：
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })
      // 4、请求登录数据
      try {
        const res = await login(user)
        this.$toast.success('登录成功')
        console.log('登录成功', res)
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.success('登录失败')
      }
    },
    // 获取验证码
    async onSendSmsCode () {
      try {
        const { mobile } = this.user
        // 1、验证手机号是否有效
        // 2、请求发送短信验证码
        const res = await getSmsCode(mobile)
        console.log(res)
        // 3、显示倒计时
        this.isCountDownShow = true
      } catch (err) {
        console.log(err)
        this.$toast('请勿频繁操作')
      }
    }
  }
}
</script>

<style lang='less' scoped>
// .iconfont{
//   // font-size: 20px
// }
.login {
  .van-button--primary {
    // background-color: #ededed;
    border: 0;
    color: black;
    border-radius: 10px;
    font-size: 14px;
  }
  .van-cell {
    align-items: center;
  }
  .btn {
    padding: 27px 16px;
    .van-button {
      width: 100%;
    }
  }
  .van-divider {
    font-size: 14px;
    margin: 10px 0;
    text-align: center;
    color: #969799;
  }
}
</style>
