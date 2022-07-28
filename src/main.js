import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Message from "./plugins/message"
import ErrorHandler from "./plugins/errorHandler"
import { hideTableHeader } from "util/hideTableHeader"
import * as filters from "./filters"
import * as directives from "./directives"
import "@/element"
import "@/components"
import "@/style/index.scss"

Vue.config.productionTip = false
//隐藏表头的方法
Vue.prototype.$hideTableHeader = hideTableHeader

Vue.use(Message) //安装自定义弹框插件
Vue.use(ErrorHandler) //安装错误捕获插件

//注册全局filters和directive
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
Object.keys(directives).forEach(key => Vue.directive(key, directives[key]))

//const a=2;a=1 //window.onerror

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app")
