<template>
  <div class='login'>
    <h2>Admin Login</h2>
    <div class='form'>
      <label for="username">Username (email)</label>
      <input v-model="username" type="text" name="username" class="input">
      <label for="password">Password</label>
      <input v-model="password" type="text" name="password" class="input">
      <b-button @click="login" variant='danger' class='button'>Login</b-button>
    </div>
  </div>
</template>
<script>
import store from '@/store.js'
export default {
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    login() {
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: this.username, password: this.password, admin: true})
      }
      fetch('http://localhost:3000/login', options)
        .then(response => {
          if (response.status !== 200) {
            throw new Error();
          }
          return response.json()
        })
        .then(userInfo => {
          store.adminUser = userInfo.user
          localStorage.setItem('JSWT', JSON.stringify(userInfo.token))
          localStorage.setItem('adminUser', JSON.stringify(userInfo.user))
          this.$router.push(`/admin/${userInfo.id}/users/manage`)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>
.login {
  padding: 100px;
}
.button {
  margin: 0 15px;
}
label {
  padding: 5px
}
input {
  margin: 5px;
}
</style>