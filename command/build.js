const path = require("path");
const { defineConfig, build } = require("vite");
const vue = require("@vitejs/plugin-vue");
const vueJsx = require("@vitejs/plugin-vue-jsx");

// 打包的入口文件夹
const entryDir = path.resolve(__dirname, "../packages");

// 出口文件夹
const outDir = path.resolve(__dirname, "../lib");

// vite基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()],
});

// rollup配置
const rollUpOptions = {
  external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: "Vue",
    },
  },
};

// 全量打包
const buildAll = async () => {
  await build({
    ...baseConfig,
    build: {
      ...rollUpOptions,
      lib: {
        entry: path.resolve(entryDir, "index.ts"),
        name: "y-element-componets",
        fileName: "y-element-componets",
        formats: ["umd"],
      },
      outDir: outDir,
    },
  });
};

const buildLib = async () => {
  await buildAll();
};
buildLib();
