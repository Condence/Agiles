<template>
    <v-layout align-center justify-center>
        <v-flex xs9>
            <v-toolbar flat color="white">
               
                <v-spacer></v-spacer>
                <v-text-field class="text-xs-center" v-model="search" append-icon="search" 
                label="Búsqueda" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
              
            </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="categorias"
                :search="search"
                class="elevation-1"
            >
                <template v-slot:items="props">
                <td class="justify-center layout px-0">
                    <v-icon
                    small
                    class="mr-2"
                    @click="editItem(props.item)"
                    >
                    edit
                    </v-icon>
                    <template v-if="props.item.estado">
                        <v-icon
                        small
                        @click="activarDesactivarMostrar(2,props.item)"
                        >
                        block
                        </v-icon>
                    </template>
                    <template v-else>
                        <v-icon
                        small
                        @click="activarDesactivarMostrar(1,props.item)"
                        >
                        check
                        </v-icon>
                    </template>
                </td>
                <td>{{ props.item.nombres }}</td>
                <td>{{ props.item.descripcion }}</td>
                <td>
                    <div v-if="props.item.estado">
                        <span class="blue--text">Activo</span>
                    </div>
                    <div v-else>
                        <span class="red--text">Inactivo</span>
                    </div>
                </td>                
                </template>
                <template v-slot:no-data>
                <v-btn color="primary" @click="listar()">Resetear</v-btn>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios'
export default { 
        data(){
            return{
                dialog: false,
                search:'',
                categorias:[],
                headers: [
                    { text: 'ID', value: 'usuario_id', sortable: false },
                    { text: 'Nombre', value: 'nombres', sortable: false },
                    { text: 'Apellidos', value: 'apellidos', sortable: true },
                    { text: 'Correo', value: 'correo', sortable: false },
                    { text: 'Asistencias', value: 'asistencias.length', sortable: false },
                ],
                editedIndex: -1,
                _id:'',
                nombre:'',
                descripcion:'',
                valida:0,
                validaMensaje:[],
                adModal:0,
                adAccion:0,
                adNombre:'',
                adId:''
            }
        },
        computed: {
            formTitle () {
            return this.editedIndex === -1 ? 'Nuevo registro' : 'Editar registro'
            }
        },
        watch: {
            dialog (val) {
            val || this.close()
            }
        },
        created () {
            this.listar()
        },
        methods: {
            listar(){
                let me=this; 
                axios.get('users').then(function (response){
                 
                    me.categorias=response.data;
                }).catch(function(error){
                    console.log(error);
                });

            }
        }
    } 
</script>

<style>

</style>