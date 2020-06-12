<template>
  <div>
    <h2>Records</h2>
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
      align="fill"
    ></b-pagination>
    <TheDataTable :records='records' :key='key' @get-all-records='getAllRecords' :currentPage="currentPage" :perPage="perPage"></TheDataTable>
  </div>
</template>
<script>
import TheDataTable from '../../components/TheDataTable.vue';
export default {
  data() {
    return {
      records: null,
      key: '1',
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
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
          this.totalRows = records.length
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
<style>
h1 {
  padding: 8px 0
}
h2 {
  margin: 16px
}
.select {
  padding: 0 40%
}
.pagination {
  padding: 0 30%
}
</style>