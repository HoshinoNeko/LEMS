<template>
  <navbar btn-background="bg-gradient-primary" />
  <div
    class="pt-5 m-3 page-header align-items-start min-vh-50 pb-11 border-radius-lg"
    :style="{
      backgroundImage:
        'url(' + require('@/assets/img/curved-images/curved6.jpg') + ')',
    }"
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container">
      <div class="row justify-content-center">
        <div class="mx-auto text-center col-lg-5">
          <h1 class="mt-5 mb-2 text-white">欢迎!</h1>
          <p class="text-white text-lead">
            创建一个账户，享受便捷服务
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
      <div class="mx-auto col-xl-4 col-lg-5 col-md-7">
        <div class="card z-index-0">
          <div class="pt-4 text-center card-header">
            <h5>注册</h5>
            <h6 class="text-info">您日后需要使用内部 ID 和密码进行登录操作</h6>
          </div>
          <div class="card-body">
            <form role="form">
              <div class="mb-3">
                <vsud-input
                  id="name"
                  type="text"
                  placeholder="用户姓名"
                  name="name"
                  aria-label="Name"
                />
              </div>
              <div class="mb-3">
                <vsud-input
                    id="s_id"
                    type="number"
                    placeholder="内部 ID"
                    name="s_id"
                    aria-label="S_id"
                />
              </div>
              <div class="mb-3">
                <vsud-input
                  id="email"
                  type="email"
                  placeholder="电子邮箱"
                  name="email"
                  aria-label="Email"
                />
              </div>
              <div class="mb-3">
                <vsud-input
                  id="password"
                  type="password"
                  placeholder="一个安全的密码"
                  name="password"
                  aria-label="Password"
                />
              </div>
              <vsud-checkbox
                  id="checkbox"
                  name="flexCheckDefault"
                  class="font-weight-light"
                  checked
              >
                我已阅读，并同意
                <a href="javascript:;" class="text-dark font-weight-bolder"
                >系统服务条款与隐私政策</a
                >
              </vsud-checkbox>
              <div class="text-center">
                <vsud-button
                  color="dark"
                  full-width
                  variant="gradient"
                  class="my-4 mb-2"
                  type="button"
                  @Click="signup()"
                  >注册</vsud-button
                >
              </div>
              <p class="text-sm mt-3 mb-0">
                已经有一个账户?
                <router-link
                  :to="{ name: 'Sign In' }"
                  class="text-dark font-weight-bolder"
                >
                  点击登录
                </router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <app-footer />
</template>

<script>
import Navbar from "@/examples/PageLayout/Navbar.vue";
import AppFooter from "@/examples/PageLayout/Footer.vue";
import VsudInput from "@/components/VsudInput.vue";
import VsudButton from "@/components/VsudButton.vue";
import VsudCheckbox from "@/components/VsudCheckbox.vue";

import { mapMutations } from "vuex";
import axios from "axios";
import { message } from 'ant-design-vue';
export default {
  name: "SignupBasic",
  components: {
    Navbar,
    AppFooter,
    VsudInput,
    VsudButton,
    VsudCheckbox,
  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    signup() {
      let s_id = document.getElementById("s_id").value;
      let password = document.getElementById("password").value;
      let email = document.getElementById("email").value;
      let name = document.getElementById("name").value;
      let checkbox_value = document.getElementById("checkbox").checked;
      if (!s_id || !password || !email || !name) {
        message.warning("请确保四个参数都已输入再提交:)")
        return message.warning("请确保四个参数都已输入再提交:)")
      } else if ( !checkbox_value ) {
        message.warning("您需要勾选同意我们的服务条款:)")
        return message.warning("您需要勾选同意我们的服务条款:)")
      }
      const url = "http://localhost:4000/api/user/signup";
      try {
        const req = axios.post(url, `s_id=${s_id}&password=${password}&email=${email}&name=${name}`).then(response => {
          console.log(req + response.data);
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
            return message.error(response.data.message)
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>
