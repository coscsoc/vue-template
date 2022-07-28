<template>
  <div>
    <div>{{ $route.params }}</div>
    <div>{{ $route.query }}</div>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.params)
    console.log(this.$route.query)
  },
}
</script>

<style></style>
