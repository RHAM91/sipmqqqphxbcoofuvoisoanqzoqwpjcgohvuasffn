<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                <b-button type="button" variant="outline-danger" size="sm" @click="salir">Cerrar</b-button>
            </div>
            <div class="datos_dias">
                <div class="cuandro_dato">
                    <div class="titulo_dato">
                        Total de días
                    </div>
                    <div class="contador_dato">
                        {{obj.dias_disponibles}}
                    </div>
                </div>

                <div class="cuandro_dato">
                    <div class="titulo_dato">
                        Días gozados
                    </div>
                    <div class="contador_dato">
                        {{obj.dias_gozados}}
                    </div>
                </div>

                <div class="cuandro_dato">
                    <div class="titulo_dato">
                        Días restantes
                    </div>
                    <div class="contador_dato">
                        {{obj.dias_restantes}}
                    </div>
                </div>
            </div>
            <b-container ƒluid="">
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <table class="table table-sm table-striped table-bordered">
                            <tr>
                                <td style="width: 40%;">
                                    Fecha ingreso planilla
                                </td>
                                <td style="width: 60%;">
                                    {{colaborador.fecha_ingreso_planilla | nfecha}}
                                </td>
                            </tr>
                        </table>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'
export default {
    name: 'InfoVacacioens',
    props:['colaborador'],
    filters:{
        nfecha: function(val){
            let n = moment(val).format('DD-MM-YYYY')
            return n
        }
    },
    data() {
        return {
            obj: {}
        }
    },
    methods: {
        salir(){
            this.$emit('cerrar')
        },
        async obtenerDias(){
            let f = {
                api: `solicitudes/calculo_dias/${this.colaborador.dpi}`
            }

            let r = await this.getData(f)
            this.obj = r
        },
        ...mapActions(['getData'])
    },
    mounted() {
        this.obtenerDias()
    },
}
</script>

<style>
    .datos_dias{
        width: 100%;
        height: 160px;
        display: flex;
        justify-content: space-between;
    }
        .cuandro_dato{
            width: 225px;
            height: 100%;
        }

            .titulo_dato{
                width: 100%;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 25px;
                font-weight: bold;
            }

            .contador_dato{
                width: 100%;
                height: calc(160px - 40px);
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 50px;
                font-weight: bold;
            }
</style>