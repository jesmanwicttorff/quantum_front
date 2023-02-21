<template>
    <b-container fluid>
        <v-row>
            <v-col md="12">
                <v-row>
                    <v-col>        
                        <vue-excel-xlsx class="mt-0 btn primary white--text text-center"
                        :data="bodyExcelDetalles"
                        :columns="headExcelDetalles"
                        :filename="'TerminosDetalles'"
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
                    class="mt-10"
                    calculate-widths>
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
    name: 'ModalTerminos',
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
                        { text: 'Rit', align: 'center', value: 'Rit', class : 'primary white--text' }, 
                        { text: 'T Causa', align: 'center', value: 'Tipo Causa', class : 'primary white--text' },                                                    
                        { text: 'F. Ingreso', align: 'center', value: 'F. Ingreso', class : 'primary white--text' },
                        { text: 'Est. Causa', align: 'center', value: 'Est. Causa', class : 'primary white--text' },
                        { text: 'T. Termino', align: 'center', value: 'gls_hitoact', class : 'primary white--text' },
                        { text: 'Tip Ingreso', align: 'center', value: 'T. Ingreso', class : 'primary white--text' },
                        { text: 'F. Termino', align: 'center', value: 'fec_evento', class : 'primary white--text' },                        
                        { text: 'VIF', align: 'center', value: 'VIF', class : 'primary white--text' },
                        { text: 'RPA', align: 'center', value: 'RPA', class : 'primary white--text' },
                        { text: 'TTD', align: 'center', value: 'TTD', class : 'primary white--text' },    
                        { text: 'F. Inicio', align: 'center', value: 'F. Inicio', class : 'primary white--text' }                            
            ],
            tableBody: [],
            headExcelDetalles: [
                    {
                        label: "Rit",
                        field: "Rit",
                    },
                    {
                        label: "T. Causa",
                        field: "Tipo Causa",
                    },                    
                    {
                        label: "F. Ingreso",
                        field: "F. Ingreso",
                    },
                    {
                        label: "Est. Causa",
                        field: "Est. Causa",
                    },    
                    {
                        label: "T. Termino",
                        field: "gls_hitoact",
                    },
                    {
                        label: "Tip Ingreso",
                        field: "T. Ingreso",
                    },                      
                    {
                        label: "F. Termino",
                        field: "fec_evento",
                    },
                    {
                        label: "VIF",
                        field: "VIF",
                    },
                    {
                        label: "RPA",
                        field: "RPA",
                    },
                    {
                        label: "TTD",
                        field: "TTD",
                    },                    
                    {
                        label: "F. Inicio",
                        field: "F. Inicio",
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
            const req1 = url + ((this.$route.params.tipo == 13) ? '/penal/terminosDetalles' : '/penal/terminosDetallesOrales')   
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