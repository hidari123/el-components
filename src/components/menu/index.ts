/*
 * @Author: hidari
 * @Date: 2022-06-09 16:37:34
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-10 09:58:59
 * @FilePath: \el-components\src\components\menu\index.ts
 * @Description: 菜单组件全局封装
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
 */
import Menu from './com-src/index.vue'
import infiniteMenu from './com-src/menu.tsx'
import { App } from 'vue'

// 让这个组件可以通过 use 的方式使用
export default {
    install(app: App) {
        app.component('Menu', Menu)
        app.component('infiniteMenu', infiniteMenu)
    }
}