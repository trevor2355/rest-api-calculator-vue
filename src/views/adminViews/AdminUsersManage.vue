<template>
  <div>
    <h3>Manage Users</h3>
    <b-button size="sm" @click="openAddUserModal" variant='primary'>
          Add User +
    </b-button>
    <TheUserManageTable :users='users' :key='key' @get-all-users='getAllUsers'></TheUserManageTable>
    <TheAddUserModal key='addUserModal' :id='key' :entity='entity' @get-all-users='getAllUsers'/>
  </div>
</template>
<script>
import TheUserManageTable from '../../components/TheUserManageTable.vue';
import TheAddUserModal from '../../components/TheAddUserModal.vue';
export default {
  data() {
    return {
      users: null,
      key: '1',
      entity: 'user'
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
    },
    openAddUserModal() {
      this.$bvModal.show(this.key);
    },
  },
  components: {
    TheUserManageTable,
    TheAddUserModal,
  }
}
</script>
<style scoped>
h3{
  margin: 8px;
}
</style>