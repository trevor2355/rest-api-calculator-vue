<template>
  <div>
    <h1>My Records</h1>
      <div class='flex-container'>
        <div class='flex-item'>
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
            class="mb-0">
            <b-form-checkbox-group v-model="filterOn" class="mt-1">
              <b-form-checkbox v-for='field in fields' :key='field.key' :value='field.key'>{{ field.label }}</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class='flex-item'>
          <div class='select'>
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
    <TheMyRecordsTable :records='records' :key='key' :currentPage="currentPage" :perPage="perPage" :filter="filter" :filterIncludedFields="filterOn" @filtered="onFiltered" :fields='fields'></TheMyRecordsTable>
  </div>
</template>
<script>
import moment from 'moment';
import TheMyRecordsTable from '../../components/TheMyRecordsTable.vue'
export default {
  data() {
    return {
      records: null,
      services: null,
      key: '1',
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      filter: null,
      filterOn: [],
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
          },
          sortByFormatted: true,
          filterByFormatted: true
        }
      ]
  }
  },
  props: {
    userId: {
      type: [String, Number],
      required: true
    }
  },
  created() {
    this.getServices()
    this.getRecords()
  },
  methods: {
    getRecords() {
      fetch(`http://localhost:3000/api/users/${this.userId}/records`)
        .then(response => {
          return response.json()
        })
        .then(records => {
          this.records = records;
          this.totalRows = this.records.length
          this.key = new Date().toString()
        })
        .catch(err => {
          console.log(err)
        })
    },
    getServices() {
      fetch('http://localhost:3000/api/services')
        .then(response => {
          return response.json()
        })
        .then(services => {
          this.services = services;
        })
        .catch(err => {
          console.log(err)
        })
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
    // convertServiceIdToString(serviceId) {
    //   let matchedService = this.services.filter(service => service.id === serviceId);
    //   return matchedService.type
    // }
  },
  filters: {
    formatDate(date) {
      let formatedDate = moment(date).format("dddd, MMMM Do YYYY")
      return formatedDate
    },
    convertServiceIdToString(serviceId, services) {
      if (services) {
      let matchedService = services.filter(service => service.id === serviceId);
      return matchedService[0].type
      } else {
        return 'date not available'
      }
    },
  },
  components: {
    TheMyRecordsTable
  }
}
</script>
<style>
h1 {
  padding: 8px 0
}
.flex-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 80px;
  margin: 0 88px;
}
</style>