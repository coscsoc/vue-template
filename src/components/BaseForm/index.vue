<template>
  <el-form
    class="base-form"
    :bind="$attrs"
    :model="Model"
    :ref="form"
    :api="api"
    :show-message="showMessage"
    :status-icon="statusIcon"
    :inline="inline"
  >
    <template v-for="(item, index) in _formItems">
      <el-form-item
        :key="index + item.attrs.key"
        :class="item.itemAttrs.className"
        v-if="item._ifRender"
        v-bind="item.itemAttrs || {}"
        :prop="item.attrs.key"
      >
        <slot v-if="item.slot" :name="item.slot" :xxx="Model" />
        <component
          v-else
          :is="item.tag"
          :class="item.itemAttrs.className"
          v-model="Model[item.attrs.key]"
          v-bind="item.attrs || {}"
          v-on="item.listeners || {}"
        />
      </el-form-item>
    </template>

    <el-form-item v-if="submit || reset">
      <el-button @click="handleSubmit" v-if="submit">
        {{ $attrs.submitContext || "搜索" }}
      </el-button>
      <el-button @click="handleReset" v-if="reset">{{ $attrs.resetContext || "重置" }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { basic } from "./basic"
import { proxyProp } from "util/proxyProp"
import { findComponentUpwardByProp } from "util/findComponents"
const form = Symbol("form") //保证每个实例有独一无二的标志位
export default {
  name: "base-form",
  props: {
    submit: {
      type: Boolean,
      default: true,
    },
    reset: {
      type: Boolean,
      default: true,
    },
    formItems: {
      type: Array,
      required: true,
    },
    //接口函数
    api: {
      type: Function,
      required: true,
    },
    //传入mergeForm允许父组件修改内部Model对象
    //@/views/example/
    mergeForm: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    console.log("[@/comp/BaseForm:created]",this, this.formItems)
  },
  data: () => ({
    Model: {},
    form,
    originModel: {},
  }),
  computed: {
    //根据formItem计算出实际需要让页面渲染的真正的_formItem数据
    _formItems() {
      let _formItems = []
      _formItems = this.formItems.map(item =>
        //合并basic和控件 的attr
        this.computeFormItem(item, this.Model)
      )
      return _formItems
    },
    showMessage() {
      return !!this.$attrs["show-message"]
    },
    statusIcon() {
      return !!this.$attrs["status-icon"]
    },
    inline() {
      return !!this.$attrs.inline
    },
  },
  watch: {
    formItems: {
      handler() {
        this.formItems.forEach(formItem => {
          if (!formItem.attrs || !formItem.attrs.key) return
          //给表单的Model 添加组件attr
          // 添加属性, 需要$set
          this.$set(this.Model, formItem.attrs.key, formItem.attrs.value != undefined ? formItem.attrs.value : "")
        })

        //保存初始Model
        this.originModel = JSON.parse(JSON.stringify(this.Model))
      },
      deep: true,
      immediate: true,
    },
    mergeForm: {
      handler() {
        this.mergeModel()
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    // 对mergeForm响应式处理
    let parentComponent = findComponentUpwardByProp(this, "mergeForm")
    if (parentComponent) {
      parentComponent.mergeForm = proxyProp(parentComponent.mergeForm)
    } else {
      throw new Error("can not find parentComponent")
    }
    //mounted钩子中formItems是空数组,所以不在mounted里面操作formItems
  },
  methods: {
    computeFormItem(formItem, Model) {
      const item = { ...formItem }
      //表单控件
      let tag = item.tag || "input"
      //basic控件
      let basicItem = basic[tag]
      //控件tag
      item.tag = basicItem.component
      //控件attr, basic为父级, 控件为子
      item.attrs = Object.assign({}, basicItem.attrs, item.attrs)
      //控件动态attr 表单联动
      if (item.getAttrs) {
        item.attrs = Object.assign(item.attrs, item.getAttrs(Model))
      }
      //条件渲染
      item._ifRender = item.ifRender ? item.ifRender(Model) : true
      // 防止表单提交时存在多余 key
      // 不渲染的控件attr要删除
      if (!item._ifRender) {
        delete Model[item.attrs.key]
      }
      //form-item配置
      return item
    },
    mergeModel() {
      //合并Model
      Object.assign(this.Model, this.mergeForm)
    },
    //提交按钮
    handleSubmit() {
      // 表单请求
      this.$refs[form].validate(async valid => {
        if (valid) {
          let res = await this.api(this.Model)
          //@/views/example/
          this.$emit("after-submit", res)
        }
      })
    },
    handleReset() {
      this.Model = JSON.parse(JSON.stringify(this.originModel))
    },
  },
}
</script>

<style></style>
