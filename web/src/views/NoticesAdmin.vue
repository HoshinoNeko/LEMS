<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <notices-admin-table />
      </div>
    </div>
  </div>
</template>

<script>
import NoticesAdminTable from "./components/NoticesAdminTable";

export default {
  name: "noticesadmin",
  components: {
    NoticesAdminTable,
  },
};
</script>
