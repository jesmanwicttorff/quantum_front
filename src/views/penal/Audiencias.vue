<template>
    <b-container fluid class="px-4">
         <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="primary white--text">
                        <v-spacer></v-spacer>
                        <v-btn  color="success"    :href="this.urlquauntum" style="text-decoration:none">Volver</v-btn>                       
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="tile_stats_count px-12">
            <v-col sm="6" class="text-center py-0">
            <span>Total Período: {{anos[0]}}</span>
                <v-col class="count green--text"><countTo class="count h2" :startVal="startVal" :endVal="endVal[0]" separator="." :duration="3000"></countTo></v-col>
            </v-col>
            <v-col sm="6" class="text-center py-0">
            <span>Total Período: {{anos[1]}}</span>
                <v-col class="count green--text"><countTo class="count h2" :startVal="startVal" :endVal="endVal[1]" separator="." :duration="3000"></countTo></v-col>
            </v-col>            
        </v-row>
        <v-row class="py-0">
            <v-col sm="12" class="py-0">
                <highcharts  :options="chartOptions" :constructor-type="'chart'" />
            </v-col>
        </v-row>
        <v-row class="px-8">
            <v-col sm="12" class="py-0">        
                <vue-excel-xlsx class="my-2 btn primary white--text text-center"
                :data="tbody"
                :columns="excelHead"
                :filename="'Audiencias'"
                :sheetname="'Hoja1'"
                >
                    <b-icon-cloud-download>     
                    </b-icon-cloud-download>
                </vue-excel-xlsx>
            </v-col>
        </v-row>                
        <v-row>
            <v-col sm="12" class="px-12">
                <v-simple-table dense>
                    <template>
                        <thead>
                            <tr>
                                <th v-for="item in head" :key="item.index" class="primary white--text text-center">{{ item.value }}</th>  
                            </tr>                
                        </thead>
                        <tbody>
                   
                            <tr v-for="(item, index) in tbody"  :key="index">                                   
                                <td class="primary--text text-center">{{ item.ano }}</td>
                                <td class="text-center">
                                    <router-link style="text-decoration: none;" :to="{ name: 'PenalAudienciasEstados', params: { ano: item.ano, mes: 1, exhorto: user.exhorto, tipo: user.tipo } }"> {{item.enero}}  </router-link> 
                                </td>
                                <td class="text-center">
                                    <router-link style="text-decoration: none;" :to="{ name: 'PenalAudienciasEstados', params: { ano: item.ano, mes: 2, exhorto: user.exhorto, tipo: user.tipo } }"> {{item.febrero}}  </router-link> 
                                </td>
                                <td class="text-center">
                                    <router-link style="text-decoration: none;" :to="{ name: 'PenalAudienciasEstados', params: { ano: item.ano, mes: 3 , exhorto: user.exhorto, tipo: user.tipo } }"> {{item.marzo}}  </router-link> 
                                </td>
                                <td class="text-center">
                                    <router-link style="text-decoration: none;" :to="{ name: 'PenalAudienciasEstados', params: { ano: item.ano, mes: 4 , exhorto: user.exhorto, tipo: user.tipo } }"> {{item.abril}}  </router-link> 
                                </td>
                                <td class="text-center">
                                    <router-link style="text-decoration: none;" :to="{ name: 'PenalAudienciasEstados', params: { ano: item.ano, mes: 5 , exhorto: user.exhorto, tipo: user.tipo } }"> {{item.mayo}}  </router-link> 
                                </td>
                                <td class="text-center">
                                    <router-link style="text-decoration: none;" :to="{ name: 'PenalAudienciasEstados', params: { ano: item.ano, mes: 6 , exhorto: user.exhorto, tipo: user.tipo } }"> {{item.junio}}  </router-link> 
                                </td>
                                <td class="text-center">
                                    <router-link style="text-decoration: none;" :to="{ name: 'PenalAudienciasEstados', params: { ano: item.ano, mes: 7 , exhorto: user.exhorto, tipo: user.tipo } }"> {{item.julio}}  </router-link> 
                                </td>
                                <td class="text-center">
                                    <router-link style="text-decoration: none;" :to="{ name: 'PenalAudienciasEstados', params: { ano: item.ano, mes: 8 , exhorto: user.exhorto, tipo: user.tipo } }"> {{item.agosto}}  </router-link> 
                                </td>
                                <td class="text-center">
                                    <router-link style="text-decoration: none;" :to="{ name: 'PenalAudienciasEstados', params: { ano: item.ano, mes: 9 , exhorto: user.exhorto, tipo: user.tipo } }"> {{item.septiembre}}  </router-link> 
                                </td>
                                <td class="text-center">
                                    <router-link style="text-decoration: none;" :to="{ name: 'PenalAudienciasEstados', params: { ano: item.ano, mes: 10 , exhorto: user.exhorto, tipo: user.tipo } }"> {{item.octubre}}  </router-link> 
                                </td>
                                <td class="text-center">
                                    <router-link style="text-decoration: none;" :to="{ name: 'PenalAudienciasEstados', params: { ano: item.ano, mes: 11 , exhorto: user.exhorto, tipo: user.tipo } }"> {{item.noviembre}}  </router-link> 
                                </td> 
                                <td class="text-center">
                                    <router-link style="text-decoration: none;" :to="{ name: 'PenalAudienciasEstados', params: { ano: item.ano, mes: 12 , exhorto: user.exhorto, tipo: user.tipo } }"> {{item.diciembre}}  </router-link> 
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
        <ModalLoading/>  
    </b-container>
