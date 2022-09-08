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
                        <tr>
                            <td>
                                0001
                            </td>
                            <td>
                                Romario Torres
                            </td>
                            <td>
                                10/09/2022
                            </td>
                            <td style="text-align: center;">
                                <b-button type="button" variant="warning" style="font-size: 9px;" size="sm" @click="abrir_modal()"><i class="fas fa-eye"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>

        <ModalAprobacion v-if="modal" v-on:salir="cerrar_modal" />


    </b-container>

<!-- @NOTA: en el modal para ver la descripción de la solicitud, se debe dejar un comentario obligatorio para indicar que se aprobó -->
</template>

<script>

import ModalAprobacion from './ModalAprobacion.vue'


export default {
    name: 'SolicitudesPendientes',
    components: {
        ModalAprobacion
    },
    data() {
        return {
            modal: false
        }
    },
    methods: {
        abrir_modal(){
            this.modal = true
        },
        cerrar_modal(){
            this.modal = false
        }
    },
}
</script>

<style>

</style>