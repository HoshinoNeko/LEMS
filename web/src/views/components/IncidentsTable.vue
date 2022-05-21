<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6 style="display: inline-block;">Incidents table</h6>
      <a-button type="primary" @click="showModal" style="position: absolute; right: 1.5rem;">New Incident</a-button>
      <a-modal
          v-model:visible="visible"
          title="New Incident"
          ok-text="Conform"
          cancel-text="Cancel"
          @ok="hideModal"
      >
        <a-form-item class="ant-form ant-form-vertical">
          <span class="form-label-text" style="display: block;">Instrument ID</span>
          <a-textarea
              type="number"
              id="addiid"
              placeholder="Instrument ID"
              class="ant-col ant-form-item-control"
              style="width: 100%;"
          />
          <span class="form-label-text" style="display: block;">Title</span>
          <a-textarea
              type="text"
              id="addtitle"
              class="form-input textarea"
              style="width: 100%;"
              placeholder="Title"
          />
          <span class="form-label-text" style="display: block;">Content</span>
          <a-textarea
              type="text"
              id="addcontent"
              class="form-input textarea"
              style="width: 100%;"
              placeholder="Content"
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
                Instrument Name / ID
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Content
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Done
              </th>
              <th
                  class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                User / Device
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Add at
              </th>
              <th class="text-secondary opacity-7"></th>
              <th class="text-secondary opacity-7" v-if="isAdmin()"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="l in instruments" v-bind:key="l.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm"> {{ l.title }} </h6>
                    <p class="text-xs text-secondary mb-0">
                      No.{{ l.id }}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0" style="max-width: 20vh; overflow: hidden;">{{l.content}}</p>
              </td>

              <td class="align-middle text-center text-sm">
                <vsud-badge :color="statusCheckClass(l.done)" variant="gradient" size="sm"
                  >{{ statusCheck(l.done) }}</vsud-badge
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                > {{ l.user_id }} / {{ l.instrument_id }}</span
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                > {{ l.date }}</span
                >
              </td>
              <!--
              <td class="align-middle">
                <a-button type="primary" @click="showEdit(l.id)">Edit</a-button>
              </td>
              -->
              <td class="align-middle text-center" v-if="isAdmin()">
                <a-popconfirm title="Sure?" @confirm="deleteUser(l.id)" @cancel="cancel">
                  <a-button danger size="sm" class="text-danger">Done</a-button
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
    deleteUser(id) {
      const token = localStorage.getItem("token");
      axios.get(`http://localhost:4000/api/incident/${id}/approval`, {
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
        return "Undone";
      } else {
        return "Done";
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
        console.log(JSON.parse(userInfo))
        console.log("role"+userRole)
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
