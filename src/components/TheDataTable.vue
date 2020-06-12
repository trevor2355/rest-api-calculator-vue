<template>
  <b-container>
    <b-table striped hover :items="items" :fields='fields' :current-page="currentPage" :per-page="perPage">
      <template v-slot:cell(actions)="row">
        <div class='edit-button'>
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" variant='success'>
          Edit
        </b-button>
        </div>
        <div class = 'delete-button'>
        <b-button size="sm" @click="openDeleteModal(row.item)" variant='danger'>
          Delete
        </b-button>
        </div>
      </template>
    </b-table>
    <TheEditModal :infoModal="infoModal" :key="infoModal.id" @reset-infoModal="resetInfoModal" @get-all-records='getAllRecords'/>
    <TheDeleteModal key='deleteModal' :recordId='deleteRecordId' :username='deleteRecordId' :entity='entity' @get-all-records='getAllRecords'/>
  </b-container>
</template>
<script>
import moment from 'moment';
import TheEditModal from './TheEditModal.vue'
import TheDeleteModal from './TheDeleteModal.vue'
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
        },
        { key: 'actions', label: 'Actions' }
      ],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      deleteRecordId: null,
      entity: 'record',
    };
  },
  props: [
    'records',
    'perPage',
    'currentPage'
  ],
  methods: {
    info(item, index, button) {
      index
      button
      this.infoModal.id = item.id.toString()
      this.infoModal.content = item;
      var that = this;
      setTimeout(function(){ that.$bvModal.show(that.infoModal.id); }, 50);
    },
    openDeleteModal(item) {
      this.deleteRecordId = item.id.toString()
      var that = this;
      setTimeout(function(){ that.$bvModal.show('deleteModal'); }, 50);
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    getAllRecords() {
      this.$emit('get-all-records')
    }
  },
  components: {
    TheEditModal,
    TheDeleteModal
  }
};
</script>
<style>
  .edit-button {
    padding-top: 35px;
    padding: 5px;
  }
  .delete-button {
    padding: 5px;
  }
</style>
