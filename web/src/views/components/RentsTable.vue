<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>设备借用</h6>
      <div class="alert alert-info" role="alert" style="color: white;">
        设备采购和运营需要资源，请珍惜设备:)
      </div>
      <div class="alert alert-light" role="alert">
        为了其他人的权益，请按时归还设备。
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                设备名称 / ID
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                设备类型
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                设备保管位置
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                设备说明
              </th>
              <th class="text-secondary opacity-7"></th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="l in instruments" v-bind:key="l.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm"> {{ l.name }} </h6>
                    <p class="text-xs text-secondary mb-0">
                      No.{{ l.id }}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{l.symbol}}</p>
              </td>

              <td>
                <p class="text-xs font-weight-bold mb-0">{{l.location}}</p>
              </td>
              <td class="align-middle text-center text-sm" v-if="isUrl(l.instruction)">
                <p class="text-xs font-weight-bold mb-0"><a style="color: deepskyblue;" target="_blank" :href=l.instruction ><img style="width: 15%;" src="https://img.icons8.com/ios-glyphs/60/link--v1.png" alt="LINK"></a></p>
              </td>
              <td class="align-middle text-center text-sm" v-else>
                <p class="text-xs font-weight-bold mb-0">{{l.instruction}}</p>
              </td>
              <td class="align-middle text-center">
                <a-button type="primary" @click="showEdit(l.id)">申请借用</a-button>
              </td>
            </tr>
          </tbody>
          <a-modal
              class="text-secondary font-weight-bold text-xs"
              v-model:visible="editvisible"
              title="设备借用"
              ok-text="提交"
              cancel-text="取消"
              @ok="hideEdit()"
          >
            <a-form-item class="ant-form ant-form-vertical">
              <span class="form-label-text" style="display: block;">借用时长(按天)</span>
              <a-textarea
                  type="number"
                  id="editduration"
                  placeholder="7"
                  class="ant-col ant-form-item-control"
                  style="width: 100%;"
              />
              <span class="form-label-text" style="display: block;">借用说明</span>
              <a-textarea
                  type="text"
                  id="editremark"
                  class="form-input textarea"
                  style="width: 100%;"
                  placeholder="Remark"
              />
            </a-form-item>
          </a-modal>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
//import VsudBadge from "@/components/VsudBadge.vue";
import img1 from "../../assets/img/team-2.jpg";
import img2 from "../../assets/img/team-3.jpg";
import img3 from "../../assets/img/team-4.jpg";
import img4 from "../../assets/img/team-3.jpg";
import img5 from "../../assets/img/team-2.jpg";
import img6 from "../../assets/img/team-4.jpg";
import { message } from 'ant-design-vue';
import axios from "axios";
import {ref} from "vue";
import Modal from 'ant-design-vue';

export default {
  name: "rents-table",
  data() {
    return {
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      instruments: [],
    };
  },
  created() {
    this.load()
  },
  components: {
    //VsudBadge,
  },
  setup() {
    const visible = ref(false);
    const cancel = e => {
      console.log(e);
      message.error('Click on No');
    };
    const showModal = () => {
      visible.value = true;
    };

    const hideModal = () => {
      const url = "http://localhost:4000/api/instrument/add";
      const token = localStorage.getItem("token");
      const addname = document.getElementById("addName").value;
      const addsymbol = document.getElementById("addSymbol").value;
      const addlocation = document.getElementById("addLocation").value;
      const addinstruction = document.getElementById("addInstruction").value;
      const addenable = document.getElementById("addEnable").value;
      const addremark = document.getElementById("addRemark").value;

      axios.post(url, `name=${addname}&symbol=${addsymbol}&location=${addlocation}&instruction=${addinstruction}&enable=${addenable}&remark=${addremark}`, {
        headers: {
          Authorization: `${token}`
        }
      }).then(res => {
        if (res.message.status === 0) {
          message.success(res.data.msg);
          this.load();
        } else {
          message.error(res.data.msg);
        }
      });
      visible.value = false;
    };

    const confirm = () => {
      Modal.confirm({
        title: 'New User',
        content: 'Bla bla ...',
        okText: '确认',
        cancelText: '取消',
      });
    }
    const editvisible = ref(false);

    const showEdit = (id) => {
      editvisible.value = true;
      sessionStorage.setItem('instrument_id', id);
    };

    const hideEdit = () => {
      let editiid = sessionStorage.getItem('instrument_id')
      const userinfo = localStorage.getItem("user");
      const adduid = JSON.parse(userinfo).id;
      const token = localStorage.getItem("token");
      const editduration = document.getElementById("editduration").value;
      const editremark = document.getElementById("editremark").value;
      console.log(`id=${adduid}&iid=${editiid}&duration=${editduration}&remark=${editremark}`)
      axios.post(`http://localhost:4000/api/rent/newRent`, `id=${adduid}&iid=${editiid}&duration=${editduration}&remark=${editremark}`, {
        headers: {
          Authorization: `${token}`
        }
      }).then(res => {
        if (res.data.status === 0) {
          message.success(res.data.message);
          editvisible.value = false;
        } else {
          message.error(res.data.message);
        }
      });
    };

    const editconfirm = () => {
      Modal.editconfirm({
        title: 'editconfirm',
        content: 'Bla bla ...',
        okText: '确认',
        cancelText: '取消',
      });
    };
    return {
      cancel,
      visible,
      showModal,
      hideModal,
      confirm,
      editvisible,
      showEdit,
      hideEdit,
      editconfirm,
    };
  },
  methods: {
    deleteUser(id) {
      const token = localStorage.getItem("token");
      axios.delete(`http://localhost:4000/api/instrument/${id}/delInstrument`, {
        headers: {
          Authorization: `${token}`
        }
      }).then(res => {
        if (res.data.status === 0) {
          message.success(res.data.message);
          this.load();
        } else {
          message.error(res.data.message);
        }
      });
    },
    statusCheck(status) {
      if (status === 1) {
        return "Disabled";
      } else {
        return "Enabled";
      }
    },
    statusCheckClass(status) {
      if (status === 0) {
        return "success";
      } else {
        return "danger";
      }
    },
    roleCheckClass(role) {
      if (role > 1) {
        return "Admin";
      } else {
        return "user";
      }
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
    isUrl(urlop) {
      return urlop.startsWith("http");
    },
    load() {
      const url = "http://localhost:4000/api/instrument/getAvailable";
      const token = localStorage.getItem("token");
      if (!token) {
        message.error('You are not login');
        this.$router.push({ name: "Sign In" });
      } else {
        axios
          .post(url, [], {
            headers: {
              Authorization: ` ${token}`
            }
          })
          .then(response => {
            this.instruments = response.data.instruments;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
