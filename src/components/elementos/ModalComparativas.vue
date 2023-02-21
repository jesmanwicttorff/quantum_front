<template>
    <v-dialog v-model="dialog" width="100%">
        <v-card>
            <v-toolbar dark color="primary">
                <v-toolbar-title>{{this.$attrs.gls_tribunal}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click="dialog = false">Salir</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <br>
            <v-card-text>
                <v-row>
                    <v-col v-if="this.arrIndicadorComparativos1[0] < this.arrIndicadorComparativos1[1]" class="rojo"
                        cols="12"
                        md="4"
                    >
                    <h5>{{titleText.titulo}}.</h5>
                        <highcharts :options="chartOptionsOne" :constructor-type="'chart'" />
                    </v-col>
                     <v-col v-else-if="this.arrIndicadorComparativos1[0] > this.arrIndicadorComparativos1[1]" class="verde"
                        cols="12"
                        md="4"
                    >
                        <h5>{{titleText.titulo}}.</h5>
                        <highcharts :options="chartOptionsOne" :constructor-type="'chart'" />
                    </v-col>
                    <v-col v-if="this.arrIndicadorComparativos1[0] === this.arrIndicadorComparativos1[1]" class="amarillo"
                        cols="12"
                        md="4"
                    >
                        <h5>{{titleText.titulo}}.</h5>
                        <highcharts :options="chartOptionsOne" :constructor-type="'chart'" />
                    </v-col>
                    
                    <!--------2do Indicador --->
                    
                    <v-col v-if="graf.diferencia<=0" md="4" cols="12" class="py-0 rojo">
                            
                            <v-col
                                cols="12"
                                md="12"
                            >
                                <h5>{{ graf.descripcion }}.</h5>
                            </v-col>
                            <br>
                            <br>
                            <br>
                            <br>                           
                            <v-col class="rojo2">
                            <h1 class="text-center py-9"> {{ graf.diferencia  }}%</h1>                                 
                            </v-col>                                        
                    </v-col>
                    
                    <v-col v-else-if="graf.diferencia > 0" md="4" cols="12" class="verde">
                            <v-col
                                cols="12"
                                md="12"
                            >
                            <h5>{{ graf.descripcion }}.</h5>
                            </v-col>
                            <br>
                            <br>
                            <br>
                            <br>
                            <v-col class="verde2">
                            <h1 class="text-center py-9"> {{ graf.diferencia  }}%</h1>                                 
                            </v-col>                                        
                    </v-col>
                    
                    <!--------3er Indicador --->
                    
                    <v-col v-if="this.arrIndicadorComparativos2[0] < this.arrIndicadorComparativos2[1]" class="rojo"
                        cols="12"
                        md="4"
                    >
                     <h5>{{titleText2.titulo}}.</h5>
                        <highcharts :options="chartOptionsTwo" :constructor-type="'chart'" />
                    </v-col>

                     <v-col v-else-if="this.arrIndicadorComparativos2[0] > this.arrIndicadorComparativos2[1]" class="verde"
                        cols="12"
                        md="4"
                    > 
                     <!-- <p>{{glosaOne}}</p> -->
                     <h5>{{titleText2.titulo}}.</h5>
                        <highcharts :options="chartOptionsTwo" :constructor-type="'chart'" />
                     </v-col>                   
                       
                    <v-col v-if="this.arrIndicadorComparativos2[0] === this.arrIndicadorComparativos2[1]" class="amarillo"
                        cols="12"
                        md="4"
                    >
                   <!-- <p>{{glosaOne}}</p> -->
                        <h5>{{titleText2.titulo}}.</h5>
                        <highcharts :options="chartOptionsTwo" :constructor-type="'chart'" />
                    </v-col>
                   
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import ModalLoading from '../../components/elementos/ModalLoading'
import Vue from 'vue'
import store from 'store'
import { url } from '../../config/api'
import { mapState,mapMutations } from 'vuex'
import { quantum } from '../../config/quantum'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import moment from 'moment-timezone'
moment.locale('es');
stockInit(HighCharts)
exporting(HighCharts)

export default {
        name: "ModalComparativas",
        data: () => ({
            dialog: true,
            graf: {},
            titleText:{},
            titleText2:{},
            arrIndicadorComparativos1: [],
            arrIndicadorComparativos2: [],
            user: [{
                usuario_id : store.get('user_usuario_id'),
                cod_corte : store.get('cod_corte'),
                cod_tribunal : store.get('cod_tribunal'),
                ano : store.get('ano'),
                mes : store.get('mes')
            }],
            chartOptionsOne: {
                chart: {
                    type: 'column',
                    height: '95%'
                },
                title: {
                    text: '',
                    aling:'justify'
                     
                },
                xAxis: {
                    categories: []
                },
                yAxis: [{
                    min: 0,
                    title: {
                        text: 'Promedios'
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
                            text: '',                    
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
                    type: 'column',
                    height: '100%'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: []
                },
                yAxis: [{
                    min: 0,
                    title: {
                        text: 'Promedios'
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
                            text: '',                    
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
        }),
        components: {
            ModalLoading,
            highcharts: Chart  
        },
        methods:{
            ...mapState(['fechas']), // Valores Guardados
            requestData(){
                const axios = require('axios')
                const req1 = url + '/familia/indicadoresComparativos' 
                this.chartOptionsOne.xAxis.categories = []
                this.chartOptionsOne.series = []
                const varAno = this.fechas().anoFin || this.$route.params.ano
                const varMes = this.fechas().mesFin || this.$route.params.mes

                

                const get = async request => {
                    try{
                        const response = await axios.get(req1, {
                            params: {
                                    cod_corte: this.user[0].cod_corte,
                                    cod_tribunal: this.user[0].cod_tribunal,
                                    ano: varAno,
                                    mes: varMes
                            }
                                        
                        })

                        const data = response.data
                        let arrIndicadorComparativos1 = []
                        let glosa = ''
                        
                        Object.values(data.recordset).map((type) => {
                            if(type.orden == 1){
                                this.arrIndicadorComparativos1.push(type.avg_tribunal)
                                this.arrIndicadorComparativos1.push(type.avg_indicador)
                                
                                this.titleText={titulo: type.descripcion}        
                               // this.chartOptionsOne.title.text = type.descripcion
                                glosa = 'Tribunal'
                                this.chartOptionsOne.xAxis.categories.push(glosa)
                                glosa = type.glosa_comparativa
                                this.chartOptionsOne.xAxis.categories.push(glosa)
                            }
                        })
                       // console.log(this.arrIndicadorComparativos1[0]); // tribunal
                       // console.log(this.arrIndicadorComparativos1[1]); // juzgado familia

                         Object.values(data.recordset).map((type) => {
                            if(type.orden == 2){
                
                                this.graf={diferencia: type.diferencia , descripcion: type.descripcion}
                            }
                        }) 
                        

                       this.chartOptionsOne.series.push({
                            name: 'Resoluciones',
                            titulo: this.titleText,
                            data: this.arrIndicadorComparativos1,
                            color: '#2979ff'

                            
                            // pointPadding: 0.3,
                            // pointPlacement: -0.2
                        })   
                        
                        
                        
                      let  arrIndicadorComparativos2 = []
                        glosa = ''                        
                        
                            Object.values(data.recordset).map((type) => {
                            if(type.orden == 7){
                                this.arrIndicadorComparativos2.push(type.avg_tribunal)
                                this.arrIndicadorComparativos2.push(type.avg_indicador)
                                this.titleText2={titulo: type.descripcion}     
                                //this.chartOptionsTwo.title.text = type.descripcion
                                glosa = 'Tribunal'
                                this.chartOptionsTwo.xAxis.categories.push(glosa)
                                glosa = type.glosa_comparativa
                                this.chartOptionsTwo.xAxis.categories.push(glosa)
                            }
                        }) 




                        this.chartOptionsTwo.series.push({
                            name: 'Audiencias',
                            data: this.arrIndicadorComparativos2,
                            titulo: this.titleText2,
                            color: '#2979ff'
                            // pointPadding: 0.3,
                            // pointPlacement: -0.2
                        })                           


                    } 
                    catch (error) {
                        console.log(error)
                    }
                }

                get(req1)

            },
        },
        created(){
            this.requestData()
        },
        computed: {
        }
}
</script>
<style  scoped>
        .rojo { 
        border-width: 1px;
        border-style: solid;
        border-color: rgb(240, 9, 9);
        color:  rgb(0, 0, 0);
        text-align: justify;
        font-size: 12.5em;
        
        
        }
        .rojo2 { 
        border-width: 1px;
        border-style: solid;
        border-color: rgb(255, 255, 255);
        color:  rgb(240, 9, 9);
        text-align: justify;
        
        }
        .verde { 
        border-width: 1px;
        border-style: solid;
        border-color: rgb(66, 221, 105);
        color:  rgb(0, 0, 0);
        text-align: justify;
        font-size: 12.5em;
        }
        .verde2 { 
        border-width: 1px;
        border-style: solid;
        border-color: rgb(66, 221, 105);
        color:  rgb(66, 221, 105);
        text-align: justify;
        }
         .amarillo { 
        border-width: 1px;
        border-style: solid;
        border-color: rgb(255, 251, 0);
        color: rgb(255, 251, 0);
        text-align: justify;
        }
</style>