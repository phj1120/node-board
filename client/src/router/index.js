import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Join from "../views/Join.vue";
import BoardList from "../views/board/list.vue";
import BoardWrite from "../views/board/write.vue";
import BoardItem from "../views/board/item.vue";
import BoardModify from "../views/board/modify.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/join",
    // component: () => import('../views/Join.vue')
    component: Join,
  },
  {
    path: "/board",
    component: BoardList,
  },
  {
    path: "/board/write",
    component: BoardWrite,
  },
  {
    path: "/board/item/:bno",
    component: BoardItem,
  },
  {
    path: "/board/modify/:bno",
    component: BoardModify,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