</template>
<script>
import { quantum } from '../../config/quantum'
import ModalLoading from '../../components/elementos/ModalLoading'
import store from 'store'
import { url } from '../../config/api'
import { Graph } from '../../config/Highcharts'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import loadDrillDown from 'highcharts/modules/drilldown'
import stockInit from 'highcharts/modules/stock'
import { mapState, mapMutations } from 'vuex'
import countTo from 'vue-count-to'

loadDrillDown(HighCharts)
stockInit(HighCharts)
exporting(HighCharts)

export default {
    name: 'Audiencias',
    data(){
        return {
            urlquauntum: quantum + '/penal_controller/totalesCorte/'+ store.get('cod_corte'),
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
            anos: [],
            head: [ { value: 'Año', index: 0}, 
                    { value: 'Ene', index: 1}, 
                    { value: 'Feb', index: 2}, 
                    { value: 'Mar', index: 3}, 
                    { value: 'Abr', index: 4}, 
                    { value: 'May', index: 5}, 
                    { value: 'Jun', index: 6}, 
                    { value: 'Jul', index: 7}, 
                    { value: 'Ago', index: 8}, 
                    { value: 'Sep', index: 9}, 
                    { value: 'Oct', index: 10}, 
                    { value: 'Nov', index: 11}, 
                    { value: 'Dic', index: 12}
            ],
            tbody: [],
            chartOptions: JSON.parse(JSON.stringify(Graph['lines'][0])),
            startVal: 0,
            endVal: [],
            excelHead : [
                {
                    label: "Año",
                    field: "ano",
                },
                {
                    label: "Enero",
                    field: "enero",
                },
                {
                    label: "Febrero",
                    field: "febrero",
                },
                {
                    label: "Marzo",
                    field: "marzo",
                },
                {
                    label: "Abril",
                    field: "abril",
                },
                {
                    label: "Mayo",
                    field: "mayo",
                },
                {
                    label: "Junio",
                    field: "junio",
                },
                {
                    label: "Julio",
                    field: "julio",
                },
                {
                    label: "Agosto",
                    field: "agosto",
                },
                {
                    label: "Septiembre",
                    field: "septiembre",
                },
                {
                    label: "Octubre",
                    field: "octubre",
                },
                {
                    label: "Noviembre",
                    field: "noviembre",
                },
                {
                    label: "Diciembre",
                    field: "diciembre",
                }                                                                                                                                                                                                
            ]                  
        }
    },
    created(){      
        this.sentRequest()
    },
    methods:{
        ...mapMutations(['setModal']),
        sentRequest(){
            this.setModal(true) // Aqui Manipulamos el modal
            const axios = require('axios')
            const req1 = url + '/penal/resumenesAudiencias' 
              
            axios.all([
                    axios.get(req1, {
                        params: {
                            cod_corte: this.user.cod_corte,
                            cod_tribunal: this.user.cod_tribunal,
                            ano: this.user.ano,
                            mes: this.user.mes,
                            rango: this.user.rango,
                            exhorto: this.user.exhorto
                        }
                    })

                ]).then(axios.spread((...responses) => {

                    const data1 = responses[0].data
                    this.chartOptions.title.text =  'Audiencias' // Titulo del grafico de lineas
                    
                    this.chartOptions.plotOptions.line.dataLabels.formatter = function () { // Metodo que obtiene el porcentaje
                        var val1 = this.series.chart.series[0].yData[this.point.x]
                        var val2 = this.series.chart.series[1].yData[this.point.x];
                        return (this.colorIndex == 1) ? val2 : (val1 == 0) ? val1 :  val1+' ('+Math.round((((val1 - val2) / val2) * 100))+'%)'              
                    }   

                    Object.values(data1.recordset).map((type) => {
                        
                        this.tbody.push({ ano: type.ano, 
                                          enero: this.$thousandSeparator(type.enero) ,
                                          febrero: this.$thousandSeparator(type.febrero) ,
                                          marzo: this.$thousandSeparator(type.marzo) ,
                                          abril: this.$thousandSeparator(type.abril) ,
                                          mayo: this.$thousandSeparator(type.mayo) ,
                                          junio: this.$thousandSeparator(type.junio) ,
                                          julio: this.$thousandSeparator(type.julio) ,
                                          agosto: this.$thousandSeparator(type.agosto) ,
                                          septiembre: this.$thousandSeparator(type.septiembre) ,
                                          octubre: this.$thousandSeparator(type.octubre) ,
                                          noviembre: this.$thousandSeparator(type.noviembre) ,
                                          diciembre: this.$thousandSeparator(type.diciembre)})
                        this.endVal.push(type.cantidad)
                        this.anos.push(type.ano)
                        this.chartOptions.series.push({
                            data: [type.enero, type.febrero, type.marzo, type.abril, type.mayo, type.junio, type.julio, type.agosto,
                                   type.septiembre, type.octubre, type.noviembre, type.diciembre
                            ],
                            name: type.ano
                        })
                    })
                    
                    this.setModal(false) // Aqui Manipulamos el modal

                })).catch(errors => {

            })
        }
    },
    components:{
        ModalLoading,
        highcharts: Chart,
        countTo
    }
}
</script>