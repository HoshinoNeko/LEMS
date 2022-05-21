<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <notices-table />
      </div>
    </div>
  </div>
</template>

<script>
import NoticesTable from "./components/NoticesTable";

export default {
  name: "notices",
  components: {
    NoticesTable,
  },
};
</script>
