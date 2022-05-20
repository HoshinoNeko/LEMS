<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <return-approvals-table />
      </div>
    </div>
  </div>
</template>

<script>
import ReturnApprovalsTable from "./components/ReturnApprovalsTable";

export default {
  name: "return-approvals",
  components: {
    ReturnApprovalsTable,
  },
};
</script>
