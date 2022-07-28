import Vue from "vue"
import axios from "axios"
import { showFullScreenLoading, hideFullScreenLoading } from "./loading"
const { timeout } = require("../config.json")

const CUSTOM_CODE_MAP = {
  SUCCESS: 0,
  ERROR: 1,
}

const HTTP_CODE_MAP = {
  400: "请求错误",
  401: "未授权，请登录", // clear session
  403: "拒绝访问",
  404: "请求地址出错",
  405: "不允许的请求方法",
  408: "请求超时",
  500: "服务未实现",
  502: "网关错误",
  503: "服务不可用",
  504: "网关超时",
}

const axiosRequestConfig = {
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: timeout,
}

const service = axios.create(axiosRequestConfig)

//请求拦截器
service.interceptors.request.use(
  config => {
    showFullScreenLoading()
    return config
  },
  error => {
    //请求失败
    hideFullScreenLoading()
    console.log("[util/axios/reqIntercept/请求失败]", error)
    Vue.prototype.$message({ message: `服务器请求失败,错误信息${error.message}`, type: "error" })
    return Promise.reject(error)
  }
)

//响应拦截器
service.interceptors.response.use(
  response => {
    hideFullScreenLoading()
    //返回的res的data
    switch (+response.data.status) {
      //响应成功, 但是服务器返回失败的状态码
      case CUSTOM_CODE_MAP.ERROR: {
        Vue.prototype.$message({ message: response.data.message || "未知错误", type: "error" })
        return Promise.reject(response)
      }
      case CUSTOM_CODE_MAP.SUCCESS: {
        return response.data.result
      }
      default:
        Vue.prototype.$message({ message: `未知错误`, type: "error" })
        console.log("后台返回status错误")
        return Promise.reject(response)
    }
  },
  error => {
    if (error && error.response) {
      const message = HTTP_CODE_MAP[error.response.status]
      if (message) error.message = message
    }
    hideFullScreenLoading()
    Vue.prototype.$message({ message: `服务器响应失败,错误信息: ${error.message}`, type: "error" })
    return Promise.reject(error)
  }
)

export default service
