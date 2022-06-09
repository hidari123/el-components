/*
 * @Author: hidari
 * @Date: 2022-06-09 14:11:06
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-09 14:13:11
 * @FilePath: \el-components\src\components\notification\index.ts
 * @Description: 消息通知组件全局注册
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
 */
import notification from './com-src/index.vue'
import { App } from 'vue'

// 让这个组件可以通过 use 的方式使用
export default {
    install(app: App) {
        app.component('notification', notification)
    }
}