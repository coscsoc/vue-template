<!--
layout{
    total:总数,sizes:每页多少条,prev:前一页箭头,pager:页码,next:下一页,jumper: 直接跳转
}
total: 总页数
pageSize: 每页条数
currentPage: 当前页数
currentChange(起始页数, 表名): 执行currentChange事件,  触发父组件的回调, 
handleSizeChange: 用户自定义每页显示多少数据
[tableName]: 表名，用于同一组件多张表格分页
[20, 50, 100, 250]
-->
<template>
  <section>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      :page-sizes="[1, 2]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
    >
    </el-pagination>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"
export default {
  name: "base-pagination",
  props: {
    total: { type: Number, default: 0 },
    tableName: { type: String },
    data: { type: Array, default: [] },
  },
  data: () => ({ currentPage: 1 }),
  watch: {
    total: {
      handler() {
        this.handleCurrentChange(1)
      },
      immediate: true,
    },
    data() {
      this.handleCurrentChange(1)
    },
  },
  computed: {
    isShow() {
      return this.total
    },
    ...mapState({ pageSize: state => state.global.pageSize }),
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      let startPage = (this.currentPage - 1) * this.pageSize,
        endPage = this.currentPage * this.pageSize

      if (this.$listeners["current-change"]) {
        this.$emit("current-change", startPage, endPage, this.tableName)
      } else {
        this.$parent.currentTableData = this.$parent.tableData.slice(startPage, endPage)
      }
    },
    handleSizeChange(val) {
      this.SAVE_PAGE_SIZE({
        pageSize: val,
      })
      
      this.handleCurrentChange(1)
    },
    ...mapMutations(["SAVE_PAGE_SIZE"]),
    ...mapActions(["test"]),
  },
}
</script>

<style lang="scss" scoped>
section {
  width: 100%;
}
.el-pagination {
  @include flex;
  margin-top: 20px;
}
</style>
