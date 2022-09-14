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
                            <label for="">Nombre completo</label>
                            <b-form-input type="text" id="nombre_colaborador" v-model="nombre" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="6" class="mt-3">
                            <label for="">Área de trabajo</label>
                            <b-form-input type="text" v-model="area_de_trabajo" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="6" class="mt-3">
                            <label for="">Puesto de trabajo</label>
                            <b-form-input type="text" v-model="puesto_de_trabajo" required size="sm"></b-form-input>
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
import { mapActions } from 'vuex'
export default {
    name: 'CrearColaborador',
    data() {
        return {
            nombre: '',
            area_de_trabajo: '',
            puesto_de_trabajo: '',
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
                    nombre: this.nombre.toUpperCase(),
                    area_de_trabajo: this.area_de_trabajo,
                    puesto_de_trabajo: this.puesto_de_trabajo,
                    fecha_ingreso_planilla: this.fecha_ingreso
                }
            }

            await this.saveData(f)
            this.nombre = ''
            this.area_de_trabajo = ''
            this.puesto_de_trabajo = ''
            this.fecha_ingreso = ''
            document.getElementById('nombre_colaborador').focus()
        },
        ...mapActions(['saveData'])
    },
    mounted() {
        document.getElementById('nombre_colaborador').focus()
    },
}
</script>

<style>

</style>