<template>
    <div class="bxa">
        <div class="logo_cargando">
            <img src="@/assets/pacman.gif"  style="width: 100%;height: 100%;" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Cargando',
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>

<style>
    .bxa{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(255, 255, 255, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1001;
    }
        .logo_cargando{
            width: 150px;
            height: 150px;
            
        }

</style>