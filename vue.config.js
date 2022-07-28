const fs = require("fs")
const path = require("path")
const apiMocker = require("mocker-api")
const CompressionWebpackPlugin = require("compression-webpack-plugin")
const { DllReferencePlugin } = require("webpack")
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")
const { DLL_DIR, IS_PRODUCTION, IS_TEST, USE_CDN } = require("./webpack.config")
const { resolve } = path

//第三方库不稳定, (staticfile), 用DllPlugin代替
const cdn = [
  "https://cdn.staticfile.org/vue/2.6.11/vue.min.js",
  "https://cdn.staticfile.org/vue-router/3.2.0/vue-router.min.js",
  "https://cdn.staticfile.org/vuex/3.2.0/vuex.min.js",
  "https://cdn.staticfile.org/element-ui/2.13.0/index.js",
  "https://cdn.staticfile.org/axios/0.19.0/axios.min.js",
  "https://cdn.staticfile.org/js-cookie/2.2.0/js.cookie.min.js",
]
//externals: 防止某些包打包到bundle中,  而是在runtime时再去获取 扩展依赖
const externals = {
  vue: "Vue",
  "vue-router": "VueRouter", //后面的val就是 import val from key
  vuex: "Vuex",
  "element-ui": "ELEMENT",
  axios: "axios",
  "js-cookie": "JsCookies",
}

const port = process.env.VUE_APP_BASE_API?.match(/\d+$/g)[0]

/* 动态注册 AddAssetHtmlWebpackPlugin 和 webpack.DllReferencePlugin*/
const plugins = []
if (!IS_PRODUCTION && fs.existsSync(DLL_DIR)) {
  fs.readdirSync(DLL_DIR).forEach(file => {
    if (/.*\.dll\.js$/.test(file)) {
      plugins.push(
        new AddAssetHtmlWebpackPlugin({
          filepath: resolve(DLL_DIR, file),
          outputPath: "js", // 输出路径，/dist/js
          publicPath: "js", // index.html中引入的文件路径
        })
      )
    }
    //将manifest路径加入到DllReferencePlugin
    if (/.*\.manifest.json/.test(file)) {
      plugins.push(
        new DllReferencePlugin({
          manifest: resolve(DLL_DIR, file),
        })
      )
    }
  })
}
module.exports = {
  lintOnSave: false,
  publicPath: "",
  chainWebpack: config => {
    config.resolve.alias
      .set("@", path.join(__dirname, "src/"))
      .set("util", path.join(__dirname, "src/util"))
      .set("mixins", path.join(__dirname, "src/mixins"))

    //清除已有的svg-loader
    const svgRule = config.module.rule("svg")
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(path.join(__dirname, "src/icons")) //处理svg目录
      .end()
      .use("svg-sprite-loader") //添加新的loader
      .loader("svg-sprite-loader") //将多个svg打包成svg-sprite
      .options({
        symbolId: "icon-[name]",
      })
      .end()
    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      //images-loader移除对svg的处理
      .exclude.add(path.join(__dirname, "src/icons"))
      .end()

    if (IS_PRODUCTION) {
      if (USE_CDN) {
        //html-webpack-plugin
        config.plugin("html").tap(args => {
          args[0].cdn = cdn
          return args
        })
        config.externals(externals)
      }
      //gzip压缩, 需要nginx配置
      config
        .plugin("compression")
        .use(CompressionWebpackPlugin)
        .tap(() => [
          {
            test: /\.js$|\.html$|\.css/, //匹配文件名
            threshold: 10240, //超过10k进行压缩
            deleteOriginalAssets: false, //是否删除源文件
          },
        ])
    }
  },

  configureWebpack: {
    plugins,
  },
  css: {
    //less自动导入https://blog.csdn.net/u010730126/article/details/103611235
    //虽然main.js引入了, 但是变量需要在用的时候导入
    loaderOptions: {
      //sass-loader传递选项
      sass: {
        //自动导入sass
        //~表示后面的值为alias, 会在webpack-alias中找
        prependData: `
          @import '~@/style/mixin.scss';
          @import "~@/style/variables.scss";
        `,
      },
    },
  },
  devServer: {
    host: "0.0.0.0",
    port: port,
    overlay: true, //出现错误, 全屏覆盖
    before(app) {
      apiMocker(app, resolve(__dirname, "src/util/mocker.js"), {
        proxy: {},
      })
    },
  },
}
