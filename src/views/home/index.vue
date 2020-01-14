<template>
  <div class="home-container">
    <van-nav-bar title="首页" fixed />
    <van-tabs v-model="active">
      <van-tab :title="channel.name"
        v-for="channel in userChannels"
        :key="channel.id">
        <article-list :channel = "channel"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'
export default {
  name: 'HomePage',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0,
      userChannels: [] // 用户频道列表
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
        console.log(data)
        this.userChannels = data.data.channels
      } catch (err) {
        console.log(err)
        this.$toast('获取频道列表失败')
      }
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
}</style>
