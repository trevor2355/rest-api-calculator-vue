<template>
<div>
  <p class='user'>User: {{ user.username }}</p>
  <b-button class='logout' @click='logout' variant='danger' sz='sm'>Logout</b-button>
  <b-nav tabs>
    <b-nav-item 
      :to="{
          name: 'myProfile',
          params: { userId: user.id }
        }"
        variant='info' 
        exact exact-active-class="active">
        My Profile
    </b-nav-item>
    <b-nav-item
      :to="{
          name: 'myRecords',
          params: { userId: user.id}
        }"
        variant='info' 
        exact exact-active-class="active">
        My Records
    </b-nav-item>
    <b-nav-item
      :to="{
          name: 'services',
          params: {}
        }"
        variant='info'
        exact exact-active-class="active">
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
<style scoped>
.logout {
  position: absolute;
  top: 40px;
  right: 0px;
}
.user {
  font-size: 16px;
  font-weight: 500;
  margin-top: 16px;
  margin-right: 16px;
  position: absolute;
  top: 0px;
  right: 0px;
}
.nav {
  margin: 48px 0 24px 0
}
</style>