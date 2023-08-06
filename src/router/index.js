import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/Home.vue'
import About from '/src/views/About.vue'
import Cart from '/src/views/Cart.vue'
import DefaultLayout from '/src/layouts/DefaultLayout.vue'
import Farmacia from "../views/Farmacia.vue";
import Sclinicos from "../views/Sclinicos.vue";
import Carto from "../views/Carto.vue";
import Detalles from "../views/Detalles.vue";
import Productos from "../views/Productos.vue"
const routes = [
    {
        path:'/',
        name:'Public',
        component:DefaultLayout,
        redirect: '/',
        children:[
            {
                path:'/',
                name:'Home',
                component:Home
            },
            {
                path:'/about',
                name:'About',
                component:About
            },
            {
                path:'/cart',
                name:'Cart',
                component:Cart
            },
            {
                path:'/farmacia',
                name:'Farmacia',
                component:Farmacia
            },
            {
                path:'/sclinicos',
                name:'Sclinicos',
                component:Sclinicos
            },
            {
                path:'/carto',
                name:'Carto',
                component:Carto
            },
            {
                path:'/detalles',
                name:'Detalles',
                component:Detalles

            },
            {
                path:'/productos',
                name:'Productos',
                component:Productos
            }
        ]
    },
]   
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router