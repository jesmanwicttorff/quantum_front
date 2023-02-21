<template>
    <b-container fluid class="px-4">
        <b-modal id="modal-escritos" size="xl" title="Escritos por Causas" ok-only>
            <b-tabs content-class="mt-3" align="center" >
                <b-tab title="Solicitudes" active>
                    <b-card class="border-0" header-bg-variant="primary" header-text-variant="white">
                        <b-row class="ml-4">
                            <span class="font-italic text-secondary" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio == fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} </span>
                            <span class="font-italic text-secondary" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio != fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} - {{ fechas.fechaFinalCompleta}} </span>
                            <span class="font-italic text-secondary" v-if="fechas.anoInicio != fechas.anoFin && fechas.mesInicio != fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} - {{ fechas.fechaFinalCompleta}} </span>
                        </b-row>
                        <highcharts :options="chartOptionsTwo" :constructor-type="'chart'" class="px-4 py-4" v-if="this.option != 1"/> 
                        <highcharts :options="chartOptionsTortaTwo" :constructor-type="'chart'" class="px-4 py-4" v-if="this.option == 1"/> 
                    </b-card>                    
                </b-tab>
                <b-tab title="Causas">
                    <b-card class="border-0" header-bg-variant="primary" header-text-variant="white">
                        <b-row class="ml-4">
                            <span class="font-italic text-secondary" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio == fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} </span>
                            <span class="font-italic text-secondary" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio != fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} - {{ fechas.fechaFinalCompleta}} </span>
                            <span class="font-italic text-secondary" v-if="fechas.anoInicio != fechas.anoFin && fechas.mesInicio != fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} - {{ fechas.fechaFinalCompleta}} </span>
                        </b-row>
                        <highcharts :options="chartOptions" :constructor-type="'chart'" class="px-4 py-4" v-if="this.option != 1"/> 
                        <highcharts :options="chartOptionsTorta" :constructor-type="'chart'" class="px-4 py-4" v-if="this.option == 1"/> 
                    </b-card>                     
                </b-tab> 
            </b-tabs>               
        </b-modal>
    </b-container>
</template>


<script>

import Vue from 'vue'
import countTo from 'vue-count-to'
import { mapState } from 'vuex'
import HighCharts from 'highcharts'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import stockInit from 'highcharts/modules/stock'
import Bigtooltip from '../../../components/elementos/Bigtooltip'
import store from 'store'
import { url, report } from '../../../config/api'

stockInit(HighCharts)
exporting(HighCharts)

