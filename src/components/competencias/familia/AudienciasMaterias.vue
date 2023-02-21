<template>
    <b-container fluid class="py-3">
        <b-container fluid class="py-1">  
            <b-row class="px-4">
                <span class="font-italic text-secondary" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio == fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} </span>
                <span class="font-italic text-secondary" v-if="fechas.anoInicio == fechas.anoFin && fechas.mesInicio != fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} - {{ fechas.fechaFinalCompleta}} </span>
                <span class="font-italic text-secondary" v-if="fechas.anoInicio != fechas.anoFin && fechas.mesInicio != fechas.mesFin" >Periodo de Análisis:  {{ fechas.fechaInicioCompleta}} - {{ fechas.fechaFinalCompleta}} </span>
            </b-row>        
            <b-row sm="12" class="mt-3">
                <b-col sm="5" align-v="center">
                    <b-container>
                        <highcharts :options="chartOptions" :constructor-type="'chart'" />
                    </b-container>
                </b-col> 
                <b-col sm="2" >
                <b-button class="w-100 px-4 py-2" style="margin-bottom: 4%;" variant="outline-primary">
                    <span class="count_top">Total Rep. Materias</span>
                    <b-col class="count"><countTo  style="font-size: 150%;" class="count" :startVal="startVal" :endVal="endVal[0]" separator="." :duration="3000"></countTo></b-col>    
                </b-button>
                <b-button  class="w-100 px-4 py-2" style="margin-bottom: 4%;" variant="outline-primary">
                    <span class="count_top">Total Rep. Motivos</span>
                    <b-col class="count"><countTo  style="font-size: 150%;" class="count" :startVal="startVal" :endVal="endVal[1]" separator="." :duration="3000"></countTo></b-col>    
                </b-button>      
                <b-button  class="w-100 py-2" variant="outline-primary">
                    <span class="count_top">Total Aud. Materias</span>
                    <b-col class="count" style="text-align:left">
                        Realizadas: <countTo class="count" :startVal="startVal" :endVal="endVal[2]" separator="." :duration="3000"></countTo>
                    </b-col>
                    <b-col class="count" style="text-align:left">
                        Consejeros: <countTo class="count" :startVal="startVal" :endVal="endVal[3]" separator="." :duration="3000"></countTo>
                    </b-col>            
                </b-button>               
                </b-col>    
                <b-col sm="1">
                    <b-row class="p-1">
                    <b-col>
                        <b-button style="width:100px" @click="updateRange(1)" variant="outline-primary" v-bind:class="{ 'active': this.option == 1}" >Mes</b-button>
                    </b-col>
                    </b-row>
                    <b-row class="p-1">
                    <b-col>
                        <b-button  style="width:100px" @click="updateRange(2)" variant="outline-primary" v-bind:class="{ 'active': this.option == 2}">Trimestre</b-button>
                    </b-col>
                    </b-row>
                    <b-row class="p-1">
                    <b-col>
                        <b-button  style="width:100px"  @click="updateRange(3)" variant="outline-primary" v-bind:class="{ 'active': this.option == 3}">Año Movil</b-button>
                    </b-col>
                    </b-row>
                </b-col>        
                <b-col sm="4" align-v="center">
                    <b-container>
                        <highcharts :options="chartOptionsTwo" :constructor-type="'chart'" />
                    </b-container>
                </b-col>        
            </b-row>
            <b-row class="px-4">
                <b-col sm="12" align-v="center">
                    <b-container>
                        <highcharts :options="chartOptionsThree" :constructor-type="'chart'" />
                    </b-container>
                </b-col>                
            </b-row>     
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
import stockInit from 'highcharts/modules/stock'
stockInit(HighCharts)
exporting(HighCharts)
 
