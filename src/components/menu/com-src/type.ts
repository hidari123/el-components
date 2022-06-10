/*
 * @Author: hidari
 * @Date: 2022-06-09 16:48:03
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-10 10:14:44
 * @FilePath: \el-components\src\components\menu\com-src\type.ts
 * @Description: 导航菜单的接口类型定义
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
 */
export interface MenuItem {
    // 导航的图标
    icon?: string
    // 处理后的图标
    i?: any
    // 导航的名字
    name: string
    // 导航的标识
    index: string
    // 导航的子菜单
    children?: MenuItem[]
  }