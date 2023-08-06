<template>
  <section class="h-100 h-custom min-h-content" >
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col">
          <div class="card border-0">
            <div class="card-body p-4">

              <div class="row">
                <div class="col-lg-7">
                  <h5 class="mb-3"><router-link :to="{name:'Farmacia'}" class="text-body"><i
                      class="fas fa-long-arrow-alt-left me-2"></i>Volver a Farmacia</router-link></h5>
                  <hr>

                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <p class="mb-0">Usted tiene {{ $store.state.cart.length }} items en su factura.</p>
                    </div>
                  </div>

                  <div v-for="item in $store.state.cart" class="card mb-3 shadow-sm border-0" :key="item.id">
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
                            <CartAddRemove :product="item"/>
                          </div>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                          <div >
                            <h5 class="mb-0"><i class="bi bi-currency-dollar"></i>{{ item.price*item.qty }}</h5>
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
                        <h5 class="mb-0">Detalles de compra farmacia</h5>
                        <i class="bi bi-cart3 h1"></i>
                      </div>
                      <hr class="my-4">
                      <div class="d-flex justify-content-between">
                        <p class="mb-2">Subtotal</p>
                        <p class="mb-2"><i class="bi bi-currency-dollar"></i>{{ $store.state.cartTotal }}</p>
                      </div>
                      <div class="d-flex justify-content-between mb-4">
                        <p class="mb-2">Total</p>
                        <p class="mb-2"><i class="bi bi-currency-dollar"></i>{{ $store.state.cartTotal }}</p>
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
                        <label for="numerofactura" class="form-label">Numero Factura</label>
                        <input type="number" class="form-control" id="numerofactura" v-model="formData.numerofactura">
                      </div>
                      <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" v-model="formData.email">
                      </div>

                      <button type="button"  @click="crearFactura" class="btn btn-info btn-block btn-lg">
                        Crear Factura
                      </button><br><br>

                      <button type="button"  @click="procesarFactura" class="btn btn-info btn-block btn-lg">
                        Procesar Factura
                      </button><br><br>
                      <button type="button"  @click="aplicarDctos" class="btn btn-info btn-block btn-lg">
                        Aplicar Descuentos
                      </button><br><br>
                      <button type="button"  @click="enviarFactura" class="btn btn-info btn-block btn-lg">
                        Enviar Factura
                      </button><br><br>
                      <button type="button"  @click="facturarOffline" class="btn btn-info btn-block btn-lg">
                        Facturar Offline
                      </button><br><br>
                      <button type="button"  @click="enviarPaquete" class="btn btn-info btn-block btn-lg">
                        Enviar Paquete
                      </button><br><br>
                      <h5>ANULAR FACTURA</h5>
                      <div class="mb-3">
                        <label for="nroanular" class="form-label">Numero de Factura a Anular</label>
                        <input type="number" class="form-control" id="nroanular" v-model="nroanular"></div>
                      <button type="button"  @click="anularFac" class="btn btn-info btn-block btn-lg">
                        Anular Factura
                      </button>
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
                      </div><br><br>
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
      <pre></pre>
    </div><br><br>
    <div>
      <pre></pre>
    </div>
    <div>
      <pre>{{ receivedData5 }}</pre>
    </div>
    <div>
      <pre>{{ receivedData2 }}</pre>
    </div>
  </section>
