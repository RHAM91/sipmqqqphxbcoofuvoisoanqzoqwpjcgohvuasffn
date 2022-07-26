<template>
    <b-container fluid="">
        <b-row>
            <b-col sm="12" class="mt-3">
                <h3>
                    Usuarios
                </h3>
            </b-col>
            <b-col sm="12" class="mt-4">
                <table class="table table-sm table-striped table-bordered" style="font-size: 12px;">
                    <thead>
                        <tr>
                            <th style="width: 10%;">
                                ID
                            </th>
                            <th style="width: 40%;">
                                Nombre
                            </th>
                            <th style="width: 30%;">
                                Usuario
                            </th>
                            <th style="width: 5%;text-align: center;">
                                Estado
                            </th>
                            <th style="text-align: center;width: 15%;">
                                ...
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in usuarios" :key="index">
                            <td>
                                {{item.id}}
                            </td>
                            <td>
                                {{item.nombre}} {{item.apellidos}}
                            </td>
                            <td>
                                {{item.usuario}}
                            </td>
                            <td style="text-align: center;">
                                {{item.bloqueo | estado}}
                            </td>
                            <td style="text-align: center;">
                                <b-button type="button" size="sm" style="margin-right: 10px;" variant="warning" @click="abrirModalInfo(item.id)"><i class="fas fa-info-circle"></i></b-button>
                                <b-button type="button" size="sm" variant="danger" @click="eliminar(item.id)"><i class="fas fa-trash-alt"></i></b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>

        <div class="btn_add_usuario" @click="modalAgregarUsuario">
            <i class="fas fa-plus"></i>
        </div>


        <ModalAgregarUsuarios v-if="modalAddUsuario" v-on:salir="cerarModalAgregarUsuario" />
        <ModalFichaUsuario v-if="modalFichaUsuario" :itemUsuario="itemUsuario" v-on:salir="cerrarModalInfo" />

    </b-container>
</template>

<script>

import { IP, PUERTO } from '@/config/parametros'
import axios from 'axios'
import { mapActions } from 'vuex'
import { pregunta } from '@/components/functions/alertas'

import ModalAgregarUsuarios from './AgregarUsuario.vue'
import ModalFichaUsuario from './FichaUsuario.vue'

export default {
    name: 'Usuarios',
    components:{
        ModalAgregarUsuarios,
        ModalFichaUsuario
    },
    filters:{
        estado: function(val){
            if(val == 0){
                return 'Activo'
            }else{
                return 'Bloqueado'
            }
        }
    },
    data() {
        return {
            usuarios: [],
            modalAddUsuario: false,
            modalFichaUsuario: false,
            itemUsuario: {}
        }
    },
    methods: {
        async obtenerUsuarios(){
            // let l = await axios.get(`http://${IP}:${PUERTO}/api/usuarios`, this.$store.state.token)
            // this.usuarios = l.data

            let data = {
                api: 'usuarios'
            }

            let f = await this.getData(data)
            this.usuarios = f

        },
        async eliminar(id){

            pregunta({titulo: 'Seguro que deseas borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    let data = {
                        api: 'usuarios',
                        id,
                        pull: false
                    }

                    await this.deleteData(data)
                    await this.obtenerUsuarios()
                }
            })
            
        },
        modalAgregarUsuario(){
            this.modalAddUsuario = true
        },
        cerarModalAgregarUsuario(){
            this.modalAddUsuario = false
            this.obtenerUsuarios()
        },
        abrirModalInfo(item){
            this.itemUsuario = item
            this.modalFichaUsuario = true
        },
        cerrarModalInfo(){
            this.modalFichaUsuario = false
        },
        ...mapActions(['deleteData', 'getData'])
    },
    mounted() {
        this.obtenerUsuarios()
    },
}
</script>

<style>
    .btn_add_usuario{
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background-color: #FF9F1C;
        position: fixed;
        bottom: 15px;
        right: 15px;
        user-select: none;
        cursor: pointer;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 21px;
        transition: .4s ease;
    }
        .btn_add_usuario:hover{
            background-color: #320A28;
        }

        .btn_add_usuario:active{
            background-color: #19647E;
        }
</style>