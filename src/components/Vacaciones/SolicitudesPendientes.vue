<template>
    <b-container fluid="">
        <b-row>
            <b-col sm="12" class="mt-3">
                <h3>
                    Solicitudes pendientes
                </h3>
            </b-col>

            <b-col sm="12" class="mt-3">
                <table class="table table-sm table-striped table-bordered" style="font-size: 11px;">
                    <thead>
                        <tr>
                            <th style="width: 25%;">
                                Código
                            </th>
                            <th style="width: 35%;">
                                Solicitante
                            </th>
                            <th style="width: 25%;">
                                Fecha
                            </th>
                            <th style="width: 15%;text-align: center;">
                                ...
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in solicitudes" :key="index">
                            <td>
                                {{item.dpi}}
                            </td>
                            <td>
                                {{item.nombre}}
                            </td>
                            <td>
                                {{item.fecha_inicio | nfecha}}
                            </td>
                            <td style="text-align: center;">
                                
                                <b-button type="button" variant="warning" style="font-size: 9px;" size="sm" @click="abrir_modal(item)"><i class="fas fa-eye"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>

        <ModalAprobacion v-if="modal" :datos_usuario="items" v-on:salir="cerrar_modal" />


    </b-container>

<!-- @NOTA: en el modal para ver la descripción de la solicitud, se debe dejar un comentario obligatorio para indicar que se aprobó -->
</template>

<script>
import { mapActions, mapState } from 'vuex'

import ModalAprobacion from './ModalAprobacion.vue'
import moment from 'moment'
// import { ipcRenderer } from 'electron'
// window.ipcRenderer = ipcRenderer

export default {
    name: 'SolicitudesPendientes',
    filters:{
        nfecha: function(value){
            let n = moment(value).format('DD-MM-YYYY')

            return n
        }
    },
    components: {
        ModalAprobacion
    },
    computed: {
        ...mapState(['solicitudes'])
    },
    data() {
        return {
            modal: false,
            datos: [],
            items: ''
        }
    },
    methods: {
        abrir_modal(item){
            this.items = item
            this.modal = true
        },
        cerrar_modal(){
            this.modal = false
        },
        // enviar_notificacion(){
        //     ipcRenderer.send('notificacion_solicitud')
        // },
        ...mapActions(['getData'])
    }
}
</script>

<style>

</style>