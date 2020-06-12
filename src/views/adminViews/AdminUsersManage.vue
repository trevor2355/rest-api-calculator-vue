<template>
  <div>
    <h3>Manage Users</h3>
    <TheUserManageTable :users='users' :key='key' @get-all-users='getAllUsers'></TheUserManageTable>
  </div>
</template>
<script>
import TheUserManageTable from '../../components/TheUserManageTable.vue';
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
    TheUserManageTable
  }
}
</script>
<style scoped>
h3{
  margin: 8px;
}
</style>