<template>
        <v-row>
            <v-col md="12">
                <v-card>
                    <v-card-title class="primary">
                        <v-list-item two-line>
                            <v-list-item-content>
                                <v-list-item-title class="headline white--text">{{nombreTribunal}}</v-list-item-title>
                                <v-list-item-subtitle class="font-italic white--text">{{fechas.periodo}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col md="8">
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
                                            
                                        >
                                            <template v-slot:[`body`]="{ items }">
                                                <tbody>
                                                    <tr v-for="(item, index) in items " :key="item.crr_idfuncionario">
                                                        <td style ="width:36%;" class="primary--text" v-if="index <= 4">
                                                            <b>{{ item.nombre.toUpperCase() }}</b>
                                                            <br/>
                                                            <span class="subtextTable">{{item.prom_atrasos}}&nbsp;MIN PROM</span>
                                                        </td>
                                                        <td style ="width:13%; text-align: center" v-if="index <= 4">
                                                            <span class="textTable">
                                                                {{ item.preparatorias }}
                                                                &nbsp;
                                                                ({{ item.con_preparatorias }})
                                                            </span>
                                                            <br/>
                                                            <span class="subtextTable">{{item.prom_atrasos_prep}}&nbsp;MIN PROM</span>
                                                        </td>
                                                        <td style ="width:13%; text-align: center"  v-if="index <= 4">
                                                            <span class="textTable">
                                                                {{ item.juicio }}
                                                                &nbsp;
                                                                ({{ item.con_juicio }})
                                                            </span>
                                                            <br/>
                                                            <span class="subtextTable">{{item.prom_atrasos_juicio}}&nbsp;MIN PROM</span>
                                                        </td>
                                                        <td style ="width:13%; text-align: center"  v-if="index <= 4">
                                                            <span class="textTable">
                                                                {{ item.unica }}
                                                                &nbsp;
                                                                ({{ item.con_unica }})
                                                            </span>
                                                            <br/>
                                                            <span class="subtextTable">{{item.prom_atrasos_unica}}&nbsp;MIN PROM</span>
                                                        </td>
                                                        <td style ="width:13%; text-align: center"  v-if="index <= 4">
                                                            <span class="textTable">
                                                                {{ item.especial }}
                                                                &nbsp;
                                                                ({{ item.con_especial }})
                                                            </span>
                                                            <br/>
                                                             <span class="subtextTable">{{item.prom_atrasos_especial}}&nbsp;MIN PROM</span>
                                                        </td>
                                                        <td style ="width:12%; text-align: center"  v-if="index <= 4">
                                                            <span class="textTable">{{ item.aud_desde_susp }}</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-data-table>
                                        <b/>
                                        <p class="text--secondary font-italic" style="text-align: right;">
                                            () = numero de conciliaciones
                                        </p>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col md="1">
                            </v-col>
                            <v-col md="3">
                                <!-- CUMNPLIMIENTOS DE PLAZOS -->
                                <v-card>
                                    <v-card-title class="primary white--text">
                                        Preparatorias Cumplimiento Plazo Legal
                                        <!-- <v-spacer></v-spacer> -->
                                        <!-- <v-btn small outlined color="white" @click="callModalDetalleAudienciaPlazos('ALL')">Detalle</v-btn> -->
                                    </v-card-title>
                                    <v-card-text>
                                        <v-card-text>
                                            <v-row  v-for="item in arrCumplimientoPlazoPrep" :key="item.tip_causa">
                                                <v-col>
                                                    <v-row>
                                                        <v-col md="6" class="NoSpace">
                                                            <b>{{item.prctn_cumplimiento}}%</b>
                                                        </v-col>
                                                        <v-col md="6" class="NoSpace" style="text-align: right;">
                                                            <b>Causas {{item.tip_causa}}</b>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-col md="12" class="NoSpace">
                                                            <v-progress-linear
                                                                :color= item.color
                                                                height="10"
                                                                :value= item.prctn_cumplimiento
                                                                striped
                                                            ></v-progress-linear>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-col md="12" class="NoSpace">
                                                            <b>Aud. realizadas: {{item.audiencias_realizadas}} / Promedio Agendamiento dias: {{item.promedio_agendamiento}}</b>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                            <b/>
                                            <p class="text--secondary font-italic">
                                                Cumplimiento plazo de agendamiento legal segun audiencias
                                                realizadas en el periodo. <br/>
                                                % de audiencias agendadas en plazo legal.
                                            </p>
                                        </v-card-text>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col md="8">
                                <v-card>
                                    <v-card-title class="primary white--text">
                                        Uso de Salas
                                    </v-card-title>
                                    <v-card-text>
                                        <highcharts  :options="chartOptions" :constructor-type="'chart'" />
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col md="1">
                            </v-col>
                            <v-col md="3">
                                <!-- CUMNPLIMIENTOS DE PLAZOS -->
                                <v-card>
                                    <v-card-title class="primary white--text">
                                        Juicios Cumplimiento Plazo Legal
                                        <!-- <v-spacer></v-spacer> -->
                                        <!-- <v-btn small outlined color="white" @click="callModalDetalleAudienciaPlazos('ALL')">Detalle</v-btn> -->
                                    </v-card-title>
                                    <v-card-text>
                                        <v-card-text>
                                            <v-row  v-for="item in arrCumplimientoPlazoJuicio" :key="item.tip_causa">
                                                <v-col>
                                                    <v-row>
                                                        <v-col md="6" class="NoSpace">
                                                            <b>{{item.prctn_cumplimiento}}%</b>
                                                        </v-col>
                                                        <v-col md="6" class="NoSpace" style="text-align: right;">
                                                            <b>Causas {{item.tip_causa}}</b>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-col md="12" class="NoSpace">
                                                            <v-progress-linear
                                                                :color= item.color
                                                                height="10"
                                                                :value= item.prctn_cumplimiento
                                                                striped
                                                            ></v-progress-linear>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row>
                                                        <v-col md="12" class="NoSpace">
                                                            <b>Aud. realizadas: {{item.audiencias_realizadas}} / Promedio Agendamiento dias: {{item.promedio_agendamiento}}</b>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                            <b/>
                                            <p class="text--secondary font-italic">
                                                Cumplimiento plazo de agendamiento legal segun audiencias
                                                realizadas en el periodo. <br/>
                                                % de audiencias agendadas en plazo legal.
                                            </p>
                                        </v-card-text>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <!-- MODALES Y OTROS ELEMENTOS FUERA DEL TABLERO-->
                    <FiltrosCompetencias class="mt-4" style="display: none"/>
                    <!-- MODAL AUDIENCIAS -->
                    <v-dialog v-model="dialogAud" max-width="1200">
                        <v-card>
                            <v-card-title class="primary white--text">
                                Audiencias Realizadas
                                <v-spacer></v-spacer>
                                <v-btn color="error" @click="dialogAud = false" large>x</v-btn>
                            </v-card-title>
                            <v-card-text>

                                <v-tabs v-model="tab" background-color="accent-4" centered>
                                    <v-tabs-slider></v-tabs-slider>
                                    <v-tab href="#tab-1">Ranking</v-tab>
                                    <v-tab href="#tab-2">Detalle</v-tab>
                                </v-tabs>

                                <v-tabs-items v-model="tab" class="py-1">
                                    <v-tab-item id="tab-1">
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
                                                            &nbsp;
                                                            ({{ item.con_preparatorias }})
                                                            <br/>
                                                            <span class="subtextTable">{{item.prom_atrasos_prep}}&nbsp;MIN PROM</span>
                                                        </td>
                                                        <td style ="width:13%; text-align: center">
                                                            {{ item.juicio }}
                                                            &nbsp;
                                                            ({{ item.con_juicio }})
                                                            <br/>
                                                            <span class="subtextTable">{{item.prom_atrasos_juicio}}&nbsp;MIN PROM</span>
                                                        </td>
                                                        <td style ="width:13%; text-align: center">
                                                            {{ item.unica }}
                                                            &nbsp;
                                                            ({{ item.con_unica }})
                                                            <br/>
                                                            <span class="subtextTable">{{item.prom_atrasos_unica}}&nbsp;MIN PROM</span>
                                                        </td>
                                                        <td style ="width:13%; text-align: center">
                                                            {{ item.especial }}
                                                            &nbsp;
                                                            ({{ item.con_especial }})
                                                            <br/>
                                                            <span class="subtextTable">{{item.prom_atrasos_especial}}&nbsp;MIN PROM</span>
                                                        </td>
                                                        <td style ="width:12%; text-align: center">
                                                            {{ item.aud_desde_susp }}
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
                                                        <th style="text-align: center"><countTo class="count" :startVal="0" :endVal="totalAudSus" separator="." :duration="1000"></countTo></th>
                                                    </tr>
                                                </tfoot>
                                            </template>
                                        </v-data-table>
                                    </v-tab-item>
                                    <v-tab-item id="tab-2">

                                        <vue-excel-xlsx class="my-2 btn btn-primary" :data="arrAudRealizadaRes" :columns="excelHeadResAudRea" :filename="'AudienciasRealizadas'" :sheetname="'Hoja1'">
                                            <b-icon-cloud-download> </b-icon-cloud-download>
                                        </vue-excel-xlsx>

                                        <v-data-table 
                                            :headers="headerResumenAudRealizada"
                                            :items="arrAudRealizadaRes"
                                            :sort-by="['crr_causa']"
                                            :sort-desc="[true]"
                                        >
                                        </v-data-table>
                                    </v-tab-item>
                                </v-tabs-items>
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
            totalAudSus: 0,
            totalUnica: 0,
            dialogAud: false,
            dialogAge: false,
            tab: false,
            totalPreparatorias: 0,
            totalJuicios: 0,
            totalEspecial: 0,
            arrCumplimientoPlazoPrep: [],
            arrCumplimientoPlazoJuicio: [],
            arrDetalleAudiendiaAgenda: [],
            arrColores: ['deep-orange','light-blue','light-green darken-4','lime','amber','blue-grey'],
            arrAudRealizadaRes: [],
            totalUnica: 0,
            headerAnalisisJuez: [
                { text: '',  align: 'center', value: 'nombre', class : 'primary--text gris', width: '40%'},
                { text: 'PREP',  align: 'center', value: 'preparatorias', class : 'primary--text gris', width: '12%' },
                { text: 'JUICIO', align: 'center', value: 'juicio', class : 'primary--text gris', width: '12%' },
                { text: 'UNICA', align: 'center', value: 'unica', class : 'primary--text gris', width: '12%' },
                { text: 'ESPECIAL', align: 'center', value: 'especial', class : 'primary--text gris', width: '12%' },
                { text: 'DESDE SUSPENSION', align: 'center', value: 'aud_desde_susp', class : 'primary--text gris', width: '12%' }
              
            ],
            headerDetalleAnalisisJuez: [
                { text: '',  align: 'center', value: 'nombre', class : 'primary white--text', width: '40%'},
                { text: 'PREP',  align: 'center', value: 'preparatorias', class : 'primary white--text', width: '12%' },
                { text: 'JUICIO', align: 'center', value: 'juicio', class : 'primary white--text', width: '12%' },
                { text: 'UNICA', align: 'center', value: 'unica', class : 'primary white--text', width: '12%' },
                { text: 'ESPECIAL', align: 'center', value: 'especial', class : 'primary white--text', width: '12%' },
                { text: 'DESDE SUSPENSION', align: 'center', value: 'aud_desde_susp', class : 'primary white--text', width: '12%' }
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
            excelHeadResAudRea : [{label: "ID Causa",              field:  "crr_causa"},
                                {label: "RIT",   field:  "rit"},
                                {label: "Fecha Ingreso",  field:  "fec_ingreso"},
                                {label: "Fecha Audiencia",   field:  "fec_audiencia_real"},
                                {label: "Hora Inicio",   field:  "hora_ini_real"},
                                {label: "Hora Término",   field:  "hora_fin_real"},
                                {label: "Tipo Audiencia",   field:  "gls_tipaudiencia"},
                                {label: "Juez",   field:  "nombre"},
                                {label: "Suspendida?",   field:  "gls_desde_suspension"},
                                {label: "Fecha Audiencia Suspendida",   field:  "fec_audiencia_suspendida"}
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
            headerResumenAudRealizada: [
                { text: 'ID Causa',  align: 'center', value: 'crr_causa', class : 'primary white--text', width: '10%'},
                { text: 'RIT',  align: 'center', value: 'rit', class : 'primary white--text', width: '15%' },
                { text: 'Fec.Ingreso', align: 'center', value: 'fec_ingreso', class : 'primary white--text', width: '10%' },
                { text: 'Fec.Audiencia', align: 'center', value: 'fec_audiencia_real', class : 'primary white--text', width: '9%' },
                { text: 'Hora Inicio', align: 'center', value: 'hora_ini_real', class : 'primary white--text', width: '7%' },
                { text: 'Hora Término', align: 'center', value: 'hora_fin_real', class : 'primary white--text', width: '7%' },
                { text: 'Tipo Audiencia', align: 'center', value: 'gls_tipaudiencia', class : 'primary white--text', width: '10%' },
                { text: 'Juez', align: 'center', value: 'nombre', class : 'primary white--text', width: '12%' },
                { text: 'Suspendida?', align: 'center', value: 'gls_desde_suspension', class : 'primary white--text', width: '10%' },
                { text: 'Fec. Audiencia Suspendida', align: 'center', value: 'fec_audiencia_suspendida', class : 'primary white--text', width: '10%' }
                
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
                                cod_corte: this.user[0].cod_corte,
                                cod_tribunal: this.user[0].cod_tribunal,
                                anoInicio: this.fechas.anoInicio,
                                mesInicio: this.fechas.mesInicio,
                                anoFin: this.fechas.anoFin,
                                mesFin: this.fechas.mesFin
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
                                cod_corte: this.user[0].cod_corte,
                                cod_tribunal: this.user[0].cod_tribunal,
                                anoInicio: this.fechas.anoInicio,
                                mesInicio: this.fechas.mesInicio,
                                anoFin: this.fechas.anoFin,
                                mesFin: this.fechas.mesFin
                        }
                                    
                    })
                    const data = response.data
                    let objResumen
                    this.arrResumenJuez = []
                    this.totalPreparatorias = 0
                    this.totalJuicios = 0
                    this.totalEspecial = 0
                    this.totalUnica = 0
                    this.totalAudSus = 0

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
                            objResumen.aud_desde_susp = type.aud_desde_susp
                            objResumen.con_preparatorias = type.con_preparatorias
                            objResumen.con_juicio = type.con_juicio
                            objResumen.con_especial = type.con_especial
                            objResumen.con_unica = type.con_unica
                            
                            this.totalPreparatorias += objResumen.preparatorias
                            this.totalJuicios +=  objResumen.juicio
                            this.totalEspecial +=  objResumen.especial
                            this.totalUnica +=  objResumen.unica
                            this.totalAudSus += objResumen.aud_desde_susp

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
            // const req2 = url + '/laboral/agenda_audiencia_fuera_plazo' 

            const get = async request => {
                try{
                    const response = await axios.get(req1, {
                        params: {
                                cod_corte: this.user[0].cod_corte,
                                cod_tribunal: this.user[0].cod_tribunal,
                                anoInicio: this.fechas.anoInicio,
                                mesInicio: this.fechas.mesInicio,
                                anoFin: this.fechas.anoFin,
                                mesFin: this.fechas.mesFin
                        }
                                    
                    })


                    const data = response.data
                    let objCumplimiento = Object()
                    let prctn_cumplimiento = 0
                    let contador = 0
                    this.arrCumplimientoPlazoJuicio = []
                    this.arrCumplimientoPlazoPrep = []
                    //EN PLAZO
                    Object.values(data.recordset).map((type) => {
                        objCumplimiento = new Object()
                        prctn_cumplimiento = 0

                        objCumplimiento.tip_causa = type.tip_causa
                        objCumplimiento.audiencias_realizadas = type.audiencias_realizadas
                        objCumplimiento.promedio_agendamiento = type.promedio_agendamiento
                        objCumplimiento.cumplimiento_plazo = type.cumplimiento_plazo
                        objCumplimiento.prctn_cumplimiento = Math.round((100*type.cumplimiento_plazo)/type.audiencias_realizadas)
                        objCumplimiento.color = this.arrColores[contador]

                        contador++
                        

                        if(type.id_tipo_audiencia == 1)
                        {
                            this.arrCumplimientoPlazoPrep.push(objCumplimiento)
                        }else {
                            this.arrCumplimientoPlazoJuicio.push(objCumplimiento)
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
                                cod_tribunal: this.user[0].cod_tribunal,
                                anoInicio: this.fechas.anoInicio,
                                mesInicio: this.fechas.mesInicio,
                                anoFin: this.fechas.anoFin,
                                mesFin: this.fechas.mesFin,
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

        obtenerAudienciasRealizadasResumen(){
            const axios = require('axios')
            const req1 = url + '/laboral/audiencias_realizadas_resumen' 

            const get = async request => {
                try{
                    const response = await axios.get(req1, {
                        params: {
                                cod_corte: this.user[0].cod_corte,
                                cod_tribunal: this.user[0].cod_tribunal,
                                anoInicio: this.fechas.anoInicio,
                                mesInicio: this.fechas.mesInicio,
                                anoFin: this.fechas.anoFin,
                                mesFin: this.fechas.mesFin
                        }
                                    
                    })

                    const data = response.data
                    this.arrAudRealizadaRes = []
                    let objResumen
                    //EN PLAZO
                    Object.values(data.recordset).map((type) => {
                        objResumen = new Object()
                        objResumen.crr_causa = type.crr_causa
                        objResumen.rit = type.rit
                        objResumen.fec_ingreso = type.fec_ingreso
                        objResumen.fec_audiencia_real = type.fec_audiencia_real
                        objResumen.hora_ini_real = type.hora_ini_real
                        objResumen.hora_fin_real = type.hora_fin_real
                        objResumen.gls_tipaudiencia = type.gls_tipaudiencia
                        objResumen.nombre = type.nombre
                        objResumen.gls_desde_suspension = type.gls_desde_suspension
                        objResumen.fec_audiencia_suspendida = type.fec_audiencia_suspendida
                        this.arrAudRealizadaRes.push(objResumen)
                    
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
            this.obtenerAudienciasRealizadasResumen()
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

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    .Rowclass{
        border-style: solid;
        border-color: darkred;
    }

    .NoSpace{
        padding: 0px;
    }

</style>