<template>
    
    <div class="seccion_b">
        <div class="sub_menu_a">



            <div class="top_cuerpo_seccion_b">
                Configuración
            </div>

            <div class="submenu_titulo">
                Datos
            </div>

            <div class="submenu_modulo">
                <div class="submenu_modulo_icon">
                    <i class="fas fa-layer-group"></i>
                </div>
                <div class="submenu_modulo_texto" @click="set_submodulo('areas')">
                    Areas
                </div>
            </div>
        

        </div>


        <div class="cuerpo_seccion_b">
            <div class="top_cuerpo_seccion_b">
                
            </div>
            <div class="cuerpo_sub_seccion_b">
                <Areas v-if="sub_modulo == 'areas'"/>


            </div>
        </div>
    </div>
</template>

<script>

import Areas from './Areas/ListaAreas.vue'


import { mapState } from 'vuex'


export default {
    components:{
        Areas
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