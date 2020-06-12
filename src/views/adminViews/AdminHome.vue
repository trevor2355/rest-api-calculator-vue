<template>
<div>
  <p>Admin User: {{ adminUser.username }}</p>
  <b-button @click='logout' variant='danger' sz='sm'>Logout</b-button>
  <b-nav tabs>
    <b-nav-item 
      :to="{
          name: 'adminUsers',
          params: { userId: adminUser.id }
        }"
        variant='info'>
        Users
    </b-nav-item>
    <b-nav-item
      :to="{
          name: 'adminRecords',
          params: { userId: adminUser.id}
        }"
        variant='info'>
        Records
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
    adminUser: store.adminUser,
  }
},
methods: {
  logout() {
    localStorage.clear()
    store.adminUser = { username: ''};
    this.$router.push("/")
  }
}
}
</script>