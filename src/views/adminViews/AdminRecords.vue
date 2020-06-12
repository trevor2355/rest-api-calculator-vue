<template>
  <div>
    <h2>Records</h2>
    <TheDataTable :records='records' :key='key' @get-all-records='getAllRecords'></TheDataTable>
  </div>
</template>
<script>
import TheDataTable from '../../components/TheDataTable.vue';
export default {
  data() {
    return {
      records: null,
      key: '1'
    }
  },
  created() {
    this.getAllRecords()
  },
  methods: {
    getAllRecords() {
      fetch('http://localhost:3000/api/records')
        .then(response => {
          return response.json()
        })
        .then(records => {
          records.forEach(record => {
            delete record.createdAt
            delete record.updatedAt
          })
          this.records = records;
          this.key = new Date().toString();
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    TheDataTable
  }
}
</script>
<style scoped>
h2{
  margin: 16px;
}
</style>