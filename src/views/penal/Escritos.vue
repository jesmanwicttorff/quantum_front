<template>
    <b-container fluid class="px-4">
        <v-row justify="end">
            <v-col offset-md="11">
                <v-btn  color="success" :href="this.urlquauntum"  style="text-decoration:none">Volver</v-btn>
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
                :filename="'Escritos'"
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
                                    {{item.enero}}
                                    <!-- <router-link style="text-decoration: none;" :to="{ name: 'PenalEscritosDetalles', params: { ano: item.ano, mes: 1, exhorto: user.exhorto } }"> {{item.enero}}  </router-link>  -->
                                </td>
                                <td class="text-center">
                                    {{item.febrero}}
                                    <!-- <router-link style="text-decoration: none;" :to="{ name: 'PenalEscritosDetalles', params: { ano: item.ano, mes: 2, exhorto: user.exhorto } }"> {{item.febrero}}  </router-link>  -->
                                </td>
                                <td class="text-center">
                                    {{item.marzo}}
                                    <!-- <router-link style="text-decoration: none;" :to="{ name: 'PenalEscritosDetalles', params: { ano: item.ano, mes: 3 , exhorto: user.exhorto} }"> {{item.marzo}}  </router-link>  -->
                                </td>
                                <td class="text-center">
                                    {{item.abril}} 
                                    <!-- <router-link style="text-decoration: none;" :to="{ name: 'PenalEscritosDetalles', params: { ano: item.ano, mes: 4 , exhorto: user.exhorto} }"> {{item.abril}}  </router-link>  -->
                                </td>
                                <td class="text-center">
                                    {{item.mayo}}
                                    <!-- <router-link style="text-decoration: none;" :to="{ name: 'PenalEscritosDetalles', params: { ano: item.ano, mes: 5 , exhorto: user.exhorto} }"> {{item.mayo}}  </router-link>  -->
                                </td>
                                <td class="text-center">
                                    {{item.junio}}
                                    <!-- <router-link style="text-decoration: none;" :to="{ name: 'PenalEscritosDetalles', params: { ano: item.ano, mes: 6 , exhorto: user.exhorto} }"> {{item.junio}}  </router-link>  -->
                                </td>
                                <td class="text-center">
                                    {{item.julio}} 
                                    <!-- <router-link style="text-decoration: none;" :to="{ name: 'PenalEscritosDetalles', params: { ano: item.ano, mes: 7 , exhorto: user.exhorto} }"> {{item.julio}}  </router-link>  -->
                                </td>
                                <td class="text-center">
                                    {{item.agosto}}  
                                    <!-- <router-link style="text-decoration: none;" :to="{ name: 'PenalEscritosDetalles', params: { ano: item.ano, mes: 8 , exhorto: user.exhorto} }"> {{item.agosto}}  </router-link>  -->
                                </td>
                                <td class="text-center">
                                    {{item.septiembre}}
                                    <!-- <router-link style="text-decoration: none;" :to="{ name: 'PenalEscritosDetalles', params: { ano: item.ano, mes: 9 , exhorto: user.exhorto} }"> {{item.septiembre}}  </router-link>  -->
                                </td>
                                <td class="text-center">
                                    {{item.octubre}}
                                    <!-- <router-link style="text-decoration: none;" :to="{ name: 'PenalEscritosDetalles', params: { ano: item.ano, mes: 10 , exhorto: user.exhorto} }"> {{item.octubre}}  </router-link>  -->
                                </td>
                                <td class="text-center">
                                    {{item.noviembre}} 
                                    <!-- <router-link style="text-decoration: none;" :to="{ name: 'PenalEscritosDetalles', params: { ano: item.ano, mes: 11 , exhorto: user.exhorto} }"> {{item.noviembre}}  </router-link>  -->
                                </td> 
                                <td class="text-center">
                                    {{item.diciembre}}
                                    <!-- <router-link style="text-decoration: none;" :to="{ name: 'PenalEscritosDetalles', params: { ano: item.ano, mes: 12 , exhorto: user.exhorto} }"> {{item.diciembre}}  </router-link>  -->
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
        <v-row>
            <v-col sm="12" class="px-12">
                <v-simple-table dense>
                    <template>
                        <thead>
                            <tr>
                                <th v-for="item in headTwo" :key="item.index" class="primary white--text text-center">{{ item.value }}</th>  
                            </tr>                
                        </thead>
                        <tbody>
                   
                            <tr v-for="(item, index) in tbodyTwo"  :key="index">
                                <td class="primary--text text-center">{{item.ano}}</td>                                 
                                <td class="primary--text text-center">{{item.mes}}</td>
                                <td class="primary--text text-center">
                                    <a class="primary--text text-center" style="text-decoration: none;" @click="solicitudesPendientes(item.ano, item.mes_numero )" > {{item.pendientes}}</a>
                                </td>
                                <td class="text-center" style="background-color: #43A047;">
                                    <a class="white--text" style="text-decoration: none;" @click="solicitudesRealizadas(item.ano, item.mes_numero, 0 )" > {{item.cero}}</a>
                                </td>
                                <td class="text-center" style="background-color: #388E3C;">
                                    <a class="white--text" style="text-decoration: none;" @click="solicitudesRealizadas(item.ano, item.mes_numero, 1 )" > {{item.uno}}</a>
                                </td>
                                <td class="text-center" style="background-color: #FDD835;">
                                    <a class="white--text" style="text-decoration: none;" @click="solicitudesRealizadas(item.ano, item.mes_numero, 2 )" > {{item.dos}}</a>
                                </td>
                                <td class="text-center" style="background-color: #B71C1C;">
                                    <a class="white--text" style="text-decoration: none;" @click="solicitudesRealizadas(item.ano, item.mes_numero, 3 )" > {{item.tres_mas}}</a>
                                </td>
                                <td class="primary--text text-center">
                                    <a class="primary--text text-center" style="text-decoration: none;" @click="solicitudesRealizadas(item.ano, item.mes_numero, 4 )" > {{item.total}}</a>
                                </td>
                                <td class="primary--text text-center"> 
                                    <a class="primary--text text-center" style="text-decoration: none;" > {{item.promedio.toFixed(0)}}</a>
                                </td>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th v-for="item in headTwo" :key="item.index" class="primary white--text text-center">{{ item.value }}</th>  
                            </tr>                             
                        </tfoot>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>                 
        <ModalLoading/>
        <template>
            <v-dialog
                v-model="dialog"
                max-width="95%"
                >
                <v-card>
                    <v-card-title class="headline primary white--text">
                    Detalle de Escritos
                    </v-card-title>
                    <v-card-actions class="px-6">
                        <v-row>
                            <v-col > 
                                <v-btn
                                    class="primary"
                                    @click="dialog = false"
                                > Cerrar
                                </v-btn>
                            </v-col>
                            <v-col offset="10">        
                                <vue-excel-xlsx class="mt-0 btn primary white--text text-center"
                                :data="bodyExcelDetalles"
                                :columns="headExcelDetalles"
                                :filename="'IngresosDetalles'"
                                :sheetname="'Hoja1'"
                                >
                                    <b-icon-cloud-download>     
                                    </b-icon-cloud-download>
                                </vue-excel-xlsx>
                            </v-col>
                        </v-row>                             
                    </v-card-actions>
                    <v-card-text>
                        <v-data-table 
                            :headers="tableHeader"
                            :items="tableBody"
                            :page.sync="page"
                            :items-per-page="itemsPerPage"
                            dense
                            hide-default-footer
                            @page-count="pageCount = $event"                                
                            class="mt-10">
                        </v-data-table>
                        <v-row justify="center"> 
                            <v-col cols="6">
                                <v-pagination v-model="page" :length="pageCount"></v-pagination>
                            </v-col>
                        </v-row>                     
                    </v-card-text>
                </v-card>
            </v-dialog>   
        </template>          
    </b-container>
