<template>
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
  <div>
    <label for="complemento" class="form-label">Complemento</label>
    <input type="text" class="form-control" id="complemento" v-model="formData.complemento">
  </div><br><br>

  <button type="button"  @click="crearFactura" class="btn btn-info btn-block btn-lg">
    Crear Factura
  </button><br><br>

  <button type="button"  @click="procesarFactura" class="btn btn-info btn-block btn-lg">
    Procesar Factura
  </button><br><br>
  <button type="button"  @click="enviarFactura" class="btn btn-info btn-block btn-lg">
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
  </button><br><br>
  <div class="mb-3">
    <h5>PAGO POR TRANSFERENCIA BANCARIA</h5>
    <button type="button"  @click="pagoTransferencia" class="btn btn-info btn-block btn-lg">
      Pago por transferencia bancaria
    </button><br><br> </div>

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
  </div>

  <h5>FACTURACIÓN ESPECIAL</h5>
  <div class="mb-3">
    <label for="especial" class="form-label">Código Especial</label></div>
  <button type="button"  @click="especialFac" class="btn btn-info btn-block btn-lg">
    Especial
  </button><br><br>

  <h5>IMPRIMIR FACTURA</h5>
  <div class="mb-3">
    <label for="imprimir" class="form-label">Numero de Factura a Imprimir</label>
    <input type="number" class="form-control" id="imprimir" v-model="imprimir"></div>
  <button type="button"  @click="imprimirFac" class="btn btn-info btn-block btn-lg">
    Imprimir Factura
  </button><br><br>

  <h5>BAJAR XML</h5>
  <div class="mb-3">
    <label for="bajarxml" class="form-label">Descargar documento XML</label>
    <input type="number" class="form-control" id="bajarxml" v-model="bajarxml"></div>
  <button type="button"  @click="bajarXML" class="btn btn-info btn-block btn-lg">
    Descargar XML
  </button><br><br>

</template>

<script>

</script>