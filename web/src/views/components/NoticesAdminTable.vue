<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6 style="display: inline-block;">公告管理</h6>
      <a-button type="primary" @click="showModal" style="position: absolute; right: 1.5rem;">新公告</a-button>
      <a-modal
          v-model:visible="visible"
          title="新公告"
          ok-text="确认"
          cancel-text="取消"
          @ok="hideModal"
      >
        <a-form-item class="ant-form ant-form-vertical">
          <span class="form-label-text" style="display: block;">Title</span>
          <a-textarea
              type="text"
              id="addTitle"
              placeholder="Title"
              class="ant-col ant-form-item-control"
              style="width: 100%; height: 3rem;"
          />
          <span class="form-label-text" style="display: block;">Content</span>
          <a-textarea
              type="text"
              id="addContent"
              class="form-input textarea"
              style="width: 100%; height:auto; min-height: 10rem;"
          />
        </a-form-item>
      </a-modal>

    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <a-list-item v-for="item in data" v-bind:key="item.id" style="padding: 1.5rem;" :bordered="true">
          <a-list-item-meta
              :description=item.content
          >
            <template #title>
              <p>{{ item.title }}</p>
            </template>
          </a-list-item-meta>
          <td class="align-middle text-center" style="padding: 1.5rem;">
            <a-popconfirm title="确认删除吗" @confirm="deleteNotice(item.id)" @cancel="cancel">
              <a-button danger size="sm" class="text-danger">删除</a-button
              ></a-popconfirm
            >
          </td>
        </a-list-item>
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
  name: "notices-admin-table",
  data() {
    return {
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      data: [],
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
      const url = "http://localhost:4000/api/announcement/new";
      const token = localStorage.getItem("token");
      const userinfo = localStorage.getItem("user");
      const adduid = JSON.parse(userinfo).id;
      const addtitle = document.getElementById("addTitle").value;
      const addcontent = document.getElementById("addContent").value;
      axios.post(url, `uid=${adduid}&title=${addtitle}&content=${addcontent}`, {
        headers: {
          Authorization: `${token}`
        }
      }).then(res => {
        if (res.data.status === 0) {
          message.success(res.data.message);
          this.methods.load();
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
    deleteNotice(id) {
      const token = localStorage.getItem("token");
      axios.delete(`http://localhost:4000/api/announcement/${id}/delete`, {
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
      const url = "http://localhost:4000/api/announcement";
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
    }
  }
};
</script>
