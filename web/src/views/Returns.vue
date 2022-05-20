<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <returns-table />
      </div>
    </div>
  </div>
</template>

<script>
import ReturnsTable from "./components/ReturnsTable";

export default {
  name: "returns",
  components: {
    ReturnsTable,
  },
};
</script>
