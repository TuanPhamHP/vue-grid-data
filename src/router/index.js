import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/column-filters",
    name: "ColumnFilters",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ColumnFilters.vue"),
  },
  {
    path: "/column-filters-supress",
    name: "ColumnFiltersWithSupress",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/ColumnFiltersWithSupress.vue"
      ),
  },
  {
    path: "/column-filters-sidebar",
    name: "ColumnFiltersWithSidebar",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/ColumnFiltersWithSidebar.vue"
      ),
  },
  {
    path: "/column-filters-sidebar-single",
    name: "ColumnFiltersWithSidebarSingle",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/ColumnFiltersWithSidebarSingle.vue"
      ),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
