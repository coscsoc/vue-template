export const formatErrorQuery = ({ stack, name }) => {
  const DEFAULT = { line: null, column: null, name }

  /*
  Error:1212
    at:///node_modules/..../example/index.vue?vue&103:11
    at xxx2
  */
  try {
    //\/n换行符, .除了行结束符, *是0⬆
    const firstLineReg = /\n(.*)/ //换行符后除了结束符后的一行, 即 at:///node_....
    //\/第一个/ ,(.*) :前的所有,
    const reg = /\/(.*):(\d+):(\d+)/ // 找到行列和文件名

    let firstLine = stack.match(firstLineReg) || "" //第一行内容
    let index = firstLine.lastIndexOf("/") //最后一个/
    let filePath = firstLine.slice(index) //  /index.vue?vue&103:11
    let matchResult = filePath.match(reg) //  index.vue?vue&103:11
    let [_, temp = "", line = "", column = ""] = matchResult

    if (name) {
      //window.onerror
      //"webpack-internal:///./node_modules/@babel/runtime/helpers/esm/readOnlyError.js"
      //这个正则好像是错的, 改改
      name = name.match(/[^/]+(?!.*\/)/g)[0]
    } else {
      //Vuex的 errorHandler
      name = temp
    }
    return { line, column, name }
  } catch (err) {
    return DEFAULT
  }
}

export const isPromise = promise => Object.prototype.toString.call(promise) === "[object Promise]"
