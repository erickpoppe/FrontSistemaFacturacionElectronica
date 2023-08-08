<template>
  <div class="container min-h-content py-5 text-center">
    <h3>Ir a emisión de facura</h3>
    <router-link class="nav-link" :class="$route.name == 'Carto'? 'active':''" aria-current="page" :to="{ name: 'Carto' }">
      <i class="bi bi-cart3 h4"></i>
      <span  v-if=" $store.state.anotherProducts.length > 0" class="align-items-center justify-content-center translate-middle badge rounded-pill bg-secondary">
             {{ $store.state.anotherProducts.length }}
            </span>
    </router-link>
    <div class="row py-lg-5">
      <h2>SERVICIOS CLÍNICOS</h2>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="product in products"  :key="product.id">
          <div class="card shadow-sm">
            <div class="card-body">
              <p class="card-text">{{ product.name }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <CartBTN2 :product="product"/>
                </div>
                <small class="text-muted"><i class="bi bi-currency-dollar"></i>{{ product.price }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-link class="nav-link" :class="$route.name == 'Home'? 'active':''" aria-current="page" :to="{ name: 'Home' }">
    <i><h5>Volver a pagina principal</h5></i>
  </router-link>
  <div id="app">
    <PingComponent @update-status="onUpdateStatus"   />
    <h4>Estado de red recibido: {{ networkStatus }}</h4>
  </div>
</template>

<script>
import CartBTN2 from '../components/CartBTN2.vue'
import PingComponent from "../components/PingComponent.vue";
export default {

  setup() {

  },
  components :{CartBTN2, PingComponent},
  data(){
    return{
      products:[
        {id:5, name:'Radiografia',image:'', price:100},
        {id:6, name:'Examen General',image:'', price:150},
        {id:7, name:'Tomografia',image:'', price:180},
        {id:8, name:'Examen especialista', image:'', price:200  }
      ],
      networkStatus: ''
    }
  },
  methods: {
    onUpdateStatus(status) {
      this.networkStatus = status;
    }
  }

}
</script>