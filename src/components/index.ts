/*
 * @Author: hidari
 * @Date: 2022-06-08 17:52:03
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-09 16:44:46
 * @FilePath: \el-components\src\components\index.ts
 * @Description: app.use 全局注册组件入口
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
 */
import { App } from 'vue'
import chooseArea from './chooseArea'
import chooseIcon from './chooseIcon'
import list from './list'
import Menu from './menu'
import notification from './notification'
import trend from './trend'

const component = [
    chooseArea,
    chooseIcon,
    trend,
    notification,
    list,
    Menu
]

export default {
    install(app: App) {
        component.map(item => {
            app.use(item)
        })
    }
}