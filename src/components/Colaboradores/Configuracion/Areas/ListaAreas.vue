<template>
    <b-container fluid="">
        <form @submit.prevent="guardar">
            <b-row>
                <b-col sm="12" class="mt-3">
                    <h3>
                        Áreas
                    </h3>
                </b-col>
                <b-col sm="10" class="mt-3">
                    <label for="">Nombre área</label>
                    <b-form-input type="text" id="input_nombre_area" v-model="nombre_area" required size="sm"></b-form-input>
                </b-col>
                <b-col sm="2" class="mt-5">
                    <b-button type="submit" block variant="success" size="sm">Guardar</b-button>
                </b-col>
                
                <b-col sm="12" class="mt-3">
                    <table class="table table-striped table-bordered table-sm" style="font-size: 11px;">
                        <thead>
                            <tr>
                                <th style="width: 90%;">
                                    Área
                                </th>
                                <th style="width: 10%;text-align: center;">
                                    ...
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in areas" :key="index">
                                <td>
                                    {{item.nombre_area}}
                                </td>
                                <td style="text-align: center;">
                                    <b-button type="button" variant="info" style="font-size: 9px;margin-right: 5px;" size="sm" @click="actualizar(item)">
                                        <b-icon icon="pencil" aria-hidden="true"></b-icon>
                                    </b-button>
                                    <b-button type="button" variant="danger" style="font-size: 9px;" size="sm" @click="eliminar(item.id)">
                                        <b-icon icon="trash" aria-hidden="true"></b-icon>
                                    </b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row>
        </form>


        <EditarArea v-if="modal_actualizar" :item="id_elemento" v-on:cerrar="cerrar_actualizar" />


    </b-container>
</template>

<script>
import { pregunta } from '@/components/functions/alertas'
import { mapActions, mapState } from 'vuex'

import EditarArea from './EditarArea.vue'

export default {
    name: 'Areas',
    computed: {
        ...mapState(['areas'])
    },
    components:{
        EditarArea
    },
    data() {
        return {
            nombre_area: '',
            modal_actualizar: false,
            id_elemento: ''
        }
    },
    methods: {
        async guardar(){
            let f = {
                api: 'areas',
                pull: true,
                formulario: {
                    nombre_area: this.nombre_area.toUpperCase()
                }
            }
            await this.saveData(f)
        },
        async eliminar(id){
            pregunta({titulo: 'Seguro que deseas borrar?', texto: 'Está a punto de borrar este elemento', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let f = {
                        api: 'areas',
                        pull: true,
                        id
                    }

                    await this.deleteData(f)
                }
            })

        },
        actualizar(item){
            this.id_elemento = item
            this.modal_actualizar = true
        },
        cerrar_actualizar(){
            this.modal_actualizar = false
        },
        ...mapActions(['saveData', 'deleteData'])
    },
    mounted() {
        document.getElementById('input_nombre_area').focus()
    },
}
</script>

<style>

</style>