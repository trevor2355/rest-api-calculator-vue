<template>
  <div class='login'>
    <h2>User Login</h2>
    <div class='form'>
      <label for="username">Username (email)</label>
      <input v-model="username" type="text" name="username" class="input">
      <label for="password">Password</label>
      <input v-model="password" type="text" name="password" class="input">
      <button @click="login">Login</button>
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
      console.log("this.username: ", this.username)
      store.user = this.username
      this.$router.push("/user")
    }
  }
}
</script>