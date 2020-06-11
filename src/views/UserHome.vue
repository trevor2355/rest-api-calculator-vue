<template>
<div>
  <nav>
    <router-link
     :to="{
        name: 'myProfile',
        params: { userId: user.id }
      }">
      My Profile
    </router-link>
    <router-link
     :to="{
        name: 'myRecords',
        params: { userId: user.id}
      }">
      My Records
    </router-link>
    <router-link
     :to="{
        name: 'services',
        params: {}
      }">
      Request a Service
    </router-link>
  </nav>
  <button @click='logout'>Logout</button>
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