export default {
    name: "ModalEscritos",
    data(){
        return{
            user: [{
                usuario_id : store.get('user_usuario_id'),
                cod_corte : store.get('cod_corte'),
                cod_tribunal : store.get('cod_tribunal'),
                ano : store.get('ano'),
                mes : store.get('mes')
            }],
            fechas: [],
            chartOptions: {
                chart: {
                        borderColor: '#2979ff',
                        borderWidth: 2,
                        borderRadius: '10',                            
                        type: 'column',
                        height: 600,
                        renderTo: 'chart'
                },
                title: {
                    text: ''
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
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },       
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                        enabled: true
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
            chartOptionsTwo: {
                chart: {
                        borderColor: '#2979ff',
                        borderWidth: 2,
                        borderRadius: '10',                            
                        type: 'column',
                        height: 600,
                        renderTo: 'chart'
                },
                title: {
                    text: ''
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
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },       
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                        enabled: true
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
            chartOptionsTortaTwo: {
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
            }          
        }
    },
    props: ['option'],
    mounted(){
        this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
            if(modalId == 'modal-escritos'){
                this.chartOptionsTorta.series=[]
                this.chartOptionsTortaTwo.series=[]
                this.chartOptions.series = []
                this.chartOptions.xAxis.categories = []
                this.chartOptionsTwo.series = []
                this.chartOptionsTwo.xAxis.categories = []            
                this.fechas = this.$setDate(this.option) // Menos tres   
                this.chartOptions.xAxis.categories = this.fechas.calendario
                this.chartOptionsTwo.xAxis.categories = this.fechas.calendario
                const axios = require('axios')
                const req1 = url +  '/familia/escritosCausas'
                const req2 = url +  '/familia/escritosSolicitudes'
                let data1 = []
                let data2 = []

                switch(this.option){
                    case 1:
                        axios.all([
                            axios.get(req1, {
                                params: {
                                    cod_corte: this.user[0].cod_corte,
                                    cod_tribunal: this.user[0].cod_tribunal,
                                    anoInicio: this.fechas.anoInicio,
                                    mesInicio: this.fechas.mesInicio,
                                    anoFin: this.fechas.anoFin,
                                    mesFin: this.fechas.mesFin
                                }
                            }),
                            axios.get(req2, {
                                params: {
                                    cod_corte: this.user[0].cod_corte,
                                    cod_tribunal: this.user[0].cod_tribunal,
                                    anoInicio: this.fechas.anoInicio,
                                    mesInicio: this.fechas.mesInicio,
                                    anoFin: this.fechas.anoFin,
                                    mesFin: this.fechas.mesFin
                                }
                            })                    
                        ]).then(axios.spread((...responses) => {

                            data1 = responses[0].data
                            data2 = responses[1].data

                            let cantidad = []
                            let glosa = ''
                            let aux = 0
                            const escritosCausasArr = []
                            const escritosSolicitudesArr = []

                            Object.values(data1.recordset).map((type) => {
                                escritosCausasArr.push({ name: type.Tipo_Causa, y: type.cantidad})
                            })

                            //Grafico torta para escritos causas
                            this.chartOptionsTorta.series.push({
                                name: this.$attrs.title,
                                colorByPoint: true, 
                                data: escritosCausasArr
                            });
                 

                            Object.values(data2.recordset).map((type) => {
                                escritosSolicitudesArr.push({ name: type.glosa, y: type.cantidad})
                            })                    
                            
                            //Grafico torta para escritos solicitudes
                            this.chartOptionsTortaTwo.series.push({
                                name: this.$attrs.title,
                                colorByPoint: true, 
                                data: escritosSolicitudesArr
                            }); 

                        })).catch(errors => {
                            console.log(errors);
                        })

                        this.$forceUpdate()
                        break;
                    default:
                        axios.all([
                            axios.get(req1, {
                                params: {
                                    cod_corte: this.user[0].cod_corte,
                                    cod_tribunal: this.user[0].cod_tribunal,
                                    anoInicio: this.fechas.anoInicio,
                                    mesInicio: this.fechas.mesInicio,
                                    anoFin: this.fechas.anoFin,
                                    mesFin: this.fechas.mesFin
                                }
                            }),
                            axios.get(req2, {
                                params: {
                                    cod_corte: this.user[0].cod_corte,
                                    cod_tribunal: this.user[0].cod_tribunal,
                                    anoInicio: this.fechas.anoInicio,
                                    mesInicio: this.fechas.mesInicio,
                                    anoFin: this.fechas.anoFin,
                                    mesFin: this.fechas.mesFin
                                }
                            })                    
                        ]).then(axios.spread((...responses) => {

                            data1 = responses[0].data
                            data2 = responses[1].data

                            let cantidad = []
                            let glosa = ''
                            let aux = 0

                            Object.values(data1.recordset).map((type) => {
                                if (glosa != '' && glosa != type.Tipo_Causa) {
                                    this.chartOptions.series.push({ name: glosa, data: cantidad })
                                    cantidad = []
                                    aux = 0
                                }
                                glosa = type.Tipo_Causa
                                cantidad[aux] = type.cantidad;
                                aux ++
                            })

                            this.chartOptions.series.push({ name: glosa, data: cantidad })


                            cantidad = []
                            glosa = ''
                            aux = 0                    

                            Object.values(data2.recordset).map((type) => {
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

                        })).catch(errors => {
                            console.log(errors);
                        })

                        this.$forceUpdate()
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
        Bigtooltip,
        countTo
    },
    
}
</script>

<style>
/* .modal-lg {
    max-width: auto !important;
   } */
</style>