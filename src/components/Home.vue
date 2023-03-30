<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: localStorage.getItem('username'),
      token: localStorage.getItem('token',),
    };
  },
  computed: {
    message() {
      return this.token ? `Welcome ${localStorage.getItem('username')} !` : "Please Login. " +
          "If not, you will automatically be redirected to the Login page if you try to access the Data page.";
    },
  },
  methods: {
    logout() {
      this.token, this.username = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.goToPage('/login');
    },
    goToPage(path) {
      this.$router.push({ path: path });
    }
  },
}
</script>

<template>
  <main class="home_">
    <p>{{message}}</p>
    <template v-if="token">
      <button @click="logout">Logout</button>
    </template>
    <template v-else>
      <button @click="goToPage('/login')">Login</button>
      <button @click="goToPage('/register')">Register</button>
    </template>
  </main>
</template>