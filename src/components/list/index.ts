/*
 * @Author: hidari
 * @Date: 2022-06-09 14:59:34
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-09 14:59:41
 * @FilePath: \el-components\src\components\list\index.ts
 * @Description: 列表组件全局注册
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
 */
import list from './com-src/index.vue'
import { App } from 'vue'

// 让这个组件可以通过 use 的方式使用
export default {
    install(app: App) {
        app.component('list', list)
    }
}