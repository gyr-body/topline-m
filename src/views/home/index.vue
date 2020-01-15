<template>
  <div class="home-container">
    <van-nav-bar title="首页" fixed />
    <van-tabs v-model="active">
      <van-tab :title="channel.name" v-for="channel in userChannels" :key="channel.id">
        <article-list :channel="channel" />
      </van-tab>
      <van-icon class="wap-nav" slot="nav-right" name="wap-nav" @click="isChannelEditShow=true" />
    </van-tabs>
    <van-popup
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      round
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <channel-edit :user-channels="userChannels" :active="active" @switch="onChannelSwitch" />
      <!-- {{userChannels}} -->
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      userChannels: {}, // 用户频道列表
      isChannelEditShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserChannels()
  },
  mounted () {},
  methods: {
    async loadUserChannels () {
      try {
        const { data } = await getUserChannels()
        // console.log(data)
        this.userChannels = data.data.channels
      } catch (err) {
        // console.log(err)
        this.$toast('获取频道列表失败')
      }
    },
    onChannelSwitch (index) {
      this.active = index // 切换激活频道
      this.isChannelEditShow = false // 关闭弹层
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
  }
}
</style>
