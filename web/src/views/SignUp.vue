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
          <h1 class="mt-5 mb-2 text-white">Welcome!</h1>
          <p class="text-white text-lead">
            Use your StudentID, Name, Email and password
            to create an acoount.
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
            <h5>Register</h5>
            <h6 class="text-info">You need your email and password to login after</h6>
          </div>
          <div class="card-body">
            <form role="form" action="http://localhost:4000/api/user/signup" method="post">
              <div class="mb-3">
                <vsud-input
                  id="name"
                  type="text"
                  placeholder="Student Name"
                  name="name"
                  aria-label="Name"
                />
              </div>
              <div class="mb-3">
                <vsud-input
                    id="s_id"
                    type="text"
                    placeholder="Student ID"
                    name="s_id"
                    aria-label="S_id"
                />
              </div>
              <div class="mb-3">
                <vsud-input
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  aria-label="Email"
                />
              </div>
              <div class="mb-3">
                <vsud-input
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  aria-label="Password"
                />
              </div>

              <div class="text-center">
                <vsud-button
                  color="dark"
                  full-width
                  variant="gradient"
                  class="my-4 mb-2"
                  >Sign up</vsud-button
                >
              </div>
              <p class="text-sm mt-3 mb-0">
                Already have an account?
                <router-link
                  :to="{ name: 'Sign In' }"
                  class="text-dark font-weight-bolder"
                >
                  Sign in
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

import { mapMutations } from "vuex";

export default {
  name: "SignupBasic",
  components: {
    Navbar,
    AppFooter,
    VsudInput,
    VsudButton,
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
  },
};
</script>
