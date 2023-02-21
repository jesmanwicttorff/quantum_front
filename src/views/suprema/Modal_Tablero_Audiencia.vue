<template>
        <v-row>
            <v-col md="12">
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col md="8" class="px-0">
                                <v-card>
                                    <v-card-title class="primary white--text">
                                        Audiencias Realizadas
                                        <v-spacer></v-spacer>
                                        <v-btn small outlined color="white" @click="dialogAud = true">Detalle</v-btn>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-data-table 
                                            :headers="headerAnalisisJuez"
                                            :items="arrResumenJuez"
                                            :sort-by="['preparatorias']"
                                            hide-default-footer
                                            :sort-desc="[true]"
                                            disable-sort
                                        >
                                            <template v-slot:[`body`]="{ items }">
                                                <tbody >
                                                    <tr v-for="(item, index) in items " :key="item.crr_idfuncionario">
                                                        <td style ="width:56%;" class="primary--text" v-if="index <= 4">
                                                            <b>{{ item.nombre.toUpperCase() }}</b>
                                                            <br/>
                                                            <span class="subtextTable">{{item.prom_atrasos}}&nbsp;MIN PROM</span>
                                                        </td>
                                                        <td style ="width:16%; text-align: center" v-if="index <= 4">
                                                            <span class="textTable">{{ item.preparatorias }}</span>
                                                            <br/>
                                                            <span class="subtextTable">{{item.prom_atrasos_prep}}&nbsp;MIN PROM</span>
                                                        </td>
                                                        <td style ="width:16%; text-align: center"  v-if="index <= 4">
                                                            <span class="textTable">{{ item.juicio }}</span>
                                                            <br/>
                                                            <span class="subtextTable">{{item.prom_atrasos_juicio}}&nbsp;MIN PROM</span>
                                                        </td>
                                                        <td style ="width:15%; text-align: center"  v-if="index <= 4">
                                                            <span class="textTable">{{ item.unica }}</span>
                                                            <br/>
                                                            <span class="subtextTable">{{item.prom_atrasos_unica}}&nbsp;MIN PROM</span>
                                                        </td>
                                                        <td style ="width:16%; text-align: center"  v-if="index <= 4">
                                                            <span class="textTable">{{ item.especial }}</span>
                                                            <br/>
                                                             <span class="subtextTable">{{item.prom_atrasos_especial}}&nbsp;MIN PROM</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col md="1">
                            </v-col>
                            <v-col md="3">
                                <!-- CUMNPLIMIENTOS DE PLAZOS -->
                                <v-card>
                                    <v-card-title class="primary white--text">
                                        Cumplimientos de Plazos
                                        <v-spacer></v-spacer>
                                        <v-btn small outlined color="white" @click="callModalDetalleAudienciaPlazos('ALL')">Detalle</v-btn>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-hover v-slot:default="{ hover }">
                                            <v-card class="mt-2 px-1" hover :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" @click="callModalDetalleAudienciaPlazos('FP')">
                                                <v-card-text>
                                                    <v-row>
                                                        <v-col md="4" class="px-0">
                                                            <img src="../../../public/img/fuera_plazo.png" alt="Fuera de Plazo"/>
                                                        </v-col>
                                                        <v-col md="8">
                                                            <h2><countTo class="count" :startVal="0" :endVal="audFueraPlazoJuicio + audFueraPlazoPrep" separator="." :duration="1000"></countTo></h2>
                                                            <h6><b>FUERA DE PLAZO</b></h6>
                                                            <countTo class="count" :startVal="0" :endVal="audFueraPlazoPrep" separator="." :duration="1000"></countTo> PREP 
                                                            <br/>
                                                            <countTo class="count" :startVal="0" :endVal="audFueraPlazoJuicio" separator="." :duration="1000"></countTo> JUICIO
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                        </v-hover>
                                        <v-hover v-slot:default="{ hover }">
                                            <v-card class="mt-2" hover :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" @click="callModalDetalleAudienciaPlazos('EP')">
                                                <v-card-text>
                                                    <v-row>
                                                        <v-col md="4" class="px-0">
                                                            <img src="../../../public/img/en_plazo.png" alt="En Plazo"/>
                                                        </v-col>
                                                        <v-col md="8">
                                                            <h2><countTo class="count" :startVal="0" :endVal="audEnPlazoJuicio + audEnPlazoPrep" separator="." :duration="1000"></countTo></h2>
                                                            <h6><b>EN PLAZO</b></h6>
                                                            <countTo class="count" :startVal="0" :endVal="audEnPlazoPrep" separator="." :duration="1000"></countTo>PREP
                                                            <br/>
                                                            <countTo class="count" :startVal="0" :endVal="audEnPlazoJuicio" separator="." :duration="1000"></countTo>JUICIO
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                        </v-hover>
                                    </v-card-text>
                                </v-card>


                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="7">
                                <v-card>
                                    <v-card-title class="primary white--text">
                                        Uso de Salas
                                    </v-card-title>
                                    <v-card-text>
                                        <highcharts  :options="chartOptions" :constructor-type="'chart'" />
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col md="5">
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <!-- MODALES Y OTROS ELEMENTOS FUERA DEL TABLERO-->
                    <FiltrosCompetencias class="mt-4" style="display: none"/>
                    <!-- MODAL AUDIENCIAS -->
                    <v-dialog v-model="dialogAud" max-width="900">
                        <v-card>
                            <v-card-title class="primary white--text">
                                Audiencias Realizadas
                                <v-spacer></v-spacer>
                                <v-btn color="error" @click="dialogAud = false" large>x</v-btn>
                            </v-card-title>
                            <v-card-text>
                                <vue-excel-xlsx class="my-2 btn btn-primary" :data="arrResumenJuez" :columns="excelHeadJueces" :filename="'Analisis por Juez'" :sheetname="'Hoja1'">
                                    <b-icon-cloud-download> </b-icon-cloud-download>
                                </vue-excel-xlsx>
                        
                                <v-data-table 
                                    :headers="headerDetalleAnalisisJuez"
                                    :items="arrResumenJuez"
                                    :sort-by="['preparatorias']"
                                    :sort-desc="[true]"
                                >
                                    <template v-slot:[`body`]="{ items }">
                                        <tbody>
                                            <tr v-for="item in items " :key="item.crr_idfuncionario">
                                                <td style ="width:36%;" class="primary--text">
                                                    <b>{{ item.nombre.toUpperCase() }}</b>
                                                    <br/>
                                                    <span class="subtextTable">{{item.prom_atrasos}}&nbsp;MIN PROM</span>
                                                </td>
                                                <td style ="width:13%; text-align: center">
                                                    {{ item.preparatorias }}
                                                    <br/>
                                                    <span class="subtextTable">{{item.prom_atrasos_prep}}&nbsp;MIN PROM</span>
                                                </td>
                                                <td style ="width:13%; text-align: center">
                                                    {{ item.juicio }}
                                                    <br/>
                                                    <span class="subtextTable">{{item.prom_atrasos_juicio}}&nbsp;MIN PROM</span>
                                                </td>
                                                <td style ="width:13%; text-align: center">
                                                    {{ item.unica }}
                                                    <br/>
                                                    <span class="subtextTable">{{item.prom_atrasos_unica}}&nbsp;MIN PROM</span>
                                                </td>
                                                <td style ="width:13%; text-align: center">
                                                    {{ item.especial }}
                                                    <br/>
                                                    <span class="subtextTable">{{item.prom_atrasos_especial}}&nbsp;MIN PROM</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr class="primary white--text">
                                                <th style ="text-align: center">Total</th>
                                                <th style="text-align: center"><countTo class="count" :startVal="0" :endVal="totalPreparatorias" separator="." :duration="1000"></countTo></th>
                                                <th style="text-align: center"><countTo class="count" :startVal="0" :endVal="totalJuicios" separator="." :duration="1000"></countTo></th>
                                                <th style="text-align: center"><countTo class="count" :startVal="0" :endVal="totalUnica" separator="." :duration="1000"></countTo></th>
                                                <th style="text-align: center"><countTo class="count" :startVal="0" :endVal="totalEspecial" separator="." :duration="1000"></countTo></th>
                                            </tr>
                                        </tfoot>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                    <!-- MODAL AGENDA EN PLAZOS O FUERA DE PLAZO -->
                    <v-dialog v-model="dialogAge" max-width="1000">
                        <v-card>
                            <v-card-title class="primary white--text">
                                Detalle Cumplimientos Plazos
                                <v-spacer></v-spacer>
                                <v-btn color="error" @click="dialogAge = false" large>x</v-btn>
                            </v-card-title>
                            <v-card-text>
                                <vue-excel-xlsx class="my-2 btn btn-primary" :data="arrDetalleAudiendiaAgenda" :columns="excelHeadDetalleAudAge" :filename="'Detalle_Agenda_Cumplimiento'" :sheetname="'Hoja1'">
                                    <b-icon-cloud-download> </b-icon-cloud-download>
                                </vue-excel-xlsx>
                        
                                <v-data-table 
                                    :headers="headerDetalleAudAgenda"
                                    :items="arrDetalleAudiendiaAgenda"
                                    :sort-by="['fec_ingreso']"
                                    :sort-desc="[true]"
                                >
                                    <template v-slot:[`body`]="{ items }">
                                        <tbody>
                                            <tr v-for="item in items " :key="item.crr_idfuncionario">
                                                <td class="primary--text">
                                                    {{ item.crr_causa }}
                                                </td>
                                                <td style ="text-align: center">
                                                    {{ item.tip_causa }}
                                                </td>
                                                <td style ="text-align: center">
                                                    {{ item.rol_causa }}
                                                </td>
                                                <td style ="text-align: center">
                                                    {{ item.era }}
                                                </td>
                                                <td style ="text-align: center">
                                                    {{ item.fec_ingreso }}
                                                </td>
                                                <td style ="text-align: center">
                                                    {{ item.fec_dacurso }}
                                                </td>
                                                <td style ="text-align: center">
                                                    {{ item.fec_aud_preparatoria }}
                                                </td>
                                                <td style ="text-align: center">
                                                    {{ item.fec_aud_juicio }}
                                                </td>
                                                <td style ="text-align: center">
                                                    {{ item.dias }}
                                                </td>
                                                <td style ="text-align: center">
                                                    {{ item.cumplimiento }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-card>
            </v-col>
        </v-row>
</template>
        
<script>
import FiltrosCompetencias from '../../components/elementos/FiltrosCompetencias'
import ModalLoading from '../../components/elementos/ModalLoading'
import { url } from '../../config/api'
import store from 'store'
import { mapState, mapMutations } from 'vuex'
import { Graph } from '../../config/Highcharts'
import { Chart } from 'highcharts-vue'
import exporting from 'highcharts/modules/exporting'
import HighCharts from 'highcharts'
import loadDrillDown from 'highcharts/modules/drilldown'
import stockInit from 'highcharts/modules/stock'
import countTo from 'vue-count-to'

export default {
    props: ['fechasAudiencia'],
    data(){
        return{
            chartOptions: JSON.parse(JSON.stringify(Graph['barv'][0])),
            user: [{
                usuario_id : store.get('user_usuario_id'), // Los parametros que obtenemos de la url
                cod_corte : store.get('cod_corte'),
                cod_tribunal : store.get('cod_tribunal'),
                ano : store.get('ano'),
                mes : store.get('mes')
            }],
            nombreTribunal: '',
            // chartOptions: JSON.parse(JSON.stringify(Graph['bar'][0])),
            arrResumenJuez: [],
            arrResumenSalas: [],
            totalPreparatorias: 0,
            totalJuicios: 0,
            totalEspecial: 0,
            totalUnica: 0,
            dialogAud: false,
            dialogAge: false,
            totalPreparatorias: 0,
            totalJuicios: 0,
            totalEspecial: 0,
            audEnPlazoPrep: 0,
            audFueraPlazoPrep: 0,
            audFueraPlazoJuicio: 0,
            audEnPlazoJuicio: 0,
            arrDetalleAudiendiaAgenda: [],
            totalUnica: 0,
            headerAnalisisJuez: [
                { text: '',  align: 'center', value: 'nombre', class : 'primary--text gris', width: '40%'},
                { text: 'PREP',  align: 'center', value: 'preparatorias', class : 'primary--text gris', width: '12%' },
                { text: 'JUICIO', align: 'center', value: 'juicio', class : 'primary--text gris', width: '12%' },
                { text: 'UNICA', align: 'center', value: 'unica', class : 'primary--text gris', width: '12%' },
                { text: 'ESPECIAL', align: 'center', value: 'especial', class : 'primary--text gris', width: '12%' }
              
            ],
            headerDetalleAnalisisJuez: [
                { text: '',  align: 'center', value: 'nombre', class : 'primary white--text', width: '40%'},
                { text: 'PREP',  align: 'center', value: 'preparatorias', class : 'primary white--text', width: '12%' },
                { text: 'JUICIO', align: 'center', value: 'juicio', class : 'primary white--text', width: '12%' },
                { text: 'UNICA', align: 'center', value: 'unica', class : 'primary white--text', width: '12%' },
                { text: 'ESPECIAL', align: 'center', value: 'especial', class : 'primary white--text', width: '12%' }
              
            ],
            headerDetalleAudAgenda: [
                { text: 'ID Causa',  align: 'center', value: 'crr_causa', class : 'primary white--text', width: '10%' },
                { text: 'Tipo de Causa', align: 'center', value: 'tip_causa', class : 'primary white--text', width: '5%' },
                { text: 'ROL', align: 'center', value: 'rol_causa', class : 'primary white--text', width: '8%' },
                { text: 'ERA', align: 'center', value: 'era', class : 'primary white--text', width: '8%' },
                { text: 'Fecha Ingreso', align: 'center', value: 'fec_ingreso', class : 'primary white--text', width: '13%' },
                { text: 'Fecha da Curso', align: 'center', value: 'fec_dacurso', class : 'primary white--text', width: '13%' },
                { text: 'Fecha Aud. Prep.', align: 'center', value: 'fec_aud_preparatoria', class : 'primary white--text', width: '13%' },
                { text: 'Fecha Aud. Juicio', align: 'center', value: 'fec_aud_juicio', class : 'primary white--text', width: '13%' },
                { text: 'Dias Transcurridos', align: 'center', value: 'dias', class : 'primary white--text', width: '9%' },
                { text: 'Cumple Agen.', align: 'center', value: 'cumplimiento', class : 'primary white--text', width: '8%' },
            ],
            excelHeadJueces : [{label: "Juez",              field:  "nombre"},
                                {label: "preparatorias",   field:  "preparatorias"},
                                {label: "juicio",  field:  "juicio"},
                                {label: "unica",   field:  "unica"},
                                {label: "especial",   field:  "especial"},
            ],
            excelHeadDetalleAudAge : [  {label: "ID Causa",              field:  "crr_causa"},
                                        {label: "Tipo de Causa",   field:  "tip_causa"},
                                        {label: "ROL",  field:  "rol_causa"},
                                        {label: "ERA",   field:  "era"},
                                        {label: "Fecha Ingreso",   field:  "fec_ingreso"},
                                        {label: "Fecha da Curso",   field:  "fec_dacurso"},
                                        {label: "Fecha Aud. Prep.",   field:  "fec_aud_preparatoria"},
                                        {label: "Fecha Aud. Juicio",   field:  "fec_aud_juicio"},
                                        {label: "Dias Transcurridos",   field:  "dias"},
                                        {label: "Cumple Agen.",   field:  "cumplimiento"}
            ],
        }
    },
    methods: {
        ...mapMutations(['setModal']),

        obtenerResumenSalas(){
            const axios = require('axios')
            const req1 = url + '/laboral/salas_resumen' 
            this.chartOptions.series = []
            this.chartOptions.plotOptions.bar.dataLabels.enabled = true
            this.chartOptions.yAxis.title.text = "Audiencias Realizadas"
            this.chartOptions.yAxis.title.align = "high"
            this.chartOptions.exporting.buttons.contextButton.enabled = false


            const get = async req1 => {
                try{
                    const response = await axios.get(req1, {
                        params: {
                                    cod_corte: this.fechasAudiencia.cod_corte,
                                    cod_tribunal: this.fechasAudiencia.cod_tribunal,
                                    anoInicio: this.fechasAudiencia.ano -1,
                                    mesInicio: this.fechasAudiencia.mes,
                                    anoFin: this.fechasAudiencia.ano,
                                    mesFin: this.fechasAudiencia.mes
                        }
                                    
                    })
                    const data = response.data
                    let objResumen
                    let arrResumenSalasAux = []
                    let arrxAxis = []
                    this.arrResumenSalas = []


                    Object.values(data.recordset).map((type) => {
                        if(type.aud_totales != 0 || type.resoluciones != 0){
                            objResumen = new Object()
                            objResumen.id_sala = type.id_sala
                            objResumen.gls_sala = type.gls_sala
                            objResumen.aud_realizadas = type.aud_realizadas

                            //nombres de las salas
                            arrxAxis.push(type.gls_sala)
                            arrResumenSalasAux.push(type.aud_realizadas)
                        }
                    })

                    this.chartOptions.xAxis.categories = arrxAxis
                    this.chartOptions.series.push({
                        data: arrResumenSalasAux,
                        name: 'Audiencias Realizadas',
                        colorByPoint: true
                    }) 

                } 
                catch (error) {
                    console.log(error)
                 }
            }

            get(req1)
            //console.log(this.arrResumenJuez)
        },

        obtenerResumenJueces(){
            const axios = require('axios')
            const req1 = url + '/laboral/jueces_resumen' 

            const get = async req1 => {
                try{
                    const response = await axios.get(req1, {
                        params: {
                                    cod_corte: this.fechasAudiencia.cod_corte,
                                    cod_tribunal: this.fechasAudiencia.cod_tribunal,
                                    anoInicio: this.fechasAudiencia.ano -1,
                                    mesInicio: this.fechasAudiencia.mes,
                                    anoFin: this.fechasAudiencia.ano,
                                    mesFin: this.fechasAudiencia.mes
                        }
                                    
                    })
                    const data = response.data
                    let objResumen
                    this.arrResumenJuez = []
                    this.totalPreparatorias = 0
                    this.totalJuicios = 0
                    this.totalEspecial = 0
                    this.totalUnica = 0

                    Object.values(data.recordset).map((type) => {
                        if(type.aud_totales != 0 || type.resoluciones != 0){
                            objResumen = new Object()
                            objResumen.id = type.crr_idfuncionario
                            objResumen.nombre = type.nombre_completo
                            objResumen.preparatorias = type.preparatorias
                            objResumen.juicio = type.juicio
                            objResumen.especial = type.especial
                            objResumen.unica = type.unica
                            objResumen.prom_atrasos_prep = type.prom_atrasos_prep
                            objResumen.prom_atrasos_juicio = type.prom_atrasos_juicio
                            objResumen.prom_atrasos_especial = type.prom_atrasos_especial
                            objResumen.prom_atrasos_unica = type.prom_atrasos_unica
                            objResumen.prom_atrasos = type.prom_atrasos
                            this.totalPreparatorias += objResumen.preparatorias
                            this.totalJuicios +=  objResumen.juicio
                            this.totalEspecial +=  objResumen.especial
                            this.totalUnica +=  objResumen.unica

                            this.arrResumenJuez.push(objResumen)
                        }
                    })

                } 
                catch (error) {
                    console.log(error)
                 }
            }

            get(req1)

        },

        obtenerNombreTribunal(){
            const axios = require('axios')
            const req1 = url + '/laboral/tribunal_detalle' 

            axios.all([
                axios.get(req1, {
                    params: {
                        cod_corte: this.user[0].cod_corte,
                        cod_tribunal: this.user[0].cod_tribunal
                    }
                })
            ]).then(axios.spread((...responses) => {

                const arrayTribunal = responses[0].data

                Object.values(arrayTribunal.recordset).map((type) => {
                    this.nombreTribunal = type.gls_tribunal
                })

            })).catch(errors => {
                console.log(errors)
            })
        },

        obtenerAgendaPlazos(){
            const axios = require('axios')
            const req1 = url + '/laboral/agenda_audiencia_en_plazo' 
            const req2 = url + '/laboral/agenda_audiencia_fuera_plazo' 

            const get = async request => {
                try{
                    const response = await axios.get(req1, {
                        params: {
                                    cod_corte: this.fechasAudiencia.cod_corte,
                                    cod_tribunal: this.fechasAudiencia.cod_tribunal,
                                    anoInicio: this.fechasAudiencia.ano -1,
                                    mesInicio: this.fechasAudiencia.mes,
                                    anoFin: this.fechasAudiencia.ano,
                                    mesFin: this.fechasAudiencia.mes
                        }
                                    
                    })

                    const response2 = await axios.get(req2, {
                        params: {
                                    cod_corte: this.fechasAudiencia.cod_corte,
                                    cod_tribunal: this.fechasAudiencia.cod_tribunal,
                                    anoInicio: this.fechasAudiencia.ano -1,
                                    mesInicio: this.fechasAudiencia.mes,
                                    anoFin: this.fechasAudiencia.ano,
                                    mesFin: this.fechasAudiencia.mes
                        }
                                    
                    })


                    const data = response.data
                    const data2 = response2.data
                    //EN PLAZO
                    Object.values(data.recordset).map((type) => {

                        switch(type.tipo_audiencia){
                            case "P":
                                this.audEnPlazoPrep = type.cantidad
                                break
                            case "J":
                                this.audEnPlazoJuicio = type.cantidad
                                break
                        }
                        
                    })
                    //FUERA DE PLAZO
                    Object.values(data2.recordset).map((type) => {

                        switch(type.tipo_audiencia){
                            case "P":
                                this.audFueraPlazoPrep = type.cantidad
                                break
                            case "J":
                                this.audFueraPlazoJuicio = type.cantidad
                                break
                        }
                        
                    })

                } 
                catch (error) {
                    console.log(error)
                 }
            }

            get(req1)

        },
        callModalDetalleAudienciaPlazos(paramPlazo){
            
            this.obtenerDetalleAgendaPlazos(paramPlazo)
            this.dialogAge = true

        },
        obtenerDetalleAgendaPlazos(paramPlazo){
            const axios = require('axios')
            const req1 = url + '/laboral/agenda_audiencia_detalle' 

            const get = async request => {
                try{
                    const response = await axios.get(req1, {
                        params: {
                                // cod_corte: this.user[0].cod_corte,
                               
                                    cod_tribunal: this.fechasAudiencia.cod_tribunal,
                                    anoInicio: this.fechasAudiencia.ano -1,
                                    mesInicio: this.fechasAudiencia.mes,
                                    anoFin: this.fechasAudiencia.ano,
                                    mesFin: this.fechasAudiencia.mes,
                                    plazo: paramPlazo
                        }
                                    
                    })

                    const data = response.data
                    this.arrDetalleAudiendiaAgenda = []
                    let objDetalle
                    //EN PLAZO
                    Object.values(data.recordset).map((type) => {
                        objDetalle = new Object()
                        objDetalle.crr_causa = type.crr_causa
                        objDetalle.tip_causa = type.tip_causa
                        objDetalle.rol_causa = type.rol_causa
                        objDetalle.era = type.era
                        objDetalle.fec_ingreso = type.fec_ingreso
                        objDetalle.fec_dacurso = type.fec_dacurso
                        objDetalle.fec_aud_preparatoria = type.fec_aud_preparatoria
                        objDetalle.fec_aud_juicio = type.fec_aud_juicio
                        objDetalle.dias = type.dias
                        objDetalle.cumplimiento = type.cumplimiento

                        this.arrDetalleAudiendiaAgenda.push(objDetalle)
                    
                    })

                } 
                catch (error) {
                    console.log(error)
                 }
            }

            get(req1)

        },
    },
    computed: {
        ...mapState(['fechas'])
    },
    watch: {
        fechas () {
            this.obtenerNombreTribunal()
            this.obtenerResumenJueces()
            this.obtenerResumenSalas()
            this.obtenerAgendaPlazos()
        }
    },
    components: {
        FiltrosCompetencias
        ,highcharts: Chart
        ,ModalLoading
        ,countTo
    }
}
</script>
        
<style scoped>
    .gris {
        background-color: #f2f2f2;
    }  

    .textTable {
        font-size: medium;
    }

    .subtextTable {
        font-size: 11px;
    }

    .v-card .cardAction{
    transition: opacity .4s ease-in-out;
    }

    .v-card:not(.on-hover) .cardAction{
    opacity: 1;
    }

    .show-btns .cardAction{
    color: rgba(255, 255, 255, 1) !important;
    }

</style>