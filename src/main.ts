import { createApp } from "vue";
// import './style.css'
import App from "./App.vue";
import router from "./router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { toLine } from "./utls/index";
// import ui from './components/index
// @ts-ignore
import ui from "../dist/y-lib.js";
import "../lib/style.css";

// 单独引入组件
// @ts-ignore
// import chooseIcon from '../dist/chooseIcon/index.js';
// import '../dist/chooseIcon/style.css';
import "./mock";

const app = createApp(App);

// 全局注册图标 牺牲一点性能
// el-icon-xxx
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  console.log(key, component);
  // 注册全部组件
  app.component(`el-icon${toLine(key)}`, component);
}

app.use(router).use(ElementPlus)
  // .use(chooseIcon);
  .use(ui);
app.mount("#app");
