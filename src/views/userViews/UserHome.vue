<template>
<div>
  <p>User: {{ user.username }}</p>
  <b-button @click='logout' variant='danger' sz='sm'>Logout</b-button>
  <b-nav tabs>
    <b-nav-item 
      :to="{
          name: 'myProfile',
          params: { userId: user.id }
        }"
        variant='info'>
        My Profile
    </b-nav-item>
    <b-nav-item
      :to="{
          name: 'myRecords',
          params: { userId: user.id}
        }"
        variant='info'>
        My Records
    </b-nav-item>
    <b-nav-item
      :to="{
          name: 'services',
          params: {}
        }"
        variant='info'>
        Request a Service
    </b-nav-item>
  </b-nav>
  <router-view></router-view>
</div>
</template>
<script>
import store from "@/store.js"
export default {
  data() {
  return {
    user: store.user,
    username: store.username
  }
},
methods: {
  logout() {
    localStorage.clear()
    store.user = { username: ''};
    this.$router.push("/")
  }
}
}
</script>