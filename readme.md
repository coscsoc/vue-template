# Vue-template

Vue项目模版

* [x] 清晰的项目结构
* [x] util辅助函数
* [x] 表单组件(有待改进)
* [x] 表格组件
* [x] svg图标组件
* [x] 自定义弹框组件
* [x] 函数式组件
* [x] 通过JavaScript调用的弹框组件
* [x] 全局组件/路由/状态管理自动注册
* [x] 自定义指令
* [x] axios封装
* [??] 自定义主题
* [??] 国际化
* [??] 骨架屏
* [x] 递归大树渲染

* [x] webpack4配置+性能优化
* [x] 自动生成 Dll 的脚本

## 性能优化

* 图片加载优化
  1. 不用图片, 使用css或者CDN加载
  2. 小图片使用base64格式
  3. 尽量使用 WebP 格式,
* 网络请求相关
  * CDN + externals
  * 合理的缓存策略
    1. 静态资源, 第三方类库, cdn强缓存(max-age设很大)
    2. index.html, 图片协商缓存(max-age<=0,Last-Modified,ETag)
  * gzip(compression-webpack-plugin, 需要nginx配置)
  * 资源预加载, 给link标签添加preload, prefetch, dns-prefetch属性
  * http2(nginx, listen 443 ssl http2;)
  * 合理使用web worker
* 构建相关
  * 路由懒加载(减少首页白屏时间)
  * 预渲染, ssr, 骨架屏
  * Dll(动态链接库, 将三方类库单独打包出去)
  * 使用轻量第三方类库dayjs, 按需引用 或者 CDN
  * webpack-bundle-analyzer, 分析打包体积(vue-cli自带)
  * 使用splitChunks
  * babel-loader/cache-loader 开启缓存
* 使用plugin,loader
  * clean-webpack-plugin在编译之前清理指定目录指定内容
  * 并行编译happy-pack、thread-loader
  * 静态文件直接拷贝(有个plugin忘了叫什么)

* 减小文件搜索范围
  * loader合理使用include, exclude确定作用域范围(babel-loader避免不必要的转义)
  * resolve.modules, 指明第三方模块的路径
  * resolve.extensions 减少匹配的扩展名
  * 合理使用alias

* 静态资源相关
  * 图片懒加载(getBoundingClientRect, IntersectionObserver)
  [vue-lazyload的设计思想](https://juejin.cn/post/6844903889108631565)
  * 使用svg/webp图标(质量好, 体积小, svg不需要额外请求, webp需要使用picture,source标签)
  * js, css, 图片, 代码都压缩 gzip压缩 
  * TerserPlugin 压缩js
  * css-minimizer-webpack-plugin压缩css

* 编码相关
  * 减少对DOM的访问, 减少回流重绘
    1. 文档碎片, 或者DOM离线访问
    2. 避免频繁获取视图信息(getBoundingClientRect,clientWidth,offsetWidth),当发生重排/重绘操作时浏览器会维护一个队列，等到超过了最大值或过了指定时间（1000ms/60 = 16.6ms）才会去清空队列一次性执行操作，这样可以节省性能，而获取视图信息会立刻清空队列执行重排/重绘
    3. 高频监听事件防抖节流
    4. 修改样式通过class, 一次性修改
    5. css3硬件加速(可让transform、opacity、filters、Will-change不触发回流重绘, 会提高内存占用)
  * [vue scoped的原理](https://juejin.cn/post/7023343999909888037)


## vue性能优化

* v-if, v-for不一起用
* 用v-if代替v-show
* key唯一
* 路由懒加载, 图片懒加载
* 按需引入
* 长列表虚拟滚动
* 服务端渲染SSR
* 适当使用keep-alive

```javascript

* [首屏加载优化](https://juejin.cn/post/6949896020788690958)
* 白屏原因: SPA应用的html靠js生成, js加载需要时间
* 减少首屏请求JS的文件数量和大小
* 路由懒加载
* 使用quick link 预加载(在空闲时间预获取页面可视区域的链接)
* 体验上增加骨架屏或loading
* 合理使用web worker优化计算
* ssr
* 合理使用缓存配合webpack的contenthash
* 代码压缩
* 非首屏资源，使用 preload、prefetch 
```
