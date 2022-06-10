/*
 * @Author: hidari
 * @Date: 2022-06-10 09:35:40
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-10 14:57:36
 * @FilePath: \el-components\src\components\menu\com-src\menu.tsx
 * @Description: 无限层级菜单递归函数式写法
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
 */
import { toLine } from "@/utils"
import { defineComponent,PropType, render, useAttrs } from "vue"
import { MenuItem } from "./types"
import * as Icons from '@element-plus/icons-vue'
import './styles/index.scss'

export default defineComponent({
	props: {
	// 导航菜单的数据
	data: {
			type: Array as PropType<any[]>,
			required: true,
		},
		// 默认选中的菜单
		defaultActive: {
			type: String,
			default: "",
		},
		// 是否是路由模式
		router: {
			type: Boolean,
			default: false,
		},
		// 键名 -> 菜单标题的键名
		name: {
			type: String,
			default: "name",
		},
		// 键名 -> 菜单表示的键名
		index: {
			type: String,
			default: "index",
		},
		// 键名 -> 菜单图标的键名
		icon: {
			type: String,
			default: "icon",
		},
		// 键名 -> 子菜单的键名
		children: {
			type: String,
			default: "children",
		}
	},
	setup(props,ctx) {
		/**
		 * 封装渲染无限层级菜单的方法
		 * @param data 需要渲染的数据
		 * @returns jsx代码
		 */
		const renderMenu = (data: any[]) => {
			return data.map((item: any) => {
				// 每个菜单的图标
				// `el-icon-${toLine(item[props.icon]!)}` 在 jsx 中不适用
				// 加 ! 断言一定有值
				// jsx 中 props 不可省略 vue 模板语言中可以省略
				item.i = (Icons as any)[item[props.icon]!]
				// 插槽是函数 处理sub-menu的插槽
				const slots = {
					title: () => {
						return <>
							<item.i style={{marginRight: 4}} />
							<span>{item[props.name]}</span>
						</>
					}
				}
				// 递归渲染 children
				if(item[props.children] && item[props.children].length) {
					return (
						// slots 上面定义的插槽
						<el-sub-menu index={item[props.index]} v-slots={slots}>
							{renderMenu(item[props.children])}
						</el-sub-menu>
					)
				}
				// 普通菜单
				return (
					<el-menu-item index={item[props.index]}>
						<item.i style={{marginRight: 4}} />
						<span>{item[props.name]}</span>
					</el-menu-item>
				)
			})
		}
		const attrs = useAttrs()
		// useAttrs() => 返回所有父组件传递来的没有在props声明的属性
		return () => {
			return (
				<el-menu default-active={props.defaultActive}
				 router={props.router}
				 {...attrs}
				>
					 {renderMenu(props.data)}
				</el-menu>
			)
		}
	}
})
