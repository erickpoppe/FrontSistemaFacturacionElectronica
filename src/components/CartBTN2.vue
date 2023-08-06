<template>
  <button type="button" @click="addOrRemove()"  class="cart-btn btn btn-sm btn-outline-secondary me-2">
    <i :class="toAdd?'bi bi-cart':'bi bi-cart-check'"></i>
  </button>
  <CartAddRemove2 v-if="!toAdd" :product="item"/>
</template>

<script>
import CartAddRemove2 from './CartAddRemove2.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default{
  props:['product'],
  components :{CartAddRemove2},
  data(){
    return{
      toAdd:true,
      item:[]
    }
  },
  methods:{
    async addOrRemove(){
      this.item.qty = 1
      this.$store.commit('addRemoveCarto',{product:this.item, toAdd:this.toAdd})
      let toastMSG
      this.toAdd?  toastMSG = 'Añadido a la factura' :  toastMSG = 'Removido de la factura'
      toast(toastMSG, {
        autoClose: 1500,
      });
      this.toAdd = !this.toAdd
    }
  },
  mounted(){
    let cart = this.$store.state.carto
    let obj = cart.find(o => o.id === this.product.id)
    if(obj){
      this.toAdd = false
      this.item = obj
    }else{
      this.item = this.product
      this.toAdd = true
    }

  }
}
</script>
<style>
.cart-btn{
  width:40px;
  height: 38px;
}
.plus-minus input{
  max-width: 50px;
}
</style>