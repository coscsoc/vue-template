<template>
  <div id="example">
    <div>
      <span class="svg-icon__label">svg图标</span>
      <base-icon name="biscuits" class="icon" @click="handleChangeName"></base-icon>
    </div>

    <base-form
      :inline="false"
      :form-items="formItems"
      :merge-form="mergeForm"
      :api="formApi"
      @after-submit="showTableData"
    >
      <template v-slot:slotCheckBox>
        <el-checkbox v-model="mergeForm.slotCheckBox">插槽复选框1</el-checkbox>
      </template>
    </base-form>

    <base-table :data="currentTableData" :columns="columns">
      <template v-slot:xxxScope="{ scope }">
        {{ scope }}
      </template>
    </base-table>

    <base-pagination :data="tableData" :total="tableData.length" tableName="test"></base-pagination>

    <el-button v-debounce:click.1000="handleToggleTableHeader">隐藏表头(自定义指令防抖)</el-button>

    <!--函数式组件节流-->
    <base-throttle :duration="3000">
      <el-button @click="handleShowMessage">弹窗按钮(函数式组件节流)</el-button>
    </base-throttle>

    <el-button v-permission="['admin']" @click="$router.push({path:'/home',query:{userId:123} })">testButton</el-button>
    <el-button v-permission="['admin']" @click="$router.push({ name: 'home', params: { id:232323 } })">testButton1</el-button>

    <!-- <skeleton>
      <el-button>skeleton-test-button</el-button>
      <el-tabs>
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </skeleton> -->
  </div>
</template>

<script>
import { columns } from "./columns"
import { formItems } from "./formItems"
import { formApi, radioGroup, cascader } from "@/api/example"
export default {
  name: "example",
  filters: {
    format(str) {
      return `处理后的${str}`
    },
  },
  data: () => ({
    formApi,
    columns,
    formItems,
    mergeForm: { slotCheckBox: "" },
    tableData: [],
    currentTableData: [],
    showTableHeader: false,
  }),
  created() {
    this.getInfo()
    //throw new Error(3213) //vuex errorHandler
  },
  methods: {
    showTableData(res) {
      this.tableData = res.tableData
      this.currentTableData = res.tableData
    },
    handleChangeName() {
      // 直接添加属性, 不触发响应式, Form基础组件里对其响应式处理了
      this.mergeForm.name = "vue-template"
    },
    findItem(key) {
      return this.formItems.find(formItem => formItem.attrs && formItem.attrs.key === key)
    },
    // 后端接口生成的表单配置项
    async getInfo() {
      const [res1, res2] = await Promise.all([radioGroup(), cascader()])
      let [asyncRadioOpt, cascaderOpt] = [this.findItem("asyncRadio"), this.findItem("cascader")]
      asyncRadioOpt && (asyncRadioOpt.attrs.options = res1.options)
      cascaderOpt && (cascaderOpt.attrs.options = res2.options)
    },
    handleToggleTableHeader() {
      this.showTableHeader = !this.showTableHeader
      //columns属性使用了Proxy拦截, 不需要手动触发set
      this.$hideTableHeader(this.columns, "dataType", this.showTableHeader)
    },
    handleShowMessage() {
      this.$message({
        value: "这是一条消息提示",
        duration: 2000,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#example {
  padding: 40px;
}
.icon {
  cursor: pointer;
}
.svg-icon__label {
  margin-right: 15px;
}
.base-table {
  margin-bottom: 25px;
}
</style>
