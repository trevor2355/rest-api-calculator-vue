<template>
  <b-container>
    <b-table striped hover :items="items" :fields='fields' :current-page="currentPage" :per-page="perPage" :filter='filter' :filterIncludedFields='filterIncludedFields' @filtered='onFiltered'>
      <template v-slot:cell(actions)="row">
        <div class='edit-button'>
        <b-button size="sm" @click="edit(row.item)" variant='success'>
          Edit
        </b-button>
        </div>
      </template>
    </b-table>
    <TheEditBalanceModal :editModal='editModal' :key='editModal.id' @reset-editModal="resetEditModal" @get-all-users='getAllUsers'></TheEditBalanceModal>
  </b-container>
</template>
<script>
import TheEditBalanceModal from './TheEditBalanceModal.vue'
export default {
  data() {
    return {
      items: this.users,
      editModal: {
        id: '',
        title: '',
        content: ''
      },
    };
  },
  props: [
    'users',
    'fields',
    'perPage',
    'currentPage',
    'filter',
    'filterIncludedFields'
  ],
  methods: {
    edit(item) {
      console.log('item: ', item)
      this.editModal.id = item.id.toString()
      this.editModal.content = item;
      // this.$bvModal.show(this.editModal.id)
      var that = this;
      //give id to modal
      setTimeout(function(){ that.$bvModal.show(that.editModal.id); }, 40);
    },
    resetEditModal() {
      this.editModal.title = ''
      this.editModal.content = ''
    },
    getAllUsers() {
      this.$emit('get-all-users')
    },
    onFiltered(filteredItems) {
      this.$emit('filtered', filteredItems)
    }
  },
  components: {
    TheEditBalanceModal,
  }
};
</script>
<style>
  .edit-button {
    padding-top: 35px;
    padding: 5px;
  }
</style>