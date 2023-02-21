<template>
    <b-container fluid>
        <v-row>
            <v-col md="12">
                <v-row>
                    <v-col>        
                        <vue-excel-xlsx class="mt-0 btn primary white--text text-center"
                        :data="bodyExcelDetalles"
                        :columns="headExcelDetalles"
                        :filename="'EscritosDetalles'"
                        :sheetname="'Hoja1'"
                        >
                        <b-icon-cloud-download>     
                        </b-icon-cloud-download>
                        </vue-excel-xlsx>
                    </v-col>
                </v-row>                
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
            </v-col>
        </v-row>
    </b-container>
</template>
<script>
import { url } from '../../config/api'
import { quantum } from '../../config/quantum'
import store from 'store'
import ModalLoading from '../../components/elementos/ModalLoading'
import { Graph } from '../../config/Highcharts'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import loadDrillDown from 'highcharts/modules/drilldown'
import stockInit from 'highcharts/modules/stock'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'ModalEscritosDetalles',
    data(){
        return{
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
            bodyExcelDetalles: []
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
            const req1 = url + ((this.$route.params.tipo == 13) ? '/penal/escritosDetalles' : '/penal/escritosDetallesOrales')   
            axios.all([
                    axios.get(req1, {
                        params: {
                            cod_corte: this.user.cod_corte,
                            cod_tribunal: this.user.cod_tribunal,
                            anoInicio: this.fechas().anoInicio || this.$route.params.ano,
                            mesInicio: this.fechas().mesInicio || this.$route.params.mes,
                            anoFin: this.fechas().anoFin || this.$route.params.ano,
                            mesFin: this.fechas().mesFin || this.$route.params.mes,
                            exhorto: this.fechas().exhorto || this.$route.params.exhorto
                        }
                    })
                ]).then(axios.spread((...responses) => {            
                    const data = responses[0].data.recordset
                    this.tableBody = []
                    this.bodyExcelDetalles = []
                    this.tableBody = data
                    this.bodyExcelDetalles = data
                    this.setModal(false) // Aqui Manipulamos el modal
            })).catch(errors => {
                this.setModal(false) // Aqui Manipulamos el modal
            })
            
        }
    }        
}
</script>