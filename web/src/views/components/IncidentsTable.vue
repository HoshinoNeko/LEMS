<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6 style="display: inline-block;">故障报修</h6>
      <a-button type="primary" @click="showModal" style="position: absolute; right: 1.5rem;">新建报修</a-button>
      <div class="alert alert-secondary text-white" role="alert">
        请确认设备是否存在问题再报修，避免造成不必要的人力成本,滥用用户会被系统封禁。
      </div>
      <a-modal
          v-model:visible="visible"
          title="新建报修申请"
          ok-text="提交"
          cancel-text="取消"
          @ok="hideModal"
      >
        <a-form-item class="ant-form ant-form-vertical">
          <span class="form-label-text" style="display: block;">设备 ID(可以在归还申请中找到设备ID)</span>
          <a-textarea
              type="number"
              id="addiid"
              placeholder="故障设备ID"
              class="ant-col ant-form-item-control"
              style="width: 100%;"
          />
          <span class="form-label-text" style="display: block;">标题</span>
          <a-textarea
              type="text"
              id="addtitle"
              class="form-input textarea"
              style="width: 100%;"
              placeholder="请输入标题"
          />
          <span class="form-label-text" style="display: block;">正文(请用简短的语言描述故障)</span>
          <a-textarea
              type="text"
              id="addcontent"
              class="form-input textarea"
              style="width: 100%;"
              placeholder="请输入正文"
          />
        </a-form-item>
      </a-modal>
      <a-modal
          v-model:costvisible="visible"
          title="报修确认"
          ok-text="提交"
          cancel-text="取消"
          @ok="confirmCost"
      >
        <a-form-item class="ant-form ant-form-vertical">
          <span class="form-label-text" style="display: block;">报修花费</span>
          <a-textarea
              type="number"
              id="cost"
              placeholder="报修花费"
              class="ant-col ant-form-item-control"
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
                报修标题 / ID
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                报修正文
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                已完成?
              </th>
              <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                用户 / 设备 ID
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                添加时间
              </th>
              <th class="text-secondary opacity-7" v-if="isAdmin()"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of instruments" v-bind:key="item.id">
              <td style="max-width: 30vh;">
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm"> {{ item.title }} </h6>
                    <p class="text-xs text-secondary mb-0">
                      No.{{ item.id }}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0" style="max-width: 20vh; overflow: hidden;">{{item.content}}</p>
              </td>

              <td class="align-middle text-center text-sm">
                <vsud-badge :color="statusCheckClass(item.done)" variant="gradient" size="sm"
                  >{{ statusCheck(item.done) }}</vsud-badge
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                > {{ item.user_id }} / {{ item.instrument_id }}</span
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                > {{ item.date }}</span
                >
              </td>
              <!--
              <td class="align-middle">
                <a-button type="primary" @click="showEdit(l.id)">Edit</a-button>
              </td>
              -->
              <td class="align-middle text-center" v-if="isAdmin() && item.done === 1">
                <a-popconfirm title="Sure?" @confirm="confirmIncident(item.id)" @cancel="cancel">
                  <a-button type="primary" size="sm" title="确认故障">确认</a-button
                  ></a-popconfirm
                >
              </td>
              <td class="align-middle text-center" v-if="isAdmin() && item.done === 1">
                <a-popconfirm title="Sure?" @confirm="deleteIncident(item.id)" @cancel="cancel">
                  <a-button danger size="sm" class="text-danger" title="删除误报">误报</a-button
                  ></a-popconfirm
                >
              </td>
              <td class="align-middle text-center" v-if="isAdmin() && item.done !== 0">
                <a-popconfirm title="Sure?" @confirm="solveIncident(item.id)" @cancel="cancel">
                  <a-button danger size="sm" class="text-danger" title="故障完结">完成</a-button
                ></a-popconfirm
                >
              </td>
            </tr>
          </tbody>
          <!--
          <a-modal
              class="text-secondary font-weight-bold text-xs"
              v-model:visible="editvisible"
              title="Modal"
              ok-text="确认"
              cancel-text="取消"
              @ok="hideEdit(l.id)"
          >
            <form>
              <span class="form-label-text" style="display: block;">Edit Instrument</span>
              <span class="form-label-text" style="display: block;">Name</span>
              <input
                  type="text"
                  id="editName"
                  class="form-input"
                  placeholder="Name"
              >
              <span class="form-label-text" style="display: block;">Symbol</span>
              <input
                  type="text"
                  id="editSymbol"
                  class="form-input"
                  placeholder="Symbol"
              >
              <span class="form-label-text" style="display: block;">Location</span>
              <input
                  type="text"
                  id="editLocation"
                  class="form-input"
                  placeholder="Location"
              >
              <span class="form-label-text" style="display: block;">Instruction</span>
              <input
                  type="text"
                  id="editInstruction"
                  class="form-input"
                  placeholder="Instruction"
              >
              <span class="form-label-text" style="display: block;">Enable</span>
              <input
                  type="text"
                  id="editEnable"
                  class="form-input"
                  placeholder="Enable"
              >
              <span class="form-label-text" style="display: block;">Department</span>
              <input
                  type="text"
                  id="editDepartment"
                  class="form-input"
                  placeholder="Department"
              >
              <span class="form-label-text" style="display: block;">Remark</span>
              <input
                  type="text"
                  id="editRemark"
                  class="form-input"
                  placeholder="Remark"
              >
            </form>
          </a-modal>
          -->
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
  name: "incidents-table",
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
      const url = "http://localhost:4000/api/incident/newIncident";
      const token = localStorage.getItem("token");
      const userinfo = localStorage.getItem("user");
      const adduid = JSON.parse(userinfo).id;
      const addiid = document.getElementById("addiid").value;
      const addtitle = document.getElementById("addtitle").value;
      const addcontent = document.getElementById("addcontent").value;
      axios.post(url, `uid=${adduid}&iid=${addiid}&title=${addtitle}&content=${addcontent}`, {
        headers: {
          Authorization: `${token}`
        }
      }).then(res => {
        if (res.data.status === 0) {
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
    solveIncident(id) {
      const token = localStorage.getItem("token");
      axios.get(`http://localhost:4000/api/incident/${id}/solve`, {
        headers: {
          Authorization: `${token}`
        }
      }).then(res => {
        if (res.data.status === 0) {
          message.success(res.data.message);
          this.load();
        } else {
          message.error(res.data.message);
          this.load();
        }
      });
    },
    confirmIncident(id) {
      const token = localStorage.getItem("token");
      axios.get(`http://localhost:4000/api/incident/${id}/confirm`, {
        headers: {
          Authorization: `${token}`
        }
      }).then(res => {
        if (res.data.status === 0) {
          message.success(res.data.message);
          this.load();
        } else {
          message.error(res.data.message);
          this.load();
        }
      });
    },
    deleteIncident(id) {
      const token = localStorage.getItem("token");
      axios.get(`http://localhost:4000/api/incident/${id}/delete`, {
        headers: {
          Authorization: `${token}`
        }
      }).then(res => {
        if (res.data.status === 0) {
          message.success(res.data.message);
          this.load();
        } else {
          message.error(res.data.message);
          this.load();
        }
      });
    },
    statusCheck(status) {
      if (status === 1) {
        return "未完结";
      } else if (status ===2) {
        return "已确认";
      } else {
        return "已完结"
      }
    },
    statusCheckClass(status) {
        if (status === 1) {
          return "danger";
        } else if (status ===2) {
          return "warning";
        } else {
          return "success";
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
      const userinfo = localStorage.getItem("user");
      const adduid = JSON.parse(userinfo).id;
      console.log("UID: " + adduid)
      let url
      if (this.isAdmin()) {
        url = "http://localhost:4000/api/incident/getAllIncident"
      } else {
        url = `http://localhost:4000/api/incident/${adduid}/getIncident`
      }
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
            console.log(this.instruments)
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    isAdmin() {
      let userInfo = localStorage.getItem("user")
      if (!userInfo) {
        console.log("Not logined")
        return false
      } else {
        let userRole = JSON.parse(userInfo).role
        if ( userRole > 0) {
          console.log("Admin welcome")
          return true
        } else {
          console.log("Normal User")
        }
      }
    }
  }
};
</script>
