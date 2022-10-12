<template>
    <div class="contenedor_inicio">
        <div class="top_verde_">
            
        </div>
        <div class="cuerpo_inicio_modulos">
            <div class="modulos">

                <div class="modulo" @click="set_ruta('Colaboradores')">
                    <div class="titulo_modulo">
                        COLABORADORES
                    </div>
                    <div class="cuerpo_modulo">
                        <i class="fas fa-users"></i>
                    </div>
                </div>

                 <div class="modulo" @click="set_ruta('Vacaciones')">
                    <div class="titulo_modulo">
                        VACACIONES
                    </div>
                    <div class="cuerpo_modulo">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                </div>

                <div class="modulo" @click="set_ruta('Membresias')">
                    <div class="titulo_modulo">
                        MEMBRESIAS
                    </div>
                    <div class="cuerpo_modulo">
                        <i class="fas fa-file-signature"></i>
                    </div>
                </div>

               

            </div>

            <div class="cerrar_sesion_btn" @click="salir">
                <i class="fas fa-sign-out-alt"></i>
            </div>

        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import store from '../store'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'
import axios from 'axios'
import { pregunta } from '../components/functions/alertas'
import { IP, PUERTO } from '@/config/parametros'
import { mapActions, mapState } from 'vuex'

export default {
    name: 'Principal',
    computed: {
        ...mapState(['idusuario', 'permisos', 'tipo'])
    },
    data() {
        return {
            
        }
    },
    methods: {
        set_ruta(ruta){
            this.$router.replace(ruta)
        },
        salir(){
            pregunta({titulo: 'Seguro que deseas salir?', texto: 'Está a punto de salir del sistema', afirmacion: 'Si, salir!'}, async (i) =>{

                if (i) {
                    localStorage.removeItem('kat')
                    this.$router.replace('Login')

                    let f = {
                        datos: null
                    }

                    let b = await axios.post(`http://${IP}:${PUERTO}/api/login/cerrarsesion`, f, this.$store.state.token)
                    console.log(b.data)
                }
            })
        },
        iniciando_conexion(){

            // SE INICIA LA CONEXION UNA VEZ ESTÉ LOGUEADO

            const options = {'forceNew':true }

            const t = JSON.parse(localStorage.getItem('kat'))
            const token = t != null ? t.token.headers.Authorization.split(' ')[1] : 'nada'

            const ioInstance = io(`http://${IP}:${PUERTO}/?token=${token}`, {
                reconnection: true,
                reconnectionDelay: 500,
                maxReconnectionAttempts: Infinity
            })


            Vue.use(VueSocketIOExt, ioInstance, {
                store, // vuex store instance
                actionPrefix: 'SOCKET_', // keep prefix in uppercase
                eventToActionTransformer: (actionName) => actionName // cancel camel case
            })

        },
        ...mapActions(['descargar_datos', 'receptor', 'getPermission'])
    },
    mounted() {
        this.iniciando_conexion()
        this.descargar_datos(this.$socket) // descarga los datos nuevos al iniciar app
        this.receptor() // esta funcion recibe la orden de actulizar un modulo en especifico y descarga los datos cuando haya nueva informacion disponible
        this.getPermission() // descarga los permisos de cada modulo
    },
}
</script>

<style>
    .contenedor_inicio{
        width: 100%;
        height: 100vh;
    }

    .top_verde_{
        background-color: #49C466;
        width: 100%;
        height: 25px;
        border-bottom: 1px solid #2ab74a;
    }

    .cuerpo_inicio_modulos{
        width: 100%;
        height: calc(100% - 25px);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modulos{
        width: 500px;
        height: 500px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        
    }
        .modulo{
            width: 200px;
            height: 200px;
            border: 1px solid #e9e9e9;
            margin-right: 10px;
        }
            .titulo_modulo{
                width: 100%;
                height: 25px;
                background-color: #252935;
                color: white;
                text-align: center;
            }
            
            .cuerpo_modulo{
                width: 100%;
                height: calc(100% - 25px);
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 70px;
                cursor: pointer;
                transition: .4s ease;
            }
                .cuerpo_modulo:hover{
                    background-color: #252935;
                    color: white;
                }

        .cerrar_sesion_btn{
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background-color: #e9e9e9;
            position: fixed;
            bottom: 15px;
            left: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            user-select: none;
            transition: .4s ease;
        }
            .cerrar_sesion_btn:hover{
                background-color: #252935;
                color: white;
            }
</style>