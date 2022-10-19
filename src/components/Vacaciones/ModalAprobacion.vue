<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                <b-button type="button" variant="outline-danger" size="sm" @click="cerrar_modal">Cerrar</b-button>
            </div>
            <b-container fluid="">
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <h3>
                            {{datos_usuario.nombre}}
                        </h3>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <table class="table table-sm table-striped table-bordered" style="font-size: 11px;">
                            <thead>
                                <tr>
                                    <th style="width: 30%;">
                                        Datos
                                    </th>
                                    <th style="width: 70%;">
                                        ...
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Días disponibles
                                    </td>
                                    <td>
                                        {{info_dias.dias_disponibles}}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        Días gozados
                                    </td>
                                    <td>
                                        {{info_dias.dias_gozados}}
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        Días restantes
                                    </td>
                                    <td>
                                        {{info_dias.dias_restantes}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </b-col>
                    <b-col sm="6" class="mt-4">
                        <b-button type="button" block variant="success" size="sm" @click="aprobar">Aprobar</b-button>
                    </b-col>

                    <b-col sm="6" class="mt-4">
                        <b-button type="button" block variant="danger" size="sm" @click="denegar">Denegar</b-button>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { pregunta, textarea_, texto } from '../functions/alertas'
export default {
    name: 'ModalAprobacion',
    props:['datos_usuario'],
    data() {
        return {
            info_dias: {}
        }
    },
    methods: {
        cerrar_modal(){
            this.$emit('salir')
        },
        async obtener_dias(){
            let f = {
                api: `solicitudes/calculo_dias/${this.datos_usuario.dpi}`
            }

            let r = await this.getData(f)
            this.info_dias = r
        },
        async aprobar(){

             pregunta({titulo: 'Seguro que deseas aprobar?', texto: 'Las vacaciones serán autorizadas', afirmacion: 'Si, aprobar!'}, async (i) =>{

                if (i) {
                    let f = {
                        api: 'solicitudes/movimientos_de_solicitudes',
                        id: this.datos_usuario.id,
                        pull: false,
                        modo: 'param',
                        formulario: {
                            aprobado: 1
                        }
                    }
        
                    await this.updateData(f)
                    await this.pullData({api: 'solicitudes'})
                    this.cerrar_modal()
                }
            })


        },

        async denegar(){

            textarea_(async(i) =>{
                
                let f = {
                    api: 'solicitudes/movimientos_de_solicitudes',
                    id: this.datos_usuario.id,
                    pull: false,
                    modo: 'param',
                    formulario: {
                        aprobado: 2,
                        comentarios: i
                    }
                }

                await this.updateData(f)
                await this.pullData({api: 'solicitudes'})
                this.cerrar_modal()

            })

        },
        ...mapActions(['getData', 'updateData', 'pullData'])
    },
    mounted() {
        this.obtener_dias()
    },
}
</script>

<style>

</style>