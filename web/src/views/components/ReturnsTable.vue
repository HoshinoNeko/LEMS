<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Return table</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Return / Device ID
              </th>
              <th
                  class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Duration By day
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Add at
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
                    <h6 class="mb-0 text-sm"> Device {{ l.instrument_id }} </h6>
                    <p class="text-xs text-secondary mb-0">
                      Return {{ l.id }}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0" style="text-align: center;">{{l.duration}}</p>
              </td>

              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  > {{ l.rent_date }} </span
                >
              </td>
              <td class="align-middle">
                <a-popconfirm title="Sure?" @confirm="deleteUser(l.id)" @cancel="cancel">
                  <a-button danger size="sm" class="text-danger">Return</a-button
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
  name: "returns-table",
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

    return {
      cancel,
      visible,
      showModal,
      hideModal,
      confirm,
      showEdit,
      hideEdit,
    };
  },
  methods: {
    deleteUser(id) {
      const token = localStorage.getItem("token");
      const userinfo = localStorage.getItem("user");
      const adduid = JSON.parse(userinfo).id;
      axios.post(`http://localhost:4000/api/return/add`, `s_id=${adduid}&i_id=${id}`, {
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
      const userinfo = localStorage.getItem("user");
      const adduid = JSON.parse(userinfo).id;
      const url = "http://localhost:4000/api/rent/";
      const token = localStorage.getItem("token");
      if (!token) {
        message.error('You are not login');
        this.$router.push({ name: "Sign In" });
      } else {
        axios
          .get(url+adduid, {
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
