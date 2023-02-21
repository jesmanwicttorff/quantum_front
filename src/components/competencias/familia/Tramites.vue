<template>
  <b-container fluid class="py-3">       
        <b-container fluid class="pdf py-1">   
            <b-row xs="12">
                <b-col sm="4" align-v="center">
                       <ValidationObserver ref="observer">
                        <form>
                            <v-stepper v-model="e6" vertical>
                                <v-stepper-step :complete="e6 > 1" step="1">
                                    Seleccione rango de busqueda
                                    <small class="py-1">{{this.$settingDate(this.dateRange[0])}} al {{this.$settingDate(this.dateRange[1])}}</small>
                                </v-stepper-step>
                                <v-stepper-content step="1">
                                    <v-row sm="3">
                                        <date-picker v-model="dateRange" range placeholder="Seleccione Rango" class="px-4">
                                            <template >
                                                <v-container style="text-align: left">
                                                    <button class="mx-btn mx-btn-text">
                                                    7 Antes
                                                    </button>
                                                    <span>-</span>
                                                    <button class="mx-btn mx-btn-text">
                                                    30 Antes
                                                    </button>
                                                    <span>-</span>
                                                    <button class="mx-btn mx-btn-text">
                                                    60 Antes
                                                    </button>
                                                </v-container>
                                            </template>      
                                        </date-picker>
                                    </v-row> 
                                    <v-row class="px-4 py-2">
                                        <v-btn  color="primary" @click="e6 = 2">Continue</v-btn>
                                    </v-row>
                                </v-stepper-content>
                                <v-stepper-step :complete="e6 > 2" step="2">Tipo de Tramite
                                    <small  class="py-1">{{tramiteSelect}}</small>
                                </v-stepper-step>
                                <v-stepper-content step="2">
                                    <v-row align="center">
                                        <v-col class="d-flex" cols="12" sm="12">
                                            <ValidationProvider v-slot="{ errors }" name="select" rules="required">
                                                <v-select
                                                v-model="selectTipTra"
                                                @change="onChange($event)"
                                                :items="tramites"
                                                label="Tramite"
                                                :error-messages="errors"
                                                required
                                                >
                                                </v-select>
                                            </ValidationProvider>
                                        </v-col>
                                    </v-row>
                                    <v-btn color="primary" @click="e6 = 3" v-if="selectTipTra !== null">Continue</v-btn>
                                    <v-btn text @click="e6 = 1">Volver</v-btn>
                                </v-stepper-content>
                            
                                <v-stepper-step :complete="e6 > 3" step="3">Estado Tramite
                                    <small  class="py-1"></small>                   
                                </v-stepper-step>
                                <v-stepper-content step="3">
                                    <v-row align="center">
                                        <v-col  cols="12" sm="12">
                                            <ValidationProvider v-slot="{ errors }" name="select" rules="required">
                                                <v-select
                                                    v-model="firmaSelect"
                                                    :items="firmas"
                                                    label="Estado"
                                                    multiple
                                                    dense
                                                    :error-messages="errors"
                                                    required                                                
                                                >
                                                    <template v-slot:prepend-item>
                                                        <v-list-item
                                                        ripple
                                                        @click="toggle"
                                                        >
                                                        <v-list-item-content>
                                                            <v-list-item-title>Todas</v-list-item-title>
                                                        </v-list-item-content>
                                                        </v-list-item>
                                                        <v-divider class="mt-1"></v-divider>
                                                    </template>
                                                    <template v-slot:selection="{ item, index }">
                                                        <v-chip v-if="index === 0">
                                                            <span>{{ item.text }}</span>
                                                        </v-chip>
                                                        <span
                                                        v-if="index === 1"
                                                        class="grey--text caption"
                                                        >(+{{ firmaSelect.length - 1 }})</span>
                                                    </template>                            
                                                </v-select>
                                            </ValidationProvider>                         
                                        </v-col>
                                    </v-row>
                                    <v-btn color="primary" @click="e6 = 4" v-if="firmaSelect !== null" >Continue</v-btn>
                                    <v-btn text @click="e6 = 2">Volver</v-btn>
                                </v-stepper-content>
                            
                                <v-stepper-step :complete="e6 > 4" step="4">Nomenclaturas</v-stepper-step>
                                <v-stepper-content step="4">
                                    <v-row align="center">
                                        <v-col  cols="12" sm="12">
                                            <ValidationProvider v-slot="{ errors }" name="select" rules="required">
                                                <v-autocomplete
                                                    v-model="nomenclaturaSelect"
                                                    :items="nomenclaturas"
                                                    label="Nomenclatura"
                                                    multiple
                                                    dense
                                                    :error-messages="errors"
                                                    required                                         
                                                >
                                                    <template v-slot:prepend-item>
                                                        <v-list-item
                                                        ripple
                                                        @click="toggleNomenclaturas"
                                                        >
                                                        <v-list-item-content>
                                                            <v-list-item-title>Todas</v-list-item-title>
                                                        </v-list-item-content>
                                                        </v-list-item>
                                                        <v-divider class="mt-1"></v-divider>
                                                    </template>
                                                    <template v-slot:selection="{ item, index }">
                                                        <v-chip v-if="index === 0">
                                                            <span>{{ item.text }}</span>
                                                        </v-chip>
                                                        <span
                                                        v-if="index === 1"
                                                        class="grey--text caption"
                                                        >(+{{ nomenclaturaSelect.length - 1 }})</span>
                                                    </template>                            
                                                </v-autocomplete>
                                            </ValidationProvider>                          
                                        </v-col>
                                    </v-row>
                                    <v-btn color="primary" @click="e6 = 5" v-if="nomenclaturaSelect !== null">Continue</v-btn>
                                    <v-btn text @click="e6 = 3">Volver</v-btn>
                                </v-stepper-content>
                                <v-stepper-step step="5">Finalizar</v-stepper-step>
                                <v-stepper-content step="5">
                                    <v-btn
                                        dense
                                        color="primary"       
                                        class="mr-1"
                                        @click="submit"
                                    >
                                    Buscar
                                    </v-btn>
                                    <v-btn text @click="e6 = 4" reset >Volver</v-btn>
                                    <v-btn text @click="reset" >Limpiar</v-btn>                                    
                                </v-stepper-content>                        
                            </v-stepper>
                        </form>
                    </ValidationObserver>                        
                </b-col>
                <b-col xs="8" class="px-3">
                    <b-tabs content-class="mt-3" justified>
                        <b-tab title="Tramites" active>
                            <template>
                                <vue-excel-xlsx class="my-2 btn btn-info"
                                    :data="dataExcel"
                                    :columns="columnExcel"
                                    :filename="'Tramites'"
                                    :sheetname="'Hoja1'"
                                >
                                    <b-icon-cloud-download>     
                                    </b-icon-cloud-download>
                                </vue-excel-xlsx>                        
                                <v-data-table dense :headers="columnas" :items="datatable" class="elevation-1"  :loading="progress_bar" loading-text="Esperando Filtros"></v-data-table>
                                <v-row justify="space-around">
                                    <v-switch class="ma-0 mx-3" dense  inset  :input-value="true" :value="obj.value" v-model="selectColumnas" v-for="obj in columnas" :key="obj.value" :label="obj.label" ></v-switch>
                                </v-row>                        
                            </template>                             
                        </b-tab>
                        <b-tab title="Graficos" :disabled="stateGraph"> 
                              <!-- :disabled="stateGraph" -->
                             <b-row md="12" class="mt-3 px-4">
                                 <v-col md="4">
                                    <v-card
                                        outlined
                                    >
                                        <v-subheader inset>Filas</v-subheader>
                                        <draggable :list="list1" group="agrupador" @change="log">
                                            <v-list-item
                                                class="list-group-item"
                                                v-for="(element, index) in list1"
                                                :key="index"
                                            >
                                                {{ element.name }}
                                            </v-list-item>
                                        </draggable>
                                  </v-card>
                                </v-col>
                                <v-col md="7" offset-md="1">
                                    <v-card
                                        outlined
                                    >
                                       <v-row class="py-0">
                                            <v-subheader inset>Agrupador</v-subheader>    
                                            <v-col  md="4" offset-md="3">
                                                <v-select 
                                                v-model="itemselected"
                                                :items="items"
                                                label="Valor del campo"
                                                @change="formatGraph()"
                                                ></v-select>
                                            </v-col>
                                        </v-row>                                                                               
                                        <draggable class="pb-4" :list="list2" group="agrupador" @change="log" :disabled="list2.length >= 1 ">
                                            <v-list-item
                                                class="list-group-item"
                                                v-for="(element, index) in list2"
                                                :key="index"
                                            >
                                                {{ element.name }}
                                            </v-list-item>
                                        </draggable>
                                    </v-card>
                                    <v-card
                                        outlined
                                        class="mt-4"
                                    >
                                        <v-row>
                                            <v-subheader inset>Valores</v-subheader>
                                        </v-row>
                                        <draggable class="pb-16" :list="list3" group="agrupador" @change="log" :disabled="list3.length >= 1 || list2.length == 0">
                                            <v-list-item 
                                                class="list-group-item "
                                                v-for="(element, index) in list3"
                                                :key="index"
                                            >
                                                {{ element.name }}
                                            </v-list-item>
                                        </draggable>
                                    </v-card>                                                                      
                                </v-col>
                            </b-row>
                            <b-row xs="12" class="mt-3 px-4">
                                   <v-btn
                                        dense
                                        color="primary"       
                                        class="mr-1"
                                        @click="createGraph"
                                        v-if="list2.length == 1"
                                    >
                                    Crear
                                   </v-btn>
                                   <v-btn text @click="resetGraph" v-if="list2.length == 1" >Limpiar</v-btn>  
                            </b-row>                                                                                  
                        </b-tab>     
                    </b-tabs>                                                
                </b-col>
                <b-container>
                    <highcharts  :options="chartOptions" :constructor-type="'chart'" />
                </b-container>
                <v-dialog
                    v-model="dialog"    
                    persistent max-width="600px"
                    >
                    <v-card
                        color="primary"
                        dark
                    >
                        <v-card-text>
                        Obteniendo Información
                        <v-progress-linear
                            indeterminate
                            color="white"
                            class="mb-0"
                        ></v-progress-linear>
                        </v-card-text>
                    </v-card>
                </v-dialog>                
            </b-row>   
        </b-container>   
    </b-container>
