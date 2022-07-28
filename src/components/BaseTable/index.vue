<!--需要使用组件实例ref属性只能在父组件定义ref属性，使用this.$refs.<父组件ref属性名>.$children[0]获取-->
<template>
  <el-table
    :data="data"
    v-bind="$attrs"
    v-on="$listeners"
    :stripe="stripe"
    class="base-table"
    :empty-text="emptyText"
  >
    <!--插不进去, 应该是只接受template中的-->
      <!--  <slot name="font" /> -->

    <template v-for="(column, index) in columns">
      <!--common列表-->
      <!--@/views/example里会改变column.hidden-->
      <el-table-column
        :key="index"
        v-bind="column.attrs || {}"
        v-if="isCommonTableColumn(column) && !column.hidden"
      >
      </el-table-column>

      <!--uncommon列表-->
      <el-table-column
        v-else-if="!column.hidden"
        :key="index"
        v-bind="column.attrs || {}"
      >
        <!--el-table-column标签内的slot-->
        <!--el-table-column  Scoped Slot(row,column,$index)-->
        <template v-slot="scope">
          <span v-if="column.slot">
            <slot :name="column.slot" :xxxScope="scope" />
          </span>
          <!--操作图标-->
          <div v-else-if="column.operations">
            <template v-for="operation in column.operations">
              <el-tooltip
                v-if="operation.name"
                :key="operation.svgName"
                effect="light"
                placement="top-end"
                :content="operation.name"
              >
                <base-icon
                  :name="operation.svgName"
                  :class="[column.attrs.className, operation.className]"
                  @click="handleOperation(operation.event, scope.row, column)"
                ></base-icon>
              </el-tooltip>

              <base-icon
                v-else
                :key="operation.svgName"
                :class="[column.attrs.className, operation.className]"
                :name="operation.svgName"
                @click="handleOperation(operation.event, scope.row, column)"
              >
              </base-icon>
            </template>
          </div>
          <!--uncommon-other-->
          <span v-else>{{ scope.row[column.attr] }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import { proxyProp } from "util/proxyProp";
import { findComponentUpwardByProp } from "util/findComponents";

export default {
  name: "base-table",
  props: {
    columns: { type: Array, required: true },
    data: { type: Array, required: true },
  },
  computed: {
    emptyText() {
      return this.$attrs["empty-text"] || "没有符合条件的数据";
    },
    stripe() {
      return !!this.$attrs.stripe; //斑马纹
    },
  },
  mounted() {
    //console.log(this.$slots);
    let parentComponent = findComponentUpwardByProp(this, "columns");
    if (parentComponent) {
      parentComponent.columns = parentComponent.columns.map((column) =>
        proxyProp(column)
      )
    } else {
      throw new Error("can not find parentComponent");
    }
  },
  methods: {
    // 是否是一个常规的table-column(有以下标签就不是常规table-column)
    isCommonTableColumn(column) {
      const specialColumnList = ["uncommonColumn"];
      return !specialColumnList.some((option) => column[option]);
    },
    //
    handleOperation(event, row, column) {
      this.$emit(event, row, column);
      column.callback && column.callback(row);
    },
  },
};
</script>

<style>
</style>