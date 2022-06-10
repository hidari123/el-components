<!--
 * @Author: hidari
 * @Date: 2022-06-08 12:04:15
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-10 10:02:37
 * @FilePath: \el-components\src\components\chooseIcon\com-src\index.vue
 * @Description: 选择图标组件
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
-->
<template>
  <el-button @click="handleClick">
    <slot></slot>
  </el-button>
  <div class="choose-icon-dialog-body-height">
    <el-dialog :title="title"
               v-model="dialogVisible">
      <div class="icon-container">
        <!-- Object.keys 拿到所有的 key 并且返回一个数组 -->
        <div class="item"
             @click="copyItem(item)"
             v-for="(item,index) in Object.keys(elIcons)"
             :key="index">
          <div>
            <!-- 动态组件 -->
            <component :is="`el-icon-${toLine(item)}`"></component>
          </div>
          {{item}}
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import * as elIcons from '@element-plus/icons-vue'
import { toLine } from '@/utils/index'
import { useCopy } from '@/hooks/useCopy'
const props = defineProps<{
  // 弹出框标题
  title: string
  // 控制弹出框的显示和隐藏
  visible: boolean
}>()

// 拷贝一份父组件传递来的 visible
let dialogVisible = ref<boolean>(props.visible)

const emits = defineEmits(['update:visible'])
const handleClick = () => {
  // 修改父组件的数据
  emits('update:visible', !props.visible)
}
// watch 监听 visible 的变化 只能监听一次
watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val
  }
)
// 监听组件内部 dialogVisible 的变化
watch(
  () => dialogVisible.value,
  (val) => {
    emits('update:visible', val)
  }
)

// 复制 icon
const copyItem = (item: string) => {
  const text = `<el-icon-${toLine(item)} />`
  useCopy(text)
  dialogVisible.value = false
}
</script>

<style lang="scss" scoped>
.icon-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  .item {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    height: 70px;
    cursor: pointer;
    div:first-child {
      flex: 1;
    }
  }
}

svg {
  width: 2em !important;
  height: 2em !important;
}
</style>