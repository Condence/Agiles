<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-text-field v-model="nombre" autofocus color="accent" label="Nombre" required></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12">
                                <v-text-field v-model="correo" autofocus color="accent" label="Email" required>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    v-model="password" 
                                    label="Password"
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
                            ></v-text-field>
                            </v-col> 
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="3">
                                <v-select
                                v-model="select"
                                v-validate="'required'" 
                                label="Genero"
                                :items="items"
                                
                                data-vv-name="select"
                                required
                                ></v-select>
                            </v-col>
                            <v-col cols="12" md="3">
                                
                            </v-col>
                            <v-col cols="12" md="3">
                                
                            </v-col>
                            <v-col cols="12" md="3">
                                
                            </v-col>
                        </v-row>
                    </v-container> 
                    <v-flex class="red--text" v-if="errorM">
                        {{errorM}}
                    </v-flex>
                </v-card-text>
                <v-card-actions class="px-3 pb-3">
                    <v-flex text-xs-right>
                        <v-btn @click="ingresar()" color="primary">Registrarse</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data: () => ({
        select: null,
        items: [
            'Hombre',
            'Mujer'
        ]
    })
}
</script>

<style>

</style>