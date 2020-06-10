<template>
  <h1>Welcome to the Admin Home Screen {{ adminUser }}</h1>
</template>
<script>
import store from "@/store.js"
export default {
  data() {
  return {
    adminUser: store.adminUser
  }
}
}
</script>