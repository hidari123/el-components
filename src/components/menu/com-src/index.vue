<!--
 * @Author: hidari
 * @Date: 2022-06-09 16:37:27
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-10 15:03:23
 * @FilePath: \el-components\src\components\menu\com-src\index.vue
 * @Description: 菜单组件
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
-->
<template>
  <!-- v-bind="$attrs" 接收父组件传递来的数据 并且数据没有在 props 声明 -->
  <el-menu :default-active="defaultActive"
           :router="router"
           v-bind="$attrs">
    <!-- 要用 template 包裹 template 不会渲染 如果改成 div 样式会变化 -->
    <template v-for="(item,i) in data"
              :key="i">
      <!-- 一级菜单 -->
      <el-menu-item v-if="!item[children] || !item[children].length"
                    :index="item[index]">
        <component v-if="item[icon]"
                   :is="`el-icon-${toLine(item[icon])}`"></component>
        <span>{{item[name]}}</span>
      </el-menu-item>
      <!-- 二级菜单 -->
      <el-sub-menu v-if="item[children] && item[children].length"
                   :index="item[index]">
        <template #title>
          <component v-if="item[icon]"
                     :is="`el-icon-${toLine(item[icon])}`"></component>
          <span>{{ item[name] }}</span>
        </template>
        <el-menu-item v-for="(item1,index1) in item[children]"
                      :key="index1"
                      :index="item1[index]">
          <component v-if="item1[icon]"
                     :is="`el-icon-${toLine(item1[icon])}`"></component>
          <span>{{item1[name]}}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { toLine } from '@/utils'
import { PropType } from 'vue'
const props = defineProps({
  // 导航菜单的数据
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  // 默认选中的菜单
  defaultActive: {
    type: String,
    default: '',
  },
  // 是否是路由模式
  router: {
    type: Boolean,
    default: false,
  },
  // 键名 -> 菜单标题的键名
  name: {
    type: String,
    default: 'name',
  },
  // 键名 -> 菜单表示的键名
  index: {
    type: String,
    default: 'index',
  },
  // 键名 -> 菜单图标的键名
  icon: {
    type: String,
    default: 'icon',
  },
  // 键名 -> 子菜单的键名
  children: {
    type: String,
    default: 'children',
  },
})
</script>
<style lang="scss" scoped>
svg {
  margin-right: 10px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>