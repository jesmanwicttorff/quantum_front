<template>
    <v-container fluid class="px-4 py-0">
        <v-form @submit.prevent="guardarfecha">
            <v-row align="center" class="px-6">
                <v-col cols="12" md="6">
                    <v-select item-value="value" item-text="name" :items="regiones" v-model="regionSelected" label="Corte" dense outlined></v-select>
                </v-col>
            </v-row>
            <v-row align="center" class="px-6">
                <v-col cols="12" md="6">
                    <date-picker 
                        v-model="dateRange"  
                        range
                        :format="DatePickerFormat"
                        :disabled-date="(date) => date <= new Date(new Date().setDate(new Date().getDate() - 1))"
                        placeholder="Fecha de Visita"
                    >
                    </date-picker>
                </v-col>
            </v-row>
            <v-row align="center" class="px-6" >
                <v-col cols="2">
                    <v-btn color="primary"  type="submit">Guardar</v-btn>
                </v-col>      
            </v-row>
        </v-form>   
        <v-snackbar v-model="snackbar">
            {{ mensaje }}
            <template v-slot:action="{ attrs }">
                <v-btn red text v-bind="attrs" @click="snackbar = false">
                    Cerrar
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>
<script>
import Vue from 'vue'
import store from 'store'
import { url } from '../../config/api'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/es'
import { mapMutations } from 'vuex' // Esto interpreta el archivo index.js de la carpeta store

export default {
    name: "Calendario",
    data() {
        return {
            user:{
                usuario_id: store.get('user_usuario_id'), // Los parametros que obtenemos de la url
                cod_corte: store.get('user_cod_corte'),
                cod_tribunal: store.get('user_cod_tribunal')
            },                     
            dateRange: [new Date(), new Date()],
            regiones: [], // Select de Corte
            regionSelected : 0, // Corte Seleccionado
            snackbar: false,
            mensaje: '',
            DatePickerFormat: 'DD/MM/YYYY'
      }
    },
    created(){       
        this.getCortes() 
    },
    methods: {
        guardarfecha() {
            const axios = require('axios')
            const req1 = url + '/suprema/insertAgendamientos' // Link de la llamada
            axios.all([
                axios.get(req1, {
                    params: {
                        id_usuario: this.user.usuario_id,
                        cod_corte: this.user.cod_corte,
                        fechaInicio: this.dateRange[0],
                        fechaTermino: this.dateRange[1]
                    }
                })
            ]).then(axios.spread((...responses) => {

                this.snackbar = true
                this.mensaje = 'La visita fue agregado con exito'                
                this.$emit("guardarfecha") // Envio el evento
            })).catch(errors => {

            })

        }, // fin cierre guardarfecha 
        getCortes(){
            const axios = require('axios')
            const req1 = url + '/suprema/cortes' // Link de la llamada
            axios.all([
                axios.get(req1, {
                    params: {
                        cod_corte: this.user.cod_corte
                    }
                })               
                ]).then(axios.spread((...responses) => {
                    const obj = responses[0].data.recordset                  
                    this.regiones.push({value: obj[0].cod_corte, name: obj[0].gls_corte}) // hacemos el push para el select de la corte 
                    this.regionSelected = obj[0].cod_corte // Seleccionamos el codigo de la corte
                })).catch(errors => {
            })
        }
    },
    components:{
        DatePicker
    }
}
</script>