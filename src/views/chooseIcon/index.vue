<!--
 * @Author: hidari
 * @Date: 2022-06-08 12:47:57
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-08 14:14:40
 * @FilePath: \el-components\src\views\chooseIcon\index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
-->
<template>
  <div>
      <choose-icon title="选择图标" v-model:visible="visible">
          选择图标
      </choose-icon>
  </div>
</template>

<script setup lang="ts">
import ChooseIcon from '../../components/chooseIcon/com-src/index.vue'
import { ref } from 'vue'

let visible = ref<boolean>(false)
</script>
<style lang="scss" scoped>

</style>
