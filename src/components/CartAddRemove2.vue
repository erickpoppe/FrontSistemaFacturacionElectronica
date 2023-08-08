<template>
  <div v-if="product"  class="input-group plus-minus">
    <button class="btn btn-outline-secondary " :class="loading?'disabled':''" @click="addOrRemove(-1)"  type="button" id="button-addon1">-</button>
    <input type="number" v-model="qty"  disabled class="form-control form-control-sm" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
    <button class="btn btn-outline-secondary" :class="loading?'disabled':''"  @click="addOrRemove(1)"  type="button" id="button-addon1">+</button>
  </div>
</template>
<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default{
  name:'CartAddRemove2',
  props:['product'],
  data(){
    return{
      qty:1,
      loading:false
    }
  },
  methods:{
    async addOrRemove(number){
      this.loading = true
      if(number == 1){ //add
        if(this.qty < 10){
          this.qty++
          this.product.qty = this.qty
          await this.$store.commit('updateAnotherCart',{product:this.product})
          toast.success('Factura actualizada')
        }else{
          toast.warning('Se alcanzó el límite')
        }
      }
      if( number == -1){ //remove
        if(this.qty > 1){
          this.qty--
          this.product.qty = this.qty
          await this.$store.commit('updateAnotherCart',{product:this.product})
          toast.success('Factura de Servicios Clínicos actualizada');
        }else{
          toast.warning('Se alcanzó el límite');
        }
      }

      this.loading = false
    }
  },
  mounted(){
    this.qty = this.product.qty
  }
}
</script>
<style>
.plus-minus input{
  max-width: 50px;
}
</style>