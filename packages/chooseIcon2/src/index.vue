<template>
    <el-button @click="handleClick" type="primary">
        <slot></slot>
    </el-button>
    <div class="y-choose-icon-dialog-body-height">
        <el-dialog :title="title" :model-value="visible" class="y-dialog" @close="handleClose">
            <el-scrollbar height="500px">
                <div class="container" @click.stop="clickItem">
                    <div class="item" v-for="(item) in Object.keys(ElementPlusIconsVue)" :key="item" :data-item="item">
                        <div class="icon">
                            <component :is="`el-icon${toLine(item)}`"></component>
                        </div>
                        <div>{{ item }}</div>
                    </div>
                </div>
            </el-scrollbar>
        </el-dialog>
    </div>
</template>
  
<script setup lang="ts">
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { toLine, eventProxy } from "../../utls/index";
import { useCopy } from "../../hooks/useCopy";

const props = defineProps<{
    // 弹出框标题
    title: string;
    // 弹出框显隐
    visible: boolean;
}>();

const emits = defineEmits(["update:visible"]);

const handleClose = () => {
    emits("update:visible", false);
};

// 点击按钮显示弹出框
const handleClick = () => {
    // 需要修改父组件的数据  emits
    emits("update:visible", true);
};

// 点击图标
const clickItem = (e: any) => {
    // 事件代理
    let target = eventProxy(e, ".item");
    // 获取文本
    let text = `<el-icon${toLine(target.dataset.item)} />`;
    // 复制文本
    useCopy(text);
    // 关闭弹框
    handleClose();
};
</script>
  
<style scoped lang="scss">
.container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.item {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;
}

svg {
    width: 2em;
    height: 2em;
}

// 弹出框没有data-v属性 需要使用:deep(选择器) 不需要定义一个命名空间
// [data-v-de13521e] .y-dialog {
//   background-color: black;
// }
:deep(.y-dialog) {
    // background-color: black;
}
</style>
  