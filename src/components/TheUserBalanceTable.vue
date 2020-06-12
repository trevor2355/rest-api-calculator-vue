<template>
  <b-container>
    <b-table striped hover :items="items" :fields='fields'>
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
    console.log('New Users: ', this.users)
    return {
      items: this.users,
      fields: [
        { key: 'id', label: 'ID', sortable: true, sortDirection: 'desc' },
        { key: 'username', label: 'Email', sortable: true, sortDirection: 'desc' },
        { key: 'balance', label: 'User Balance', sortable: true, sortDirection: 'desc' },
        { key: 'actions', label: 'Actions' }
      ],
      editModal: {
        id: '',
        title: '',
        content: ''
      },
    };
  },
  props: [
    'users'
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