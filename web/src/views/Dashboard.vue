<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="系统用户数"
          :value=data.users
          :percentage="{
            value: '+505%',
            color: 'text-success',
          }"
          :icon="{
            component: 'ni ni-money-coins',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="系统内设备数"
          :value=data.devices
          :percentage="{
            value: '+3%',
            color: 'text-success',
          }"
          :icon="{
            component: ' ni ni-world',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
        <mini-statistics-card
          title="今日新增借用"
          :value=data.rentstoday
          :percentage="{
            value: '-2%',
            color: 'text-danger',
          }"
          :icon="{
            component: 'ni ni-paper-diploma',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
      <div class="col-xl-3 col-sm-6 mb-xl-0">
        <mini-statistics-card
          title="今日新增归还申请"
          :value=data.returnstoday
          :percentage="{
            value: '+5%',
            color: 'text-success',
          }"
          :icon="{
            component: 'ni ni-cart',
            background: iconBackground,
          }"
          direction-reverse
        />
      </div>
    </div>
    <div class="mt-4 row">
      <div class="mb-4 col-lg-5 mb-lg-0">
        <div class="card z-index-2">
          <div class="p-3 card-body">
            <reports-bar-chart
              id="chart-bar"
              title="统计信息"
              :chart="{
                labels: [
                  '总用户数',
                  '总设备数',
                  '今日新增借用',
                  '今日新增归还',
                  '当前未处理归还申请',
                  '当前未处理故障',
                ],
                datasets: {
                  label: 'Sales',
                  data: [data.users, data.devices, data.rentstoday, data.returnstoday, data.awaitingreturns, data.awaitingincidents],
                },
              }"
              :items="[
                {
                  icon: {
                    color: 'primary',
                    component: faUsers,
                  },
                  label: '用户数',
                  progress: { content: data.users, percentage: 100 },
                },
                {
                  icon: { color: 'info', component: faHandPointer },
                  label: '设备数',
                  progress: { content: data.devices, percentage: 75 },
                },
                {
                  icon: { color: 'warning', component: faCreditCard },
                  label: '待处理归还',
                  progress: { content: data.awaitingreturns, percentage: 50 },
                },
                {
                  icon: { color: 'danger', component: faScrewdriverWrench },
                  label: '待处理报障',
                  progress: { content: data.awaitingincidents, percentage: 25 },
                },
              ]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import {
  faHandPointer,
  faUsers,
  faCreditCard,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import {message} from "ant-design-vue";
import axios from "axios";
export default {
  name: "dashboard-default",
  data() {
    return {
      data: [],
      iconBackground: "bg-gradient-success",
      faCreditCard,
      faScrewdriverWrench,
      faUsers,
      faHandPointer,
    };
  },
  components: {
    MiniStatisticsCard,
    ReportsBarChart,
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      const url = "http://localhost:4000/api/system/status"
      const token = localStorage.getItem("token");
      if (!token) {
        message.error('You are not login');
        this.$router.push({ name: "Sign In" });
      } else {
        axios
            .get(url, {
              headers: {
                Authorization: ` ${token}`
              }
            })
            .then(response => {
              this.data = response.data.data;
            })
            .catch(error => {
              console.log(error);
            });
      }
    },
  }
};
</script>
