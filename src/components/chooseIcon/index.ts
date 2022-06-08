/*
 * @Author: hidari
 * @Date: 2022-06-08 12:04:24
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-08 17:52:27
 * @FilePath: \el-components\src\components\chooseIcon\com-src\index.ts
 * @Description: 选择图标组件全局注册
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
 */
import chooseIcon from './com-src/index.vue'
import { App } from 'vue'

// 让这个组件可以通过 use 的方式使用
export default {
    install(app: App) {
        app.component('choose-icon', chooseIcon)
    }
}