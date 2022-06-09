<!--
 * @Author: hidari
 * @Date: 2022-06-09 10:01:33
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-09 10:44:19
 * @FilePath: \el-components\src\views\trend\index.vue
 * @Description: 趋势标记组件
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
-->
<template>
  <div class="flex">
      <trend reverseColor="true" text="营业额"></trend>
      <trend reverseColor="true" text="销售额" type="down"/>
  </div>
</template>

<script setup lang="ts">
</script>
<style lang="scss">
.flex {
    display: flex;
    align-items: center;
    > div {
        margin-right: 10px;
    }
}
</style>