<template>
  <div>
    <h3>Manage Services</h3>
    <div class="button">
      <b-button size="sm" @click="openAddUserModal" variant="primary">
        Add Service +
      </b-button>
    </div>
    <div class="flex-container">
      <div class="flex-item">
        <b-form-group
          label="Filter"
          label-cols-sm="1"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
        <b-form-group
          label="Filter On"
          label-cols-sm="1"
          label-align-sm="right"
          label-size="sm"
          description="Leave all unchecked to filter on all data"
          class="mb-0"
        >
          <b-form-checkbox-group v-model="filterOn" class="mt-1">
            <b-form-checkbox
              v-for="field in fieldsWithoutActions"
              :key="field.key"
              :value="field.key"
              >{{ field.label }}</b-form-checkbox
            >
          </b-form-checkbox-group>
        </b-form-group>
      </div>
      <div class="flex-item">
        <div class="select">
          <b-form-group
            label="Per page"
            label-size="sm"
            label-align-sm="right"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-for="perPageSelect"
          >
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </div>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          aria-controls="my-records-table"
          align="fill"
        ></b-pagination>
      </div>
    </div>
    <TheServicesTable
      :services="services"
      :key="key"
      @get-all-services="getAllServices"
      :currentPage="currentPage"
      :perPage="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      @filtered="onFiltered"
      :fields="fields"
    ></TheServicesTable>
    <TheAddServiceModal
      key="addServiceModal"
      :id="key"
      :entity="entity"
      @get-all-services="getAllServices"
    />
  </div>
</template>
<script>
import TheServicesTable from "../../components/TheServicesTable.vue";
import TheAddServiceModal from "../../components/TheAddServiceModal.vue";
export default {
  data() {
    return {
      services: null,
      key: "1",
      entity: "service",
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      filter: null,
      filterOn: [],
      fields: [
        { key: "id", label: "ID", sortable: true, sortDirection: "desc" },
        { key: "uuid", label: "UUID", sortable: true, sortDirection: "desc" },
        { key: "type", label: "Type", sortable: true, sortDirection: "desc" },
        { key: "cost", label: "Cost", sortable: true, sortDirection: "desc" },
        {
          key: "status",
          label: "Status",
          sortable: true,
          sortDirection: "desc"
        },
        { key: "actions", label: "Actions" }
      ]
    };
  },
  created() {
    this.getAllServices();
  },
  methods: {
    getAllServices() {
      let options = {
        method: "GET",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("JSWT")),
          "Content-Type": "application/json"
        }
      };
      fetch(`${this.$hostname}/api/services`, options)
        .then(response => {
          return response.json();
        })
        .then(services => {
          this.services = services;
          this.key = new Date().toString();
          this.totalRows = services.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
    openAddUserModal() {
      this.$bvModal.show(this.key);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  },
  components: {
    TheServicesTable,
    TheAddServiceModal
  },
  computed: {
    fieldsWithoutActions: function() {
      let fieldsWithoutActions = this.fields.slice(0, this.fields.length - 1);
      return fieldsWithoutActions;
    }
  }
};
</script>
<style>
h1 {
  padding: 8px 0;
}
h2 {
  margin: 16px;
}
h3 {
  margin: 8px;
}
.flex-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 80px;
  margin: 0 88px;
}
.button {
  margin: 16px;
}
</style>
