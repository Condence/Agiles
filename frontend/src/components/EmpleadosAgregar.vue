<template>
    <v-layout align-center justify-center>
        <v-flex xs9> 
            <v-container>
                <v-row>
                    <v-card>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="12">
                                        <v-text-field v-model="usuario_id" autofocus color="accent" label="Usuario ID" required></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6">
                                        <v-text-field v-model="nombres" autofocus color="accent" label="Nombre" required></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6">
                                        <v-text-field v-model="apellidos" autofocus color="accent" label="Apellidos" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <v-text-field v-model="correo" :rules="emailRules" autofocus color="accent" label="Email" required>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-text-field
                                            v-model="password" 
                                            label="Password"
                                            type="password"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col
                                    cols="12"
                                    md="6"
                                    >
                                    <v-text-field
                                        v-model="repeat_password" 
                                        label="Repeat Password"
                                        required
                                        type="password"
                                        v-on:keyup.enter="onEnter"

                                    ></v-text-field>
                                    </v-col> 
                                </v-row> 
                            </v-container> 
                            <v-flex class="red--text" v-if="errorM">
                                {{errorM}}
                            </v-flex>
                        </v-card-text>
                        <v-card-actions class="px-3 pb-3">
                            <v-flex text-xs-right>
                                <v-btn @click="registrar()" color="primary">Registrar</v-btn>
                            </v-flex>
                        </v-card-actions>
                    </v-card>
                </v-row> 
            </v-container>   
        </v-flex>
    </v-layout>
</template>

<script>
import axios from 'axios';
export default {
    data (){
        return{
            usuario_id:'',
            nombres:'',
            apellidos:'',
            correo:'',
            password:'',
            repeat_password: '', 
            errorM:null,
            emailRules: [
                v => !!v || 'Ingresa un correo',
                v => /.+@.+\..+/.test(v) || 'Formato de correo incorrecto...',
            ],

        }
    },
    methods:{
        registrar(){ 
            
            axios.post('user',{usuario_id: this.usuario_id,nombres:this.nombres,apellidos:this.apellidos,correo:this.correo, password: this.password})
            .then(respuesta =>{ 
                return respuesta;
            })
            .then(data =>{ 
                this.$router.push({name: 'empleados_buscar'});
            })
            .catch(error =>{
                console.log(error);  
                this.errorM=null;
                if (error.response.status==404){
                    this.errorM='No existe el usuario o las credenciales son incorrectas.';
                } else{
                    this.errorM='Ocurrió un error revisa los campos.';
                }  
            });
        },
        onEnter: function() { 
            this.registrar();
        },
        emailMatchError () { 
            return (this.email === this.emailConfirmation) ? '' : 'Email must match'
        }
    },
     
}
</script>

<style>

</style>