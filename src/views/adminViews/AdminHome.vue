<template>
  <div>
    <p class="user">Admin User: {{ adminUser.username }}</p>
    <b-button @click="logout" variant="danger" sz="sm" class="logout"
      >Logout</b-button
    >
    <b-nav tabs>
      <b-nav-item
        :to="{
          name: 'adminUsersManage',
          params: { userId: adminUser.id }
        }"
        variant="info"
        exact
        exact-active-class="active"
      >
        Users
      </b-nav-item>
      <b-nav-item
        :to="{
          name: 'adminRecords',
          params: { userId: adminUser.id }
        }"
        variant="info"
        exact
        exact-active-class="active"
      >
        Records
      </b-nav-item>
      <b-nav-item
        :to="{
          name: 'adminServices',
          params: { userId: adminUser.id }
        }"
        variant="info"
        exact
        exact-active-class="active"
      >
        Services
      </b-nav-item>
    </b-nav>
    <router-view></router-view>
  </div>
</template>
<script>
import store from "@/store.js";
export default {
  data() {
    return {
      adminUser: store.adminUser
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      store.adminUser = { username: "" };
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.logout {
  position: absolute;
  top: 44px;
  right: 16px;
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
  margin: 48px 0 24px 0;
}
</style>
