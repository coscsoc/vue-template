const loaderUtils = require("loader-utils")

const defaultOpts = {
  remUnit: 100, // rem unit value (default: 100)
  remFixed: 2, // rem value precision (default: 2)
}

module.exports = function(source) {
  const opts = loaderUtils.getOptions(this)
  const config = Object.assign({}, defaultOpts, opts)
  //
  const pxGlobalRegExp = /\b(\d+(\.\d+)?)SUPX\b/g
  if (this.cacheable) {
    this.cacheable()
  }
  if (pxGlobalRegExp.test(source)) {
    return source.replace(pxGlobalRegExp, ($0, $1) => {
      let val = $1 / config.remUnit
      val = parseFloat(val.toFixed(config.remFixed))
      return val === 0 ? val : val + "rem"
    })
  } else {
    return source
  }
}
