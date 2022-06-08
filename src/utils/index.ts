/*
 * @Author: hidari
 * @Date: 2022-06-08 09:26:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-08 09:32:50
 * @FilePath: \el-components\src\utils\index.ts
 * @Description: 把驼峰命名法改为横线链接
 *
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved.
 */

/**
 * 把驼峰命名法改为横线链接
 * @param value 
 * @returns 
 */
export const toLine = (value: string) => {
    // $1 是第一个小括号里的内容
    return value.replace(/(A-Z)g/, '-$1').toLocaleLowerCase()
}
