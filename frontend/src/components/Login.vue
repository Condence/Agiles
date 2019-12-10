<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 xl4 v-bind:style="{ margin: + '10px' }">
            <v-card> 
                <v-card-text>
                    <v-text-field v-model="correo" autofocus color="accent" label="Email" required>
                    </v-text-field>
                    <v-text-field v-on:keyup.enter="onEnter" v-model="password" type="password" color="accent" label="Password" required>
                    </v-text-field>
                    <v-flex class="red--text" v-if="errorM">
                        {{errorM}}
                    </v-flex>
                </v-card-text>
                <v-card-actions class="px-3 pb-3">
                    <v-flex text-xs-right>
                        <v-btn @click="ingresar()" color="primary">Ingresar</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios';
export default {
    data (){
        return{
            correo:'',
            password:'',
            errorM:null
        }
    },
    methods:{
        ingresar(){ 
            axios.post('login',{correo: this.correo, password: this.password})
            .then(respuesta =>{ 
                return respuesta.data;
            })
            .then(data =>{
                this.$store.dispatch("guardarToken",data.data.token);
                this.$router.push({name: 'home'});
            })
            .catch(error =>{
                console.log(error);  
                this.errorM=null;
                if (error.response.status==404){
                    this.errorM='No existe el usuario o las credenciales son incorrectas.';
                } else{
                    this.errorM='Ocurrió un error con el servidor.';
                }  
            });
        },
        onEnter: function() { 
            this.ingresar();
        }
    }
}
</script>

