<template>
    <b-container fluid class="px-4">
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="primary white--text">
                        Filtros
                        <v-spacer></v-spacer>
                        <v-btn v-if="this.ruta==1" color="success" :href="this.urlquauntum" style="text-decoration: none;">Volver</v-btn>
                        <v-btn v-else-if="this.ruta==2" color="success" :href="this.urlquauntum2" style="text-decoration: none;">Volver</v-btn>
                    </v-card-title>
                    <v-card-text>
                        <FiltrosCompetencias v-on:buscar="submit" class="mt-4"/>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row sm="12" class="mt-3" dense>
            <v-col md="12">
                <highcharts :options="chartOptions" :constructor-type="'chart'" />
            </v-col>
            <v-col md="12">
                <v-simple-table dense>
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
                                    <router-link style="text-decoration: none;" :to="{ name: item.path.replace(/\s/g, ''), params: { ano: item.ano, mes: 1, exhorto: user.exhorto, tipo: user.tipo , ruta:2 } }"> {{item.cantidad}}  </router-link> 
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
            </v-col>            
        </v-row>
        <ModalLoading />
    </b-container>    
</template>
<script>
import { url } from '../../config/api'
import { url2 } from '../../config/api'
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
export default {
    name: 'PenalAudienciasEstados',
    data(){
        return {
            urlquauntum: url2 + '/indicadoresPenal/Tablero/'+ store.get('token') + '/' + store.get('cod_corte') + '/' + store.get('cod_tribunal') + '/' + store.get('ano') + '/' + store.get('mes') + '/' + 0 + '/' + store.get('exhorto') + '/' + store.get('tipo') ,
            urlquauntum2: url2 + '/indicadoresPenal/Audiencias/' + store.get('token') + '/' + store.get('cod_corte') + '/' + store.get('cod_tribunal') + '/' + store.get('ano') + '/' + store.get('mes') + '/' + 0 + '/' + store.get('exhorto') + '/' + store.get('tipo'),
             ruta: store.get('ruta'),
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
            tbody: []                        
        }
    },
    beforeCreate(){
        if(this.$route.params.ano){
            store.set('ano',this.$route.params.ano)
            store.set('mes',this.$route.params.mes)
            store.set('tipo',Number(this.$route.params.tipo))
            store.set('ruta',2) // le asigno ruta en el localstore
        }
    },
    created(){
        this.sentRequest()
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
                    })                                      
                ]).then(axios.spread((...responses) => { 
                       
                    const data1 = responses[0].data
                    const audiencias = []
                    const norealizadas = []
                    const realizadas = []
                    var cantrealizadas = 0
                    var cantnorealizadas = 0

                    let aux = 1                   
                    
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


                    this.chartOptions.title.text =  'Audiencias por Estados' // Titulo del grafico de lineas
                    this.chartOptions.title.align = 'left' // Centramos el titulo de Grafico
                    this.tbody = []                    

                    Object.values(data1.recordset).map((type) => {
                        audiencias.push({ name: type.gls_estado_audiencia, y: type.cantidad })                 
                    })                     

                    audiencias.map((type) => {
                        if(type.name == 'No Realizadas'){
                            norealizadas.push({ name: type.name, y: type.y,  color: '#2979ff'})
                            cantnorealizadas += type.y
                        }else{
                            realizadas.push({ name: type.name, y: type.y,  color: '#2A3F54'})
                            cantrealizadas += type.y
                        }            
                    })                    

                    this.tbody.push({ correlativo: 1,
                                        path: 'PenalAudienciasDetallesNoRealizadas',
                                        gls_estado_audiencia: 'No Realizadas', 
                                        cantidad: this.$thousandSeparator(cantnorealizadas)
                                    },
                                    { correlativo: 2,
                                        path: 'PenalAudienciasDetallesRealizadas',
                                        gls_estado_audiencia: 'Realizadas', 
                                        cantidad: this.$thousandSeparator(cantrealizadas)
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
        highcharts: Chart
    }                
}
</script>