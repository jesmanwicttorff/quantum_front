<template>
    <b-container fluid class="px-4 py-0">
        <v-row>
            <v-col cols="6">
                <v-card>
                    <v-card-title class="primary white--text"> Agendamiento </v-card-title>
                    <Rangecalendario v-on:guardarfecha="getVisitas"/>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card>
                    <v-card-title class="primary white--text"> Visitas </v-card-title>
                       <v-card-text class="py-0">
                            <v-timeline dense>
                                <v-timeline-item
                                v-for="(visita, i) in visitas"
                                :key="i"
                                :color="visita.colorInicio"
                                small
                                fill-dot
                                >
                                <template>
                                    <v-row dense>
                                        <v-col cols="4">
                                            <span
                                            :class="` font-weight-bold ${visita.colorInicio}--text px-0`"
                                            v-text="visita.yearInicio"
                                            ></span>
                                        </v-col>
                                        <v-col cols="3" offset-sm="5">
                                        <span>
                                        {{regionSelected}}
                                        </span>
                                        </v-col>
                                    </v-row>
                                </template>
                                <v-row>
                                    <v-col cols="4">
                                        <span
                                        >2 Tareas   
                                        </span>                                                                    
                                    </v-col>
                                    <v-col cols="3" offset-sm="4">              
                                        <router-link v-if="visita.estado === 1" :to="{ name: 'VisitasGestiones', params: { id: visita.id } }"> 
                                        <v-btn text small class="primary" >Gestionar Visita</v-btn>
                                        </router-link>
                                        <router-link v-if="visita.estado === 2" :to="{ name: 'PDF', params: { id: visita.id } }"> 
                                        <v-btn text small class="error" >Ver Documento</v-btn>
                                        </router-link>   <!--- 1= Visita Pendiente , 2 = Visita Cerrado -->                                                                        
                                    </v-col>                                                                                                                                                 
                                </v-row>
                                <template>
                                    <span
                                    :class="` font-weight-bold ${visita.colorFin}--text px-0`"
                                    v-text="visita.yearFin"
                                    ></span>
                                </template>                             
                                </v-timeline-item>
                            </v-timeline>  
                        </v-card-text>                  
                </v-card>
            </v-col>
        </v-row>
    </b-container>
</template>
<script>
import store from 'store'
import { url } from '../../config/api'
import Rangecalendario from '../../components/elementos/Rangecalendario'
import { color } from 'highcharts'
export default {
    name: "SupremaInicio",
    components: {
        Rangecalendario
    }, 
    data() {         //{ color: 'green',year: '21-09-2020'}
        return {  
            visitas: [],
            user: [{
                usuario_id: store.get('user_usuario_id'), // Los parametros que obtenemos de la url
                cod_corte: store.get('user_cod_corte'),
                cod_tribunal: store.get('user_cod_tribunal')
            }],
            regionSelected: '', // Obtengo la Corte
        }
    },
    created(){
        this.getVisitas()
        this.getCortes() 
                 
    },
    methods:{
        getCortes(){
            const axios = require('axios')
            const req1 = url + '/suprema/cortes' // Link de la llamada
            axios.all([
                axios.get(req1, {
                    params: {
                        cod_corte: this.user[0].cod_corte
                    }
                })
                ]).then(axios.spread((...responses) => {

                    const obj = responses[0].data.recordset
                    this.regionSelected = obj[0].gls_corte

                })).catch(errors => {

            }) 
            
        },

         getVisitas(){
            const axios = require('axios')
            const req1 = url + '/suprema/agendamientos' // Link de la llamada


            axios.all([
                axios.get(req1, {
                    params: {
                        id_usuario: this.user[0].usuario_id
                    }
                    
                    
                })
                ]).then(axios.spread((...responses) => {

                    const data1 = responses[0].data
                    let objAgenda;
                    this.visitas = []
                
                    Object.values(data1.recordset).map((type) => {

                        objAgenda = new Object();// creamos el objeto para asignarle cada elemento del result de consulta
                        
                        objAgenda.formatoIni =  { colorInicio : 'green'  , yearInicio : 'Desde: '+type.fecha_inicio, colorFin : 'orange'  , yearFin: 'Hasta: '+type.fecha_fin, estado: type.estado_agendamiento_id, id:type.id_agendamiento }
                        this.visitas.push(objAgenda.formatoIni) // Subimos el objeto para llenarlo en el array visita
            
                    }) 
                    
                })).catch(errors => {

            })       
                       
        } // cierre de getvisita
    },
}
</script>