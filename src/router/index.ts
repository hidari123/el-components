/*
 * @Author: hidari
 * @Date: 2022-06-07 16:11:59
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-08 14:16:47
 * @FilePath: \el-components\src\router\index.ts
 * @Description: router 入口文件
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('../components/container/com-src/index.vue'),
        children: [
            {
                path: '/',
                component: () => import('../views/Home/index.vue'),
            },
            {
                path: '/chooseicon',
                component: () => import('../views/chooseIcon/index.vue')
            }
        ]
    }

]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router