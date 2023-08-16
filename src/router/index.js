import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/Home.vue'
import About from '/src/views/About.vue'
import Cart from '/src/views/Cart.vue'
import DefaultLayout from '/src/layouts/DefaultLayout.vue'
import Farmacia from "../views/Farmacia.vue";
import Sclinicos from "../views/Sclinicos.vue";
import Carto from "../views/Carto.vue";
import Detalles from "../views/Detalles.vue";
import Productos from "../views/Productos.vue";
import Datos from "../views/Datos.vue";
import LoginPage from "../views/LoginPage.vue"
import DashboardPage from "../views/DashboardPage.vue";
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
                component:Farmacia,
                props: (route) => ({ username: route.query.username })
            },
            {
                path:'/sclinicos',
                name:'Sclinicos',
                component:Sclinicos,
                props: (route) => ({ username: route.query.username })
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
            },
            {
                path:'/datos',
                name:'Datos',
                component:Datos
            },
            {
                path:'/login',
                name:'Login',
                component:LoginPage
            },
            {
                path:'/dashboard',
                name:'Dashboard',
                component:DashboardPage,
                props: (route) => ({ username: route.query.username })
            }
        ]
    },
]   
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router