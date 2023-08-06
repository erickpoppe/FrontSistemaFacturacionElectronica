<template>

  <router-link class="nav-link" :class="$route.name == 'Farmacia'? 'active':''" aria-current="page" :to="{ name: 'Farmacia' }">
    <i class="bi bi-cart3 h4">FARMACIA</i>
  </router-link>
  <router-link class="nav-link" :class="$route.name == 'Sclinicos'? 'active':''" aria-current="page" :to="{ name: 'Sclinicos' }">
    <i class="bi bi-cart3 h4">SERVICIOS CLÍNICOS</i>
  </router-link>
  <router-link class="nav-link" :class="$route.name == 'Detalles'? 'active':''" aria-current="page" :to="{ name: 'Detalles' }">
    <i class="bi bi-cart3 h4">DETALLES</i>
  </router-link>
  <router-link class="nav-link" :class="$route.name == 'Productos'? 'active':''" aria-current="page" :to="{ name: 'Productos' }">
    <i class="bi bi-cart3 h4">PRODUCTOS</i>
  </router-link>
  <div id="app">
    <PingComponent @update-status="onUpdateStatus"   />
    <h4>Estado de red recibido: {{ networkStatus }}</h4>
  </div>
</template>
<script>
import PingComponent from "../components/PingComponent.vue";

export default {
  components: {
    PingComponent,
  },
  data() {
    return {
      networkStatus: ""
    };
  },
  methods: {
    onUpdateStatus(status) {
      this.networkStatus = status;
    },
  },
};

</script>


<style>
.cardo-container {
  display: flex;
  justify-content: center;
}

.cardo {
  background-color: #f2f2f2;
  padding: 10px;
  border-radius: 4px;
  margin: 10px;
  text-align: center;
  max-width: 300px; /* Set a maximum width for the card */
}
</style>
<script setup>
</script>