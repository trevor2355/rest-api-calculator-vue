<template>
  <b-container>
    <b-table id='my-records-table' striped hover :items="items" :fields='fields' :current-page="currentPage" :per-page="perPage">
    </b-table>
  </b-container>
</template>
<script>
import moment from 'moment';
export default {
  data() {
    return {
      items: this.records,
      fields: [
        { key: 'id', label: 'ID', sortable: true, sortDirection: 'desc' },
        { key: 'uuid', label: 'UUID', sortable: true, class: 'text-center' },
        { key: 'service_id', label: 'Service ID', sortable: true,
          // sortByFormatted: true,
          // filterByFormatted: true
        },
        { key: 'user_id', label: 'User ID', sortable: true, sortDirection: 'desc' },
        { key: 'cost', label: 'Cost', sortable: true, sortDirection: 'desc' },
        { key: 'user_balance', label: 'User Balance', sortable: true, sortDirection: 'desc' },
        { key: 'service_response', label: 'Service Response', sortable: true, sortDirection: 'desc' },
        { 
          key: 'date', 
          label: 'Date', 
          sortable: true, 
          sortDirection: 'desc',
          formatter: (value) => {
          return moment(value).format("dddd, MMMM Do YYYY, h:mm:ss")
          }
        }
      ]
    };
  },
  props: [
    'records',
    'perPage',
    'currentPage'
  ]
};
</script>
<style>
</style>