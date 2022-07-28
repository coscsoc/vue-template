<script>
function throttle(fn, delay) {
  let timer;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      clearTimeout(timer);
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

export default {
  name: "base-throttle",
  functional: true,
  props: {
    duration: {
      type: Number,
      default: 1000,
    },
  },
  render(h, context) {
    //context.$slots.default也行, 但是官方是下面这种
    let vnodeList = context.slots().default; //el-button
    vnodeList.forEach((vnode) => {
      // { Ctor, propsData, listeners, tag, children }
      let listeners =
        vnode.componentOptions && vnode.componentOptions.listeners;
      if (listeners) {
        Object.keys(listeners).forEach((event) => {
          listeners[event] = throttle(listeners[event], context.props.duration);
        });
      }
    });
    return vnodeList;
  },
};
</script>
