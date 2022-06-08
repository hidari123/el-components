<!--
 * @Author: hidari
 * @Date: 2022-06-08 10:00:03
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-08 11:34:12
 * @FilePath: \el-components\src\components\container\src\index.vue
 * @Description: container layout
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
-->
<template>
  <el-container>
    <el-aside width="auto">
      <nav-slide v-model:collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <nav-header v-model:collapse="isCollapse" />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import NavSlide from "./navSlide/index.vue"
import NavHeader from "./navHeader/index.vue"
let isCollapse = ref(false);
</script>

<style lang="scss" scoped>
:deep(.el-header) {
  padding: 0;
  border-bottom: 1px solid #ccc;
}
.icon {
    width: 1em; height: 1em;
}
</style>