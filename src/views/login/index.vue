<template>
  <div class="login">
    <!-- <div class="title">登录</div> -->
    <!-- 导航栏 -->
    <van-nav-bar title="注册/登录" />
    <!-- 登录表单 -->
    <!-- 表单验证
    1、使用  ValidationObserver 组件把需要验证的整个给表单包起来  包裹表单
    2、使用  ValidationProvider  组件把具体的表单元素包起来  包裹 input
            name  配置字段的提示名称
            rules 配置校验规则
            v-slot="{errors}"   获取校验失败的错误提示消息
    -->
    <ValidationObserver ref="form">
      <ValidationProvider name="手机号" rules="required|mobile" immediate>
        <!-- <i slot="left-icon"></i> -->
        <van-field v-model="user.mobile" placeholder="请输入手机号">
          <template slot="left-icon">
            <i class="iconfont icon-shouji" style="font-size:22px"></i>
          </template>
        </van-field>
        <!-- <span>{{errors[0]}}</span> -->
      </ValidationProvider>
      <ValidationProvider name="验证码" rules="required|code" immediate>
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
      </ValidationProvider>
    </ValidationObserver>

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
import { validate } from 'vee-validate'
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
      const success = await this.$refs.form.validate()
      if (!success) {
        console.log('表单验证失败')
        console.log(this.$refs.form.errors)

        // 如果需要在js验证中能马上获取到错误信息
        // 必须给每一个validationProvider  配置   immediate
        const errors = this.$refs.form.errors
        // 找到第一个有错误的消息，给出提示，停止遍历
        for (let key in errors) {
          const item = errors[key]
          if (item[0]) {
            this.$toast(item[0])
            return
          }
        }
        // 获取验证失败的错误信息，轻提示
        return
      }
      // 3、登录中提示  在组件中写法如下：
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })
      // 4、请求登录数据
      try {
        const { data } = await login(user)
        // 将登录成功获取到的用户 token 相关数据存储到 Vuex 容器
        this.$store.commit('setUser', data.data)
        // 提示成功
        // 跳转到首页
        this.$toast.success('登录成功')
        this.$router.push('/')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败，手机号或验证码不正确')
      }
    },
    // 获取验证码
    async onSendSmsCode () {
      try {
        const { mobile } = this.user
        // 1、验证手机号是否有效
        // mobile 第一个参数：表示要验证的数据
        // 'required|mobile' 第二个参：验证规则
        // name  可选的配置对象（错误信息字段名称）
        // 返回值：{valid，errors}
        //         valid：验证是否成功
        //         errors：一个数组，错误提示信息
        const validateResult = await validate(mobile, 'required|mobile', {
          name: '手机号'
        })
        if (!validateResult.valid) {
          console.log(validateResult)
          this.$toast(validateResult.errors[0])
          return
        }
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
