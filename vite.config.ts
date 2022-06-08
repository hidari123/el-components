/*
 * @Author: lijiaying 1640106564@qq.com
 * @Date: 2022-06-07 16:04:22
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-08 10:27:33
 * @FilePath: \el-components\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 配置端口号
  server: {
      port: 8082
  }
})
