<template>
    <b-container fluid>
        <v-row md="12" class="mt-0">
            <v-col md="6">
                <v-row dense>
                    <v-col>
                        <v-row dense>
                            <v-col md="4" class="text-center">
                                <h5 class="primary--text mt-3">
                                    Audiencias <br />
                                    Realizadas
                                </h5>
                            </v-col>
                            <v-col md="1" class="text-center">
                                <h6 class="mt-0">Total<br/></h6>
                                <h4>
                                    <countTo class="count primary--text" :startVal="0" :endVal="cantrealizadas" separator="." :duration="1000"></countTo>
                                </h4>
                            </v-col>                            
                        </v-row>
                        <v-row dense>
                            <v-col md="4" class="text-center">
                                <h5 class="primary--text mt-3">
                                    Audiencias <br /> No
                                    Realizadas
                                </h5>
                            </v-col>
                            <v-col md="1" class="text-center">
                                <h4 class="mt-6">
                                    <countTo class="count primary--text" :startVal="0" :endVal="cantnorealizadas" separator="." :duration="1000"></countTo>
                                </h4>
                            </v-col>                             
                        </v-row>                        
                    </v-col>
                </v-row>
            </v-col>
            <!-- <v-col md="3">
                <v-simple-table>
                    <template>
                        <thead>
                            <tr>
                                <th v-for="item in head" :key="item.index" class="primary white--text text-center">{{ item.value }}</th>  
                            </tr>                
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in tbody"  :key="index">                                   
                                <td class="primary--text text-center">{{ item.correlativo }}</td>
                                <td class="primary--text text-center">{{ item.gls_estado_audiencia }}</td>
                                <td class="text-center">
                                    <router-link style="text-decoration: none;" :to="{ name: item.path.replace(/\s/g, ''), params: { ano: item.ano, mes: 1, exhorto: user.exhorto, tipo: user.tipo } }"> {{item.cantidad}}  </router-link> 
                                </td>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th v-for="item in head" :key="item.index" class="primary white--text text-center">{{ item.value }}</th>  
                            </tr>                             
                        </tfoot>
                    </template>
                </v-simple-table>
            </v-col> -->
            <v-col md="2">
                
            </v-col>
            <v-col md="4">
                <v-card>
                    <v-card-title primary-title class="primary white--text">
                        <h6>Audiencias por Estados</h6>
                        <v-spacer></v-spacer>
                        <v-btn small outlined color="white">Detalle</v-btn>                  
                    </v-card-title>                    
                    <highcharts :options="chartOptions" :constructor-type="'chart'" />
                </v-card>
            </v-col>
        </v-row>
        <ModalLoading />
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
export default {
    name: 'PenalAudienciasEstados',
    props: ['fechasAudiencia'],
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
            cantnorealizadas: 0
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
   // props: ['fechasConsulta'],    
    watch:{
       // fechasAudiencia: function(){
         //    this.sentRequest()
        //}
    //
    },    
    methods:{
        ...mapState(['fechas']), // Valores Guardados
        ...mapMutations(['setModal']),
        submit(){
            this.sentRequest()
        },
        sentRequest(){
           
            this.setModal(true) // Aqui Manipulamos el modal
            const axios = require('axios')
            var req1 = ''
            let params = {}
            if(this.$route.params.ano){
                var req1 = url + ((Number(this.$route.params.tipo) == 13) ? '/penal/audienciasEstadosGarantias': '/penal/audienciasEstadosOrales')
                params = {
                              
                                cod_corte: this.fechasAudiencia.cod_corte,
                                cod_tribunal: this.fechasAudiencia.cod_tribunal,
                                anoInicio: this.fechasAudiencia.ano - 1,
                                mesInicio: this.fechasAudiencia.mes,
                                anoFin: this.fechasAudiencia.ano,
                                mesFin: this.fechasAudiencia.mes,
                                exhorto: this.fechasAudiencia.exhorto,
                                tipo: Number(this.$route.params.tipo)
                }
            }else{
                var req1 = url + ((Number(this.user.tipo)) == 13 ? '/penal/audienciasEstadosGarantias': '/penal/audienciasEstadosOrales')
                params = {
                               // cod_corte: this.user.cod_corte,
                               // cod_tribunal: this.user.cod_tribunal,
                                cod_corte: this.fechasAudiencia.cod_corte,
                                cod_tribunal: this.fechasAudiencia.cod_tribunal,
                                anoInicio: this.fechasAudiencia.ano - 1,
                                mesInicio: this.fechasAudiencia.mes,
                                anoFin: this.fechasAudiencia.ano,
                                mesFin: this.fechasAudiencia.mes,
                                exhorto: this.fechasAudiencia.exhorto,
                                tipo: Number(this.user.tipo)
                }
            }        

            axios.all([
                    axios.get(req1, {
                        params
                    })                                      
                ]).then(axios.spread((...responses) => { 
                       
                    const data1 = responses[0].data
                    const audiencias = []
                    const norealizadas = []
                    const realizadas = []

                    let aux = 1                   
                    
                    if(this.fechas().TipoBusqueda != "Mensual"){
                        this.chartOptions = JSON.parse(JSON.stringify(Graph['lines'][0]))
                        this.chartOptions.xAxis.categories = this.fechas().calendario
                        this.chartOptions.chart.height = 250
                        this.chartOptions.series = [] // Limpiamos las Series
                    }else{
                        this.chartOptions = JSON.parse(JSON.stringify(Graph['pie'][0]))
                        this.chartOptions.chart.height = 200
                        this.chartOptions.series = [] // Limpiamos las Series
                        this.chartOptions.plotOptions.pie.dataLabels.format =  '<b>{point.name}</b>: {point.y:.0f} ({point.percentage:.1f} %)'                           
                    }


                    this.chartOptions.title.text =  '' // Titulo del grafico de lineas
                    this.chartOptions.title.align = 'left' // Centramos el titulo de Grafico
                    this.tbody = []
                    this.cantrealizadas = 0
                    this.cantnorealizadas = 0                    

                    Object.values(data1.recordset).map((type) => {
                        audiencias.push({ name: type.gls_estado_audiencia, y: type.cantidad })                 
                    })                     

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
                    
                    this.setModal(false) // Aqui Manipulamos el modal                     

                })).catch(errors => {
                    this.setModal(false) // Aqui Manipulamos el modal
            })                          
   
        }
    },
    components:{
        ModalLoading,
        FiltrosCompetencias,
        highcharts: Chart,
        countTo
    }                
}
</script>