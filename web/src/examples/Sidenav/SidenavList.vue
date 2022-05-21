<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse navText="Dashboard" :to="{ name: 'Dashboard' }">
          <template #icon>
            <shop />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse v-if="isAdmin()" navText="Users" :to="{ name: 'Users' }">
          <template #icon>
            <office />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse v-if="isAdmin()" navText="Intruments" :to="{ name: 'Instruments' }">
          <template #icon>
            <office />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Rents" :to="{ name: 'Rents' }">
          <template #icon>
            <office />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Inciednts" :to="{ name: 'Incidents' }">
          <template #icon>
            <office />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Returns" :to="{ name: 'Returns' }">
          <template #icon>
            <office />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse v-if="isAdmin()" navText="ReturnApprovals" :to="{ name: 'ReturnApprovals' }">
          <template #icon>
            <office />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="Announcement" :to="{ name: 'Notices' }">
          <template #icon>
            <office />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse v-if="isAdmin()" navText="Manage Announcement" :to="{ name: 'NoticesAdmin' }">
          <template #icon>
            <office />
          </template>
        </sidenav-collapse>
      </li>
<!--
      <li class="nav-item">
        <sidenav-collapse navText="Billing" :to="{ name: 'Billing' }">
          <template #icon>
            <credit-card />
          </template>
        </sidenav-collapse>
      </li>
-->
      <!--
      <li class="nav-item">
        <sidenav-collapse
          navText="Virtual Reality"
          :to="{ name: 'Virtual Reality' }"
        >
          <template #icon>
            <box3d />
          </template>
        </sidenav-collapse>
      </li>
      -->
      <!--
      <li class="nav-item">
        <sidenav-collapse navText="RTL" :to="{ name: 'Rtl' }">
          <template #icon>
            <settings />
          </template>
        </sidenav-collapse>
      </li>
      -->
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          PAGES
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-collapse v-if="isAdmin()" navText="Profile" :to="{ name: 'Profile' }">
          <template #icon>
            <customer-support />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse v-if="!isLogin()" navText="Sign In" :to="{ name: 'Sign In' }">
          <template #icon>
            <document />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse v-if="!isLogin()" navText="Sign Up" :to="{ name: 'Sign Up' }">
          <template #icon>
            <spaceship />
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse onclick="logout()" navText="Logout" :to="{ name: 'Sign In' }">
          <template #icon>
            <spaceship />
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>
  <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card
      :class="cardBg"
      textPrimary="Need Help?"
      textSecondary="Please contact us"
      route="mailto:help@somedomain.edu.cn"
      label="help@somedomain.edu.cn"
      icon="ni ni-diamond"
    />
  </div>
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";
import SidenavCard from "./SidenavCard.vue";
import Shop from "../../components/Icon/Shop.vue";
import Office from "../../components/Icon/Office.vue";
//import CreditCard from "../../components/Icon/CreditCard.vue";
//import Box3d from "../../components/Icon/Box3d.vue";
import CustomerSupport from "../../components/Icon/CustomerSupport.vue";
import Document from "../../components/Icon/Document.vue";
import Spaceship from "../../components/Icon/Spaceship.vue";
//import Settings from "../../components/Icon/Settings.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
    };
  },
  components: {
    SidenavCollapse,
    SidenavCard,
    Shop,
    Office,
//    CreditCard,
//    Box3d,
    CustomerSupport,
    Document,
    Spaceship,
//    Settings,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    isLogin() {
      return localStorage.getItem("user");
    },
    isAdmin() {
      let userInfo = localStorage.getItem("user")
      if (!userInfo) {
        console.log("Not logined")
        return false
      } else {
        let userRole = JSON.parse(userInfo).role
        console.log(JSON.parse(userInfo))
        console.log("role"+userRole)
        if ( userRole > 0) {
          console.log("Admin welcome")
          return true
        } else {
          console.log("Normal User")
        }
      }
    },
    logout() {
      localStorage.clear()
      this.$router.push({ name: "SignIn" });
    }
  },
};
</script>
