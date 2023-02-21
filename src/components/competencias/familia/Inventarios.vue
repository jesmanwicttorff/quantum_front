<template>
    <b-container fluid="xs" class="py-3">
        <b-row xs="12" class="px-3">
          <ModalInventarios />
        </b-row>        
        <b-row sm="12" class="mt-3">
             <b-col sm="10" align-v="center">
                <highcharts :options="chartOptions" :constructor-type="'chart'" />                
             </b-col>
            <b-col sm="2" >
                <b-button class="w-100 px-4 py-2" style="margin-bottom: 4%;" v-b-modal.modal-inventario variant="outline-primary">
                    <span class="count_top">Total Inventario</span>
                    <b-col class="count"><countTo  style="font-size: 150%;" class="count" :startVal="startVal" :endVal="endVal[0]" separator="." :duration="3000"></countTo></b-col>    
                </b-button>
            </b-col>
        </b-row>
        <b-container  fluid="xs" class="px-0 py-4">
            <b-col sm="12" md="12" class="my-2">
                <b-form-group
                label="Filtrar En"
                label-cols-sm="3"
                label-align-sm="left"
                label-size="sm"
                description="Deje todo sin marcar para filtrar todos los datos"
                class="mb-0">
                    <b-form-checkbox-group v-model="filterOn" class="mt-1">
                        <b-form-checkbox value="tip_causa">Tipo Causa</b-form-checkbox>
                        <b-form-checkbox value="ano">Año</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>            
                <b-form-group
                label="Filtros"
                label-cols-sm="3"
                label-align-sm="left"
                label-size="sm"
                label-for="filterInput"
                class="mb-0 py-2"
                >
                    <b-input-group size="sm">
                        <b-form-input
                        v-model="filter"
                        type="search"
                        id="filterInput"
                        placeholder="Busqueda"
                        ></b-form-input>
                        <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''">Limpiar</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>

            <b-col class="my-2 py-2" >
                <b-form-group
                    label="Por página"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="left"
                    label-size="sm"
                    label-for="perPageSelect"
                    class="mb-0"
                >
                    <b-form-select
                        v-model="perPage"
                        id="perPageSelect"
                        size="sm"
                        :options="pageOptions"
                    ></b-form-select>
                </b-form-group>
            </b-col>  
            <vue-excel-xlsx class="my-2 btn btn-info"
            :data="data"
            :columns="columns"
            :filename="'Inventario'"
            :sheetname="'Hoja1'"
            >
            <b-icon-cloud-download>     
            </b-icon-cloud-download>
            </vue-excel-xlsx>
            <b-table striped hover bordered small class="text-center"
            :items="items" 
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filterIncludedFields="filterOn"
            >
                <template v-slot:row-details="row">
                    <b-card>
                    <ul>
                        <li v-for="(value, key) in row.item" :key="key" >{{ key }}: {{ value }}</li>
                    </ul>
                    </b-card>
                </template>        
            </b-table>
            <b-col class="px-0">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                ></b-pagination>
            </b-col>
            <template v-slot:cell(name)="row">
                {{ row.value.first }} {{ row.value.last }}
            </template>    
        </b-container>
    </b-container>
</template>

<script>

import Vue from 'vue'
import { url } from '../../../config/api'
import countTo from 'vue-count-to'
import store from 'store'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import ModalInventarios from '../familia/ModalInventarios'

exporting(HighCharts)
 
