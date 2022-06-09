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
  - [趋势标记](#%E8%B6%8B%E5%8A%BF%E6%A0%87%E8%AE%B0)

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


7. 伸缩菜单

8. 导航菜单

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

10. 动态进度条

11. 列表 

12. 表格

13. 表单

14. 弹窗表单

15. 日历