<template>
  <div class="container min-h-content py-5 text-center">
    <h3>Ir a emisión de facura</h3>
    <router-link class="nav-link" :class="$route.name == 'Cart1'? 'active':''" aria-current="page" :to="{ name: 'Cart1' }">
      <i class="bi bi-cart3 h4"></i>
      <span  v-if=" $store.state.cart.length > 0" class="align-items-center justify-content-center translate-middle badge rounded-pill bg-secondary">
             {{ $store.state.cart.length }}
            </span>
    </router-link>
    <div class="row py-lg-5">
      <h2>FARMACIA Pto de venta 1</h2>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="product in products"  :key="product.id">
          <div class="card shadow-sm">
            <div class="card-body">
              <p class="card-text">{{ product.name }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <CartBTN :product="product"/>
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

</template>
<script>
import CartBTN from '../components/CartBTN.vue'
export default {

  setup() {

  },
  components :{CartBTN},
  data(){
    return{
      products:[
        {id:1, name:'Primera medicina', price:10.25},
        {id:2, name:'Segunda medicina', price:15.30},
        {id:3, name:'Tercera medicina', price:18.23},
        {id:4, name:'Cuarta medicina', price:20.50}
      ]
    }
  }

}
</script>