/*
 * @Author: hidari
 * @Date: 2022-06-09 09:58:03
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-09 10:00:14
 * @FilePath: \el-components\src\components\trend\index.ts
 * @Description: 全局注册趋势标记组件
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
 */
import {App} from 'vue'
import trend from './com-src/index.vue'

// 让这个组件可以通过 use 的形式使用
export default {
    install(app:App) {
        app.component('trend', trend)
    }
}