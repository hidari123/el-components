<!--
 * @Author: hidari
 * @Date: 2022-06-10 15:44:20
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-10 16:23:18
 * @FilePath: \el-components\src\views\progress\index.vue
 * @Description: 进度条组件
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
-->
<template>
  <Progress :percentage="60"
            isAnimation />
  <Progress :percentage="70"
            type="circle"
            isAnimation />
</template>