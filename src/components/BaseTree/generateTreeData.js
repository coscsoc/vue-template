const maxNode = 100 //最大的节点数
const childNodeNum = [2, 5] //子节点数
const maxLevel = 4 //最大嵌套层级
const childRate = 0.7 //拥有子节点的概率
const label = "node" //节点名

let idx = 0
let data = []

const randomIdx = (min, max) => (Math.random() * (max - min) + min) | 0
//随机Id, 每生成一个节点idx自增
const generateId = () => ++idx && Math.random().toString().slice(3)
//初始化节点
const generateNode = () => {
  let id = generateId()
  return { id, label: `${label}_${id}` }
}

const generateChild = (root, level = 1) => {
  root.children = []
  let childNum = randomIdx(childNodeNum[0], childNodeNum[1])

  for (let i = 0; i < childNum; i++) {
    if (idx > maxNode - 1) break
    let temp = generateNode()
    if (Math.random() < childRate && level < maxLevel) {
      generateChild(temp, level + 1)
    }
    root.children.push(temp)
  }
}

const generate = () => {
  while (idx < maxNode) {
    const temp = generateNode()

    generateChild(temp)
    data.push(temp)
  }
  return data
}

export default generate
