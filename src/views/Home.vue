<template>
  <div class="home">
    <h1>Rest API Calculator</h1>
    <b-button
      :to="{ name: 'adminUsersManage' }"
      variant="danger"
      class="button"
      size="lg"
      >Admin Login</b-button
    >
    <b-button to="/user" variant="success" class="button" size="lg"
      >User Login</b-button
    >
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
<style scoped>
.home {
  padding-top: 150px;
}
.button {
  margin: 50px;
}
</style>
