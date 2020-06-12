<template>
  <div>
    <h3>Balance</h3>
    <TheUserBalanceTable :users='users' :key='key' @get-all-users='getAllUsers'></TheUserBalanceTable>
  </div>
</template>
<script>
import TheUserBalanceTable from '../../components/TheUserBalanceTable.vue';
export default {
  data() {
    return {
      users: null,
      key: '1'
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
<style scoped>
h3{
  margin: 8px;
}
</style>