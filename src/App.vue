<script>
export default {
  data() {
    return {
      token: localStorage.getItem('token',),
    }
  },
}
</script>

<template>
  <main class="main_class">
    <div class="menu_">
      <router-link to="/">Home</router-link> |
      <router-link to="/data">Data</router-link>
    </div>
    <router-view/>
  </main>
</template>