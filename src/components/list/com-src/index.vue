<!--
 * @Author: hidari
 * @Date: 2022-06-09 14:59:25
 * @LastEditors: hidari
 * @LastEditTime: 2022-06-09 16:21:37
 * @FilePath: \el-components\src\components\list\com-src\index.vue
 * @Description: 列表组件封装
 * 
 * Copyright (c) 2022 by lijiaying 1640106564@qq.com, All Rights Reserved. 
-->
<template>
	<div class="list-tabs__item">
		<el-tabs>
			<el-tab-pane        
				v-for="(item, index) in list"
				:key="index"
				:label="item.title"
			>
				<el-scrollbar max-height="300px">
					<div
					class="container"
					v-for="(item1,index1) in item.content"
					:key="index1"
					@click="clickItem(item1, index1)"
					>
						<div class="avatar" v-if="item1.avatar">
							<el-avatar size="small" :src="item1.avatar"></el-avatar>
						</div>
            <div class="content">
              <div v-if="item1.title" class="title">
                <div>{{ item1.title }}</div>
                <el-tag :tag="item1.tagType" v-if="item1.tagType">{{
                  item1.tag
                }}</el-tag>
              </div>
              <div v-if="item1.desc">{{ item1.desc }}</div>
              <div v-if="item1.time">{{ item1.time }}</div>
            </div>
					</div>
          <div class="actions">
            <div
              class="a-item"
              :class="{ border: i !== actions.length - 1 }"
              v-for="(action, i) in actions"
              :key="i"
			  @click="clickAction(action, i)"
            >
              <div class="a-icon" v-if="action.icon">
                <component :is="`el-icon-${toLine(action.icon)}`" />
              </div>
              <div class="a-text">{{ action.text }}</div>
            </div>
          </div>
				</el-scrollbar>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script setup lang="ts">
import { PropType } from "vue"
import { toLine } from "../../../utils"
import { ListOptions, ActionOptions, ListItem } from "./type"
const props = defineProps({
  // 列表的内容
  list: {
    type: Array as PropType<ListOptions[]>,
    required: true,
  },
  // 操作的内容
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => [],
  },
})

const emits = defineEmits(["clickItem", "clickAction"])
const clickItem = (item: ListItem, index: Number) => {
  emits("clickItem", { item, index })
}

const clickAction = (item: ActionOptions, index: Number) => {
  emits("clickAction", { item, index })
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  &:hover {
    background: #e6f6ff;
  }
  .avatar {
    flex: 1;
  }
  .content {
    flex: 3;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .time {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}
.actions {
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
  .a-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    .a-icon {
      margin-right: 4px;
      position: relative;
      top: 2px;
    }
  }
}
.border {
  border-right: 1px solid #eee;
}
</style>