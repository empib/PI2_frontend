<template>
  <h1>Login Page</h1>
  <router-link to="/register">Need an account ?</router-link>
  <router-view />
  <form @submit.prevent="submitLoginForm">
    <div>
      <label for="username">Username: </label>
      <input id="username" type="text" v-model="username" required />
    </div>
    <div>
      <label for="password">Password: </label>
      <input id="password" type="password" v-model="password" required />
    </div>
    <button type="submit">Login</button>
  </form>
</template>

<script>
import {login} from "/src/api.js";

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async submitLoginForm() {
      let response = await login(this.username, this.password);
      if(response.success) {
        this.$router.push({ path: '/' });
      }
      else {
        console.error(response.error);
      }
    }
  }
};
</script>