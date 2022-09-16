<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                <b-button type="button" variant="outline-danger" size="sm" @click="salir">Cerrar</b-button>
            </div>
            <b-container fluid="">
                <form @submit.prevent="actualizar">
                    <b-row>
                        <b-col sm="10" class="mt-3">
                            <label for="">Área</label>
                            <b-form-input type="text" id="edit_nombre_area" v-model="edit_nombre_area" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="2" class="mt-5">
                            <b-button type="submit" block variant="info" size="sm">Actualizar</b-button>
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
    name: 'EditarAreas',
    props: ['item'],
    data() {
        return {
            edit_nombre_area: ''
        }
    },
    methods: {
        salir(){
            this.$emit('cerrar')
        },
        async actualizar(){
            let f = {
                api: 'areas',
                pull: true,
                modo: 'param',
                id: this.item.id,
                formulario: {
                    nombre_area: this.edit_nombre_area.toUpperCase()
                }
            }

            await this.updateData(f)
            this.salir()
        },
        ...mapActions(['updateData'])
    },
    mounted() {
        document.getElementById('edit_nombre_area').focus()
        this.edit_nombre_area = this.item.nombre_area
    },
}
</script>

<style>

</style>