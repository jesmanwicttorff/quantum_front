<template>
    <v-container fluid class="px-4">
        <v-row>
            <v-col md="3">
                <h5 class="azul ml-1">
                    Audiencias <br>
                    Realizadas <br>
                </h5>
            </v-col>
            <v-col md="4" class="text-center px-4">
                <v-row>
                    <v-col md="2" class="px-1">
                        <font-awesome-icon v-if="RealizadaEstadoMesAnterior == 'descendente'"  icon="arrow-circle-down" size="2x" class="rojo"/>
                        <font-awesome-icon v-if="RealizadaEstadoMesAnterior == 'ascendente'"  icon="arrow-circle-up" size="2x" class="verde"/>
                        <font-awesome-icon v-if="RealizadaEstadoMesAnterior == 'equivalente'"  icon="arrow-circle-right" size="2x" class="amarillo"/>                         
                    </v-col>
                    <v-col md="6" class="px-2 azul" >
                        {{textAudiencias}} anterior <br />
                        <h6 v-if="RealizadaEstadoMesAnterior == 'ascendente'"><span>+</span>{{RealaizadaMesAnterior}} %</h6>
                        <h6 v-if="RealizadaEstadoMesAnterior != 'ascendente'">{{RealaizadaMesAnterior}} %</h6>
                    </v-col>
                    <v-col md="4">
                        <h2>
                            <countTo class="azul ml-2" :startVal=0 :endVal="audrealizada" separator="." :duration="3000"></countTo>
                       </h2>
                    </v-col>
                </v-row>
            </v-col>  
            <v-col md="5" class="px-6">
              <v-card class="mx-auto">
                <v-card-title primary-title class="primary white--text">
                    <font-awesome-icon v-if="audEstadoPrep == 'descendente'"  icon="arrow-circle-down" size="2x" class="verde"/>
                    <font-awesome-icon v-if="audEstadoPrep == 'ascendente'"  icon="arrow-circle-up" size="2x" class="rojo"/>
                    <font-awesome-icon v-if="audEstadoPrep == 'equivalente'"  icon="arrow-circle-right" size="2x" class="amarillo"/>
                  <v-spacer></v-spacer>
                  <v-btn small outlined color="white" @click="OpenAtrasosModal('preparatorias')">Detalle</v-btn>                  
                </v-card-title>
                <v-card-text>
                  <v-row dense>
                      <v-col md="10" class="primary--text">
                          <b>Preparatorias</b><br>Atraso promedio minutos
                      </v-col>
                      <v-col md="2" class="primary--text">
                          <b><countTo :startVal=0 :endVal="audAtrasoPrep" separator="." :duration="2000"></countTo>Min</b>
                      </v-col>                      
                  </v-row>                                                               
                </v-card-text>                
              </v-card>
            </v-col>                       
        </v-row>
        <v-row>
            <v-col md="3">
                <h5 class="azul ml-1">
                    Audiencias<br>
                    No Realizadas <br>                    
                </h5>
            </v-col>
            <v-col md="4" class="text-center px-4">
                <v-row >
                    <v-col  md="2" class="px-1">
                        <font-awesome-icon v-if="NoRealizadaEstadoMesAnterior == 'descendente'"  icon="arrow-circle-down" size="2x" class="rojo"/>
                        <font-awesome-icon v-if="NoRealizadaEstadoMesAnterior == 'ascendente'"  icon="arrow-circle-up" size="2x" class="verde"/>
                        <font-awesome-icon v-if="NoRealizadaEstadoMesAnterior == 'equivalente'"  icon="arrow-circle-right" size="2x" class="amarillo"/>                         
                    </v-col>
                    <v-col  md="6" class="px-2 azul">
                        {{textAudiencias}} anterior <br />
                        <h6  v-if="NoRealizadaEstadoMesAnterior == 'ascendente'"><span>+</span>{{NoRealizadaMesAnterior}} %</h6>
                        <h6 v-if="NoRealizadaEstadoMesAnterior != 'ascendente'">{{NoRealizadaMesAnterior}} %</h6>
                    </v-col>
                     <v-col>
                         <h2>
                        <countTo class="azul ml-2" :startVal=0 :endVal="audnorealizada" separator="." :duration="3000"></countTo>
                        </h2>
                    </v-col>                      
                </v-row>
            </v-col>  
            <v-col md="5" class="px-6">
              <v-card class="mx-auto">
                <v-card-title primary-title class="primary white--text">
                    <font-awesome-icon v-if="audEstadoJuicio == 'descendente'"  icon="arrow-circle-down" size="2x" class="verde"/>
                    <font-awesome-icon v-if="audEstadoJuicio == 'ascendente'"  icon="arrow-circle-up" size="2x" class="rojo"/>
                    <font-awesome-icon v-if="audEstadoJuicio == 'equivalente'"  icon="arrow-circle-right" size="2x" class="amarillo"/>                    
                  <v-spacer></v-spacer>
                  <v-btn small outlined color="white" @click="OpenAtrasosModal('juicio')">Detalle</v-btn>                  
                </v-card-title>
                <v-card-text>
                  <v-row dense>
                      <v-col md="10" class="primary--text">
                          <b>Juicio</b><br>Atraso promedio minutos
                      </v-col>
                      <v-col md="2" class="primary--text">
                          <b><countTo :startVal=0 :endVal="audAtrasoJuicio" separator="." :duration="2000"></countTo>Min</b>
                      </v-col>                      
                  </v-row>                                                               
                </v-card-text>                
              </v-card>
            </v-col>                       
        </v-row>        
        <!-- MODAL DETALLE ATRASOS-->
        <v-dialog v-model="dialogAtrasos" max-width="1000">
            <v-card>
                <v-card-title  class="primary white--text">
                    Detalle
                    <v-spacer></v-spacer>
                    <v-btn
                        color="error"
                        @click="dialogAtrasos = false"
                        large
                    > 
                        x
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col>
                        <vue-excel-xlsx class="my-2 btn btn-primary"
                            :data="detalleAtrasosPrepData"
                            :columns="excelHead"
                            :filename="'AudienciasAtrasos'"
                            :sheetname="'Hoja1'"
                             v-if="juicioORprep == 'preparatorias'"
                        >
                            <b-icon-cloud-download>     
                            </b-icon-cloud-download>
                        </vue-excel-xlsx>
                        <vue-excel-xlsx class="my-2 btn btn-primary"
                            :data="detalleAtrasosJuicioData"
                            :columns="excelHead"
                            :filename="'AudienciasAtrasos'"
                            :sheetname="'Hoja1'"
                            v-if="juicioORprep == 'juicio'"
                        >
                            <b-icon-cloud-download>     
                            </b-icon-cloud-download>
                        </vue-excel-xlsx>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-data-table 
                                :headers="headers"
                                :items="detalleAtrasosPrepData"
                                dense
                                class="mt-4"
                                v-if="juicioORprep == 'preparatorias'">
                                <template v-slot:[`body`]="{ items }">
                                    <tbody>
                                    <tr v-for="item in items " :key="item.increment">
                                        <td style ="text-align: center">{{ item.increment }}</td>
                                        <td style ="text-align: center">{{ item.rit }}</td>
                                        <td style ="text-align: center">{{ item.juez }}</td>
                                        <td style ="text-align: center">{{ item.fec_trabajo }}</td>
                                        <td style ="text-align: center">{{ item.hora_estipulada }}</td>
                                        <td style ="text-align: center">{{ item.hora_inicio }}</td>
                                        <td style ="text-align: center"><countTo class="count" :startVal="0" :endVal="item.minutos_atraso" separator="." :duration="1000"></countTo></td>
                                    </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr class="primary white--text">
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th style ="text-align: center">Total</th>
                                            <th style="text-align: center"><countTo class="count" :startVal="0" :endVal="totalAtrasosPrep" separator="." :duration="1000"></countTo></th>
                                        </tr>
                                    </tfoot>
                                </template>
                            </v-data-table>
                            <v-data-table 
                                :headers="headers"
                                :items="detalleAtrasosJuicioData"
                                dense
                                class="mt-4"
                                v-if="juicioORprep == 'juicio'"
                            >
                            <template v-slot:[`body`]="{ items }">
                                <tbody>
                                    <tr v-for="item in items " :key="item.increment">
                                        <td style ="text-align: center">{{ item.increment }}</td>
                                        <td style ="text-align: center">{{ item.rit }}</td>
                                        <td style ="text-align: center">{{ item.juez }}</td>
                                        <td style ="text-align: center">{{ item.fec_trabajo }}</td>
                                        <td style ="text-align: center">{{ item.hora_estipulada }}</td>
                                        <td style ="text-align: center">{{ item.hora_inicio }}</td>
                                        <td style ="text-align: center"><countTo class="count" :startVal="0" :endVal="item.minutos_atraso" separator="." :duration="1000"></countTo></td>
                                    </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr class="primary white--text">
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th style ="text-align: center">Total</th>
                                            <th style="text-align: center"><countTo class="count" :startVal="0" :endVal="totalAtrasosJuicio" separator="." :duration="1000"></countTo></th>
                                        </tr>
                                    </tfoot>
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
      
    </v-container>
    <!-- <v-container fluid class="px-4">
        <v-row sm="12" dense>
            <v-col sm="7">
                <v-row sm="12" dense>
                    <v-col sm="3">
                        <h5 class="azul">
                            Audiencias <br/>
                            realizadas
                        </h5>
                    </v-col>
                    <v-col sm="4">
                        <v-row>
                            <v-col sm="3" class="float-left">
                                <font-awesome-icon v-if="RealizadaEstadoMesAnterior == 'descendente'"  icon="arrow-circle-down" size="2x" class="rojo"/>
                                <font-awesome-icon v-if="RealizadaEstadoMesAnterior == 'ascendente'"  icon="arrow-circle-up" size="2x" class="verde"/>
                                <font-awesome-icon v-if="RealizadaEstadoMesAnterior == 'equivalente'"  icon="arrow-circle-right" size="2x" class="amarillo"/> 
                            </v-col>
                            <v-col sm="9" class="float-left px-4">
                                <label>{{textAudiencias}}</label>
                                <h5 class="azul">
                                    <label v-if="RealizadaEstadoMesAnterior == 'ascendente'">+</label>
                                    {{RealaizadaMesAnterior}} %
                                </h5>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col sm="4">
                        <h3 class="azul">
                            <countTo :startVal=0 :endVal="audrealizada" separator="." :duration="3000"></countTo>
                        </h3>
                    </v-col>
                </v-row>
                <hr>
                <v-row sm="12" class="py-4" dense>
                    <v-col sm="3">
                        <h5 class="azul">
                            Audiencias <br/>
                            Sin realizar
                        </h5>
                    </v-col>
                    <v-col sm="4">
                        <v-row>
                            <v-col  sm="3">
                                <font-awesome-icon v-if="NoRealizadaEstadoMesAnterior == 'descendente'"  icon="arrow-circle-down" size="2x" class="verde" />
                                <font-awesome-icon v-if="NoRealizadaEstadoMesAnterior == 'ascendente'"  icon="arrow-circle-up" size="2x" class="rojo"/>
                                <font-awesome-icon v-if="NoRealizadaEstadoMesAnterior == 'equivalente'"  icon="arrow-circle-right" size="2x" class="amarillo"/> 
                            </v-col>
                            <v-col sm="9" class="px-4">
                                <label>{{textAudiencias}}</label>
                                <h5 class="azul">
                                      <label v-if="NoRealizadaEstadoMesAnterior == 'ascendente'">+</label>
                                    {{NoRealizadaMesAnterior}} %
                                </h5>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col sm="4">
                        <h3 class="azul">
                            <countTo :startVal=0 :endVal="audnorealizadatotal" separator="." :duration="3000"></countTo>
                        </h3> 
                    </v-col>
                </v-row>
                <hr>
            </v-col>
            <v-col sm="5" class="px-md-5" >
                <v-row sm="12" class="py-4">
                    <v-col sm="2">
                        <font-awesome-icon v-if="audEstadoPrep == 'descendente'"  icon="arrow-circle-down" size="3x" class="verde"/>
                        <font-awesome-icon v-if="audEstadoPrep == 'ascendente'"  icon="arrow-circle-up" size="3x" class="rojo"/>
                        <font-awesome-icon v-if="audEstadoPrep == 'equivalente'"  icon="arrow-circle-right" size="3x" class="amarillo"/>
                    </v-col>
                    <v-col sm="8">
                        <h6 class="azul px-3"><b>Preparatorias</b></h6> 
                        <label class="px-3">Atraso promedio minutos</label>
                     </v-col>
                    <v-col sm="2">
                        <countTo :startVal=0 :endVal="audAtrasoPrep" separator="." :duration="2000"></countTo> 
                        <label>min</label>
                    </v-col>
                    <v-col sm="12" class="py-0">
                        <v-button  variant="outline-primary btn-sm">Ver detalle</v-button>
                    </v-col>                   
                </v-row>                
                <hr>
                <v-row sm="12" class="py-4">
                    <v-col sm="2">
                            <font-awesome-icon v-if="audEstadoJuicio == 'descendente'"  icon="arrow-circle-down" size="3x" class="verde"/>
                            <font-awesome-icon v-if="audEstadoJuicio == 'ascendente'"  icon="arrow-circle-up" size="3x" class="rojo"/>
                            <font-awesome-icon v-if="audEstadoJuicio == 'equivalente'"  icon="arrow-circle-right" size="3x" class="amarillo"/>
                    </v-col>
                    <v-col sm="8">
                        <h6 class="azul px-4"><b>Juicio</b></h6> 
                        <label class="px-4">Atraso promedio minutos</label>
                     </v-col>
                    <v-col sm="2">
                        <countTo :startVal=0 :endVal="audAtrasoJuicio" separator="." :duration="2000"></countTo> <label>min</label>
                     </v-col>
                    <v-col sm="12" class="py-0">
                        <v-button  variant="outline-primary btn-sm">Ver detalle</v-button>
                    </v-col>                  
                </v-row>                
            </v-col>
        </v-row>
        <v-row dense>
                <v-row sm="12" class="py-4, FondoLila">
                    <v-col sm="3" class="py-4">
                        <h5 class="FontWhite">Sin <br/>
                            Realizar
                        </h5>
                    </v-col>
                    <v-col sm="3" class="py-4">
                        <label class="FontWhite">Suspendidas</label>
                        <h5 class="FontWhite pl-8">
                            <countTo :startVal=0 :endVal="audsuspendida" separator="." :duration="2000"></countTo> 
                        </h5>
                    </v-col>
                    <v-col sm="3" class="py-4">
                        <label class="FontWhite">No Realizadas</label>
                        <h5 class="FontWhite pl-8">
                            <countTo :startVal=0 :endVal="audnorealizada" separator="." :duration="2000"></countTo> 
                        </h5>
                    </v-col>
                    <v-col sm="3" class="py-4">
                        <label class="FontWhite">Reprogramadas</label>
                        <h5 class="count FontWhite pl-10">
                            <countTo  :startVal=0 :endVal="audreprogramadas" separator="." :duration="2000"></countTo> 
                        </h5>
                    </v-col>
                </v-row>            
        </v-row>
    </v-container> -->
