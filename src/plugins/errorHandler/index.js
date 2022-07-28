import { report } from "./report"
import { isPromise, formatErrorQuery } from "./helper"

let vuexRegistered = false

const errorHandler = (err, vm, info) => {
  let { line, column } = formatErrorQuery({ stack: err.stack })
  console.log(vm.$route && vm.$route.name, err, line, column, info, "errorHandler")
  //report({ name: vm.$route && vm.$route.name, err, line, column, info, from: "errorHandler", message: err.message })
}

const handleAsyncFunction = (asyncFnObj, vm, info) => {
  Object.keys(asyncFnObj).forEach(key => {
    let method = asyncFnObj[key] //暂存旧的asyncFn
    //重写asyncFn的catch
    asyncFnObj[key] = function (...args) {
      let res = method.call(this, ...args)
      return isPromise(res) ? res.catch(err => errorHandler(err, vm, `${info} '${key}'`)) : res
    }
  })
}

const registerVuex = vm => {
  if (!vm.$store || !vm.$store._actions) return
  handleAsyncFunction(vm.$store._actions, vm, `vuex action error,action name:`)
  vuexRegistered = true
}

const registerGlobalErrorCapture = () => {
  //source:"webpack-internal:///./node_modules/@babel/runtime/helpers/esm/readOnlyError.js"
  window.onerror = function (message, source, line, column, err) {
    if (!err) return false
    let { name } = formatErrorQuery({ stack: err.stack, name: source })
    console.log(err, line, column, source, message, "window.onerror ")
    //report({ name, err, line, column, info: message, from: "onerror" })
    return true
  }
}

export default {
  install(Vue) {
    registerGlobalErrorCapture()
    Vue.config.errorHandler = errorHandler
    Vue.mixin({
      beforeCreate() {
        if (!vuexRegistered) registerVuex(this)
      },
    })
  },
}
