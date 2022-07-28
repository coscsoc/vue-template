import { Loading } from "element-ui"

let requestLoadingCount = 0
let loading
export function startLoading() {
  loading = Loading.service({
    text: "拼命加载中",
    spinner: "el-icon-loading", // 加载图标
    lock: true, //不能触发任何事件
    background: "rgba(0, 0, 0, 0.2)", //遮罩背景色
    customClass: "custom_loading_class", //	Loading 的自定义类名
  })
}

export function endLoading() {
  /*   setTimeout(() => {
  },3000) */
  loading && loading.close()
}

export function showFullScreenLoading() {
  if (requestLoadingCount === 0) startLoading()
  requestLoadingCount++
}

export function hideFullScreenLoading() {
  if (requestLoadingCount <= 0) return
  requestLoadingCount--
  if (requestLoadingCount === 0) endLoading()
}