export default {
    name: "Inventarios",
    data () {
        return {
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
            chartOptions: {
                chart: {                          
                    type: 'column',
                    height: 400,
                    renderTo: 'chart'
                },
                title: {
                    text: 'Inventarios de causas por estados procesales'
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    }
                },
                xAxis: {
                type: 'category',
                categories: [2014, 2015, 2016, 2017, 2018, 2019, 2020],
                    labels: {
                        rotation: -45,
                        style: {
                        fontSize: '10px',
                        fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    },
                    labels: {
                        format: '{value:,.0f}'
                    },
                    gridLineWidth: 0
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                    enabled: true
                    }
                }
                },
                credits: false,
                series: [],
                lang: {
                    loading: 'Cargando...',
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                    shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                    exportButtonTitle: 'Exportar',
                    printButtonTitle: 'Importar',
                    rangeSelectorFrom: 'Desde',
                    rangeSelectorTo: 'Hasta',
                    rangeSelectorZoom: 'Período',
                    drillUpText: 'Regresar a {series.name}',
                    downloadPNG: 'Descargar imagen PNG',
                    downloadJPEG: 'Descargar imagen JPEG',
                    downloadPDF: 'Descargar imagen PDF',
                    downloadSVG: 'Descargar imagen SVG',
                    downloadCSV: 'Descargar CSV',
                    downloadXLS: 'Descargar EXCEL',
                    printChart: 'Imprimir',
                    resetZoom: 'Reiniciar zoom',
                    resetZoomTitle: 'Reiniciar zoom',
                    thousandsSep: '.',
                    exitFullscreen: 'Salir pantalla completa',
                    viewFullscreen: 'Ver pantalla completa',
                    decimalPoint: ''
                },
                exporting: {
                buttons: {
                    contextButton: {
                    text: 'Descargas',
                    menuItems: [
                        'printChart',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadCSV',
                        'downloadXLS'
                    ]
                    }
                }
                }
            },
            fields: [
                {
                    key: 'ano',
                    label: 'Año',
                    sortable: true
                },
                {
                    key: 'tip_causa',
                    label: 'Tipo Causa',
                    sortable: true
                },
                {
                    key: 'acumulada',
                    label: 'Acumulada',
                    // sortable: true
                },
                {
                    key: 'archivo_provisional',
                    label: 'Archivo Provisional',
                    // sortable: true
                },
                {
                    key: 'con_sentencia',
                    label: 'Con Sentencia',
                    // sortable: true
                },
                {
                    key: 'concluido',
                    label: 'Concluido',
                    // sortable: true
                }, 
                {
                    key: 'invalidado',
                    label: 'Invalidado',
                    // sortable: true
                }, 
                {
                    key: 'sin_media_asig',
                    label: 'Sin Media Asig',
                    // sortable: true
                }, 
                {
                    key: 'sin_tramitacion',
                    label: 'Sin tramitación',
                    // sortable: true
                }, 
                {
                    key: 'susp_por_med',
                    label: 'Susp por Med',
                    // sortable: true
                }, 
                {
                    key: 'suspendido',
                    label: 'Suspendido',
                    // sortable: true
                }, 
                {
                    key: 'tramitacion',
                    label: 'Tramitación',
                    // sortable: true
                }, 
                {
                    key: 'tramitacion_pend',
                    label: 'Tramitación pend.',
                    // sortable: true
                }                                                                                                                                                                                
            ],            
            columns : [
                {
                    field: 'ano',
                    label: 'Año'
                },
                {
                    field: 'tip_causa',
                    label: 'Tipo Causa'
                },
                {
                    field: 'acumulada',
                    label: 'Acumulada'
                },
                {
                    field: 'archivo_provisional',
                    label: 'Archivo Provisional'
                },
                {
                    field: 'con_sentencia',
                    label: 'Con Sentencia'
                },
                {
                    field: 'concluido',
                    label: 'Concluido'
                }, 
                {
                    field: 'invalidado',
                    label: 'Invalidado'
                }, 
                {
                    field: 'sin_media_asig',
                    label: 'Sin Media Asig'
                }, 
                {
                    field: 'sin_tramitacion',
                    label: 'Sin tramitación'
                }, 
                {
                    field: 'susp_por_med',
                    label: 'Susp por Med'
                }, 
                {
                    field: 'suspendido',
                    label: 'Suspendido'
                }, 
                {
                    field: 'tramitacion',
                    label: 'Tramitación'
                }, 
                {
                    field: 'tramitacion_pend',
                    label: 'Tramitación pend.'
                }           
            ],            
            totalRows: 1,
            currentPage: 1,
            perPage: 12,
            pageOptions: [12, 24, 78],
            filter: null,
            filterOn: [],    
            items: [],
            data : []                              
        }
    },
    created () {
        this.updateRange()
    },
    methods:{
        updateRange(option = 1){
            this.fechas = this.$setDate(option); // Menos tres
            this.chartOptions.series = []
            this.endVal   = [0,0,0,0]

            const axios = require('axios')
            const req1 = url + '/familia/inventariosEstados'
            const req2 = url + '/familia/estadosProcesales'

            axios.all([
                axios.get(req1, {
                params: {
                    cod_corte: this.user[0].cod_corte,
                    cod_tribunal: this.user[0].cod_tribunal
                }   
                }),
                axios.get(req2, {
                params: {
                    cod_corte: this.user[0].cod_corte,
                    cod_tribunal: this.user[0].cod_tribunal
                }   
                })                
            ]).then(axios.spread((...responses) => { 

                const inventariosEstados = responses[0].data
                const estadosProcesales = responses[1].data

                let cantidad = []
                let glosa = ''
                let aux = 0

                Object.values(inventariosEstados.recordset).map((type) => {
                    if (glosa != '' && glosa != type.gls_estprocesal) {
                        this.chartOptions.series.push({ name: glosa, data: cantidad })
                        cantidad = []
                        aux = 0
                    }
                    glosa = type.gls_estprocesal
                    cantidad[aux] = type.cantidad;
                    this.endVal[0] += type.cantidad;
                    aux ++
                })
                
                this.chartOptions.series.push({ name: glosa, data: cantidad }) 

                Object.values(estadosProcesales.recordset).map((type) => {
                    this.items.push({ isActive: true, ano: type.ano, tip_causa: type.tip_causa, acumulada: this.$thousandSeparator(type.acumulada),
                                     archivo_provisional: this.$thousandSeparator(type.archivo_provisional), con_sentencia: this.$thousandSeparator(type.con_sentencia),
                                     concluido: this.$thousandSeparator(type.concluido), invalidado: this.$thousandSeparator(type.invalidado), sin_media_asig: this.$thousandSeparator(type.sin_media_asig),
                                     sin_tramitacion: this.$thousandSeparator(type.sin_tramitacion), susp_por_med: this.$thousandSeparator(type.susp_por_med), suspendido: this.$thousandSeparator(type.suspendido),
                                     tramitacion: this.$thousandSeparator(type.tramitacion), tramitacion_pend: this.$thousandSeparator(type.tramitacion_pend)});
                    this.data.push({ ano: type.ano, tip_causa: type.tip_causa, acumulada: type.acumulada,
                                     archivo_provisional: type.archivo_provisional, con_sentencia: type.con_sentencia,
                                     concluido: type.concluido, invalidado: type.invalidado, sin_media_asig: type.sin_media_asig,
                                     sin_tramitacion: type.sin_tramitacion, susp_por_med: type.susp_por_med, suspendido: type.suspendido,
                                     tramitacion: type.tramitacion, tramitacion_pend: type.tramitacion_pend  });
                })    
                
                this.totalRows = this.items.length;

                this.$forceUpdate()

            })).catch(errors => {

            })            
        },
    toggleModal(){
        this.IsVisibility = !this.IsVisibility;
    }     
    },
    components: {
        countTo,
        highcharts: Chart,
        ModalInventarios
    },        
}
</script>

<style scoped>
.arial, .btn, span,tspan, li, h5, h6  {
  font-family: Arial, Helvetica, sans-serif;
}

.azul{
    color: #2979ff;
}

.verde{
    color: #00DF69;
}

.amarillo{
    color: #F4F000;
}

.rojo{
    color: #FC0202;
}

.FondoLila{
    background: #2979ff;

    border-radius: 20px 20px 20px 20px;
    -moz-border-radius: 20px 20px 20px 20px;
    -webkit-border-radius: 20px 20px 20px 20px;
    border: 0px solid #000000;
}

.FontWhite{
    color:aliceblue;
}

label {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
}

</style>