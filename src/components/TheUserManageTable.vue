<template>
  <b-container>
    <b-table
      striped
      hover
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterIncludedFields"
      @filtered="onFiltered"
    >
      <template v-slot:cell(actions)="row">
        <div class="edit-button">
          <b-button size="sm" @click="edit(row.item)" variant="success">
            Edit
          </b-button>
        </div>
        <div class="delete-button">
          <b-button
            size="sm"
            @click="openDeleteModal(row.item)"
            variant="danger"
          >
            Delete
          </b-button>
        </div>
      </template>
    </b-table>
    <TheEditUserModal
      :editModal="editModal"
      :key="editModal.id"
      @reset-editModal="resetEditModal"
      @get-all-users="getAllUsers"
    ></TheEditUserModal>
    <TheDeleteModal
      key="deleteModal"
      :recordId="deleteRecordId"
      :username="deleteUsername"
      :entity="entity"
      @get-all-users="getAllUsers"
    />
  </b-container>
</template>
<script>
import TheEditUserModal from "./TheEditUserModal.vue";
import TheDeleteModal from "./TheDeleteModal.vue";
export default {
  data() {
    return {
      items: this.users,
      // fields: [
      //   { key: 'id', label: 'ID', sortable: true, sortDirection: 'desc' },
      //   { key: 'uuid', label: 'UUID', sortable: true, sortDirection: 'desc' },
      //   { key: 'username', label: 'Email', sortable: true, sortDirection: 'desc' },
      //   { key: 'balance', label: 'User Balance', sortable: true, sortDirection: 'desc' },
      //   { key: 'role', label: 'User Role', sortable: true, sortDirection: 'desc' },
      //   { key: 'status', label: 'User Status', sortable: true, sortDirection: 'desc' },
      //   { key: 'actions', label: 'Actions' }
      // ],
      editModal: {
        id: "",
        title: "",
        content: ""
      },
      deleteRecordId: null,
      entity: "user",
      deleteUsername: null
    };
  },
  props: [
    "users",
    "fields",
    "perPage",
    "currentPage",
    "filter",
    "filterIncludedFields"
  ],
  methods: {
    edit(item) {
      this.editModal.id = item.id.toString();
      this.editModal.content = item;
      // this.$bvModal.show(this.editModal.id)
      var that = this;
      //give id to modal
      setTimeout(function() {
        that.$bvModal.show(that.editModal.id);
      }, 75);
    },
    resetEditModal() {
      this.editModal.title = "";
      this.editModal.content = "";
    },
    openDeleteModal(item) {
      this.deleteRecordId = item.id.toString();
      this.deleteUsername = item.username;
      var that = this;
      setTimeout(function() {
        that.$bvModal.show("deleteModal");
      }, 50);
    },
    getAllUsers() {
      this.$emit("get-all-users");
    },
    onFiltered(filteredItems) {
      this.$emit("filtered", filteredItems);
    }
  },
  components: {
    TheEditUserModal,
    TheDeleteModal
  }
};
</script>
<style>
.edit-button {
  padding-top: 35px;
  padding: 5px;
}
</style>
