<!--
 * @Author: hidari
 * @Date: 2022-06-09 14:11:29
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-09 16:16:29
 * @FilePath: \el-components\src\views\notification\index.vue
 * @Description: 消息通知组件
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
-->
<template>
  <notification :value="50">
    <list 
     :list="lists"
     :actions="actions"
     @clickItem="clickItem"
     @clickAction="clickAction"
    ></list>
  </notification>
</template>

<script setup lang="ts">
import { lists, actions } from "./data"
const clickItem = (data: any) => {
  console.log(data)
};
const clickAction = (data: any) => {
  console.log(data)
};
</script>