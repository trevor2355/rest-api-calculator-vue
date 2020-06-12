<template>
  <b-container>
    <b-table id='my-records-table' striped hover :items="items" :fields='fields' :current-page="currentPage" :per-page="perPage" :filter='filter' :filterIncludedFields='filterIncludedFields' @filtered='onFiltered'>
    </b-table>
  </b-container>
</template>
<script>
// import moment from 'moment';
export default {
  data() {
    return {
      items: this.records,
    };
  },
  props: [
    'records',
    'fields',
    'perPage',
    'currentPage',
    'filter',
    'filterIncludedFields'
  ],
  methods: {
    onFiltered(filteredItems) {
      this.$emit('filtered', filteredItems)
    }
  }
};
</script>
<style>
</style>