<template>
  <div>
    <h2>Records</h2>
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
              @input.native="handleChangeToRequest"
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
              @input.native="handleChangeToRequest"
              >{{ field.label }}</b-form-checkbox
            >
          </b-form-checkbox-group>
        </b-form-group>
      </div>
      <div class="flex-item">
        <div class="sort">
          <b-form-group
            label="Sort by"
            label-cols-sm="1"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-form-select
              v-model="sortBy"
              id="sortBySelect"
              :options="sortByOptions"
              @input.native="handleChangeToRequest"
            ></b-form-select>
            <b-form-checkbox
              v-model="sortOrderAsc"
              @input.native="handleSortOrderChange"
              inline
            >
              Ascending
            </b-form-checkbox>
            <b-form-checkbox
              v-model="sortOrderDesc"
              @input.native="handleSortOrderChange"
              inline
            >
              Descending
            </b-form-checkbox>
          </b-form-group>
        </div>
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
              @input.native="handleChangeToRequest"
            ></b-form-select>
          </b-form-group>
        </div>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          aria-controls="my-records-table"
          align="fill"
          @change="handleChangeToRequest"
        ></b-pagination>
      </div>
    </div>
    <TheRecordsTable
      :records="records"
      :key="key"
      @get-all-records="getAllRecords"
      :fields="fields"
    ></TheRecordsTable>
  </div>
</template>
<script>
import moment from "moment";
import TheRecordsTable from "../../components/TheRecordsTable.vue";
export default {
  data() {
    return {
      records: null,
      key: "1",
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      filter: null,
      filterOn: [],
      sortBy: "ID",
      sortOrderAsc: true,
      sortOrderDesc: false,
      fields: [
        { key: "id", label: "ID" },
        { key: "uuid", label: "UUID", class: "text-center" },
        {
          key: "service_id",
          label: "Service ID"
        },
        {
          key: "user_id",
          label: "User ID"
        },
        { key: "cost", label: "Cost" },
        {
          key: "user_balance",
          label: "User Balance"
        },
        {
          key: "service_response",
          label: "Service Response"
        },
        {
          key: "date",
          label: "Date",
          formatter: value => {
            return moment(value).format("dddd, MMMM Do YYYY, h:mm:ss");
          }
        },
        { key: "actions", label: "Actions" }
      ]
    };
  },
  created() {
    this.getAllRecords();
  },
  methods: {
    getAllRecords() {
      let url = this.createUrl();
      let options = {
        method: "GET",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("JSWT")),
          "Content-Type": "application/json"
        }
      };
      fetch(url, options)
        .then(response => {
          return response.json();
        })
        .then(records => {
          records.rows.forEach(record => {
            delete record.createdAt;
            delete record.updatedAt;
          });
          this.records = records.rows;
          this.totalRows = records.count;
          this.key = new Date().getTime();
        })
        .catch(err => {
          console.log(err);
        });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    handleChangeToRequest() {
      let that = this;
      setTimeout(function() {
        that.getAllRecords();
      }, 25);
    },
    handleSortOrderChange() {
      this.sortOrderAsc = !this.sortOrderAsc;
      this.sortOrderDesc = !this.sortOrderDesc;
      this.handleChangeToRequest();
    },
    createUrl() {
      let url = `${this.$hostname}/api/records?page=${this.currentPage -
        1}&pageSize=${this.perPage}`;
      if (this.filter) {
        url += `&searchTerm=${this.filter}`;
      }
      if (this.filterOn.length > 0) {
        for (let i = 0; i < this.filterOn.length; i++) {
          url += `&filterField${i + 1}=${this.filterOn[i]}`;
        }
      }
      url += `&sortBy=${this.convertSortLabel(this.sortBy)}`;
      if (this.sortOrderAsc) {
        url += `&order=ASC`;
      } else if (this.sortOrderDesc) {
        url += `&order=DESC`;
      }
      return url;
    },
    convertSortLabel(sortBy) {
      let field = this.fields.filter(field => field.label === sortBy);
      return field[0].key;
    }
  },
  components: {
    TheRecordsTable
  },
  computed: {
    fieldsWithoutActions: function() {
      let fieldsWithoutActions = this.fields.slice(0, this.fields.length - 1);
      return fieldsWithoutActions;
    },
    sortByOptions: function() {
      return this.fieldsWithoutActions.map(field => field.label);
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
.flex-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 80px;
  margin: 0 88px;
}
.flex-item {
  align-self: center;
}
.sort {
  padding: 16px;
}
</style>
