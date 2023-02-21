<template>
    <b-container fluid>
        <v-row md="12" class="mt-0">
            <v-col md="5" class="px-4">
                <v-row md="12">
                    <v-col>
                        <v-row>
                            <v-col md="3" class="text-center">
                                <h6 class="primary--text mt-2">
                                    Audiencias <br /> 
                                   Realizadas
                                </h6>
                            </v-col>
                            <v-col  md="3" class="text-center">
                                <v-tooltip bottom color="#1D1B1B">
                                    <template v-slot:activator="{ on, attrs }">
                                        <h6 class="body-1 mt-0 py-0" 
                                            v-bind="attrs"
                                            v-on="on"
                                        >Total
                                        </h6>
                                    </template>
                                    <span>Total Tribunales</span>
                                </v-tooltip>
                                <h6 class="mt-0"></h6>
                                <h4>
                                    <countTo class="count primary--text" :startVal="0" :endVal="cantrealizadastri" separator="." :duration="1000"></countTo>
                                </h4>
                            </v-col>
                            <v-col md="3" class="text-center">
                                <v-tooltip bottom color="#1D1B1B">
                                    <template v-slot:activator="{ on, attrs }">
                                        <h6 class="body-1 mt-0 py-0 " 
                                            v-bind="attrs"
                                            v-on="on"
                                        >Prom.Cor
                                        </h6>
                                    </template>
                                    <span>Promedio de la Corte</span>
                                </v-tooltip>
                                <h4>
                                    <countTo class="count primary--text" :startVal="0" :endVal="cantrealizadascor" separator="." :duration="1000"></countTo>
                                </h4>
                            </v-col>
                            <v-col  md="3" class="text-center">
                               <v-tooltip bottom color="#1D1B1B">
                                    <template v-slot:activator="{ on, attrs }">
                                        <h6 class="body-1 mt-0 py-0 " 
                                            v-bind="attrs"
                                            v-on="on"
                                        >Prom Nal
                                        </h6>
                                    </template>
                                    <span>Promedio Nacional</span>
                                </v-tooltip>
                                <h4>
                                    <countTo class="count primary--text" :startVal="0" :endVal="cantrealizadasnal" separator="." :duration="1000"></countTo>
                                </h4>
                            </v-col>                                                                                     
                        </v-row>
                        <hr/>
                        <v-row >
                            <v-col md="3" class="text-center">
                                <h6 class="primary--text mt-2">
                                    Audiencias <br /> No 
                                    Realizadas
                                   
                                </h6>
                            </v-col>
                            <v-col  md="3" class="text-center">
                                <h4 class="mt-6">
                                    <countTo class="count primary--text" :startVal="0" :endVal="cantNOrealizadastri" separator="." :duration="1000"></countTo>
                                </h4>
                            </v-col>
                            <v-col  md="3" class="text-center">
                                <h4 class="mt-6">
                                    <countTo class="count primary--text" :startVal="0" :endVal="cantNOrealizadascor" separator="." :duration="1000"></countTo>
                                </h4>
                            </v-col>
                            <v-col  md="3" class="text-center">
                                <h4 class="mt-6">
                                    <countTo class="count primary--text" :startVal="0" :endVal="cantNOrealizadasnal" separator="." :duration="1000"></countTo>
                                </h4>
                            </v-col>                                                          
                        </v-row>                        
                    </v-col>
                </v-row>
            </v-col>
            <v-col md="3" class="px-3">
                <v-card
                    min-height="305"
                    max-height="305"                
                >
                    <v-card-title primary-title class="primary white--text">
                        <h6>Comparativa</h6>           
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col md="3" offset-md="3" class="text-center">
                                <div class="text-md-body-6">
                                <v-tooltip bottom color="#1D1B1B">
                                        <template v-slot:activator="{ on, attrs }">
                                            <h6 class="body-2 mt-0 px-1 py-0" 
                                                v-bind="attrs"
                                                v-on="on"
                                            >T
                                            </h6>
                                        </template>
                                        <span>Tribunal</span>
                                </v-tooltip>
                                </div>
                            </v-col> 
                            <v-col md="3" class="text-center">
                                <div class="text-md-body-6">
                                    <v-tooltip bottom color="#1D1B1B">
                                        <template v-slot:activator="{ on, attrs }">
                                            <h6 class="body-0 mt--1 py-0" 
                                                v-bind="attrs"
                                                v-on="on"
                                            >Prom C
                                            </h6>
                                        </template>
                                        <span>Promedio Corte</span>
                                    </v-tooltip>
                                </div>
                            </v-col>
                            <v-col md="3" class="text-center">
                                <div class="text-md-body-6">
                                    <v-tooltip bottom color="#1D1B1B">
                                        <template v-slot:activator="{ on, attrs }">
                                            <h6 class="body-0 mt--1 py-0" 
                                                v-bind="attrs"
                                                v-on="on"
                                            >Prom N
                                            </h6>
                                        </template>
                                        <span>Promedio Nacional</span>
                                    </v-tooltip>
                                </div>
                            </v-col>                                                                                                                    
                        </v-row>                        
                        <v-row dense v-for="(indicadores, index) in tribPenal" v-bind:key="index">
                            <v-col md="3" class="text-left">
                                 <v-tooltip bottom color="#1D1B1B">
                                    <template v-slot:activator="{ on, attrs }">
                                        <h6 class="body-1 mt-0 py-0" 
                                            v-bind="attrs"
                                            v-on="on"
                                        >{{indicadores.indicadores}}
                                        </h6>
                                    </template>
                                    <span v-if="indicadores.indicadores === 'Ing'">Ingresos</span>
                                    <span v-if="indicadores.indicadores === 'Res'">Resoluciones</span>
                                    <span v-if="indicadores.indicadores === 'Sen'">Sentencias</span>
                                    <span v-if="indicadores.indicadores === 'Ter'">Términos</span>
                                </v-tooltip>
                                <!--<h6 class="mt-0">{{indicadores.indicadores[0][0]}}</h6>-->
                            </v-col> 
                            <v-col md="3" class="text-center">
                                <div class="text-md-body-6">
                                    <countTo class="count primary--text" :startVal="0" :endVal="indicadores.Cantidad_Tri" separator="." :duration="1000"></countTo>
                                </div>
                            </v-col> 
                            <v-col md="3" class="text-center">
                                <div class="text-md-body-6">
                                    <countTo class="count primary--text" :startVal="0" :endVal="indicadores.Cantidad_Cor" separator="." :duration="1000"></countTo>
                                </div>
                            </v-col>
                            <v-col md="3" class="text-center">
                                <div class="text-md-body-6">
                                    <countTo class="count primary--text" :startVal="0" :endVal="indicadores.Cantidad_Nac" separator="." :duration="1000"></countTo>
                                </div>
                            </v-col>                                                                                                                    
                        </v-row>
                    </v-card-text>                
                </v-card>                
            </v-col>            
            <v-col md="4" class="px-1">
                <v-card 
                    min-height="305"
                    max-height="305"
                >
                    <v-card-title primary-title class="primary white--text py-1">
                        <h6>Audiencias por Estados</h6>
                        
                        <ModalTribunalEstadoAudiencia :fechastrib="this.fechas()"/>       
                    </v-card-title>     
                    <v-card-text>                
                        <highcharts  class="ml-0 px-0 py-2" :options="chartOptions" :constructor-type="'chart'" />
                    </v-card-text> 
                </v-card>
            </v-col>
        </v-row>
        <!--<ModalLoading />-->
    </b-container>    
