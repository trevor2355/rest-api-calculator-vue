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
    <TheEditServiceModal
      :editModal="editModal"
      :key="editModal.id"
      @reset-editModal="resetEditModal"
      @get-all-services="getAllServices"
    ></TheEditServiceModal>
    <TheDeleteModal
      key="deleteModal"
      :recordId="deleteId"
      :username="deleteType"
      :entity="entity"
      @get-all-services="getAllServices"
    />
  </b-container>
</template>
<script>
import TheEditServiceModal from "./TheEditServiceModal.vue";
import TheDeleteModal from "./TheDeleteModal.vue";
export default {
  data() {
    return {
      items: this.services,
      editModal: {
        id: "",
        title: "",
        content: ""
      },
      deleteId: null,
      entity: "service",
      deleteType: null
    };
  },
  props: [
    "services",
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
      this.deleteId = item.id.toString();
      this.deleteType = item.type;
      var that = this;
      setTimeout(function() {
        that.$bvModal.show("deleteModal");
      }, 50);
    },
    getAllServices() {
      this.$emit("get-all-services");
    },
    onFiltered(filteredItems) {
      this.$emit("filtered", filteredItems);
    }
  },
  components: {
    TheEditServiceModal,
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
