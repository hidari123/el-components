/*
 * @Author: hidari
 * @Date: 2022-06-09 15:19:50
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-09 15:52:13
 * @FilePath: \el-components\src\components\list\com-src\type.ts
 * @Description: 列表组件需要用到的类型
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
 */

/**
 * 列表的每一项
 */
export interface ListItem {
	// 头像
	avatar?: string
	// 标题
	title?: string
	// 描述
	desc?: string
	// 时间
	time?: string
	// 标签内容
	tag?: string
	// 标签类型
	tagType?: '' | 'success' | 'info' | 'waring' | 'danger'
}

/**
 * 列表
 */
export interface ListOptions {
	title: string
	content: ListItem[]
}

/**
 * 操作选项
 */
export interface ActionOptions {
	text: string
	icon?: string
}