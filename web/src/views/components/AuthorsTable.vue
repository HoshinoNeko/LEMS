<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Users table</h6>
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
                <p class="text-xs font-weight-bold mb-0">{{l.role}}</p>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{l.s_id}}</p>
              </td>
              <td class="align-middle text-center text-sm">
                <vsud-badge :color="statusCheckClass(l.status)" variant="gradient" size="sm"
                  >{{ statusCheck(l.status) }}</vsud-badge
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  > {{ l.reg_date }} </span
                >
              </td>
              <td class="align-middle">
                <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  >Edit</a
                >
              </td>
              <td class="align-middle">
                <a
                    href="javascript:;"
                    class="text-secondary font-weight-bold text-xs"
                    data-toggle="tooltip"
                    data-original-title="Delete user"
                >Delete</a
                >
              </td>
            </tr>
            <!--
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar
                      :img="img2"
                      class="me-3"
                      size="sm"
                      border-radius="lg"
                      alt="user2"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">Alexa Liras</h6>
                    <p class="text-xs text-secondary mb-0">
                      alexa@creative-tim.com
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">Programator</p>
                <p class="text-xs text-secondary mb-0">Developer</p>
              </td>
              <td class="align-middle text-center text-sm">
                <vsud-badge color="secondary" variant="gradient" size="sm"
                  >Offline</vsud-badge
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  >11/01/19</span
                >
              </td>
              <td class="align-middle">
                <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  >Edit</a
                >
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar
                      :img="img3"
                      size="sm"
                      border-radius="lg"
                      class="me-3"
                      alt="user3"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">Laurent Perrier</h6>
                    <p class="text-xs text-secondary mb-0">
                      laurent@creative-tim.com
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">Executive</p>
                <p class="text-xs text-secondary mb-0">Projects</p>
              </td>
              <td class="align-middle text-center text-sm">
                <vsud-badge color="success" variant="gradient" size="sm"
                  >Online</vsud-badge
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  >19/09/17</span
                >
              </td>
              <td class="align-middle">
                <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  >Edit</a
                >
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar
                      :img="img4"
                      class="me-3"
                      size="sm"
                      border-radius="lg"
                      alt="user4"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">Michael Levi</h6>
                    <p class="text-xs text-secondary mb-0">
                      michael@creative-tim.com
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">Programator</p>
                <p class="text-xs text-secondary mb-0">Developer</p>
              </td>
              <td class="align-middle text-center text-sm">
                <vsud-badge color="success" variant="gradient" size="sm"
                  >Online</vsud-badge
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  >24/12/08</span
                >
              </td>
              <td class="align-middle">
                <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  >Edit</a
                >
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar
                      :img="img5"
                      class="me-3"
                      size="sm"
                      border-radius="lg"
                      alt="user5"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">Richard Gran</h6>
                    <p class="text-xs text-secondary mb-0">
                      richard@creative-tim.com
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">Manager</p>
                <p class="text-xs text-secondary mb-0">Executive</p>
              </td>
              <td class="align-middle text-center text-sm">
                <vsud-badge color="secondary" variant="gradient" size="sm"
                  >Offline</vsud-badge
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  >04/10/21</span
                >
              </td>
              <td class="align-middle">
                <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  >Edit</a
                >
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <vsud-avatar
                      :img="img6"
                      class="me-3"
                      size="sm"
                      border-radius="lg"
                      alt="user6"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">Miriam Eric</h6>
                    <p class="text-xs text-secondary mb-0">
                      miriam@creative-tim.com
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">Programtor</p>
                <p class="text-xs text-secondary mb-0">Developer</p>
              </td>
              <td class="align-middle text-center text-sm">
                <vsud-badge color="secondary" variant="gradient" size="sm"
                  >Offline</vsud-badge
                >
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  >14/09/20</span
                >
              </td>
              <td class="align-middle">
                <a
                  href="javascript:;"
                  class="text-secondary font-weight-bold text-xs"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  >Edit</a
                >
              </td>
            </tr>
            -->
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

export default {
  name: "authors-table",
  data() {
    return {
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      users: [
        {
          id: 1,
          sname: "Admin",
          email: "Test@test.com",
          s_id: 123456,
          role: "Admin",
          status: "0",
          reg_date: "04/10/2022"
        },
        {
          id: 2,
          sname: "User",
          email: "Test@test.com",
          s_id: 123456,
          role: "User",
          status: "0",
          reg_date: "04/10/1989"
        },
        {
          id: 3,
          sname: "Banned User",
          email: "Test@test.com",
          role: "User",
          status: "1",
          reg_date: "04/10/1990"
        },
        {
          id: 4,
          sname: "User",
          email: "Test@test.com",
          role: "User",
          status: "0",
          reg_date: "04/10/1991"
        },
        {
          id: 5,
          sname: "User",
          email: "Test@test.com",
          role: "User",
          status: "0",
          reg_date: "04/10/1992"
        },
        {
          id: 6,
          sname: "User",
          email: "Test@test.com",
          role: "User",
          status: "0",
          reg_date: "04/10/1993"
        },
      ]
    };
  },
  components: {
    VsudAvatar,
    VsudBadge,
  },
  methods: {
    statusCheck(status) {
      if (status === "1") {
        return "Banned";
      } else {
        return "Enabled";
      }
    },
    statusCheckClass(status) {
      if (status === "0") {
        return "success";
      } else {
        return "danger";
      }
    }
  }
};
</script>
