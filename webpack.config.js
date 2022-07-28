const { resolve } = require("path")

exports.IS_TEST = process.env.VUE_APP_BUILD_ENV === "dev" // 测试环境
exports.IS_PRODUCTION = process.env.NODE_ENV == "development" // 发布环境
exports.DLL_DIR = resolve(__dirname, ".dll")
exports.USE_CDN = true

