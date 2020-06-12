<template>
<div>
  <h2>Users</h2>
  <b-button 
    :to="{
        name: 'adminUsersManage',
      }"
    variant='danger'>
      Manage Users
  </b-button>
  <b-button 
    :to="{
      name: 'adminUsersBalance',
    }"
    variant='danger'>
      Manage User Balances
  </b-button>
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