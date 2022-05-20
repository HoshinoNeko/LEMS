<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <rents-table />
      </div>
    </div>
  </div>
</template>

<script>
import RentsTable from "./components/RentsTable";

export default {
  name: "rents",
  components: {
    RentsTable,
  },
};
</script>