</template>
<script>
import CartAddRemove from '../components/CartAddRemove.vue';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default{
  components :{CartAddRemove},
  methods: {
    removeItem(item) {
      this.$store.commit('addRemoveCart', {product: item, toAdd: false})
    },
    crearFactura() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/crear?proveedorKey=T1-N392010028-S0-P1&codigoSector=1';
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
      const detallesCopy = { ...this.receivedData.data.detalles[0] };
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
    procesarFactura(){
      if (this.receivedData) {
        this.receivedData.data.detalles[0].actividadEconomica = 477311;
        this.receivedData.data.detalles[0].codigoProductoSin = 35270;
        const replicatedDetalles = this.ventasData.map(this.replicateDetalles);
        const updatedData = {...this.receivedData.data, detalles: replicatedDetalles};
        this.receivedData2 = {...this.receivedData, data: updatedData};
      };

      this.receivedData2.data.cabecera.nombreRazonSocial = this.formData.razonsocial;
      this.receivedData2.data.cabecera.numeroDocumento = this.formData.nrodocumento;
      this.receivedData2.data.cabecera.numeroFactura = this.formData.numerofactura;
      this.receivedData2.data.cabecera.codigoCliente = this.formData.email;
    },

    enviarFactura(){
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/emitir?codigoSector=1';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };
      let toastMSG;
      axios.post(url, this.receivedData2, { headers })
          .then(response => {
            this.receivedData5 = response.data;
            this.formData.razonsocial = '';
            this.formData.nrodocumento = '';
            this.formData.numerofactura = null;
            this.formData.email = '';
            if(this.receivedData5.data.cabecera.codigoEstado == 908) {
              toast("La factura fue procesada exitosamente 908", {
                autoClose: 2000,
              });
            } else {
              toast("La factura no fue procesada exitosamente.", {
                autoClose: 2000,
              });
            };

          });
    },
    facturarOffline(){
      if (this.receivedData) {
        this.receivedData.data.detalles[0].actividadEconomica = 477311;
        this.receivedData.data.detalles[0].codigoProductoSin = 35270;
        const replicatedDetalles = this.ventasData.map(this.replicateDetalles);
        const updatedData = { ...this.receivedData.data, detalles: replicatedDetalles };
        this.receivedData2 = { ...this.receivedData, data: updatedData };

        const sumSubtotal = this.calculateSumSubtotal(this.receivedData2.data.detalles);

        this.receivedData2.data.cabecera.montoTotal = sumSubtotal;
        this.receivedData2.data.cabecera.montoTotalSujetoIva = sumSubtotal;
        this.receivedData2.data.cabecera.montoTotalMoneda = sumSubtotal;

        this.receivedData2.data.cabecera.nombreRazonSocial = this.formData.razonsocial;
        this.receivedData2.data.cabecera.numeroDocumento = this.formData.nrodocumento;
        this.receivedData2.data.cabecera.numeroFactura = this.formData.numerofactura;
        this.receivedData2.data.cabecera.codigoCliente = this.formData.email;

        const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/emitir?codigoSector=1';
        const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };

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


      } else {
        console.error('receivedData no fue recibido todavía.');
      }
    },
    enviarPaquete(){
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/on_line?proveedorKey=T1-N392010028-S0-P1';
      const headers = { 'accept': 'application/json' };
      let codigo;
      axios.put(url, null,{headers},)
          .then(response => {
            this.receivedData6 = response.data;
            if (this.receivedData6.messages == "Ya estaba en modo online" || this.receivedData6.ok == true) {
              codigo = this.receivedData6.data.cufdEvento.codigoEvento;
              console.log(codigo);
              const url1 = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/enviar';
              const headers1 = { 'accept': 'application/json', 'Content-Type': 'application/json' };
              axios.put(url1, { gestion: 2023, periodo: 7, proveedorKey: "T1-N392010028-S0-P1", codigoSector: 1, codigoEvento:codigo, cafc: "" }, {headers1})
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
    anularFac() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/anular';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json' };
      let toastMSG;
      axios.put(url, { gestion : 2023, periodo: 7, proveedorKey : "T1-N392010028-S0-P1",  codigoSector: 1,  numeroFactura: this.nroanular, codigoMotivo: 1 }, { headers })
          .then(response => {
            this.responseData = response.data;
            this.responseData.ok?  toastMSG = 'Se anuló la factura.' :  toastMSG = 'No se pudo anular la factura.'
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
      this.receivedData2.data.cabecera.montoTotal -= dctoTotalValue;
      this.receivedData2.data.cabecera.montoTotalSujetoIva -= dctoTotalValue;
      this.receivedData2.data.cabecera.montoTotalMoneda -= dctoTotalValue;

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

    }
  },
  mounted(){
    console.log(this.ventasData[0].id);
    console.log(this.ventasData[0].name);
    console.log(this.ventasData[0].price);
    console.log(this.ventasData[0].qty);
    this.detalles = this.ventasData.map(() => ({ montoDescuento: 0 }));
  },

  computed: {
    ventas() {
      return this.$store.state.cart;
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
      giftcard: null,
      discounts: [],
      formData: {
        razonsocial: '',
        nrodocumento: '',
        numerofactura: null,
        email: '',
        product: '',
        cantidad: null,
        subtotal: null,
        total: null,
        preciounitario: null
      }
    };
  }
};
</script>