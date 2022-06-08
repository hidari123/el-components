<!--
 * @Author: hidari
 * @Date: 2022-06-08 16:40:10
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-08 17:48:07
 * @FilePath: \el-components\src\components\chooseArea\com-src\index.vue
 * @Description: 省市区选择组件
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
-->
<template>
  <el-select placeholder="请选择省份"  v-model="province">
      <el-option v-for="item in areas" :key="item.code" :label="item.name" :value="item.code"></el-option>
  </el-select>
  <el-select :disabled="!province" class="padding" placeholder="请选择城市" v-model="city">
      <el-option v-for="item in selectCity" :key="item.code" :label="item.name" :value="item.code" ></el-option>
  </el-select>
  <el-select :disabled="!province || !city" placeholder="请选择区域" v-model="area">
      <el-option v-for="item in selectArea" :key="item.code" :label="item.name" :value="item.code" ></el-option>
  </el-select>
</template>

<script setup lang="ts">
import { watch, ref } from "vue"
import allAreas from '../com-lib/pca-code.json'

export interface AreaItem {
  name: string
  code: string
  children?: AreaItem[]
}

export interface Data {
  name: string
  code: string
}

// 下拉框选择省份的值
const province = ref<string>('')
// 下拉框选择城市的值
const city = ref<string>('')
// 下拉框选择区域的值
const area = ref<string>('')
// 所有省市区区域数据
const areas = ref(allAreas)

// 城市下拉框的所有的值
const selectCity = ref<AreaItem[]>([])
// 区域下拉框的所有的值
const selectArea = ref<AreaItem[]>([])

// 分发事件给父组件
const emits = defineEmits(["change"])

// 监听选择省
watch(
  () => province.value,
  (val) => {
    if (val) {
      const cities = areas.value.find((item) => item.code === province.value)!.children;
      selectCity.value = cities
    }
    city.value = ""
    area.value = ""
  }
)

// 监听选择城市
watch(
  () => city.value,
  (val) => {
    if (val) {
      const areaArr = selectCity.value.find((item) => item.code === city.value)!.children!
      selectArea.value = areaArr
    }
    area.value = ""
  }
)

// 监听选择区域
watch(() => area.value, (val) => {
    if(val) {
        let provinceData:Data = {
        code: province.value,
        name: allAreas.find((item) => item.code === province.value)!.name
    }
    let cityData:Data = {
        code: city.value,
        name: city.value && selectCity.value.find((item) => item.code === city.value)!.name
    }
    let areaData:Data = {
        code: val,
        name: val && selectArea.value.find((item) => item.code === val)!.name
    }
    emits("change", {
        provinceData,
        cityData,
        areaData,
      })
    }
})
</script>
<style lang="scss">
.padding {
    padding: 0 10px;
}
</style>
