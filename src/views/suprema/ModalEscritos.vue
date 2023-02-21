<template>
    <b-container fluid>
        <v-row dense>
            <v-col md="12" class="mt-0" dense>
                <v-simple-table dense>
                    <template>
                        <thead>
                            <tr>
                                <th v-for="item in headTwo" :key="item.index" class="primary white--text text-center">{{ item.value }}</th>  
                            </tr>                
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in tbodyTwo"  :key="index">
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
                                <!-- <td class="text-center" style="background-color: #B71C1C;">
                                    <a class="white--text" style="text-decoration: none;" @click="solicitudesRealizadas(item.ano, item.mes_numero, 3 )" > {{item.tres_mas}}</a>
                                </td> -->
                                <!-- <td class="primary--text text-center">
                                    <a class="primary--text text-center" style="text-decoration: none;" @click="solicitudesRealizadas(item.ano, item.mes_numero, 4 )" > {{item.total}}</a>
                                </td> -->
                                <td class="primary--text text-center"> 
                                    <a class="primary--text text-center" style="text-decoration: none;" > {{item.promedio.toFixed(0)}}%</a>
                                </td>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                            </tr>
                        </tbody>
                        <!-- <tfoot>
                            <tr>
                                <th v-for="item in headTwo" :key="item.index" class="primary white--text text-center">{{ item.value }}</th>  
                            </tr>                             
                        </tfoot> -->
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
    props: ['fechasEscrito'], 
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
            headTwo: [
                    { value: 'Pendientes', index: 1}, 
                    { value: '0 Día', index: 2}, 
                    { value: '1 Día', index: 3}, 
                    { value: '2 Días', index: 4},
                    { value: '% Resolución', index: 5}                    
            ],            
            tbodyTwo: [],
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
    methods:{
        ...mapState(['meses']), // Valores Guardados
        ...mapState(['fechas']), // Valores Guardados
        ...mapMutations(['setModal']),
        sentRequest(){
           // console.log(this.fechasAudiencia);
            this.setModal(true) // Aqui Manipulamos el modal
            const axios = require('axios')
            const req1 = url + '/penal/escritosEstadosAgrupados'  
            let params = {}
            if(this.$route.params.ano){
                params = {
                        cod_corte: this.fechasEscrito.cod_corte,
                        cod_tribunal: this.fechasEscrito.cod_tribunal,
                        anoInicio: this.fechasEscrito.ano - 1,
                        mesInicio: this.fechasEscrito.mes,
                        anoFin: this.fechasEscrito.ano,
                        mesFin: this.fechasEscrito.mes,
                        exhorto: this.fechasEscrito.exhorto,
                        tipo: Number(this.$route.params.tipo)
                }
            }else{
                params = {
                    
                        cod_corte: this.fechasEscrito.cod_corte,
                        cod_tribunal: this.fechasEscrito.cod_tribunal,
                        anoInicio: this.fechasEscrito.ano - 1,
                        mesInicio: this.fechasEscrito.mes,
                        anoFin: this.fechasEscrito.ano,
                        mesFin: this.fechasEscrito.mes,
                        exhorto: this.fechasEscrito.exhorto,
                        tipo: Number(this.user.tipo)
                }
            }
            axios.all([
                    axios.get(req1, {
                        params
                    }),                  
                ]).then(axios.spread((...responses) => {

                    const data1 = responses[0].data
                    this.tbodyTwo = []
                    Object.values(data1.recordset).map((type) => {
 
                         this.tbodyTwo.push({   ano: type.ano, 
                                                mes: this.meses()[type.mes - 1],
                                                mes_numero: type.mes,  
                                                pendientes: this.$thousandSeparator(type.pendientes),
                                                cero: this.$thousandSeparator(type.cero) ,
                                                uno: this.$thousandSeparator(type.uno) ,
                                                dos: this.$thousandSeparator(type.dos) ,
                                                promedio: (type.cero + type.uno) * 100 / type.total
                                            })
                    })
                    this.setModal(false) // Aqui Manipulamos el modal
                   

                })).catch(errors => {

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
                            ano: ano,
                            mes: mes
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
                            ano: ano,
                            mes: mes,
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