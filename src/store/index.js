import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: [],
    cartTotal: 0,
    anotherProducts: [],
    anotherTotal: 0
  },
  mutations: {
    async initialiseStore(state) {
      if(localStorage.getItem('cart')){
        state.cart = JSON.parse(localStorage.getItem('cart'))
      }
      if(localStorage.getItem('cartTotal')){
        state.cartTotal = parseFloat(localStorage.getItem('cartTotal'))
      }
      return true;
    },
    async initialiseAnotherStore(state) {
      if(localStorage.getItem('anotherProducts')){
        state.anotherProducts = JSON.parse(localStorage.getItem('anotherProducts'))
      }
      if(localStorage.getItem('anotherTotal')){
        state.anotherTotal = parseFloat(localStorage.getItem('anotherTotal'))
      }
      return true;
    },
    addRemoveCart(state, payload){
      payload.toAdd?
          state.cart.push(payload.product) :
          state.cart = state.cart.filter(function(obj){
            return obj.id !== payload.product.id
          });
      state.cartTotal = state.cart.reduce((accumulator, object)=>{
        return parseFloat(accumulator) + parseFloat(object.price * object.qty);
      },0);
      localStorage.setItem('cartTotal',JSON.stringify(state.cartTotal));
      localStorage.setItem('cart',JSON.stringify(state.cart));

      console.log(state.cartTotal)
      console.log(state.cart)
    },
    addRemoveAnotherCart(state, payload){
      payload.toAdd?
          state.anotherProducts.push(payload.product) :
          state.anotherProducts = state.anotherProducts.filter(function(obj){
            return obj.id !== payload.product.id
          });
      state.anotherTotal = state.anotherProducts.reduce((accumulator, object)=>{
        return parseFloat(accumulator) + parseFloat(object.price * object.qty);
      },0);
      localStorage.setItem('anotherTotal',JSON.stringify(state.anotherTotal));
      localStorage.setItem('anotherProducts',JSON.stringify(state.anotherProducts));

      console.log(state.anotherTotal)
      console.log(state.anotherProducts)
    },
    updateCart(state,payload){
      state.cart.find(o => o.id === payload.product.id).qty = payload.product.qty;
      state.cartTotal = state.cart.reduce((accumulator, object)=>{
        return parseFloat(accumulator) + parseFloat(object.price * object.qty);
      },0);
      localStorage.setItem('cartTotal',JSON.stringify(state.cartTotal));
      localStorage.setItem('cart',JSON.stringify(state.cart));

    },
    updateAnotherCart(state,payload){
      state.anotherProducts.find(o => o.id === payload.product.id).qty = payload.product.qty;
      state.anotherTotal = state.anotherProducts.reduce((accumulator, object)=>{
        return parseFloat(accumulator) + parseFloat(object.price * object.qty);
      },0);
      localStorage.setItem('anotherTotal',JSON.stringify(state.anotherTotal));
      localStorage.setItem('anotherProducts',JSON.stringify(state.anotherProducts));
    }
  },
  actions: {},
  modules: {},
})