<template>
  <b-container>
    <b-table striped hover :items="items" :fields='fields' :current-page="currentPage" :per-page="perPage" :filter='filter' :filterIncludedFields='filterIncludedFields' @filtered='onFiltered'>
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
    <TheEditRecordModal :infoModal="infoModal" :key="infoModal.id" @reset-infoModal="resetInfoModal" @get-all-records='getAllRecords'/>
    <TheDeleteModal key='deleteModal' :recordId='deleteRecordId' :username='deleteRecordId' :entity='entity' @get-all-records='getAllRecords'/>
  </b-container>
</template>
<script>
import TheEditRecordModal from './TheEditRecordModal.vue'
import TheDeleteModal from './TheDeleteModal.vue'
export default {
  data() {
    return {
      items: this.records,
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
    'fields',
    'perPage',
    'currentPage',
    'filter',
    'filterIncludedFields'
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
    },
    onFiltered(filteredItems) {
      this.$emit('filtered', filteredItems)
    }
  },
  components: {
    TheEditRecordModal,
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
