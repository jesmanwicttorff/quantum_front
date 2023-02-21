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
                            <!-- GRAFICO, INGRESOS, TERMINOS Y RESOLUCIONES -->
                            <v-col md="5">
                                <highcharts  :options="chartOptions" :constructor-type="'chart'" />
                            </v-col>
                            <v-col md="3">
                                <v-row justify="center">
                                    <v-hover v-slot:default="{ hover }">
                                        <v-card hover height="100" width="270" color="primary" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" class="cardAction" @click="dialogIngreso = true">
                                            <v-card-title class="white--text">
                                                <h6>Total Ingresos</h6>
                                            </v-card-title>
                                            <v-card-text class="white--text">
                                                <h4><countTo class="count" :startVal="0" :endVal="TotalIngresos" separator="." :duration="1000"></countTo></h4>
                                            </v-card-text>
                                        </v-card>
                                    </v-hover>
                                </v-row>
                                <v-row class="py-2" justify="center">
                                    <v-card height="100" width="270" color="primary">
                                        <v-card-title class="white--text" align="center">
                                            <h6>Total T&eacute;rminos</h6>

                                            <v-spacer></v-spacer>     
                                        
                                            <v-switch color="red" v-model="archivoEspecial" hide-details dense class="mt-0 py-0">
                                            </v-switch>
                                            <v-tooltip bottom color="#1D1B1B">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <h6 class="body-1 mt-0 py-0" 
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    >a.e
                                                    </h6>
                                                </template>
                                                <span>¿Archivos Especiales?</span>
                                            </v-tooltip>
                                        </v-card-title>
                                        <v-card-text class="white--text" style="cursor: pointer;" @click="dialogTerminos = true">
                                            <h4>
                                                <countTo class="count" :startVal="0" :endVal="TotalTerminos" separator="." :duration="1000"></countTo>
                                            </h4>
                                        </v-card-text>
                                    </v-card>
                                </v-row>
                                <v-row justify="center">
                                    <v-hover v-slot:default="{ hover }">
                                        <v-card hover height="100" width="270" color="primary" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }" @click="dialogResoluciones = true">
                                            <v-card-title class="white--text">
                                                <h6>Total Resoluciones</h6>
                                            </v-card-title>
                                            <v-card-text class="white--text">
                                                <h4><countTo class="count" :startVal="0" :endVal="TotalResoluciones" separator="." :duration="1000"></countTo></h4>
                                            </v-card-text>
                                        </v-card>
                                    </v-hover>
                                </v-row>
                            </v-col>
                            <!-- ANALISIS POR JUEZ -->
                            <v-col md="4">
                                <v-card>
                                    <v-card-title class="primary white--text">
                                        Analisis por Juez
                                        <v-spacer></v-spacer>
                                        <v-btn small outlined color="white" @click="dialogJueces = true">Detalle</v-btn>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-data-table 
                                            :headers="headerAnalisisJuez"
                                            :items="arrResumenJuez"
                                            :sort-by="['resoluciones']"
                                            hide-default-footer
                                            :sort-desc="[true]"
                                            disable-sort
                                        >
                                            <template v-slot:[`body`]="{ items }">
                                                <tbody>
                                                    <tr v-for="(item, index) in items " :key="item.crr_idfuncionario">
                                                        <td style ="width:40%;" class="primary--text" v-if="index <= 4"><b>{{ item.nombre.toUpperCase() }}</b></td>
                                                        <td style ="width:25%; text-align: center" v-if="index <= 4">
                                                            <countTo class="count" :startVal="0" :endVal="item.resoluciones" separator="." :duration="1000"></countTo>
                                                        </td>
                                                        <td style ="width:25%; text-align: center"  v-if="index <= 4">{{ item.aud_realizadas }}&nbsp;({{ item.conciliaciones }})</td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <!-- AUDIENCIAS -->
                    <v-row>
                        <v-col md="5">
                            <v-row>
                                <v-col>
                                    <v-row>
                                        <v-col md="4" class="text-center">
                                            <h5 class="primary--text mt-2">
                                                Audiencias <br />
                                                Realizadas
                                            </h5>
                                        </v-col>
                                        <v-col md="4" class="text-center">
                                            <v-row>
                                                <v-col md="3">
                                                    <font-awesome-icon v-if="audRealizadasEstado == 'descendente'" icon="arrow-circle-down" size="2x" class="rojo" />
                                                    <font-awesome-icon v-if="audRealizadasEstado == 'ascendente'" icon="arrow-circle-up" size="2x" class="verde" />
                                                    <font-awesome-icon v-if="audRealizadasEstado == 'equivalente'" icon="arrow-circle-right" size="2x" class="amarillo" />
                                                </v-col>
                                                <v-col>
                                                    {{glosaPeriodoAnterior}} anterior <br />
                                                    <h6 v-if="audRealizadasEstado == 'ascendente'"><span>+</span>{{audRealizadasPrcnt}}%</h6>
                                                    <h6 v-if="audRealizadasEstado != 'ascendente'">{{audRealizadasPrcnt}}%</h6>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col md="4" class="text-center mt-2">
                                            <h3>
                                                <countTo class="count primary--text" :startVal="0" :endVal="audRealizadasTotal" separator="." :duration="1000"></countTo>
                                            </h3>
                                        </v-col>
                                    </v-row>
                                    <hr />
                                    <v-row>
                                        <v-col md="4" class="text-center mt-2">
                                            <h5 class="primary--text">
                                                Audiencias <br />
                                                No Realizadas
                                            </h5>
                                        </v-col>
                                        <v-col md="4" class="text-center">
                                            <v-row>
                                                <v-col md="3">
                                                    <font-awesome-icon v-if="audNORealizadasEstado == 'ascendente'" icon="arrow-circle-up" size="2x" class="rojo" />
                                                    <font-awesome-icon v-if="audNORealizadasEstado == 'descendente'" icon="arrow-circle-down" size="2x" class="verde" />
                                                    <font-awesome-icon v-if="audNORealizadasEstado == 'equivalente'" icon="arrow-circle-right" size="2x" class="amarillo" />
                                                </v-col>
                                                <v-col md="9">
                                                    {{glosaPeriodoAnterior}} anterior <br />
                                                    <h6 v-if="audNORealizadasEstado == 'ascendente'"><span>+</span>{{audNORealizadasPrcnt}}%</h6>
                                                    <h6 v-if="audNORealizadasEstado != 'ascendente'">{{audNORealizadasPrcnt}}%</h6>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col md="4" class="text-center mt-2">
                                            <h3>
                                                <countTo class="count primary--text" :startVal="0" :endVal="audNORealizadasTotal" separator="." :duration="1000"></countTo>
                                            </h3>
                                        </v-col>
                                    </v-row>
                                    <hr />
                                </v-col>
                            </v-row>
                            <v-card class="primary">
                                <v-card-text>
                                    <v-row align="center">
                                        <v-col md="3" class="text-center white--text">
                                            <h5>
                                                No <br />
                                                Realizadas
                                            </h5>
                                        </v-col>
                                        <v-col md="3" class="text-center white--text">
                                             Suspendidas <br />
                                            <h5>
                                                <countTo class="count white--text" :startVal="0" :endVal="audSuspendidas" separator="." :duration="1000"></countTo>
                                            </h5>
                                        </v-col>
                                        <v-col md="3" class="text-center white--text">
                                            No Realizadas <br />
                                            <h5>
                                                <countTo class="count white--text" :startVal="0" :endVal="audNoRealizadas" separator="." :duration="1000"></countTo>
                                            </h5>
                                        </v-col>
                                        <v-col md="3" class="text-center white--text">
                                            Reprogramadas <br />
                                            <h5>
                                                <countTo class="count white--text" :startVal="0" :endVal="audReprogramadas" separator="." :duration="1000"></countTo>
                                            </h5>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                            <v-card class="primary mt-1">
                                <v-card-text>
                                    <v-row align="center">
                                        <v-col md="3" class="text-center white--text">
                                            <h5>Salas</h5>
                                        </v-col>
                                        <v-col md="3" class="text-center white--text">
                                            Creadas <br />
                                            <h5>
                                                <countTo class="count white--text" :startVal="0" :endVal="cantidadSalas" separator="." :duration="1000"></countTo>
                                            </h5>
                                        </v-col>
                                        <v-col md="3" class="text-center white--text">
                                            Utilizadas<br />
                                            <h5>
                                                <countTo class="count white--text" :startVal="0" :endVal="cantidadSalasUsadas" separator="." :duration="1000"></countTo>
                                            </h5>
                                        </v-col>
                                        <v-col md="3" class="text-center white--text"> 
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col md="3">
                            <v-card>
                                <v-card-title class="primary white--text">
                                    Atraso en Inicio Audiencias
                                    <v-spacer></v-spacer>
                                    <v-btn small outlined color="white" @click="dialogAtrasos = true">Detalle</v-btn>
                                </v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col md="8">
                                            <b class="primary--text">Preparatorias</b>
                                            <br />
                                            Atraso Promedio Min.
                                        </v-col>
                                        <v-col md="4">
                                            {{atrasosPromedioPrep}} min
                                        </v-col>
                                    </v-row>
                                    <hr />
                                    <v-row>
                                        <v-col md="8">
                                            <b class="primary--text">Juicio</b>
                                            <br />
                                            Atraso Promedio Min.
                                        </v-col>
                                        <v-col md="4">
                                            {{atrasosPromedioJuicio}} min
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <!-- TERMINOS -->
                        <v-col md="4">
                            <v-card class="mr-3">
                                <v-card-title class="primary white--text">
                                    T&eacute;rminos
                                    <v-spacer></v-spacer>
                                    <v-btn small outlined color="white" @click="dialogTerTopfive = true">Detalle</v-btn>
                                </v-card-title>
                                <v-card-text>
                                    <v-data-table
                                        :items="Terminos"
                                        :sort-by="['cantidad']"
                                        hide-default-footer
                                        :sort-desc="[true]"
                                        disable-sort
                                    >
                                        <template v-slot:[`body`]="{ items }">
                                            <tbody>
                                                <tr v-for="(item, index) in items " :key="item.gls_termino">
                                                    <td style ="width:50%;" class="primary--text" v-if="index <= 4"><b>{{ item.gls_termino }}</b></td>
                                                    <td style ="width:50%; text-align: center" v-if="index <= 4"><countTo class="count" :startVal="0" :endVal="item.cantidad" separator="." :duration="1000"></countTo></td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-data-table>
                                </v-card-text>

                                <!-- MODALES Y OTROS ELEMENTOS FUERA DEL TABLERO-->
                                <FiltrosCompetencias class="mt-4" style="display: none"/>
                                <ModalLoading />
                                <!-- MODAL HORARIO DE INICIO AUDIENCIAS-->
                                <v-dialog v-model="dialogAtrasos" max-width="1000">
                                    <v-card>
                                        <v-card-title class="primary white--text">
                                            Atraso en Inicio de Audiencias
                                            <v-spacer></v-spacer>
                                            <v-btn color="error" @click="dialogAtrasos = false" large>
                                                x
                                            </v-btn>
                                        </v-card-title>
                                        <v-card-text>
                                            <vue-excel-xlsx class="my-2 btn btn-primary" :data="dataDetalleAtrasos" :columns="excelHeadAtrasos" :filename="'detalleAtrasos'" :sheetname="'Hoja1'">
                                                <b-icon-cloud-download> </b-icon-cloud-download>
                                            </vue-excel-xlsx>
                                            <v-data-table :headers="headerDetalleAtrasos" :items="dataDetalleAtrasos" :sort-desc="[true]" dense class="mt-5">
                                                <template v-slot:[`body`]="{ items }">
                                                    <tbody>
                                                        <tr v-for="item in items" :key="item.contador">
                                                            <td style="text-align: center;">{{ item.rit }}</td>
                                                            <td style="text-align: center;">{{ item.gls_tipaudiencia }}</td>
                                                            <td style="text-align: center;">{{ item.fecha_audiencia }}</td>
                                                            <td style="text-align: center;">{{ item.hora_estipulada }}</td>
                                                            <td style="text-align: center;">{{ item.hora_ini_real }}</td>
                                                            <td style="text-align: center;"><countTo class="count" :startVal="0" :endVal="item.minutos_atraso" separator="." :duration="1000"></countTo></td>
                                                            <td style="text-align: center;">{{ item.juez }}</td>
                                                        </tr>
                                                    </tbody>
                                                </template>
                                            </v-data-table>
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                                <!-- MODAL TERMINOS POR TIPO (TOP5) -->
                                <v-dialog v-model="dialogTerTopfive" max-width="500">
                                    <v-card>
                                        <v-card-title class="primary white--text">
                                            T&eacute;rminos Tipos
                                            <v-spacer></v-spacer>
                                            <v-btn color="error" @click="dialogTerTopfive = false" large>x</v-btn>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-data-table
                                                :items="Terminos"
                                                :sort-by="['cantidad']"
                                                :sort-desc="[true]"
                                            >
                                                <template v-slot:[`body`]="{ items }">
                                                    <tbody>
                                                        <tr v-for="item in items " :key="item.gls_termino">
                                                            <td style ="width:50%;" class="primary--text"><b>{{ item.gls_termino }}</b></td>
                                                            <td style ="width:50%; text-align: center"><countTo class="count" :startVal="0" :endVal="item.cantidad" separator="." :duration="1000"></countTo></td>
                                                        </tr>
                                                    </tbody>
                                                    <tfoot>
                                                        <tr class="primary white--text">
                                                            <th style ="text-align: center">Total</th>
                                                            <th style="text-align: center"><countTo class="count" :startVal="0" :endVal="TotalTerminosTipos" separator="." :duration="1000"></countTo></th>
                                                        </tr>
                                                    </tfoot>
                                                </template>
                                            </v-data-table>
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                                <!-- MODAL INGRESOS -->
                                <v-dialog v-model="dialogIngreso" max-width="1500">
                                    <v-card>
                                        <v-card-title>
                                            <v-spacer></v-spacer>
                                            <v-btn color="error" @click="dialogIngreso = false" large>x</v-btn>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-tabs v-model="tabIngresos" background-color="accent-4" centered>
                                                <v-tabs-slider></v-tabs-slider>
                                                <v-tab href="#tab-1">Ingresos Causas</v-tab>
                                                <v-tab href="#tab-2">Ingresos Materias</v-tab>
                                                <v-tab href="#tab-3">Ingresos Tipos</v-tab>
                                            </v-tabs>
                                            <v-tabs-items v-model="tabIngresos" class="py-1">
                                                <v-tab-item id="tab-1">
                                                    <IngresosCausas />
                                                </v-tab-item>
                                                <v-tab-item id="tab-2">
                                                    <IngresosTipoMaterias />
                                                </v-tab-item>
                                                <v-tab-item id="tab-3">
                                                    <IngresosTipoIngresos />
                                                </v-tab-item>
                                            </v-tabs-items>
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                                <!-- MODAL TERMINOS -->
                                <v-dialog v-model="dialogTerminos" max-width="1500">
                                    <v-card>
                                        <v-card-title>
                                            <v-spacer></v-spacer>
                                            <v-btn color="error" @click="dialogTerminos = false" large>x</v-btn>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-tabs v-model="tabTerminos" background-color="accent-4" centered>
                                                <v-tabs-slider></v-tabs-slider>
                                                <v-tab href="#tab-1">Tipo T&eacute;rmino</v-tab>
                                                <v-tab href="#tab-2">Tipo Materia</v-tab>
                                                <v-tab href="#tab-3">Tipo Procedimiento</v-tab>
                                            </v-tabs>
                                            <v-tabs-items v-model="tabTerminos" class="py-1">
                                                <v-tab-item id="tab-1">
                                                    <TerminosTipos :archivoEspecial="this.archivoEspecial" />
                                                </v-tab-item>
                                                <v-tab-item id="tab-2">
                                                    <TerminosMaterias />
                                                </v-tab-item>
                                                <v-tab-item id="tab-3">
                                                    <TerminosProcedimientos />
                                                </v-tab-item>
                                            </v-tabs-items>
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                                <!-- MODAL RESOLUCIONES -->
                                <v-dialog v-model="dialogResoluciones" max-width="1250">
                                    <v-card>
                                        <v-card-title class="primary white--text">
                                            Resoluciones Nomenclaturas
                                            <v-spacer></v-spacer>
                                            <v-btn color="error" @click="dialogResoluciones = false">x</v-btn>
                                        </v-card-title>
                                        <v-card-text>
                                            <ResolucionesNomenclaturas />
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                                <!-- MODAL RESUMEN JUECES -->
                                <v-dialog v-model="dialogJueces" max-width="700">
                                    <v-card>
                                        <v-card-title class="primary white--text">
                                            Analisis por juez
                                            <v-spacer></v-spacer>
                                            <v-btn color="error" @click="dialogJueces = false" large>x</v-btn>
                                        </v-card-title>
                                        <v-card-text>
                                            <vue-excel-xlsx class="my-2 btn btn-primary" :data="arrResumenJuez" :columns="excelHeadJueces" :filename="'Analisis por Juez'" :sheetname="'Hoja1'">
                                                <b-icon-cloud-download> </b-icon-cloud-download>
                                            </vue-excel-xlsx>
                                            <v-data-table 
                                                :headers="headerDetalleJueces"
                                                :items="arrResumenJuez"
                                                :sort-by="['resoluciones']"
                                                :sort-desc="[true]"
                                                dense
                                                class="mt-5"
                                            >
                                                <template v-slot:[`body`]="{ items }">
                                                    <tbody>
                                                        <tr v-for="item in items " :key="item.crr_idfuncionario">
                                                            <td style ="">{{ item.nombre }}</td>
                                                            <td style ="text-align: center">
                                                                <countTo class="count" :startVal="0" :endVal="item.resoluciones" separator="." :duration="1000"></countTo>
                                                            </td>
                                                            <td style ="text-align: center">{{ item.aud_realizadas }}</td>
                                                            <td style ="text-align: center">{{ item.conciliaciones }}</td>
                                                        </tr>
                                                    </tbody>
                                                    <tfoot>
                                                        <tr class="primary white--text">
                                                            <th style ="text-align: center">Total</th>
                                                            <th style="text-align: center"><countTo class="count" :startVal="0" :endVal="totalResJueces" separator="." :duration="1000"></countTo></th>
                                                            <th style="text-align: center"><countTo class="count" :startVal="0" :endVal="totalAudJueces" separator="." :duration="1000"></countTo></th>
                                                            <th style="text-align: center"><countTo class="count" :startVal="0" :endVal="totalConciJueces" separator="." :duration="1000"></countTo></th>
                                                        </tr>
                                                    </tfoot>
                                                </template>
                                            </v-data-table>
                                        </v-card-text>
                                    </v-card>
                                </v-dialog>
                            </v-card>
                        </v-col>
                    </v-row>
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
import IngresosCausas from '../../views/laboral/Ingresos'
import IngresosTipoIngresos from '../../views/laboral/Ingresos_tipoIngresos'
import IngresosTipoMaterias from '../../views/laboral/Ingresos_tipoMaterias'
import TerminosTipos from '../../views/laboral/TerminosTipos'
import TerminosMaterias from '../../views/laboral/TerminosMaterias'
import TerminosProcedimientos from '../../views/laboral/TerminosProcedimientos'
import ResolucionesNomenclaturas from '../../views/laboral/ResolucionesNomenclaturas'
import html2canvas from 'html2canvas'
import jsPDF  from "jspdf"

