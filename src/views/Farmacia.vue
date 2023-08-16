  <template>
  <div class="container min-h-content py-5 text-center">
    <h3>Ir a emisión de facura</h3>
    <router-link class="nav-link" :class="$route.name == 'Cart'? 'active':''" aria-current="page" :to="{ name: 'Cart' }">
      <i class="bi bi-cart3 h4"></i>
      <span  v-if=" $store.state.cart.length > 0" class="align-items-center justify-content-center translate-middle badge rounded-pill bg-secondary">
             {{ $store.state.cart.length }}
            </span>
    </router-link>
    <div class="row py-lg-5">
      <h2>FARMACIA</h2>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="product in products"  :key="product.id">
          <div class="card shadow-sm">
            <div class="card-body">
              <p class="card-text">{{ product.name }}</p>
              <p class="card-text">{{ product.descripcion }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <CartBTN :product="product"/>
                </div>
                <small class="text-muted"><i>Bs. </i>{{ product.price }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container min-h-content py-5 text-center">
    <!-- ... your existing content ... -->

    <h5>BUSCAR Y AGREGAR PRODUCTO</h5>
    <div class="discount-container">
      <input type="text" id="buscaragregar" v-model="buscaragregar">
      <br><br>
      <button type="button" @click="buscarAgregar" class="btn btn-info btn-block btn-lg">
        Buscar y Agregar producto
      </button>
    </div>
    <br><br>

    <div id="app">
      <CardComponent />
    </div>
    <button type="button" @click="enviarPaquete" class="btn btn-info btn-block btn-lg">
      Enviar Paquete
    </button><br><br>
    <button type="button" @click="enviarPaqueteCafc" class="btn btn-info btn-block btn-lg">
      Enviar Paquete CAFC
    </button>

  </div>
  <div><pre>{{ receivedData8 }}</pre></div>
  <div id="app">
    <PingComponent @update-status="onUpdateStatus"   />
    <h4>Estado de red recibido: {{ networkStatus }}</h4>
  </div>




</template>
<script>
import CartBTN from '../components/CartBTN.vue'
import axios from "axios";
import {toast} from "vue3-toastify";
import PingComponent from "../components/PingComponent.vue";
import CardComponent from "../components/CardComponent.vue";

export default {

  setup() {

  },
  components :{CartBTN, PingComponent, CardComponent},
  data(){
    return{
      buscaragregar: '',
      networkStatus: '',
      receivedData8: null,
      motivoanular: null,
      nroimprimir: null,
      products:[
        {id:1, name:'Primera medicina', price:10.25, descripcion: "primera"},
        {id:2, name:'Segunda medicina', price:15.30, descripcion: "segunda"},
        {id:3, name:'Tercera medicina', price:18.23, descripcion: "tercera"},
        {id:4, name:'Cuarta medicina', price:20.50, descripcion: "cuarta"}
      ]
    }
  },
  methods: {
    buscarAgregar(){
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/config/productos?proveedorKey=T1-N392010028-S0-P0';
      const headers = { 'accept': 'application/json' };
      axios.put(url, null,{headers},)
          .then(response => {
            this.receivedData8 = response.data;
            if (this.receivedData8.ok == true) {
              toast("Datos recibidos.", {
                autoClose: 2000,
              });
              const vectorData = this.receivedData8.data;
              const elementToMatch = vectorData.find(item => item.codigo === this.buscaragregar);
              if (elementToMatch) {
                const codigo = elementToMatch.codigo;
                const name = elementToMatch.nombre;
                const price = elementToMatch.precioUnitario;
                const descripcion = elementToMatch.descripcion;

                this.products.push({
                  id: this.products.length + 1,
                  name: name,
                  price: price,
                  descripcion: codigo,
                });

                console.log(codigo);
                console.log(name);
                console.log(price);
                console.log(descripcion);

                console.log("Element added to products array:", elementToMatch);

              } else {
                console.log("Element with the entered codigo not found");
                toast("Producto no encontrado.", {
                  autoClose: 2000,
                });

              };

            } else {
              console.log("Datos no recibidos.")

            };
          });
    },
    onUpdateStatus(status) {
      this.networkStatus = status;
    },
    enviarPaquete(){
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/on_line?proveedorKey=T1-N392010028-S0-P0';
      const headers = { 'accept': 'application/json' };
      let codigo;
      axios.put(url, null,{headers},)
          .then(response => {
            this.receivedData6 = response.data;
            if (this.receivedData6.messages == "Ya estaba en modo online" || this.receivedData6.ok == true) {
              codigo = this.receivedData6.data.cufdEvento.codigoEvento;
              console.log(codigo);
              const url1 = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/enviar';
              const headers1 = { 'accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' };
              axios.put(url1, { gestion: 2023, periodo: 8, proveedorKey: "T1-N392010028-S0-P0", codigoSector: 1, codigoEvento:codigo, cafc: "" }, {headers1})
                  .then(responser => {
                    this.receivedData7 = responser.data;
                    if (this.receivedData7.ok == true && this.receivedData7.data > 0) {
                      toast( "Paquete enviado", {
                        autoClose: 2000,
                      });
                    } else {
                      toast( "Paquete NO enviado", {
                        autoClose: 2000,
                      });
                    };
                  })
            } else {
              toast("No esta en modo online", {
                autoClose: 2000,
              });
            };
          });

    },
    enviarPaqueteCafc(){
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/on_line?proveedorKey=T1-N392010028-S0-P0';
      const headers = { 'accept': 'application/json' };
      let codigo;
      axios.put(url, null,{headers},)
          .then(response => {
            this.receivedData6 = response.data;
            if (this.receivedData6.messages == "Ya estaba en modo online" || this.receivedData6.ok == true) {
              codigo = this.receivedData6.data.cufdEvento.codigoEvento;
              console.log(codigo);
              const url1 = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/enviar';
              const headers1 = { 'accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' };
              axios.put(url1, { gestion: 2023, periodo: 8, proveedorKey: "T1-N392010028-S0-P0", codigoSector: 1, codigoEvento:codigo, cafc: "101FC6CC6CD7E" }, {headers1})
                  .then(responser => {
                    this.receivedData7 = responser.data;
                    if (this.receivedData7.ok == true && this.receivedData7.data > 0) {
                      toast( "Paquete enviado", {
                        autoClose: 2000,
                      });
                    } else {
                      toast( "Paquete NO enviado", {
                        autoClose: 2000,
                      });
                    };
                  })
            } else {
              toast("No esta en modo online", {
                autoClose: 2000,
              });
            };
          });

    }
  }

}
</script>

<style>

.discount-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>