<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Users table</h6>
      <a-button type="primary" @click="showModal">New User</a-button>
      <a-modal
          v-model:visible="visible"
          title="New User"
          ok-text="Conform"
          cancel-text="Cancel"
          @ok="hideModal"
      >
        <form class="ant-form ant-form-vertical">
        <span class="form-label-text" style="display: block;">Name</span>
        <input
            type="text"
            id="addName"
            placeholder="Name"
            class="ant-col ant-form-item-control"
        >
        <span class="form-label-text" style="display: block;">Email</span>
        <input
            type="text"
            id="addEmail"
            class="form-input"
            placeholder="Email"
        >
        <span class="form-label-text" style="display: block;">Internal ID</span>
        <input
            type="text"
            id="addIID"
            class="form-input"
            placeholder="Internal ID"
        >
          <span class="form-label-text" style="display: block;">Role</span>
          <input
              type="text"
              id="addRole"
              class="form-input"
              placeholder="0 for user 4 for Admin"
          >
        <span class="form-label-text" style="display: block;">Password</span>
        <input
            type="text"
            id="addPassword"
            class="form-input"
            placeholder="Password"
        >
        </form>
      </a-modal>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                User
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Function
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Internal ID
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Status
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Register at
              </th>
              <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Change Password
              </th>
              <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Ban
              </th>
              <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Delete
              </th>
              <th class="text-secondary opacity-7"></th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="l in users" v-bind:key="l.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar
                      img="https://secure.gravatar.com/avatar/910cf47806ccf2b1a5ac0eaa5fc12d60?s=512"
                      size="sm"
                      border-radius="lg"
                      class="me-3"
                      alt="user1"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm"> {{ l.sname }} </h6>
                    <p class="text-xs text-secondary mb-0">
                      {{ l.email }}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{roleCheckClass(l.role)}}</p>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{l.s_id}}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <vsud-badge :color="statusCheckClass(l.enable)" variant="gradient" size="sm"
                  >{{ statusCheck(l.enable) }}</vsud-badge
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  > {{ l.reg_date }} </span
                >
              </td>
              <td class="align-middle">
                <a-button type="primary" @click="showEdit(l.s_id, l.email)">Chenge PW</a-button>
                <a-modal
                    href="javascript:;"
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Edit user"
                    v-model:visible="editvisible"
                    title="Modal"
                    ok-text="确认"
                    cancel-text="取消"
                    @ok="hideEdit"
                >
                  <form>
                    <span class="form-label-text">New Password</span>
                    <input
                        type="text"
                        id="newPW"
                        class="form-input"
                        placeholder="Password"
                    >
                  </form>
                </a-modal>
              </td>
              <td class="align-middle" v-if="l.enable===0">
                <a-popconfirm title="确认冻结吗" @confirm="banOne(l.id)" @cancel="cancel">
                  <a-button danger size="sm" class="text-danger">Ban</a-button
                  ></a-popconfirm
                >
              </td>
              <td class="align-middle" v-else>
                <a-popconfirm title="确认解封吗" @confirm="unbanOne(l.id)" @cancel="cancel">
                  <a-button danger size="sm" class="text-danger">unBan</a-button
                  ></a-popconfirm
                >
              </td>
              <td class="align-middle">
                <a-popconfirm title="确认删除吗" @confirm="deleteUser(l.id)" @cancel="cancel">
                  <a-button danger size="sm" class="text-danger">Delete</a-button
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
import VsudAvatar from "@/components/VsudAvatar.vue";
import VsudBadge from "@/components/VsudBadge.vue";
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
  name: "users-table",
  data() {
    return {
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      users: [],
    };
  },
  created() {
    this.load()
  },
  components: {
    VsudAvatar,
    VsudBadge,
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
      const url = "http://localhost:4000/api/user/createUser";
      const token = localStorage.getItem("token");
      const addname = document.getElementById("addName").value;
      const addemail = document.getElementById("addEmail").value;
      const addiid = document.getElementById("addIID").value;
      const addrole = document.getElementById("addRole").value;
      const addpassword = document.getElementById("addPassword").value;
      axios.post(url, `name=${addname}&email=${addemail}&s_id=${addiid}&role=${addrole}&password=${addpassword}`, {
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

    const showEdit = () => {
      editvisible.value = true;
    };

    const hideEdit = (sid, email) => {
      editvisible.value = false;
      const url = "http://localhost:4000/api/user/updatePW";
      const token = localStorage.getItem("token");
      const password = document.getElementById("newPW").value;
      axios.post(url, `s_id=${sid}&email=${email}&password=${password}`, {
        headers: {
          Authorization: `${token}`
        }
      }).then(res => {
        if (res.data.status === 0) {
          message.success(res.data.message);
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
      const url = "http://localhost:4000/api/user/delUser";
      const token = localStorage.getItem("token");
      axios.post(url, `id=${id}`, {
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
    banOne(id) {
      const url = "http://localhost:4000/api/user/";
      const token = localStorage.getItem("token");
      axios.get(url+id+"/ban", {
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
    unbanOne(id) {
      const url = "http://localhost:4000/api/user/";
      const token = localStorage.getItem("token");
      axios.get(url+id+"/unban", {
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
        return "Banned";
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
      const url = "http://localhost:4000/api/user/findAll";
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
            this.users = response.data.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
