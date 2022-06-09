<!--
 * @Author: hidari
 * @Date: 2022-06-07 16:04:22
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-09 09:52:42
 * @FilePath: \el-components\README.md
 * @Description: 基于 Vue 3 + TypeScript + Vite 的二次封装 element-plus
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
-->
# 基于 Vue 3 + TypeScript + Vite 的二次封装 element-plus

## 本项目封装的组件有

### 图标选择器

#### 全局注册图标为`-`连接形式

`\src\utils\index.ts`
```ts
/**
 * 把驼峰命名法改为横线链接
 * @param value 
 * @returns 
 */
export const toLine = (value: string) => {
    // $1 是第一个小括号里的内容
    return value.replace(/(A-Z)g/, '-$1').toLocaleLowerCase()
}
```

`\src\main.ts`
```js
import * as Icons from '@element-plus/icons-vue'

// 全局注册图标 牺牲一点性能
// el-icon-xxx
for(let i in Icons) {
    // 注册全局组件(横线连接)
    app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}
app.use(ElementPlus)
```

#### 封装图标选择器组件

`\src\views\chooseIcon\index.vue`
```vue
<template>
  <div>
      <choose-icon title="选择图标" v-model:visible="visible">
          选择图标
      </choose-icon>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let visible = ref<boolean>(false)
</script>
<style lang="scss" scoped>

</style>
```


`\src\components\chooseIcon\com-src\index.vue`

- 遍历图表组件显示图标和名称，点击可以复制
    - 图标展示利用 vue 动态组件 `component`，`:is="组件名"`，动态展示图标组件
    - 复制利用`navigator.clipboard.writeText()`方法，该方法为`promise`，传入需要复制的内容
- 控制 `dialog` 组件显示和隐藏，通过父子传输数据，因为`props`只读，最好不要修改，所以复制一份 `dialogVisible` ，在 `props.visible` 和 `dialogVisible` 变化时都要监听变化
    - `props.visible` 变化时赋值给 `dialogVisible`
    - `dialogVisible` 变化时通知父组件修改 `visible` 达成闭环

```js
export const useCopy = (text: string) => {
    // // 创建一个 input 框
    // let input = document.createElement('input')
    // // 给 input 赋值
    // input.value = text
    // // 追加到 body 中
    // document.body.appendChild(input)
    // // 选择输入框的操作
    // input.select()
    // // 执行复制的操作
    // document.execCommand(input)
    // 删除加入的输入框
    navigator.clipboard.writeText(text).then(() => {
        // 提示用户
        ElMessage.success('复制成功')
    }).catch(() => {
        ElMessage.error('复制失败')
    })
    // document.body.removeChild(input)
    // // 提示用户
    // ElMessage.success('复制成功')
}
```
```vue
<template>
  <el-button @click="handleClick">
      <slot></slot>
  </el-button>
  <div class="choose-icon-dialog-body-height">
    <el-dialog :title="title" v-model="dialogVisible">
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
import { ref, watch } from "vue"
import * as elIcons from '@element-plus/icons-vue'
import { toLine } from '@/utils/index.js'
import { useCopy } from "@/hooks/useCopy";
const props = defineProps<{
    // 弹出框标题
    title: string,
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
watch(() => props.visible, (val) => {
    dialogVisible.value = val
})
// 监听组件内部 dialogVisible 的变化
watch(() => dialogVisible.value, (val) => {
    emits('update:visible', val)
})

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
```


### 省市区选择器

`\src\views\chooseArea\index.vue`
```vue
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
```

- 导入 json 省市区文件 `src\components\chooseArea\com-lib\pca-code.json`

- 封装组件`\src\components\chooseArea\com-src\index.vue`

```vue
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
```

#### 全局注册组件

- 注册全局组件`app.component(‘组件名’， 组件对象)`
`\src\components\chooseArea\index.ts`
```ts
import chooseArea from './com-src/index.vue'
import { App } from 'vue'

// 让这个组件可以通过 use 的方式使用
export default {
    install(app: App) {
        app.component('choose-area', chooseArea)
    }
}
```

- 注册全局组件
`\src\components\chooseIcon\com-src\index.ts`
```ts
import chooseIcon from './com-src/index.vue'
import { App } from 'vue'

// 让这个组件可以通过 use 的方式使用
export default {
    install(app: App) {
        app.component('choose-icon', chooseIcon)
    }
}
```

- 主入口文件
`\src\components\index.ts`
说明:
1. `app.use` 可以接收一个对象，`app.use(obj)`
2. 对象obj中需要提供一个 `install` 函数
3. 在 `app.use(obj)` 时，会自动调用该 `install` 函数，并传入 `Vue构造器`

- vue2写法
```ts
//这里是use全局入口文件
import PageTools from './PageTools'  // 导入PageTools组件
import NavBar from './NavBar'  // 导入PageTools组件
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools) // 注册组件
    Vue.component('NavBar ', NavBar) // 注册组件
  }
}
```

- 本项目把每个组件单独 `use` 可以按需导入
```ts
import { App } from 'vue'
import chooseArea from './chooseArea'
import chooseIcon from './chooseIcon'

const component = [
    chooseArea,
    chooseIcon
]

export default {
    install(app: App) {
        component.map(item => {
            app.use(item)
        })
    }
}
```

- 在`main.ts`中注册插件
```ts
import UI from './components'
app.use(UI)
```

3. 时间选择器

4. 日期选择器

5. 城市选择器

6. 通知菜单

7. 伸缩菜单

8. 导航菜单

9. 趋势标记

10. 动态进度条

11. 列表 

12. 表格

13. 表单

14. 弹窗表单

15. 日历