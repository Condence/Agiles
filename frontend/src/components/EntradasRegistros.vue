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
                                        <v-text-field v-on:keyup.enter="onEnter" v-model="usuario_id"  autofocus color="accent" label="Usuario ID" required></v-text-field>
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
            errorM:null
        }
    },
    methods:{
        registrar(){  
            axios.post('asistencia',{usuario_id: this.usuario_id})
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
        }
    }
}
</script>

<style>

</style>