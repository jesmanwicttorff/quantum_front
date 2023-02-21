<template>
    <b-container fluid class="px-4">
        <v-row sm="12" class="mt-3" dense>
            <v-col>         
                <v-tabs v-model="tab" background-color="accent-4" centered>
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab href="#tab-1">Audiencia Juicio Oral (Jueces)</v-tab>
                    <v-tab href="#tab-2">Audiencia Juicio Oral (Salas)</v-tab>
                    <v-tab href="#tab-3">Otras Audiencias</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item id="tab-1">
                        <AudienciasJuecesRealizadasOrales />
                    </v-tab-item>
                    <v-tab-item id="tab-2">
                        <AudienciasSalasRealizadasOrales />
                    </v-tab-item>
                    <v-tab-item id="tab-3">
                        <AudienciasOtrasSalasRealizadasOrales />
                    </v-tab-item>                                        
                </v-tabs-items>
            </v-col>
        </v-row>
        <!-- <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="primary white--text">
                        Filtros
                        <v-spacer></v-spacer>
                        <v-btn  color="success" :href="this.urlquauntum" style="text-decoration:none">Volver</v-btn>                       
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
                <v-card>
                    <v-card-title class="headline"></v-card-title>
                    <v-card-actions class="px-6">
                        <v-row sm="12" dense>
                            <v-col cols="2">        
                                <vue-excel-xlsx class="mt-0 btn primary white--text text-center"
                                :data="bodyExcelDetalles"
                                :columns="headExcelDetalles"
                                :filename="'AudienciasDetalles'"
                                :sheetname="'Hoja1'"
                                >
                                    <b-icon-cloud-download>     
                                    </b-icon-cloud-download>
                                </vue-excel-xlsx>
                            </v-col>
                            <v-col cols="2" offset-md="8">
                                <v-btn  class="mt-0 btn primary white--text text-center" @click="detalles()">Ver detalle</v-btn>                                            
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
            </v-col>            
        </v-row>
        <template>
            <v-row justify="center" dense>
                <v-dialog
                    v-model="modalDetalles"
                    max-width="95%"
                >
                <v-card>
                    <v-card-title class="headline"></v-card-title>
                    <v-card-actions class="px-6">
                        <v-row dense>
                            <v-col > 
                                <v-btn
                                    class="primary"
                                    @click="modalDetalles = false"
                                > Cerrar
                                </v-btn>
                            </v-col>
                            <v-col offset="10">        
                                <vue-excel-xlsx class="mt-0 btn primary white--text text-center"
                                :data="bodyExcelDetallesModal"
                                :columns="headExcelDetallesModal"
                                :filename="'AudienciasDetalles'"
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
                            :headers="tableDetalleHeader"
                            :items="tableDetalleBody"
                            :page.sync="pageDetalle"
                            :items-per-page="itemsPerPageDetalle"
                            dense
                            hide-default-footer
                            @page-count="pageCountDetalle = $event"                                
                            class="mt-10">
                        </v-data-table>
                        <v-row justify="center"> 
                            <v-col cols="6">
                                <v-pagination v-model="pageDetalle" :length="pageCountDetalle"></v-pagination>
                            </v-col>
                        </v-row>                            
                    </v-card-text>
                </v-card>
                </v-dialog>
            </v-row>
        </template>          
        <ModalLoading />         -->
    </b-container>    
