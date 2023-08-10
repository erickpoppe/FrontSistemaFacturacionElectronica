<template>
  <section class="h-100 h-custom min-h-content" >
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="card border-0">
            <div class="card-body p-4">

              <div class="row">
                <div class="col-lg-7">
                  <h5 class="mb-3"><router-link :to="{name:'Sclinicos'}" class="text-body"><i
                      class="fas fa-long-arrow-alt-left me-2"></i>Volver a Servicios Clínicos</router-link></h5>
                  <hr>

                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <p class="mb-0">Usted tiene {{ $store.state.anotherProducts.length }} items en su factura.</p>
                    </div>
                  </div>

                  <div v-for="item in $store.state.anotherProducts" class="card mb-3 shadow-sm border-0" :key="item.id">
                    <div class="card-body">
                      <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row align-items-center">
                          <div></div>
                          <div class="ms-3">
                            <p>{{ item.name }}</p>
                          </div>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                          <div >
                            <CartAddRemove2 :product="item"/>
                          </div>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                          <div >
                            <h5 class="mb-0"><i class="bi bi-currency-dollar"></i>{{ getFormattedTotal(item) }}</h5>
                            <small v-if="item.hasDiscount" class="text-muted text-decoration-line-through"><i class="bi bi-currency-dollar"></i>{{ item.price}}</small>
                          </div>
                            <a role="button" @click="removeItem(item)" class="ms-4" style="color: #cecece;"><i class="bi bi-trash3 h4"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div class="col-lg-5">

                  <div class="card bg-primary text-white rounded-0 border-0">
                    <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5 class="mb-0">Detalles de compra Servicios Clínicos</h5>
                        <i class="bi bi-cart3 h1"></i>
                      </div>
                      <hr class="my-4">
                      <div class="d-flex justify-content-between">
                        <p class="mb-2">Subtotal</p>
                        <p class="mb-2"><i class="bi bi-currency-dollar"></i>{{ $store.state.anotherTotal }}</p>
                      </div>
                      <div class="d-flex justify-content-between mb-4">
                        <p class="mb-2">Total</p>
                        <p class="mb-2"><i class="bi bi-currency-dollar"></i>{{ $store.state.anotherTotal }}</p>
                      </div>
                      <div class="mb-3">
                        <label for="razonsocial" class="form-label">Razón Social</label>
                        <input type="text" class="form-control" id="razonsocial" v-model="formData.razonsocial">
                      </div>
                      <div class="mb-3">
                        <label for="nrodocumento" class="form-label">Numero Documento</label>
                        <input type="text" class="form-control" id="nrodocumento" v-model="formData.nrodocumento">
                      </div>
                      <div class="mb-3">
                        <label for="tipoDocumentoIdentidad" class="form-label">Tipo de Documento de Identidad</label>
                        <select id="tipoDocumentoIdentidad" class="form-select" v-model="formData.tipoDocumentoIdentidad">
                          <option value="1">Cédula de identidad</option>
                          <option value="2">Cédula de identidad de extranjero</option>
                          <option value="3">Pasaporte</option>
                          <option value="4">Otro documento de identidad</option>
                          <option value="5">Número de identificación tributaria</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="numerofactura" class="form-label">Numero Factura</label>
                        <input type="number" class="form-control" id="numerofactura" v-model="formData.numerofactura">
                      </div>
                      <div class="mb-3">
                        <label for="email" class="form-label">Codigo de cliente</label>
                        <input type="email" class="form-control" id="email" v-model="formData.email">
                      </div>
                      <div class="mb-3">
                        <label for="complemento" class="form-label">Complemento</label>
                        <input type="text" class="form-control" id="complemento" v-model="formData.complemento">
                      </div><br>
                      <div class="mb-3">
                        <label for="modalidadservicio" class="form-label">Modalidad de Servicio</label>
                        <input type="text" class="form-control" id="modalidadservicio" v-model="formData.modalidadservicio">
                      </div>
                      <button type="button"  @click="crearFactura" class="btn btn-info btn-block btn-lg">
                        Crear Factura
                      </button><br><br>
                      <button type="button"  @click="procesarFactura" class="btn btn-info btn-block btn-lg">
                        Procesar Factura
                      </button><br><br>
                      <button type="button" @click="enviarFactura" class="btn btn-info btn-block btn-lg">
                        Enviar Factura
                      </button><br><br>
                      <button type="button"  @click="facturarOffline" class="btn btn-info btn-block btn-lg">
                        Facturar Offline
                      </button><br><br>
                      <button type="button"  @click="facturarOfflineCafc" class="btn btn-info btn-block btn-lg">
                        Facturar Offline con CAFC
                      </button><br><br>
                      <button type="button"  @click="enviarPaquete" class="btn btn-info btn-block btn-lg">
                        Enviar Paquete
                      </button><br><br>
                      <button type="button"  @click="enviarPaqueteCafc" class="btn btn-info btn-block btn-lg">
                        Enviar Paquete con CAFC
                      </button><br><br>

                      <div v-if="this.receivedData2">
                        <div v-for="(detalle, index) in receivedData2.data.detalles" :key="index">
                          <div class="mb-3">
                            <label :for="'discount_' + index" class="form-label">Descuento para item {{ index + 1 }}</label>
                            <input
                                :id="'discount_' + index"
                                type="number"
                                class="form-control"
                                v-model="detalle.montoDescuento"
                            >
                          </div>
                        </div>
                      </div>
                      <button type="button"  @click="aplicarDctos" class="btn btn-info btn-block btn-lg">
                        Aplicar Descuentos
                      </button><br><br>
                      <h5>DESCUENTO ADICIONAL SOBRE EL TOTAL</h5>
                      <div class="mb-3">
                        <label for="dctototal" class="form-label">Descuento adicional sobre el total</label>
                        <input type="number" class="form-control" id="dctototal" v-model="dctototal"></div>
                      <button type="button"  @click="dctoTotal" class="btn btn-info btn-block btn-lg">
                        Descuento sobre el total
                      </button><br><br>
                      <h5>GIFT CARD</h5>
                      <div class="mb-3">
                        <label for="giftcard" class="form-label">Monto de Giftcard</label>
                        <input type="number" class="form-control" id="giftcard" v-model="giftcard"></div>
                      <button type="button"  @click="giftCard" class="btn btn-info btn-block btn-lg">
                        Aplicar valor del GiftCard
                      </button>
                      <h5>PAGO CON TARJETA</h5>
                      <div class="mb-3">
                        <label for="tarjeta" class="form-label">Número de tarjeta:</label>
                        <input id="tarjeta" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="xxxx xxxx xxxx xxxx"></div>
                      <button type="button"  @click="pagoTarjeta" class="btn btn-info btn-block btn-lg">
                        Pago con tarjeta
                      </button><br>
                      <div class="mb-3">
                        <h5>PAGO POR TRANSFERENCIA BANCARIA</h5>
                        <button type="button"  @click="pagoTransferencia" class="btn btn-info btn-block btn-lg">
                          Pago por transferencia bancaria
                        </button><br><br> </div>
                        <!-- ... Your existing template code ... -->
                        <div v-if="this.receivedData2">
                          <div v-for="(detalle, index) in receivedData2.data.detalles" :key="index">
                            <!-- Other fields... -->

                            <!-- Dynamically generate input fields for each JSON object -->
                            <div class="mb-3">
                              <label :for="'especialidad_' + index" class="form-label">Especialidad para item {{ index + 1 }}</label>
                              <input
                                  :id="'especialidad_' + index"
                                  type="text"
                                  class="form-control"
                                  v-model="detalle.especialidad"
                              >
                            </div>

                            <div class="mb-3">
                              <label :for="'especialidadDetalle_' + index" class="form-label">Especialidad Detalle para item {{ index + 1 }}</label>
                              <input
                                  :id="'especialidadDetalle_' + index"
                                  type="text"
                                  class="form-control"
                                  v-model="detalle.especialidadDetalle"
                              >
                            </div>

                            <div class="mb-3">
                              <label :for="'nroQuirofanoSalaOperaciones_' + index" class="form-label">Nro Quirofano/Sala Operaciones para item {{ index + 1 }}</label>
                              <input
                                  :id="'nroQuirofanoSalaOperaciones_' + index"
                                  type="text"
                                  class="form-control"
                                  v-model="detalle.nroQuirofanoSalaOperaciones"
                              >
                            </div>

                            <div class="mb-3">
                              <label :for="'especialidadMedico_' + index" class="form-label">Especialidad Medico para item {{ index + 1 }}</label>
                              <input
                                  :id="'especialidadMedico_' + index"
                                  type="text"
                                  class="form-control"
                                  v-model="detalle.especialidadMedico"
                              >
                            </div>

                            <div class="mb-3">
                              <label :for="'nombreApellidoMedico_' + index" class="form-label">Nombre y Apellido Medico para item {{ index + 1 }}</label>
                              <input
                                  :id="'nombreApellidoMedico_' + index"
                                  type="text"
                                  class="form-control"
                                  v-model="detalle.nombreApellidoMedico"
                              >
                            </div>

                            <div class="mb-3">
                              <label :for="'nitDocumentoMedico_' + index" class="form-label">Nit/Documento Medico para item {{ index + 1 }}</label>
                              <input
                                  :id="'nitDocumentoMedico_' + index"
                                  type="text"
                                  class="form-control"
                                  v-model="detalle.nitDocumentoMedico"
                              >
                            </div>

                            <div class="mb-3">
                              <label :for="'nroMatriculaMedico_' + index" class="form-label">Nro Matricula Medico para item {{ index + 1 }}</label>
                              <input
                                  :id="'nroMatriculaMedico_' + index"
                                  type="text"
                                  class="form-control"
                                  v-model="detalle.nroMatriculaMedico"
                              >
                            </div>

                            <div class="mb-3">
                              <label :for="'nroFacturaMedico_' + index" class="form-label">Nro Factura Medico para item {{ index + 1 }}</label>
                              <input
                                  :id="'nroFacturaMedico_' + index"
                                  type="text"
                                  class="form-control"
                                  v-model="detalle.nroFacturaMedico"
                              >
                            </div>
                          </div>
                        </div>
                      <button type="button"  @click="procesarDetalles" class="btn btn-info btn-block btn-lg">
                        Procesar Detalles
                      </button>
                      <h5>ANULAR FACTURA</h5>
                      <div class="mb-3">
                        <label for="nroanular" class="form-label">Numero de Factura a Anular</label>
                        <input type="number" class="form-control" id="nroanular" v-model="nroanular"></div>
                      <button type="button"  @click="anularFac" class="btn btn-info btn-block btn-lg">
                        Anular Factura
                      </button><br><br>
                      <div class="mb-3">
                        <label for="motivoanular" class="form-label">Motivo de Anulación</label>
                        <select id="motivoanular" class="form-select" v-model="motivoanular">
                          <option value="1">FACTURA MAL EMITIDA</option>
                          <option value="2">NOTA DE CREDITO-DEBITO MAL EMITIDA</option>
                          <option value="3">DATOS DE EMISION INCORRECTOS</option>
                          <option value="4">FACTURA O NOTA DE CREDITO-DEBITO DEVUELTA</option>
                        </select>
                      </div><br><br>
                      <div class="mb-3">
                        <label for="nroimprimir" class="form-label">Numero de Factura a Imprimir</label>
                        <input type="number" class="form-control" id="nroimprimir" v-model="nroimprimir"></div>
                      <button type="button"  @click="imprimirFac" class="btn btn-info btn-block btn-lg">
                        Imprimir Factura
                      </button>

                    </div>

                    </div>



                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <pre>{{ receivedData2 }}</pre>
    </div>
    <div>
      <pre>{{ receivedData5 }}</pre>


    </div>
    <div>
      <pre>{{ receivedData7 }}</pre>
    </div>
    <div id="app">
      <PingComponent @update-status="onUpdateStatus" />
      <h4>Estado de red recibido: {{ networkStatus }}</h4>
    </div>
  </section>
