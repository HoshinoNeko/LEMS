<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6 style="display: inline-block;">用户管理</h6>
      <a-button type="primary" @click="showModal" style="position: absolute; right: 1.5rem;">新增用户</a-button>
      <a-modal
          v-model:visible="visible"
          title="新用户"
          ok-text="确认"
          cancel-text="取消"
          @ok="hideModal"
      >
        <a-form-item class="ant-form ant-form-vertical">
          <span class="form-label-text" style="display: block;">用户姓名</span>
          <a-textarea
              type="text"
              id="addName"
              placeholder="Name"
              class="ant-col ant-form-item-control"
              style="width: 100%;"
          />
          <span class="form-label-text" style="display: block;">用户邮箱</span>
          <a-textarea
              type="text"
              id="addEmail"
              class="form-input textarea"
              style="width: 100%;"
              placeholder="Email"
          />
          <span class="form-label-text" style="display: block;">内部ID</span>
          <a-textarea
              type="text"
              id="addIID"
              class="form-input textarea"
              style="width: 100%;"
              placeholder="Internal ID"
          />
          <span class="form-label-text" style="display: block;">用户角色</span>
          <a-textarea
              type="number"
              id="addRole"
              class="form-input textarea"
              style="width: 100%;"
              placeholder="0 for user 4 for admin"
          />
          <span class="form-label-text" style="display: block;">用户密码</span>
          <a-textarea
              type="text"
              id="addPassword"
              class="form-input textarea"
              style="width: 100%;"
          />
        </a-form-item>
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
                用户姓名/邮箱
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                用户角色
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                内部 ID
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                是否封禁
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                注册时间
              </th>
              <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                密码修改
              </th>
              <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                冻结
              </th>
              <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                移除
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="l in users" v-bind:key="l.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar
                      img="https://i.pravatar.cc/300"
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
              <td class="align-middle text-center text-sm">
                <vsud-badge :color="statusCheckClass(l.role)" variant="gradient" size="sm"
                >{{ roleCheck(l.role) }}</vsud-badge
                >
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
              <td class="align-middle text-center">
                <a-button type="primary" @click="showEdit(l.id)">密码修改</a-button>
              </td>
              <td class="align-middle text-center" v-if="l.enable===0">
                <a-popconfirm title="确认冻结吗" @confirm="banOne(l.id)" @cancel="cancel">
                  <a-button type="danger" size="sm">冻结</a-button
                  ></a-popconfirm
                >
              </td>
              <td class="align-middle text-center" v-else>
                <a-popconfirm title="确认解封吗" @confirm="unbanOne(l.id)" @cancel="cancel">
                  <a-button type="primary" size="sm">解冻</a-button
                  ></a-popconfirm
                >
              </td>
              <td class="align-middle">
                <a-popconfirm title="确认删除吗" @confirm="deleteUser(l.id)" @cancel="cancel">
                  <a-button danger size="sm" class="text-danger">移除</a-button
                ></a-popconfirm
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <a-modal
        href="javascript:;"
        class="text-secondary font-weight-bold text-xs"
        data-toggle="tooltip"
        data-original-title="Edit user"
        v-model:visible="editvisible"
        title="新密码"
        ok-text="确认"
        cancel-text="取消"
        @ok="hideEdit"
    >
      <a-form-item class="ant-form ant-form-vertical">
        <a-textarea
            type="text"
            id="newPW"
            placeholder="用户新密码"
            class="ant-col ant-form-item-control"
            style="width: 100%;"
        />
      </a-form-item>
    </a-modal>
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
      console.log(sid + " " + email + " " + password)
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
        return "冻结";
      } else {
        return "正常";
      }
    },
    statusCheckClass(status) {
      if (status === 0) {
        return "success";
      } else {
        return "danger";
      }
    },
    roleCheck(role) {
      if (role > 1) {
        return "管理员";
      } else {
        return "用户";
      }
    },
    roleCheckClass(role) {
      if (role > 1) {
        return "warn"
      } else {
        return "success";
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
