<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          is-blur="blur blur-rounded my-3 py-2 start-0 end-0 mx-4 shadow"
          btn-background="bg-gradient-success"
          :dark-mode="true"
        />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-success text-gradient">
                    欢迎回来
                  </h3>
                  <p class="mb-0">使用你的 ID 和密码登录</p>
                </div>
                <div class="card-body">
                  <form class="text-start" action="">
                    <label>内部 ID</label>
                    <vsud-input
                      id="sid"
                      type="number"
                      placeholder="Internal ID"
                      name="sid"
                      v-model="form.sid"
                    />
                    <label>密码</label>
                    <vsud-input
                      id="password"
                      type="password"
                      v-model="form.password"
                      placeholder="Password"
                      name="password"
                    />
                    <div class="text-center">
                      <vsud-button
                        class="my-4 mb-2"
                        variant="gradient"
                        color="success"
                        full-width
                        type="button"
                        @Click="login()"
                        >登录
                      </vsud-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    还没有账户?
                    <router-link
                      :to="{ name: 'Sign Up' }"
                      class="text-success text-gradient font-weight-bold"
                      >注册</router-link
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8"
              >
                <div
                  class="bg-cover oblique-image position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    backgroundImage:
                      'url(' +
                      require('@/assets/img/curved-images/curved9.jpg') +
                      ')',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <app-footer />
</template>

<script>


import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import VsudInput from "@/components/VsudInput.vue";
import VsudButton from "@/components/VsudButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";
import axios from "axios";
import { message } from 'ant-design-vue';

export default {
  name: "SignIn",
  components: {
    Navbar,
    AppFooter,
    VsudInput,
    VsudButton,
  },
  data() {
    return {
      form: {
        sid: "",
        password: "",
      }
    };
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    login() {
      let s_id = document.getElementById("sid").value;
      let password = document.getElementById("password").value;
      if (!s_id) {
        message.warning("未输入内部ID")
        return message.warning("未输入内部ID")
      } else if (!password) {
        message.warning("未输入密码")
        return message.warning("未输入密码")
      }
      console.log(s_id, password)
      const url = "http://localhost:4000/api/user/login";
      try {
        axios.post(url, `s_id=${s_id}&password=${password}`).then(response => {
          if (response.data.status === 0) {
            this.$store.commit("setUser", response.data);
            this.$store.commit("token", response.data.token);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data));
            message.success(response.data.message)
            message.success(response.data.message)
            this.$router.push({ name: "Notices" });
          } else {
            message.error(response.data.message)
            message.error(response.data.message)
          }
        });
      } catch (error) {
        console.log(error);
        alert("Unknown error")
      }
    },
  },
};
</script>
