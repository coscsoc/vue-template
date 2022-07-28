//自动注册路由
const files = require.context(".", false, /\.js$/) //false:不检索子目录

let configRoutes = []

configRoutes = files
  .keys()
  .filter(key => key != "./index.js")
  .map(key => files(key).default)
  .sort((a, b) => (a.sort ? a.sort - b.sort : -1))

export default configRoutes