</template>
<script>
import CartAddRemove2 from '../components/CartAddRemove2.vue';
import axios from "axios";
import { saveAs } from 'file-saver';
import {toast} from "vue3-toastify";
import PingComponent from "../components/PingComponent.vue";
export default{
  components :{CartAddRemove2, PingComponent},
  methods: {
    removeItem(item) {
      this.$store.commit('addRemoveAnotherCart', {product: item, toAdd: false})
    },
    crearFactura() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/crear?proveedorKey=T1-N392010028-S0-P0&codigoSector=17';
      const headers = {'accept': 'application/json'};
      let toastMSG;
      axios.put(url, null, {headers})
          .then(response => {
            this.receivedData = response.data;
            this.receivedData.ok ? toastMSG = 'Se creó la factura.' : toastMSG = 'No se creó la factura.'
            toast(toastMSG, {
              autoClose: 1500,
            });
          })
          .catch(error => {
            console.error(error);
          });
    },
    replicateDetalles(venta) {
      const detallesCopy = {...this.receivedData.data.detalles[0]};
      detallesCopy.codigoProducto = `P${venta.id}`;
      detallesCopy.descripcion = venta.name;
      detallesCopy.precioUnitario = venta.price;
      detallesCopy.cantidad = venta.qty;
      detallesCopy.subTotal = venta.price * venta.qty;

      return detallesCopy;
    },
    calculateSumSubtotal(detalles) {
      return detalles.reduce((total, obj) => total + obj.subTotal, 0);
    },

    procesarFactura() {
      if (this.receivedData) {
        this.receivedData.data.detalles[0].actividadEconomica = 862010;
        this.receivedData.data.detalles[0].codigoProductoSin = 99100;
        this.receivedData.data.detalles[0].nombreApellidoMedico = "Medicmel";
        this.receivedData.data.detalles[0].nitDocumentoMedico = 392010028;
        const replicatedDetalles = this.ventasData.map(this.replicateDetalles);
        const updatedData = {...this.receivedData.data, detalles: replicatedDetalles};
        this.receivedData2 = {...this.receivedData, data: updatedData};
      };

      this.receivedData2.data.cabecera.nombreRazonSocial = this.formData.razonsocial;
      this.receivedData2.data.cabecera.numeroDocumento = this.formData.nrodocumento;
      this.receivedData2.data.cabecera.numeroFactura = this.formData.numerofactura;
      this.receivedData2.data.cabecera.codigoCliente = this.formData.email;
      this.receivedData2.data.cabecera.complemento = this.formData.complemento;
      this.receivedData2.data.cabecera.modalidadServicio = this.formData.modalidadservicio;
      this.receivedData2.data.cabecera.codigoTipoDocumentoIdentidad = this.formData.tipoDocumentoIdentidad;

      toast("La factura fue procesada y esta lista para editar en cada ítem.", {
        autoClose: 2000,
      });
    },

    enviarFactura() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/emitir?codigoSector=17';
      const headers = {'accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8'};
      axios.post(url, this.receivedData2, {headers})
          .then(response => {
            this.receivedData5 = response.data;
            this.formData.razonsocial = '';
            this.formData.nrodocumento = '';
            this.formData.numerofactura = null;
            this.formData.email = '';
            this.formData.modalidadservicio = '';
            if (this.receivedData5.data.cabecera.codigoEstado == 908) {
              toast("La factura fue procesada exitosamente 908", {
                autoClose: 2000,
              });
            } else {
              toast("La factura no fue procesada exitosamente.", {
                autoClose: 2000,
              });
            }
            ;

          });
    },
    facturarOffline() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/emitir?codigoSector=17';
      const headers = {'accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8'};



      this.receivedData2.data.cabecera.codigoExcepcion = 1;
      this.receivedData2.data.cabecera.cafc = '';
      axios.post(url, this.receivedData2, {headers})
            .then(response => {
              this.receivedData5 = response.data;
              this.formData.razonsocial = '';
              this.formData.nrodocumento = '';
              this.formData.numerofactura = null;
              this.formData.email = '';
              this.formData.modalidadservicio = '';
              if (this.receivedData5.data.cabecera.codigoEstado == null && this.receivedData5.ok == true) {
                toast("La factura fue guardada.", {
                  autoClose: 2000,
                });
              } else {
                toast("La factura NO fue guardada.", {
                  autoClose: 2000,
                });
              };

            });

    },
    facturarOfflineCafc(){
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/emitir?codigoSector=17';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' };
      this.receivedData2.data.cabecera.codigoExcepcion = 1;
      this.receivedData2.data.cabecera.cafc = "1176CE9CDC85E";
      axios.post(url, this.receivedData2, { headers })
          .then(response => {
            this.receivedData5 = response.data;
            this.formData.razonsocial = '';
            this.formData.nrodocumento = '';
            this.formData.numerofactura = null;
            this.formData.email = '';
            if(this.receivedData5.data.cabecera.codigoEstado == null && this.receivedData5.ok == true) {
              toast("La factura fue guardada.", {
                autoClose: 2000,
              });
            } else {
              toast("La factura NO fue guardada.", {
                autoClose: 2000,
              });
            };

          });

    },
    enviarPaquete() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/on_line?proveedorKey=T1-N392010028-S0-P0';
      const headers = { 'accept': 'application/json' };
      let codigo;
      axios.put(url, null, {headers})
          .then(response => {
            this.receivedData6 = response.data;
            if (this.receivedData6.messages == "Ya estaba en modo online" || this.receivedData6.ok == true) {
              codigo = this.receivedData6.data.cufdEvento.codigoEvento;
              console.log(codigo);
              const url1 = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/enviar';
              const headers1 = { 'accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' };
              axios.put(url1, { gestion: 2023, periodo: 8, proveedorKey: "T1-N392010028-S0-P0", codigoSector: 17, codigoEvento: codigo, cafc: "" }, {headers1})
                  .then(responser => {
                    this.receivedData7 = responser.data;
                    if (this.receivedData7.ok == true && this.receivedData7.data > 0) {
                      toast("Paquete enviado", {
                        autoClose: 2000,
                      });
                    } else {
                      toast("Paquete NO enviado", {
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
    enviarPaqueteCafc() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/on_line?proveedorKey=T1-N392010028-S0-P0';
      const headers = {'accept': 'application/json'};
      let codigo;
      axios.put(url, null, {headers},)
          .then(response => {
            this.receivedData6 = response.data;
            if (this.receivedData6.messages == "Ya estaba en modo online" || this.receivedData6.ok == true) {
              codigo = this.receivedData6.data.cufdEvento.codigoEvento;
              console.log(codigo);
              const url1 = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/enviar';
              const headers1 = {'accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8'};
              axios.put(url1, {
                gestion: 2023,
                periodo: 8,
                proveedorKey: "T1-N392010028-S0-P0",
                codigoSector: 17,
                codigoEvento: codigo,
                cafc: "1176CE9CDC85E"
              }, {headers1})
                  .then(responser => {
                    this.receivedData7 = responser.data;
                    if (this.receivedData7.ok == true && this.receivedData7.data > 0) {
                      toast("Paquete enviado", {
                        autoClose: 2000,
                      });
                    } else {
                      toast("Paquete NO enviado", {
                        autoClose: 2000,
                      });
                    }
                    ;
                  })
            } else {
              toast("No esta en modo online", {
                autoClose: 2000,
              });
            }
            ;
          });

    },
    anularFac() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/anular';
      const headers = {'accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8'};
      let toastMSG;
      axios.put(url, {
        gestion: 2023, periodo: 8, proveedorKey: "T1-N392010028-S0-P0", codigoSector: 17, numeroFactura: this.nroanular, codigoMotivo: this.motivoanular }, {headers})
          .then(response => {
            this.responseData = response.data;
            this.responseData.ok ? toastMSG = 'Se anuló la factura.' : toastMSG = 'No se pudo anular la factura.'
            toast(toastMSG, {
              autoClose: 2000,
            });
          })

          .catch(error => {
            console.error(error);
          });
    },
    dctoTotal(){
      const dctoTotalInput = document.getElementById('dctototal');
      const dctoTotalValue = parseFloat(dctoTotalInput.value);

      this.receivedData2.data.cabecera.descuentoAdicional = dctoTotalValue;
      this.receivedData2.data.cabecera.descuentoAdicional = Math.round(this.receivedData2.data.cabecera.descuentoAdicional * 100) / 100;

      this.receivedData2.data.cabecera.montoTotal -= dctoTotalValue;
      this.receivedData2.data.cabecera.montoTotal = Math.round(this.receivedData2.data.cabecera.montoTotal * 100) / 100;
      if (this.receivedData2.data.cabecera.montoTotal <= 0 ) {
        toast("El descuento del monto Total es mayor a la suma total o es igual a cero.", {
          autoClose: 2000,
        });
      };
      this.receivedData2.data.cabecera.montoTotalSujetoIva -= dctoTotalValue;
      this.receivedData2.data.cabecera.montoTotalSujetoIva = Math.round(this.receivedData2.data.cabecera.montoTotalSujetoIva * 100) / 100;
      if (this.receivedData2.data.cabecera.montoTotalSujetoIva <= 0 ) {
        toast("El descuento del monto Total Sujeto a Iva es mayor a la suma total o es igual a cero.", {
          autoClose: 2000,
        });
      };
      this.receivedData2.data.cabecera.montoTotalMoneda -= dctoTotalValue;
      this.receivedData2.data.cabecera.montoTotalMoneda = Math.round(this.receivedData2.data.cabecera.montoTotalMoneda * 100) / 100;
      if (this.receivedData2.data.cabecera.montoTotalMoneda <= 0 ) {
        toast("El descuento del monto Total Moneda es mayor a la suma total o es igual a cero.", {
          autoClose: 2000,
        });
      };
      dctoTotalInput.value = '';

      toast("Descuento total adicional aplicado", {
        autoClose: 2000,
      });

    },
    aplicarDctos(){
      this.receivedData2.data.detalles.forEach((detalle, index) => {
        // Get the discount value from the corresponding form field
        const discountInput = document.getElementById('discount_' + index);
        const discountValue = parseFloat(discountInput.value);

        detalle.montoDescuento = discountValue;
        detalle.subTotal -= discountValue;
        detalle.subTotal = Math.round(detalle.subTotal * 100) / 100;
      });

      const sumSubtotal = this.calculateSumSubtotal(this.receivedData2.data.detalles);

      this.receivedData2.data.cabecera.montoTotal = sumSubtotal;
      this.receivedData2.data.cabecera.montoTotalSujetoIva = sumSubtotal;
      this.receivedData2.data.cabecera.montoTotalMoneda = sumSubtotal;

      toast("Descuentos aplicados.", {
        autoClose: 2000,
      });
    },
    giftCard(){
      const giftcardInput = document.getElementById('giftcard');
      const giftcardValue = parseFloat(giftcardInput.value);


      if (giftcardValue < this.receivedData2.data.cabecera.montoTotal) {
        this.receivedData2.data.cabecera.montoTotalSujetoIva = this.receivedData2.data.cabecera.montoTotal - giftcardValue;
        this.receivedData2.data.cabecera.codigoMetodoPago = 35;
        this.receivedData2.data.cabecera.montoGiftCard = giftcardValue;

        toast("El valor del giftcard se aplicó exitosamente y es menor al monto total de la venta.", {
          autoClose: 2000,
        });
      } else if (giftcardValue >= this.receivedData2.data.cabecera.montoTotal) {
        this.receivedData2.data.cabecera.montoTotalSujetoIva = 0;
        this.receivedData2.data.cabecera.codigoMetodoPago = 27;
        this.receivedData2.data.cabecera.montoGiftCard = giftcardValue;
        toast("El valor del giftcard es igual al valor del monto total de la venta.", {
          autoClose: 2000,
        });
      } else {
        toast("El giftcard no fue usado.", {
          autoClose: 2000,
        });
      };

      giftcardInput.value = '';

    },
    pagoTarjeta(){
      const tarjetaInput = document.getElementById('tarjeta');
      const numeroTarjeta = tarjetaInput.value.trim();

      if (numeroTarjeta.length < 13 || numeroTarjeta.length > 19) {
        toast("Número de tarjeta inválido. Debe contener entre 13 y 19 dígitos.", {
          autoClose: 2000,
        });
        return;
      }

      const maskedNumeroTarjeta = numeroTarjeta.substring(0, 4) + '0'.repeat(numeroTarjeta.length - 8) + numeroTarjeta.substring(numeroTarjeta.length - 4);



      this.receivedData2.data.cabecera.codigoMetodoPago = 2;
      this.receivedData2.data.cabecera.numeroTarjeta = maskedNumeroTarjeta;

      toast("Número de tarjeta obtenido y enmascarado.", {
        autoClose: 2000,
      });

      // Clear the input field after successful payment
      tarjetaInput.value = '';

    },
    pagoTransferencia(){
      this.receivedData2.data.cabecera.codigoMetodoPago = 7;
    },
    procesarDetalles(){
      if (this.receivedData2) {
        this.receivedData2.data.detalles.forEach((detalle, index) => {
          const especialidadInput = document.getElementById('especialidad_' + index);
          const especialidadDetalleInput = document.getElementById('especialidadDetalle_' + index);
          const nroQuirofanoSalaOperacionesInput = document.getElementById('nroQuirofanoSalaOperaciones_' + index);
          const especialidadMedicoInput = document.getElementById('especialidadMedico_' + index);
          const nombreApellidoMedicoInput = document.getElementById('nombreApellidoMedico_' + index);
          const nitDocumentoMedicoInput = document.getElementById('nitDocumentoMedico_' + index);
          const nroMatriculaMedicoInput = document.getElementById('nroMatriculaMedico_' + index);
          const nroFacturaMedicoInput = document.getElementById('nroFacturaMedico_' + index);


          detalle.especialidad = especialidadInput.value;
          detalle.especialidadDetalle = especialidadDetalleInput.value;
          detalle.nroQuirofanoSalaOperaciones = nroQuirofanoSalaOperacionesInput.value;
          detalle.especialidadMedico = especialidadMedicoInput.value;
          detalle.nombreApellidoMedico = nombreApellidoMedicoInput.value;
          detalle.nitDocumentoMedico = nitDocumentoMedicoInput.value;
          detalle.nroMatriculaMedico = nroMatriculaMedicoInput.value;
          detalle.nroFacturaMedico = nroFacturaMedicoInput.value;
        });


        toast("Detalles procesados correctamente.", {
          autoClose: 2000,
        });
      }
    },
    onUpdateStatus(status) {
      this.networkStatus = status;
    },
    imprimirFac(){
      const pdfURL = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/imprimir';
      const headers = {'accept': 'application/json'};
      const numeroFactura = this.nroimprimir;
      const params = { gestion: 2023, periodo: 8, proveedorKey: 'T1-N392010028-S0-P0', codigoSector: 17, numeroFactura: this.nroimprimir };
      let toastMSG;
      axios.get(pdfURL, { responseType: 'blob', headers: headers, params: params })
          .then(response => {
              const blob = new Blob([response.data], {type: 'application/pdf'});
              saveAs(blob, `temporary_pdf.pdf`);
          });
    },
    bajarXML(){
      const xmlURL = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/obtener_xml';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' };
      const numeroFactura = this.bajarxml;
      let toastMSG;
      axios.put(xmlURL, { gestion : 2023, periodo: 8, proveedorKey : "T1-N392010028-S0-P0",  codigoSector: 1,  numeroFactura: this.bajarxml }, { headers })
          .then(response => {
            this.responseData = response.data;
            console.log(this.responseData);
            this.responseData.ok?  toastMSG = 'Se bajó el XML.' :  toastMSG = 'No se pudo bajar el XML.'
            toast(toastMSG, {
              autoClose: 2000,
            });
            const xmlData = this.responseData.data;
            const blob = new Blob([xmlData], { type: 'text/xml' });
            saveAs(blob, `temporary_xml.xml`);
          })
          .catch(error => {
            console.error(error);
          });
    },
    especialFac(){
      if (this.formData.nrodocumento == "99001") {
        this.receivedData2.data.cabecera.codigoExcepcion = 1;
        this.receivedData2.data.cabecera.codigoTipoDocumentoIdentidad = 5;
      } else if (this.formData.nrodocumento == "99002"){
        this.receivedData2.data.cabecera.codigoExcepcion = 1;
        this.receivedData2.data.cabecera.nombreRazonSocial = "Control Tributario";
        this.receivedData2.data.cabecera.codigoTipoDocumentoIdentidad = 5;
      } else if (this.formData.nrodocumento == "99003"){
        this.receivedData2.data.cabecera.codigoExcepcion = 1;
        this.receivedData2.data.cabecera.nombreRazonSocial = "Ventas Menores del día";
        this.receivedData2.data.cabecera.codigoTipoDocumentoIdentidad = 5;
      };
    },
    getFormattedTotal(item) {
      const productTotal = item.price * item.qty;
      const roundedTotal = Math.round(productTotal * 100) / 100;

      return roundedTotal.toFixed(2);
    }
  },


  mounted(){
  //  console.log(this.ventasData[0].id);
  //  console.log(this.ventasData[0].name);
  //  console.log(this.ventasData[0].price);
  //  console.log(this.ventasData[0].qty);
  },
  computed: {
    ventas() {
      return this.$store.state.anotherProducts;
    },
    ventasData() {
      const ventasData = [];

      this.ventas.forEach((venta) => {
        const { id, name, price, qty } = venta;
        ventasData.push({ id, name, price, qty });
      });
      return ventasData;
    }
  },
  data(){
    return{
      receivedData: null,
      receivedData2: null,
      receivedData5: null,
      receivedData6: null,
      receivedData7: null,
      nroanular: null,
      nroimprimir: null,
      networkStatus: '',
      dctototal: null,
      giftcard: null,
      motivoanular: null,
      formData: {
        razonsocial: '',
        nrodocumento: '',
        numerofactura: null,
        email: '',
        product: '',
        cantidad: null,
        subtotal: null,
        total: null,
        preciounitario: null,
        modalidadservicio:'',
        complemento: '',
        tipoDocumentoIdentidad: null
      }
    };
  }


}
</script>