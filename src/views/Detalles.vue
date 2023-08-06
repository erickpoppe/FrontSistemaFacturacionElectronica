<template>

  <div>
    <div class="cardo-container">
      <div class="card-row">
        <div v-for="(card, index) in cards.slice(0, 4)" :key="index" class="card">
          <h3>{{ card.title }}</h3>
          <p>{{ card.content }}</p>
          <button @click="card.buttonAction">{{ card.buttonText }}</button>
        </div>
      </div>

      <div class="card-row">
        <div v-for="(card, index) in cards.slice(4, 8)" :key="index" class="card">
          <h3>{{ card.title }}</h3>
          <p>{{ card.content }}</p>
          <button @click="card.buttonAction">{{ card.buttonText }}</button>
        </div>
      </div>

      <div class="card-row">
        <div v-for="(card, index) in cards.slice(8)" :key="index" class="card">
          <h3>{{ card.title }}</h3>
          <p>{{ card.content }}</p>
          <button @click="card.buttonAction">{{ card.buttonText }}</button>
        </div>
      </div>
    </div>
    <!-- Other elements as needed -->
  </div>
  <div id="app">
    <PingComponent @update-status="onUpdateStatus"   />
    <h4>Estado de red recibido: {{ networkStatus }}</h4>
  </div>
  <div>
    <p>
      <h4>Fecha de vigencia CUIS sucursal 0: {{ vigenciacuis }}</h4>
    </p>
    <p>
      <h4>Fecha de vigencia CUFD sucursal 0:  {{ vigenciacufd }}</h4>
    </p>
    <p>
      <h4>Fecha de vigencia CUIS sucursal 1: {{ vigenciacuis1 }}</h4>
    </p>
    <p>
      <h4>Fecha de vigencia CUFD sucursal 1:  {{ vigenciacufd1 }}</h4>
    </p>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import PingComponent from "../components/PingComponent.vue";
