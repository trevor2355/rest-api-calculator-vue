<template>
  <div class="login">
    <p class="back" @click="back">Back</p>
    <h2>User Login</h2>
    <div class="form">
      <label for="username">Username (email): </label>
      <input v-model="username" type="text" name="username" class="input" />
      <label for="password">Password: </label>
      <input v-model="password" type="text" name="password" class="input" />
      <b-button @click="login" variant="success" class="button">Login</b-button>
      <p class="failedLogin" v-if="loginFailed">
        Incorrect Username or Password
      </p>
    </div>
  </div>
</template>
<script>
import store from "@/store.js";
export default {
  data() {
    return {
      username: null,
      password: null,
      loginFailed: false
    };
  },
  methods: {
    login() {
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          admin: false
        })
      };
      fetch("http://localhost:3000/login", options)
        .then(response => {
          if (response.status !== 200) {
            this.loginFailed = true;
            throw new Error("Invalid Password");
          }
          return response.json();
        })
        .then(userInfo => {
          store.user = userInfo.user;
          localStorage.setItem("user", JSON.stringify(userInfo.user));
          localStorage.setItem("JSWT", JSON.stringify(userInfo.token));
          this.$router.push(`/user/${userInfo.user.id}/profile`);
        })
        .catch(err => {
          console.log(err);
        });
    },
    back() {
      this.$router.push(`/`);
    }
  }
};
</script>
<style scoped>
.login {
  padding: 100px;
}
.button {
  margin: 0 15px;
}
label {
  padding: 5px;
}
input {
  margin: 5px;
}
.failedLogin {
  font-size: 20px;
  color: darkred;
}
.back {
  position: absolute;
  top: 15px;
  left: 15px;
  text-decoration: underline;
}
.back:hover {
  cursor: pointer;
  color: darkblue;
}
</style>
