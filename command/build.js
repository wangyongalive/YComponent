import path from "path";
import fsExtra from "fs-extra";
import fs from 'fs'
import { defineConfig, build } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 打包的入口文件夹
const entryDir = path.resolve(__dirname, "../packages");

// 出口文件夹
const outDir = path.resolve(__dirname, "../dist");

// vite基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()],
  resolve: {
    dedupe: [
      'vue'
    ]
  }
});

// rollup配置
const rollUpOptions = {
  external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: 'Vue'
    },
    exports: 'named'
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
        name: "y-lib",
        fileName: "y-lib",
        formats: ["umd", "es"],
      },
      outDir: outDir,
    },
  });
};
/**
 *   单组件打包
 * @param {*} name 组件名称
 */
const buildSingle = async (name) => {
  await build({
    ...baseConfig,
    build: {
      rollUpOptions,
      lib: {
        entry: path.resolve(entryDir, name),
        name: 'index',
        fileName: "index",
        formats: ['es', 'umd']
      },
      outDir: path.resolve(outDir, name)
    }
  })
  createPackageJson(name)
}

const createPackageJson = (name) => {
  const fileStr = `
  {
    "name":"${name}",
    "main":"index.umd.js",
    "module":"index.js",
    "style":"style.css"
  }`
  // 输出package.json
  fsExtra.outputFile(path.resolve(outDir, `${name}/package.json`), fileStr, 'utf-8')
}

const buildLib = async () => {
  // 全量构建
  await buildAll();
  // 获取组件
  fs.readdirSync(entryDir).filter(name => {
    // 只要目录，不要文件，且目录中包含index.ts
    const componentDir = path.resolve(entryDir, name);
    const isDir = fsExtra.lstatSync(componentDir).isDirectory();
    return isDir && fsExtra.readdirSync(componentDir).includes("index.ts");
  }).forEach(async name => {
    // 此时已经读出来了符合要求的目录，这里开始打包
    await buildSingle(name);
  });
};

// 打包
buildLib();


