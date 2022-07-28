<el-form
  class="base-form"  
  :bind="$attrs"    
  :model="Model"    //	表单数据对象
  :ref="form"       // vm.$refs.form 指向组件实例
  :api="api"
  :show-message="showMessage"  // 是否显示校验错误信息
  :status-icon="statusIcon"    // 是否在输入框中显示校验结果反馈图标
  :inline="inline"    // 行内表单模式, 可以一行显示
>
  <el-form-item
    :key="index + item.attrs.key"
    :class="item.itemAttrs.className"
    v-if="item._ifRender"
    v-bind="item.itemAttrs || {}"
    :prop="item.attrs.key"
  >
    //prop, 为el-form-item的校验字段
    //v-bind:itemAttrs, 传给el-form-item的所有属性
    //在父级操作Model就需要 mergeForm
    //xxx是传给父级的 插槽内容 {xxx:Model}
    //父级v-slot:slotName="xxx"  xxx={xxx:Model}
    <slot v-if="item.slot" :name="item.slot" :xxx="Model" />
    //is动态组件, 根据tag生成
    //v-bind:item.attrs, 传给item.tag的所有属性
    <component
      :is="item.tag"
      :class="item.itemAttr.className"
      v-model="Model[item.attrs.key]"
      v-bind="item.attrs || {}"
      v-on="item.listeners || {}"
    />
  </el-form-item>

</el-form>