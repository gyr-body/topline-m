<template>
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onload">
        <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
      </van-list>

      <!-- <p>刷新次数: {{ count }}</p> -->
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesByChannel } from '@/api/article'
export default {
  name: 'ArticleList',
  components: {},
  props: {
    // 频道对象，父组件提供
    channel: {
      type: Object, // 必须是对象
      required: true // 必须传递该数据
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, // 用于获取下一页数据的页码（时间戳）
      count: 0,
      isLoading: false // 用来控制下拉刷新的loading状态
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onload()
  },
  mounted () {},
  methods: {
    async onRefresh () {
      // 下拉刷新组件会自动开启 loading
      // 1. 请求数据
      const { data } = await getArticlesByChannel({
        channel_id: this.channel.id,
        timestamp: Date.now(), // 下拉刷新永远请求获取最新数据
        with_top: 1
      })

      // 2. 将数据放到列表的顶部
      const { results } = data.data
      this.list.unshift(...results)

      // 3. 关闭下拉刷新的 loading
      this.isLoading = false

      this.$toast(`更新了${results.length}条数据`)
    },
    async onload () {
      // 1、请求获取数据
      const { data } = await getArticlesByChannel({
        channel_id: this.channel.id, // 频道id
        timestamp: this.timestamp || Date.now(), // 事件戳  请求新的推荐数据传当前的事件戳，请求历史推荐传指定的事件戳
        with_top: 1 // 是否包含置顶，第一次请求时要包含指定文章，1---包含置顶， 0---不包含
      })
      // 2、把数据添加到列表中
      const { results } = data.data
      this.list.push(...results)
      // 3、停止本次的 loading
      this.loading = false
      // 4、判断数据是否加载结束
      if (results.length) {
        this.timestamp = data.data.per_timestamp
      } else {
        this.finished = true
      }
      // console.log(data)
    }
  }
}
</script>

<style scoped></style>
