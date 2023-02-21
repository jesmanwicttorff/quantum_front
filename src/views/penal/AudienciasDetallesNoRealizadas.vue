<template>
    <b-container fluid class="px-4">
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="primary white--text">
                        Filtros
                        <v-spacer></v-spacer>
                        <v-btn color="success" :href="this.urlquauntum" style="text-decoration: none;">Volver</v-btn>
                    </v-card-title>
                    <v-card-text>
                        <FiltrosCompetencias v-on:buscar="submit" class="mt-4" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row sm="12" class="mt-3" dense>
            <v-col md="12">
                <highcharts :options="chartOptions" :constructor-type="'chart'" />
            </v-col>
            <v-col md="12">
                <v-card>
                    <v-card-title class="headline"></v-card-title>
                    <v-card-actions class="px-6">
                        <v-row dense>
                            <v-col>
                                <vue-excel-xlsx class="mt-0 btn primary white--text text-center" :data="bodyExcelDetalles" :columns="headExcelDetalles" :filename="'IngresosDetalles'" :sheetname="'Hoja1'">
                                    <b-icon-cloud-download> </b-icon-cloud-download>
                                </vue-excel-xlsx>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    <v-simple-table dense>
                        <template>
                            <thead>
                                <tr>
                                    <th v-for="item in head" :key="item.index" class="primary white--text text-center">{{ item.value }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in tbody" :key="index">
                                    <td class="primary--text text-center">{{ item.correlativo }}</td>
                                    <td class="primary--text text-center">{{ item.gls_estaudiencia }}</td>
                                    <td v-if="item.gls_estaudiencia == 'Reprogramada Audiencia'" @click="detalle()" class="text-center">
                                        <router-link style="text-decoration: none;" :to="{ name: item.path.replace(/\s/g, ''), params: { ano: item.ano, mes: 1, exhorto: user.exhorto, tipo: user.tipo } }"> {{item.cantidad}} </router-link>
                                    </td>
                                    <td v-else-if="item.gls_estaudiencia != 'Reprogramada Audiencia'" @click="detalleResolucion()" class="text-center">
                                        <router-link style="text-decoration: none;" :to="{ name: item.path.replace(/\s/g, ''), params: { ano: item.ano, mes: 1, exhorto: user.exhorto, tipo: user.tipo } }"> {{item.cantidad}} </router-link>
                                    </td>
                                </tr>
                            </tbody>
                            <v-row justify="center">
                                <v-col cols="6">
                                    <hr />
                                    <hr />
                                    <hr />
                                    <hr />
                                </v-col>

                                <v-dialog v-model="dialog" max-width="95%">
                                    <b-container fluid class="px-4">
                                        <v-row>
                                            <v-col>
                                                <v-card>
                                                    <v-card-title class="primary white--text">
                                                        Reprogramada Audiencia
                                                        <v-spacer></v-spacer>
                                                        <v-row>
                                                            <v-col offset="8">
                                                                <vue-excel-xlsx
                                                                    class="mt-0 btn primary white--text text-right"
                                                                    :data="Query_reprogramada"
                                                                    :columns="headExcelRE"
                                                                    :filename="'DetallesReprogramadas'"
                                                                    :sheetname="'Hoja1'"
                                                                >
                                                                    <b-icon-cloud-download> </b-icon-cloud-download>
                                                                </vue-excel-xlsx>
                                                            </v-col>
                                                        </v-row>
                                                        <v-btn class="primary" @click="dialog = false"> Cerrar</v-btn>
                                                    </v-card-title>
                                                    <v-card-text>
                                                        <v-data-table
                                                            :headers="tableaudNorealizadas"
                                                            :items="Query_reprogramada"
                                                            :page.sync="page"
                                                            :items-per-page="itemsPerPage"
                                                            dense
                                                            hide-default-footer
                                                            @page-count="pageCount = $event"
                                                            class="mt-10"
                                                        >
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
                                <v-dialog v-model="dialog2" max-width="95%">
                                    <b-container fluid class="px-4">
                                        <v-row>
                                            <v-col>
                                                <v-card>
                                                    <v-card-title class="primary white--text">
                                                        Reprogramada por Resolucion
                                                        <v-spacer></v-spacer>
                                                        <v-row>
                                                            <v-col offset="8">
                                                                <vue-excel-xlsx
                                                                    class="mt-0 btn primary white--text text-right"
                                                                    :data="Query_reprogramadaPorResolucion"
                                                                    :columns="headExcelRE"
                                                                    :filename="'DetallesReprogramadasPorResolucion'"
                                                                    :sheetname="'Hoja1'"
                                                                >
                                                                    <b-icon-cloud-download> </b-icon-cloud-download>
                                                                </vue-excel-xlsx>
                                                            </v-col>
                                                        </v-row>
                                                        <v-btn class="primary" @click="dialog2 = false"> Cerrar</v-btn>
                                                    </v-card-title>
                                                    <v-card-text>
                                                        <v-data-table
                                                            :headers="tableaudNorealizadas"
                                                            :items="Query_reprogramadaPorResolucion"
                                                            :page.sync="page"
                                                            :items-per-page="itemsPerPage"
                                                            dense
                                                            hide-default-footer
                                                            @page-count="pageCount = $event"
                                                            class="mt-10"
                                                        >
                                                        </v-data-table>
                                                        <v-row justify="center">
                                                            <v-col cols="6">
                                                                <v-pagination v-if="dialog2===true" v-model="page" :length="pageCount"></v-pagination>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </b-container>
                                </v-dialog>
                            </v-row>
                        </template>
                    </v-simple-table>
                </v-card>
            </v-col>
        </v-row>
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
    name: 'PenalAudienciasDetallesRealizadas',
    data(){
        return {
            urlquauntum: url2 + '/IndicadoresPenal/AudienciasEstados',
            dialog : false,
            dialog2 : false,
            Query_reprogramada : [],
            Query_reprogramadaPorResolucion : [],
            headExcelRE: [
                    {
                        label: "Corte",
                        field: "corte",
                    },                    
                    {
                        label: "Tribunal",
                        field: "tribunal",
                    },
                    {
                        label: "Motivo Audiencia",
                        field: "motivo_audiencia",
                    },
                    {
                        label: "Observacion",
                        field: "observacion",
                    },                      
                    {
                        label: "Fecha Evento",
                        field: "fecha_evento",
                    },
                    {
                        label: "Fecha Firma",
                        field: "fecha_firma",
                    },
                    {
                        label: "Estado Evento",
                        field: "estado_evento",
                    },                     
                    {
                        label: "Hitos",
                        field: "hitos",
                    },
                     {
                        label: "Despliegue",
                        field: "despliegue",
                    },
                    {
                        label: "Tipo Causa",
                        field: "tipo_causa",
                    },                     
            ],
            user: {
                cod_corte: store.get('cod_corte'),
                cod_tribunal: store.get('cod_tribunal'),
                ano: store.get('ano'),
                mes: store.get('mes'),
                rango: store.get('rango'),
                exhorto: store.get('exhorto'),
                tipo: store.get('tipo')
            },
             head: [ { value: 'N°', index: 0}, 
                    { value: 'Est.Audiencia', index: 1}, 
                    { value: 'Cantidad', index: 2}
            ],
            chartOptions: JSON.parse(JSON.stringify(Graph['pie'][0])),
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,            
            tableHeader: [
                { text: 'N°',  align: 'center', value: 'correlativo', class : 'primary white--text', width: '5%'},
                { text: 'Est. Audiencia',  align: 'center', value: 'gls_estaudiencia', class : 'primary white--text', width: '30%'},
                { text: 'Cantidad',  align: 'center', value: 'cantidad', class : 'primary white--text', width: '15%' },
            ],
            tableaudNorealizadas: [
               // { text: 'N°',  align: 'center', value: 'increment', class : 'primary white--text', width: '5%'},
                { text: 'Corte',  align: 'center', value: 'corte', class : 'primary white--text', width: '15%'},
                { text: 'Tribunal',  align: 'center', value: 'tribunal', class : 'primary white--text', width: '15%' },
               // { text: 'Estado Audiencia',  align: 'center', value: 'estado_audiencia', class : 'primary white--text', width: '15%' },
                { text: 'Motivo Audiencia',  align: 'center', value: 'motivo_audiencia', class : 'primary white--text', width: '15%' },
                { text: 'Observacion',  align: 'center', value: 'observacion', class : 'primary white--text', width: '15%' },
                { text: 'Fecha Evento',  align: 'center', value: 'fecha_evento', class : 'primary white--text', width: '15%' },
                { text: 'Fecha Firma',  align: 'center', value: 'fecha_firma', class : 'primary white--text', width: '15%' },
               // { text: 'Fecha Digitacion',  align: 'center', value: 'fecha_digitacion', class : 'primary white--text', width: '15%' },
               // { text: 'Fecha Sistema',  align: 'center', value: 'fecha_sistema', class : 'primary white--text', width: '15%' },
                { text: 'Estado Evento',  align: 'center', value: 'estado_evento', class : 'primary white--text', width: '15%' },
                { text: 'Hitos',  align: 'center', value: 'hitos', class : 'primary white--text', width: '15%' },
                { text: 'Despliegue',  align: 'center', value: 'despliegue', class : 'primary white--text', width: '15%' },
               // { text: 'Estado Relacion',  align: 'center', value: 'estado_relacion', class : 'primary white--text', width: '15%' },
                { text: 'Tipo Causa',  align: 'center', value: 'tipo_causa', class : 'primary white--text', width: '15%' }
         
            ],

            tableBody: [],
            headExcelDetalles: [
                {
                    label: "N°",
                    field: "correlativo",
                },
                {
                    label: "Est. Audiencia",
                    field: "gls_estaudiencia",
                },
                {
                    label: "Cantidad",
                    field: "cantidad",
                },                
            ],
            bodyExcelDetalles: [],
              tbody: []                         
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
    methods:{
        ...mapState(['fechas']), // Valores Guardados
        ...mapMutations(['setModal']),
        submit(){
            this.sentRequest()
        },
        detalle(){
            this.setModal(true) // Aqui Manipulamos el modal
            this.dialog = true
            const axios = require('axios')
            const req = url + '/penal/reprogramadaaudiencia'
            this.Query_reprogramada=[]
            const get = async req => {
                    try {

                        const response = await axios.get(req, {
                              params : 
                              {
                                    cod_corte: this.user.cod_corte,
                                    cod_tribunal: this.user.cod_tribunal,
                                    anoInicio: this.fechas().anoInicio || this.$route.params.ano,
                                    mesInicio: this.fechas().mesInicio || this.$route.params.mes,
                                    anoFin: this.fechas().anoFin || this.$route.params.ano,
                                    mesFin: this.fechas().mesFin || this.$route.params.mes,
                                    exhorto: this.$route.params.exhorto,
                                    tipo: this.user.tipo
                                }
                        })

                        const data1 = response.data
                        let increment = 1
                        let objaudnorealizada
                         Object.values(data1.recordset).map((type) => {
                            objaudnorealizada = new Object();// creamos el objeto para asignarle cada elemento del result de consulta
                            objaudnorealizada.corte = type.corte
                            objaudnorealizada.tribunal = type.tribunal
                            objaudnorealizada.estado_audiencia = type.estado_audiencia
                            objaudnorealizada.motivo_audiencia = type.motivo_audiencia
                            objaudnorealizada.observacion = type.observacion
                            objaudnorealizada.fecha_evento = type.fecha_evento
                            objaudnorealizada.fecha_firma = type.fecha_firma
                            objaudnorealizada.fecha_digitacion = type.fecha_digitacion
                            objaudnorealizada.fecha_sistema = type.fecha_sistema
                            objaudnorealizada.estado_evento = type.estado_evento
                            objaudnorealizada.hitos = type.hitos
                            objaudnorealizada.despliegue = type.despliegue
                            objaudnorealizada.tipo_causa = type.tipo_causa
                            objaudnorealizada.increment = increment 
                            this.Query_reprogramada.push(objaudnorealizada) 
                            increment ++  
                          }) 


                    }catch(errors) {
                        console.log(errors);
                    }  // fin try

            } // fin get
  
             get(req)
             this.setModal(false) // Aqui Manipulamos el modal

        },

        detalleResolucion(){
            this.setModal(true) // Aqui Manipulamos el modal
            this.dialog2 = true
            const axios = require('axios')
            const req = url + '/penal/ReprogramadaPorResolucion'
            this.Query_reprogramadaPorResolucion=[]
            const get = async req => {
                    try {

                        const response = await axios.get(req, {
                              params : 
                              {
                                    cod_corte: this.user.cod_corte,
                                    cod_tribunal: this.user.cod_tribunal,
                                    anoInicio: this.fechas().anoInicio || this.$route.params.ano,
                                    mesInicio: this.fechas().mesInicio || this.$route.params.mes,
                                    anoFin: this.fechas().anoFin || this.$route.params.ano,
                                    mesFin: this.fechas().mesFin || this.$route.params.mes,
                                    exhorto: this.$route.params.exhorto,
                                    tipo: this.user.tipo
                                }
                        })

                        const data1 = response.data
                        let increment = 1
                        let objaudnorealizada
                         Object.values(data1.recordset).map((type) => {
                            objaudnorealizada = new Object();// creamos el objeto para asignarle cada elemento del result de consulta
                            objaudnorealizada.corte = type.corte
                            objaudnorealizada.tribunal = type.tribunal
                            objaudnorealizada.estado_audiencia = type.estado_audiencia
                            objaudnorealizada.motivo_audiencia = type.motivo_audiencia
                            objaudnorealizada.observacion = type.observacion
                            objaudnorealizada.fecha_evento = type.fecha_evento
                            objaudnorealizada.fecha_firma = type.fecha_firma
                            objaudnorealizada.fecha_digitacion = type.fecha_digitacion
                            objaudnorealizada.fecha_sistema = type.fecha_sistema
                            objaudnorealizada.estado_evento = type.estado_evento
                            objaudnorealizada.hitos = type.hitos
                            objaudnorealizada.despliegue = type.despliegue
                            objaudnorealizada.tipo_causa = type.tipo_causa
                            objaudnorealizada.increment = increment 
                            this.Query_reprogramadaPorResolucion.push(objaudnorealizada) 
                            increment ++  
                          }) 


                    }catch(errors) {
                        console.log(errors);
                    }  // fin try

            } // fin get
  
             get(req)
             this.setModal(false) // Aqui Manipulamos el modal


        },
        sentRequest(){
            this.setModal(true) // Aqui Manipulamos el modal
            const axios = require('axios')
            const req1 = url + '/penal/audienciasTiposNoRealizadas'
            let params = {}
            if(this.$route.params.ano){
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
             const get = async req1 => {
                    try {
                        const response = await axios.get(req1, {
                             params 
                        })

                    this.chartOptions.title.text =  'Estados de audiencias no realizadas' // Titulo del grafico de lineas
                    this.chartOptions.chart.height = 300
                    this.chartOptions.series = [] // Limpiamos las Series
                    this.chartOptions.plotOptions.pie.dataLabels.format =  '<b>{point.name}</b>: {point.y:.0f} ({point.percentage:.1f} %)'                           
                                       
                    
                    const data1 = response.data
                    const audiencias = []
                    let aux = 1 
                    this.tbody = [] 
                    const reprogramaAud = []
                    const reprogramaReso = [] 
                    var cantreprogramadaAud = 0
                    var cantreprogramadaResol = 0                 
                    
                    Object.values(data1.recordset).map((type) => {
                        audiencias.push({ name: type.gls_estaudiencia, y: type.cantidad })                                           
                    })  
                    
                     audiencias.map((type) => {
                        if(type.name == 'Reprogramada en Audiencia'){
                            reprogramaAud.push({ name: type.name, y: type.y,  color: '#2979ff'})
                            cantreprogramadaAud += type.y
                        }else{
                            reprogramaReso.push({ name: type.name, y: type.y,  color: '#2A3F54'})
                            cantreprogramadaResol += type.y
                        }            
                    }) 

                     this.tbody.push({ correlativo: 1,
                                        path:'PenalAudienciasDetallesNoRealizadas',
                                        gls_estaudiencia: 'Reprogramada Audiencia', 
                                        cantidad: this.$thousandSeparator(cantreprogramadaAud)
                                    },
                                    { correlativo: 2,
                                        path: 'PenalAudienciasDetallesNoRealizadas',
                                        gls_estaudiencia: 'Reprogramada por Resolución', 
                                        cantidad: this.$thousandSeparator(cantreprogramadaResol)
                                    }) 

                    this.chartOptions.series.push({
                        data: audiencias
                    })
                    
                    this.tableBody = data1.recordset
                    this.bodyExcelDetalles = data1.recordset               
                    
                    this.setModal(false) // Aqui Manipulamos el modal                     

               }catch(errors) {
                        console.log(errors);
                    }  // fin try
   
             } // fin de get

             get(req1)
        }
    },
    components:{
        ModalLoading,
        FiltrosCompetencias,
        highcharts: Chart
    }                
}
</script>