export function findComponentUpwardByProp(vm, prop) {
  let res = null
  let parent = vm.$parent
  while (parent) {
    if (parent[prop]) {
      res = parent
      break
    }
    parent = parent.$parent
  }
  return res
}
