<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6 style="display: inline-block;">设备管理</h6>
      <a-button type="primary" @click="showModal" style="position: absolute; right: 1.5rem;">新增设备</a-button>
      <a-modal
          v-model:visible="visible"
          title="New Instrument"
          ok-text="Conform"
          cancel-text="Cancel"
          @ok="hideModal"
      >
        <a-form-item class="ant-form ant-form-vertical">
          <span class="form-label-text" style="display: block;">设备名称</span>
          <a-textarea
              type="text"
              id="addName"
              placeholder="Name for device"
              class="ant-col ant-form-item-control"
              style="width: 100%;"
          />
          <span class="form-label-text" style="display: block;">设备标识</span>
          <a-textarea
              type="number"
              id="addSymbol"
              class="form-input textarea"
              style="width: 100%;"
              placeholder="Symbol"
          />
          <span class="form-label-text" style="display: block;">设备位置</span>
          <a-textarea
              type="text"
              id="addLocation"
              placeholder="Location"
              class="ant-col ant-form-item-control"
              style="width: 100%;"
          />
          <span class="form-label-text" style="display: block;">使用说明</span>
          <a-textarea
              type="text"
              id="addInstruction"
              class="form-input textarea"
              style="width: 100%;"
              placeholder="Instruction"
          />
          <span class="form-label-text" style="display: block;">可用? 0为可用 1为禁用</span>
          <a-textarea
              type="number"
              id="addEnable"
              placeholder="0"
              class="ant-col ant-form-item-control"
              style="width: 100%;"
          />
          <span class="form-label-text" style="display: block;">备注</span>
          <a-textarea
              type="text"
              id="addRemark"
              class="form-input textarea"
              style="width: 100%;"
              placeholder="Remark"
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
                设备名称 / ID
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >设备标识
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                设备位置
              </th>
              <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                可用
              </th>
              <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                占用
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                使用说明
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                添加时间
              </th>
              <th class="text-secondary opacity-7"></th>
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
              <td class="align-middle text-center text-sm">
                <vsud-badge :color="statusCheckClass(l.enable)" variant="gradient" size="sm"
                  >{{ statusCheck(l.enable) }}</vsud-badge
                >
              </td>
              <td class="align-middle text-center text-sm">
                <vsud-badge :color="statusCheckClass(l.occupied)" variant="gradient" size="sm"
                >{{ statusCheck(l.occupied) }}</vsud-badge
                >
              </td>
              <td class="align-middle text-center text-sm" v-if="isUrl(l.instruction)">
                <p class="text-xs font-weight-bold mb-0"><a style="color: deepskyblue;" target="_blank" :href=l.instruction ><img style="width: 20%;" src="https://img.icons8.com/ios-glyphs/60/link--v1.png" alt="LINK"></a></p>
              </td>
              <td class="align-middle text-center text-sm" v-else>
                <p class="text-xs font-weight-bold mb-0">{{l.instruction}}</p>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  > {{ l.add_date }} </span
                >
              </td>
              <td class="align-middle text-center">
                <a-button type="primary" @click="showEdit(l.id)">修改</a-button>
              </td>
              <td class="align-middle text-center" v-if="l.enable===0">
                <a-popconfirm title="确认禁用吗" @confirm="disableDevice(l.id)" @cancel="cancel">
                  <a-button type="danger" size="sm">禁用</a-button
                  ></a-popconfirm
                >
              </td>
              <td class="align-middle text-center" v-else>
                <a-popconfirm title="确认启用吗" @confirm="enableDevice(l.id)" @cancel="cancel">
                  <a-button type="primary" size="sm">启用</a-button
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
          <a-modal
              class="text-secondary font-weight-bold text-xs"
              v-model:visible="editvisible"
              title="Modal"
              ok-text="确认"
              cancel-text="取消"
              @ok="hideEdit(l.id)"
          >
            <form>
              <span class="form-label-text" style="display: block;">设备修改</span>
              <span class="form-label-text" style="display: block;">设备名称</span>
              <input
                  type="text"
                  id="editName"
                  class="form-input"
                  placeholder="Name"
              >
              <span class="form-label-text" style="display: block;">设备标识</span>
              <input
                  type="text"
                  id="editSymbol"
                  class="form-input"
                  placeholder="Symbol"
              >
              <span class="form-label-text" style="display: block;">设备位置</span>
              <input
                  type="text"
                  id="editLocation"
                  class="form-input"
                  placeholder="Location"
              >
              <span class="form-label-text" style="display: block;">设备说明</span>
              <input
                  type="text"
                  id="editInstruction"
                  class="form-input"
                  placeholder="Instruction"
              >
              <span class="form-label-text" style="display: block;">启用</span>
              <input
                  type="text"
                  id="editEnable"
                  class="form-input"
                  placeholder="Enable"
              >
              <span class="form-label-text" style="display: block;">所属部门</span>
              <input
                  type="text"
                  id="editDepartment"
                  class="form-input"
                  placeholder="Department"
              >
              <span class="form-label-text" style="display: block;">备注</span>
              <input
                  type="text"
                  id="editRemark"
                  class="form-input"
                  placeholder="Remark"
              >
            </form>
          </a-modal>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
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
  name: "instruments-table",
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
    deleteUser(id) {
      const token = localStorage.getItem("token");
      axios.delete(`http://localhost:4000/api/instrument/${id}/delete`, {
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
    disableDevice(id) {
      const token = localStorage.getItem("token");
      axios.get(`http://localhost:4000/api/instrument/${id}/disable`, {
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
    enableDevice(id) {
      const token = localStorage.getItem("token");
      axios.get(`http://localhost:4000/api/instrument/${id}/enable`, {
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
        return "不可用";
      } else {
        return "可用";
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
    isUrl(urlop) {
      return urlop.startsWith("http");
    },
    load() {
      const url = "http://localhost:4000/api/instrument";
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
