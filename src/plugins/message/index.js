import Vue from "vue"
import VMessage from "@/components/VMessage"

const Ctor = Vue.extend(VMessage)

export default {
  install(Vue) {
    Vue.prototype.$message = function (params) {
      let message = new Ctor() //创建子组件实例
      message.$mount() //挂载$el, 即对应的真实DOM

      document.querySelector("body").appendChild(message.$el)
      message.value = params.value
      if (params.duration) {
        //覆盖VMessage的duration
        message.duration = params.duration
      }
      message.startTimer()
    }
  },
}
