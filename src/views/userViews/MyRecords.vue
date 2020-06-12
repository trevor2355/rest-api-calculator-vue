<template>
  <div>
    <h1>My Records</h1>
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
    <TheMyRecordsTable :records='records' :key='key' :currentPage="currentPage" :perPage="perPage"></TheMyRecordsTable>
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
.select {
  padding: 0 40%
}
.pagination {
  padding: 0 30%
}
</style>