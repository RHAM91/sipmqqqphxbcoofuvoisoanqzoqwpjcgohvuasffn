<template>
    <b-container fluid="">
        <b-row>
            <b-col sm="12" class="mt-3">
                <h3>
                    Colaboradores
                </h3>
            </b-col>

            <b-col sm="12" class="mt-3">
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
                                <b-button type="button" variant="info" style="font-size: 9px;" size="sm" @click="info_colaborador(item.codigo)"><i class="fas fa-eye"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>

        </b-row>

        <ModalCrearColaboradores v-if="modal" v-on:salir="cerrarModal" />
        <InfoColaborador v-if="info_col" :codigo="codigo_colaborador" v-on:salir="cerrar_info_colaborador" />
        

        <div class="btn_agregar_colaborador" @click="mostrarModal">
            <i class="fas fa-plus"></i>
        </div>

    </b-container>
</template>

<script>
import { mapState } from 'vuex'

import ModalCrearColaboradores from './CrearColaboradorModal.vue'
import InfoColaborador from './InfoColaborador.vue'

export default {
    name: 'ColaboradoresLista',
    components:{
        ModalCrearColaboradores,
        InfoColaborador
    },
    computed: {
        ...mapState(['colaboradores'])
    },
    data() {
        return {
            modal: false,
            info_col: false,
            codigo_colaborador: ''
        }
    },
    methods: {
        mostrarModal(){
            this.modal = true
        },
        cerrarModal(){
            this.modal = false
        },
        info_colaborador(codigo){
            this.codigo_colaborador = codigo
            this.info_col = true
        },
        cerrar_info_colaborador(){
            this.info_col = false
        }
    },
}
</script>

<style>
    .btn_agregar_colaborador{
        position: fixed;
        bottom: 15px;
        right: 15px;
        background-color: #da7635;
        border-radius: 50%;
        width: 45px;
        height: 45px;
        color: white;
        transition: .4s ease;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .btn_agregar_colaborador:hover{
            background-color: #de6228;
        }
</style>