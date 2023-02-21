<template>
    <v-container>
            <v-row>
                <v-col sm="12">
                    <!-- <ModalDetalleIngresos/>  -->
                </v-col> 
            </v-row>
            <v-row>
                <v-col sm="12">
                    <highcharts  :options="chartOptions" :constructor-type="'chart'" />
                </v-col>
            </v-row>
                <v-row class="px-8">
                    <v-col sm="12" class="py-0">        
                        <vue-excel-xlsx class="btn btn-primary"
                            :data="Query_Ingreso"
                            :columns="excelHead"
                            :filename="'Resoluciones_Nomenclaturas'"
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
                        dense>
                        <template v-slot:[`body`]="{ items }">
                            <tbody>
                            <tr v-for="item in items " :key="item.increment">
                                <td style ="text-align: center">{{ item.increment }}</td>
                                <td style ="text-align: center">{{ item.gls_nomenclatura }}</td>
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
    </v-container> 
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
import { mapState, mapMutations } from 'vuex'
import countTo from 'vue-count-to'


loadDrillDown(HighCharts)
stockInit(HighCharts)
exporting(HighCharts)

export default {
    name: 'ResolucionesNomenclaturas',
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
                { text: 'Nomenclatura',  align: 'center', value: 'gls_nomenclatura', class : 'primary white--text', width: '60%' },
                { text: 'Cantidad', align: 'center', value: 'cantidad', class : 'primary white--text', width: '30%' },
              ],
            excelHead : [
                {
                    label: "#",
                    field: "increment",

                },

                {
                
                    label: "Tipo Causa",
                    field:  "gls_nomenclatura",
  
                },


                {
                
                    label: "Cantidad",
                    field:  "cantidad",
  
                },

                 {
                    label: "Total",
                    field: "totales",
                }

                                                                                                                                                                                               
            ],

            total : 0 ,
            chartOptions: JSON.parse(JSON.stringify(Graph['pie'][0])),
        }
    },
    created(){
        this.consulta_ingreso();
    },
    components: {
        // FiltrosCompetencias,
        ModalLoading,
        highcharts: Chart,
        countTo
    },  
    methods: { 
        ...mapMutations(['setModal']), // Mutations no Borrar
 
        consulta_ingreso() {
            this.setModal(true) // Aqui Manipulamos el modal
            const axios = require('axios')
            const req1 = url + '/laboral/resoluciones_nomenclaturas_total' 
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
                    let objIngreso;
                    let increment = 1
                    this.chartOptions.series = []
                    this.chartOptions.plotOptions.pie.dataLabels.format =  '<b>{point.name}</b>: {point.percentage:.1f} % ({point.y:.0f})';
                    let dataTable = []
                   
                    Object.values(data1.recordset).map((type) => {

                        objIngreso = new Object();// creamos el objeto para asignarle cada elemento del result de consulta
                        objIngreso.increment = increment
                        objIngreso.gls_nomenclatura = type.gls_nomenclatura
                        objIngreso.cantidad = type.cantidad
                        this.total= this.total + type.cantidad
                        

                        dataTable.push({ name: type.gls_nomenclatura, y: type.cantidad}) // Push para la grafica
                        this.Query_Ingreso.push(objIngreso) // push para la tabla 
                        increment ++ 
                       
                    } )
            
                    this.chartOptions.series.push({
                        data: dataTable,
                        name: '',
                        colorByPoint: true
                    })

                    this.setModal(false) // Aqui Manipulamos el modal                     

                })).catch(errors => {
                    console.log(errors)
                    this.setModal(false) // Aqui Manipulamos el modal                     
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