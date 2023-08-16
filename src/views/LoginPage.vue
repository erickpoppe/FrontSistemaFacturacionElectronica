<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="username"  />
      <input v-model="password" type="password"  />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import router from '../router/index.js';
export default {
  name: 'LoginPage',
  setup() {
    const username = ref('');
    const password = ref('');

    const login = () => {
      // Simulate a simple login check
      if (username.value === 'usuario' && password.value === 'hola12345') {
        // Perform a redirect to the dashboard page
        router.push('/farmacia');
      } else {
        alert('Invalid credentials');
      }
    };

    return {
      username,
      password,
      login,
    };
  },
};
</script>

<style>
.login-container {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}
</style>
