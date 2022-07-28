import store from "@/store"

const DEFAULT_TIME = 3000

function _debounce(fn, time) {
  let timer
  return function (...args) {
    // 这里有点问题, 第二次触发后time变为默认time了
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time)
  }
}

export const debounce = {
  /*
        bind只调用一次, 第一次绑定到元素时调用
        inserted el插入父节点时调用
        update所在组件的vnode更新时调用

        v-debounce:click.1000="handleToggleTableHeader"
        binding:{
            name:指令名, 不包括v-   //debounce
            value: 绑定的值         //handleToggleTableHeader
            modifiers: 修饰符的对象  //{1000:true}
            arg:传给指令的参数      //click
        }
    */
  bind(el, { arg, modifiers, value }, vnode) {
    //vnode.data.hook只有组件才有的钩子函数
    const isComponent = !!vnode.child
    const duration = Number(Object.keys(modifiers)[0]) || DEFAULT_TIME

    if (isComponent) {
      vnode.child.$on(arg, _debounce(value, duration))
    } else {
      el.addEventListener(arg, _debounce(value, duration))
    }
  },
}

function checkPermission(el, { value }) {
  const roles = store.getters?.roles
  if (value && !Array.isArray(value)) value = [value]

  //el.parentNode && el.parentNode.removeChild(el)
  if (value.length > 0) {
    const hasPermission = roles.some(role => value.includes(role))

    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}

export const permission = {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  },
}
