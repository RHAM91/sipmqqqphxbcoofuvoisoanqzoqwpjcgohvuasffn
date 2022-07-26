<template>
    <b-row>
        <b-col sm="12" class="mt-3">
            <div class="no_hay_registros">
                <div class="contenedor_lost">
                    <div class="logo_lost">
                        <img src="@/assets/astronaut.png" style="width: 100%;" alt="">
                    </div>
                    <div class="titulo_lost">
                        {{titulo}}
                    </div>
                </div>
            </div>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'NoEncontrado',
    props: ['titulo'],
}
</script>

<style>
    .no_hay_registros{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 250px;
    }
        .logo_lost{
            width: 80px;
            height: 80px;
            margin: auto;
        }
        .titulo_lost{
            margin-top: 10px;
        }
</style>