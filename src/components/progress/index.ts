/*
 * @Author: hidari
 * @Date: 2022-06-10 15:31:24
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-10 15:47:06
 * @FilePath: \el-components\src\components\progress\index.ts
 * @Description: 进度条组件全局注册
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
 */
import {App} from 'vue'
import Progress from './com-src/index.vue'

// 让这个组件可以通过 use 的形式使用
export default {
    install(app:App) {
        app.component('Progress', Progress)
    }
}