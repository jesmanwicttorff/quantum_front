<template>
    <v-card>
        <v-card-title class="primary white--text">
            T&eacute;rminos Procedimientos
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col sm="12">
                    <ModalDetalle :tipoModal="this.tipoModal"/> 
                </v-col>
            </v-row>
        
            <v-row>
                <v-col sm="12">
                    <highcharts  :options="chartOptions" :constructor-type="'chart'" />
                </v-col>
            </v-row>
            <v-row class="px-8">
                    <v-col sm="12" class="py-0">        
                        <vue-excel-xlsx class="my-2 btn btn-primary"
                            :data="Query_Ingreso"
                            :columns="excelHead"
                            :filename="'Tipo_Procedimientos'"
                            :sheetname="'Hoja1'"
                        >
                            <b-icon-cloud-download>     
                            </b-icon-cloud-download>
                        </vue-excel-xlsx>
                    </v-col>
                </v-row>
            <v-row>
                <v-col sm="12">
                    <v-data-table 
                        :headers="headers"
                        :items="Query_Ingreso"
                        :sort-by="['cantidad']"
                        :sort-desc="[true]"
                        dense
                        class="mt-10 mytable">
                        <template v-slot:[`body`]="{ items }">
                            <tbody>
                            <tr v-for="item in items " :key="item.increment">
                                <td style ="text-align: center">{{ item.increment }}</td>
                                <td style ="text-align: center">{{ item.gls_procedimiento }}</td>
                                <td style ="text-align: center"><countTo class="count" :startVal="0" :endVal="item.cantidad" separator="." :duration="1000"></countTo></td>
                            </tr>
                            </tbody>
                            <tfoot>
                                <tr class="primary white--text">
                                    <th></th>
                                    <th style ="text-align: center">Total</th>
                                    <th style="text-align: center"><countTo class="count" :startVal="0" :endVal="total" separator="." :duration="1000"></countTo></th>
                                </tr>
                            </tfoot>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
            <ModalLoading/>  
        </v-card-text>      
    </v-card>
</template>
<script>

import ModalLoading from '../../components/elementos/ModalLoading'
import store from 'store'
import { url } from '../../config/api'
import { Graph } from '../../config/Highcharts'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import loadDrillDown from 'highcharts/modules/drilldown'
import stockInit from 'highcharts/modules/stock'
import countTo from 'vue-count-to'
import { mapState, mapMutations } from 'vuex'
import ModalDetalle from '../../views/laboral/ModalDetalles.vue'


loadDrillDown(HighCharts)
stockInit(HighCharts)
exporting(HighCharts)

export default {
    name: 'TerminosTipos',
    data () {
        return {
            user: [{
                usuario_id : store.get('user_usuario_id'), // Los parametros que obtenemos de la url
                cod_corte : store.get('cod_corte'),
                cod_tribunal : store.get('cod_tribunal'),
                ano : store.get('ano'),
                mes : store.get('mes')
            }],
            Query_Ingreso: [],        
            headers: [
                { text: '#',  align: 'center', value: 'increment', class : 'primary white--text', width: '10%'},
                { text: 'Tipo Procedimiento',  align: 'center', value: 'gls_procedimiento', class : 'primary white--text', width: '60%' },
                { text: 'Cantidad', align: 'center', value: 'cantidad', class : 'primary white--text', width: '30%' }
            ],
            excelHead : [{label: "#",               field: "increment"},
                        {label: "Tipo Procedimiento",     field:  "gls_procedimiento"},
                        {label: "Cantidad",         field:  "cantidad"}
            ],
            total : 0 , 
            chartOptions: JSON.parse(JSON.stringify(Graph['pie'][0])),
            tipoModal: "terminosProcedimientos"
        }
    },
    created(){
        this.consulta_ingreso();
    },
    components: {
        ModalLoading,
        highcharts: Chart,
        ModalDetalle,
        countTo,
    },  
    methods: { 
        ...mapMutations(['setModal']), // Mutations no Borrar
         
        consulta_ingreso() {
            this.setModal(true) // Aqui Manipulamos el modal
            const axios = require('axios')
            const req1 = url + '/laboral/terminos_procedimientos' 
            this.Query_Ingreso = []
            this.total = 0
           
              
            axios.all([
                    axios.get(req1, {
                    params: {
                        cod_corte: this.user[0].cod_corte,
                        cod_tribunal: this.user[0].cod_tribunal,
                        anoInicio: this.fechas.anoInicio,
                        mesInicio: this.fechas.mesInicio,
                        anoFin: this.fechas.anoFin,
                        mesFin: this.fechas.mesFin
                    }
                    })

                ]).then(axios.spread((...responses) => {

                    const data1 = responses[0].data
                    let objTermino;
                    let increment = 1
                    let dataTable = []
                    this.chartOptions.series = []

                    // Transformo los datos al formato en  porcentaje 
                    this.chartOptions.plotOptions.pie.dataLabels.format =  '<b>{point.name}</b>: {point.percentage:.1f} % ({point.y:.0f})';
                   
                    Object.values(data1.recordset).map((type) => {

                        objTermino = new Object();// creamos el objeto para asignarle cada elemento del result de consulta
                        objTermino.increment = increment
                        objTermino.gls_procedimiento = type.gls_procedimiento
                        objTermino.cantidad = type.cantidad
                        this.total = this.total + type.cantidad

                        dataTable.push({ name: type.gls_procedimiento, y: type.cantidad})
                        this.Query_Ingreso.push(objTermino)
                        increment ++ 
                    })

                    this.chartOptions.series.push({
                        data: dataTable,
                        name: '',
                        colorByPoint: true
                    })

                    this.setModal(false) // Aqui Manipulamos el modal                     

                })).catch(errors => {
                    this.setModal(false) // Aqui Manipulamos el modal 
                    console.log(errors)
                })
            
        }  
    },
    computed: {
        ...mapState(['fechas'])
    },
    watch: {
        fechas () {
            this.consulta_ingreso()
        }
    }
} 
</script>