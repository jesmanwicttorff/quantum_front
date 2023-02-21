<template>
    <b-container fluid class="px-4">
        <b-modal id="modal-1" size="xl" title="Indicadores Detalles">
            <b-tabs content-class="mt-3" align="center" >
                <b-tab title="Causas" active>
                    <b-row class="ml-4">
                        <span class="font-italic text-secondary" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio == fechas.mesFin" >Periodo de Análisis:  {{ this.fechas().periodo}} </span>
                    </b-row>
                    <highcharts :options="chartOptionsTwo" :constructor-type="'chart'" class="px-4 py-4" v-if="this.$attrs.graph == 'column'"/> 
                    <highcharts :options="chartOptionsTortaCausas" :constructor-type="'chart'" class="px-4 py-4" v-if="this.$attrs.graph == 'pie' "/>
                       <ModalLoading/>       
                </b-tab>
                
                <b-tab title="Tipo"  @click="terminosTipos()">
                    <b-row class="ml-4">
                        <span class="font-italic text-secondary" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio == fechas.mesFin" >Periodo de Análisis:  {{ this.fechas().periodo}} </span>
                    </b-row>
                    <highcharts :options="chartOptionsTree" :constructor-type="'chart'" class="px-4 py-4" v-if="this.$attrs.graph == 'column'"/> 
                    <highcharts :options="chartOptionsTortaTipos" :constructor-type="'chart'" class="px-4 py-4" v-if="this.$attrs.graph == 'pie' "/>
                </b-tab>                
                <b-tab title="Materias">
                    <b-row class="ml-4">
                        <span class="font-italic text-secondary" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio == fechas.mesFin" >Periodo de Análisis:  {{ this.fechas().periodo}} </span>
                    </b-row>
                    <highcharts :options="chartOptions" :constructor-type="'chart'" class="px-4 py-4" v-if="this.$attrs.graph == 'column'"/>
                    <highcharts :options="chartOptionsTorta" :constructor-type="'chart'" class="px-4 py-4" v-if="this.$attrs.graph == 'pie' "/>
                    <b-container class="px-0 py-4">
                        <b-col sm="12" md="12" class="my-2">
                            <b-form-group
                            label="Filtrar En"
                            label-cols-sm="3"
                            label-align-sm="left"
                            label-size="sm"
                            description="Deje todo sin marcar para filtrar todos los datos"
                            class="mb-0">
                                <b-form-checkbox-group v-model="filterOn" class="mt-1">
                                    <b-form-checkbox v-for="(row, key) in fields" :key="key" :value="row.key">{{row.label}}</b-form-checkbox>
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
                        :filename="'Infancia'"
                        :sheetname="'Hoja1'"
                        >
                        <b-icon-cloud-download>     
                        </b-icon-cloud-download>
                        </vue-excel-xlsx>
                        <b-table striped hover bordered small 
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
                                    <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
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
                                    
                </b-tab>
                <b-tab title="Audiencias" v-if="this.$attrs.api == '/familia/terminosMaterias'" @click="terminosAudienciasDetalles()">                 
                    <b-container class="px-0 py-4">
                        <b-col sm="12" md="12" class="my-2">
                            <b-form-group
                            label="Filtrar En"
                            label-cols-sm="3"
                            label-align-sm="left"
                            label-size="sm"
                            description="Deje todo sin marcar para filtrar todos los datos"
                            class="mb-0">
                                <b-form-checkbox-group v-model="filterOn" class="mt-1">
                                    <b-form-checkbox v-for="(row, key) in fields" :key="key" :value="row.key">{{row.label}}</b-form-checkbox>
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
                        :data="dataAud"
                        :columns="columnsAud"
                        :filename="'TerminosAudiencias'"
                        :sheetname="'Hoja1'"
                        >
                        <b-icon-cloud-download>     
                        </b-icon-cloud-download>
                        </vue-excel-xlsx>
                        <b-table striped hover bordered small 
                        :items="itemsAud" 
                        :fields="fieldsAud"
                        :current-page="currentPage"
                        :per-page="perPage"
                        :filter="filter"
                        :filterIncludedFields="filterOn"
                        >

                            <template v-slot:row-details="row">
                                <b-card>
                                <ul>
                                    <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
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
                </b-tab>                 
            </b-tabs> 
                           
        </b-modal> 
           
    </b-container>
    
</template>
<script>
import ModalLoading from '../../../components/elementos/ModalLoading'
import { mapMutations } from 'vuex'
import Vue from 'vue'
import { url, report } from '../../../config/api'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import store from 'store'
import { mapState } from 'vuex'

