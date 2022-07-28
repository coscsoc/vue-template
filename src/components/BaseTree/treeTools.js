import generateData from "./generateTreeData"
export default {
  computed: {
    tree() {
      return generateData()
    },
    flattenTree() {
      console.log(this.tree, "--------")
      return this.flatten(this.tree)
    },
  },
  methods: {
    flatten(node) {
      return node.reduce((acc, cur) => {
        acc.push(cur)
        if (cur.children) acc.push(...this.flatten(cur.children))
        return acc
      }, [])
    },
  },
}

