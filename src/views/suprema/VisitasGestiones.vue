<template>
    <b-container fluid class="px-6">
        <RightSidebar @clicked="update" v-bind:dateRange="dateRange" />
        <v-row  md="12" dense>
            <v-col>
                <v-card>
                    <v-card-title class="primary white--text">
                    Requerimientos
                    <v-spacer></v-spacer>
                    <v-btn small outlined color="white"  class="mr-8">Volver</v-btn>
                    <v-btn small outlined color="white" v-b-toggle.sidebar-right class="mr-8">
                        <b-icon icon="search"></b-icon>
                    </v-btn>    
                    </v-card-title>
                    <v-card-text class="mt-5">
                        <v-stepper v-model="e1">
                            <v-stepper-header>
                                <v-stepper-step :complete="e1 >1" step="1">Gestión Corte de Apelaciones</v-stepper-step>
                                <v-divider></v-divider>
                                <v-stepper-step :complete="e1 > 2" step="2">Gestión Tribunales 1° Instancia</v-stepper-step>
                                <v-divider></v-divider>
                                <v-stepper-step step="3">Recurso Humano</v-stepper-step>
                            </v-stepper-header>
                            <BotonMultiple v-on:descargarPDF="descargarPDF" />
                            <v-stepper-items>
                                <v-stepper-content step="1">
                                    <b-container class="tile_count">
                                        <v-row class="tile_stats_count">
                                            <v-col sm="2">
                                                <span class="count_top">Ingresos</span>
                                                <v-col class="count green--text"><countTo class="count" :startVal="startVal" :endVal="endVal[0]" separator="." :duration="3000"></countTo></v-col>
                                            </v-col>

                                            <v-col sm="2">
                                                <span class="count_top">Ingresos sin PR16</span>
                                                <v-col class="count green--text"><countTo class="count" :startVal="startVal" :endVal="endVal[1]" separator="." :duration="3000"></countTo></v-col>
                                            </v-col>

                                            <v-col sm="2">
                                                <span class="count_top">Ingresos PR16</span>
                                                <v-col class="count green--text"><countTo class="count" :startVal="startVal" :endVal="endVal[2]" separator="." :duration="3000"></countTo></v-col>
                                            </v-col>

                                            <v-col sm="2">
                                                <span class="count_top">Terminos</span>
                                                <v-col class="count blue--text"><countTo class="count" :startVal="startVal" :endVal="endVal2[0]" separator="." :duration="3000"></countTo></v-col>
                                            </v-col>

                                            <v-col sm="2">
                                                <span class="count_top">Terminos Sin PR16</span>
                                                <v-col class="count blue--text"><countTo class="count" :startVal="startVal" :endVal="endVal2[1]" separator="." :duration="3000"></countTo></v-col>
                                            </v-col>

                                            <v-col sm="2">
                                                <span class="count_top">Terminos PR16</span>
                                                <v-col class="count blue--text"><countTo class="count" :startVal="startVal" :endVal="endVal2[2]" separator="." :duration="3000"></countTo></v-col>
                                            </v-col>
                                        </v-row>
                                    </b-container>
                                    <v-row>
                                        <v-col md="8" offset-md="1">
                                            <highcharts :options="chartOptions" :constructor-type="'chart'" class="mt-2" id="GraficoIngreso" />
                                        </v-col>
                                        <v-col md="3">
                                            <!-- observacion -->
                                            <v-textarea :rows="10" :loading="textloading" :auto-grow="autoGrow" solo label="Observación" v-model="userForm[1][0].descripcion"></v-textarea>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col md="8" offset-md="1">
                                            <highcharts :options="chartOptionsTwo" :constructor-type="'chart'" class="mt-2" id="GraficoIngresoSINPR16" />
                                        </v-col>
                                        <v-col md="3">
                                            <!-- observacion -->
                                            <v-textarea :rows="10" :loading="textloading" solo :auto-grow="autoGrow" label="Observación" v-model="userForm[1][1].descripcion"></v-textarea>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col md="8" offset-md="1">
                                            <highcharts :options="chartOptionsThree" :constructor-type="'chart'" class="mt-2" id="GraficoIngresoPR16" />
                                        </v-col>
                                        <v-col md="3">
                                            <!-- observacion -->
                                            <v-textarea :rows="10" :loading="textloading" solo :auto-grow="autoGrow" label="Observación" v-model="userForm[1][2].descripcion"></v-textarea>
                                            <span id="pdf"></span>
                                        </v-col>
                                    </v-row>
                                    <v-row dense>
                                        <v-col md="3" offset-md="1">
                                            <v-btn class="center" color="primary" @click="saves(2)"> Siguiente </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-stepper-content>
                                <!-- Finaliza paso 1-->
                                <!--- Paso2 -->
                                <v-stepper-content step="2">
                                    <!-- <v-text-field v-model="search" :loading="textloading" append-icon="mdi-magnify" label="Search" single-line hide-details dense></v-text-field> -->
                                    <v-row md="12" dense>
                                        <v-col offset-md="1">
                                            <v-data-table :headers="array_Tribunales" :items="Query_Corte_Competencia" :search="search" :page.sync="page" :items-per-page="itemsPerPage" dense hide-default-footer @page-count="pageCount = $event" calculate-widths>
                                                <template v-slot:[`item.GARANTIA`]="{ item  }">
                                                    <v-row v-if="item.GARANTIA === 1" md="12" dense>
                                                        <Modalgarantia :fechasConsulta="{cod_corte: item.COD_CORTE, cod_tribunal: item.cod_tribunal, ano: item.ANO, mes: item.MES, exhorto: 1}" />
                                                    </v-row>
                                                </template>

                                                <template v-slot:[`item.COBRANZA`]="{ item }">
                                                    <v-row>
                                                        <v-btn v-if="item.COBRANZA === 1" width="100%" color="primary" small @click="verIndicadore(item)" class="white--text">
                                                            Visualizar
                                                        </v-btn>
                                                    </v-row>
                                                </template>
                                                <template v-slot:[`item.LABORAL`]="{ item }">
                                                    <v-row v-if="item.LABORAL === 1" md="12" dense>
                                                            <Modallaboral :fechasConsulta="{cod_corte: item.COD_CORTE, cod_tribunal: item.cod_tribunal, ano: item.ANO, mes: item.MES, exhorto: 1}" />
                                                    </v-row>
                                                </template>
                                                <template v-slot:[`item.FAMILIA`]="{ item }">
                                                    <v-row>
                                                        <v-btn v-if="item.FAMILIA === 1" width="100%" color="primary" small @click="verIndicadore(item)" class="white--text">
                                                           Visualizar
                                                        </v-btn>
                                                    </v-row>
                                                </template>
                                                <template v-slot:[`item.CIVIL`]="{ item }">
                                                    <v-row>
                                                        <v-btn v-if="item.CIVIL === 1" width="100%" color="primary" small @click="verIndicadore(item)" class="white--text">
                                                            Visualizar
                                                        </v-btn>
                                                    </v-row>
                                                </template>
                                            </v-data-table>
                                            <v-row justify="center" dense>
                                                <v-col cols="6">
                                                    <v-pagination v-model="page" :length="pageCount"></v-pagination>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>                                        
                                    <v-row dense>
                                        <v-col md="3" offset-md="1">
                                            <v-btn class="center text-white" color="red" @click="regresar(2)"> Atras </v-btn>
                                            <v-btn style="margin: 10px;" class="center" color="primary" @click="saves(3)"> Siguiente </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-stepper-content>

                                <!----Paso3-->
                                <v-stepper-content step="3">
                                    <v-row dense>
                                        <v-col md="3" offset-md="1">
                                            <v-btn class="center text-white" color="red" @click="regresar(3)"> Atras </v-btn>
                                            <v-btn style="margin: 10px;" class="center" color="primary" @click="saves(4)"> Siguiente </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-stepper-content>
                            </v-stepper-items>
                        </v-stepper>                        
                    </v-card-text>              
                </v-card>
            </v-col>
        </v-row>
        <!-- <b-container class="py-4">
            <v-row>
                <v-col md="4">
                    
                </v-col>
                <v-col md="4">
                    <span style="float: right;">Periodo de Análisis: {{this.settingDate(this.dateRange[0])}} al {{this.settingDate(this.dateRange[1])}} </span>
                </v-col>
                <v-col md="4">

                </v-col>
            </v-row>
        </b-container> -->

       <!--  <ModalLoading />-->
        <!--- Fin del paso a paso-->
    </b-container>