exporting(HighCharts)

export default {
    name: "Modal",
    data () {
        return {
            user: [{
                usuario_id : store.get('user_usuario_id'),
                cod_corte : store.get('cod_corte'),
                cod_tribunal : store.get('cod_tribunal'),
                ano : store.get('ano'),
                mes : store.get('mes')
            }],
            fields: [],
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 20, 30],
            filter: null,
            filterOn: [],    
            items: [], 
            data: [],
            columns: [],                     
            chartOptions: {
                chart: {
                    borderColor: '#2979ff',
                    borderWidth: 2,
                    borderRadius: '10',
                    height: 200,
                    type: '',
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },        
                xAxis: {
                    categories: []//['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
                },
                yAxis: {
                    labels: {
                        format: '{value}',
                    },             
                    title: {
                        text: 'Cantidades'
                    },
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },        
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true               
                        },
                        enableMouseTracking: false
                    }
                },
                credits: {
                    enabled: false
                },      
                series: [],
                lang: {
                    loading: 'Cargando...',
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                    shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                    exportButtonTitle: "Exportar",
                    printButtonTitle: "Importar",
                    rangeSelectorFrom: "Desde",
                    rangeSelectorTo: "Hasta",
                    rangeSelectorZoom: "Período",
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
                    thousandsSep: ".",
                    exitFullscreen: 'Salir pantalla completa',
                    viewFullscreen: 'Ver pantalla completa',
                    decimalPoint: '.'
                },
                exporting: {
                    buttons: {
                        contextButton: {
                            text: 'Descargas',                    
                            menuItems: [
                            'printChart',
                            // 'separator',
                            // 'downloadPNG',
                            'downloadJPEG',
                            'downloadPDF',
                            // 'downloadSVG',
                            // 'separator',
                            'downloadCSV',
                            'downloadXLS',
                            ]
                        }
                    }
                }
            },
            chartOptionsTwo: {
                chart: {
                    borderColor: '#2979ff',
                    borderWidth: 2,
                    borderRadius: '10',
                    height: 200,
                    type: '',
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },        
                xAxis: {
                    categories: []
                },
                yAxis: {
                    labels: {
                        format: '{value}',
                    },             
                    title: {
                        text: 'Cantidades'
                    },
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },        
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true               
                        },
                        enableMouseTracking: false
                    }
                },
                credits: {
                    enabled: false
                },      
                series: [],
                lang: {
                    loading: 'Cargando...',
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                    shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                    exportButtonTitle: "Exportar",
                    printButtonTitle: "Importar",
                    rangeSelectorFrom: "Desde",
                    rangeSelectorTo: "Hasta",
                    rangeSelectorZoom: "Período",
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
                    thousandsSep: ".",
                    exitFullscreen: 'Salir pantalla completa',
                    viewFullscreen: 'Ver pantalla completa',
                    decimalPoint: '.'
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
                            'downloadXLS',
                            ]
                        }
                    }
                }
            },
            chartOptionsTorta: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    minHeight: 600,
                    height: 600
                },
                title: {
                    text: ''
                },
                tooltip: {
                pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.y:.0f}'
                        }
                    }
                },
                credits: {
                    enabled: false
                },      
                series: [],
                lang: {
                    loading: 'Cargando...',
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                    shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                    exportButtonTitle: "Exportar",
                    printButtonTitle: "Importar",
                    rangeSelectorFrom: "Desde",
                    rangeSelectorTo: "Hasta",
                    rangeSelectorZoom: "Período",
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
                    thousandsSep: ".",
                    exitFullscreen: 'Salir pantalla completa',
                    viewFullscreen: 'Ver pantalla completa',
                    decimalPoint: '.'
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
                            'downloadXLS',
                            ]
                        }
                    }
                }
            },
            chartOptionsTortaCausas: {
                chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                minHeight: 600,
                height: 600
                },
                title: {
                    text: ''
                },
                tooltip: {
                pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.y:.0f}'
                        }
                    }
                },
                credits: {
                    enabled: false
                },      
                series: [],
                lang: {
                    loading: 'Cargando...',
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                    shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                    exportButtonTitle: "Exportar",
                    printButtonTitle: "Importar",
                    rangeSelectorFrom: "Desde",
                    rangeSelectorTo: "Hasta",
                    rangeSelectorZoom: "Período",
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
                    thousandsSep: ".",
                    exitFullscreen: 'Salir pantalla completa',
                    viewFullscreen: 'Ver pantalla completa',
                    decimalPoint: '.'
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
                            'downloadXLS',
                            ]
                        }
                    }
                }
            },
            chartOptionsTree: {
                chart: {
                    borderColor: '#2979ff',
                    borderWidth: 2,
                    borderRadius: '10',
                    height: 200,
                    type: '',
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },        
                xAxis: {
                    categories: []
                },
                yAxis: {
                    labels: {
                        format: '{value}',
                    },             
                    title: {
                        text: 'Cantidades'
                    },
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },        
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true               
                        },
                        enableMouseTracking: false
                    }
                },
                credits: {
                    enabled: false
                },      
                series: [],
                lang: {
                    loading: 'Cargando...',
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                    shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                    exportButtonTitle: "Exportar",
                    printButtonTitle: "Importar",
                    rangeSelectorFrom: "Desde",
                    rangeSelectorTo: "Hasta",
                    rangeSelectorZoom: "Período",
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
                    thousandsSep: ".",
                    exitFullscreen: 'Salir pantalla completa',
                    viewFullscreen: 'Ver pantalla completa',
                    decimalPoint: '.'
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
                            'downloadXLS',
                            ]
                        }
                    }
                }
            },            
            chartOptionsTortaTipos: {
                chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                minHeight: 600,
                height: 600
                },
                title: {
                    text: ''
                },
                tooltip: {
                pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.y:.0f}'
                        }
                    }
                },
                credits: {
                    enabled: false
                },      
                series: [],
                lang: {
                    loading: 'Cargando...',
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                    shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                    exportButtonTitle: "Exportar",
                    printButtonTitle: "Importar",
                    rangeSelectorFrom: "Desde",
                    rangeSelectorTo: "Hasta",
                    rangeSelectorZoom: "Período",
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
                    thousandsSep: ".",
                    exitFullscreen: 'Salir pantalla completa',
                    viewFullscreen: 'Ver pantalla completa',
                    decimalPoint: '.'
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
                            'downloadXLS',
                            ]
                        }
                    }
                }
            },            
            itemsAud: [],
            fieldsAud: [],
            dataAud: [],
            columnsAud: [    {
                    field: 'rit',
                    label: 'Rit'
                },
                {
                    field: 'fecha_ingreso_causa',
                    label: 'Fecha Ingreso'
                },
                {
                    field: 'fecha_firma',
                    label: 'Fecha Firma'
                },
                {
                    field: 'tipo_causa',
                    label: 'Tipo Cuasa'
                },
                {
                    field: 'gls_tiptramite',
                    label: 'Tipo Tramite'
                },
                {
                    field: 'idf_tiposolicitud',
                    label: 'Audiencia'
                },
                {
                    field: 'gls_tipfallada',
                    label: 'Término',
                },
                {
                    field: 'juez',
                    label: 'Juez'
                }
            ]
        }
    },
    methods:{
         ...mapMutations(['setModal']), // Mutations no Borrar
            ...mapState(['fechas']),
        terminosAudienciasDetalles(){
         //   this.setModal(true)  
            this.fechas = this.$setDate(this.$attrs.option); // Menos tres    
            this.fieldsAud = report['/familia/terminosAudienciasDetalles']
            this.itemsAud = []
            this.dataAud = []                  
            const axios = require('axios')         
            const audAxios = url + '/familia/terminosAudienciasDetalles'  
            axios.all([
                axios.get(audAxios, {
                    params: {
                        cod_corte: this.user[0].cod_corte,
                        cod_tribunal: this.user[0].cod_tribunal,
                        anoInicio: this.fechas().anoInicio,
                        mesInicio: this.fechas().mesInicio,
                        anoFin: this.fechas().anoFin,
                        mesFin: this.fechas().mesFin
                    }
                })
            ]).then(axios.spread((...responses) => {

                const terminosAudienciasDetalles = responses[0].data

                Object.values(terminosAudienciasDetalles.recordset).map((type) => {
                    this.itemsAud.push(type);
                    this.dataAud.push(type);                                             
                })

                this.$forceUpdate()
               // this.setModal(false)  
            })).catch(errors => {
                console.log(errors);
            })                                            
        },
        terminosTipos(){
          //  this.setModal(true) 
            this.fechas = this.$setDate(this.$attrs.option); // Menos tres    
        
            const axios = require('axios')         
            const audAxios = url + '/familia/terminosTipos'  
            axios.all([
                axios.get(audAxios, {
                    params: {
                        cod_corte: this.user[0].cod_corte,
                        cod_tribunal: this.user[0].cod_tribunal,
                        anoInicio: this.fechas().anoInicio,
                        mesInicio: this.fechas().mesInicio,
                        anoFin: this.fechas().anoFin,
                        mesFin: this.fechas().mesFin
                    }
                })
            ]).then(axios.spread((...responses) => {

                const terminosTipos = responses[0].data

                Object.values(terminosTipos.recordset).map((type) => {
                    this.chartOptionsTortaTipos.series.push({ name: type.gls_tipfallada, data: type.cantidad })  
                })
            //  this.setModal(false)   
            })).catch(errors => {
                console.log(errors);
            })
        }
    },
    mounted() {
         
        this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
            if(modalId == 'modal-1'){
                 this.setModal(true);  
                this.chartOptions.series = []
                this.chartOptionsTwo.series = []      
                this.fields = report[this.$attrs.api]
                this.items = []
                this.data = []                  
                const axios = require('axios')
                let req1 = ''
                let req2 = ''
                let req3 = ''

                switch (this.$attrs.graph) {
                    case 'column':
                        req1 = url + this.$attrs.api
                        req2 = url + this.$attrs.api+'Detalles'
                        req3 = url + this.$attrs.api+'Causas'

                        this.chartOptions = {
                            chart: {
                                borderColor: '#2979ff',
                                borderWidth: 2,
                                borderRadius: '10',                            
                                type: 'column',
                                height: 600,
                                renderTo: 'chart'
                            },
                            title: {
                                text: this.$attrs.title
                            },
                            accessibility: {
                                announceNewData: {
                                    enabled: true
                                }
                            },
                            xAxis: {
                            type: 'category',
                            categories: '',//['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
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
                        }
                        this.chartOptionsTwo = {
                            chart: {
                                borderColor: '#2979ff',
                                borderWidth: 2,
                                borderRadius: '10',                            
                                type: 'column',
                                height: 600,
                                renderTo: 'chart'
                            },
                            title: {
                                text: this.$attrs.title.replace("Materias", "Causas")
                            },
                            accessibility: {
                                announceNewData: {
                                    enabled: true
                                }
                            },
                            xAxis: {
                            type: 'category',
                            categories: '',
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
                        }
    
                        this.chartOptions.xAxis.categories = this.fechas().calendario;
                        this.chartOptionsTwo.xAxis.categories = this.fechas().calendario;
                        
                        axios.all([
                            axios.get(req1, {
                                params: {
                                    cod_corte: this.user[0].cod_corte,
                                    cod_tribunal: this.user[0].cod_tribunal,
                                    anoInicio: this.fechas().anoInicio,
                                    mesInicio: this.fechas().mesInicio,
                                    anoFin: this.fechas().anoFin,
                                    mesFin: this.fechas().mesFin
                                }
                            }),
                            axios.get(req2, {
                                params: {
                                    cod_corte: this.user[0].cod_corte,
                                    cod_tribunal: this.user[0].cod_tribunal,
                                    anoInicio: this.fechas().anoInicio,
                                    mesInicio: this.fechas().mesInicio,
                                    anoFin: this.fechas().anoFin,
                                    mesFin: this.fechas().mesFin
                                }
                            }),
                            axios.get(req3, {
                                params: {
                                    cod_corte: this.user[0].cod_corte,
                                    cod_tribunal: this.user[0].cod_tribunal,
                                    anoInicio: this.fechas().anoInicio,
                                    mesInicio: this.fechas().mesInicio,
                                    anoFin: this.fechas().anoFin,
                                    mesFin: this.fechas().mesFin
                                }
                            })                        
                        ]).then(axios.spread((...responses) => {

                            const data1 = responses[0].data
                            const data2 = responses[1].data
                            const data3 = responses[2].data

                            let cantidad = []
                            let glosa = ''
                            let aux = 0

                            Object.values(data1.recordset).map((type) => {
                                if (glosa != '' && glosa != type.glosa) {
                                    this.chartOptions.series.push({ name: glosa, data: cantidad })
                                    cantidad = []
                                    aux = 0
                                }
                                glosa = type.glosa
                                cantidad[aux] = type.cantidad;
                                aux ++
                            })

                            this.chartOptions.series.push({ name: glosa, data: cantidad })   

                            cantidad = []
                            glosa = ''
                            aux = 0                        

                            Object.values(data3.recordset).map((type) => {

                                if (glosa != '' && glosa != type.glosa) {
                                    this.chartOptionsTwo.series.push({ name: glosa, data: cantidad })
                                    cantidad = []
                                    aux = 0
                                }
                                glosa = type.glosa
                                cantidad[aux] = type.cantidad;
                                aux ++
                            })                        
                            
                            this.chartOptionsTwo.series.push({ name: glosa, data: cantidad })   
                            
                            Object.values(data2.recordset).map((type) => {
                                this.items.push(type);
                                this.data.push(type);                                             
                            })
                            this.totalRows = this.items.length;
                            this.$forceUpdate()

                        })).catch(errors => {
                            console.log(errors);
                        })
                        break;
                    case 'pie':
                        req1 = url + this.$attrs.api
                        req2 = url + this.$attrs.api+'Detalles'
                        req3 = url + this.$attrs.api+'Causas'
                        this.chartOptionsTorta.series = []
                        this.chartOptionsTortaCausas.series = []
                        
                        
                        axios.all([
                            axios.get(req1, {
                                params: {
                                    cod_corte: this.user[0].cod_corte,
                                    cod_tribunal: this.user[0].cod_tribunal,
                                    anoInicio: this.fechas().anoInicio,
                                    mesInicio: this.fechas().mesInicio,
                                    anoFin: this.fechas().anoFin,
                                    mesFin: this.fechas().mesFin
                                }
                            }),
                            axios.get(req2, {
                                params: {
                                    cod_corte: this.user[0].cod_corte,
                                    cod_tribunal: this.user[0].cod_tribunal,
                                    anoInicio: this.fechas().anoInicio,
                                    mesInicio: this.fechas().mesInicio,
                                    anoFin: this.fechas().anoFin,
                                    mesFin: this.fechas().mesFin
                                }
                            }),
                            axios.get(req3, {
                                params: {
                                    cod_corte: this.user[0].cod_corte,
                                    cod_tribunal: this.user[0].cod_tribunal,
                                    anoInicio: this.fechas().anoInicio,
                                    mesInicio: this.fechas().mesInicio,
                                    anoFin: this.fechas().anoFin,
                                    mesFin: this.fechas().mesFin
                                }
                            })                        
                        ]).then(axios.spread((...responses) => {

                            const data1 = responses[0].data
                            const data2 = responses[1].data
                            const data3 = responses[2].data

                            const ingresosMateria = []
                            const ingresosMateriaCausas = []

                            Object.values(data1.recordset).map((type) => {
                                ingresosMateria.push({ name: type.glosa, y: type.cantidad})
                            })

                            //Grafico torta para ingresos materias
                            this.chartOptionsTorta.series.push({
                                name: this.$attrs.title,
                                colorByPoint: true, 
                                data: ingresosMateria
                            });

                            //detalles para grilla
                            Object.values(data2.recordset).map((type) => {
                                this.items.push(type);
                                this.data.push(type);                                             
                            })
                            this.totalRows = this.items.length;

                            //Grafico torta para ingresos materias causas
                            Object.values(data3.recordset).map((type) => {
                                ingresosMateriaCausas.push({ name: type.glosa, y: type.cantidad})
                            })

                            this.chartOptionsTortaCausas.series.push({
                                name: this.$attrs.title,
                                colorByPoint: true, 
                                data: ingresosMateriaCausas
                            });
                           
                            this.$forceUpdate()
                        //     cantidad = []
                        //     glosa = ''
                        //     aux = 0                        

                        //     Object.values(data3.recordset).map((type) => {

                        //         if (glosa != '' && glosa != type.glosa) {
                        //             this.chartOptionsTwo.series.push({ name: glosa, data: cantidad })
                        //             cantidad = []
                        //             aux = 0
                        //         }
                        //         glosa = type.glosa
                        //         cantidad[aux] = type.cantidad;
                        //         aux ++
                        //     })                        
                            
                        //     this.chartOptionsTwo.series.push({ name: glosa, data: cantidad })   
                            
                        //     Object.values(data2.recordset).map((type) => {
                        //         this.items.push(type);
                        //         this.data.push(type);                                             
                        //     })
                        //     this.totalRows = this.items.length;
                        //     this.$forceUpdate()

                        
                        this.setModal(false)
                        })).catch(errors => {
                            console.log(errors);
                        })

                        break;           
                    default:
                        
                        break;
                        
                }
                  
                
            }
               
            
        })
        this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
             
            console.log('Modal is about to be close', bvEvent, modalId)
        })        
    },
    components: {
        highcharts: Chart,
        url,
        ModalLoading
    }    
}
</script>
<style>
.modal-header{
    background-color: #2979ff;
    color: #ffffff !important;
}
.modal-header .close {
    color: #ffffff !important;
    padding: 1rem 1rem;
    margin: -1rem -1rem -1rem auto;
}
</style>