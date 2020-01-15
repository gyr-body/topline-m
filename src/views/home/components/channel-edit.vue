<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" @click="isEditShow=!isEditShow">{{isEditShow ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="(channels,index) in userChannels" :key="channels.id"
       @click="onUserChannelClick(index)">
       <!--
          :class="{
            active: index === active
          }"
          样式绑定。
          属性名：CSS 类名
          属性值：一个布尔值
         -->
        <span
          slot="text"
          class="text"
          :class="{
            active: index === active
          }"
        >{{ channels.name }}</span>
        <van-icon v-show="isEditShow && index !==0" name="close" slot="icon"/>
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐频道" :border="false" />
    <van-grid :gutter="10">
      <van-grid-item
        v-for="channels in remainingChannels"
        :key="channels.id"
        :text="channels.name"
        @click="onChannelAdd(channels)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    // 频道对象，父组件提供
    userChannels: {
      type: Array, // 必须是对象
      required: true // 必须传递该数据
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isEditShow: false
    }
  },
  computed: {
    remainingChannels () {
      const { userChannels, allChannels } = this
      // 剩余频道 = 所有频道 - 我的频道
      const channels = []
      // 遍历所有频道
      allChannels.forEach(item => {
        if (!userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  watch: {
    // 当 userChannels 发生变化，会调用该函数
    userChannels (newVal) {
      // 同步到本地存储
      setItem('user-channels', newVal)
    }
  },
  created () {
    this.loadAllChannels()
  },
  mounted () {},
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      console.log(data)
      this.allChannels = data.data.channels
    },
    onChannelAdd (channels) {
      this.userChannels.push(channels)
    },
    onUserChannelClick (index) {
      // 如果是编辑状态下，则执行删除功能
      if (this.isEditShow && index !== 0) {
        this.userChannels.splice(index, 1) // 删除指定位置的值
      } else {
        // 如果非编辑状态下，则执行切换频道操作
        this.$emit('switch', index)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 40px;
}
/deep/ .van-grid-item__icon-wrapper {
  position: absolute;
  top: -14px;
  right: -5px;
  .van-icon-close {
    font-size: 14px;
  }
}
/deep/ .van-grid-item__content {
    background-color: #f4f4f4;
    .van-grid-item__text,.text {
      font-size: 14px;
      color: #222;
    }
    .active{
      color:red
    }
  }
</style>
