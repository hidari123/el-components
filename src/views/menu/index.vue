<!--
 * @Author: hidari
 * @Date: 2022-06-09 16:38:56
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-10 15:11:21
 * @FilePath: \el-components\src\views\menu\index.vue
 * @Description: 菜单组件
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
-->
<template>
  <div style="width: 200px">
    <infiniteMenu :data="data2"
                  name="a"
                  index="b"
                  icon="c"
                  children="d" />
    <Menu :data="data1"
          name="a"
          index="b"
          icon="c"
          children="d" />
  </div>
</template>

<script setup lang="ts">
const data1 = [
  {
    a: '导航1',
    b: '1',
    c: 'document',
  },
  {
    a: '导航2',
    b: '2',
    c: 'document',
  },
  {
    a: '导航3',
    b: '3',
    c: 'document',
    d: [
      {
        a: '导航3-1',
        b: '4',
        c: 'document',
      },
    ],
  },
]
const data2 = [
  {
    a: '导航1',
    b: '1',
    c: 'Document',
  },
  {
    a: '导航2',
    b: '2',
    c: 'Document',
  },
  {
    a: '导航3',
    b: '3',
    c: 'Document',
    d: [
      {
        a: '导航3-1',
        b: '4',
        c: 'Document',
        d: [
          {
            a: '导航3-1-1',
            b: '5',
            c: 'Document',
            d: [
              {
                a: '导航3-1-1-1',
                b: '6',
                c: 'Document',
                d: [
                  {
                    a: '导航3-1-1-1-1',
                    b: '7',
                    c: 'Document',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]
</script>