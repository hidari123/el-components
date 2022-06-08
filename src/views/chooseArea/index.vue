<!--
 * @Author: hidari
 * @Date: 2022-06-08 16:46:04
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-08 17:58:11
 * @FilePath: \el-components\src\views\chooseArea\index.vue
 * @Description: 省市区选择
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
-->
<template>
  <choose-area @change="changeArea" />
</template>

<script setup lang="ts">

const changeArea = (val: any) => {
    console.log(val)
    
}
</script>
<style lang="scss">
</style>