/*
 * @Author: hidari
 * @Date: 2022-06-07 16:11:59
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-10 15:12:55
 * @FilePath: \el-components\src\router\index.ts
 * @Description: router 入口文件
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('@/components/container/com-src/index.vue'),
		children: [
			{
				path: '/',
				component: () => import('@/views/Home/index.vue')
			},
			{
				path: '/chooseicon',
				component: () => import('@/views/chooseIcon/index.vue')
			},
			{
				path: '/choosearea',
				component: () => import('@/views/chooseArea/index.vue')
			},
			{
				path: '/trend',
				component: () => import('@/views/trend/index.vue')
			},
			{
				path: '/notification',
				component: () => import('@/views/notification/index.vue')
			},
			{
				path: '/menu',
				component: () => import('@/views/menu/index.vue')
			}
		]
	}
]

const router = createRouter({
	routes,
	history: createWebHistory()
})

export default router