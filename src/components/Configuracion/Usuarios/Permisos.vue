<template>
    <b-row>
        <div class="marco2">
            <b-col sm="12" class="mt-2">
                <div class="titulo_fichausuario">
                    Permisos
                </div>
            </b-col>
            <b-col sm="12" class="mt-3 ">
                
                    <table class="table table-sm table-striped table-bordered" style="font-size: 12px;">
                        <thead>
                            <tr>
                                <th style="width: 50%">
                                    Módulo
                                </th>
                                <th style="width: 25%; text-align: center;">
                                    Estado
                                </th>
                                <th style="width: 25%; text-align: center;">
                                    ...
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in permisos" :key="index">
                                <td>
                                    {{item.modulo}}
                                </td>
                                <td style="text-align: center;">    
                                    {{item.ver}}
                                </td>
                                <td style="text-align: center;">
                                    <b-button type="button" size="sm" variant="primary" @click="abrirModalPermisos(item)"><i class="far fa-eye"></i></b-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
            </b-col>

            <ModalPermisos v-if="modal_permisos" :i="itemp" v-on:salir="cerrarModalPermisos" />

        </div>
    </b-row>

</template>

<script>
import {mapActions } from 'vuex'
import ModalPermisos from './ModalPermisos.vue'


export default {
    name: 'Permisos',
    props:['itm'],
    components: {
        ModalPermisos
    },
    data() {
        return {
            itemp: {},
            modal_permisos: false,
            permisos: []
        }
    },
    methods: {
        abrirModalPermisos(item){
            this.itemp = item
            this.modal_permisos = true
        },
        async cerrarModalPermisos(){
            this.modal_permisos = false
            await this.obtener_lista_permisos()
        },
        async obtener_lista_permisos(){
            let r = await this.getData({api: `permisos/por_usuario/${this.itm}`})
            delete r.tipo // borra el elemento tipo porque no es parte de la lista de permisos
            this.permisos = r
        },
        ...mapActions(['getData'])
    },
    mounted() {
        this.obtener_lista_permisos()
    },
}
</script>

<style>
    .contenedor_modulos{
        border: 1px solid black;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
        .box_modulo{
            width: 175px;
            height: 175px;
            border: 1px solid red;
            margin-right: 15px;
            margin-bottom: 15px;
            background-color: white;
            border: 1px solid #d6d6d6;
        }
            .titulo_box_modulo{
                width: 100%;
                height: 40px;
                text-align: center;
                font-weight: bold;
                background-color: white;
            }

    .marco2{
        width: 100%;
        height: calc(100vh - 420px);
        overflow: auto;
    }
</style>