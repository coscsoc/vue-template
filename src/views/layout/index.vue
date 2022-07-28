<template>
  <skeleton>
    <the-head></the-head>
    <router-view></router-view>
    <base-tree></base-tree>
  </skeleton>
</template>

<script>
import TheHead from "@/components/TheHead"
import Skeleton from "./skeleton.vue"
import BaseTree from "@/components/BaseTree"
export default {
  name: "layout",
  components: { TheHead, Skeleton, BaseTree },
}
</script>

<style>
@keyframes opacity {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
