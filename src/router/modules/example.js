import Layout from "@/views/layout"

export default {
  sort: 1,
  path: "/example",
  component: Layout,
  meta: {
    title: "example",
  },
  children: [
    {
      path: "index", //  /example/index
      component: () => import("@/views/example"),
      name: "example-index",
      meta: { title: "index" },
    },
    {
      path: "/home/:id",
      name: "home",
      component: () => import("@/views/example/home.vue"),
      meta: { title: "首页params" },
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/example/home.vue"),
      meta: { title: "首页query" },
    },
  ],
}
