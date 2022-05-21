import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Users from "@/views/Users.vue";
import Instruments from "@/views/Instruments.vue";
import Incidents from "@/views/Incidents.vue";
import Returns from "@/views/Returns.vue";
import ReturnApprovals from "@/views/ReturnApprovals.vue";
import Notices from "@/views/Notices.vue";
import NoticesAdmin from "@/views/NoticesAdmin.vue";
import Rents from "@/views/Rents.vue";
import Billing from "@/views/Billing.vue";
import VirtualReality from "@/views/VirtualReality.vue";
import Profile from "@/views/Profile.vue";
import Rtl from "@/views/Rtl.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/instrument",
    name: "Instruments",
    component: Instruments,
  },
  {
    path: "/incident",
    name: "Incidents",
    component: Incidents,
  },
  {
    path: "/return",
    name: "Returns",
    component: Returns,
  },
  {
    path: "/returnApproval",
    name: "ReturnApprovals",
    component: ReturnApprovals,
  },
  {
    path: "/notice",
    name: "Notices",
    component: Notices,
  },
  {
    path: "/noticeAdmin",
    name: "NoticesAdmin",
    component: NoticesAdmin,
  },
  {
    path: "/rent",
    name: "Rents",
    component: Rents,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/rtl-page",
    name: "Rtl",
    component: Rtl,
  },
  {
    path: "/signin",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
