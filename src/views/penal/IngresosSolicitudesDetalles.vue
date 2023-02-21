<template>
    <v-card class="py-1">
        <v-card-title class="primary white--text"> </v-card-title>
        <v-card-text>
            <v-col sm="12" class="px-8">
                <v-btn color="primary" @click="detallesTipos(0)">
                    Detalles Solicitudes
                </v-btn>
            </v-col>
            <v-col sm="12">
                <highcharts :options="chartOptionsFour" :constructor-type="'chart'" class="mt-2" />
            </v-col>
            <v-row>
                <v-col sm="12" class="px-12">
                    <v-col sm="12" class="py-0">
                        <vue-excel-xlsx class="my-2 btn primary white--text text-center" :data="tbodySolicitud" :columns="excelSolicitud" :filename="'Ingresos'" :sheetname="'Hoja1'">
                            <b-icon-cloud-download> </b-icon-cloud-download>
                        </vue-excel-xlsx>
                    </v-col>
                    <v-simple-table dense>
                        <template>
                            <thead>
                                <tr>
                                    <th v-for="item in headSolicitud" :key="item.index" class="primary white--text text-center">{{ item.text }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in tbodySolicitud" :key="index">
                                    <td class="primary--text text-center">{{ item.increment }}</td>
                                    <td class="primary--text text-center">{{ item.gls_hitoact }}</td>
                                    <td class="primary--text text-center" @click="detallesSolicitudes(item.id)">
                                        <router-link style="text-decoration: none;" :to="{ name: item.path.replace(/\s/g, ''), params: { ano: user.ano, mes: user.mes } }"> {{ $thousandSeparator(item.cantidad) }} </router-link>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th v-for="item in tfootSolicitud" :key="item.index" class="primary white--text text-center">{{ item.text }}</th>
                                </tr>
                            </tfoot>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
        </v-card-text>
        <v-dialog v-model="dialog" max-width="95%">
            <b-container fluid class="px-4">
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-title class="primary white--text">
                                Detalles Tipo Solicitud
                                <v-spacer></v-spacer>
                                 <v-row>
                                    <v-col offset="8">
                                        <vue-excel-xlsx
                                            class="mt-0 btn primary white--text text-right"
                                            :data="Query_Tipos_Solicitudes"
                                            :columns="headExcelSOL"
                                            :filename="'DetallesTipoSolicitud'"
                                            :sheetname="'Hoja1'"
                                        >
                                            <b-icon-cloud-download> </b-icon-cloud-download>
                                        </vue-excel-xlsx>
                                    </v-col>
                                </v-row>
                                <v-btn class="primary" @click="dialog = false"> Cerrar</v-btn>
                            </v-card-title>
                            <v-card-text>
                                <v-data-table :headers="array_tipo_solicitud" :items="Query_Tipos_Solicitudes" :page.sync="page" :items-per-page="itemsPerPage" dense hide-default-footer @page-count="pageCount = $event" class="mt-10">
                                </v-data-table>
                                <v-row justify="center">
                                    <v-col cols="6">
                                        <v-pagination v-model="page" :length="pageCount"></v-pagination>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </b-container>
        </v-dialog>
    </v-card>
</template>
<script>
import { url } from '../../config/api'
import store from 'store'
import { Graph } from '../../config/Highcharts'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import loadDrillDown from 'highcharts/modules/drilldown'
import stockInit from 'highcharts/modules/stock'
import { mapState, mapMutations } from 'vuex'

loadDrillDown(HighCharts)
stockInit(HighCharts)
exporting(HighCharts)

export default {
    name: 'IngresosSolicitudesDetalles',
    data(){
        return {
            dialog : false,
            Query_Tipos_Solicitudes : [],
            itemsPerPage: 10,
            page: 1,
            pageCount: 0,
            user: {
                cod_corte: store.get('cod_corte'),
                cod_tribunal: store.get('cod_tribunal'),
                ano: store.get('ano'),
                mes: store.get('mes'),
                rango: store.get('rango'),
                exhorto: store.get('exhorto')
            },            
            chartOptionsFour: JSON.parse(JSON.stringify(Graph['pie'][0])),
            headSolicitud: [
                { text: '#',  align: 'center', value: 'increment', class : 'primary white--text', width: '10%'},
                { text: 'Tipo Solicitud',  align: 'center', value: 'gls_hitoact', class : 'primary white--text', width: '60%' },
                { text: 'Cantidad', align: 'center', value: 'cantidad', class : 'primary white--text', width: '30%' }
            ],            
            tbodySolicitud: [],
            tfootSolicitud: [
                { text: 'Total',  align: 'center', value: 'increment', class : 'primary white--text', width: '10%'},
                { text: '',  align: 'center', value: 'gls_hitoact', class : 'primary white--text', width: '60%' },
                { text: 0, align: 'center', value: 0, class : 'primary white--text', width: '30%' }
            ],
            excelSolicitud:[
                {
                    label: "#",
                    field: "increment",
                },
                {
                    label: "Tipo Solicitud",
                    field: "gls_hitoact",
                },
                {
                    label: "Cantidad",
                    field: "cantidad",
                },         
            ],
            array_tipo_solicitud:  [
                { text: '#',  align: 'center', value: 'increment', class : 'primary white--text', width: '5%'},
                { text: 'Corte',  align: 'left', value: 'corte', class : 'primary white--text', width: '60%' },
                { text: 'Tribunal',  align: 'left', value: 'tribunal', class : 'primary white--text', width: '60%' },
                { text: 'Tipo Solicitud', align: 'center', value: 'tipo_solicitud', sortable: 0 , class : 'primary white--text', width: '7%' },
                { text: 'Causa', align: 'center', value: 'causa', class : 'primary white--text', width: '7%' },
                { text: 'Fecha Ingreso', align: 'center', value: 'fecha_ingreso', class : 'primary white--text', width: '7%' },
                { text: 'Fecha Digitacion', align: 'center', value: 'fecha_digitacion', class : 'primary white--text', width: '7%' },
                { text: 'Fecha Evento', align: 'center', value: 'fecha_evento', class : 'primary white--text', width: '7%' },
                { text: 'Evento', align: 'center', value: 'evento', class : 'primary white--text', width: '7%' },
                
                ],
                 headExcelSOL: [
                    {
                        label: "Corte",
                        field: "corte",
                    },                    
                    {
                        label: "Tribunal",
                        field: "tribunal",
                    },
                    {
                        label: "Tipo Solicitud",
                        field: "motivo_audiencia",
                    },
                    {
                        label: "Causa",
                        field: "causa",
                    },
                    {
                        label: "Fecha Digitacion",
                        field: "fecha_digitacion",
                    },
                    {
                        label: "Fecha Evento",
                        field: "fecha_evento",
                    },
                    {
                        label: "Fecha Ingreso",
                        field: "fecha_ingreso",
                    },
                    {
                        label: "Evento",
                        field: "evento",
                    },                   
            ],             
            crr_idhitoact: 0            
        }
    },
    props: ['fechasConsulta'], 
     watch:{
        fechasConsulta: function(){
             this.sentRequest()
        }
    },
    created(){
        this.sentRequest() 
    },
    methods:{
        ...mapState(['fechas']), // Valores Guardados
         ...mapMutations(['setModal']),
        detallesSolicitudes(id){
                this.setModal(true) // Aqui Manipulamos el modal
                const axios = require('axios')
                const req1 = url + '/penal/ingresosSolicitudesDetalles'
                this.Query_Tipos_Solicitudes=[]

            const get = async req1 => {
                    try {
                        const response = await axios.get(req1, {
                             params : 
                                {
                                    cod_corte: this.user.cod_corte,
                                    cod_tribunal: this.user.cod_tribunal,
                                    anoInicio: this.fechas().anoInicio || this.$route.params.ano,
                                    mesInicio: this.fechas().mesInicio || this.$route.params.mes,
                                    anoFin: this.fechas().anoFin || this.$route.params.ano,
                                    mesFin: this.fechas().mesFin || this.$route.params.mes,
                                    exhorto: store.get('exhorto'),
                                    id : id 
                                 }

                        })
                        
                        const data1 = response.data
                        let increment = 1
                        let objtiposolicitud
                       
                        Object.values(data1.recordset).map((type) => {
                            objtiposolicitud = new Object();// creamos el objeto para asignarle cada elemento del result de consulta
                            objtiposolicitud.corte = type.corte
                            objtiposolicitud.tribunal = type.tribunal
                            objtiposolicitud.tipo_solicitud = type.tipo_solicitud
                            objtiposolicitud.causa = type.causa
                            objtiposolicitud.fecha_digitacion = type.fecha_digitacion
                            objtiposolicitud.fecha_evento = type.fecha_evento
                            objtiposolicitud.fecha_ingreso = type.fecha_ingreso
                            objtiposolicitud.evento = type.evento
                            objtiposolicitud.increment = increment 
                            this.Query_Tipos_Solicitudes.push(objtiposolicitud) 
                            increment ++  
                          }) 
                          
    
                    }catch(errors) {
                        console.log(errors);
                    }  // fin try

            } // fin get
  
             get(req1)
         
            this.dialog = true
            this.setModal(false) // Aqui Manipulamos el modal
        },
    sentRequest(){
        
        const axios = require('axios')
        const req = url + '/penal/ingresosSolicitudes'
        let params = {}
         
        if(this.$route.params.ano){
            params = {
                            cod_corte: this.user.cod_corte,
                            cod_tribunal: this.user.cod_tribunal,
                            anoInicio: this.fechas().anoInicio || this.$route.params.ano,
                            mesInicio: this.fechas().mesInicio || this.$route.params.mes,
                            anoFin: this.fechas().anoFin || this.$route.params.ano,
                            mesFin: this.fechas().mesFin || this.$route.params.mes,
                            exhorto: this.fechas().exhorto || this.$route.params.exhorto
            }
        }else{
            params = {
                            cod_corte: this.user.cod_corte,
                            cod_tribunal: this.user.cod_tribunal,
                            anoInicio: this.fechas().anoInicio || this.user.ano,
                            mesInicio: this.fechas().mesInicio || this.user.mes,
                            anoFin: this.fechas().anoFin || this.user.ano,
                            mesFin: this.fechas().mesFin || this.user.mes,
                            exhorto: this.fechas().exhorto || this.user.exhorto,
            }
        }    
           
        axios.all([
                axios.get(req, {
                    params
                })                                     
            ]).then(axios.spread((...responses) => {
                           
            const data1 = responses[0].data
            let dataTable1 = []

            this.chartOptionsFour.title.text =  'Ingresos por Tipo de Solicitudes' // Titulo del grafico de lineas
            this.chartOptionsFour.title.align = 'center' // Centramos el titulo de Grafico
            this.chartOptionsFour.chart.height = 400
            this.chartOptionsFour.series = [] // Limpiamos las Series 
            this.chartOptionsFour.plotOptions.pie.dataLabels.format =  '<b>{point.name}</b>: {point.y:.0f} ({point.percentage:.1f} %)'
            
            let increment = 1                
            this.tbodySolicitud = []
            this.tfootSolicitud[2].text = 0      
            

            Object.values(data1.recordset).map((type) => {
                dataTable1.push({ name: type.gls_hitoact, y: type.cantidad})
                this.tbodySolicitud.push({ increment: increment, id:type.id , path:'PenalIngresosDetalles', gls_hitoact: type.gls_hitoact, cantidad: type.cantidad})
                this.tfootSolicitud[2].text += type.cantidad
                increment ++                
            })

            this.tfootSolicitud[2].text = this.$thousandSeparator(this.tfootSolicitud[2].text)            

            this.chartOptionsFour.series.push({
                data: dataTable1,
                name: '',
                colorByPoint: true
            })
        
        })).catch(errors => {

        }) 


        }
    },
    components:{
        highcharts: Chart        
    }
}
</script>