</template>

<script type="text/ecmascript-6">
import store from 'store'
import Vue from 'vue'
import { url } from '../../config/api'
import { Graph } from '../../config/Highcharts'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import loadDrillDown from 'highcharts/modules/drilldown'
import stockInit from 'highcharts/modules/stock'
import countTo from 'vue-count-to'
import RightSidebar from '../../components/RightSidebar'
import BotonMultiple from '../../views/suprema/BotonMultiple'
import { mapState , mapMutations } from 'vuex'
import Bigtooltip from '../../components/elementos/Bigtooltip'
import html2canvas from 'html2canvas'
import jsPDF  from "jspdf"
import ModalLoading from '../../components/elementos/ModalLoading'
import Modalgarantia from '../suprema/Modal_garantia'
import Modallaboral from '../suprema/Modal_laboral'
import  "jspdf-autotable"


export default {

    name: "VisitasGestiones",
    data() {
        return{
             dialog: false,
            user: {
                usuario_id: store.get('user_usuario_id'), // Los parametros que obtenemos de la url
                cod_corte: store.get('user_cod_corte'),
                cod_tribunal: store.get('cod_tribunal'),
                id_agendamiento: store.get('id_agendamiento') // Paremetros obtenido desde params....
            },
            Query_Corte_Competencia: [], 
            page: 1,
            pageCount: 0,
            itemsPerPage: 5,               
            search: '',
            array_Tribunales:  [
                { text: '#',  align: 'center', value: 'increment', class : 'primary white--text', width: '5%'},
                { text: 'Tribunales',  align: 'left', value: 'gls_tribunal', class : 'primary white--text', width: '60%' },
                { text: 'Garantia', align: 'center', value: 'GARANTIA', sortable: 0 , class : 'primary white--text', width: '7%' },
                { text: 'Cobranza', align: 'center', value: 'COBRANZA', class : 'primary white--text', width: '7%' },
                { text: 'Laboral', align: 'center', value: 'LABORAL', class : 'primary white--text', width: '7%' },
                { text: 'Familia', align: 'center', value: 'FAMILIA', class : 'primary white--text', width: '7%' },
                { text: 'Civil', align: 'center', value: 'CIVIL', class : 'primary white--text', width: '7%' },
              ],
            dateRange: [new Date(2020, 0, 1), new Date(2020, 11, 31)],
            chartOptions: {
                chart: {
                    type: 'column',
                    renderTo: 'chart'
                },
                title: {
                    text: 'Ingresos Vs Terminos',
                    align: 'left'
                },
                accessibility: {
                    announceNewData: {
                    enabled: true
                    }
                },
                xAxis: {
                    type: 'category',
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
                legend: {
                    enabled: true
                },
                tooltip: {
                    pointFormat: '{point.y}'
                },
                credits: false,
                plotOptions: {
                    series: {
                    dataLabels: {
                        enabled: true,
                        formatter: function (element) {
                        return this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                        }
                    }
                    }
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
                        'downloadXLS'
                                    ]
                            }
                        }
                    }
                    },
            chartOptionsTwo: {
                chart: {
                    type: 'column',
                    renderTo: 'chart'
                },
                title: {
                    text: 'Ingresos Vs Terminos sin PR16',
                    align: 'left'
                },
                accessibility: {
                    announceNewData: {
                    enabled: true
                    }
                },
                xAxis: {
                    type: 'category',
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
                legend: {
                    enabled: true
                },
                tooltip: {
                    pointFormat: '{point.y}'
                },
                credits: false,
                plotOptions: {
                    series: {
                    dataLabels: {
                        enabled: true,
                        formatter: function (element) {
                        return this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                        }
                    }
                    }
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
                    'downloadXLS'
                    ]
                }
                }
            }
            },
            chartOptionsThree: {
                    chart: {
                    type: 'column',
                    renderTo: 'chart'
                    },
                    title: {
                    text: 'Ingresos Vs Terminos PR16',
                    align: 'left'
                    },
                    accessibility: {
                    announceNewData: {
                        enabled: true
                    }
                    },
                    xAxis: {
                    type: 'category',
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
                    legend: {
                    enabled: true
                    },
                    tooltip: {
                    pointFormat: '{point.y}'
                    },
                    credits: false,
                    plotOptions: {
                    series: {
                        dataLabels: {
                        enabled: true,
                        formatter: function (element) {
                            return this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                        }
                        }
                    }
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
                            'downloadXLS'
                        ]
                        }
                    }
                    }
                }, 
            startVal: 0,
            endVal: [0, 0, 0],
            endVal2: [0, 0, 0],
            dateRange: [new Date(2020, 0, 1), new Date(2020, 11, 31)],           
            e1: 1,
            botondesabilitado: true,
            textloading: true,
            autoGrow: true,
            change: false,
            text: [
                'Se visualiza el total de recursos ingresados por Cortes',
                'Se visualiza el total de recursos ingresados por Cortes, sin contar recursos “Protección-Isapre adecuación” y “Pleno y otros adm”',
                'Se visualiza el total de recursos ingresados por Cortes contando solo  “Protección-Isapre adecuación” y “Pleno y otros adm”'
            ],
            userForm:{ 
                1: [ 
                        { id_tipo_sub_observacion: 1 , descripcion: ''},
                        { id_tipo_sub_observacion: 2 , descripcion: ''},
                        { id_tipo_sub_observacion: 3 , descripcion: ''}
                    ],
                2:  [
                        { id_tipo_sub_observacion: 4 , descripcion: ''},
                        { id_tipo_sub_observacion: 5 , descripcion: ''},
                        { id_tipo_sub_observacion: 6 , descripcion: ''}
                    ], 
                3: [
                    { id_tipo_sub_observacion:  7 , descripcion: ''},
                    { id_tipo_sub_observacion:  8 , descripcion: ''},
                    { id_tipo_sub_observacion:  9 , descripcion: ''}
                ]
            },
            PDF: {

            },
            modal: 'Modal_garantia',
            PDFOBS: [],
            Titulo: 'INFORME VISITA CORTE DE APELACIONES', // Titulo para el PDF
            Titulo2: 'CORTE DE APELACIONES', // Titulo para el PDF
            Titulo3: 'DOTACIÓN', // Titulo para el PDF
        }
    },
    beforeCreate(){ // Antes de se creen las variables y los metodos asigno el parametro obtenido a local storage
        if(this.$route.params.id){
        store.set('id_agendamiento',this.$route.params.id)
        }
    },
    created(){
        this.requestData(this.dateRange)
        this.getCortes()
        this.getObs()
        this.urlquauntum = 'inicio'  
        this.Query_agendamiento_cortes_observaciones() // Metodo para mostar las observaciones
        this.desabilitado() // Metodo para Desabilitar el boton hasta que no coloque las observaciones
        this.get_tribunales_competencia() // Metodo para obtener los datos de los tribunales y competencia asociado a la corte seleccionado
    },
    computed: {
        ...mapState([
        'active'
        ])
    },
    watch: {
        active () {
        this.change = true
        this.update(this.dateRange)
        }
    },
    components:{
        highcharts: Chart,
        countTo,
        RightSidebar,
        BotonMultiple,
        Bigtooltip,
        ModalLoading,
        Modalgarantia,
        Modallaboral
    },
    active () {
        this.change = true
        this.update(this.dateRange)
    },
    methods: {
        ...mapMutations(['setModal']),
        descargarPDF(){
            this.getObs() 
              
            window.scrollTo(0,0) // Desplaza hacia arriba
            let doc = new jsPDF('l', 'mm');
            let img1 = '';
            let img2 = '';
            let img3= '';
            let j=30;
            let i;
            var width = doc.internal.pageSize.width; // ancho 297
            var height = doc.internal.pageSize.height; // altura 210
            var imgData = 'data:image/jpeg;base64,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'
            doc.addImage(imgData, 'JPEG', 15, 5, 30, 30)
            
           html2canvas(document.querySelector('#GraficoIngreso')).then(canvas => {
                let wid = canvas.width; 
                let hgt = canvas.height;
                var hratio = hgt/wid;
                var height = width * hratio; 

                doc.setFontSize(12);
                      doc.text(160,40, this.Titulo,{ align: 'center' });
            
                doc.autoTable({
                    tableLineColor: [0, 0, 0],
                    tableLineWidth: 0.5,
                    theme: 'grid',
                    bodyStyles: {lineColor: [0, 0, 0]},
                         styles: { padding:0 },
                      // columnStyles: { fillColor: [100, 255, 255] }, // Cells in first column centered and green
                        margin: { top: 45 },
                        body: [
                            ['MINISTRO VISITADOR', 'SRA. MARIA EUGENIA SANDOVAL GOUET'],
                            ['CORTE DE APELACIONES', 'C.A. VALPARAÍSO'],
                            ['FECHA INICIO', ''],
                            ['FECHA FIN', '']
                        ],
                        })
                        
                doc.text(14, 85, this.Titulo2,{ align: 'left' });
                doc.text(14, 90, this.Titulo3,{ align: 'left' });

                doc.autoTable({
                        tableLineColor: [189, 195, 199],
                        tableLineWidth: 0.5,
                        tableLineColor: [0, 0, 0],
                        theme: 'grid',
                        bodyStyles: {lineColor: [0, 0, 0]},
                        styles: { padding:0 },
                        // margin: { top: 120 },
                        startY: 95, // Estos es la posicion de los ejes Y 
                        body: [
                            ['MINISTROS', '                                                                         '],
                            ['RELATORES', '                                                                         '],
                            ['FISCALES', '                                                                          '],
                            ['SECRETARIOS', '                                                                       '],
                            ['ABOGADOS INTEGRANTES', '                                                              '],
                            ['ADMINISTRADOR', '                                                                      '],
                            ['JEFES DE UNIDAD', '                                                                    '],
                            ['SALAS ORDINARIAS', '                                                                   '],
                            ['SALAS EXTRAORDINARIAS', '                                                              ']
                        ],
                })
                     

               
              
                doc.addPage();
                let img1 = canvas.toDataURL('image/png', wid , hgt )  
                      
                doc.addImage(img1, 'png', 10, 20, width-20, height-20) // Grafica
                doc.text(15,120,'1. Observacion')
                doc.setFontSize(12);
                doc.text(15,130,this.userForm[1][0].descripcion,{ align: "justify", lineHeightFactor: 1.5, maxWidth: 260 })
                doc.addPage();
                // Grafica 2 
                html2canvas(document.querySelector('#GraficoIngresoSINPR16')).then(canvas => {
                let wid = canvas.width; 
                let hgt = canvas.height;
                var hratio = hgt/wid;
                var height = width * hratio;     
                let img2 = canvas.toDataURL('image/png' , wid , hgt)
                doc.addImage(img2, 'png', 10, 20,  width-20, height-20) // Grafica
                doc.text(15,120,'2. Observacion')
                doc.setFontSize(12);
                doc.text(15,130,this.userForm[1][1].descripcion,{ align: "justify", lineHeightFactor: 1.5, maxWidth: 260 })
                doc.addPage();
                // Grafica 3        
                html2canvas(document.querySelector('#GraficoIngresoPR16')).then(canvas => {
                let wid = canvas.width; 
                let hgt = canvas.height;
                var hratio = hgt/wid;
                var height = width * hratio;     
                let img3 = canvas.toDataURL('image/png',wid , hgt)
                doc.addImage(img3, 'png', 10, 20, width-20, height-20) // Grafica
                doc.text(15,120,'3. Observacion')
                doc.setFontSize(12);
                doc.text(15,130,this.userForm[1][2].descripcion,{ align: "justify", lineHeightFactor: 1.5, maxWidth: 260 })
               /************Otras Observaciones*** */
               if(this.PDFOBS.length !== 0){
                   doc.addPage();
                   doc.text(15,20,'4. Otras Observaciones')    
                    for (i=0;i<this.PDFOBS.length;i++)
                    {     
                    doc.setFontSize(12);
                    //let w = doc.getStringUnitWidth(this.PDFOBS[i].obs) * 12
                    //let dim = doc.getTextDimensions(this.PDFOBS[i].obs);
                    doc.text(15,j,this.PDFOBS[i].obs,{ align: "justify", lineHeightFactor: 1.5, maxWidth: 260 })
                    j=j+40
                    }
               }
               
               doc.save('Cortes.pdf')
               
                  })
                   })
            })
          //  html2canvas(body,{ onrendenetworking:function(canvas){ var pdf=new jsPDF("p", "mm", "a4"); var width = pdf.internal.pageSize.width; var height = pdf.internal.pageSize.height; pdf.addImage(canvas, 'JPEG', 0, 0,width,height); pdf.save('test11.pdf'); } })
        
        },
        getCortes(){
            
            const axios = require('axios')     // Query para hacer el insert de los items en el modal      
            const request1 = url + '/suprema/get_corte_usuario'
                const get = async request1 => {
                    try {
                        const response = await axios.get(request1, {
                            params: 
                            {
                                usuario_id: this.user.usuario_id,
                                cod_corte:  this.user.cod_corte
                            }
                        })
                        const data = response.data
                        Object.values(data.recordset).map((type) => {
                            this.PDF = { name: type.nombre, corte: type.gls_corte }   
                        })
                      //  console.log(data);  
                       
                    }catch(errors) {
                        console.log(errors);
                    } 
                }
                 get(request1)           
        },
        getObs(){
            
            const axios = require('axios')     // Query para OBTENER     
            const request2 = url + '/suprema/get_obs_Ingreso_termino'
            this.PDFOBS=[]; 
             const get = async request2 => {
                    try {
                        const response = await axios.get(request2, {
                            params: 
                            {
                                id_tipo: 3,
                                id_flg:  1,
                                id_eli:  0
                            }
                        })
                        const data1 = response.data
                        Object.values(data1.recordset).map((type) => {
                            this.PDFOBS.push({  tipo: type.id_tipo_sub_observacion, obs: type.observacion  })   
                        }) 
                       // console.log(this.PDFOBS.length);
                       
                    }catch(errors) {
                        console.log(errors);
                    } 
                }
           
            get(request2) 
        },       
        desabilitado() { // Metodo para bloquear el boton si no ha ingresado las observaciones
            return  this.userForm[1][0].descripcion == '' || 
            this.userForm[1][1].descripcion == '' ||
            this.userForm[1][2].descripcion == '' 

            },
        saves(step){
            this.userForm[this.e1].map((type) => {
                const axios = require('axios')
                const ing_url = url + '/suprema/insertAgendamientos_Cortes_Observaciones'

                const get =  ing_url => {
                    try {
                    const response = axios.get(ing_url, {
                        params: {
                            id_agendamiento: this.user.id_agendamiento,
                            id_tipo_sub_observacion: type.id_tipo_sub_observacion,
                            observacion: (type.descripcion.length == 0) ? 'Sin Observación': type.descripcion 
                        }
                        
                    })
                

                    } catch (error) {
                        console.log(error)
                    }
                }
                get(ing_url)  
            })
            
            this.e1 ++
        },  
        requestData: function (dateRange) {
            this.setModal(true) // Aqui Manipulamos el modal
            this.dateRange = dateRange
            this.chartOptions.series = []
            this.chartOptionsTwo.series = []
            this.chartOptionsThree.series = []
            this.chartOptions.chart.height = 300
            this.chartOptionsTwo.chart.height = 300
            this.chartOptionsThree.chart.height = 300
            const axios = require('axios') // query para mostrar las cantidades en la grafica
            const ing_url = url + '/apelaciones/cortesIngresosCantidades'
            const ter_url = url + '/apelaciones/cortesTerminosAnuales'
          
            const get = async ing_url => {
            try {
                const response = await axios.get(ing_url, {
                params: {
                dateRange: this.dateRange
                }
            })
            const data = response.data
            const ingresos = []
            const sinpr16 = []
            const pr16 = []
                Object.values(data.recordset).map((type) => {  // Query para dibujar las graficas
                ingresos.push({ name: type.gls_corte, y: Math.round(type.cantidad + type.cantidad_pr) })
                sinpr16.push({ name: type.gls_corte, y: Math.round(type.cantidad) })
                pr16.push({ name: type.gls_corte, y: Math.round(type.cantidad_pr) })    
                this.endVal[0] += Math.round(type.cantidad + type.cantidad_pr)
                this.endVal[1] += Math.round(type.cantidad)
                this.endVal[2] += Math.round(type.cantidad_pr)
                
                })
                this.chartOptions.series.push({
                    data: ingresos,
                    name: 'Ingresos Totales',
                    color: '#1ABB9C'
                })

                this.chartOptionsTwo.series.push({
                    data: sinpr16,
                    name: 'Ingresos Sin PR16',
                    color: '#1ABB9C'
                })
                this.chartOptionsThree.series.push({
                    data: pr16,
                    name: 'Ingresos PR16',
                    color: '#1ABB9C'
                })
                
               
                this.$forceUpdate() // Forzamos a actualizar el contador
                      
                }catch (error) {
                    console.log(error)
                }
            }
             
            /*************************Termino ************************************/

          const get2 = async ter_url => { // LLamamos la consulta de Termino
            try {
                const response = await axios.get(ter_url, {
                params: {
                dateRange: this.dateRange
                }
            })
                const data2 = response.data
                const terminos = []
                const tersinpr16 = []
                const terpr16 = []
                    Object.values(data2.recordset).map((type) => {  // Query para dibujar las graficas
                terminos.push({ name: type.gls_corte, y: Math.round(type.cantidad + type.cantidad_pr) })
                tersinpr16.push({ name: type.gls_corte, y:  Math.round(type.cantidad) })
                terpr16.push({ name: type.gls_corte, y: Math.round(type.cantidad_pr) })
                this.endVal2[0] += Math.round(type.cantidad + type.cantidad_pr)
                this.endVal2[1] += Math.round(type.cantidad)
                this.endVal2[2] += Math.round(type.cantidad_pr)    
                })
            

                this.chartOptions.series.push({
                data: terminos,
                name: 'Terminos',
                color: '#2A3F54'
                })

                this.chartOptionsTwo.series.push({
                    data: tersinpr16,
                    name: 'Terminos Sin PR16',
                    color: '#2A3F54'
                })
                this.chartOptionsThree.series.push({
                    data: terpr16,
                    name: 'Termino PR16',
                    color: '#2A3F54'
                })
                 this.setModal(false) // Aqui Manipulamos el modal   
                 this.$forceUpdate() // Forzamos a actualizar el contador
                 
              
                }catch (error) {
                    console.log(error)
                }
            }
            get(ing_url)
            get2(ter_url)
        },    
        regresar(step){
            this.e1 -- // regresa al paso anterior
            
            },
            update (value) 
            {
                this.startVal = 0
                this.endVal = [0, 0, 0]
                this.endVal2 = [0, 0, 0]
                this.requestData(value)
            },
            settingDate (date)  // Formato del calendario
            {
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
            },
        Query_agendamiento_cortes_observaciones() {
           
            const axios = require('axios')
            const req2 = url + '/suprema/agendamientos_cortes_observaciones' // Link de la llamada
            // Consulta para mostrar las observaciones de agendamiento en el modal
            axios.all([
                axios.get(req2, {
                    params: {
                        id_agendamiento: this.user.id_agendamiento,
                        flg_observacion: 0
                    }
                })
                ]).then(axios.spread((...responses) => {

                    const obj = responses[0].data

                    Object.values(obj.recordset).map((type) => {
                        const newObj = this.userForm[type.id_tipo_observacion].filter(item => item.id_tipo_sub_observacion === type.id_tipo_sub_observacion);  

                        const pos = this.userForm[type.id_tipo_observacion].map(function(e) { 
                                        return e.id_tipo_sub_observacion; 
                                    }).indexOf(newObj[0].id_tipo_sub_observacion);

                        if(pos >= 0){
                        this.userForm[type.id_tipo_observacion][pos].descripcion = type.observacion 
                        }
                    });                      
              
                    
                })).catch(errors => {
            })

        },
        /*** Metodos del  Paso 2** */
        get_tribunales_competencia(){

           //  this.setModal(true) // Aqui Manipulamos el modal  
            const axios = require('axios')     // Query para OBTENER     
            const request2 = url + '/suprema/get_tribunales'
            this.Query_Corte_Competencia=[]; 
             const get = async request2 => {
                    try {
                        const response = await axios.get(request2, {
                            params: 
                            {
                                cod_corte:  this.user.cod_corte
                            }
                        })
                        const data1 = response.data
                        let increment = 1
                        let objtribunal;
                        Object.values(data1.recordset).map((type) => {

                            objtribunal = new Object();// creamos el objeto para asignarle cada elemento del result de consulta
                            objtribunal.cod_tribunal = type.cod_tribunal
                            objtribunal.gls_tribunal = type.gls_tribunal
                            objtribunal.GARANTIA = type.GARANTIA
                            objtribunal.COBRANZA = type.COBRANZA
                            objtribunal.LABORAL = type.LABORAL
                            objtribunal.FAMILIA = type.FAMILIA
                            objtribunal.CIVIL = type.CIVIL
                            objtribunal.COD_CORTE = this.user.cod_corte // obtengo el codigo de la corte
                            objtribunal.ANO = new Date().getFullYear() // Obtengo el año actual
                            objtribunal.MES = new Date().getMonth() +1 // Obtengo el mes actual
                            objtribunal.increment = increment
                            this.Query_Corte_Competencia.push(objtribunal)   
                            increment ++
                            
                       
                       }) 

                     //  console.log(this.Query_Corte_Competencia);
                      
                     //   this.setModal(false) // Aqui Manipulamos el modal   
                    }catch(errors) {
                      //   this.setModal(false)
                        console.log(errors);
                    } 
                }
           
            get(request2) 



        },
        verIndicadore(item)
        {
           // console.log(item);
        }

    }

}
</script>
