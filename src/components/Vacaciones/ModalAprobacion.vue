<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                <b-button type="button" variant="outline-danger" size="sm" @click="cerrar_modal">Cerrar</b-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalAprobacion',
    data() {
        return {
            
        }
    },
    methods: {
        cerrar_modal(){
            this.$emit('salir')
        }
    },
}
</script>

<style>

</style>