export default {

  setup() {

  },
  components: {
    PingComponent,
  },
  data(){
    return{
      networkStatus: '',
      vigenciacuis: '',
      vigenciacufd: '',
      vigenciacuis1: '',
      vigenciacufd1: '',
      cards: [
        {
          title: "Obtener CUIS Sucursal 0",
          content: "Renovar el CUIS para facturación",
          buttonText: "Renovar el CUIS",
          buttonAction: this.handleButton1Click
        },
        {
          title: "Obtener CUFD Sucursal 0",
          content: "Renovar el CUFD para facturación",
          buttonText: "Obtener CUFD",
          buttonAction: this.handleButton2Click
        },
        {
          title: "Facturacion online sucursal 0",
          content: "Pasar a modo de facturación con conexión",
          buttonText: "Facturación Online",
          buttonAction: this.handleButton3Click
        },
        {
          title: "Facturación offline sucursal 0",
          content: "Pasar a modo de facturación sin conexión",
          buttonText: "Facturación Offline causa 1",
          buttonAction: this.handleButton3AClick
        },
        {
          title: "Verificar Comunicación sector 1",
          content: "Verificar conexión con el SFE del SIN sector 1",
          buttonText: "Verificar",
          buttonAction: this.handleButton4Click
        },
        {
          title: "Obtener CUIS Sucursal 1",
          content: "Renovar el CUIS para facturación",
          buttonText: "Renovar el CUIS",
          buttonAction: this.handleButton5Click
        },
        {
          title: "Obtener CUFD Sucursal 1",
          content: "Renovar el CUFD para facturación",
          buttonText: "Renovar el CUIS",
          buttonAction: this.handleButton6Click
        },
        {
          title: "Facturacion online sucursal 1",
          content: "Pasar a modo de facturación con conexión",
          buttonText: "Facturación Online",
          buttonAction: this.handleButton7Click
        },
        {
          title: "Facturación offline sucursal 1",
          content: "Pasar a modo de facturación sin conexión",
          buttonText: "Facturación Offline causa 1",
          buttonAction: this.handleButton8Click
        },
        {
          title: "Verificar Comunicación sector 17",
          content: "Verificar conexión con el SFE del SIN sector 17",
          buttonText: "Verificar",
          buttonAction: this.handleButton9Click
        },
        {
          title: "Facturación offline sucursal 0",
          content: "Pasar a modo de facturación sin conexión",
          buttonText: "Facturación Offline causa 2",
          buttonAction: this.handleButton10Click
        },
        {
          title: "Facturación offline sucursal 1",
          content: "Pasar a modo de facturación sin conexión",
          buttonText: "Facturación Offline causa 2",
          buttonAction: this.handleButton11Click
        },
        {
          title: "Facturación offline sucursal 0",
          content: "Pasar a modo de facturación sin conexión",
          buttonText: "Facturación Offline causa 3",
          buttonAction: this.handleButton12Click
        },
        {
          title: "Facturación offline sucursal 1",
          content: "Pasar a modo de facturación sin conexión",
          buttonText: "Facturación Offline causa 3",
          buttonAction: this.handleButton13Click
        },
        {
          title: "Facturación offline sucursal 0",
          content: "Pasar a modo de facturación sin conexión",
          buttonText: "Facturación Offline causa 4",
          buttonAction: this.handleButton14Click
        },
        {
          title: "Facturación offline sucursal 1",
          content: "Pasar a modo de facturación sin conexión",
          buttonText: "Facturación Offline causa 4",
          buttonAction: this.handleButton15Click
        },
        {
          title: "Facturación offline sucursal 0",
          content: "Pasar a modo de facturación sin conexión",
          buttonText: "Facturación Offline causa 5",
          buttonAction: this.handleButton16Click
        },
        {
          title: "Facturación offline sucursal 1",
          content: "Pasar a modo de facturación sin conexión",
          buttonText: "Facturación Offline causa 5",
          buttonAction: this.handleButton17Click
        },
        {
          title: "Facturación offline sucursal 0",
          content: "Pasar a modo de facturación sin conexión",
          buttonText: "Facturación Offline causa 6",
          buttonAction: this.handleButton18Click
        },
        {
          title: "Facturación offline sucursal 1",
          content: "Pasar a modo de facturación sin conexión",
          buttonText: "Facturación Offline causa 6",
          buttonAction: this.handleButton19Click
        },
        {
          title: "Facturación offline sucursal 0",
          content: "Pasar a modo de facturación sin conexión",
          buttonText: "Facturación Offline causa 7",
          buttonAction: this.handleButton20Click
        },
        {
          title: "Facturación offline sucursal 1",
          content: "Pasar a modo de facturación sin conexión",
          buttonText: "Facturación Offline causa 7",
          buttonAction: this.handleButton21Click
        }
      ],




    }
  },
  methods: {
    handleButton1Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/admin/proveedores/cuis/actualizar?proveedorKey=T1-N392010028-S0-P0';
      const headers = { 'accept': 'application/json' };
      let toastMSG;
      let cuis;
      axios.put(url, null,{headers},)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.ok == true) {
              cuis = this.responseData.data.cuis.codigo;
              toastMSG = 'El código CUIS está vigente.\n CUIS: ' + cuis;
              this.vigenciacuis = this.responseData.data.cuis.fechaVigencia;

            } else {
              toastMSG = 'No se pudo renovar el codigo CUIS'
            };
            toast(toastMSG, {
              autoClose: 3500,
            });
          })
          .catch(error => {
            console.error(error);
          });

    },
    handleButton2Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/admin/proveedores/cufd/actualizar?proveedorKey=T1-N392010028-S0-P0';
      const headers = { 'accept': 'application/json' };
      let toastMSG;
      let cufd;
      axios.put(url, null,{headers},)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.ok == true) {
              cufd = this.responseData.data.cufd.codigo;
              toastMSG = 'El código CUFD está vigente.\n CUFD: ' + cufd;
              this.vigenciacufd = this.responseData.data.cufd.fechaVigencia;

            } else {
              toastMSG = 'No se pudo renovar el codigo CUFD'
            };
            toast(toastMSG, {
              autoClose: 3500,
            });
          })
          .catch(error => {
            console.error(error);
          });

    },
    handleButton3Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/on_line?proveedorKey=T1-N392010028-S0-P0';
      const headers = { 'accept': 'application/json' };
      let toastMSG;
      axios.put(url, null,{headers},)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.messages == "Ya estaba en modo online") {
              toastMSG = 'Ya estaba en modo online'
            } else {
              if (this.responseData.ok == true) {
                toastMSG = 'Se pasó a modo online'
              } else {
                toastMSG = 'No se pudo pasar a modo online'
              }
            };
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });

    },
    handleButton3AClick() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/off_line';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };
      let toastMSG;
      axios.put(url, { proveedorKey: 'T1-N392010028-S0-P0', codigoMotivoEvento: 1, descripcion: 'Internet bajo' }, { headers },)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.messages == "Ya estaba en modo offline") {
              toastMSG = 'Ya estaba en modo offline'
            } else {
              if (this.responseData.ok == true) {
                toastMSG = 'Se pasó a modo offline por falla de Internet'
              } else {
                toastMSG = 'No se pudo pasar a modo offline'
              }
            };
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });
    },
    handleButton4Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion?codigoSector=1';
      const headers = { 'accept': 'application/json' };
      let toastMSG;
      axios.get(url, { headers })
          .then(response => {
            this.responseData = response.data;
            this.responseData.ok?  toastMSG = 'Si existe comunicación' :  toastMSG = 'No existe comunicación'
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });
    },
    handleButton5Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/admin/proveedores/cuis/actualizar?proveedorKey=T1-N392010028-S0-P1';
      const headers = { 'accept': 'application/json' };
      let toastMSG;
      let cuis;
      axios.put(url, null,{headers},)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.ok == true) {
              cuis = this.responseData.data.cuis.codigo;
              toastMSG = 'El código CUIS está vigente.\n CUIS: ' + cuis;
              this.vigenciacuis1 = this.responseData.data.cuis.fechaVigencia;

            } else {
              toastMSG = 'No se pudo renovar el codigo CUIS'
            };
            toast(toastMSG, {
              autoClose: 3500,
            });
          })
          .catch(error => {
            console.error(error);
          });

    },
    handleButton6Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/admin/proveedores/cufd/actualizar?proveedorKey=T1-N392010028-S0-P1';
      const headers = { 'accept': 'application/json' };
      let toastMSG;
      let cufd;
      axios.put(url, null,{headers},)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.ok == true) {
              cufd = this.responseData.data.cufd.codigo;
              toastMSG = 'El código CUFD está vigente.\n CUFD: ' + cufd;
              this.vigenciacufd1 = this.responseData.data.cufd.fechaVigencia;

            } else {
              toastMSG = 'No se pudo renovar el codigo CUFD'
            };
            toast(toastMSG, {
              autoClose: 3500,
            });
          })
          .catch(error => {
            console.error(error);
          });

    },
    handleButton7Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/on_line?proveedorKey=T1-N392010028-S0-P1';
      const headers = { 'accept': 'application/json' };
      let toastMSG;
      axios.put(url, null,{headers},)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.messages == "Ya estaba en modo online") {
              toastMSG = 'Ya estaba en modo online'
            } else {
              if (this.responseData.ok == true) {
                toastMSG = 'Se pasó a modo online'
              } else {
                toastMSG = 'No se pudo pasar a modo online'
              }
            };
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });

    },
    handleButton8Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/off_line';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };
      let toastMSG;
      axios.put(url, { proveedorKey: 'T1-N392010028-S0-P1', codigoMotivoEvento: 1, descripcion: 'Internet bajo' }, { headers },)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.messages == "Ya estaba en modo offline") {
              toastMSG = 'Ya estaba en modo offline'
            } else {
              if (this.responseData.ok == true) {
                toastMSG = 'Se pasó a modo offline por falla de Internet'
              } else {
                toastMSG = 'No se pudo pasar a modo offline'
              }
            };
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });
    },
    handleButton9Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion?codigoSector=17';
      const headers = { 'accept': 'application/json' };
      let toastMSG;
      axios.get(url, { headers })
          .then(response => {
            this.responseData = response.data;
            this.responseData.ok?  toastMSG = 'Si existe comunicación' :  toastMSG = 'No existe comunicación'
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });
    },
    handleButton10Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/off_line';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };
      let toastMSG;
      axios.put(url, { proveedorKey: 'T1-N392010028-S0-P0', codigoMotivoEvento: 2, descripcion: 'Inaccesibilidad al servicio web' }, { headers },)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.messages == "Ya estaba en modo offline") {
              toastMSG = 'Ya estaba en modo offline'
            } else {
              if (this.responseData.ok == true) {
                toastMSG = 'Se pasó a modo offline por Inaccesibilidad al servicio web'
              } else {
                toastMSG = 'No se pudo pasar a modo offline'
              }
            };
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });
    },
    handleButton11Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/off_line';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };
      let toastMSG;
      axios.put(url, { proveedorKey: 'T1-N392010028-S0-P1', codigoMotivoEvento: 2, descripcion: 'Inaccesibilidad al servicio web' }, { headers },)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.messages == "Ya estaba en modo offline") {
              toastMSG = 'Ya estaba en modo offline'
            } else {
              if (this.responseData.ok == true) {
                toastMSG = 'Se pasó a modo offline por Inaccesibilidad al servicio web'
              } else {
                toastMSG = 'No se pudo pasar a modo offline'
              }
            };
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });
    },
    handleButton12Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/off_line';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };
      let toastMSG;
      axios.put(url, { proveedorKey: 'T1-N392010028-S0-P0', codigoMotivoEvento: 3, descripcion: 'Ingreso a zonas sin internet' }, { headers },)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.messages == "Ya estaba en modo offline") {
              toastMSG = 'Ya estaba en modo offline'
            } else {
              if (this.responseData.ok == true) {
                toastMSG = 'Se pasó a modo offline por Ingreso a zonas sin Internet'
              } else {
                toastMSG = 'No se pudo pasar a modo offline'
              }
            };
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });
    },
    handleButton13Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/off_line';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };
      let toastMSG;
      axios.put(url, { proveedorKey: 'T1-N392010028-S0-P1', codigoMotivoEvento: 3, descripcion: 'Ingreso a zonas sin internet' }, { headers },)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.messages == "Ya estaba en modo offline") {
              toastMSG = 'Ya estaba en modo offline'
            } else {
              if (this.responseData.ok == true) {
                toastMSG = 'Se pasó a modo offline por Ingreso a zonas sin Internet'
              } else {
                toastMSG = 'No se pudo pasar a modo offline'
              }
            };
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });
    },
    handleButton14Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/off_line';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };
      let toastMSG;
      axios.put(url, { proveedorKey: 'T1-N392010028-S0-P0', codigoMotivoEvento: 4, descripcion: 'Venta en lugares sin Internet' }, { headers },)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.messages == "Ya estaba en modo offline") {
              toastMSG = 'Ya estaba en modo offline'
            } else {
              if (this.responseData.ok == true) {
                toastMSG = 'Se pasó a modo offline por Venta en lugares sin Internet'
              } else {
                toastMSG = 'No se pudo pasar a modo offline'
              }
            };
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });
    },
    handleButton15Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/off_line';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };
      let toastMSG;
      axios.put(url, { proveedorKey: 'T1-N392010028-S0-P1', codigoMotivoEvento: 4, descripcion: 'Venta en lugares sin Internet' }, { headers },)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.messages == "Ya estaba en modo offline") {
              toastMSG = 'Ya estaba en modo offline'
            } else {
              if (this.responseData.ok == true) {
                toastMSG = 'Se pasó a modo offline por Venta en lugares sin Internet'
              } else {
                toastMSG = 'No se pudo pasar a modo offline'
              }
            };
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });
    },
    handleButton16Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/off_line';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };
      let toastMSG;
      axios.put(url, { proveedorKey: 'T1-N392010028-S0-P0', codigoMotivoEvento: 5, descripcion: 'Virus informatico o falla de software.' }, { headers },)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.messages == "Ya estaba en modo offline") {
              toastMSG = 'Ya estaba en modo offline'
            } else {
              if (this.responseData.ok == true) {
                toastMSG = 'Se pasó a modo offline por Virus informatico o falla de software'
              } else {
                toastMSG = 'No se pudo pasar a modo offline'
              }
            };
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });
    },
    handleButton17Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/off_line';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };
      let toastMSG;
      axios.put(url, { proveedorKey: 'T1-N392010028-S0-P1', codigoMotivoEvento: 5, descripcion: 'Virus informatico o falla de software.' }, { headers },)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.messages == "Ya estaba en modo offline") {
              toastMSG = 'Ya estaba en modo offline'
            } else {
              if (this.responseData.ok == true) {
                toastMSG = 'Se pasó a modo offline por  Virus informatico o falla de software'
              } else {
                toastMSG = 'No se pudo pasar a modo offline'
              }
            };
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });
    },
    handleButton18Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/off_line';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };
      let toastMSG;
      axios.put(url, { proveedorKey: 'T1-N392010028-S0-P0', codigoMotivoEvento: 6, descripcion: 'Cambio de infraestructura de sistema o falla de hardware.' }, { headers },)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.messages == "Ya estaba en modo offline") {
              toastMSG = 'Ya estaba en modo offline'
            } else {
              if (this.responseData.ok == true) {
                toastMSG = 'Se pasó a modo offline por Cambio de infraestructura de sistema o falla de hardware'
              } else {
                toastMSG = 'No se pudo pasar a modo offline'
              }
            };
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });
    },
    handleButton19Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/off_line';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };
      let toastMSG;
      axios.put(url, { proveedorKey: 'T1-N392010028-S0-P1', codigoMotivoEvento: 6, descripcion: 'Cambio de infraestructura de sistema o falla de hardware.' }, { headers },)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.messages == "Ya estaba en modo offline") {
              toastMSG = 'Ya estaba en modo offline'
            } else {
              if (this.responseData.ok == true) {
                toastMSG = 'Se pasó a modo offline por Cambio de infraestructura de sistema o falla de hardware'
              } else {
                toastMSG = 'No se pudo pasar a modo offline'
              }
            };
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });
    },
    handleButton20Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/off_line';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };
      let toastMSG;
      axios.put(url, { proveedorKey: 'T1-N392010028-S0-P0', codigoMotivoEvento: 7, descripcion: 'Corte de suministro de energia electrica.' }, { headers },)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.messages == "Ya estaba en modo offline") {
              toastMSG = 'Ya estaba en modo offline'
            } else {
              if (this.responseData.ok == true) {
                toastMSG = 'Se pasó a modo offline por Corte de suministro de energia electrica'
              } else {
                toastMSG = 'No se pudo pasar a modo offline'
              }
            };
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });
    },
    handleButton21Click() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/off_line';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };
      let toastMSG;
      axios.put(url, { proveedorKey: 'T1-N392010028-S0-P1', codigoMotivoEvento: 7, descripcion: 'Corte de suministro de energia electrica.' }, { headers },)
          .then(response => {
            this.responseData = response.data;
            if (this.responseData.messages == "Ya estaba en modo offline") {
              toastMSG = 'Ya estaba en modo offline'
            } else {
              if (this.responseData.ok == true) {
                toastMSG = 'Se pasó a modo offline por Corte de suministro de energia electrica.'
              } else {
                toastMSG = 'No se pudo pasar a modo offline'
              }
            };
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });
    },
    onUpdateStatus(status) {
      this.networkStatus = status;
    }



  }

}

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