<template>
    <b-container fluid="">
        <form @submit.prevent="guardar">
            <b-row>
                <b-col sm="12" class="mt-3">
                    <h3>
                        Puestos
                    </h3>
                </b-col>
                <b-col sm="10" class="mt-3">
                    <label for="">Nombre del puesto</label>
                    <b-form-input type="text" id="input_nombre_puesto" v-model="nombre_puesto" required size="sm"></b-form-input>
                </b-col>
                <b-col sm="2" class="mt-5">
                    <b-button type="submit" block variant="success" size="sm">Guardar</b-button>
                </b-col>
                
                <b-col sm="12" class="mt-3">
                    <table class="table table-striped table-bordered table-sm" style="font-size: 11px;">
                        <thead>
                            <tr>
                                <th style="width: 90%;">
                                    Puesto
                                </th>
                                <th style="width: 10%;text-align: center;">
                                    ...
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in puestos" :key="index">
                                <td>
                                    {{item.nombre_puesto}}
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

import EditarArea from './EditarPuesto.vue'

export default {
    name: 'Puestos',
    computed: {
        ...mapState(['puestos'])
    },
    components:{
        EditarArea
    },
    data() {
        return {
            nombre_puesto: '',
            modal_actualizar: false,
            id_elemento: ''
        }
    },
    methods: {
        async guardar(){
            let f = {
                api: 'puestos',
                pull: true,
                formulario: {
                    nombre_puesto: this.nombre_puesto.toUpperCase()
                }
            }
            await this.saveData(f)
            this.nombre_puesto = ''
            document.getElementById('input_nombre_puesto').focus()
        },
        async eliminar(id){
            pregunta({titulo: 'Seguro que deseas borrar?', texto: 'Está a punto de borrar este elemento', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let f = {
                        api: 'puestos',
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
        document.getElementById('input_nombre_puesto').focus()
    },
}
</script>

<style>

</style>