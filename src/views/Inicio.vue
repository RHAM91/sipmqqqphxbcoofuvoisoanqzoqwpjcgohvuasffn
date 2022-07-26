<template>
    <div class="contenedor">
        <div class="asidex">
            <div class="icono_menu_a" @mouseenter="mostrar_titulo('inicio')" @mouseleave="ocultar_titulo('inicio')" @click="set_ruta('Main')">
                <i class="fas fa-bars"></i>
                <div v-if="btn_btn == 'inicio'" class="nombre_seccion">
                    Inicio
                </div>
            </div>
            <div class="icono_menu_a" @mouseenter="mostrar_titulo('configuracion')" @mouseleave="ocultar_titulo('configuracion')" @click="set_modulo('Configuracion')">
                <i class="fas fa-cog"></i>
                <div v-if="btn_btn == 'configuracion'" class="nombre_seccion" style="position: fixed; top: 101px;">
                    Configuración
                </div>
            </div>
            
            <b-button type="button" id="btn_usuario" size="sm" variant="primary" @click="abrirFichaUsuario"><i class="fas fa-user-circle"></i></b-button>
            <b-button type="button" class="btn_logout" size="sm" title="Cerrar Sesión" variant="danger" @click="salir"><i class="fas fa-sign-out-alt"></i></b-button>

        </div>
        

        <div class="seccion_a">
            <div class="top_verde">
                <Loading />
            </div>


            <Configuracion v-if="modulo == 'Configuracion'" />
            <FichaUsuario v-if="modal_ficha_usuario" :itemUsuario="idusuario" v-on:salir="cerrarFichaUsuario" />

        </div>


    </div>
</template>

<script>

import {IP, PUERTO} from '../config/parametros'
import { pregunta } from '../components/functions/alertas'

import Vue from 'vue'
import store from '../store'
import VueSocketIOExt from 'vue-socket.io-extended'
import  io  from 'socket.io-client'
import axios from 'axios'

import { mapActions, mapState } from 'vuex'

import Configuracion from '../components/Configuracion/menu.vue'
import Loading from '../components/others/Loading.vue'
import FichaUsuario from '../components/Configuracion/Usuarios/FichaUsuario.vue'

export default {
    name: 'Pricipal',
    components:{
        Configuracion,
        Loading,
        FichaUsuario
    },
    computed: {
        ...mapState(['idusuario', 'permisos', 'tipo'])
    },
    data() {
        return {
            modulo: 'Miembros',
            sub_menu: '',
            modal_ficha_usuario: false,
            btn_btn: ''
        }
    },
    methods: {
        set_modulo(modulo){
            this.modulo = modulo
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
        estado(){
            let info = this.$socket.connected
            console.log(info)
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
        abrirFichaUsuario(){
            this.modal_ficha_usuario = true
        },
        cerrarFichaUsuario(){
            this.modal_ficha_usuario = false
        },
        set_ruta(ruta){
            this.$router.replace(ruta)
        },
        mostrar_titulo(b){
            this.btn_btn = b
        },
        ocultar_titulo(b){
            this.btn_btn = ''
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

    td{
        padding: 5px 5px;
    }

    .contenedor{
        width: 100%;
        height: 100vh;
        display: flex;
    }

        .asidex{
            position: relative;
            width: 50px;
            height: 100%;
            background-color: #252935;
            display: flex;
            align-items: center;
            flex-direction: column;
            padding-top: 14px;
        }
            .icono_menu_a{
                width: 40px;
                height: 40px;
                display: flex;
                font-size: 23px;
                justify-content: center;
                align-items: center;
                transition: .4s ease;
                /* margin-bottom: 14px; */
                color: white;
                cursor: pointer;
                
            }

            .btn_logout{
                position: absolute;
                bottom: 10px;
                left: 8px;
            }

            #btn_usuario{
                position: absolute;
                bottom: 55px;
                left: 8px;
            }

        .seccion_a{
            width: calc(100% - 50px);
            height: 100%;
        }

            .top_verde{
                background-color: #49C466;
                width: 100%;
                height: 25px;
                border-bottom: 1px solid #2ab74a;
            }

            .seccion_b{
                width: 100%;
                height: calc( 100% - 45px);
                display: flex;
            }

                .sub_menu_a{
                    width: 200px;
                    height: 100%;
                    background-color: #ffffff;
                    border-right: 1px solid #e9e9e9;
                }
                
                .cuerpo_seccion_b{
                    width: calc(100% - 200px);
                    height: 100%;
                }

                    .top_cuerpo_seccion_b{
                        width: 100%;
                        height: 35px;
                        background-color: #fafafa;
                        border-bottom: 1px solid #e9e9e9;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 14px;
                    }

                    .cuerpo_sub_seccion_b{
                        width: 100%;
                        height: calc(100% - 35px);
                    }
                        .submenu_titulo{
                            font-size: 12px;
                            color: #808080;
                            padding-left: 15px;
                            margin-top: 15px;
                            margin-bottom: 8px;
                        }
                            .submenu_modulo{
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                height: 30px;
                                padding-left: 25px;
                                box-sizing: border-box;
                            }
                                .submenu_modulo_icon{
                                    width: 18px;
                                    height: 18px;
                                    margin-right: 5px;
                                    line-height: 0px;
                                }

                                .submenu_modulo_texto{
                                    font-size: 13px;
                                    color: #3c3c3c;
                                    width: 100%;
                                    user-select: none;
                                }


    /* CSS de modal */

    .contenedor_modal{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .cuerpo_modal{
            width: 700px;
            height: auto;
            background-color: white;
            padding-bottom: 20px;
        }
            .cabecera_modal{
                width: 100%;
                height: 40px;
                border-bottom: 1px solid #e9e9e9;
                display: flex;
                align-items: center;
                padding-right: 10px;
                flex-direction: row-reverse;
            }


    /* CSS de modal full*/

    .contenedor_full{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: white;
        z-index: 999;
    }
        .banner_full_{
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
            padding-right: 10px;
            border-bottom: 1px solid #e9e9e9;
        }

    .nombre_seccion{
        width: auto;
        height: 30px;
        background-color: purple;
        color: white;
        position: fixed;
        top: 20px;
        left: 46px;
        font-size: 19px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .4s ease;
        padding-left: 10px;
        padding-right: 10px;
    }

    /* SCROLL */

    .marco{
        width: 100%;
        height: calc(100vh - 155px);
        padding-bottom: 10px;
        overflow: auto;
    }

    .marco_{
        width: 100%;
        height: calc(100vh - 220px);
        padding-bottom: 10px;
        overflow: auto;
    }


    /* ESTILOS PARA LA BARRA DE SCROLL */
    ::-webkit-scrollbar{
        width: 8px;
        background-color: #F5F5F5;
    }
    ::-webkit-scrollbar-track{
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #F5F5F5;
    }
    ::-webkit-scrollbar-thumb{
        /* background-color: #F90; // naranja  */ 
        background-color: #29B6F6;
        background-image: -webkit-linear-gradient(90deg,rgba(255, 255, 255, .2) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, .2) 50%,rgba(255, 255, 255, .2) 75%,transparent 75%,transparent)
    }
</style>