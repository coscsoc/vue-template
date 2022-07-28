import Vue from "vue"

export function proxyProp(prop) {
  return new Proxy(prop, {
    set(target, key, value) {
      if (prop[key] != value) {
        let _set = Vue.set
        _set.call(Vue, prop, key, value)
        /* Vue.set(prop, key, value) */
      }
      return Reflect.set(target, key, value)
    },
  })
}
