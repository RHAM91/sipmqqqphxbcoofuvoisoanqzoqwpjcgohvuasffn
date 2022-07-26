<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                <b-button type="button" size="sm" @click="cerrar" variant="outline-danger">Cerrar</b-button>
            </div>
            <b-container fluid="">
                <form @submit.prevent="guardar">
                    <b-row>
                        <b-col sm="6" class="mt-3">
                            <label for="">Nombre</label>
                            <b-form-input type="text" v-model="nombre" autocomplete="off" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="6" class="mt-3">
                            <label for="">Apellidos</label>
                            <b-form-input type="text" v-model="apellidos" autocomplete="off" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Usuario</label>
                            <b-form-input type="text" v-model="usuario" autocomplete="off" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="6" class="mt-3">
                            <label for="">Contraseña</label>
                            <b-form-input type="password" v-model="pwd1" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="6" class="mt-3">
                            <label for="">Repetir Contraseña</label>
                            <b-form-input type="password" v-model="pwd2" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <label for="">Género</label>
                            <select class="form-control form-control-sm" required v-model="genero">
                                <option value="">Seleccionar</option>
                                <option value="M">Másculino</option>
                                <option value="F">Femenino</option>
                            </select>
                        </b-col>
                        <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                            <b-button type="submit" size="sm" variant="success">Guardar</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-container>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { minix } from '@/components/functions/alertas'
export default {
    name: 'AgregarUsuario',
    data() {
        return {
            nombre: '',
            apellidos: '',
            usuario: '',
            pwd1: '',
            pwd2: '',
            genero: ''
        }
    },
    methods: {
        cerrar(){
            this.$emit('salir')
        },
        async guardar(){

            if (this.pwd1 == this.pwd2) {

                if (this.pwd1.length < 8) {
                    minix({icon: 'info', mensaje: 'La contraseña debe tener al menos 8 caracteres', tiempo: 3000})
                }else{

                    let f = {
                        api: 'usuarios',
                        pull: false,
                        formulario:{
                            nombre: this.nombre,
                            apellidos: this.apellidos,
                            usuario: this.usuario,
                            pass: this.pwd1,
                            sexo: this.genero
                        }
                    }
                    await this.saveData(f)
    
                    this.nombre = ''
                    this.apellidos = ''
                    this.usuario = ''
                    this.pwd1 = ''
                    this.pwd2 = ''
                    this.genero = ''
                }

            }else{
                minix({icon: 'error', mensaje: 'Las contraseñas no coinciden', tiempo: 3000})
            }


        },
        ...mapActions(['saveData'])
    },
}
</script>

<style>

</style>