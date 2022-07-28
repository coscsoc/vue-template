export const formItems = [
  {
    tag: "input",
    itemAttrs: { label: "姓名" },
    attrs: { key: "name", value: "1123", placeholder: "请输入姓名" },
    //动态attrs // 表单联动
    getAttrs(Model) {
      return Model.age === "25" ? { disabled: true } : null
    },
  },
  {
    tag: "input",
    itemAttrs: {
      label: "年龄(如果为25锁定姓名)",
      // 验证
      rules: [
        {
          required: true,
          trigger: "blur",
          validator: (rule, value, callback) => {
            value = value?.trim()
            if (!value) return callback(new Error("年龄不能为空"))
            setTimeout(() => {
              if (!Number.isInteger(value)) callback(new Error("请输入数字值"))
              else {
                if (value < 18) callback(new Error("必须年满18岁"))
                else callback()
              }
            }, 1000)
          },
        },
      ],
    },
    attrs: { key: "age", placeholder: "请输入年龄", maxlength: "3", "show-word-limit": true },
    //是否渲染
    ifRender(Model) {
      return Model.hobby === "4"
    },
  },
  {
    tag: "select",
    itemAttrs: { label: "兴趣" },
    attrs: {
      key: "hobby",
      value: "2",
      placeholder: "请输入兴趣",
      // el-select / el-
      options: [
        { value: "1", label: "吃饭" },
        { value: "2", label: "睡觉" },
        { value: "3", label: "打豆豆" },
        { value: "4", label: "显示年龄(隐藏)" },
      ],
    },
  },
  {
    tag: "date",
    itemAttrs: { label: "日期" },
    attrs: { key: "date", value: new Date().toLocaleDateString() },
    ifRender(Model) {
      let today = new Date().toLocaleDateString()
      let [year, month, date] = today.split("/")
      return (Model.date = Model.age === "24" ? `${year - 24}/${month}/${date}` : today)
    },
  },
  {
    tag: "radio",
    itemAttrs: { label: "单选框" },
    attrs: {
      value: "1",
      key: "sexRadio",
      options: [
        { value: "1", label: "男" },
        { value: "2", label: "女" },
      ],
    },
  },
  {
    tag: "radio",
    itemAttrs: { label: "调用后端接口-单选框" },
    attrs: {
      value: "1",
      key: "asyncRadio",
      options: [],
    },
    listeners: {
      change(...arg) {
        //console.log(...arg)
      },
    },
  },
  {
    tag: "checkbox-group",
    itemAttrs: { label: "复选框组" },
    attrs: {
      value: ["1"],
      key: "checkboxGroup",
      options: [
        { value: "1", label: "复选框1" },
        { value: "2", label: "复选框2" },
        { value: "3", label: "复选框3" },
      ],
    },
  },
  {
    tag: "cascader",
    itemAttrs: { label: "级联选择器" },
    attrs: {
      key: "cascader",
      value: [],
      options: [],
    },
  },
  {
    tag: "checkbox",
    itemAttrs: { label: "单复选框" },
    attrs: { key: "checkbox", value: true, label: "单复选框" },
  },
  {
    slot: "slotCheckBox",
    itemAttrs: { label: "插槽复选框" },
    attrs: { key: "slotCheckBox", value: false },
  },
  {
    tag: "textarea",
    itemAttrs: { label: "文本框" },
    attrs: { key: "textarea" },
    
  },
]
