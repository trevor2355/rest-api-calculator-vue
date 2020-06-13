<template>
<div>
  <div class=buttons>
  <span class='button'>
  <b-button 
    :to="{
        name: 'adminUsersManage',
      }"
    variant='outline-secondary' 
    sz='lg' 
    exact exact-active-class="active">
      Manage Users
  </b-button>
  </span>
  <span class='button'>
  <b-button 
    :to="{
      name: 'adminUsersBalance',
    }"
    variant='outline-secondary' 
    sz='lg' 
    exact exact-active-class="active">
      Manage User Balances
  </b-button>
  </span>
  </div>
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
.buttons {
  margin-top: 16px;
  margin-bottom: 24px;
}
</style>