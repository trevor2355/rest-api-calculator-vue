<template>
  <div>
    <h1>My Profile</h1>
    <div class='line'></div>
    <ul>
      <li>Username (email): {{ user.username }}</li>
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
<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li {
  font-size: 24px;
  padding: 12px;
}
.line {
  border-top: 1px solid rgb(180, 180, 180);
  margin-bottom: 16px;
  margin-right: 16px;
  margin-left: 16px;
}
</style>