</template>
<script>
import { url } from '../../config/api'
import { quantum } from '../../config/quantum'
import store from 'store'
import ModalLoading from '../../components/elementos/ModalLoading'
import FiltrosCompetencias from '../../components/elementos/FiltrosCompetencias'
import { Graph } from '../../config/Highcharts'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import loadDrillDown from 'highcharts/modules/drilldown'
import stockInit from 'highcharts/modules/stock'
import { mapState, mapMutations } from 'vuex'
import countTo from 'vue-count-to'
import ModalTribunalEstadoAudiencia from '../penal/ModalTribunalesEstadoAudiencia'
export default {
    name: 'PenalAudienciasEstados',
    data(){
        return {
            urlquauntum: quantum + '/penal_controller/totalesCorte/'+ store.get('cod_corte'),
            user: {
                cod_corte: store.get('cod_corte'),
                cod_tribunal: store.get('cod_tribunal'),
                ano: store.get('ano'),
                mes: store.get('mes'),
                rango: store.get('rango'),
                exhorto: store.get('exhorto'),
                tipo: store.get('tipo')
            },
            chartOptions: JSON.parse(JSON.stringify(Graph['pie'][0])),            
            head: [ { value: '#', index: 0}, 
                    { value: 'Estado', index: 1}, 
                    { value: 'Cantidad', index: 2}
            ],
            tbody: [],
            height: '30vh',
            cantrealizadas: 0,
            cantnorealizadas: 0,
            tribPenal : [],
            tribAud :[],
            cantrealizadastri : 0,
            cantrealizadascor : 0,
            cantrealizadasnal : 0,
            cantNOrealizadastri : 0,
            cantNOrealizadascor :0,
            cantNOrealizadasnal : 0

        }
    },
    beforeCreate(){
        if(this.$route.params.ano){
            store.set('ano',this.$route.params.ano)
            store.set('mes',this.$route.params.mes)
            store.set('tipo',Number(this.$route.params.tipo))
        }
    },
    created(){
        this.sentRequest()
    },
    props: ['fechasConsulta'],    
    watch:{
        fechasConsulta: function(){
             this.sentRequest()
        }
    },    
    methods:{
        ...mapState(['fechas']), // Valores Guardados
        ...mapMutations(['setModal']),
        submit(){
            this.sentRequest()
        },
        sentRequest(){
         //   this.setModal(true) // Aqui Manipulamos el modal
            const axios = require('axios')
            var req1 = ''
            var req2 = ''
            let params = {}
            if(this.$route.params.ano){
                var req1 = url + ((Number(this.$route.params.tipo) == 13) ? '/penal/audienciasEstadosGarantias': '/penal/audienciasEstadosOrales')
                var req2 = url + '/penal/promedioTribunales'
                var req3 = url + '/penal/promedioAudienciaPenal'
               params = {
                                cod_corte: this.user.cod_corte,
                                cod_tribunal: this.user.cod_tribunal,
                                anoInicio: this.fechas().anoInicio || this.$route.params.ano,
                                mesInicio: this.fechas().mesInicio || this.$route.params.mes,
                                anoFin: this.fechas().anoFin || this.$route.params.ano,
                                mesFin: this.fechas().mesFin || this.$route.params.mes,
                                exhorto: this.fechas().exhorto || this.$route.params.exhorto,
                                tipo: Number(this.$route.params.tipo)
                }
                
            }else{
                var req1 = url + ((Number(this.user.tipo)) == 13 ? '/penal/audienciasEstadosGarantias': '/penal/audienciasEstadosOrales')    
                var req2 = url + '/penal/promedioTribunales'
                var req3 = url + '/penal/promedioAudienciaPenal'
                params = {
                                cod_corte: this.user.cod_corte,
                                cod_tribunal: this.user.cod_tribunal,
                                anoInicio: this.fechas().anoInicio || this.user.ano,
                                mesInicio: this.fechas().mesInicio || this.user.mes,
                                anoFin: this.fechas().anoFin || this.user.ano,
                                mesFin: this.fechas().mesFin || this.user.mes,
                                exhorto: this.fechas().exhorto || this.user.exhorto,
                                tipo: Number(this.user.tipo)
                }
            } 
                       
            axios.all([
                    axios.get(req1, {
                        params
                    }),
                    axios.get(req2, {
                        params
                    }),
                    axios.get(req3, {
                        params
                    })                                     
                ]).then(axios.spread((...responses) => { 
                       
                    const data1 = responses[0].data
                    const data2 = responses[1].data
                    const data3 = responses[2].data
                    const audiencias = []
                    const norealizadas = []
                    const realizadas = []

                    let aux = 1                   
                    
                    if(this.fechas().TipoBusqueda != "Mensual"){
                        this.chartOptions = JSON.parse(JSON.stringify(Graph['lines'][0]))
                        this.chartOptions.xAxis.categories = this.fechas().calendario
                        this.chartOptions.chart.height = 230
                        this.chartOptions.chart.width  = 400
                        this.chartOptions.series = [] // Limpiamos las Series
                    }else{
                        this.chartOptions = JSON.parse(JSON.stringify(Graph['pie'][0]))
                        this.chartOptions.chart.height = 230
                        this.chartOptions.chart.width  = 400
                        this.chartOptions.series = [] // Limpiamos las Series
                        this.chartOptions.plotOptions.pie.dataLabels.format =  '<b>{point.name}</b>: {point.y:.0f} ({point.percentage:.1f} %)'                           
                    }
                        
                    this.chartOptions.title.text =  '' // Titulo del grafico de lineas
                    this.chartOptions.title.align = 'left' // Centramos el titulo de Grafico
                    this.tbody = []
                    this.cantrealizadas = 0
                    this.cantnorealizadas = 0 
                    this.tribPenal=[]
                    this.tribAud = [] 
                    let objPromtrib 
                    let objPromaud 


                    Object.values(data1.recordset).map((type) => {
                        audiencias.push({ name: type.gls_estado_audiencia, y: type.cantidad })                 
                    }) 
                   
                   
                    Object.values(data2.recordset).map((type) => {
                         objPromtrib = new Object();
                         objPromtrib.indicadores = type.indicadores
                         objPromtrib.Cantidad_Tri = type.Cantidad_Tri
                         objPromtrib.Cantidad_Cor = type.Cantidad_Cor
                         objPromtrib.Cantidad_Nac = type.Cantidad_Nac

                        this.tribPenal.push(objPromtrib)                 
                    })
                    Object.values(data3.recordset).map((type) => {
                        objPromaud = new Object();
                        objPromaud.indicadores = type.gls_estado
                        if(type.gls_estado === 'Realizadas'){
                        objPromaud.cantidad_tri = type.cantidad_tri
                        objPromaud.cantidad_cor = type.cantidad_cor
                        objPromaud.cantidad_nal = type.cantidad_nal
                        this.cantrealizadastri = type.cantidad_tri
                        this.cantrealizadascor = type.cantidad_cor
                        this.cantrealizadasnal = type.cantidad_nal
                        }else{

                        objPromaud.cantidad_tri = type.cantidad_tri
                        objPromaud.cantidad_cor = type.cantidad_cor
                        objPromaud.cantidad_nal = type.cantidad_nal
                        this.cantNOrealizadastri = type.cantidad_tri
                        this.cantNOrealizadascor = type.cantidad_cor
                        this.cantNOrealizadasnal = type.cantidad_nal

                        }

                        this.tribAud.push(objPromaud)                 
                    })
                  //  console.log(this.tribAud);
      
                    audiencias.map((type) => {
                        if(type.name == 'No Realizadas'){
                            norealizadas.push({ name: type.name, y: type.y,  color: '#2979ff'})
                            this.cantnorealizadas += type.y
                        }else{
                            realizadas.push({ name: type.name, y: type.y,  color: '#2A3F54'})
                            this.cantrealizadas += type.y
                        }            
                    })                    

                    this.tbody.push({ correlativo: 1,
                                        path: 'PenalAudienciasDetallesNoRealizadas',
                                        gls_estado_audiencia: 'No Realizadas', 
                                        cantidad: this.$thousandSeparator(this.cantnorealizadas)
                                    },
                                    { correlativo: 2,
                                        path: 'PenalAudienciasDetallesRealizadas',
                                        gls_estado_audiencia: 'Realizadas', 
                                        cantidad: this.$thousandSeparator(this.cantrealizadas)
                                    })   


                    if(this.fechas().TipoBusqueda != "Mensual"){
                        this.chartOptions.series.push({
                            data: norealizadas,
                            name: 'No Realizadas'
                        },{
                            data: realizadas,
                            name: 'Realizadas'
                        })

                    }else{
                        this.chartOptions.series.push({
                            data: audiencias
                        })
                    }                    
                    
            //     this.setModal(false) // Aqui Manipulamos el modal     
                                         

                })).catch(errors => {
                  //  this.setModal(false) // Aqui Manipulamos el modal
            }) 
            
            
   
        }
    },
    components:{
        ModalLoading,
        FiltrosCompetencias,
        highcharts: Chart,
        countTo,
        ModalTribunalEstadoAudiencia
    }                
}
</script>