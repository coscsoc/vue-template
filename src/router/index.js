import Vue from "vue"
import VueRouter from "vue-router"
import configRoutes from "./modules"

Vue.use(VueRouter)

const commonRoutes = [
  {
    path: "/",
    name: "index",
    redirect: "/example/index",
  },
  {
    path: "/404",
    component: () => import("@/views/notFound"),
  },
  { path: "*", redirect: "/404" },
]

const router = new VueRouter({
  routes: [...configRoutes, ...commonRoutes],
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || "vue模板"
  next()
})

export default router