</template>
<script>
import { url } from '../../config/api'
import { quantum } from '../../config/quantum'
import store from 'store'
import ModalLoading from '../../components/elementos/ModalLoading'
import FiltrosCompetencias from '../../components/elementos/FiltrosCompetencias'
import AudienciasSalasRealizadasOrales from '../penal/AudienciasSalasRealizadasOrales'
import AudienciasJuecesRealizadasOrales from '../penal/AudienciasJuecesRealizadasOrales'
import AudienciasOtrasSalasRealizadasOrales from '../penal/AudienciaOtrasSalasRealizadasOrales'
import { Graph } from '../../config/Highcharts'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import loadDrillDown from 'highcharts/modules/drilldown'
import stockInit from 'highcharts/modules/stock'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'PenalAudienciasDetallesRealizadasOrales',
    data(){
        return {
            urlquauntum: quantum + '/penal_controller/totalesCorte/'+ store.get('cod_corte'),
            tab: null,
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
            page: 1,
            pageCount: 0,
            itemsPerPage: 10,            
            tableHeader: [
                { text: 'N°',  align: 'center', value: 'correlativo', class : 'primary white--text', width: '5%'},
                { text: 'T. Audiencia',  align: 'center', value: 'gls_despliegue', class : 'primary white--text', width: '50%'},
                { text: 'Cantidad',  align: 'center', value: 'cantidad', class : 'primary white--text', width: '15%' },
                { text: 'Promedio duración Prg',  align: 'center', value: 'duracion_programada', class : 'primary white--text', width: '15%' },
                { text: 'Promedio duración Real',  align: 'center', value: 'duracion_real', class : 'primary white--text', width: '15%' }
            ],
            tableBody: [],
            headExcelDetalles: [
                {
                    label: "N°",
                    field: "correlativo",
                },
                {
                    label: "T. Audiencia",
                    field: "gls_despliegue",
                },
                {
                    label: "Cantidad",
                    field: "cantidad",
                },
                {
                    label: "Promedio duración Prg",
                    field: "duracion_programada",
                },
                {
                    label: "Promedio duración Real",
                    field: "duracion_real",
                }                                                
            ],
            bodyExcelDetalles: [],
            modalDetalles: false,
            tableDetalleHeader: [
                { text: 'Tribunal',  align: 'center', value: 'gls_tribunal', class : 'primary white--text', width: '5%'},
                { text: 'T. Origen',  align: 'center', value: 'gls_tribunal_origen', class : 'primary white--text', width: '50%'},
                { text: 'T. Causa',  align: 'center', value: 'gls_tipo_causa', class : 'primary white--text', width: '15%' },
                { text: 'F. Inicio',  align: 'center', value: 'gls_formainicio', class : 'primary white--text', width: '15%' },
                { text: 'Rit',  align: 'center', value: 'rit', class : 'primary white--text', width: '15%' },
                { text: 'Fec. Ingreso',  align: 'center', value: 'fec_ingreso', class : 'primary white--text', width: '15%' },
                { text: 'Tip. Ingreso',  align: 'center', value: 'gls_tipo_ingreso', class : 'primary white--text', width: '15%' },
                { text: 'Tip. Audiencia',  align: 'center', value: 'gls_despliegue', class : 'primary white--text', width: '15%' },
                { text: 'Fec. Audiencia',  align: 'center', value: 'fec_evento', class : 'primary white--text', width: '15%' },
                { text: 'Hora. Ini Prg',  align: 'center', value: 'fec_inicioprg', class : 'primary white--text', width: '15%' },
                { text: 'Hora. Ter Prg',  align: 'center', value: 'fec_terminoprg', class : 'primary white--text', width: '15%' },
                { text: 'Hora. Ini Real',  align: 'center', value: 'fec_inicioreal', class : 'primary white--text', width: '15%' },
                { text: 'Hora. Ter Real',  align: 'center', value: 'fec_terminoreal', class : 'primary white--text', width: '15%' },
                { text: 'VIF',  align: 'center', value: 'vif', class : 'primary white--text', width: '15%' },
                { text: 'RPA',  align: 'center', value: 'rpa', class : 'primary white--text', width: '15%' },
                { text: 'TTD',  align: 'center', value: 'ttd', class : 'primary white--text', width: '15%' }                
            ],
            tableDetalleBody: [],            
            pageDetalle: 1,
            pageCountDetalle: 0,
            itemsPerPageDetalle: 10,
            headExcelDetallesModal: [
                {
                    label: "Tribunal",
                    field: "gls_tribunal",
                },
                {
                    label: "T. Origen",
                    field: "gls_tribunal_origen",
                },
                {
                    label: "T. Causa",
                    field: "gls_tipo_causa",
                },
                {
                    label: "F. Inicio",
                    field: "gls_formainicio",
                },
                {
                    label: "Rit",
                    field: "rit",
                },
                {
                    label: "Fec. Ingreso",
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
                    label: "Tip. Ingreso",
                    field: "gls_tipo_ingreso",
                }, 
                {
                    label: "Tip. Audiencia",
                    field: "gls_despliegue",
                },
                {
                    label: "Fec. Audiencia",
                    field: "fec_evento",
                },
                {
                    label: "Hora. Ini Prg",
                    field: "fec_inicioprg",
                },
                {
                    label: "Hora. Ter Prg",
                    field: "fec_terminoprg",
                },
                {
                    label: "Hora. Ini Real",
                    field: "fec_inicioreal",
                },
                {
                    label: "Hora. Ter Real",
                    field: "fec_terminoreal",
                }                                                                                                                                                                                 
            ],
            bodyExcelDetallesModal: [],                        
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
        // this.sentRequest()
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
                var req1 = url + ((Number(this.$route.params.tipo) == 13) ? '/penal/audienciasTiposRealizadas': '/penal/audienciasTiposRealizadasOrales')
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
                var req1 = url + ((Number(this.user.tipo) == 13) ? '/penal/audienciasTiposRealizadas': '/penal/audienciasTiposRealizadasOrales')
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
                    
                    this.chartOptions.title.text =  'Tipos de Audiencias' // Titulo del grafico de lineas
                    this.chartOptions.chart.height = 300
                    this.chartOptions.series = [] // Limpiamos las Series
                    this.chartOptions.plotOptions.pie.dataLabels.format =  '<b>{point.name}</b>: {point.y:.0f} ({point.percentage:.1f} %)'                           
                    this.tableBody = []  
                    this.bodyExcelDetalles = []                    
                    
                    const data1 = responses[0].data
                    const audiencias = []
                    let aux = 1                   
                    
                    Object.values(data1.recordset).map((type) => {
                        audiencias.push({ name: type.gls_despliegue, y: type.cantidad })
                        this.tableBody.push({
                            correlativo: type.correlativo,
                            gls_despliegue: type.gls_despliegue,
                            cantidad: this.$thousandSeparator(type.cantidad),
                            duracion_programada: type.duracion_programada,
                            duracion_real: type.duracion_real
                        })                                           
                    })
                    
                    this.chartOptions.series.push({
                        data: audiencias
                    })      

                    this.bodyExcelDetalles = data1.recordset               
                    
                    this.setModal(false) // Aqui Manipulamos el modal                     

                })).catch(errors => {
                    this.setModal(false) // Aqui Manipulamos el modal
            })                          
   
        },
        detalles(){
            this.setModal(true) // Aqui Manipulamos el modal      
            const axios = require('axios')
            var req1 = ''
            let params = {}
            if(this.$route.params.ano){
                var req1 = url + ((Number(this.$route.params.tipo) == 13) ? '/penal/audienciasTiposRealizadasDetalles': '/penal/audienciasTiposRealizadasOralesDetalles')
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
                var req1 = url + ((Number(this.user.tipo) == 13) ? '/penal/audienciasTiposRealizadasDetalles': '/penal/audienciasTiposRealizadasOralesDetalles')
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
                this.tableDetalleBody = []  
                this.bodyExcelDetallesModal = []
                 
                this.tableDetalleBody = data1.recordset
                this.bodyExcelDetallesModal = data1.recordset     

                this.setModal(false) // Aqui Manipulamos el modal
                this.modalDetalles = true
            })).catch(errors => {
                this.setModal(false) // Aqui Manipulamos el modal
            })

        }
    },
    components:{
        ModalLoading,
        FiltrosCompetencias,
        AudienciasSalasRealizadasOrales,
        AudienciasJuecesRealizadasOrales,
        AudienciasOtrasSalasRealizadasOrales,
        highcharts: Chart
    }                
}
</script>