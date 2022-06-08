/*
 * @Author: hidari
 * @Date: 2022-06-07 16:04:22
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-08 17:59:09
 * @FilePath: \el-components\src\main.ts
 * @Description: main 主入口文件
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import { toLine } from './utils'
import UI from './components'

const app = createApp(App)


// 全局注册图标 牺牲一点性能
// el-icon-xxx
for(let i in Icons) {
    // 注册全局组件(横线连接)
    app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}
app.use(router).use(ElementPlus).use(UI)
app.mount('#app')