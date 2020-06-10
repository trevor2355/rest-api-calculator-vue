<template>
  <h1>Welcome to the User Home Screen {{ user }}</h1>
</template>
<script>
import store from "@/store.js"
export default {
  data() {
  return {
    user: store.user
  }
}
}
</script>