<template>
  <div>
    <b-button
      size="sm"
      @click="openAddUserModal"
      variant="primary"
      class="addUser"
    >
      Add User +
    </b-button>
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
    <TheUserManageTable
      :users="users"
      :key="key"
      @get-all-users="getAllUsers"
      :currentPage="currentPage"
      :perPage="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      @filtered="onFiltered"
      :fields="fields"
    ></TheUserManageTable>
    <TheAddUserModal
      key="addUserModal"
      :id="key"
      :entity="entity"
      @get-all-users="getAllUsers"
    />
  </div>
</template>
<script>
import TheUserManageTable from "../../components/TheUserManageTable.vue";
import TheAddUserModal from "../../components/TheAddUserModal.vue";
export default {
  data() {
    return {
      users: null,
      key: "1",
      entity: "user",
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      filter: null,
      filterOn: [],
      fields: [
        { key: "id", label: "ID", sortable: true, sortDirection: "desc" },
        { key: "uuid", label: "UUID", sortable: true, sortDirection: "desc" },
        {
          key: "username",
          label: "Email",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "balance",
          label: "User Balance",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "role",
          label: "User Role",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "status",
          label: "User Status",
          sortable: true,
          sortDirection: "desc"
        },
        { key: "actions", label: "Actions" }
      ]
    };
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers() {
      let options = {
        method: "GET",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("JSWT")),
          "Content-Type": "application/json"
        }
      };
      fetch(`${this.$hostname}/api/users`, options)
        .then(response => {
          return response.json();
        })
        .then(users => {
          this.users = users;
          this.key = new Date().toString();
          this.totalRows = this.users.length;
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
    TheUserManageTable,
    TheAddUserModal
  },
  computed: {
    fieldsWithoutActions: function() {
      let fieldsWithoutActions = this.fields.slice(0, this.fields.length - 1);
      return fieldsWithoutActions;
    }
  }
};
</script>
<style scoped>
h2 {
  margin: 8px;
}
.addUser {
  margin-bottom: 16px;
}
.flex-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 80px;
  margin: 0 88px;
}
</style>
