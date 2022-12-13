<template>
    <b-container fluid="">
        <b-row>
            <b-col sm="12" class="mt-3">
                <h3>
                    Consulta vacaciones
                </h3>
            </b-col>
            <b-col sm="12" class="mt-3">
                <div class="marco">
                    <table class="table table-sm table-striped table-bordered" style="font-size: 11px;"> 
                        <thead>
                            <tr>
                                <th style="width: 10%;text-align: center;">
                                    Código
                                </th>
                                <th style="width: 80%;">
                                    Nombre
                                </th>
                                <th style="width: 10%;text-align: center;">
                                    ...
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in colaboradores" :key="index">
                                <td style="text-align: center;">
                                    {{item.codigo}}
                                </td>
                                <td>
                                    {{item.nombre}}
                                </td>
                                <td style="text-align: center;">
                                    <b-button type="button" variant="info" style="font-size: 9px;" size="sm" @click="abrir_modal(item)"><i class="fas fa-eye"></i></b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </b-col>
        </b-row>

        <InfoVacaciones v-if="info_modal" :colaborador="obj_colaborador" v-on:cerrar="cerrar_modal" />

    </b-container>
</template>

<script>
import { mapState } from 'vuex'

import InfoVacaciones from './InfoVacaciones.vue'

export default {
    name:'ConsultaVacaciones',
    components:{
        InfoVacaciones
    },
    computed: {
        ...mapState(['colaboradores'])
    },
    data() {
        return {
            info_modal: false,
            obj_colaborador: {}
        }
    },
    methods: {
        abrir_modal(obj){
            this.obj_colaborador = obj
            this.info_modal = true
        },
        cerrar_modal(){
            this.info_modal = false
        }
    },
}
</script>

<style>

</style>