<script>
import evalDOM from "./evalDOM"
export default {
  name: "skeleton",
  abstract: true,

  render(h) {
    const slots = this.$slots.default
    this.$nextTick(() => {
      //evalDOM()
    })
    return h("div", {}, slots)
  },
}
</script>

<style></style>
