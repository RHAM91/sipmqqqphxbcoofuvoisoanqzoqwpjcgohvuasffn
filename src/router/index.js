import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Tablero from '@/views/Tablero.vue'
import Inicio from '@/views/Inicio.vue'
import Vacaciones from '@/views/Vacaciones.vue'
import Colaboradores from '@/views/Colaboradores.vue'
import Membresias from '@/views/Membresias.vue'
import axios from 'axios'
import { IP, PUERTO } from '../config/parametros'

Vue.use(VueRouter)

  const routes = [
    {
        path: '*',
        redirect: '/login'
    },
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/tablero',
        name: 'Tablero',
        component: Tablero,
        meta:{
            autentificado: true
        }
    },
    {
        path: '/inicio',
        name: 'Inicio',
        component: Inicio,
        meta:{
            autentificado: true
        }
    },
    {
        path: '/colaboradores',
        name: 'Colaboradores',
        component: Colaboradores,
        meta:{
            autentificado: true
        }
    },
    {
        path: '/vacaciones',
        name: 'Vacaciones',
        component: Vacaciones,
        meta:{
            autentificado: true
        }
    },
    {
        path: '/membresias',
        name: 'Membresias',
        component: Membresias,
        meta:{
            autentificado: true
        }
    }
 
  ]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) =>{
    (async () =>{
        let origen = localStorage.getItem('kat')
        
        if (origen == null) {
            
            var usuario = false
            
        }else{

            var tt = JSON.parse(origen)
           
            var data = await axios.get(`http://${IP}:${PUERTO}/api/login/sesion`, tt.token)

            var usuario = data.data.alive
        }

        let autorizado = to.matched.some(record => record.meta.autentificado)

        if (autorizado && !usuario) {
            next('login')
        }else if(!autorizado && usuario){
            next('Tablero')
        }else{
            next()
        }
    })()
})

export default router
