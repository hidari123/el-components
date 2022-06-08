/*
 * @Author: hidari
 * @Date: 2022-06-08 16:40:04
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-08 17:54:02
 * @FilePath: \el-components\src\components\chooseArea\index.ts
 * @Description: 省市区选择器组件全局注册
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
 */
import chooseArea from './com-src/index.vue'
import { App } from 'vue'

// 让这个组件可以通过 use 的方式使用
export default {
    install(app: App) {
        app.component('choose-area', chooseArea)
    }
}