import { ElMessage } from "element-plus"

/*
 * @Author: hidari
 * @Date: 2022-06-08 16:00:21
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-08 16:26:49
 * @FilePath: \el-components\src\hooks\useCopy\index.ts
 * @Description: 复制文本
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
 */
export const useCopy = (text: string) => {
    // // 创建一个 input 框
    // let input = document.createElement('input')
    // // 给 input 赋值
    // input.value = text
    // // 追加到 body 中
    // document.body.appendChild(input)
    // // 选择输入框的操作
    // input.select()
    // // 执行复制的操作
    // document.execCommand(input)
    // 删除加入的输入框
    navigator.clipboard.writeText(text).then(() => {
        // 提示用户
        ElMessage.success('复制成功')
    }).catch(() => {
        ElMessage.error('复制失败')
    })
    // document.body.removeChild(input)
    // // 提示用户
    // ElMessage.success('复制成功')
}