</template>
<script>
import ModalLoading from '../../components/elementos/ModalLoading'
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

loadDrillDown(HighCharts)
stockInit(HighCharts)
exporting(HighCharts)

export default {
    name: 'Escritos',
    data(){
        return {
            dialog: false,
            headExcelDetalles: [
                    {
                        label: "Rit",
                        field: "rit",
                    },
                    {
                        label: "T. Causa",
                        field: "gls_tipo_causa",
                    },                    
                    {
                        label: "F. Ingreso",
                        field: "fec_ingreso",
                    },
                    {
                        label: "Est. Causa",
                        field: "gls_estrelacion",
                    },    
                    {
                        label: "Solicitud",
                        field: "gls_hitoact",
                    },
                    {
                        label: "Resuelve",
                        field: "gls_hitoact_resuelve",
                    },                      
                    {
                        label: "Est. Solicitud",
                        field: "gls_estevento",
                    },
                    {
                        label: "F. Solicitud",
                        field: "fec_evento",
                    },
                    {
                        label: "F. Resolución",
                        field: "fec_cambioest",
                    },
                    {
                        label: "Juez",
                        field: "juez",
                    },                    
                    {
                        label: "Funcionario",
                        field: "funcionario",
                    }                 
            ],
            bodyExcelDetalles: [],
            tableHeader: [
                        { text: 'Rit', align: 'center', value: 'rit', class : 'primary white--text', width: '10%' }, 
                        { text: 'T Causa', align: 'center', value: 'gls_tipo_causa', class : 'primary white--text', width: '10%' },                                                    
                        { text: 'F. Ingreso', align: 'center', value: 'fec_ingreso', class : 'primary white--text', width: '10%' },
                        { text: 'Est. Causa', align: 'center', value: 'gls_estrelacion', class : 'primary white--text', width: '10%' },
                        { text: 'Solicitud', align: 'center', value: 'gls_hitoact', class : 'primary white--text', width: '10%' },
                        { text: 'Resuelve', align: 'center', value: 'gls_hitoact_resuelve', class : 'primary white--text', width: '10%' },
                        { text: 'Est. Solicitud', align: 'center', value: 'gls_estevento', class : 'primary white--text', width: '10%' },                        
                        { text: 'F. Solicitud', align: 'center', value: 'fec_evento', class : 'primary white--text', width: '10%' },
                        { text: 'F. Resolucion', align: 'center', value: 'fec_cambioest', class : 'primary white--text', width: '10%' },
                        { text: 'Juez', align: 'center', value: 'juez', class : 'primary white--text', width: '10%' },    
                        { text: 'Funcionario', align: 'center', value: 'funcionario', class : 'primary white--text', width: '10%' }                            
            ],
            tableBody: [],            
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,                                       
            user: {
                usuario_id: store.get('user_usuario_id'), // Los parametros que obtenemos de la url
                cod_corte: store.get('cod_corte'),
                cod_tribunal: store.get('cod_tribunal'),
                ano: store.get('ano'),
                mes: store.get('mes'),
                rango: store.get('rango'),
                exhorto: store.get('exhorto')
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
            headTwo: [ { value: 'Año', index: 0}, 
                    { value: 'Mes', index: 1}, 
                    { value: 'Pendientes', index: 2}, 
                    { value: '0 Día', index: 3}, 
                    { value: '1 Día', index: 4}, 
                    { value: '2 Días', index: 5}, 
                    { value: '3 +', index: 6},
                    { value: 'Total Escritos Tramitados', index: 7},
                    { value: '% Resolución', index: 8}                    
            ],            
            tbodyTwo: [],           
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
            ],
            urlquauntum: quantum + '/penal_controller/totalesCorte/'+ store.get('cod_corte')                  
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
        ...mapState(['meses']), // Valores Guardados
        ...mapMutations(['setModal']),
        sentRequest(){
            this.setModal(true) // Aqui Manipulamos el modal
            const axios = require('axios')
            const req1 = url + '/penal/resumenesEscritos'
            const req2 = url + '/penal/escritosEstados'  
              
            axios.all([
                    axios.get(req1, {
                        params: {
                            cod_corte: this.user.cod_corte,
                            cod_tribunal: this.user.cod_tribunal,
                            ano: this.user.ano,
                            mes: this.user.mes,
                            rango: this.user.rango,
                            exhorto: this.user.exhorto,
                            tipo: this.$route.params.tipo
                        }
                    }),
                    axios.get(req2, {
                        params: {
                            cod_corte: this.user.cod_corte,
                            cod_tribunal: this.user.cod_tribunal,
                            ano: this.user.ano
                        }
                    })                    

                ]).then(axios.spread((...responses) => {

                    const data1 = responses[0].data
                    const data2 = responses[1].data
                    this.chartOptions.title.text =  'Escritos' // Titulo del grafico de lineas
                    
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

                    Object.values(data2.recordset).map((type) => {
 
                         this.tbodyTwo.push({   ano: type.ano, 
                                                mes: this.meses()[type.mes - 1],
                                                mes_numero: type.mes,  
                                                pendientes: this.$thousandSeparator(type.pendientes),
                                                cero: this.$thousandSeparator(type.cero) ,
                                                uno: this.$thousandSeparator(type.uno) ,
                                                dos: this.$thousandSeparator(type.dos) ,
                                                tres_mas: this.$thousandSeparator(type.tres_mas),
                                                total: this.$thousandSeparator(type.total),
                                                promedio: (type.cero + type.uno) * 100 / type.total
                                            })
                    })
                    this.setModal(false) // Aqui Manipulamos el modal

                })).catch(errors => {
                    this.setModal(false)
            })
        },
        solicitudesPendientes(ano, mes){

            this.setModal(true) // Aqui Manipulamos el modal
            const axios = require('axios')
            const req1 = url + ((this.$route.params.tipo == 13) ? '/penal/escritosPendientesDetalles' : '/penal/escritosPendientesDetallesOrales')
              
            axios.all([
                    axios.get(req1, {
                        params: {
                            cod_corte: this.user.cod_corte,
                            cod_tribunal: this.user.cod_tribunal,
                            anoInicio: ano,
                            mesInicio: mes,
                            anoFin: ano,
                            mesFin: mes,
                            exhorto: 0
                        }
                    })
                ]).then(axios.spread((...responses) => {            
                    const data = responses[0].data.recordset
                    this.tableBody = []
                    this.bodyExcelDetalles = []
                    this.setModal(false)
                    this.dialog = true
                    this.tableBody = data
                    this.bodyExcelDetalles = data

            })).catch(errors => {
                this.setModal(false)
            })                                
        },
        solicitudesRealizadas(ano, mes, dia){
            this.setModal(true) // Aqui Manipulamos el modal
            const axios = require('axios')
            const req1 = url + ((this.$route.params.tipo == 13) ? '/penal/escritosRealizadasDetalles' : '/penal/escritosRealizadasDetallesOrales' )
            axios.all([
                    axios.get(req1, {
                        params: {
                            cod_corte: this.user.cod_corte,
                            cod_tribunal: this.user.cod_tribunal,
                            anoInicio: ano,
                            mesInicio: mes,
                            anoFin: ano,
                            mesFin: mes,
                            exhorto: 0,
                            dia: dia
                        }
                    })
                ]).then(axios.spread((...responses) => {            
                    const data = responses[0].data.recordset
                    this.tableBody = []
                    this.bodyExcelDetalles = []
                    this.setModal(false)
                    this.dialog = true
                    this.tableBody = data
                    this.bodyExcelDetalles = data

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