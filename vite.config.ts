/*
 * @Author: lijiaying 1640106564@qq.com
 * @Date: 2022-06-07 16:04:22
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-10 09:34:55
 * @FilePath: \el-components\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 主要用于alias文件路径别名
const path = require('path')

function _resolve(dir: string) {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  // vite 的插件都是函数的形式
  plugins: [vue(), vueJsx()],
  // 配置端口号
  server: {
      port: 8082
  },
  resolve: {
    alias: {
      '@': _resolve('src'),
      '@/assets': _resolve('src/assets'),
      '@/components': _resolve('src/components'),
      '@/utils': _resolve('src/utils'),
      '@/router': _resolve('src/router'),
      '@/store': _resolve('src/store'),
    }
  }
})
