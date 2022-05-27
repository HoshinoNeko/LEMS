<template>
  <div class="container-fluid">
    <div
      class="mt-4 page-header min-height-300 border-radius-xl"
      :style="{
        backgroundImage:
          'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
        backgroundPositionY: '50%',
      }"
    >
      <span class="mask bg-gradient-success opacity-6"></span>
    </div>
    <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
      <div class="row gx-4">
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <img
              src="@/assets/img/bruce-mars.jpg"
              alt="profile_image"
              class="shadow-sm w-100 border-radius-lg"
            />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">{{ email }}</h5>
            <p class="mb-0 text-sm font-weight-bold"> {{reg_date}} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="py-4 container-fluid">
    <div class="mt-3 row">
      <div class="col-12 col-md-6 col-xl-4">
        <div class="card h-100">
          <div class="p-3 pb-0 card-header">
            <h6 class="mb-0">修改密码</h6>
          </div>
          <div class="p-3 card-body">
            <form class="text-start" action="">
              <label>源密码</label>
              <vsud-input
                  id="oldPW"
                  type="number"
                  placeholder="旧密码"
                  name="sid"
              />
              <label>新密码</label>
              <vsud-input
                  id="newPW"
                  type="password"
                  placeholder="新密码"
                  name="password"
              />
              <div class="text-center">
                <vsud-button
                    class="my-4 mb-2"
                    variant="gradient"
                    color="success"
                    full-width
                    type="button"
                    @Click="alterPW()"
                >登录
                </vsud-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sophie from "@/assets/img/kal-visuals-square.jpg";
import marie from "@/assets/img/marie.jpg";
import ivana from "@/assets/img/ivana-square.jpg";
import peterson from "@/assets/img/team-4.jpg";
import nick from "@/assets/img/team-3.jpg";
import img1 from "@/assets/img/home-decor-1.jpg";
import img2 from "@/assets/img/home-decor-2.jpg";
import img3 from "@/assets/img/home-decor-3.jpg";
import team1 from "@/assets/img/team-1.jpg";
import team2 from "@/assets/img/team-2.jpg";
import team3 from "@/assets/img/team-3.jpg";
import team4 from "@/assets/img/team-4.jpg";
import VsudInput from "@/components/VsudInput.vue";
import VsudButton from "@/components/VsudButton.vue";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import {message} from "ant-design-vue";
import axios from "axios";

export default {
  name: "ProfileOverview",
  components: {
    VsudInput,
    VsudButton,
  },
  data() {
    return {
      showMenu: false,
      sophie,
      marie,
      ivana,
      peterson,
      nick,
      img1,
      team1,
      team2,
      team3,
      team4,
      img2,
      img3,
      faFacebook,
      faTwitter,
      faInstagram,
      data: {
        email: "",
        reg_date:  "2022-01-01",
        id: 0,
      },
    };
  },
  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
  },
  created() {
    this.load()
    this.loadInfo()
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
  methods: {
    load() {
      this.$store.dispatch('loadUser', this.data)
    },
    alterPW() {
      let oldPW = document.getElementById("oldPW").value;
      let newPW = document.getElementById("newPW").value;
      if (!oldPW) {
        return message.warning("未输入旧密码")
      } else if (!newPW) {
        return message.warning("未输入新密码")
      }
      console.log(oldPW, newPW)
      const url = "http://localhost:4000/api/user/updatePW";
      const token = localStorage.getItem("token");
      try {
        axios.post(url, `oldPW=${oldPW}&newPW=${newPW}`, {
          headers: {
            Authorization: ` ${token}`
          }
        }).then(response => {
          if (response.data.status === 0) {
            message.success(response.data.message)
          } else {
            message.error(response.data.message)
          }
        });
      } catch (error) {
        console.log(error);
        alert("Unknown error")
      }
    },
    loadInfo() {
      let userInfo = localStorage.getItem("user")
      if (userInfo) {
        console.log("Not logined")
        this.email = JSON.parse(userInfo).email
        this.id = JSON.parse(userInfo).id
        this.reg_date = JSON.parse(userInfo).reg_date
      }
    },
  }
};
</script>
