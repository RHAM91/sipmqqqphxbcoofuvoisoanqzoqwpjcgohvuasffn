<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-3">
                <h3>
                    Formulario de solicitud
                </h3>
            </b-col>

            <b-col sm="12" class="mt-3">
                <label for="">Solicitante</label>
                <b-form-input type="text" size="sm" readonly placeholder="F2 para buscar"></b-form-input>
            </b-col>

            <b-col sm="12" class="mt-3">
                <label for="">Periódo de trabajo</label>
                <select class="form-control form-control-sm">
                    <option value="">Selecciona</option>
                    <!-- Se debe calcular los años en los que aún tiene vacacioes para que aparezcan los periodos-->
                    <option value="2021">Periodo 2021</option>
                    <option value="2022">Periodo 2022</option>
                </select>
            </b-col>

            <b-col sm="12" class="mt-3">
                <label for="">Los días a gozar serán de:</label>
                <b-form-input type="number" size="sm"></b-form-input>
            </b-col>

            <b-col sm="6" class="mt-3">
                <label for="">Fecha de inicio</label>
                <b-form-input type="date" size="sm"></b-form-input>
            </b-col>

            <b-col sm="6" class="mt-3">
                <label for="">Fecha de final</label>
                <b-form-input type="date" size="sm"></b-form-input>
            </b-col>

            <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                <b-button type="button" variant="success" size="sm">Grabar</b-button>
            </b-col>

        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'Formulario',
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>

<style>

</style>