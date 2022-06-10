<!--
 * @Author: hidari
 * @Date: 2022-06-10 15:31:28
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-10 16:22:42
 * @FilePath: \el-components\src\components\progress\com-src\index.vue
 * @Description: 进度条组件
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
-->
<template>
  <div class="progress-wrap">
    <el-progress v-bind="$attrs"
                 :percentage="p" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps({
  // 进度条进度
  percentage: {
    type: Number,
    default: 0,
  },
  // 进度条是否有动画效果
  isAnimation: {
    type: Boolean,
    default: false,
  },
  // 动画时长（毫秒）
  time: {
    type: Number,
    default: 1000,
  },
})
const p = ref(0)
onMounted(() => {
  // 动画效果
  if (props.isAnimation) {
    // 规定时间内加载完成
    // t: 每隔多久需要加载一次进度条
    const t = Math.ceil(props.time / props.percentage)
    let timer = setInterval(() => {
      p.value += 1
      // 如果达到目标进度 停止 清空定时器
      if (p.value >= props.percentage) {
        p.value = props.percentage
        clearInterval(timer)
      }
    }, t)
  } else {
    p.value = props.percentage
  }
})
</script>