<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <incidents-table />
      </div>
    </div>
  </div>
</template>

<script>
import IncidentsTable from "./components/IncidentsTable";

export default {
  name: "incidents",
  components: {
    IncidentsTable,
  },
};
</script>
