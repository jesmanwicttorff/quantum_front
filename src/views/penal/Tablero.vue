<template>
    <b-container fluid class>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="primary white--text">
                        Filtros
                        <v-spacer></v-spacer>
                        <v-btn   small outlined color="white" @click="downloadPDF()" class="ml-16">PDF</v-btn>
                        <v-btn  class="ml-16" small color="success" :href="this.urlquauntum"  style="text-decoration:none">Volver</v-btn>
                    </v-card-title>
                    <v-card-text>
                        <FiltrosCompetencias v-on:buscar="submit" class="mt-4" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-card>
            <v-card-title class="primary">
                <!-- <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="headline white--text"></v-list-item-title>
                        <v-list-item-subtitle class="font-italic white--text">Periodo de Análisis: </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item> -->
            </v-card-title>
            <v-card-text class="pdf">
                <v-row md="12" class="mt-3" dense>
                    <v-col md="5">
                        <highcharts :options="chartOptions" :constructor-type="'chart'" />
                    </v-col>
                    <v-col md="2" class="ml-0">
                        <v-row justify="center">
                            <v-hover>
                                <v-card hover height="100" width="100%" color="primary" class="cardAction" @click="modalIngreso = true">
                                    <v-card-text class="white--text text-center">
                                        <h6>Total Ingresos</h6>
                                        <h4><countTo class="count" :startVal="startVal" :endVal="endVal[0]" separator="." :duration="3000"></countTo></h4>
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-row>
                        <v-row class="py-2" justify="center">
                            <v-hover>
                                <v-card hover height="100" width="100%" color="primary" class="cardAction" @click="modalEscrito = true">
                                    <v-card-text class="white--text text-center">
                                        <h6>Total Escritos</h6>
                                        <h4><countTo class="count" :startVal="startVal" :endVal="endVal[1]" separator="." :duration="3000"></countTo></h4>
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-row>
                        <v-row class="py-2" justify="center">
                            <v-hover>
                                <v-card hover height="100" width="100%" color="primary" class="cardAction" @click="modalTerminos = true">
                                    <v-card-text class="white--text text-center">
                                        <h6>Total Términos</h6>
                                        <h4><countTo class="count" :startVal="startVal" :endVal="endVal[3]" separator="." :duration="3000"></countTo></h4>
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-row>
                    </v-col>
                    <v-col md="4" offset-md="1">
                        <!--INI-Sentencias-->
                        <v-row>   
                            <v-col md="12">
                                <v-card class="mx-auto"
                                    min-height="180"
                                    max-height="180" 
                                >
                                    <v-card-title primary-title class="primary white--text">
                                        <h6>Causas con Sentencia:<countTo class="count" :startVal="startVal" :endVal="endVal[2]" separator="." :duration="3000"></countTo></h6>
                                        <v-spacer></v-spacer>
                                        <v-btn small outlined color="white" @click="sentenciasDetalles()">Detalle</v-btn>                  
                                    </v-card-title>
                                    <v-card-text>
                                        <v-row dense>
                                            <v-col md="3" offset-md="9" class="text-right primary--text"><b>Cantidad</b></v-col>
                                        </v-row>                                        
                                        <v-row v-for="(sentencia, index) in sentencias" v-bind:key="index" dense>
                                            <v-col md="5" class="text-left primary--text"><b>{{sentencia.name}}</b></v-col>
                                            <v-col md="2" offset-md="5" class="text-center primary--text"><b><countTo class="count" :startVal="startVal" :endVal="sentencia.value" separator="." :duration="3000"></countTo></b></v-col>
                                        </v-row>
                                        <!-- <v-row dense>
                                            <v-col md="4" class="text-left primary--text"><b>Condenatorias</b></v-col>
                                            <v-col md="3" offset-md="5" class="text-center primary--text"><b>75</b></v-col>
                                        </v-row>                                     -->
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>   
                            <v-col md="12">
                                <v-card class="mx-auto mt-0"
                                    min-height="130"                                   
                                >
                                    <v-card-title primary-title class="primary white--text">
                                        <h6>Escritos por Plazos</h6>
                                        <v-spacer></v-spacer>
                                        <!-- <v-btn small outlined color="white">Detalle</v-btn>                   -->
                                    </v-card-title>
                                    <ModalEscritos :fechasConsulta="this.fechas()" />
                                </v-card> 
                            </v-col>
                        </v-row>                        
                    </v-col>
                </v-row>
                <v-row md="12" class="mt-0" dense>
                    <ModalAudienciasEstados :fechasConsulta="this.fechas()" />
                </v-row>       
            </v-card-text>        
        </v-card>
        <v-dialog v-model="modalDetalle">
            <v-row dense>
                <v-col md="12">
                    <v-card>
                        <v-card-title class="primary white--text">
                            {{modalText}}
                            <v-spacer></v-spacer>
                            <vue-excel-xlsx   class="mt-0 mr-8 btn primary white--text text-center" :data="bodyExcelDetalles" :columns="headExcelDetalles" :filename="'IngresosDetalles'" :sheetname="'Hoja1'">
                              <b-icon-cloud-download >     
                              </b-icon-cloud-download>
                            </vue-excel-xlsx>                              
                            <v-btn color="error"  @click="modalDetalle = false" >
                                x
                            </v-btn>                          
                        </v-card-title>
                        <v-card-text>
                            <v-data-table  :headers="tableHeader" :items="tableBody" :page.sync="page" :items-per-page="itemsPerPage" dense hide-default-footer @page-count="pageCount = $event" class="mt-2"> </v-data-table>
                            <v-row justify="center">
                                <v-col cols="6">
                                    <v-pagination v-model="page" :length="pageCount"></v-pagination>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-dialog> 
        <v-dialog v-model="modalIngreso">
            <v-card>
                <v-card-title class="primary white--text">
                    <v-spacer></v-spacer>                            
                    <v-btn color="error"  @click="modalIngreso = false" >
                        x
                    </v-btn>                          
                </v-card-title>
                <v-card-text>            
                    <ModalIngresosDetalles :fechasConsulta="this.fechas()"/>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="modalEscrito">
            <v-card>
                <v-card-title class="primary white--text">
                    <v-spacer></v-spacer>                            
                    <v-btn color="error"  @click="modalEscrito = false" >
                        x
                    </v-btn>                          
                </v-card-title>
                <v-card-text>            
                    <ModalEscritosDetalles :fechasConsulta="this.fechas()"/>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="modalTerminos">
            <v-card>
                <v-card-title class="primary white--text">
                    <v-spacer></v-spacer>                            
                    <v-btn color="error"  @click="modalTerminos = false" >
                        x
                    </v-btn>                          
                </v-card-title>
                <v-card-text>            
                    <ModalTerminos :fechasConsulta="this.fechas()"/>
                </v-card-text>
            </v-card>
        </v-dialog>                              
        <ModalLoading />
    </b-container>
