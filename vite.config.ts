import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { fileURLToPath, URL } from "node:url";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueSetupExtend(), vueJsx()],
  server: {
    port: 8888,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "packages/index.ts"),
      name: "MyLib",
      // the proper extensions will be added
      fileName: "my-lib",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