export default {
    name: 'Tablero',
    data () {
        return {
            chartOptions: JSON.parse(JSON.stringify(Graph['pie'][0])),
            user: [{
                usuario_id : store.get('user_usuario_id'), // Los parametros que obtenemos de la url
                cod_corte : store.get('cod_corte'),
                cod_tribunal : store.get('cod_tribunal'),
                ano : store.get('ano'),
                mes : store.get('mes')
            }],
            TotalIngresos: 0,
            TotalTerminos: 0,
            TotalResoluciones: 0,
            Terminos: [],
            dialogIngreso: false,
            dialogTerminos: false,
            dialogResoluciones: false,
            dialogTerTopfive: false,
            dialogJueces: false,
            dialogAtrasos: false,
            tabIngresos: null,
            tabTerminos: null,
            tabResoluciones: null,
            audRealizadasTotal: 0,
            audNORealizadasTotal: 0,
            audNoRealizadas: 0,
            audSuspendidas: 0,
            audReprogramadas: 0,
            nombreTribunal: '',
            arrResumenJuez: [],
            audRealizadasPrcnt: 0,
            audNORealizadasPrcnt: 0,
            audRealizadasEstado: '',
            audNORealizadasEstado: '',
            glosaPeriodoAnterior: '',
            atrasosPromedioPrep: 0,
            atrasosPromedioJuicio: 0,
            cantidadSalas: 0,
            cantidadSalasUsadas: 0,
            archivoEspecial: true,
            totalResJueces: 0,
            totalAudJueces: 0,
            totalConciJueces: 0,
            TotalTerminosTipos:0,
            dataDetalleAtrasos: [],
            headerDetalleAtrasos: [
                { text: 'RIT',  align: 'center', value: 'rit', class : 'primary white--text', width: '13%'},
                { text: 'Tipo Aud.',  align: 'center', value: 'gls_tipaudiencia', class : 'primary white--text', width: '13%' },
                { text: 'Fecha Aud.', align: 'center', value: 'fecha_audiencia', class : 'primary white--text', width: '12%' },
                { text: 'Hora Aud.', align: 'center', value: 'hora_estipulada', class : 'primary white--text', width: '12%' },
                { text: 'Hora Real', align: 'center', value: 'hora_ini_real', class : 'primary white--text', width: '12%' },
                { text: 'Atraso(min)', align: 'center', value: 'minutos_atraso', class : 'primary white--text', width: '10%' },
                { text: 'Juez', align: 'center', value: 'juez', class : 'primary white--text', width: '19%' }
            ],
            headerDetalleJueces: [
                { text: 'Juez',  align: 'center', value: 'nombre', class : 'primary white--text', width: '40%'},
                { text: 'Resoluciones',  align: 'center', value: 'resoluciones', class : 'primary white--text', width: '20%' },
                { text: 'Audiencias Realizadas', align: 'center', value: 'aud_realizadas', class : 'primary white--text', width: '20%' },
                { text: 'Conciliaciones', align: 'center', value: 'conciliaciones', class : 'primary white--text', width: '20%' }
            ],
            headerAnalisisJuez: [
                { text: '',  align: 'center', value: 'nombre', class : 'primary--text', width: '50%'},
                { text: 'Resoluciones',  align: 'center', value: 'resoluciones', class : 'primary--text', width: '25%' },
                { text: 'Audiencias Realizadas', align: 'center', value: 'aud_realizadas', class : 'primary--text', width: '25%' }
            ],
            excelHeadJueces : [{label: "Juez",              field:  "nombre"},
                                {label: "Resoluciones",   field:  "resoluciones"},
                                {label: "Audiencias Realizadas",  field:  "aud_realizadas"},
                                {label: "Conciliaciones",   field:  "conciliaciones"},
            ],
            excelHeadAtrasos : [{label: "RIT",              field:  "rit"},
                                {label: "Tipo Audiencia",   field:  "gls_tipaudiencia"},
                                {label: "Fecha Audiencia",  field:  "fecha_audiencia"},
                                {label: "Hora Audiencia",   field:  "hora_estipulada"},
                                {label: "Hora Real",        field:  "hora_ini_real"},
                                {label: "Atraso(min)",      field:  "minutos_atraso"},
                                {label: "Juez",             field:  "juez"}
            ],

        }
    },
    methods: { 
        ...mapMutations(['setModal']),

        consulta_ing_ter_res() {
            const axios = require('axios')
            const req1 = url + '/laboral/ingresos_totales' 
            const req2 = url + '/laboral/terminos_totales' 
            const req3 = url + '/laboral/resoluciones_totales'
            let archivoEspecialParam = ''
            this.chartOptions.series = []
            this.chartOptions.plotOptions.pie.dataLabels.format =  '<b>{point.name}</b>: {point.percentage:.1f} % ({point.y:.0f})';
            this.setModal(true)

            if(this.archivoEspecial){
                archivoEspecialParam = 't'
            }else {
                archivoEspecialParam = 'f'
            }

            axios.all([
                //INI-Ingresos Totales
                axios.get(req1, {
                    params: {
                        cod_corte: this.user[0].cod_corte,
                        cod_tribunal: this.user[0].cod_tribunal,
                        anoInicio: this.fechas.anoInicio,
                        mesInicio: this.fechas.mesInicio,
                        anoFin: this.fechas.anoFin,
                        mesFin: this.fechas.mesFin
                    }
                }),
                //FIN-Ingresos Totales
                //INI-Terminos Totales
                axios.get(req2, {
                    params: {
                        cod_corte: this.user[0].cod_corte,
                        cod_tribunal: this.user[0].cod_tribunal,
                        anoInicio: this.fechas.anoInicio,
                        mesInicio: this.fechas.mesInicio,
                        anoFin: this.fechas.anoFin,
                        mesFin: this.fechas.mesFin,
                        archivoEspecial: archivoEspecialParam
                    }
                }),
                //FIN-Terminos Totales
                //INI-Resoluciones Totales
                axios.get(req3, {
                    params: {
                        cod_corte: this.user[0].cod_corte,
                        cod_tribunal: this.user[0].cod_tribunal,
                        anoInicio: this.fechas.anoInicio,
                        mesInicio: this.fechas.mesInicio,
                        anoFin: this.fechas.anoFin,
                        mesFin: this.fechas.mesFin
                    }
                }),
                //FIN-Resoluciones Totales

            ]).then(axios.spread((...responses) => {
                //INI-Ingresos Totales
                const IngresosTotales = responses[0].data
                this.TotalIngresos = 0

                Object.values(IngresosTotales.recordset).map((type) => {
                    this.TotalIngresos = type.cantidad
                })
                //FIN-Ingresos Totales

                //INI-Terminos Totales
                const TerminosTotales = responses[1].data
                this.TotalTerminos = 0

                Object.values(TerminosTotales.recordset).map((type) => {
                    this.TotalTerminos = type.cantidad
                })
                //FIN-Terminos Totales

                //INI-Resoluciones Totales
                const ResolucionesTotales = responses[2].data
                this.TotalResoluciones = 0

                Object.values(ResolucionesTotales.recordset).map((type) => {
                    this.TotalResoluciones = type.cantidad
                })
                //FIN-Resoluciones Totales

                let dataTable = []
                dataTable.push({ name: "Ingresos", y: this.TotalIngresos})
                dataTable.push({ name: "Terminos", y: this.TotalTerminos})

                this.chartOptions.series.push({
                    data: dataTable,
                    name: 'Ingresos vs Terminos',
                    colorByPoint: true
                })

                this.setModal(false)

            })).catch(errors => {
                console.log(errors)
                this.setModal(false)
            })

        },
        reqTerminosTipos(){
            const axios = require('axios')
            const req1 = url + '/laboral/terminos_tipos' 
            let archivoEspecialParam = ''

            if(this.archivoEspecial){
                archivoEspecialParam = 't'
            }else {
                archivoEspecialParam = 'f'
            }

            axios.all([
                axios.get(req1, {
                    params: {
                        cod_corte: this.user[0].cod_corte,
                        cod_tribunal: this.user[0].cod_tribunal,
                        anoInicio: this.fechas.anoInicio,
                        mesInicio: this.fechas.mesInicio,
                        anoFin: this.fechas.anoFin,
                        mesFin: this.fechas.mesFin,
                        archivoEspecial: archivoEspecialParam
                    }
                })
            ]).then(axios.spread((...responses) => {
                let objDetTermino
                let arrayTerminos = []
                const TerminosData = responses[0].data
                this.Terminos = []
                this.TotalTerminosTipos = 0

                Object.values(TerminosData.recordset).map((type) => {
                    objDetTermino = new Object()
                    objDetTermino.gls_termino = type.gls_tipfallada
                    objDetTermino.cantidad = type.cantidad
                    this.TotalTerminosTipos += type.cantidad
                    arrayTerminos.push(objDetTermino)
                })

                this.Terminos = arrayTerminos

            })).catch(errors => {
                console.log(errors)
            })
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
        obtenerAudienciasTotales(){

            const axios = require('axios')
            const req1 = url + '/laboral/audiencias_resumen' 

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
                    this.audRealizadasTotal = 0
                    this.audNoRealizadas = 0
                    this.audSuspendidas = 0
                    this.audReprogramadas = 0
                    this.audNORealizadasTotal = 0

                    Object.values(data.recordset).map((type) => {
                        this.audRealizadasTotal += type.aud_realizadas
                        this.audNoRealizadas += type.aud_no_realizadas
                        this.audSuspendidas += type.aud_suspendidas
                        this.audReprogramadas += type.aud_reprogramadas
                        this.audNORealizadasTotal += (type.aud_no_realizadas + type.aud_suspendidas + type.aud_reprogramadas)
                    })

                } 
                catch (error) {
                    console.log(error)
                 }
            }

            get(req1)

        },
        audienciasVSperiodoanterior(){
            //ESTE METODO DEBE EJECUTARSE DESPUES DE [obtenerAudienciasTotales], YA QUE UTILIZA LAS VARIABLES QUE SE CARGAN EN DICHO METODO
            const axios = require('axios')
            const req1 = url + '/laboral/audiencias_resumen' 

            const get = async req1 => {
                try{
                    const response = await axios.get(req1, {
                        params: {
                                cod_corte: this.user[0].cod_corte,
                                cod_tribunal: this.user[0].cod_tribunal,
                                anoInicio: this.fechas.PeriodoAntanoInicio,
                                mesInicio: this.fechas.PeriodoAntmesInicio,
                                anoFin: this.fechas.PeriodoAntanoFin,
                                mesFin: this.fechas.PeriodoAntmesFin
                        }
                                    
                    })
                    const data = response.data
                    let audRealizadasTotalant = 0
                    let audNORealizadasTotalant = 0

                    Object.values(data.recordset).map((type) => {
                        audRealizadasTotalant += type.aud_realizadas
                        audNORealizadasTotalant += (type.aud_no_realizadas + type.aud_suspendidas + type.aud_reprogramadas)
                    })


                    this.audRealizadasPrcnt = Math.round((((this.audRealizadasTotal - audRealizadasTotalant)*100)/audRealizadasTotalant))
                    this.audNORealizadasPrcnt = Math.round((((this.audNORealizadasTotal - audNORealizadasTotalant)*100)/audNORealizadasTotalant))

                    switch(true){
                        case this.audRealizadasTotal < audRealizadasTotalant:
                            this.audRealizadasEstado = 'descendente'
                            break
                        case this.audRealizadasTotal > audRealizadasTotalant:
                            this.audRealizadasEstado = 'ascendente'
                            break
                        case this.audRealizadasTotal == audRealizadasTotalant:
                            this.audRealizadasEstado = 'equivalente'
                            break
                    }

                    switch(true){
                        case this.audNORealizadasTotal < audNORealizadasTotalant:
                            this.audNORealizadasEstado = 'descendente'
                            break
                        case this.audNORealizadasTotal > audNORealizadasTotalant:
                            this.audNORealizadasEstado = 'ascendente'
                            break
                        case this.audNORealizadasTotal == audNORealizadasTotalant:
                            this.audNORealizadasEstado = 'equivalente'
                            break
                    }

                    switch(this.fechas.TipoBusqueda){
                        case 'Mensual':
                            this.glosaPeriodoAnterior = 'Mes'
                            break
                        case 'CuatrimestreMovil':
                            this.glosaPeriodoAnterior = 'Cuatrimestre'
                            break
                        case 'CuatrimestreFijo':
                            this.glosaPeriodoAnterior = 'Cuatrimestre'
                            break
                        case 'AñoFijo':
                            this.glosaPeriodoAnterior = 'Año'
                            break
                        case 'AñoMovil':
                            this.glosaPeriodoAnterior = 'Año'
                            break
                        case 'Trimestre':
                            this.glosaPeriodoAnterior = 'Trimestre'
                            break
                        default:
                            this.glosaPeriodoAnterior = ''
                            break
                    }

                } 
                catch (error) {
                    console.log(error)
                 }
            }

            get(req1)


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
                    this.totalResJueces = 0
                    this.totalAudJueces = 0
                    this.totalConciJueces = 0

                    Object.values(data.recordset).map((type) => {
                        if(type.aud_totales != 0 || type.resoluciones != 0){
                            objResumen = new Object()
                            objResumen.id = type.crr_idfuncionario
                            objResumen.nombre = type.nombre_completo
                            objResumen.aud_realizadas = type.aud_realizadas
                            objResumen.aud_no_realizadas = type.aud_no_realizadas
                            objResumen.aud_suspendidas = type.aud_suspendidas
                            objResumen.aud_reprogramadas = type.aud_reprogramadas
                            objResumen.aud_totales = type.aud_totales
                            objResumen.resoluciones = type.resoluciones
                            objResumen.conciliaciones = type.conciliaciones
                            this.totalResJueces +=  objResumen.resoluciones
                            this.totalAudJueces +=  objResumen.aud_realizadas
                            this.totalConciJueces +=  objResumen.conciliaciones

                            this.arrResumenJuez.push(objResumen)
                        }
                    })

                } 
                catch (error) {
                    console.log(error)
                 }
            }

            get(req1)
            //console.log(this.arrResumenJuez)
        },
        obtenerPromedioAtrasos(){
            const axios = require('axios')
            const req1 = url + '/laboral/audiencias_prep_promedio_atrasos' 
            const req2 = url + '/laboral/audiencias_juicio_promedio_atrasos' 

            const get = async req1 => {
                try{
                    const responsePrep = await axios.get(req1, {
                        params: {
                                cod_corte: this.user[0].cod_corte,
                                cod_tribunal: this.user[0].cod_tribunal,
                                anoInicio: this.fechas.anoInicio,
                                mesInicio: this.fechas.mesInicio,
                                anoFin: this.fechas.anoFin,
                                mesFin: this.fechas.mesFin
                        }
                                    
                    })

                    const responseJuicio = await axios.get(req2, {
                        params: {
                                cod_corte: this.user[0].cod_corte,
                                cod_tribunal: this.user[0].cod_tribunal,
                                anoInicio: this.fechas.anoInicio,
                                mesInicio: this.fechas.mesInicio,
                                anoFin: this.fechas.anoFin,
                                mesFin: this.fechas.mesFin
                        }
                                    
                    })

                    //PREPARATORIAS
                    const dataPrep = responsePrep.data

                    Object.values(dataPrep.recordset).map((type) => {
                            this.atrasosPromedioPrep = type.prom_atraso
                    })

                    //JUICIOS
                    const dataJuicio = responseJuicio.data

                    Object.values(dataJuicio.recordset).map((type) => {
                            this.atrasosPromedioJuicio = type.prom_atraso
                    })

                } 
                catch (error) {
                    console.log(error)
                 }
            }

            get(req1)

        },
        obtenerSalas(){
            const axios = require('axios')
            const req1 = url + '/laboral/salas_creadas' 
            const req2 = url + '/laboral/salas_usadas' 

            const get = async req1 => {
                try{
                    const responseCantSalas = await axios.get(req1, {
                        params: {
                                cod_corte: this.user[0].cod_corte,
                                cod_tribunal: this.user[0].cod_tribunal
                        }
                                    
                    })

                    const responseCantSalasUsadas = await axios.get(req2, {
                        params: {
                                cod_corte: this.user[0].cod_corte,
                                cod_tribunal: this.user[0].cod_tribunal,
                                anoInicio: this.fechas.anoInicio,
                                mesInicio: this.fechas.mesInicio,
                                anoFin: this.fechas.anoFin,
                                mesFin: this.fechas.mesFin
                        }
                                    
                    })

                    //PREPARATORIAS
                    const dataCantSalas = responseCantSalas.data

                    Object.values(dataCantSalas.recordset).map((type) => {
                            this.cantidadSalas = type.cantidad
                    })

                    //JUICIOS
                    const dataCantSalasUsadas = responseCantSalasUsadas.data

                    Object.values(dataCantSalasUsadas.recordset).map((type) => {
                            this.cantidadSalasUsadas = type.cantidad
                    })

                } 
                catch (error) {
                    console.log(error)
                 }
            }

            get(req1)

        },
        terminosTotales(){

            const axios = require('axios')
            const req1 = url + '/laboral/terminos_totales' 
            let archivoEspecialParam = ''

            if(this.archivoEspecial){
                archivoEspecialParam = 't'
            }else {
                archivoEspecialParam = 'f'
            }

            const get = async req1 => {
                try{
                    const response = await axios.get(req1, {
                        params: {
                                cod_corte: this.user[0].cod_corte,
                                cod_tribunal: this.user[0].cod_tribunal,
                                anoInicio: this.fechas.anoInicio,
                                mesInicio: this.fechas.mesInicio,
                                anoFin: this.fechas.anoFin,
                                mesFin: this.fechas.mesFin,
                                archivoEspecial: archivoEspecialParam
                        }
                                    
                    })
                    //INI-Terminos Totales
                    const TerminosTotales = response.data
                    this.TotalTerminos = 0

                    Object.values(TerminosTotales.recordset).map((type) => {
                        this.TotalTerminos = type.cantidad
                    })
                    //FIN-Terminos Totales

                } 
                catch (error) {
                    console.log(error)
                 }
            }

            get(req1)
        },
        detalleAtrasosAudiencias(){
            const axios = require('axios')
            const req1 = url + '/laboral/audiencias_detalle_atrasos' 

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

                    //JUICIOS
                    const dataDetalleAtrasos= response.data
                    this.dataDetalleAtrasos = []
                    let objDetalleAtraso
                    let contador = 0 

                    Object.values(dataDetalleAtrasos.recordset).map((type) => {
                        contador += 1
                        objDetalleAtraso = new Object()
                        objDetalleAtraso.contador = contador
                        objDetalleAtraso.rit = type.rit
                        objDetalleAtraso.gls_tipaudiencia = type.gls_tipaudiencia
                        objDetalleAtraso.fecha_audiencia = type.fecha_audiencia
                        objDetalleAtraso.hora_estipulada = type.hora_estipulada
                        objDetalleAtraso.hora_ini_real = type.hora_ini_real
                        objDetalleAtraso.minutos_atraso = type.minutos_atraso
                        objDetalleAtraso.juez = type.juez
                        this.dataDetalleAtrasos.push(objDetalleAtraso)
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
            this.consulta_ing_ter_res()
            this.reqTerminosTipos()
            this.obtenerNombreTribunal()
            this.obtenerAudienciasTotales()
            this.obtenerResumenJueces()
            this.audienciasVSperiodoanterior()
            this.obtenerPromedioAtrasos()
            this.obtenerSalas()
            this.detalleAtrasosAudiencias()
            this.$forceUpdate()
        },
        archivoEspecial(){
            this.terminosTotales()
            this.reqTerminosTipos()
        }
    },
    components: {
        FiltrosCompetencias
        ,highcharts: Chart
        ,ModalLoading
        ,IngresosCausas
        ,IngresosTipoIngresos
        ,IngresosTipoMaterias
        ,TerminosTipos
        ,TerminosMaterias
        ,TerminosProcedimientos
        ,countTo
        ,ResolucionesNomenclaturas
    }
}
</script>
    
<style scoped>
    .v-card .cardAction{
    transition: opacity .4s ease-in-out;
    }

    .v-card:not(.on-hover) .cardAction{
    opacity: 1;
    }

    .show-btns .cardAction{
    color: rgba(255, 255, 255, 1) !important;
    }

    .verde{
        color: #00DF69;
    }

    .amarillo{
        color: #F4F000;
    }

    .rojo{
        color: #FC0202;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
</style>