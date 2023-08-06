import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: [],
    cartTotal: 0,
    carto: [],
    cartoTotal: 0
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
    async inicializarStore(state) {
      if (localStorage.getItem('carto')) {
        state.carto = JSON.parse(localStorage.getItem('carto'))
      }
      if (localStorage.getItem('cartoTotal')) {
        state.cartoTotal = parseFloat(localStorage.getItem('cartoTotal'))
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
    addRemoveCarto(state, payload){
      payload.toAdd?
          state.carto.push(payload.product) :
          state.carto = state.cart.filter(function(obj){
            return obj.id !== payload.product.id
          });
      state.cartoTotal = state.carto.reduce((accumulator, object)=>{
        return parseFloat(accumulator) + parseFloat(object.price * object.qty);
      },0);
      localStorage.setItem('cartoTotal',JSON.stringify(state.cartoTotal));
      localStorage.setItem('carto',JSON.stringify(state.carto));

      console.log(state.cartoTotal)
      console.log(state.carto)
    },
    updateCart(state,payload){
      state.cart.find(o => o.id === payload.product.id).qty = payload.product.qty;
      state.cartTotal = state.cart.reduce((accumulator, object)=>{
        return parseFloat(accumulator) + parseFloat(object.price * object.qty);
      },0);
      localStorage.setItem('cartTotal',JSON.stringify(state.cartTotal));
      localStorage.setItem('cart',JSON.stringify(state.cart));

    },
    updateCarto(state,payload){
      state.carto.find(o => o.id === payload.product.id).qty = payload.product.qty;
      state.cartoTotal = state.carto.reduce((accumulator, object)=>{
        return parseFloat(accumulator) + parseFloat(object.price * object.qty);
      },0);
      localStorage.setItem('cartoTotal',JSON.stringify(state.cartoTotal));
      localStorage.setItem('carto',JSON.stringify(state.carto));

    }



  },
  actions: {},
  modules: {},
})
