<template>
  <el-radio-group v-bind="$attrs" :value="value" v-on="$listeners">
    <el-radio
      v-for="item in $attrs.options"
      :key="item.value"
      :label="item.value"
      @change="handleChange"
    >
      {{ item.label }}</el-radio
    >
  </el-radio-group>
</template>

<script>
export default {
  name: "base-radio-group",
  props: {
    value: {
      default: "",
    },
  },
  data: () => ({}),
  methods: {
    handleChange(...args) {
      this.$emit("change", ...args, this.$attrs);
      //console.log(`[@/comp/BaseRadioGroup:handleChange]`);
    },
  },
};
</script>

<style>
</style>