export default {
    name: "Audiencias",
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
            option: 1,
            chartOptions: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    minHeight: 300,
                    height: 340
                },
                title: {
                    align: 'left',
                    text: 'Audiencias Reprogramadas'
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
            chartOptionsTwo: {
                chart: {
                    type: 'bar',
                    minHeight: 300,
                    height: 340
                },
                title: {
                    align: 'left',                    
                    text: 'Audiencias'
                },
                xAxis: {
                    categories: [],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Reprogramadas por Motivos',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' Reprogramaciones'
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            formatter: function (element) {
                                return this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                            }
                        }
                    },                      
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },   
                legend: {
                    enabled: false
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
            chartOptionsThree: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Asistencia a audiencia de Consejeros Técnicos'
                },
                xAxis: {
                    categories: []
                },
                yAxis: [{
                    min: 0,
                    title: {
                        text: 'Cantidades'
                    }
                }, {
                    title: {
                        text: ''
                    },
                    opposite: true
                }],
                legend: {
                    shadow: false
                },
                tooltip: {
                    shared: true
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            formatter: function (element) {
                                return this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                            }
                        }
                    },                    
                    column: {
                        grouping: false,
                        shadow: false,
                        borderWidth: 0
                    }
                },
                series: [],
                credits: {
                    enabled: false
                },                
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
    created () {
        this.updateRange()
    },
    methods:{
        updateRange(option = 1){
            this.fechas = this.$setDate(option); // Menos tres
            this.option = option
            this.chartOptions.series = []
            this.chartOptionsTwo.xAxis.categories = []
            this.chartOptionsTwo.series = []
            this.chartOptionsThree.xAxis.categories = []
            this.chartOptionsThree.series = []
            this.endVal   = [0,0,0,0]

            const axios = require('axios')
            const req1 = url + '/familia/audienciasReprogramadasMaterias'
            const req2 = url + '/familia/audienciasReprogramadasSuspensiones'
            const req3 = url + '/familia/audienciasRealizadasMaterias'

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
                }),
                axios.get(req3, {
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

                const audienciasReprogramadasMaterias = responses[0].data
                const audienciasReprogramadas = []

                Object.values(audienciasReprogramadasMaterias.recordset).map((type) => {
                    if(!(type.glosa == 'Otros' && type.cantidad == 0))
                    {
                        audienciasReprogramadas.push({ name: type.glosa, y: type.cantidad })
                        this.endVal[0] += type.cantidad
                    }

                })

                this.chartOptions.series.push({
                    data: audienciasReprogramadas,
                    name: 'Audiencias',
                    colorByPoint: true
                })

                const audienciasReprogramadasSuspensiones = responses[1].data
                const audienciasReprogramadasSus = []

                Object.values(audienciasReprogramadasSuspensiones.recordset).map((type) => {
                    audienciasReprogramadasSus.push({ name: type.glosa, y: type.cantidad })
                    this.chartOptionsTwo.xAxis.categories.push(type.glosa)
                    this.endVal[1] += type.cantidad
                })

                this.chartOptionsTwo.series.push({
                    data: audienciasReprogramadas,
                    color: '#2979ff',                    
                    name: 'Audiencias'
                })

                const audienciasRealizadasMaterias = responses[2].data
                const audienciasRealizadasMateriasCantidades = []
                const audienciasRealizadasMateriasConsejo = []                
                
                Object.values(audienciasRealizadasMaterias.recordset).map((type) => {
                    audienciasRealizadasMateriasCantidades.push(type.cantidad)
                    audienciasRealizadasMateriasConsejo.push(type.consejero)
                    this.chartOptionsThree.xAxis.categories.push(type.glosa)
                    this.endVal[2] += type.cantidad
                    this.endVal[3] += type.consejero
                })   
                
                this.chartOptionsThree.series.push({
                    name: 'Audiencias Realizadas',
                    data: audienciasRealizadasMateriasCantidades,
                    color: '#2979ff',
                    pointPadding: 0.3,
                    pointPlacement: -0.2
                })                
                
                this.chartOptionsThree.series.push({
                    name: 'Consejero Tecnico',
                    data: audienciasRealizadasMateriasConsejo,
                    color: '#343a40',
                    pointPadding: 0.4,
                    pointPlacement: -0.2
                })  

                this.$forceUpdate()

            })).catch(errors => {

            })            
        }
    },
    components: {
        countTo,
        highcharts: Chart    
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