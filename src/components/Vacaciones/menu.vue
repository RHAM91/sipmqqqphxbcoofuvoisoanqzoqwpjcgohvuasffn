<template>
    
    <div class="seccion_b">
        <div class="sub_menu_a">



            <div class="top_cuerpo_seccion_b">
                Vacaciones
            </div>

            <div class="submenu_titulo">
                Datos
            </div>

            <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('formulario_solicitud')">
                    Formulario solicitud
                </div>
            </div>

            <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-clock"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('solicitudes_pendientes')">
                    Solicitudes pendientes
                </div>
            </div>
        

            <div class="submenu_titulo">
                Reportes
            </div>

            <!-- <div v-if=" tipo == 'root' || permisos.usuarios.ver == 1" class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-users"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('usuarios')">
                    Usuarios
                </div>
            </div> -->


        </div>


        <div class="cuerpo_seccion_b">
            <div class="top_cuerpo_seccion_b">
                <!-- es el tope del cuerpo, abajo del renglon verde -->
            </div>
            <div class="cuerpo_sub_seccion_b">

                <FormuarioSolicitud v-if="sub_modulo == 'formulario_solicitud'"/>
                <SolicitudesPendientes v-if="sub_modulo == 'solicitudes_pendientes'"/>

            </div>
        </div>
    </div>
</template>

<script>

import FormuarioSolicitud from './FormularioSolicitud.vue'
import SolicitudesPendientes from './SolicitudesPendientes.vue'


import { mapState } from 'vuex'


export default {
    components:{
        FormuarioSolicitud,
        SolicitudesPendientes
    },
    computed: {
        ...mapState(['permisos', 'tipo'])
    },
    data() {
        return {
            sub_modulo: ''
        }
    },
    methods: {
        set_submodulo(modulo){
            this.sub_modulo = modulo
        }
    }
}
</script>

<style>
    
</style>