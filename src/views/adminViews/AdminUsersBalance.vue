<template>
  <div>
    <h3>Users Balance</h3>
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
    <TheUserBalanceTable :users='users' :key='key' @get-all-users='getAllUsers' :currentPage="currentPage" :perPage="perPage"></TheUserBalanceTable>
  </div>
</template>
<script>
import TheUserBalanceTable from '../../components/TheUserBalanceTable.vue';
export default {
  data() {
    return {
      users: null,
      key: '1',
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
    }
  },
  created() {
    this.getAllUsers()
  },
  methods: {
    getAllUsers() {
      fetch('http://localhost:3000/api/users')
        .then(response => {
          return response.json()
        })
        .then(users => {
          this.users = users;
          this.key = new Date().toString()
          this.totalRows = users.length
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    TheUserBalanceTable
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
h3 {
  margin: 8px
}
.select {
  padding: 0 40%
}
.pagination {
  padding: 0 30%
}
.button {
  margin: 16px;
}
</style>