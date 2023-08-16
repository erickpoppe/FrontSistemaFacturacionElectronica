<template>
  <div class="card-container">
    <div class="card">
      <div class="mb-3">
        <label for="nroimprimir" class="form-label">Numero de Factura a Imprimir</label>
      <input type="number" class="form-control" id="nroimprimir" v-model="nroimprmir"></div>
      <button type="button" @click="imprimirFac" class="btn btn-info btn-block btn-lg">
        Imprimir Factura
      </button>
    </div>
    <div class="card">
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
      </div>
    </div>
    <div class="card">
      <div class="mb-3">
        <label for="bajarxml" class="form-label">Descargar documento XML</label>
        <input type="number" class="form-control" id="bajarxml" v-model="bajarxml"></div>
      <button type="button"  @click="bajarXML" class="btn btn-info btn-block btn-lg">
        Descargar XML
      </button><br><br>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {toast} from "vue3-toastify";

export default {
  data(){
    return{
      nroanular: null,
      nroimprimir: null,
      bajarxml: null
    };
  },
  methods:{
    anularFac() {
      const url = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/anular';
      const headers = { 'accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' };
      let toastMSG;
      axios.put(url, { gestion : 2023, periodo: 8, proveedorKey : "T1-N392010028-S0-P0",  codigoSector: 1,  numeroFactura: this.nroanular, codigoMotivo: this.motivoanular }, { headers })
          .then(response => {
            this.responseData = response.data;
            this.responseData.ok?  toastMSG = 'Se anuló la factura.' :  toastMSG = 'No se pudo anular la factura.'
            toast(toastMSG, {
              autoClose: 1500,
            });
            toastMSG = this.responseData.messages;
            toast(toastMSG, {
              autoClose: 1500,
            });
            this.nroanular = null
          })

          .catch(error => {
            console.error(error);
          });
    },
    imprimirFac(){
      const pdfURL = 'https://py-kc-rest-v1-xkqvciodha-rj.a.run.app/oper/facturacion/imprimir';
      const headers = {'accept': 'application/json', 'Access-Control-Allow-Origin': true};
      const numeroFactura = this.nroimprimir;
      const params = { gestion: 2023, periodo: 8, proveedorKey: 'T1-N392010028-S0-P0', codigoSector: 17, numeroFactura: this.nroimprimir };
      let toastMSG;
      axios.get(pdfURL, { responseType: 'blob', headers: headers, params: params })
          .then(response => {
            const blob = new Blob([response.data], {type: 'application/pdf'});
            saveAs(blob, `temporary_pdf.pdf`);
          });
    }
  }
}


</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
}

.card {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
  flex: 1;
  text-align: center;
}
</style>
<script setup>
</script>