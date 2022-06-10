<!--
 * @Author: hidari
 * @Date: 2022-06-08 10:07:26
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-10 11:16:43
 * @FilePath: \el-components\src\components\container\com-src\navSlide\index.vue
 * @Description: 侧边导航菜单
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
-->
<template>
  <Menu :data="data"
        router
        :defaultActive="$route.path"
        :collapse="collapse"
        class="el-menu-vertical-demo"></Menu>
</template>

<script lang="ts" setup>
const props = defineProps<{
  collapse: boolean
}>()
const data = [
  {
    icon: 'HomeFilled',
    name: '首页',
    index: '/',
  },
  {
    icon: 'Check',
    name: '图标选择器',
    index: '/chooseIcon',
  },
  {
    icon: 'Location',
    name: '省市区选择',
    index: '/chooseArea',
  },
  {
    icon: 'Sort',
    name: '趋势标记',
    index: '/trend',
  },
  {
    icon: 'Timer',
    name: '时间选择',
    index: '/chooseTime',
  },
  {
    icon: 'Bell',
    name: '通知菜单',
    index: '/notification',
  },
  {
    icon: 'Menu',
    name: '导航菜单',
    index: '/menu',
  },
  {
    icon: 'TurnOff',
    name: '城市选择',
    index: '/citySelect',
  },
  {
    icon: 'DarrowRight',
    name: '进度条',
    index: '/progress',
  },
  {
    icon: 'ScaleToOriginal',
    name: '日历',
    index: '/calendar',
  },
  {
    icon: 'Setting',
    name: '表单',
    index: '/form',
  },
  {
    icon: 'Setting',
    name: '弹出框表单',
    index: '/modal-form',
  },
  {
    icon: 'ShoppingBag',
    name: '表格',
    index: '/table',
  },
]
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