</template>

<script>

import Vue from 'vue'
import { url } from '../../../config/api'
import { Graph } from '../../../config/Highcharts'
import countTo from 'vue-count-to'
import store from 'store'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import loadDrillDown from 'highcharts/modules/drilldown'
import stockInit from 'highcharts/modules/stock'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/es'
import { required, email, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import draggable from "vuedraggable"

loadDrillDown(HighCharts)
stockInit(HighCharts)
exporting(HighCharts)

extend('required', {
    ...required,
    message: 'Selección Obligatoria',
})

exporting(HighCharts)
 
export default {
    name: "Tramites",
    data () {
        return {
            e6: 1,
            user: [{
                usuario_id : store.get('user_usuario_id'),
                cod_corte : store.get('cod_corte'),
                cod_tribunal : store.get('cod_tribunal'),
                ano : store.get('ano'),
                mes : store.get('mes')
            }],
            startVal: 0,
            endVal: [0, 0, 0, 0],             
            fechas: [],
            tramites: [],
            tramiteSelect: '',
            selectTipTra: null,
            firmas: [],
            firmaSelect:  null,
            nomenclaturas: [],
            nomenclaturaSelect: null,
            dateRange: [], // Variable que contiene los rangos de fechas.
            columnas: [],
            selectColumnas: [],
            progress_bar: true,
            datatable: [], // Contenido del datatable,
            dialog: false, // Modal,
            columnExcel: [],
            dataExcel: [],
            stateGraph: true,
            name: "two-lists",
            display: "Two Lists",
            order: 1,            
            list1: [],
            list2: [],
            list3: [],
            items: ['Absoluto', 'Porcentual'],
            itemselected: 'Absoluto',
            chartOptions: JSON.parse(JSON.stringify(Graph['pie'][0]))
        }
    },
    created () {
        this.fechas = this.$setDate(1); // Metodo que entrega las fechas del mes anterior
        this.dateRange =  [new Date(this.fechas.anoInicio, this.fechas.mesInicio, 1), new Date(this.fechas.anoFin, this.fechas.mesFin, 31)]
        const axios = require('axios')
        const req1 = url + '/familia/tiposTramites' // Url de la api
        const req2 = url + '/familia/estadosFirmas' // Url de la api
        axios.all([
            axios.get(req1),
            axios.get(req2)
        ]).then(axios.spread((...responses) => {
            const tiposTramites = responses[0].data
            const estadosFirmas = responses[1].data
            Object.values(tiposTramites.recordset).map((type) => {
                this.tramites.push({ text: type.gls_tiptramite, value: type.tipo_tramite_id})
            })
            Object.values(estadosFirmas.recordset).map((type) => {
                this.firmas.push({ text: type.gls_estfirma, value: type.est_firma})
            })            
        })).catch(errors => {
            console.log(errors)
        })                    
    },
    methods:{
        onChange(event) {
            this.nomenclaturas = [] // Limpiamos el arreglo
            this.columnas = [] // Limpiamos el arreglo
            this.columnExcel = [] // Limpiamos cabeceras del excel
            this.datatable = [] // Limpiamos el arreglo
            this.tramiteSelect = '' // Limpiamos la glosa del tipo de tramite
            this.selectColumnas = []
            this.tramiteSelect = String(this.tramites.filter(element => element.value === event).map(element => element.text))
            const axios = require('axios')
            const req1 = url + '/familia/nomenclaturas' // Url de la api
            const req2 = url + '/familia/columnasTramites' // Url de la api
            axios.all([
                axios.get(req1,{
                    params: {
                        tipo_tramite_id: event
                    }                    
                }),
                axios.get(req2,{
                    params: {
                        tipo_tramite_id: event
                    }                    
                })                
            ]).then(axios.spread((...responses) => {
                const nomenclaturas = responses[0].data
                const columnas = responses[1].data

                Object.values(nomenclaturas.recordset).map((type) => {
                    this.nomenclaturas.push({ text: type.gls_despliegue, value: type.cod_nomenclatura})
                })
                
                Object.values(columnas.recordset).map((type) => {
                    this.columnas.push({ value: type.campo, label: type.descripcion, text: type.descripcion })
                    this.list1.push({ name: type.descripcion, field: type.campo,  id: type.tramite_columna_id })
                    this.columnExcel.push({ field: type.campo, label: type.descripcion })
                    this.selectColumnas.push(type.campo)
                })                

                

            })).catch(errors => {

            })            
        },
        toggle () {
            this.$nextTick(() => {
                this.firmaSelect =  Object.values(this.firmas).map((type) => {
                     return type.value
                }) 
            })
        },
        toggleNomenclaturas(){
             this.$nextTick(() => {
                this.nomenclaturaSelect = Object.values(this.nomenclaturas).map((type) => {
                    return type.value
                });        
            })           
        },      
        submit () {
            window.scrollTo(0,0) // Desplaza hacia arriba
            this.dialog = true // Activamos Modal
            let fecha_tramite = []
            let tipo_tramite_id = ''
            let est_firma = ''
            let cod_nomenclatura = ''
            let campos = ''            
            this.datatable = [] // Limpiamos el datatable

            fecha_tramite   = this.dateRange // Obtenemos las fechas ingresadas
            tipo_tramite_id = this.selectTipTra // Obtenemos el tipo de tramite
            est_firma = this.firmaSelect
            cod_nomenclatura = this.nomenclaturaSelect
            campos = this.selectColumnas

            const axios = require('axios')
            const req1 = url + '/familia/formularios' // Url de la api
            axios.all([
                axios.post(req1,{
                    params: {
                        cod_corte: this.user[0].cod_corte,
                        cod_tribunal: this.user[0].cod_tribunal,                        
                        fecha_tramite: fecha_tramite,
                        tipo_tramite_id: tipo_tramite_id,
                        est_firma: est_firma,
                        cod_nomenclatura: cod_nomenclatura,
                        campos: campos
                    }                   
                })
                
            ]).then(axios.spread((...responses) => {
                const obj = responses[0].data
                Object.values(obj.recordset).map((type) => {
                    this.datatable.push(type) // Llenamos el datatable
                    this.dataExcel.push(type)
                })
                this.dialog = false // Desactivamos Modal
                this.progress_bar = false
                this.stateGraph = false     
            })).catch(errors => {
                console.log(errors)
            })
        },
        reset(){
            this.e6 = 1 // Volvemos al primer paso
            this.selectTipTra = null // Limpiamos el tipo de tramite seleccionado.
            this.firmaSelect = null // Limpiamos los estados de la firmaa seleccionado.
            this.nomenclaturaSelect = null // Limpiamos las Nomenclaturas seleccionadas.
            this.datatable = [] // Limpiamos los datos de la tabla
            this.columnas = [] // Limpiamos las columnas seleccionadas.
            this.columnExcel = [] // Limpiamos cabeceras del excel
            this.dataExcel = [] // Limpiamos los datos del excel
            this.tramiteSelect = ''
            this.progress_bar = true
            this.stateGraph = true
            this.list1 = [] // Limpiamos las columnas agrupadas
            this.list2 = [] // Limpiamos las columnas agrupadas
            this.list3 = [] // Limpiamos las columnas agrupadas
        },
        log: function(evt) {
            window.console.log(evt);
        },
        createGraph(){ // Metodo que genera el grafico
            this.chartOptions = []

            if(this.list2.length == 1 && this.list3.length == 1){
                this.chartOptions = JSON.parse(JSON.stringify(Graph['columnDrilldown'][0]))
                
                const agrupador = this.list2[0].field
                const category = [...new Set(this.datatable.map(item => item[agrupador]))]; // [ 'A', 'B']
                const agrupadorDos = this.list3[0].field
                const categoryDos = [...new Set(this.datatable.map(item => item[agrupadorDos]))]; // [ 'A', 'B']

                let final = []

                category.map((type) => {
                    final.push({ name: type, y: 0 , drilldown: type })
                })     

                this.datatable.map(function(type){
                    const obj = final.filter(item => item.name === type[agrupador]);  
                    const pos = final.map(function(e) { 
                                    return e.name; 
                                }).indexOf(obj[0].name);    
                    final[pos].y ++
                });                 

                let finalDos = []

                category.map((type) => {
                    let array = []
                    categoryDos.map((typeDos) => {
                       array.push([typeDos, 0])
                    })
                    finalDos.push({ name: type, id: type, data: array})   
                }) 


                this.datatable.map(function(type){
                    const obj = finalDos.filter(item => item.name === type[agrupador]);  

                    const pos = finalDos.map(function(e) { 
                                    return e.name; 
                                }).indexOf(obj[0].name);

                    finalDos[pos].data.forEach(function (element, index, array) {
                        if(element[0] == type[agrupadorDos]){
                          finalDos[pos].data[index][1] ++  
                        }            
                    }); 
                });

                this.chartOptions.series.push({
                    data: final,
                    name: '',
                    colorByPoint: true
                })

                this.chartOptions.drilldown.series = finalDos

            }else{
                const agrupador = this.list2[0].field
                const category = [...new Set(this.datatable.map(item => item[agrupador]))]; // [ 'A', 'B']

                let final = []

                category.map((type) => {
                    final.push({ name: type, y: 0})
                })     

                this.datatable.map(function(type){
                    const obj = final.filter(item => item.name === type[agrupador]);  
                    const pos = final.map(function(e) { 
                                    return e.name; 
                                }).indexOf(obj[0].name);    
                    final[pos].y ++
                });                   
                this.chartOptions = JSON.parse(JSON.stringify(Graph['pie'][0]))
                this.chartOptions.series.push({
                    data: final,
                    name: '',
                    colorByPoint: true
                })
            }
        },
        resetGraph(){
            this.chartOptions
            if(this.list2.length == 1 && this.list3.length == 1){
               this.list1.push(this.list2[0],this.list3[0])
            }else{
               this.list1.push(this.list2[0])
            }
            this.list2 = []
            this.list3 = []
            setInterval(() => {
                window.dispatchEvent(new Event('resize'));
            }, 10);            
        },
        formatGraph(){
            if(this.chartOptions.chart.type === 'pie'){ 
               this.chartOptions.plotOptions.pie.dataLabels.format =  (this.itemselected === 'Absoluto') ?   '<b>{point.name}</b>: {point.y:.0f}' : '<b>{point.name}</b>: {point.percentage:.1f} %';
            }
        }                          
    }, 
    components: {
        countTo,
        highcharts: Chart,
        DatePicker,
        ValidationProvider,
        ValidationObserver,
        draggable       
    },        
}
</script>

<style scoped>
.arial, .btn, span,tspan, li, h5, h6  {
  font-family: Arial, Helvetica, sans-serif;
}
label {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
}
</style>