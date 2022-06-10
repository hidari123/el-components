<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [基于 Vue 3 + TypeScript + Vite 的二次封装 element-plus](#%E5%9F%BA%E4%BA%8E-vue-3--typescript--vite-%E7%9A%84%E4%BA%8C%E6%AC%A1%E5%B0%81%E8%A3%85-element-plus)
  - [图标选择器](#%E5%9B%BE%E6%A0%87%E9%80%89%E6%8B%A9%E5%99%A8)
  - [省市区选择器](#%E7%9C%81%E5%B8%82%E5%8C%BA%E9%80%89%E6%8B%A9%E5%99%A8)
    - [全局注册组件](#%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C%E7%BB%84%E4%BB%B6)
  - [时间选择器](#%E6%97%B6%E9%97%B4%E9%80%89%E6%8B%A9%E5%99%A8)
  - [通知菜单](#%E9%80%9A%E7%9F%A5%E8%8F%9C%E5%8D%95)
    - [通知菜单组件](#%E9%80%9A%E7%9F%A5%E8%8F%9C%E5%8D%95%E7%BB%84%E4%BB%B6)
    - [列表组件](#%E5%88%97%E8%A1%A8%E7%BB%84%E4%BB%B6)
  - [伸缩菜单](#%E4%BC%B8%E7%BC%A9%E8%8F%9C%E5%8D%95)
  - [导航菜单](#%E5%AF%BC%E8%88%AA%E8%8F%9C%E5%8D%95)
    - [普通导航菜单](#%E6%99%AE%E9%80%9A%E5%AF%BC%E8%88%AA%E8%8F%9C%E5%8D%95)
    - [无限层级菜单](#%E6%97%A0%E9%99%90%E5%B1%82%E7%BA%A7%E8%8F%9C%E5%8D%95)
  - [趋势标记](#%E8%B6%8B%E5%8A%BF%E6%A0%87%E8%AE%B0)
  - [动态进度条](#%E5%8A%A8%E6%80%81%E8%BF%9B%E5%BA%A6%E6%9D%A1)
  - [列表](#%E5%88%97%E8%A1%A8)
  - [表格](#%E8%A1%A8%E6%A0%BC)
  - [表单](#%E8%A1%A8%E5%8D%95)
  - [弹窗表单](#%E5%BC%B9%E7%AA%97%E8%A1%A8%E5%8D%95)
  - [日历](#%E6%97%A5%E5%8E%86)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

## 图标选择器

1. 全局注册图标为`-`连接形式

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

2. 封装图标选择器组件

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


## 省市区选择器

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

### 全局注册组件

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

## 时间选择器

4. 日期选择器

5. 城市选择器

## 通知菜单

### 通知菜单组件

- 使用`element-plus`的插槽中嵌套插槽的方式自定义输入内容组件`\src\components\notification\com-src\index.vue`
```vue
<template>
  <el-popover
    placement="bottom"
    :width="300"
    trigger="click"
  >
    <template #default>
        <slot></slot>
    </template>
    <template #reference>
      <el-badge style="cursor: pointer" :value="value" :max="max" :is-dot="isDot">
        <component :is="`el-icon-${toLine(icon)}`" />
      </el-badge>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { toLine } from "@/utils"

const props = defineProps({
  // 显示的图标
  icon: {
    type: String,
    default: "Bell",
  },
  // 通知数量
  value: {
    type: [String, Number],
    default: "",
  },
  // 最大值
  max: {
    type: Number,
  },
  // 是否显示小圆点
  isDot: {
    type: Boolean,
    default: false,
  },
})
</script>
```

### 列表组件

1. 定义列表数据`\src\views\notification\data.ts`
```ts
export const lists = [
  {
    title: '通知',
    content: [
      {
        title: '蒂姆·库克回复了你的邮件',
        time: '2019-05-08 14:33:18',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png'
      },
      {
        title: '乔纳森·伊夫邀请你参加会议',
        time: '2019-05-08 14:33:18',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png'
      },
      {
        title: '斯蒂夫·沃兹尼亚克已批准了你的休假申请',
        time: '2019-05-08 14:33:18',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png'
      }
    ],
  },
  {
    title: '关注',
    content: [
      {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '曲丽丽 评论了你',
        desc: '描述信息描述信息描述信息',
        time: '3小时前'
      },
      {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '曲丽丽 评论了你',
        desc: '描述信息描述信息描述信息',
        time: '3小时前'
      },
      {
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '曲丽丽 评论了你',
        desc: '描述信息描述信息描述信息',
        time: '3小时前'
      }
    ]
  },
  {
    title: '代办',
    content: [
      {
        title: '任务名称',
        desc: '任务需要在 2017-01-12 20:00 前启动',
        tag: '未开始',
        tagType: ''
      },
      {
        title: '第三方紧急代码变更',
        desc: '冠霖提交于 2017-01-06，需在 2017-01-07 前完成代码变更任务',
        tag: '马上到期',
        tagType: 'danger'
      },
      {
        title: '信息安全考试',
        desc: '指派竹尔于 2017-01-09 前完成更新并发布',
        tag: '已耗时8天',
        tagType: 'warning'
      }
    ]
  },
]
export const actions = [
  {
    text: '清空代办',
    icon: 'delete'
  },
  {
    text: '查看更多',
    icon: 'edit'
  },
]
```

2. 传递数据`\src\views\notification\index.vue`
```vue
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
```

3. 定义列表组件使用到的接口类型`\src\components\list\com-src\type.ts`
```ts
/**
 * 列表的每一项
 */
export interface ListItem {
	// 头像
	avatar?: string
	// 标题
	title?: string
	// 描述
	desc?: string
	// 时间
	time?: string
	// 标签内容
	tag?: string
	// 标签类型
	tagType?: '' | 'success' | 'info' | 'waring' | 'danger'
}

/**
 * 列表
 */
export interface ListOptions {
	title: string
	content: ListItem[]
}

/**
 * 操作选项
 */
export interface ActionOptions {
	text: string
	icon?: string
}
```

4. 定义列表组件
```vue
<template>
	<div class="list-tabs__item">
		<el-tabs>
			<el-tab-pane        
				v-for="(item, index) in list"
				:key="index"
				:label="item.title"
			>
				<el-scrollbar max-height="300px">
					<div
					class="container"
					v-for="(item1,index1) in item.content"
					:key="index1"
					@click="clickItem(item1, index1)"
					>
						<div class="avatar" v-if="item1.avatar">
							<el-avatar size="small" :src="item1.avatar"></el-avatar>
						</div>
            <div class="content">
              <div v-if="item1.title" class="title">
                <div>{{ item1.title }}</div>
                <el-tag :tag="item1.tagType" v-if="item1.tagType">{{
                  item1.tag
                }}</el-tag>
              </div>
              <div v-if="item1.desc">{{ item1.desc }}</div>
              <div v-if="item1.time">{{ item1.time }}</div>
            </div>
					</div>
          <div class="actions">
            <div
              class="a-item"
              :class="{ border: i !== actions.length - 1 }"
              v-for="(action, i) in actions"
              :key="i"
			  @click="clickAction(action, i)"
            >
              <div class="a-icon" v-if="action.icon">
                <component :is="`el-icon-${toLine(action.icon)}`" />
              </div>
              <div class="a-text">{{ action.text }}</div>
            </div>
          </div>
				</el-scrollbar>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup lang="ts">
import { PropType } from "vue"
import { toLine } from "../../../utils"
import { ListOptions, ActionOptions, ListItem } from "./type"
const props = defineProps({
  // 列表的内容
  list: {
    type: Array as PropType<ListOptions[]>,
    required: true,
  },
  // 操作的内容
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => [],
  },
})

const emits = defineEmits(["clickItem", "clickAction"])
const clickItem = (item: ListItem, index: Number) => {
  emits("clickItem", { item, index })
}

const clickAction = (item: ActionOptions, index: Number) => {
  emits("clickAction", { item, index })
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  &:hover {
    background: #e6f6ff;
  }
  .avatar {
    flex: 1;
  }
  .content {
    flex: 3;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .time {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}
.actions {
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  .a-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    .a-icon {
      margin-right: 4px;
      position: relative;
      top: 2px;
    }
  }
}
.border {
  border-right: 1px solid #eee;
}
</style>
```


## 伸缩菜单

## 导航菜单

### 普通导航菜单

- 使用变量方式获取数据，防止传递来的数据格式不一致

1. 定义数据
```ts
const data1 = [
  {
    a: '导航1',
    b: '1',
    c: 'document',
  },
  {
    a: '导航2',
    b: '2',
    c: 'document',
  },
  {
    a: '导航3',
    b: '3',
    c: 'document',
    d: [
      {
        a: '导航3-1',
        b: '4',
        c: 'document',
      },
    ],
  },
]
```

2. 封装组件

```vue
<template>
  <!-- v-bind="$attrs" 接收父组件传递来的数据 并且数据没有在 props 声明 -->
  <el-menu :default-active="defaultActive"
           :router="router"
           v-bind="$attrs">
    <!-- 要用 template 包裹 template 不会渲染 如果改成 div 样式会变化 -->
    <template v-for="(item,i) in data"
              :key="i">
      <!-- 一级菜单 -->
      <el-menu-item v-if="!item[children] || !item[children].length"
                    :index="item[index]">
        <component v-if="item[icon]"
                   :is="`el-icon-${toLine(item[icon])}`"></component>
        <span>{{item[name]}}</span>
      </el-menu-item>
      <!-- 二级菜单 -->
      <el-sub-menu v-if="item[children] && item[children].length"
                   :index="item[index]">
        <template #title>
          <component v-if="item[icon]"
                     :is="`el-icon-${toLine(item[icon])}`"></component>
          <span>{{ item[name] }}</span>
        </template>
        <el-menu-item v-for="(item1,index1) in item[children]"
                      :key="index1"
                      :index="item1[index]">
          <component v-if="item1[icon]"
                     :is="`el-icon-${toLine(item1[icon])}`"></component>
          <span>{{item1[name]}}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { toLine } from '@/utils'
import { PropType } from 'vue'
const props = defineProps({
  // 导航菜单的数据
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  // 默认选中的菜单
  defaultActive: {
    type: String,
    default: '',
  },
  // 是否是路由模式
  router: {
    type: Boolean,
    default: false,
  },
  // 键名 -> 菜单标题的键名
  name: {
    type: String,
    default: 'name',
  },
  // 键名 -> 菜单表示的键名
  index: {
    type: String,
    default: 'index',
  },
  // 键名 -> 菜单图标的键名
  icon: {
    type: String,
    default: 'icon',
  },
  // 键名 -> 子菜单的键名
  children: {
    type: String,
    default: 'children',
  },
})
</script>
<style lang="scss" scoped>
svg {
  margin-right: 10px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
```

3. 使用组件
```html
<template>
    <Menu :data="data1"
          name="a"
          index="b"
          icon="c"
          children="d"></Menu>
</template>
```

4. 更改左侧菜单

```vue
<template>
  <Menu :data="data"
        router
        :defaultActive="$route.path"
        :collapse="collapse"
        class="el-menu-vertical-demo"></Menu>
</template>
```

5. 定义接口类型（本项目采用变量方式传递数据不需要）

```ts
export interface MenuItem {
    // 导航的图标
    icon?: string
    // 处理后的图标
    i?: any
    // 导航的名字
    name: string
    // 导航的标识
    index: string
    // 导航的子菜单
    children?: MenuItem[]
  }
```

### 无限层级菜单

1. 定义数据

```ts
const data2 = [
  {
    a: '导航1',
    b: '1',
    c: 'Document',
  },
  {
    a: '导航2',
    b: '2',
    c: 'Document',
  },
  {
    a: '导航3',
    b: '3',
    c: 'Document',
    d: [
      {
        a: '导航3-1',
        b: '4',
        c: 'Document',
        d: [
          {
            a: '导航3-1-1',
            b: '5',
            c: 'Document',
            d: [
              {
                a: '导航3-1-1-1',
                b: '6',
                c: 'Document',
                d: [
                  {
                    a: '导航3-1-1-1-1',
                    b: '7',
                    c: 'Document',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]
```

2. 通过jsx渲染页面递归实现无限层级菜单

```tsx
import { toLine } from "@/utils"
import { defineComponent,PropType, render, useAttrs } from "vue"
import { MenuItem } from "./types"
import * as Icons from '@element-plus/icons-vue'
import './styles/index.scss'

export default defineComponent({
	props: {
	// 导航菜单的数据
	data: {
			type: Array as PropType<any[]>,
			required: true,
		},
		// 默认选中的菜单
		defaultActive: {
			type: String,
			default: "",
		},
		// 是否是路由模式
		router: {
			type: Boolean,
			default: false,
		},
		// 键名 -> 菜单标题的键名
		name: {
			type: String,
			default: "name",
		},
		// 键名 -> 菜单表示的键名
		index: {
			type: String,
			default: "index",
		},
		// 键名 -> 菜单图标的键名
		icon: {
			type: String,
			default: "icon",
		},
		// 键名 -> 子菜单的键名
		children: {
			type: String,
			default: "children",
		}
	},
	setup(props,ctx) {
		/**
		 * 封装渲染无限层级菜单的方法
		 * @param data 需要渲染的数据
		 * @returns jsx代码
		 */
		const renderMenu = (data: any[]) => {
			return data.map((item: any) => {
				// 每个菜单的图标
				// `el-icon-${toLine(item[props.icon]!)}` 在 jsx 中不适用
				// 加 ! 断言一定有值
				// jsx 中 props 不可省略 vue 模板语言中可以省略
				item.i = (Icons as any)[item[props.icon]!]
				// 插槽是函数 处理sub-menu的插槽
				const slots = {
					title: () => {
						return <>
							<item.i style={{marginRight: 4}} />
							<span>{item[props.name]}</span>
						</>
					}
				}
				// 递归渲染 children
				if(item[props.children] && item[props.children].length) {
					return (
						// slots 上面定义的插槽
						<el-sub-menu index={item[props.index]} v-slots={slots}>
							{renderMenu(item[props.children])}
						</el-sub-menu>
					)
				}
				// 普通菜单
				return (
					<el-menu-item index={item[props.index]}>
						<item.i style={{marginRight: 4}} />
						<span>{item[props.name]}</span>
					</el-menu-item>
				)
			})
		}
		const attrs = useAttrs()
		// useAttrs() => 返回所有父组件传递来的没有在props声明的属性
		return () => {
			return (
				<el-menu default-active={props.defaultActive}
				 router={props.router}
				 {...attrs}
				>
					 {renderMenu(props.data)}
				</el-menu>
			)
		}
	}
})
```

3. 渲染页面

```vue
<template>
  <div style="width: 200px">
    <infiniteMenu :data="data2"
                  name="a"
                  index="b"
                  icon="c"
                  children="d" />
  </div>
</template>
```

## 趋势标记

```vue
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
```

```vue
<template>
  <div class="trend">
    <!-- 如果有插槽显示插槽，没有插槽显示文本 -->
    <slot v-if="$slots.default" :style="{ color: type === 'up' ? upTextColor : downTextColor }"  />
    <div
     class="text"
     :style="{ color: type === 'up' ? upTextColor : downTextColor }" 
     v-else>{{text}}</div>
    <!-- 动态渲染图标 -->
    <div class="icon">
      <component
       :is="`el-icon-${toLine(upIcon)}`"
       :style="{ color: !reverseColor ? upIconColor : '#52c41a' }"
       v-if="type === 'up'"
       ></component>
      <component
       :is="`el-icon-${toLine(downIcon)}`"
       :style="{ color: !reverseColor ? downIconColor : '#f5222d' }"
       v-else
       ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toLine } from "@/utils"
const props = defineProps({
    // 标记趋势是上升还是下降
    type: {
        type: String,
        default: 'up'
    },
    // 趋势显示的文字
    // 1. 父组件传递的数据
    // 2. 插槽
    text: {
        type: String,
        default: '文字'
    },
    // 颜色翻转，只在默认的颜色下生效没如果使用了自定义颜色，这个属性就不生效了
    reverseColor: {
        type: Boolean,
        default: false,
    },
    // 上升趋势图标
    upIcon: {
        type: String,
        default: "ArrowUp",
    },
    // 下降趋势图标
    downIcon: {
        type: String,
        default: "ArrowDown",
    },
    // 上升趋势图标颜色
    upIconColor: {
        type: String,
        default: "#f5222d",
    },
    // 下降趋势图标颜色
    downIconColor: {
        type: String,
        default: "#52c41a",
    },
    // 上升趋势文字颜色
    upTextColor: {
        type: String,
        default: "#000",
    },
    // 下降趋势文字颜色
    downTextColor: {
        type: String,
        default: "#000",
    }
})
</script>
<style lang="scss" scoped>
.trend {
  display: flex;
  align-items: center;
  .text {
    font-size: 12px;
    mask-repeat: 4px;
  }
  .icon {
    svg {
      width: 0.8em;
      height: 0.8em;
    }
  }
}
</style>
```

## 动态进度条

## 列表 

## 表格

## 表单

## 弹窗表单

## 日历