</template>
<script>
import store from 'store'
import { url } from '../../config/api'
import { quantum } from '../../config/quantum'
import { Graph } from '../../config/Highcharts'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import loadDrillDown from 'highcharts/modules/drilldown'
import stockInit from 'highcharts/modules/stock'
import { mapState, mapMutations } from 'vuex'
import countTo from 'vue-count-to'
import FiltrosCompetencias from '../../components/elementos/FiltrosCompetencias'
import ModalLoading from '../../components/elementos/ModalLoading'
import ModalAudienciasEstados from '../penal/ModalAudienciasEstados'
import ModalEscritos from '../penal/ModalEscritos'
import ModalIngresosDetalles from '../penal/ModalIngresosDetalles'
import ModalEscritosDetalles from '../penal/ModalEscritosDetalles'
import ModalTerminos from '../penal/ModalTerminos'
import html2canvas from 'html2canvas'
import jsPDF  from "jspdf"

loadDrillDown(HighCharts)
stockInit(HighCharts)
exporting(HighCharts)

export default {
    name: 'TableroPenal',
    data(){
        return {
            urlquauntum: quantum + '/penal_controller/totalesCorte/'+ store.get('cod_corte'),
            modalDetalle: false,
            modalText: '',
            modalIngreso: false,
            modalEscrito: false,
            modalTerminos: false,
            user: {
                usuario_id: store.get('user_usuario_id'), // Los parametros que obtenemos de la url
                cod_corte: store.get('cod_corte'),
                cod_tribunal: store.get('cod_tribunal'),
                ano: store.get('ano'),
                mes: store.get('mes'),
                rango: store.get('rango'),
                exhorto: store.get('exhorto'),
                tipo: this.$route.params.tipo
            },          
            urlquauntum: quantum + '/penal_controller/totalesCorte/'+ store.get('cod_corte'),
            startVal: 0,
            endVal: [0, 0, 0, 0],               
            chartOptions: JSON.parse(JSON.stringify(Graph['pie'][0])),
            sentencias: [],
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,
            tableHeader: [],
            tableBody: [],
            headExcelDetalles: [],
            bodyExcelDetalles: []
        }
    }, 
    beforeCreate(){
      store.set('ruta',1)
    },
    created(){
        this.requestData()
    },
    methods:{
        ...mapMutations(['setModal']), // Mutations no Borrar
        ...mapState(['fechas']), // Valores Guardados
        submit(){
            this.requestData()
        },
        downloadPDF(){
        window.scrollTo(0,0) // Desplaza hacia arriba
        html2canvas(document.querySelector('.pdf')).then(canvas => {
          let image = canvas.toDataURL('image/png')
          let doc = new jsPDF('l');
          let options = {
              align: 'justify'
            }       
         // doc.text(120, 10, this.$attrs.gls_tribunal,options);
          doc.line(10, 15,290,15);        
          doc.addImage(image, 'png', 10, 20, 280, 200)
          doc.save('Dashboard.pdf')
        })       
    },                
        requestData: function () {
            this.setModal(true) // Aqui Manipulamos el modal
            const axios = require('axios')
            const req1 = url + '/penal/indicadores'
            const req2 = url + ((Number(this.$route.params.tipo) == 13) ?'/penal/sentenciasResultados' : '/penal/sentenciasResultadosOrales')
            this.endVal = [0,0,0,0]

            let params = {
                cod_corte: this.user.cod_corte,
                cod_tribunal: this.user.cod_tribunal,
                anoInicio: this.fechas().anoInicio || this.$route.params.ano,
                mesInicio: this.fechas().mesInicio || this.$route.params.mes,
                anoFin: this.fechas().anoFin || this.$route.params.ano,
                mesFin: this.fechas().mesFin || this.$route.params.mes,
                exhorto: this.fechas().exhorto || this.$route.params.exhorto
            }
               // console.log(params);
               // console.log('aqui');
            axios.all([
                    axios.get(req1, {
                        params
                    }),
                    axios.get(req2, {
                        params
                    })                    
                ]).then(axios.spread((...responses) => {

                    const data1 = responses[0].data
                    const data2 = responses[1].data
                    const ingresos = []
                    const exhorto = []
                    const ingresoexhorto = []
                    

                    if(this.fechas().TipoBusqueda != "Mensual"){
                        this.chartOptions = JSON.parse(JSON.stringify(Graph['lines'][0]))
                        this.chartOptions.xAxis.categories = this.fechas().calendario
                        this.chartOptions.chart.height = 350
                        this.chartOptions.series = [] // Limpiamos las Series
                    }else{
                        this.chartOptions = JSON.parse(JSON.stringify(Graph['pie'][0]))
                        this.chartOptions.chart.height = 300
                        this.chartOptions.series = [] // Limpiamos las Series
                        this.chartOptions.plotOptions.pie.dataLabels.format =  '<b>{point.name}</b>: {point.y:.0f} ({point.percentage:.1f} %)'                           
                    }

                    this.chartOptions.title.text =  'Comparativa Ingresos Vs Exhortos' // Titulo del grafico de lineas
                    this.chartOptions.title.align = 'left' // Centramos el titulo de Grafico


                    // this.chartOptions.xAxis.categories = this.fechas().calendario
                    
                    Object.values(data1.recordset).map((type) => {
                        ingresos.push({ name: 'Ingresos', y: type.ingresos,  color: '#2979ff'})
                        exhorto.push({ name: 'Exhortos', y: type.ingresos_exhorto,  color: '#2A3F54'})
                        ingresoexhorto.push(
                            { name: 'Ingresos', y: type.ingresos,  color: '#2979ff'},
                            { name: 'Exhortos', y: type.ingresos_exhorto,  color: '#2A3F54'}
                        )
                        this.endVal[0] += type.ingresos
                        this.endVal[1] += type.escritos
                        this.endVal[2] += type.sentencias
                        this.endVal[3] += type.terminos                         
                    })
                    this.sentencias = []
                    this.setModal(false) // Aqui Manipulamos el modal       

                    Object.values(data2.recordset).map((type) => {
                        this.sentencias.push({ name: type.gls_tipresultado, value: type.cantidad })                       
                    })                    

                    if(this.fechas().TipoBusqueda != "Mensual"){

                        this.chartOptions.series.push({
                            data: ingresos,
                            name: 'Ingresos'
                        },{
                            data: exhorto,
                            name: 'Exhortos'
                        })

                    }else{
                        this.chartOptions.series.push({
                            data: ingresoexhorto
                        })
                    }
               
                    // this.setModal(false) // Aqui Manipulamos el modal       

                })).catch(errors => {
              //  this.setModal(false) // Aqui Manipulamos el modal
            })
          //  this.setModal(false)
        },
        sentenciasDetalles(){
            
            this.modalDetalle = true
            this.setModal(true) // Aqui Manipulamos el modal

            const axios = require('axios')
            const req1 = url + ((Number(this.$route.params.tipo) == 13) ? '/penal/sentenciasResultadosDetalles' : '/penal/sentenciasResultadosDetallesOrales')

            let params = {
                cod_corte: this.user.cod_corte,
                cod_tribunal: this.user.cod_tribunal,
                anoInicio: this.fechas().anoInicio || this.$route.params.ano,
                mesInicio: this.fechas().mesInicio || this.$route.params.mes,
                anoFin: this.fechas().anoFin || this.$route.params.ano,
                mesFin: this.fechas().mesFin || this.$route.params.mes,
                exhorto: this.fechas().exhorto || this.$route.params.exhorto
            }
             console.log(this.$route.params.tipo);
            axios.all([
                    axios.get(req1, {
                        params
                    })                  
                ]).then(axios.spread((...responses) => {
                    const data1 = responses[0].data
                    const header = Object.keys(data1.recordset[0])
                    this.modalText  = 'Detalle de Sentencias'
                    this.tableHeader  = []
                    this.headExcelDetalles  = []
                    header.map((type) => {
                       this.tableHeader.push(
                           { text: type,  align: 'center', value: type, class : 'primary white--text'},
                       )
                       this.headExcelDetalles.push(
                           { label: type,  field: type },
                       )                       
                    })            

                    this.tableBody = data1.recordset
                    this.bodyExcelDetalles = data1.recordset
                   

                   this.setModal(false) // Aqui Manipulamos el modal       
                })).catch(errors => {
                this.setModal(false) // Aqui Manipulamos el modal
            })
                        
        }
    },
    components: {
        FiltrosCompetencias,
        highcharts: Chart,
        countTo,
        ModalLoading,
        ModalAudienciasEstados,
        ModalEscritos,
        ModalIngresosDetalles,
        ModalEscritosDetalles,
        ModalTerminos
    }
}
</script>