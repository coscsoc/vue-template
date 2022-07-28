export const columns = [
  {
    attrs: {
      prop: "dataType",
      label: "测试1",
      width: "200",
      // 数据预处理
      formatter: (row, column, cellValue) => {
        //cellValue: 即dataType的值
        let options = [
          { key: "1", name: "医保目录" },
          { key: "2", name: "医院目录" },
          { key: "3", name: "医保-医院映射" },
        ]
        return options.find(option => option.key === cellValue) && options.find(option => option.key === cellValue).name
      },

    },
  },
  {
    attrs: {
      prop: "infoType",
      label: "测试2",
      width: "200",
      formatter: (row, column, cellValue) => {
        let options = [
          { key: "1", name: "医疗目录" },
          { key: "2", name: "疾病目录" },
          { key: "3", name: "手术目录" },
        ]
        return options.find(option => option.key === cellValue) && options.find(option => option.key === cellValue).name
      },
    },
  },
  {
    attrs: {
      prop: "requestTime",
      label: "测试4",
      width: "80",
    },
  },
  {
    // 插槽部分
    slot: "testSlot",
    uncommonColumn: true,
    attrs: { prop: "testSlot", label: "测试插槽" },
  },
  {
    // 图标部分
    uncommonColumn: true,
    attrs: { prop: "operation", label: "测试icon" },
    width: "200",
    operations: [
      {
        name: "chart",
        svgName: "chart",
        className: "icon",
        event: "click",
        callback(params) {
          console.log("[@/views/column:operations]", params)
        },
      },
      {
        svgName: "biscuits",
        className: "icon",
        event: "click",
      },
    ],
  },
  {
    uncommonColumn: true,
    attr: "testSlot",
    attrs: { prop: "uncommon-other", label: "测试other" },
    width: 50,
  },
]
