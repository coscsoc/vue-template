const { DLL_DIR } = require("../webpack.config")
const { execSync } = require("child_process")
const { readdirSync, existsSync } = require("fs")
const dllConfig = require("../webpack.dll")

const isExist = existsSync(DLL_DIR)
const genDll = () => {
  console.log("正在生成 dll...")
  execSync("npm run dll")
  console.log("dll 生成完毕")
}
const main = () => {
  //命令行 --forceDll 会强制生成 dll
  if (!isExist || process.argv[2] === "--forceDll") {
    return genDll()
  }

  if (!dllConfig.entry) return

  const files = readdirSync(DLL_DIR)
    .filter(file => file.endsWith(".js"))
    .map(file => file.replace(".dll.js", ""))

  const shouldGenDll = !Object.keys(dllConfig.entry).every(key => files.includes(key))
  if (shouldGenDll) {
    genDll()
  }
}

main()
