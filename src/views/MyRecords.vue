<template>
  <div>
    <h1>My Records</h1>
    <table>
      <tr>
        <th>Service</th>
        <th>Cost</th>
        <th>User Balance After Service</th>
        <th>Date</th>
        <th>Service Response</th>
      </tr>
      <tr v-for="record in records" :key="record.id">
        <th>{{ record.service_id | convertServiceIdToString(services) }}</th>
        <th>{{ record.cost }}</th>
        <th>{{ record.user_balance }}</th>
        <th>{{ record.date | formatDate }}</th>
        <th>{{ record.service_response }}</th>
      </tr>
    </table>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  data() {
    return {
      records: null,
      services: null
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
          console.log(services)
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
    }
  }
}
</script>