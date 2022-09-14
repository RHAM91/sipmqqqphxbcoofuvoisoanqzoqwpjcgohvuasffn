<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                <b-button type="button" variant="outline-danger" size="sm" @click="cerrar">Cerrar</b-button>
            </div>
            <b-container fluid="">
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <h2>
                            {{this.datos.nombre}}
                        </h2>
                    </b-col>

                    <b-col sm="3" class="mt-3">
                        <b-button type="button" variant="info" block size="sm">
                            <b-icon icon="pencil" aria-hidden="true"></b-icon> Editar
                        </b-button>
                    </b-col>
                    <b-col sm="3" class="mt-3">
                        <b-button type="button" variant="danger" block size="sm">
                            <b-icon icon="trash" aria-hidden="true"></b-icon> Borrar
                        </b-button>
                    </b-col>
                    <b-col sm="3" class="mt-3">
                        
                    </b-col>
                    <b-col sm="3" class="mt-3">
                        
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <table class="table table-sm table-bordered table-striped" style="font-size: 11px;">
                            <thead>
                                <tr>
                                    <th style="width: 20%;">
                                        Datos
                                    </th>
                                    <th style="width: 80%;">
                                        Descripción
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Código
                                    </td>
                                    <td>
                                        {{this.datos.codigo}}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Área de trabajo
                                    </td>
                                    <td>
                                        {{this.datos.area_de_trabajo}}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Puesto de trabajo
                                    </td>
                                    <td>
                                        {{this.datos.puesto_de_trabajo}}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Fecha de ingreso
                                    </td>
                                    <td>
                                        {{this.datos.fecha_ingreso_planilla | nfecha}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
    name: 'InfoColaborador',
    props:['codigo'],
    filters:{
        nfecha: function(val){
            let n = moment(val).format('DD/MM/YYYY')
            return n
        }
    },
    computed: {
        ...mapState(['colaboradores'])
    },
    data() {
        return {
            datos: {}
        }
    },
    methods: {
        cerrar(){
            this.$emit('salir')
        },
        filtrar_datos(){
            let f = this.colaboradores.filter(r => r.codigo == this.codigo)
            this.datos = f[0]
        }
    },
    mounted() {
        this.filtrar_datos()
    },
}
</script>

<style>

</style>