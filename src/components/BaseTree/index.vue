<template>
  <div class="main">
    <virtual-tree ref="virtualTree" :tree="tree" :defaultExpand="false" :option="option">
      <template v-slot:virtual_tree="{ item }">
        <div>{{ item.label }}-{{ item.expand }}</div>
      </template>
    </virtual-tree>
    <div class="btn-group">
      <el-button @click="expandAll" class="btn" type="primary">展开所有</el-button>
      <el-button @click="collapseAll" class="btn" type="primary">折叠所有</el-button>
      总长:{{ flattenTree.length }}
    </div>
  </div>
</template>

<script>
import VirtualTree from "./VirtualTree"
import treeTools from "./treeTools.js"
export default {
  mixins: [treeTools],
  data: () => ({
    option: {
      height: 500, //容器高度
      itemHeight: 25, //节点高度
    },
  }),
  mounted() {
    //console.log(this.tree)
  },
  methods: {
    collapseAll() {
      this.$refs.virtualTree.collapseAll()
    },
    expandAll() {
      this.$refs.virtualTree.expandAll()
    },
  },
  components: { VirtualTree },
}
</script>

<style>
.btn-group {
  margin-top: 20px;
}
</style>
