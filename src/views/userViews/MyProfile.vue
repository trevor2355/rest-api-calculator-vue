<template>
  <div>
    <h1>My Profile</h1>
    <ul>
      <li>Email: {{ user.username }}</li>
      <li>Balance: {{ user.balance }}</li>
      <li>Role: {{ user.role }}</li>
      <li>Status: {{ user.status }}</li>
    </ul>
  </div>
</template>
<script>
import store from '@/store.js';
export default {
  data() {
    return {
      user: store.user
    }
  },
  props: {
    userId: {
      type: [String, Number],
      required: true
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      fetch(`http://localhost:3000/api/users/${this.userId}`)
        .then(response => {
          return response.json()
        })
        .then(user => {
          store.user = user[0]
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>