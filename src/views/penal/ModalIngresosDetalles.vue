<template>
    <b-container fluid class="px-4">
    <v-row>
        <v-col>       
            <v-tabs v-model="tab" background-color="accent-4" centered>
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#tab-1">Tipo de Causa</v-tab>
                <v-tab href="#tab-2">Tipo de Procedimiento</v-tab>
                <v-tab href="#tab-3">Tipo de Materia</v-tab>
                <v-tab href="#tab-4" v-if="this.$route.params.tipo == 13 || user.tipo == 13" >Tipo de Solicitud</v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item id="tab-1">
                    <v-card class="py-1">
                        <v-card-title class="primary white--text">  
                        </v-card-title>
                        <v-card-text>
                            <v-col sm="12" class="px-8">
                                <v-btn  color="primary" @click="detallesTipos(0)">
                                    Detalles Ingresos
                                </v-btn>
                            </v-col>
                            <v-col sm="12">
                                <highcharts  :options="chartOptions" :constructor-type="'chart'" class="mt-2" />
                            </v-col>
                            <v-row>
                                <v-col sm="12" class="px-12">
                                    <v-col sm="12" class="py-0">        
                                        <vue-excel-xlsx class="my-2 btn primary white--text text-center"
                                        :data="tbodyTipoCausa"
                                        :columns="excelTipoCausa"
                                        :filename="'Ingresos'"
                                        :sheetname="'Hoja1'"
                                        >
                                            <b-icon-cloud-download>     
                                            </b-icon-cloud-download>
                                        </vue-excel-xlsx>
                                    </v-col>                           
                                    <v-simple-table dense>
                                        <template>
                                            <thead>
                                                <tr>
                                                    <th v-for="item in headTipoCausa" :key="item.index" class="primary white--text text-center">{{ item.text }}</th>  
                                                </tr>                
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in tbodyTipoCausa"  :key="index">                                   
                                                    <td class="primary--text text-center">{{ item.increment }}</td>
                                                    <td class="primary--text text-center">{{ item.gls_tipo_causa }}</td>
                                                    <td class="primary--text text-center" @click="detallesTipos(item.tipo_causa_id)">{{ $thousandSeparator(item.cantidad) }}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th v-for="item in tfootTipoCausa" :key="item.index" class="primary white--text text-center">{{ item.text }}</th>  
                                                </tr>                             
                                            </tfoot>
                                        </template>
                                    </v-simple-table>
                                </v-col>
                            </v-row> 
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item id="tab-2">
                    <v-card class="py-1">
                        <v-card-title class="primary white--text">  
                        </v-card-title>
                        <v-card-text>
                            <v-col sm="12" class="px-8">
                                <v-btn  color="primary" @click="detallesProcedimientos(0)">
                                    Detalles Procedimientos
                                </v-btn>
                            </v-col>
                            <v-col sm="12">
                                <highcharts  :options="chartOptionsTwo" :constructor-type="'chart'" class="mt-2" />
                            </v-col>
                            <v-row>
                                <v-col sm="12" class="px-12">
                                    <v-col sm="12" class="py-0">        
                                        <vue-excel-xlsx class="my-2 btn primary white--text text-center"
                                        :data="tbodyProcedimiento"
                                        :columns="excelProcedimiento"
                                        :filename="'Ingresos'"
                                        :sheetname="'Hoja1'"
                                        >
                                            <b-icon-cloud-download>     
                                            </b-icon-cloud-download>
                                        </vue-excel-xlsx>
                                    </v-col>                           
                                    <v-simple-table dense>
                                        <template>
                                            <thead>
                                                <tr>
                                                    <th v-for="item in headProcedimiento" :key="item.index" class="primary white--text text-center">{{ item.text }}</th>  
                                                </tr>                
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in tbodyProcedimiento"  :key="index">                                   
                                                    <td class="primary--text text-center">{{ item.increment }}</td>
                                                    <td class="primary--text text-center">{{ item.gls_procedimiento }}</td>
                                                    <td class="primary--text text-center" @click="detallesProcedimientos(item.procedimiento_id)">{{ $thousandSeparator(item.cantidad) }}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th v-for="item in tfootProcedimiento" :key="item.index" class="primary white--text text-center">{{ item.text }}</th>  
                                                </tr>                             
                                            </tfoot>
                                        </template>
                                    </v-simple-table>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>                                        
                </v-tab-item> 
                <v-tab-item id="tab-3">
                    <v-card class="py-1">
                        <v-card-title class="primary white--text">  
                        </v-card-title>
                        <v-card-text>                    
                            <v-col sm="12" class="px-8">
                                <v-btn  color="primary" @click="detallesMaterias(0)">
                                    Detalles Materias
                                </v-btn>
                            </v-col>                    
                            <v-col sm="12">
                                <highcharts  :options="chartOptionsTree" :constructor-type="'chart'" class="mt-2" />
                            </v-col>
                            <v-row>
                                <v-col sm="12" class="px-12">
                                    <v-col sm="12" class="py-0">        
                                        <vue-excel-xlsx class="my-2 btn primary white--text text-center"
                                        :data="tbodyMateria"
                                        :columns="excelMateria"
                                        :filename="'Ingresos'"
                                        :sheetname="'Hoja1'"
                                        >
                                            <b-icon-cloud-download>     
                                            </b-icon-cloud-download>
                                        </vue-excel-xlsx>
                                    </v-col>                           
                                    <v-simple-table 
                                    dense>
                                        <template>
                                            <thead>
                                                <tr>
                                                    <th v-for="item in headMateria" :key="item.index" class="primary white--text text-center">{{ item.text }}</th>  
                                                </tr>                
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in tbodyMateria"  :key="index">                                   
                                                    <td class="primary--text text-center">{{ item.increment }}</td>
                                                    <td class="primary--text text-center">{{ item.gls_materia }}</td>
                                                    <td class="primary--text text-center" @click="detallesMaterias(item.materia_id)">{{ $thousandSeparator(item.cantidad) }}</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th v-for="item in tfootMateria" :key="item.index" class="primary white--text text-center">{{ item.text }}</th>  
                                                </tr>                             
                                            </tfoot>
                                        </template>
                                    </v-simple-table>
                                </v-col>
                            </v-row>                            
                        </v-card-text>
                    </v-card>                     
                </v-tab-item>
                <v-tab-item id="tab-4">
                    <IngresosSolicitudesDetalles v-if="this.$route.params.tipo == 13 || user.tipo == 13" />        
                </v-tab-item>                
            </v-tabs-items>            
            <!--<ModalLoading/>-->
            <template>
                <v-row justify="center">
                    <v-dialog
                        v-model="dialog"
                        max-width="1200px"
                    >
                    <v-card>
                        <v-card-title class="headline"></v-card-title>
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
                </v-row>
            </template>            
        </v-col>
    </v-row>        
    </b-container>
