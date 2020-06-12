<template>
<div>
  <span class='button'>
  <b-button 
    :to="{
        name: 'adminUsersManage',
      }"
    variant='danger'>
      Manage Users
  </b-button>
  </span>
  <span class='button'>
  <b-button 
    :to="{
      name: 'adminUsersBalance',
    }"
    variant='danger'>
      Manage User Balances
  </b-button>
  </span>
  <router-view></router-view>
</div>
</template>
<script>
export default {
  data() {
    return {
    }
  }
}
</script>
<style scoped>
.button {
  margin: 8px;
}
</style>