<!--
 * @Author: hidari
 * @Date: 2022-06-08 10:07:29
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-08 11:34:47
 * @FilePath: \el-components\src\components\container\src\navHeader\index.vue
 * @Description: 头部 nav
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
-->
<template>
  <div class="header">
    <span @click="toggle">
      <el-icon-expand class="icon" style="" v-if="collapse"></el-icon-expand>
      <el-icon-fold class="icon" v-else></el-icon-fold>
    </span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  collapse: boolean;
}>();
let emits = defineEmits(["update:collapse"]);
let toggle = () => {
  // 需要修改父组件的值
  emits("update:collapse", !props.collapse);
};
</script>
<style lang="scss" scoped>
.header {
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
.icon {
    width: 1em; height: 1em;
}
</style>
