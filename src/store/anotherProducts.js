export default {
    state: {
        anotherProducts: [],
        anotherTotal: 0
    },
    mutations: {
        async initialiseAnotherStore(state) {
            if(localStorage.getItem('anotherProducts')){
                state.anotherProducts = JSON.parse(localStorage.getItem('anotherProducts'))
            }
            if(localStorage.getItem('anotherTotal')){
                state.anotherTotal = parseFloat(localStorage.getItem('anotherTotal'))
            }
            return true;
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
}
