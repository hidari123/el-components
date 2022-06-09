<!--
 * @Author: hidari
 * @Date: 2022-06-09 14:11:12
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-09 16:18:24
 * @FilePath: \el-components\src\components\notification\com-src\index.vue
 * @Description: 消息通知组件
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
-->
<template>
  <el-popover
    placement="bottom"
    :width="300"
    trigger="click"
  >
    <template #default>
        <slot></slot>
    </template>
    <template #reference>
      <el-badge style="cursor: pointer" :value="value" :max="max" :is-dot="isDot">
        <component :is="`el-icon-${toLine(icon)}`" />
      </el-badge>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { toLine } from "@/utils"

const props = defineProps({
  // 显示的图标
  icon: {
    type: String,
    default: "Bell",
  },
  // 通知数量
  value: {
    type: [String, Number],
    default: "",
  },
  // 最大值
  max: {
    type: Number,
  },
  // 是否显示小圆点
  isDot: {
    type: Boolean,
    default: false,
  },
})
</script>
