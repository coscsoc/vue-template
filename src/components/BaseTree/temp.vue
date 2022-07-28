<script>
export default {
  name: "VirtualTree",
  props: {
    tree: [],
    option: {},
    timeout: 17,
    defaultExpand: false,
  },
  data: () => ({
    offset: 0,
    contentHeight: 0,
    visibleData: [],
  }),
  computed: {
    //铺平树结构, 因为引用还在, 操作铺平的结构, 树结构数据也会改变
    flattenTree() {
      return this.flatten(this.tree, "children", 1, {
        level: 0,
        visible: true,
        expand: true,
        children: this.tree,
      })
    },
    //
    visibleCount() {
      return Math.floor(this.option.height / this.option.itemHeight)
    },
  },
  methods: {
    flatten(list, childKey = "children", level = 1, parent = null, defaultExpand = true) {
      return list.reduce((acc, cur) => {
        cur.level = level
        /*
          先将tree结构 flat打成1维
          再遍历一次一维数组 添加节点信息{level, expand, visible}

          视图中展示的就是一维数组了

          模板里遍历一维tree 根据level设置padding就达到了缩进的效果

          折叠展开, 根据
        */
      })
    },
    // tree.length * count
    getContentHeight() {
      this.contentHeight = (this.flattenTree || []).filter(item => item.visible).length * this.option.itemHeight
    },
    handleScroll() {
      let cur = +new Date()
      if (currentTime - lastTime > this.timeout) {
        this.updateVisibleData(this.$refs.treeContainer.scrollTop)
        lastTime = currentTime
      }
    },
    updateVisibleData(scrollTop = 0) {
      //视窗起始节点idx
      let start = (scrollTop / this.option.itemHeight) | 0
      start = Math.max(0, start)
      // 结束节点idx
      const end = start + this.visibleCount * 2
      // 所有处于显示状态的
      const allVisibleData = (this.flattenTree || []).filter(item => item.visible)
      
      this.visibleData = allVisibleData.slice(start, end)
      this.offset = scrollTop - (scrollTop % this.option.itemHeight)
    },
    updateView() {
      this.getContentHeight()
      this.handleScroll()
    },
  },
  mounted() {
    this.updateView()
  },
}
</script>
