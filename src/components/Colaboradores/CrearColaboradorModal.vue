<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                <b-button type="button" variant="outline-danger" size="sm" @click="cerrar">Cerrar</b-button>
            </div>
            <b-container fluid="">
                <form @submit.prevent="guardar">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <h3>
                                Registro de datos
                            </h3>
                        </b-col>

                        <b-col sm="12" class="mt-3">
                            <label for="">DPI</label>
                            <b-form-input type="text" id="dpi_colaborador" v-model="dpi" required size="sm"></b-form-input>
                        </b-col>

                        <b-col sm="12" class="mt-3">
                            <label for="">Nombre completo</label>
                            <b-form-input type="text" id="nombre_colaborador" v-model="nombre" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="4" class="mt-3">
                            <label for="">Área de trabajo</label>
                            <select class="form-control form-control-sm" v-model="area_de_trabajo" required>
                                <option value="">Selecciona</option>
                                <option v-for="(item, index) in areas" :key="index" :value="item.id">{{item.nombre_area}}</option>
                            </select>
                        </b-col>
                        <b-col sm="4" class="mt-3">
                            <label for="">Puesto de trabajo</label>
                            <select class="form-control form-control-sm" v-model="puesto_de_trabajo" required>
                                <option value="">Selecciona</option>
                                <option v-for="(item, index) in puestos" :key="index" :value="item.id">{{item.nombre_puesto}}</option>
                            </select>
                        </b-col>
                        <b-col sm="4" class="mt-3">
                            <label for="">Lugar</label>
                            <select class="form-control form-control-sm" v-model="lugar">
                                <option value="">Seleccionar</option>
                                <option value="ASOMIEL">ASOMIEL</option>
                                <option value="IGLESIA">IGLESIA</option>
                            </select>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Fecha de ingreso a planilla</label>
                            <b-form-input type="date" v-model="fecha_ingreso" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                            <b-button type="submit" variant="success" size="sm">Guardar</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-container>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'CrearColaborador',
    computed: {
        ...mapState(['areas', 'puestos'])
    },
    data() {
        return {
            dpi: '',
            nombre: '',
            area_de_trabajo: '',
            puesto_de_trabajo: '',
            lugar: '',
            fecha_ingreso: ''
        }
    },
    methods: {
        cerrar(){
            this.$emit('salir')
        },
        async guardar(){
            let f = {
                api: 'colaboradores',
                pull: true,
                formulario: {
                    dpi: this.dpi.trim(),
                    nombre: this.nombre.toUpperCase().trim(),
                    area_de_trabajo: this.area_de_trabajo,
                    puesto_de_trabajo: this.puesto_de_trabajo,
                    lugar: this.lugar,
                    fecha_ingreso_planilla: this.fecha_ingreso
                }
            }

            await this.saveData(f)
            this.dpi = ''
            this.nombre = ''
            this.area_de_trabajo = ''
            this.puesto_de_trabajo = ''
            this.lugar = ''
            this.fecha_ingreso = ''


            document.getElementById('dpi_colaborador').focus()
        },
        ...mapActions(['saveData'])
    },
    mounted() {
        document.getElementById('dpi_colaborador').focus()
    },
}
</script>

<style>

</style>