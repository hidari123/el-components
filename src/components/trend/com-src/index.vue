<!--
 * @Author: hidari
 * @Date: 2022-06-09 09:58:08
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-09 14:08:10
 * @FilePath: \el-components\src\components\trend\com-src\index.vue
 * @Description: 趋势标记组件
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
-->
<template>
  <div class="trend">
      <!-- 如果有插槽显示插槽，没有插槽显示文本 -->
    <slot v-if="$slots.default" :style="{ color: type === 'up' ? upTextColor : downTextColor }"  />
    <div
     class="text"
     :style="{ color: type === 'up' ? upTextColor : downTextColor }" 
     v-else>{{text}}</div>
    <!-- 动态渲染图标 -->
    <div class="icon">
      <component
       :is="`el-icon-${toLine(upIcon)}`"
       :style="{ color: !reverseColor ? upIconColor : '#52c41a' }"
       v-if="type === 'up'"
       ></component>
      <component
       :is="`el-icon-${toLine(downIcon)}`"
       :style="{ color: !reverseColor ? downIconColor : '#f5222d' }"
       v-else
       ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toLine } from "@/utils"
const props = defineProps({
    // 标记趋势是上升还是下降
    type: {
        type: String,
        default: 'up'
    },
    // 趋势显示的文字
    // 1. 父组件传递的数据
    // 2. 插槽
    text: {
        type: String,
        default: '文字'
    },
    // 颜色翻转，只在默认的颜色下生效没如果使用了自定义颜色，这个属性就不生效了
    reverseColor: {
        type: Boolean,
        default: false,
    },
    // 上升趋势图标
    upIcon: {
        type: String,
        default: "ArrowUp",
    },
    // 下降趋势图标
    downIcon: {
        type: String,
        default: "ArrowDown",
    },
    // 上升趋势图标颜色
    upIconColor: {
        type: String,
        default: "#f5222d",
    },
    // 下降趋势图标颜色
    downIconColor: {
        type: String,
        default: "#52c41a",
    },
    // 上升趋势文字颜色
    upTextColor: {
        type: String,
        default: "#000",
    },
    // 下降趋势文字颜色
    downTextColor: {
        type: String,
        default: "#000",
    }
})
</script>
<style lang="scss" scoped>
.trend {
  display: flex;
  align-items: center;
  .text {
    font-size: 12px;
    mask-repeat: 4px;
  }
  .icon {
    svg {
      width: 0.8em;
      height: 0.8em;
    }
  }
}
</style>
