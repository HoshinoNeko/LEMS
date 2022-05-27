/**
=========================================================
* Vue Soft UI Dashboard - v2.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-soft-ui-dashboard
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SoftUIDashboard from "./soft-ui-dashboard";
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
require('./assets/css/tr.css')
const appInstance = createApp(App);

appInstance.use(store)
appInstance.use(VueAxios, axios);
appInstance.use(router);
appInstance.use(SoftUIDashboard);
appInstance.use(Antd);
appInstance.mount("#app");
