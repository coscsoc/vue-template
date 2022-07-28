<template>
  <div class="virtual-tree" ref="treeContainer" @scroll="handleScroll" :style="{ height: option.height + 'px' }">
    <div class="virtual-tree__phantom" :style="{ height: contentHeight + 'px' }"></div>
    <div class="virtual-tree__content" :style="{ transform: `translateY(${offset}px)` }">
      <div
        ref="treeList"
        class="virtual-tree__list"
        v-for="(item, index) in visibleData"
        :key="item.id"
        :style="{ paddingLeft: 18 * (item.level - 1) + 'px', height: option.itemHeight + 'px' }"
      >
        <i
          @click="toggleExpand(item)"
          :class="item.expand ? 'virtual-tree__expand' : 'virtual-tree__close'"
          v-if="item.children && item.children.length"
        />
        <!-- 没有children的节点-->
        <span v-else style="margin-right: 5px"></span>
        <!--:item 父传子 子v-slot接收-->
        <slot name="virtual_tree" :item="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>

<script>
let lastTime = 0
export default {
  name: "VirtualTree",
  props: {
    //tree数据
    tree: { type: Array, require: true, default: () => [] },
    option: { type: Object, require: true, default: () => ({ height: 500, itemHeight: 25 }) },
    //刷新频率
    timeout: { type: Number, default: 17 },
    defaultExpand: { type: Boolean, required: false, default: false },
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
    // 可显示节点数: 容器高/节点高
    visibleCount() {
      return Math.floor(this.option.height / this.option.itemHeight)
    },
  },
  methods: {
    flatten(list, childKey = "children", level = 1, parent = null, defaultExpand = true) {
      return list.reduce((acc, cur) => {
        cur.level = level
        if (cur.expand === undefined) {
          cur.expand = defaultExpand
        }
        if (cur.visible === undefined) {
          cur.visible = true
        }
        if (!parent.visible || !parent.expand) {
          cur.visible = false
        }
        // 这里不用父子关系也行
        cur.parent = parent
        acc.push(cur)
        if (cur[childKey]) acc.push(...this.flatten(cur[childKey], childKey, level + 1, cur, defaultExpand))
        return acc
      }, [])
    },
    updateView() {
      this.getContentHeight()
      this.handleScroll()
    },
    handleScroll() {
      let currentTime = +new Date()
      // 节流
      if (currentTime - lastTime > this.timeout) {
        this.updateVisibleData(this.$refs.treeContainer.scrollTop)
        lastTime = currentTime
      }
    },
    updateVisibleData(scrollTop = 0) {
      // 视窗起始idx
      let start = (scrollTop / this.option.itemHeight) | 0
      //console.log(scrollTop)
      start = Math.max(0, start)
      // 结束idx
      const end = start + this.visibleCount * 2
      // 所有处于显示状态的节点
      const allVisibleData = (this.flattenTree || []).filter(item => item.visible)
      this.visibleData = allVisibleData.slice(start, end)
      //console.log(this.visibleData, "递归结构变为一维结构")
      //便宜量
      this.offset = scrollTop - (scrollTop % this.option.itemHeight)
      //console.log(this.flattenTree);
    },
    // 容器撑开高度总长
    getContentHeight() {
     this.contentHeight = (this.flattenTree || []).filter(item => item.visible).length * this.option.itemHeight 
    },
    toggleExpand(item) {
      const isExpand = item.expand
      if (isExpand) {
        this.collapse(item, true) // 折叠
      } else {
        this.expand(item, true) // 展开
      }
      this.updateView()
    },
    //展开节点
    expand(item) {
      item.expand = true
      console.log(item)
      this.recursionVisible(item.children, true)
    },
    //折叠节点
    collapse(item) {
      item.expand = false
      this.recursionVisible(item.children, false)
    },
    //折叠所有
    collapseAll(level = 1) {
      //
      this.flattenTree.forEach(item => {
        item.expand = false
        if (item.level != level) {
          item.visible = false
        }
      })
      this.$nextTick(() => {
        this.$refs.treeContainer.scrollTop = 0
        this.updateView()
      })
    },
    //展开所有
    expandAll() {
      this.flattenTree.forEach(item => {
        item.expand = true
        item.visible = true
      })

      this.$nextTick(() => {
        this.$refs.treeContainer.scrollTop = 0
        this.updateView()
      })
    },
    //递归处理子节点
    recursionVisible(children, status) {
      children.forEach(child => {
        child.expand = status
        child.visible = status
        if (child.children) {
          this.recursionVisible(child.children, status)
        }
      })
    },
  },
  mounted() {
    this.updateView()
  },
}
</script>

<style scoped>
.virtual-tree {
  position: relative;
  overflow-y: scroll;
}
.virtual-tree__phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
.virtual-tree__content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  min-height: 100px;
}
.virtual-tree__list {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.virtual-tree__close {
  display: inline-block;
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0;
  margin-right: 5px;
  border-width: 5px;
  border-color: transparent transparent transparent #c0c4cc;
  border-style: dashed dashed dashed solid;
}
.virtual-tree__expand {
  display: inline-block;
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0;
  margin-right: 5px;
  border-width: 5px;
  border-color: #c0c4cc transparent transparent transparent;
  border-style: solid dashed dashed dashed;
}
</style>
