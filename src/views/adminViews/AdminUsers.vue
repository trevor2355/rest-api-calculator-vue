<template>
<div>
  <h2>Users</h2>
  <p v-for="user in users" :key='user.id'>{{ user.username }}</p>  
</div>
</template>
<script>
export default {
  data() {
    return {
      users: null
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
          console.log(users);
          this.users = users;
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>