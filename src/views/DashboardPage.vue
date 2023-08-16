<template>
  <div class="dashboard-container">
    <h2>Dashboard</h2>
    <p>Bienvenido a este sitio, {{ username }}!</p>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'DashboardPage',
  setup() {
    const route = useRoute();
    const username = computed(() => route.query.username);

    return {
      username,
    };
  },
};
</script>

<style>
.dashboard-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}
</style>