</template>

<script>

import Vue from 'vue'
import { url } from '../../../config/api'
import countTo from 'vue-count-to'
import store from 'store'
import { mapState } from 'vuex'

 


export default {
    name: "Audiencias",
    components: {
        countTo
    },
    data () {
        return {
            user: [{
                usuario_id : store.get('user_usuario_id'),
                cod_corte : store.get('cod_corte'),
                cod_tribunal : store.get('cod_tribunal'),
                ano : store.get('ano'),
                mes : store.get('mes')
            }],             
            audrealizada: 0,
            audnorealizada: 0,
            audnorealizadatotal: 0,
            audsuspendida: 0,
            audreprogramadas: 0,
            audAtrasoJuicio: 0,
            audAtrasoPrep: 0,
            audEstadoJuicio: "",
            audEstadoPrep: "",
            RealaizadaMesAnterior: 0,
            NoRealizadaMesAnterior: 0,
            RealizadaEstadoMesAnterior: "",
            NoRealizadaEstadoMesAnterior: "",
            textAudiencias: '',
            dialogAtrasos: false,
            detalleAtrasosPrepData: [],
            detalleAtrasosJuicioData: [],
            juicioORprep: '',
            headers: [],
            totalAtrasosJuicio: 0,
            totalAtrasosPrep: 0,
            excelHead : [{label: "#"            ,field: "increment"},
                        {label: "RIT"    ,field:  "rit"},
                        {label: "juez"      ,field:  "juez"},
                        {label: "fec_trabajo"         ,field: "fec_trabajo"},
                        {label: "hora_estipulada"         ,field: "hora_estipulada"},
                        {label: "hora_inicio"         ,field: "hora_inicio"},
                        {label: "minutos_atraso"         ,field: "minutos_atraso"}
                    ] 
        }
    },
    props: ['fechasConsulta'],
    watch:{
        fechasConsulta: function(){
            this.loadAudiencia()
            this.detalleAtrasosPreparatorias()
            this.detalleAtrasosJuicios()
            this.$forceUpdate()
        }
    },
    mounted () {
        this.loadAudiencia()
        this.detalleAtrasosPreparatorias()
        this.detalleAtrasosJuicios()
        this.$forceUpdate()
    },
    methods: {
        ...mapState(['fechas']), // Valores Guardados
        loadAudiencia: function(){
                        const axios = require('axios')
                        const req1 = url + '/familia/audienciasAtrasos'  
                        const req4 = url + '/familia/audienciasEstados' 
                        
                       
                        switch(this.$attrs.option){
                            case 1:
                                this.textAudiencias = 'Mes'
                                break
                            case 2:
                                this.textAudiencias = 'Trimestre'
                                break
                            case 3:
                                this.textAudiencias = 'Año'
                                break
                            case 4:
                                this.textAudiencias = 'Cuatrimestre'
                                break
                            case 5:
                                this.textAudiencias = 'Cuatrimestre'
                                break
                            case 6:
                                this.textAudiencias = 'Año'
                                break                                                                                                
                            default:
                                this.textAudiencias = 'fallo'
                                break
                        }

                        


                        axios.all([
                            axios.get(req4, {
                            params: {
                                cod_corte: this.user[0].cod_corte,
                                cod_tribunal: this.user[0].cod_tribunal,
                                anoInicio: this.fechas().anoInicio,
                                mesInicio: this.fechas().mesInicio,
                                anoFin: this.fechas().anoFin,
                                mesFin: this.fechas().mesFin
                            }
                            }),
                            axios.get(req1, {
                            params: {
                                cod_corte: this.user[0].cod_corte,
                                cod_tribunal: this.user[0].cod_tribunal,
                                anoInicio: this.fechas().anoInicio,
                                mesInicio: this.fechas().mesInicio,
                                anoFin: this.fechas().anoFin,
                                mesFin: this.fechas().mesFin,
                                tipo_audiencia: "Juicio"
                            }
                            }),
                            axios.get(req1, {
                            params: {
                                cod_corte: this.user[0].cod_corte,
                                cod_tribunal: this.user[0].cod_tribunal,
                                anoInicio: this.fechas().anoInicio,
                                mesInicio: this.fechas().mesInicio,
                                anoFin: this.fechas().anoFin,
                                mesFin: this.fechas().mesFin,
                                tipo_audiencia: "Preparatoria"
                            }
                            })
                        ]).then(axios.spread((...responses) => {

                            const data1 = responses[0].data
                            const audiencias = []
                            let audienciasMesAnterior = []
                            let objAudiencia;

                            data1.forEach(responseAud => {
                                //console.log(objeto);
                                audiencias.push(responseAud.cantidad)

                                objAudiencia = new Object();
                                objAudiencia.PorcentajeMesAnterior = responseAud.PorcentajeMesAnterior
                                objAudiencia.estado = responseAud.estado
                                objAudiencia.cantidad = responseAud.cantidad
                                objAudiencia.estado_audiencia_id = responseAud.estado_audiencia_id
                                objAudiencia.cantidadNOREALIZADA = responseAud.cantidadNOREALIZADA
                            

                                audienciasMesAnterior.push(objAudiencia)
                            });

                            //INI-Obtener atraso de audiencias
                            let dataAtrasos = responses[1].data
                            this.audAtrasoJuicio = Math.round(dataAtrasos.audiencias_atrasos_prctn,0)

                            if(this.audAtrasoJuicio < 0){
                                this.audAtrasoJuicio = 0
                            }

                            this.audEstadoJuicio = dataAtrasos.estado

                            dataAtrasos = responses[2].data
                            this.audAtrasoPrep = Math.round(dataAtrasos.audiencias_atrasos_prctn,0)

                            if(this.audAtrasoPrep < 0){
                                this.audAtrasoPrep = 0
                            }

                            this.audEstadoPrep = dataAtrasos.estado
                            //FIN-Obtener atraso de audiencias
                            this.audrealizada = audiencias[0]
                            this.audnorealizadatotal = audienciasMesAnterior.find(element => element.estado_audiencia_id == 99).cantidadNOREALIZADA
                            this.audnorealizada = audiencias[1]
                            this.audsuspendida = audiencias[2]
                            this.audreprogramadas = audiencias[3]
                            this.RealaizadaMesAnterior =  Math.round(audienciasMesAnterior.find(element => element.estado_audiencia_id == 1).PorcentajeMesAnterior)
                            this.NoRealizadaMesAnterior = Math.round(audienciasMesAnterior.find(element => element.estado_audiencia_id == 99).PorcentajeMesAnterior)
                            this.RealizadaEstadoMesAnterior =  audienciasMesAnterior[0].estado
                            this.NoRealizadaEstadoMesAnterior = audienciasMesAnterior.find(element => element.estado_audiencia_id == 99).estado

                            this.$forceUpdate()

                        })).catch(errors => {

                        })
        },
        detalleAtrasosPreparatorias(){
            const axios = require('axios')
            const req1 = url + '/familia/detalleAtrasosPreparatorias' 
            this.headers = [
                    {text: '#', align: 'center', value: 'increment', class : 'primary white--text', width: '4%'},
                    {text: 'RIT', align: 'center', value: 'rit', class : 'primary white--text', width: '16%'},
                    {text: 'Juez', align: 'center', value: 'juez', class : 'primary white--text', width: '16%'},
                    {text: 'Fecha', align: 'center', value: 'fec_trabajo', class : 'primary white--text', width: '16%'},
                    {text: 'Hora Estipulada', align: 'center', value: 'hora_estipulada', class : 'primary white--text', width: '16%'},
                    {text: 'Hora Inicio', align: 'center', value: 'hora_inicio', class : 'primary white--text', width: '16%'},
                    {text: 'Minutos Atraso', align: 'center', value: 'minutos_atraso', class : 'primary white--text', width: '16%'}
                ]

            const get = async req1 => {
                try{
                    const response = await axios.get(req1, {
                        params: {
                                cod_corte: this.user[0].cod_corte,
                                cod_tribunal: this.user[0].cod_tribunal,
                                anoInicio: this.fechas().anoInicio,
                                mesInicio: this.fechas().mesInicio,
                                anoFin: this.fechas().anoFin,
                                mesFin: this.fechas().mesFin
                        }
                                    
                    })
                    const data = response.data
                    this.detalleAtrasosPrepData = []
                    let objDetalleAtraso = {
                        increment: 0,
                        rit: '',
                        juez: '',
                        fec_trabajo: '',
                        hora_estipulada: '',
                        hora_inicio: '',
                        minutos_atraso: 0
                    }

                    let contador = 0
                    this.totalAtrasosPrep = 0

                    Object.values(data.recordset).map((type) => {
                        contador += 1
                        objDetalleAtraso = new Object()
                        objDetalleAtraso.increment = contador
                        objDetalleAtraso.rit = type.rit
                        objDetalleAtraso.juez = type.nombre_completo
                        objDetalleAtraso.fec_trabajo = type.fec_trabajo
                        objDetalleAtraso.hora_estipulada = type.hora_estipulada.substring(0,5)
                        objDetalleAtraso.hora_inicio = type.hora_inicio.substring(0,5)
                        objDetalleAtraso.minutos_atraso = type.minutos_atraso
                        this.totalAtrasosPrep += objDetalleAtraso.minutos_atraso
                        this.detalleAtrasosPrepData.push(objDetalleAtraso)
                    })

                } 
                catch (error) {
                    console.log(error)
                 }
            }

            get(req1)
        },
        detalleAtrasosJuicios(){
            const axios = require('axios')
            const req1 = url + '/familia/detalleAtrasosJuicios' 
            this.headers = [
                    {text: '#', align: 'center', value: 'increment', class : 'primary white--text', width: '4%'},
                    {text: 'RIT', align: 'center', value: 'rit', class : 'primary white--text', width: '16%'},
                    {text: 'Juez', align: 'center', value: 'juez', class : 'primary white--text', width: '16%'},
                    {text: 'Fecha', align: 'center', value: 'fec_trabajo', class : 'primary white--text', width: '16%'},
                    {text: 'Hora Estipulada', align: 'center', value: 'hora_estipulada', class : 'primary white--text', width: '16%'},
                    {text: 'Hora Inicio', align: 'center', value: 'hora_inicio', class : 'primary white--text', width: '16%'},
                    {text: 'Minutos Atraso', align: 'center', value: 'minutos_atraso', class : 'primary white--text', width: '16%'}
                ]

            const get = async req1 => {
                try{
                    const response = await axios.get(req1, {
                        params: {
                                cod_corte: this.user[0].cod_corte,
                                cod_tribunal: this.user[0].cod_tribunal,
                                anoInicio: this.fechas().anoInicio,
                                mesInicio: this.fechas().mesInicio,
                                anoFin: this.fechas().anoFin,
                                mesFin: this.fechas().mesFin
                        }
                                    
                    })
                    const data = response.data
                    this.detalleAtrasosJuicioData = []
                    let objDetalleAtraso = {
                        increment: 0,
                        rit: '',
                        juez: '',
                        fec_trabajo: '',
                        hora_estipulada: '',
                        hora_inicio: '',
                        minutos_atraso: 0
                    }

                    let contador = 0
                    this.totalAtrasosJuicio = 0

                    Object.values(data.recordset).map((type) => {
                        contador += 1
                        objDetalleAtraso = new Object()
                        objDetalleAtraso.increment = contador
                        objDetalleAtraso.rit = type.rit
                        objDetalleAtraso.juez = type.nombre_completo
                        objDetalleAtraso.fec_trabajo = type.fec_trabajo
                        objDetalleAtraso.hora_estipulada = type.hora_estipulada.substring(0,5)
                        objDetalleAtraso.hora_inicio = type.hora_inicio.substring(0,5)
                        objDetalleAtraso.minutos_atraso = type.minutos_atraso
                        this.totalAtrasosJuicio += objDetalleAtraso.minutos_atraso
                        this.detalleAtrasosJuicioData.push(objDetalleAtraso)
                    })

                } 
                catch (error) {
                    console.log(error)
                 }
            }

            get(req1)
        },
        OpenAtrasosModal(tipoDetalleAtraso){
            this.juicioORprep = tipoDetalleAtraso
            this.dialogAtrasos = true
        },
    }
}
</script>

<style scoped>
.arial, .btn, span,tspan, li, h5, h6  {
  font-family: Arial, Helvetica, sans-serif;
}

.azul{
    color: #2979ff;
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

.FondoLila{
    background: #2979ff;

    border-radius: 20px 20px 20px 20px;
    -moz-border-radius: 20px 20px 20px 20px;
    -webkit-border-radius: 20px 20px 20px 20px;
    border: 0px solid #000000;
}

.FontWhite{
    color:aliceblue;
}

label {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
}




</style>