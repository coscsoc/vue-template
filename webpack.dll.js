//DllPlugin: 在单独的 webpack 配置中创建一个 dll-only-bundle, 会生成一个 manifest.json，让 DllReferencePlugin 能够映射到相应的依赖上
//DllReferencePlugin: 把 dll-only-bundles 引用到需要的预编译的依赖中

const path = require("path")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const { DllPlugin } = require("webpack")
const { DLL_DIR } = require("./webpack.config")

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    vue: ["vue"],
    vuex: ["vuex"],
    Element: ["element-ui"],
    vueRouter: ["vue-router"],
    axios: ["axios"],
  },
  output: {
    path: path.resolve(__dirname, "./.dll"),
    filename: "[name].dll.js",
    // 库全局变量的名字，如何暴露模块
    library: "[name]",
  },
  optimization: {
    minimizer: [
      // 删除类库文件中的log
      new TerserWebpackPlugin({
        sourceMap: true,
        terserOptions: {
          warnings: false,
          compress: {
            drop_debugger: true,
            drop_console: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new DllPlugin({
      name: "[name]",
      path: path.join( DLL_DIR, "/[name].manifest.json"),
    }),
  ],
}
