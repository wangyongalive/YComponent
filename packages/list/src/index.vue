<template>
  <div>
    <el-tabs class="demo-tabs">
      <el-tab-pane v-for="(item, index) in list" ::key="index" :label="item.title">
        <el-scrollbar max-height="400px">
          <!-- 静态数据 直接使用序列号 -->
          <div class="container" v-for="(item1, index1) in item.content" :key="index1"
            @click.stop="clickItem(item1, index1)">
            <div class="avatar">
              <el-avatar size="small" :src="item1.avatar"></el-avatar>
            </div>
            <div class="content">
              <!-- v-if 当数值不存在时候 不显示 提高代码的健壮性 -->
              <div v-if="item1.title" class="title">
                <div>{{ item1.title }}</div>
                <el-tag v-if="item1.tag" size="small" :type="item1.tagType">{{ item1.tag }}</el-tag>
              </div>
              <div class="time" v-if="item1.desc">{{ item1.desc }}</div>
              <div class="time" v-if="item1.time">{{ item1.time }}</div>
            </div>
          </div>
          <div class="actions">
            <!-- 分割线 -->
            <div class="a-item" :class="{ 'border': i !== actions.length - 1 }" v-for="(action, i) in actions" :key="i"
              @click.stop="clickAction(action, i)">
              <div class="a-icon" v-if="action.icon">
                <component :is="`el-icon-${toLine(action.icon)}`"></component>
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
import { PropType } from 'vue'
import { ActionOptions, ListOptions, ListItem } from './types';
import { toLine } from '../..//utls';
const props = defineProps({
  // 列表的内容
  list: {
    type: Array as PropType<ListOptions[]>,
    required: true
  },
  // 操作的内容
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => []
  }
})

const emits = defineEmits(['clickItem', 'clickAction'])


// 向外暴露事件
const clickItem = (item: ListItem, index: Number) => {
  emits('clickItem', {
    item,
    index
  })
}
const clickAction = (action: ActionOptions, index: Number) => {
  emits('clickAction', {
    action,
    index
  })
}
</script>

<style scoped lang="scss">
:deep(.demo-tabs) {
  .el-tabs__nav {
    width: 100%;
    display: flex;

    .el-tabs__item {
      flex: 1;
      text-align: center;
    }
  }

  .el-tabs__content {
    .container {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      cursor: pointer;

      .avatar {
        flex: 1
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

      .a-item {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-right: 1px solid #eee;
      }

      .a-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 4px;
      }

      // css 选择器
      >.a-item:last-child {
        border-right: 0
      }
    }
  }

  .border {
    // border-right: 1px solid #eee;
  }
}
</style>