</template>
<script>
import { url } from '../../config/api'
import { quantum } from '../../config/quantum'
import store from 'store'
import ModalLoading from '../../components/elementos/ModalLoading'
import FiltrosCompetencias from '../../components/elementos/FiltrosCompetencias'
import IngresosSolicitudesDetalles from '../../views/penal/IngresosSolicitudesDetalles'
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
    name: 'ModalIngresosDetalles',
    data(){
        return{
            tab: null,
            dialog: false,
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,            
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
            chartOptionsTwo: JSON.parse(JSON.stringify(Graph['pie'][0])),
            chartOptionsTree: JSON.parse(JSON.stringify(Graph['pie'][0])),
            headTipoCausa: [
                { text: '#',  align: 'center', value: 'increment', class : 'primary white--text', width: '10%'},
                { text: 'Tipo Causa',  align: 'center', value: 'gls_tipo_causa', class : 'primary white--text', width: '60%' },
                { text: 'Cantidad', align: 'center', value: 'cantidad', class : 'primary white--text', width: '30%' }
            ],
            tbodyTipoCausa: [],
            tfootTipoCausa: [
                { text: 'Total',  align: 'center', value: 'increment', class : 'primary white--text', width: '10%'},
                { text: '',  align: 'center', value: 'gls_tipo_causa', class : 'primary white--text', width: '60%' },
                { text: 0, align: 'center', value: 0, class : 'primary white--text', width: '30%' }
            ],
            excelTipoCausa:[
                {
                    label: "#",
                    field: "increment",
                },
                {
                    label: "Tipo Causa",
                    field: "gls_tipo_causa",
                },
                {
                    label: "Cantidad",
                    field: "cantidad",
                },         
            ],
            tipo_causa_id: 0,
            headProcedimiento: [
                { text: '#',  align: 'center', value: 'increment', class : 'primary white--text', width: '10%'},
                { text: 'Tipo Procedimiento',  align: 'center', value: 'gls_procedimiento', class : 'primary white--text', width: '60%' },
                { text: 'Cantidad', align: 'center', value: 'cantidad', class : 'primary white--text', width: '30%' }
            ],
            tbodyProcedimiento: [],
            tfootProcedimiento: [
                { text: 'Total',  align: 'center', value: 'increment', class : 'primary white--text', width: '10%'},
                { text: '',  align: 'center', value: 'gls_procedimiento', class : 'primary white--text', width: '60%' },
                { text: 0, align: 'center', value: 0, class : 'primary white--text', width: '30%' }
            ],
            excelProcedimiento:[
                {
                    label: "#",
                    field: "increment",
                },
                {
                    label: "Tipo Procedimiento",
                    field: "gls_procedimiento",
                },
                {
                    label: "Cantidad",
                    field: "cantidad",
                },         
            ],
            procedimiento_id: 0,            
            headMateria: [
                { text: '#',  align: 'center', value: 'increment', class : 'primary white--text', width: '10%'},
                { text: 'Tipo Materia',  align: 'center', value: 'gls_materia', class : 'primary white--text', width: '60%' },
                { text: 'Cantidad', align: 'center', value: 'cantidad', class : 'primary white--text', width: '30%' }
            ],            
            tbodyMateria: [],
            tfootMateria: [
                { text: 'Total',  align: 'center', value: 'increment', class : 'primary white--text', width: '10%'},
                { text: '',  align: 'center', value: 'gls_materia', class : 'primary white--text', width: '60%' },
                { text: 0, align: 'center', value: 0, class : 'primary white--text', width: '30%' }
            ],
            excelMateria:[
                {
                    label: "#",
                    field: "increment",
                },
                {
                    label: "Tipo Procedimiento",
                    field: "gls_materia",
                },
                {
                    label: "Cantidad",
                    field: "cantidad",
                },         
            ],
            tableHeader: [],
            tableBody: [],
            headExcelDetalles: [],
            bodyExcelDetalles: [],
            materia_id: 0,
            urlquauntum: quantum + '/penal_controller/totalesCorte/'+ store.get('cod_corte')            
        }
    },
    beforeCreate(){
        if(this.$route.params.ano){
            store.set('ano',this.$route.params.ano)
            store.set('mes',this.$route.params.mes)
            store.set('tipo',this.$route.params.tipo)
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
            
            this.setModal(true) // Aqui Manipulamos el modal
            const axios = require('axios')
            const req1 = url + '/penal/ingresosTipos'
            const req2 = url + '/penal/ingresosProcedimientos'
            const req3 = url + '/penal/ingresosMaterias'
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

                    let dataTable1 = []
                    let dataTable2 = []
                    let dataTable3 = []

                    let increment = 1
                    this.tbodyTipoCausa = []
                    this.tfootTipoCausa[2].text = 0
                    this.tbodyProcedimiento = []
                    this.tfootProcedimiento[2].text = 0                    
                    this.tbodyMateria = []
                    this.tfootMateria[2].text = 0      

                    Object.values(data1.recordset).map((type) => {
                        dataTable1.push({ name: type.gls_tipo_causa, y: type.cantidad})
                        this.tbodyTipoCausa.push({ increment: increment, gls_tipo_causa: type.gls_tipo_causa, cantidad: type.cantidad, tipo_causa_id: type.tipo_causa_id})
                        this.tfootTipoCausa[2].text += type.cantidad
                        increment ++
                    })
                    
                    this.tfootTipoCausa[2].text = this.$thousandSeparator(this.tfootTipoCausa[2].text)

                    increment = 1
                    Object.values(data2.recordset).map((type) => {
                        dataTable2.push({ name: type.gls_procedimiento, y: type.cantidad})
                        this.tbodyProcedimiento.push({ increment: increment, gls_procedimiento: type.gls_procedimiento, cantidad: type.cantidad, procedimiento_id: type.procedimiento_id})
                        this.tfootProcedimiento[2].text += type.cantidad
                        increment ++                        
                    })

                    this.tfootProcedimiento[2].text = this.$thousandSeparator(this.tfootProcedimiento[2].text)
                    
                    increment = 1                    
                    Object.values(data3.recordset).map((type) => {
                        dataTable3.push({ name: type.gls_materia, y: type.cantidad})
                        this.tbodyMateria.push({ increment: increment, gls_materia: type.gls_materia, cantidad: type.cantidad, tipo_causa_id: type.tipo_causa_id})
                        this.tfootMateria[2].text += type.cantidad
                        increment ++                                 
                    })   

                    this.tfootMateria[2].text = this.$thousandSeparator(this.tfootMateria[2].text)
                    

                    this.chartOptions.title.text =  'Ingresos por Tipo de Causas' // Titulo del grafico de lineas
                    this.chartOptions.title.align = 'center' // Centramos el titulo de Grafico
                    this.chartOptions.chart.height = 400
                    this.chartOptions.series = [] // Limpiamos las Series
                    this.chartOptions.plotOptions.pie.dataLabels.format =  '<b>{point.name}</b>: {point.y:.0f} ({point.percentage:.1f} %)'

                    this.chartOptionsTwo.title.text =  'Ingresos por Tipo de Procedimiento' // Titulo del grafico de lineas
                    this.chartOptionsTwo.title.align = 'center' // Centramos el titulo de Grafico
                    this.chartOptionsTwo.chart.height = 400
                    this.chartOptionsTwo.series = [] // Limpiamos las Series
                    this.chartOptionsTwo.plotOptions.pie.dataLabels.format =  '<b>{point.name}</b>: {point.y:.0f} ({point.percentage:.1f} %)'
                    
                    this.chartOptionsTree.title.text =  'Ingresos por Tipo de Materias' // Titulo del grafico de lineas
                    this.chartOptionsTree.title.align = 'center' // Centramos el titulo de Grafico
                    this.chartOptionsTree.chart.height = 400
                    this.chartOptionsTree.series = [] // Limpiamos las Series
                    this.chartOptionsTree.plotOptions.pie.dataLabels.format =  '<b>{point.name}</b>: {point.y:.0f} ({point.percentage:.1f} %)'
                       
                    this.chartOptions.series.push({
                        data: dataTable1,
                        name: '',
                        colorByPoint: true
                    })

                    this.chartOptionsTwo.series.push({
                        data: dataTable2,
                        name: '',
                        colorByPoint: true
                    })

                    this.chartOptionsTree.series.push({
                        data: dataTable3,
                        name: '',
                        colorByPoint: true
                    })           
                    
                    this.setModal(false) // Aqui Manipulamos el modal                     

                })).catch(errors => {

            })            
        },
        detallesTipos(tipo_causa_id = 0){
             
            this.setModal(true) // Aqui Manipulamos el modal
            this.tipo_causa_id = tipo_causa_id            
            const axios = require('axios')
            const req1 = url + '/penal/ingresosTiposDetalles'
            axios.all([
                    axios.get(req1, {
                        params: {
                            cod_corte: this.user.cod_corte,
                            cod_tribunal: this.user.cod_tribunal,
                            anoInicio: this.fechas().anoInicio,
                            mesInicio: this.fechas().mesInicio,
                            anoFin: this.fechas().anoFin,
                            mesFin: this.fechas().mesFin,
                            exhorto: this.fechas().exhorto,
                            tipo_causa_id: this.tipo_causa_id
                        }
                    })
            ]).then(axios.spread((...responses) => {
                const data = responses[0].data.recordset
                this.tableBody = []
                this.bodyExcelDetalles = []
                this.tableHeader = [
                    { text: 'Tribunal',  align: 'left', value: 'gls_tribunal', class : 'primary white--text', width: '30%'},
                    { text: 'T. Origen',  align: 'left', value: 'gls_tribunal_origen', class : 'primary white--text', width: '30%'},
                    { text: 'Tipo Causa',  align: 'center', value: 'gls_tipo_causa', class : 'primary white--text', width: '15%' },
                    { text: 'F. Inicio', align: 'center', value: 'gls_formainicio', class : 'primary white--text', width: '15%' },
                    { text: 'Est. Causa', align: 'center', value: 'gls_estrelacion', class : 'primary white--text', width: '15%' },
                    { text: 'Rit', align: 'center', value: 'rit', class : 'primary white--text', width: '15%' },  
                    { text: 'F. Ingreso', align: 'center', value: 'fec_ingreso', class : 'primary white--text', width: '15%' }, 
                    { text: 'VIF', align: 'center', value: 'vif', class : 'primary white--text', width: '10%' },
                    { text: 'RPA', align: 'center', value: 'rpa', class : 'primary white--text', width: '10%' },
                    { text: 'TTD', align: 'center', value: 'ttd', class : 'primary white--text', width: '10%' },
                    { text: 'T. Ingreso', align: 'center', value: 'gls_tipo_ingreso', class : 'primary white--text', width: '10%' }
                ]

                this.headExcelDetalles = [
                    {
                        label: "Tribunal",
                        field: "gls_tribunal",
                    },
                    {
                        label: "T. Origen",
                        field: "gls_tribunal_origen",
                    },
                    {
                        label: "Tipo Causa",
                        field: "gls_tipo_causa",
                    },
                    {
                        label: "F. Inicio",
                        field: "gls_formainicio",
                    },
                    {
                        label: "Est. Causa",
                        field: "gls_estrelacion",
                    },
                    {
                        label: "Rit",
                        field: "rit",
                    },
                    {
                        label: "F. Ingreso",
                        field: "fec_ingreso",
                    },
                    {
                        label: "VIF",
                        field: "vif",
                    },
                    {
                        label: "RPA",
                        field: "rpa",
                    },
                    {
                        label: "TTD",
                        field: "ttd",
                    },
                    {
                        label: "T. Ingreso",
                        field: "gls_tipo_ingreso",
                    }                      
                ]

                this.setModal(false)
                this.dialog = true
                this.tableBody = data
                this.bodyExcelDetalles = data

            })).catch(errors => {

            })
        },
        detallesProcedimientos(procedimiento_id = 0){
            this.setModal(true) // Aqui Manipulamos el modal
            this.procedimiento_id = procedimiento_id            
            const axios = require('axios')
            const req1 = url + '/penal/ingresosProcedimientosDetalles'
            axios.all([
                    axios.get(req1, {
                        params: {
                            cod_corte: this.user.cod_corte,
                            cod_tribunal: this.user.cod_tribunal,
                            anoInicio: this.fechas().anoInicio,
                            mesInicio: this.fechas().mesInicio,
                            anoFin: this.fechas().anoFin,
                            mesFin: this.fechas().mesFin,
                            exhorto: this.fechas().exhorto,
                            procedimiento_id: this.procedimiento_id
                        }
                    })
            ]).then(axios.spread((...responses) => {
                const data = responses[0].data.recordset
                this.tableBody = []
                this.bodyExcelDetalles = []
                this.tableHeader = [
                    { text: 'Tribunal',  align: 'left', value: 'gls_tribunal', class : 'primary white--text', width: '30%'},
                    { text: 'T. Origen',  align: 'left', value: 'gls_tribunal_origen', class : 'primary white--text', width: '30%'},
                    { text: 'Tipo Causa',  align: 'center', value: 'gls_tipo_causa', class : 'primary white--text', width: '15%' },
                    { text: 'F. Inicio', align: 'center', value: 'gls_formainicio', class : 'primary white--text', width: '15%' },
                    { text: 'Procedimiento', align: 'center', value: 'gls_procedimiento', class : 'primary white--text', width: '15%' },                    
                    { text: 'Est. Causa', align: 'center', value: 'gls_estrelacion', class : 'primary white--text', width: '15%' },
                    { text: 'Rit', align: 'center', value: 'rit', class : 'primary white--text', width: '15%' },  
                    { text: 'F. Ingreso', align: 'center', value: 'fec_ingreso', class : 'primary white--text', width: '15%' }, 
                    { text: 'VIF', align: 'center', value: 'vif', class : 'primary white--text', width: '10%' },
                    { text: 'RPA', align: 'center', value: 'rpa', class : 'primary white--text', width: '10%' },
                    { text: 'TTD', align: 'center', value: 'ttd', class : 'primary white--text', width: '10%' },
                    { text: 'T. Ingreso', align: 'center', value: 'gls_tipo_ingreso', class : 'primary white--text', width: '10%' }
                ]

                this.headExcelDetalles = [
                    {
                        label: "Tribunal",
                        field: "gls_tribunal",
                    },
                    {
                        label: "T. Origen",
                        field: "gls_tribunal_origen",
                    },
                    {
                        label: "Tipo Causa",
                        field: "gls_tipo_causa",
                    },
                    {
                        label: "F. Inicio",
                        field: "gls_formainicio",
                    },
                    {
                        label: "Procedimiento",
                        field: "gls_procedimiento",
                    },                    
                    {
                        label: "Est. Causa",
                        field: "gls_estrelacion",
                    },
                    {
                        label: "Rit",
                        field: "rit",
                    },
                    {
                        label: "F. Ingreso",
                        field: "fec_ingreso",
                    },
                    {
                        label: "VIF",
                        field: "vif",
                    },
                    {
                        label: "RPA",
                        field: "rpa",
                    },
                    {
                        label: "TTD",
                        field: "ttd",
                    },
                    {
                        label: "T. Ingreso",
                        field: "gls_tipo_ingreso",
                    }                      
                ]

                this.setModal(false)
                this.dialog = true
                this.tableBody = data
                this.bodyExcelDetalles = data

            })).catch(errors => {

            })
        },
        detallesMaterias(materia_id = 0){
            
            this.setModal(true) // Aqui Manipulamos el modal
            this.materia_id = materia_id            
            const axios = require('axios')
            const req1 = url + '/penal/ingresosMateriasDetalles'
            axios.all([
                    axios.get(req1, {
                        params: {
                            cod_corte: this.user.cod_corte,
                            cod_tribunal: this.user.cod_tribunal,
                            anoInicio: this.fechas().anoInicio,
                            mesInicio: this.fechas().mesInicio,
                            anoFin: this.fechas().anoFin,
                            mesFin: this.fechas().mesFin,
                            exhorto: this.fechas().exhorto,
                            materia_id: this.materia_id
                        }
                    })
            ]).then(axios.spread((...responses) => {
                const data = responses[0].data.recordset
                this.tableBody = []
                this.bodyExcelDetalles = []
                this.tableHeader = [
                    { text: 'Tribunal',  align: 'left', value: 'gls_tribunal', class : 'primary white--text', width: '30%'},
                    { text: 'T. Origen',  align: 'left', value: 'gls_tribunal_origen', class : 'primary white--text', width: '30%'},
                    { text: 'Tipo Causa',  align: 'center', value: 'gls_tipo_causa', class : 'primary white--text', width: '15%' },
                    { text: 'F. Inicio', align: 'center', value: 'gls_formainicio', class : 'primary white--text', width: '15%' },
                    { text: 'Agrupador', align: 'center', value: 'gls_agrupmateria', class : 'primary white--text', width: '15%' },
                    { text: 'Materia', align: 'center', value: 'gls_materia', class : 'primary white--text', width: '15%' },
                    { text: 'Procedimiento', align: 'center', value: 'gls_procedimiento', class : 'primary white--text', width: '15%' },
                    { text: 'Est. Causa', align: 'center', value: 'gls_estrelacion', class : 'primary white--text', width: '15%' },
                    { text: 'Rit', align: 'center', value: 'rit', class : 'primary white--text', width: '15%' },  
                    { text: 'F. Ingreso', align: 'center', value: 'fec_ingreso', class : 'primary white--text', width: '15%' }, 
                    { text: 'VIF', align: 'center', value: 'vif', class : 'primary white--text', width: '10%' },
                    { text: 'RPA', align: 'center', value: 'rpa', class : 'primary white--text', width: '10%' },
                    { text: 'TTD', align: 'center', value: 'ttd', class : 'primary white--text', width: '10%' },
                    { text: 'T. Ingreso', align: 'center', value: 'gls_tipo_ingreso', class : 'primary white--text', width: '10%' }
                ]

                this.headExcelDetalles = [
                    {
                        label: "Tribunal",
                        field: "gls_tribunal",
                    },
                    {
                        label: "T. Origen",
                        field: "gls_tribunal_origen",
                    },
                    {
                        label: "Tipo Causa",
                        field: "gls_tipo_causa",
                    },
                    {
                        label: "F. Inicio",
                        field: "gls_formainicio",
                    },
                    {
                        label: "Agrupador",
                        field: "gls_agrupmateria",
                    },
                    {
                        label: "Materia",
                        field: "gls_materia",
                    },
                    {
                        label: "Procedimiento",
                        field: "gls_procedimiento",
                    },                    
                    {
                        label: "Est. Causa",
                        field: "gls_estrelacion",
                    },
                    {
                        label: "Rit",
                        field: "rit",
                    },
                    {
                        label: "F. Ingreso",
                        field: "fec_ingreso",
                    },
                    {
                        label: "VIF",
                        field: "vif",
                    },
                    {
                        label: "RPA",
                        field: "rpa",
                    },
                    {
                        label: "TTD",
                        field: "ttd",
                    },
                    {
                        label: "T. Ingreso",
                        field: "gls_tipo_ingreso",
                    }                      
                ]

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
        FiltrosCompetencias,
        IngresosSolicitudesDetalles,
        highcharts: Chart
    }
}
</script>