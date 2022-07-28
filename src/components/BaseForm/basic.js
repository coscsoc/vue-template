//basic控件, 通用表单配置项(  一些重复属性)
export const basic = {
  input: {
    component: "el-input",
    attrs: {
      placeholder: "请输入",
      clearable: true,
    },
  },
  select: {
    component: "base-select", //自定义组件,为了在el-select添加options能够生成el-options节点
    attrs: {
      placeholder: "请选择",
      clearable: true, // 可清除
    },
  },
  date: {
    component: "el-date-picker",
    attrs: {
      placeholder: "选择日期",
      clearable: true,
      type: "date",
      format: "yyyy/MM/dd",
      ["value-format"]: "yyyy/MM/dd",
    },
  },
  radio: {
    component: "base-radio-group",
    value: [],
    attrs: {
      placeholder: "选择",
      clearable: true,
    },
  },
  checkbox: {
    component: "el-checkbox",
  },
  "checkbox-group": {
    component: "base-checkbox-group",
  },
  cascader: {
    //级联选择器
    component: "el-cascader",
    attrs: {
      placeholder: "请选择",
      clearable: true,
    },
  },
  textarea: {
    component: "el-input",
    attrs: {
      type: "textarea",
    },
  },
}
