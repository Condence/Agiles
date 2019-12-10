<template>
    <v-layout align-center justify-center>
        <v-flex xs9> 
            <v-container>
                <v-row>
                    <h2>Buscar entrada</h2>
                </v-row> 
            </v-container>   
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
                    { text: 'Opciones', value: 'opciones', sortable: false },
                    { text: 'Nombre', value: 'nombre', sortable: true },
                    { text: 'Descripción', value: 'descripcion', sortable: false },
                    { text: 'Estado', value: 'estado', sortable: false },
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
                console.log("si entra");
                let me=this;
                let header={"Token" : this.$store.state.token};
                let configuracion= {headers : header};            
                axios.get('users').then(function (response){
                    console.log(response);
                    me.categorias=response.data;
                }).catch(function(error){
                    console.log(error);
                });

            },
            limpiar(){
                this._id='';
                this.nombre='';
                this.descripcion='';
                this.valida=0;
                this.validaMensaje=[];
                this.editedIndex=-1;
            },
            validar(){
                this.valida=0;
                this.validaMensaje=[];
                if(this.nombre.length<1 || this.nombre.length>50){
                    this.validaMensaje.push('El nombre de la categoría debe tener entre 1-50 caracteres.');
                }
                if(this.descripcion.length>255){
                    this.validaMensaje.push('La descripción de la categoría no debe tener más de 255 caracteres.');
                }
                if (this.validaMensaje.length){
                    this.valida=1;
                }
                return this.valida;
            },
            guardar(){
                let me=this;
                let header={"Token" : this.$store.state.token};
                let configuracion= {headers : header};
                if (this.validar()){
                    return;
                }
                if (this.editedIndex >-1){
                    //Código para editar
                    axios.put('categoria/update',{'_id':this._id,'nombre':this.nombre,'descripcion':this.descripcion},configuracion)
                    .then(function(response){
                        me.limpiar();
                        me.close();
                        me.listar();
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                }else{
                    //Código para guardar
                    axios.post('categoria/add',{'nombre':this.nombre,'descripcion':this.descripcion},configuracion)
                    .then(function(response){
                        me.limpiar();
                        me.close();
                        me.listar();
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                }
            },
            editItem (item) {
                this._id=item._id;
                this.nombre=item.nombre;
                this.descripcion=item.descripcion;
                this.dialog = true;
                this.editedIndex=1;
            },
            activarDesactivarMostrar(accion,item){
                this.adModal=1;
                this.adNombre=item.nombre;
                this.adId=item._id;
                if (accion==1){
                    this.adAccion=1;
                } else if(accion==2){
                    this.adAccion=2;
                } else{
                    this.adModal=0;
                }
            },
            activarDesactivarCerrar(){
                this.adModal=0;
            },
            activar(){
                let me=this;
                let header={"Token" : this.$store.state.token};
                let configuracion= {headers : header};
                axios.put('categoria/activate',{'_id':this.adId},configuracion)
                    .then(function(response){
                        me.adModal=0;
                        me.adAccion=0;
                        me.adNombre='';
                        me.adId='';
                        me.listar();
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            },
            desactivar(){
                let me=this;
                let header={"Token" : this.$store.state.token};
                let configuracion= {headers : header};
                axios.put('categoria/deactivate',{'_id':this.adId},configuracion)
                    .then(function(response){
                        me.adModal=0;
                        me.adAccion=0;
                        me.adNombre='';
                        me.adId='';
                        me.listar();
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            },
            close () {
                this.dialog = false;
            }
        }
    }
</script>


<style>

</style>