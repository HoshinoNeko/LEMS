<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>归还处理</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                归还 / 设备 ID
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                申请用户
              </th>
              <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                设备名称
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                申请时间
              </th>
              <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                状态
              </th>
              <th class="text-secondary opacity-7"></th>
              <th class="text-secondary opacity-7"></th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="l in instruments" v-bind:key="l.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm"> 归还 ID: {{ l.id }} </h6>
                    <p class="text-xs text-secondary mb-0">
                      设备 ID: {{ l.i_id }}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{l.s_id}} / {{l.uname}}</p>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{l.iname}}</p>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{l.date}}</p>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  > {{ l.add_date }} </span
                >
              </td>
              <td class="align-middle text-center" v-if="l.done === 2">
                <span class="text-secondary text-xs font-weight-bold text-danger"
                >已被拒绝</span
                >
              </td>
              <td class="align-middle text-center" v-else>
                <span class="text-secondary text-xs font-weight-bold text-danger"
                ></span
                >
              </td>
              <td class="align-middle text-center">
                <a-popconfirm title="Agree?" @confirm="agree(l.id,l.i_id)" @cancel="cancel">
                  <a-button success size="sm" class="text-success">同意</a-button
                  ></a-popconfirm
                >
              </td>
              <td class="align-middle text-center" v-if="l.done === 1">
                <a-popconfirm title="Reject?" @confirm="reject(l.id)" @cancel="cancel">
                  <a-button danger size="sm" class="text-danger">拒绝</a-button
                ></a-popconfirm
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
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
  name: "return-approvals-table",
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
        if (res.data.success === 0) {
          message.success(res.data.msg);
          this.load();
        } else {
          message.error(res.data.msg);
        }
      });
      visible.value = false;
    };

    const editvisible = ref(false);

    const showEdit = () => {
      editvisible.value = true;
    };

    const hideEdit = (iid) => {
      const token = localStorage.getItem("token");
      const editname = document.getElementById("editName").value;
      const editsymbol = document.getElementById("editSymbol").value;
      const editlocation = document.getElementById("editLocation").value;
      const editinstruction = document.getElementById("editInstruction").value;
      const editenable = document.getElementById("editEnable").value;
      const editdepartment = document.getElementById("editDepartment").value;
      const editremark = document.getElementById("editRemark").value;
      alert(`name=${editname}&symbol=${editsymbol}&location=${editlocation}&instruction=${editinstruction}&enable=${editenable}&department=${editdepartment}&remark=${editremark}`)
      axios.post(`http://localhost:4000/api/instrument/${iid}/edit`, `name=${editname}&symbol=${editsymbol}&location=${editlocation}&instruction=${editinstruction}&enable=${editenable}&department=${editdepartment}&remark=${editremark}`, {
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
    agree(id, i_id) {
      const token = localStorage.getItem("token");
      axios.post(`http://localhost:4000/api/return/${id}/approve` , `i_id=${i_id}`, {
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
    reject(id) {
      const token = localStorage.getItem("token");
      axios.post(`http://localhost:4000/api/return/${id}/reject` , [], {
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
    load() {
      const url = "http://localhost:4000/api/return/undone";
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
            this.instruments = response.data.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
