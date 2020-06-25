<template>
  <b-container>
    <b-table
      id="my-records-table"
      striped
      hover
      :items="items"
      :fields="fields"
    >
    </b-table>
  </b-container>
</template>
<script>
// import moment from 'moment';
export default {
  data() {
    return {
      items: this.records
    };
  },
  props: ["records", "fields"]
};
</script>
<style></style>
