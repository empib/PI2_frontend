<template>
  <h1>Register Page</h1>
  <router-link to="/login">Log In</router-link>
  <router-view />
  <form @submit.prevent="submitRegisterForm">
    <div>
      <label for="username">Username: </label>
      <input id="username" type="text" v-model="username" required />
    </div>
    <div>
      <label for="password">Password: </label>
      <input id="password" type="password" v-model="password" required />
    </div>
    <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
    <button type="submit">Register</button>
  </form>
</template>

<script>
import {register} from '/src/api.js';
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    async submitRegisterForm() {
      let response = await register(this.username, this.password);
      if(response.success) {
        this.$router.push({ path: '/' });
      }
      else {
        if (response.error.status === 400) {
          this.errorMessage = "Username already taken !";
        } else {
          this.errorMessage = "An error occurred, please try again later";
        }
      }
    }
  }
};
</script>

<style>
  .error-message {
    color: red;
  }
</style>