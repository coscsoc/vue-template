import Vue from "vue"

const ctx = require.context(".", true, /\.vue$/)

ctx
  .keys()
  .filter(
    path => /^\.\/Base/g.test(path) //  ./Base开头
  )
  .forEach(path => {
    //加载svg图片
    if (path.includes("BaseIcon")) {
      //require.context会被编译为__webpack_require__("XX")
      const ctx = require.context("@/icons", false, /\.svg$/)
      //ctx.keys().map(key=>ctx(key) //自动导入每个key)
      const requireAll = ctx => ctx.keys().map(ctx)
      requireAll(ctx)
    }
    const module = ctx(path)
    //esm, cjs
    const component = module.default || module
    //全局注册
    Vue.component(component.name, component)
  })
